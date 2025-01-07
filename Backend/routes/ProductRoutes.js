const express = require("express");

const router=express.Router();

router.get('/getProduct', (req, res) => {
    const data = [
        {
            "Product_name": "Smartphone",
            "product_image_url": "https://example.com/images/smartphone.jpg",
            "Price": "20000",
            "Rating": "4.5",
            "Description": "A sleek smartphone with a powerful processor and long battery life."
        },
        {
            "Product_name": "Laptop",
            "product_image_url": "https://example.com/images/laptop.jpg",
            "Price": "60000",
            "Rating": "4.8",
            "Description": "A lightweight laptop with high performance and stunning display."
        },
        {
            "Product_name": "Smartwatch",
            "product_image_url": "https://example.com/images/smartwatch.jpg",
            "Price": "15000",
            "Rating": "4.3",
            "Description": "A stylish smartwatch with health tracking and notifications."
        },
        {
            "Product_name": "Camera",
            "product_image_url": "https://example.com/images/camera.jpg",
            "Price": "45000",
            "Rating": "4.7",
            "Description": "A high-resolution camera perfect for photography enthusiasts."
        },
        {
            "Product_name": "Headphones",
            "product_image_url": "https://example.com/images/headphones.jpg",
            "Price": "3000",
            "Rating": "4.6",
            "Description": "Comfortable headphones with excellent sound quality."
        },
        {
            "Product_name": "Gaming Console",
            "product_image_url": "https://example.com/images/gaming-console.jpg",
            "Price": "40000",
            "Rating": "4.9",
            "Description": "A gaming console for immersive and high-performance gaming."
        },
        {
            "Product_name": "Tablet",
            "product_image_url": "https://example.com/images/tablet.jpg",
            "Price": "25000",
            "Rating": "4.4",
            "Description": "A versatile tablet with a vivid screen and multitasking capabilities."
        },
        {
            "Product_name": "Keyboard",
            "product_image_url": "https://example.com/images/keyboard.jpg",
            "Price": "1500",
            "Rating": "4.2",
            "Description": "A mechanical keyboard with customizable keys and RGB lighting."
        },
        {
            "Product_name": "Mouse",
            "product_image_url": "https://example.com/images/mouse.jpg",
            "Price": "1200",
            "Rating": "4.1",
            "Description": "An ergonomic mouse with high precision and durability."
        },
        {
            "Product_name": "Gaming Chair",
            "product_image_url": "https://example.com/images/gaming-chair.jpg",
            "Price": "10000",
            "Rating": "4.6",
            "Description": "A comfortable gaming chair with lumbar support and adjustable settings."
        },
        {
            "Product_name": "Smart TV",
            "product_image_url": "https://example.com/images/smart-tv.jpg",
            "Price": "35000",
            "Rating": "4.7",
            "Description": "A smart TV with stunning visuals and seamless streaming."
        },
        {
            "Product_name": "Bluetooth Speaker",
            "product_image_url": "https://example.com/images/bluetooth-speaker.jpg",
            "Price": "5000",
            "Rating": "4.5",
            "Description": "A portable Bluetooth speaker with crystal-clear sound."
        },
        {
            "Product_name": "Power Bank",
            "product_image_url": "https://example.com/images/power-bank.jpg",
            "Price": "2000",
            "Rating": "4.3",
            "Description": "A high-capacity power bank for charging devices on the go."
        },
        {
            "Product_name": "Wireless Earbuds",
            "product_image_url": "https://example.com/images/wireless-earbuds.jpg",
            "Price": "3000",
            "Rating": "4.4",
            "Description": "Compact wireless earbuds with noise cancellation."
        },
        {
            "Product_name": "Fitness Tracker",
            "product_image_url": "https://example.com/images/fitness-tracker.jpg",
            "Price": "2500",
            "Rating": "4.2",
            "Description": "A fitness tracker to monitor your health and activities."
        },
        {
            "Product_name": "Drone",
            "product_image_url": "https://example.com/images/drone.jpg",
            "Price": "20000",
            "Rating": "4.8",
            "Description": "A high-tech drone with a 4K camera and long flight time."
        },
        {
            "Product_name": "VR Headset",
            "product_image_url": "https://example.com/images/vr-headset.jpg",
            "Price": "15000",
            "Rating": "4.7",
            "Description": "A virtual reality headset for immersive experiences."
        },
        {
            "Product_name": "Desktop PC",
            "product_image_url": "https://example.com/images/desktop-pc.jpg",
            "Price": "50000",
            "Rating": "4.9",
            "Description": "A powerful desktop PC for gaming and productivity."
        },
        {
            "Product_name": "Hard Drive",
            "product_image_url": "https://example.com/images/hard-drive.jpg",
            "Price": "4000",
            "Rating": "4.5",
            "Description": "An external hard drive with ample storage capacity."
        }
    ];
    res.json(data);
    
});

module.exports=router;