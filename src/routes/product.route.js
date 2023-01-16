const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");
const upload = require("../../libs/storage");
const cloudinary = require("../utils/cloudinary");

router.post("/", upload.single("picture"), async (req, res) => {
  const { title, unit_price, stock, description, visibility } = req.body;
  const result = await cloudinary.uploader.upload(req.file.path);
  try {
    const productExist = await Product.findOne({ title });
    if (productExist) {
      return res.status(400).send("El producto ya existe");
    }
    const titleLower = title.toLowerCase();
    const newProduct = new Product({
      title: titleLower,
      unit_price,
      stock,
      description,
      visibility,
      picture: result.secure_url,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(404).send("Faltan datos para agregar el producto");
  }
});

router.get('/:_id',async(req,res) => {
  const {_id}=req.params
  try {
    Product.findById({_id:_id},(error,product) => {
      if(!product){
        res.status(404).send(`El Id=${_id} no corresponde a ningun producto`)
      }
      res.status(200).send(product)
    })
  } catch (error) {
    console.log(error)
  }
})

router.get("/", async (req, res) => {
  const {productTitle} = req.query;
  try {
   const products = await Product.find();
    if (productTitle) {
      Product.find({title:{$regex:productTitle,$options:'i'}}, (err, product) => {
        res.send(product);
      });
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
