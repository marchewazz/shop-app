import express, {Application} from 'express';
import cors from 'cors';

import accountsRouter from './routers/AccountsRouter';
import prodcutsRouter from './routers/ProductsRouter';
import ordersRouter from './routers/OrdersRouter';

import PaymentsController from './controllers/paymentsController';

class Server {
    private app: Application;
    private options: cors.CorsOptions = {
        origin: ['http://localhost:4200']
    };
    private PORT : number = 5000; 
    
    private ps: PaymentsController = new PaymentsController();

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
    }
    public start() {
        this.app.listen(this.PORT, (): void => {
            console.log(`server is listening ${this.PORT}`);
        })
        setInterval(this.ps.updatePayments, 60000);
    }
}

export default Server;