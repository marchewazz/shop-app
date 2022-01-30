import express, { Router } from 'express';
import ListsController from '../controllers/listsController';

const listsRouter = Router();
const listsController = new ListsController();

listsRouter.post(`/add`, listsController.addList)
listsRouter.post(`/getone`, listsController.getOneList)
listsRouter.post(`/getuserslists`, listsController.getAllUsersLists)
listsRouter.post(`/deleteone`, listsController.deleteOneList)

export default listsRouter;