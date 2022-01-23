import express, { Router } from 'express';
import ListsController from '../controllers/listsController';

const listsRouter = Router();
const listsController = new ListsController();

listsRouter.post(`/add`, listsController.addList)

export default listsRouter;