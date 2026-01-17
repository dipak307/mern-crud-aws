import Product from '../models/product.model.js';
import productQueue from '../queues/product.queue.js';


export const createProduct = async (req, res) => {
    try {
        const { title, price } = req.body;
        const image =req.file;

        if(!image){
            return res.status(400).json({message:"Image is required"});
        }

        const newProduct =new Product();
        newProduct.title = title;
        newProduct.price = price;
        newProduct.image = image.filename;
        newProduct.owner = req.user.id;
        await newProduct.save();
        // 🔥 ADD JOB TO QUEUE
        await productQueue.add("PRODUCT_CREATED", {
            productId: newProduct._id,
            title: newProduct.title,
            owner: req.user.id,
        });
        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error });
    }
};




export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
};

export const getOwnerProducts = async (req, res) => {
    try {
        const ownerId = req.params.ownerId;
        console.log("Fetching products for ownerId:", ownerId);
        const products = await Product.find({owner: ownerId});

        res.status(200).json({message:"fetched all products", products:products });
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
};