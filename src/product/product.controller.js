const express = require('express');
const prisma = require("../db")
const { getAllProducts, getProductById, createProduct, deleteProductById, editProductById } = require("../product/product.service")
const router = express.Router();

router.get('/', async (req, res) => {
    try {
    const products = await getAllProducts();
    res.send(products);
    } catch (error) {
        res.status(400).send(error.message);
    }
})


router.get('/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const product = await getProductById(parseInt(productId));
        res.send(product)
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.post('/', async (req, res) => {
    try {
        const newProductData = req.body;
        const product = await createProduct(newProductData)
        res.send({
            data: product,
            message: 'Product Created'
        })
    } catch (error) {
        res.status(400).send(error.message);
    }
})  

router.delete('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        await deleteProductById(parseInt(productId));
        res.send('Product Deleted')
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.put('/:id', async (req, res) => {
    const productId = req.params.id;
    const productData = req.body;
    if (!productData.name || !productData.description || !productData.price || !productData.category || !productData.image) {
        return res.status(400).send({
            message: 'Bad Request : some fields are missing'
        })
    }
    const Product = await editProductById(parseInt(productId), productData)
    res.send({
        data: Product,
        message: 'Product Updated'
    })
})

router.patch('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const productData = req.body;
        const product = await editProductById(parseInt(productId), productData)
        res.send({
            data: product,
            message: 'edit product success'
        })
    } catch (error) {
        res.status(400).send(error.message);        
    }
})

module.exports = router;