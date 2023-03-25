const router =  require("express").Router()
const ItemModel = require("../models/items")

//add to database
router.post('/api/item',async(req,res)=>{
    try{
        const newItem = new ItemModel({
            item: req.body.item 
        })
        const saveItem = await newItem.save()
        res.status(200).json(saveItem)
    }
    catch(err){res.json(err)}
})

// get from database

router.get('/api/items',async(req,res)=>{
    try{
        const allItems = await ItemModel.find({})
            res.status(200).json(allItems)
    }
    catch(err){
        res.json(err)
    }
})


//update
router.put('/api/item/:id',async (req,res)=>{
    try{
        const updateItem = await ItemModel.findByIdAndUpdate(req.params.id, {$set:req.body})
        res.status(200).json('Items updated')
    }catch(err){
        res.json(err)
    }
})

//delete
router.delete('/api/item/:id',async(req,res)=>{
    try{
        const deleteItem = await ItemModel.findByIdAndDelete(req.params.id)
        res.status(200).json('Item Deleted')
    }
    catch(err){
        res.json(err)
    }
})
module.exports = router 