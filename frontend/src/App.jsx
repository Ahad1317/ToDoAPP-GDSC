import { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';

function App() {
  const [itemText, setItemText] = useState('')
  const [listItems, setListItems] = useState([]) 
  const [isUpdating, setIsUpdating] = useState('')
  const [updateItemText, setUpdateItemText] = useState('')
  //add new item in db
  
  const addItem = async (e) =>{
    e.preventDefault()
    try{
      const res = await axios.post('http://localhost:3300/api/item', {item:itemText})
      setListItems(prev => [...prev,res.data])
      setItemText('')
    }
    catch(err){
      console.log(err);
    }
  }

  //Fetch all items from database(useEffect) 
  useEffect(()=>{
    const getItemsList = async () => {
      try{
        const res = await axios.get('http://localhost:3300/api/items')
        setListItems(res.data)
        console.log('render')
      }
      catch(err){
        console.log(err)
      }
    }
    getItemsList()
  },[])

  //delete item
  const deleteItem = async (id) =>{
    try{
      const res = await axios.delete(`http://localhost:3300/api/item/${id}`)
      console.log(res.data)
      const newListItems = listItems.filter(items => items._id!==id)
      setListItems(newListItems)
    }
    catch(err){
      console.log(err);
    }
  }

//update item
  const updateItem = async (e) =>{
    e.preventDefault()
    try{
      const res = await axios.put(`http://localhost:3300/api/item/${isUpdating}`,{item:updateItemText})
      console.log(res.data)
      const updateItemIndex = listItems.findIndex( item => item._id === isUpdating)
      const updatedItem = listItems[updateItemIndex].item = updateItemText
      console.log(updatedItem);
      setUpdateItemText('')
      setIsUpdating('')
    }catch(err){
      console.log(err)
    }
  }

// before updating item we need to show input field where we will create our updated item 
const renderUpdateForm = () => (
  <form className="updateForm" onSubmit={(e)=>{updateItem(e)}} > 
  <input className="updateNewInput" type="text" placeholder="New Item" onChange={e=>{setUpdateItemText(e.target.value)}} value={updateItemText} />
  <button className="updateNewBtn" type="submit">Update</button>
  </form>
)


  return (
    <div className="App">
      <h1>QUIZR...</h1>
     <form className="form" onSubmit={e => addItem(e)}>
      <input type = "text" placeholder = "Add Items..." onChange={e =>{setItemText(e.target.value)}} value={itemText}/>
      <button type="submit">ADD</button>
     </form>
     <div className="listItems">
      {
        listItems.map(item => (
          <div className="item">
            {
              isUpdating === item._id ? renderUpdateForm()
            : <>
            <p className="itemContent">{item.item}</p>
            <button className="updateItem" onClick={()=>{setIsUpdating(item._id)}}>Update</button>
            <button className="deleteItem" onClick={()=>{deleteItem(item._id)}}>Delete</button>
            <button className="completeItem">Complete</button>
            </>
      }
          </div>
        ))
      }
      </div>
  </div>
  )
}
     

export default App;
