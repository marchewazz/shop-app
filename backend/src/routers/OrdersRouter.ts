import express, { Router } from 'express';
import OrdersController from '../controllers/ordersController';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.post('/add', ordersController.addOrder)
ordersRouter.post('/getall', ordersController.getAllOrders)
ordersRouter.post('/cancel', ordersController.cancelOrder)

export default ordersRouter;