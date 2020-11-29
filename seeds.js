const mongoose = require('mongoose');
const Product = require('./models/product')

mongoose.connect('mongodb://localhost:27017/FarmStand', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log("Connected Successfully to MongoDB")
})
.catch(err => {
    console.log("Oh no error on MongoDB!!!") 
    console.log(err) 
})


const SeedProducts = [
     {
        name: 'Ruby GrapeFruit',
        price: 1.99,
         category: 'fruit'
     },
     {
        name: 'Jasmine plant',
        price: 4.99,
         category: 'vegetable'
     },
     {
        name: 'Organic PlantFood',
        price: 6.45,
         category: 'Vegetable'
     },
     {
        name: 'Pumkin cherry',
        price: 10.89,
         category: 'diary'
     },
     {
        name: 'Barry fruit',
        price: 3.69,
         category: 'fruit'
     },
     
]

Product.insertMany(SeedProducts)
.then(data => {
    console.log(data)
})
.catch(err => {
    console.log(err)
})


// const p = new Product({
//     name: 'Ruby GrapeFruit',
//     price: 1.99,
//     category: 'fruit'
// })

// p.save().then(data => {
//     console.log(data)
// }).catch(err => {
//     console.log(err)
// })