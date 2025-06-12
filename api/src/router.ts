import { Router } from "express";

import { listCategories } from "./app/useCases/categories/listCategories";
import { createCategories } from "./app/useCases/categories/createCategory";
import { listProducts } from "./app/useCases/products/listProducts";
import { createProduct } from "./app/useCases/products/createProduct";
import { removeProduct } from "./app/useCases/products/removeProduct";
import { upload } from "./middlewares/uploadImage";
import { listProductsByCategory } from "./app/useCases/categories/listProductsByCategory";
import { listOrders } from "./app/useCases/orders/listOrders";
import { changeOrderStatus } from "./app/useCases/orders/changeOrderStatus";
import { cancelOrder } from "./app/useCases/orders/deleteOrder";
import { editCategories } from "./app/useCases/categories/editCategories";
import { createOrder } from "./app/useCases/orders/createOrder";

export const router = Router();

// List categories
router.get('/categories', listCategories);

// Create category
router.post('/categories', createCategories);

// Edit category
router.patch('/categories/:categoryId', editCategories)

// Get products by category
router.get('/categories/:categoryId/products', listProductsByCategory);

// List products
router.get('/products', listProducts);

// Create product
router.post('/products', upload.single('image'), createProduct);

//UpdateProduct
router.delete('/products/:productId', removeProduct);

// List orders
router.get('/orders', listOrders);

// Create order
router.post('/orders', createOrder);

// Change order status
router.patch('/orders/:orderId', changeOrderStatus);

// Delete / Cancel order
router.delete('/orders/:orderId', cancelOrder);
