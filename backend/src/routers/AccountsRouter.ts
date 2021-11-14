import express, { Router } from 'express';
import AccountsController from '../controllers/accountsController';

const accountsRouter = Router();
const todosController = new AccountsController();

accountsRouter.get('/register', todosController.registerAccounts);

export default accountsRouter;