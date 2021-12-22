import express, { Router } from 'express';
import AccountsController from '../controllers/accountsController';

const accountsRouter = Router();
const accountsController = new AccountsController();

accountsRouter.post('/register', accountsController.registerAccounts);
accountsRouter.get('/login', accountsController.loginUser)
accountsRouter.put('/updatebanknumber', accountsController.updateBankNumber)

export default accountsRouter;