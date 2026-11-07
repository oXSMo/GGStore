import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import { Product } from "./models/product.module.js";

dotenv.config({ path: fileURLToPath(new URL("../.env", import.meta.url)) });

const products = [
  {
    name: "RTX 3060 12GB",
    price: 55000,
    priceBought: 45000,
    quantity: 5,
    description: "NVIDIA GeForce RTX 3060 12GB graphics card.",
    image: "",
    category: "GPU",
    tags: ["NVIDIA", "Gaming", "12GB", "Graphics Card"],
  },
  {
    name: "RX 6600 XT",
    price: 48000,
    priceBought: 39000,
    quantity: 3,
    description: "AMD Radeon RX 6600 XT graphics card.",
    image: "",
    category: "GPU",
    tags: ["AMD", "Gaming", "8GB", "Graphics Card"],
  },
  {
    name: "Kingston Fury 16GB DDR4",
    price: 7500,
    priceBought: 6000,
    quantity: 10,
    description: "Kingston Fury 16GB DDR4 RAM.",
    image: "",
    category: "RAM",
    tags: ["Kingston", "DDR4", "16GB"],
  },
  {
    name: "Samsung 970 EVO Plus 500GB",
    price: 9500,
    priceBought: 7800,
    quantity: 7,
    description: "Samsung NVMe M.2 SSD 500GB.",
    image: "",
    category: "SSD",
    tags: ["Samsung", "NVMe", "500GB"],
  },
  {
    name: "WD Blue 1TB HDD",
    price: 6500,
    priceBought: 5000,
    quantity: 4,
    description: "Western Digital Blue 1TB hard drive.",
    image: "",
    category: "Storage",
    tags: ["WD", "HDD", "1TB"],
  },
  {
    name: "Redragon K552 Keyboard",
    price: 8500,
    priceBought: 6500,
    quantity: 6,
    description: "Mechanical gaming keyboard.",
    image: "",
    category: "Keyboard",
    tags: ["Redragon", "Mechanical", "Gaming"],
  },
  {
    name: "Thunderobot Gaming Mouse",
    price: 4500,
    priceBought: 3200,
    quantity: 8,
    description: "RGB gaming mouse.",
    image: "",
    category: "Mouse",
    tags: ["Thunderobot", "RGB", "Gaming"],
  },
  {
    name: "Corsair 650W PSU",
    price: 14000,
    priceBought: 11000,
    quantity: 3,
    description: "Corsair 650W power supply.",
    image: "",
    category: "PSU",
    tags: ["Corsair", "650W", "Power Supply"],
  },
  {
    name: "Gaming PC Case RGB",
    price: 12000,
    priceBought: 9000,
    quantity: 4,
    description: "Gaming PC case with RGB fans.",
    image: "",
    category: "Case",
    tags: ["RGB", "Gaming", "PC Case"],
  },
  {
    name: "Ryzen 5 5600",
    price: 25000,
    priceBought: 21000,
    quantity: 5,
    description: "AMD Ryzen 5 5600 desktop processor.",
    image: "",
    category: "CPU",
    tags: ["AMD", "Ryzen", "AM4"],
  },
];

const seedProducts = async () => {
  const databaseUrl = process.env.DB_URL;
  if (!databaseUrl) {
    throw new Error("DB_URL is not set in the project root .env file");
  }

  await mongoose.connect(databaseUrl);
  console.log("MongoDB connected");

  try {
    await Product.deleteMany({});
    console.log("Old products deleted");

    await Product.insertMany(products);
    console.log(`${products.length} products inserted successfully`);
  } finally {
    await mongoose.disconnect();
  }
};

seedProducts().catch((error) => {
  console.error("Seeding error:", error.message);
  process.exitCode = 1;
});
