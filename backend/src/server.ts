import express, {Application} from 'express';
import cors from 'cors';

import accountsRouter from './routers/AccountsRouter';
import prodcutsRouter from './routers/ProductsRouter';
import ordersRouter from './routers/OrdersRouter';
import commentsRouter from './routers/CommentsRouter';

import PaymentsController from './controllers/paymentsController';
import OrdersController from './controllers/ordersController';

//SERVER  CONFIG
class Server {
    private app: Application;
    private options: cors.CorsOptions = {
        origin: ['http://localhost:4200']
    };
    private PORT : number = 5000; 
    
    private ps: PaymentsController = new PaymentsController();
    private os: OrdersController = new OrdersController();

    constructor(){
        this.app = express();
        this.app.use(cors(this.options));
        this.app.use(express.json());
        this.routerConfig()
    }

    private routerConfig() {
        this.app.use('/accounts', accountsRouter)
        this.app.use('/products', prodcutsRouter)
        this.app.use('/orders', ordersRouter)
        this.app.use('/comments', commentsRouter)
    }
    public start() {
        this.app.listen(this.PORT, (): void => {
            console.log(`server is listening ${this.PORT}`);
        })
        //INTERVAL TO CHECK IF ANY NEW ORDERS HAVE BEEN PAID
        setInterval(() => {
            this.ps.updatePayments();
        }, 600000);
        setInterval(() => {
            this.os.updateOrders();
        }, 60000)
    }
}

export default Server;