import ProductModel from "../model/ProductModel.js";

export const Create_Product = async (req, res) => {
  const { Product_name, off, Price, Description, category } = req.body;
  const product_image_url = req.imageUrl;

  if (!Product_name || !off || !Price || !Description || !category) {
    return res.status(400).send("All the fields are required");
  }
  try {
    const AddProduct = await ProductModel.create({
      Product_name,
      off,
      Price,
      Description,
      product_image_url,
      category,
    });
    if (AddProduct) {
      return res.status(201).json({
        success: true,
        data: AddProduct,
      });
    }
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};
export const Delete_Product = async (req, res) => {
  const { Product_name, category } = req.body;

  if (!category || !Product_name) {
    return res.status(400).send("Product name is required");
  }
  try {
    const deleteProduct = await ProductModel.findOneAndDelete({
      Product_name,
      category,
    });

    if (deleteProduct) {
      return res.status(200).send("Product Deleted Successfully");
    } else {
      return res.status(400).send("Failed to delete Product");
    }
  } catch (error) {
    return res.status(400).json({
      Message: error,
    });
  }
};
export const Update_Product = async (req, res) => {
  const { Product_name, off, Price, Description, category, _id } = req.body;
  const product_image_url = req.newImage;
  try {
    const updateFields = {};

    if (Product_name) updateFields.Product_name = Product_name;
    if (off) updateFields.off = off;
    if (Price) updateFields.Price = Price;
    if (Description) updateFields.Description = Description;
    if (category) updateFields.category = category;
    if (product_image_url) updateFields.product_image_url = product_image_url;

    const updateProduct = await ProductModel.findByIdAndUpdate(
      _id,
      updateFields,
      { new: true }
    );

    if (updateProduct) {
      return res
        .status(200)
        .json({ data: updateProduct, Message: "Product updated Successfully" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
export const Get_Product = async (req, res) => {
  // try {
  //   const Products = await ProductModel.find();

  //   if (Products.length < 0) {
  //     return res.status(200).send("No Product found");
  //   }
  //   return res.status(200).json({Products});
  // } catch (error) {
  //   return res.status(400).json({ error: error.message });
  // }
  const data = [
    {
      Review: 97,
      off:25,
      Original_Price: "220",
      Product_name: "Smartphone",
      product_image_url:
        "https://res.cloudinary.com/rathodpratik/image/upload/v1737198634/mobile_lzy3xu.png",
      Price: "20000",
      Rating: 4.5,
      Description:
        "A sleek smartphone with a powerful processor and long battery life.",
    },
    {
      off:35,
      Review: 136,
      Original_Price: "650",
      Product_name: "Laptop",
      product_image_url:
        "https://res.cloudinary.com/rathodpratik/image/upload/v1737298862/laptop_kukve0.png",
      Price: "600",
      Rating: 4.8,
      Description:
        "A lightweight laptop with high performance and stunning display.",
    },
    {
      off:45,
      Review: 122,
      Original_Price: "200",
      Product_name: "Smartwatch",
      product_image_url:
        "https://res.cloudinary.com/rathodpratik/image/upload/v1737298842/smart_Watch-removebg-preview_fmk3fp.png",
      Price: "200",
      Rating: 4.3,
      Description:
        "A stylish smartwatch with health tracking and notifications.",
    },
    {
      off:35,
      Review: 200,
      Original_Price: "500",
      Product_name: "Camera",
      product_image_url:
        "https://res.cloudinary.com/rathodpratik/image/upload/v1737298836/camera-removebg-preview_sa7a88.png",
      Price: "450",
      Rating: 4.7,
      Description:
        "A high-resolution camera perfect for photography enthusiasts.",
    },
    {
      off:35,
      Review: 188,
      Original_Price: "40",
      Product_name: "Headphones",
      product_image_url:
        "https://res.cloudinary.com/rathodpratik/image/upload/v1737198642/Headphones_cyothy.png",
      Price: "30",
      Rating: 4.6,
      Description: "Comfortable headphones with excellent sound quality.",
    },
    {
      off:45,
      Review: 189,
      Original_Price: "43000",
      Product_name: "Gaming Console",
      product_image_url:
        "https://res.cloudinary.com/rathodpratik/image/upload/v1737299724/gaming_console-removebg-preview_fwjdjm.png",
      Price: "40000",
      Rating: 4.9,
      Description:
        "A gaming console for immersive and high-performance gaming.",
    },
    {
      off:33,
      Review: 177,
      Original_Price: "32000",
      Product_name: "Tablet",
      product_image_url:
        "https://res.cloudinary.com/rathodpratik/image/upload/v1737298835/tablet-removebg-preview_aiqq12.png",
      Price: "25000",
      Rating: 4.4,
      Description:
        "A versatile tablet with a vivid screen and multitasking capabilities.",
    },
    {
      off:34,
      Review: 167,
      Original_Price: "2500",
      Product_name: "Keyboard",
      product_image_url:
        "https://res.cloudinary.com/rathodpratik/image/upload/v1737198646/keyboard_q2qhcf.png",
      Price: "1500",
      Rating: 4.2,
      Description:
        "A mechanical keyboard with customizable keys and RGB lighting.",
    },
    {
      off:10,
      Review: 250,
      Original_Price: "2000",
      Product_name: "Mouse",
      product_image_url:
        "https://res.cloudinary.com/rathodpratik/image/upload/v1737299339/mouse-removebg-preview_k5v8ai.png",
      Price: "1200",
      Rating: 4.1,
      Description: "An ergonomic mouse with high precision and durability.",
    },
    {
      off:15,
      Review: 176,
      Original_Price: "120",
      Product_name: "Gaming Chair",
      product_image_url:
        "https://res.cloudinary.com/rathodpratik/image/upload/v1737298846/gaming_Chair-removebg-preview_xlvwmv.png",
      Price: "10000",
      Rating: 4.6,
      Description:
        "A comfortable gaming chair with lumbar support and adjustable settings.",
    },
    {
      off:17,
      Review: 166,
      Original_Price: "450",
      Product_name: "Smart TV",
      product_image_url:
        "https://res.cloudinary.com/rathodpratik/image/upload/v1737198679/Monitor_y6b3pk.png",
      Price: "35000",
      Rating: 4.7,
      Description: "A smart TV with stunning visuals and seamless streaming.",
    },
    {
      off:35,
      Review: 225,
      Original_Price: "6000",
      Product_name: "Bluetooth Speaker",
      product_image_url:
        "https://res.cloudinary.com/rathodpratik/image/upload/v1737198402/Bluetooth_speaker_dbldrw.png",
      Price: "5000",
      Rating: 4.5,
      Description: "A portable Bluetooth speaker with crystal-clear sound.",
    },
    {
      off:45,
      Review: 219,
      Original_Price: "2500",
      Product_name: "Power Bank",
      product_image_url:
        "https://res.cloudinary.com/rathodpratik/image/upload/v1737198422/power_bank_ujro2u.jpg",
      Price: "2000",
      Rating: 4.3,
      Description: "A high-capacity power bank for charging devices on the go.",
    },
    {
      Review: 224,
      Original_Price: "3300",
      Product_name: "Wireless Earbuds",
      product_image_url:
        "https://res.cloudinary.com/rathodpratik/image/upload/v1737198423/earbuds_m4c7ri.jpg",
      Price: "3000",
      Rating: 4.4,
      Description: "Compact wireless earbuds with noise cancellation.",
      off:40,
    },
    {
      off:45,
      Review: 227,
      Original_Price: "3000",
      Product_name: "Fitness Tracker",
      product_image_url:
        "https://res.cloudinary.com/rathodpratik/image/upload/v1737299922/fitness_tracker-removebg-preview_1_wobads.png",
      Price: "2500",
      Rating: 4.2,
      Description: "A fitness tracker to monitor your health and activities.",
    },
    {
      off:30,
      Review: 212,
      Original_Price: "22000",
      Product_name: "Drone",
      product_image_url:
        "https://res.cloudinary.com/rathodpratik/image/upload/v1737298816/Drone-removebg-preview_p16we9.png",
      Price: "20000",
      Rating: 4.8,
      Description: "A high-tech drone with a 4K camera and long flight time.",
    },
    {
      off:35,
      Review: 245,
      Original_Price: "17500",
      Product_name: "VR Headset",
      product_image_url:
        "https://res.cloudinary.com/rathodpratik/image/upload/v1737298816/VR_headSet-removebg-preview_n5usff.png",
      Price: "15000",
      Rating: 4.7,
      Description: "A virtual reality headset for immersive experiences.",
    },
    {
      off:25,
      Review: 239,
      Original_Price: "550",
      Product_name: "Desktop PC",
      product_image_url:
        "https://res.cloudinary.com/rathodpratik/image/upload/v1737298816/Desk_top-removebg-preview_kk5edc.png",
      Price: "50000",
      Rating: 4.9,
      Description: "A powerful desktop PC for gaming and productivity.",
    },
    {
      Review: 219,
      Original_Price: "5000",
      Product_name: "Hard Drive",
      product_image_url:
        "https://res.cloudinary.com/rathodpratik/image/upload/v1737198577/hard_Disk_p27xop.jpg",
      Price: "4000",
      Rating: 4.5,
      Description: "An external hard drive with ample storage capacity.",
      off:40,
    },
  ];
  res.status(200).json(data);
};
