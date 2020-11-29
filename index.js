const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product');
const methodOverride = require('method-override');

const categories  = ['fruit','vegetable', 'diary', 'meat']
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'));
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'));


app.get('/products', async (req,res) => {
    const { category } = req.query;
    if (category) {
        const Products = await Product.find({category: category})
        res.render('products/index', { Products, category })
    }else {
        const Products = await Product.find({})
        res.render('products/index', { Products, category: 'All' })
    }
})

app.get('/products/new', async (req, res) => {
    res.render('products/new', {categories})
})

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/show', { product })
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/edit', { product, categories })
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true})
    res.redirect(`/products/${ product._id }`);
})

app.delete('/products/:id', async(req, res) => {
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

app.get('/', async (req,res) => {
    const Products = await Product.find({})
    res.render('products/home', { Products })
})

app.listen(8080, () => {
    console.log("listening to port 8080");
})
mongoose.connect('mongodb://localhost:27017/FarmStand', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log("Connected Successfully to MongoDB")
})
.catch(err => {
    console.log("Oh no error on MongoDB!!!") 
    console.log(err) 
})

