import express, { Router } from 'express';
import ProductsController from '../controllers/productsController';

const prodcutsRouter = Router();
const productsController = new ProductsController();

prodcutsRouter.get('/getall', productsController.getAllProducts);

export default prodcutsRouter;