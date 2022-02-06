import express, { Router } from 'express';

import accountsRouter from './AccountsRouter';
import prodcutsRouter from './ProductsRouter';
import ordersRouter from './OrdersRouter';
import commentsRouter from './CommentsRouter';
import listsRouter from './ListsRouter';

const apiRouter = Router();

apiRouter.use('/accounts', accountsRouter)
apiRouter.use('/products', prodcutsRouter)
apiRouter.use('/orders', ordersRouter)
apiRouter.use('/comments', commentsRouter)
apiRouter.use('/lists', listsRouter)

export default apiRouter;