import { Product } from '../models/Product.js';



export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error While fetching products' });
    }
};

export const addProduct = async (req, res) => {
    try {
        const { name, price, description, image } = req.body;

        if (!name || !price || !description) {
            return res.status(400).json({ error: 'Name, price, and description are required' });
        }

        if (isNaN(price) || price <= 0) {
            return res.status(400).json({ error: 'Price must be a positive number' });
        }

        const product = new Product({
            name,
            price,
            description,
            image,
        });

        const newProduct = await product.save();

        res.status(201).json({
            message: 'Product added successfully',
            product: newProduct,
        });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({
            error: 'An error occurred while adding the product. Please try again later.',
        });
    }
};

