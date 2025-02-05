const mongoose = require('mongoose')

const Item = require('../models/item')
const brand_controller = require('../controllers/brandController')
const category_controller = require('../controllers/categoryController')

const list = (req, res) => {
    Item.find((err, items) => err ? res.send(err) : res.json(items))
}

const detail = (req, res) => {
    Item.findById(req.params.id, (err, doc) => err ? res.send(err) : res.send(doc))
}

const create = (req, res) => {
    const { price, name, brand, description, category } = req.body

    const item = new Item({ price, name, brand, description, category})

    if (!mongoose.Types.ObjectId.isValid(brand))
        res.status(500).send({ message: "Invalid ID" })

    item.save().then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error Item"
        })
    })
    console.log(item)   
}

module.exports.item_list = list
module.exports.item_details = detail
module.exports.item_create = create
