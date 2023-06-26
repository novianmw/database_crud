const express = require('express');
const dotenv = require('dotenv');
const productController = require('./src/product/product.controller')
const cors = require('cors');
const app = express();

dotenv.config();

const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
    res.send('Hello World! THIS IS MY API!');
})

app.use('/products', productController)

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}.`);
})