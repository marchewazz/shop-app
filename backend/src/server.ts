import express, {Application} from 'express';
import cors from 'cors';
import accountsRouter from './routers/AccountsRouter';
import prodcutsRouter from './routers/ProductsRouter';
class Server {
    private app: Application;
    private options: cors.CorsOptions = {
        origin: ['http://localhost:4200']
    };
    private PORT : number = 5000; 
    
    constructor(){
        this.app = express();
        this.app.use(cors(this.options));
        this.app.use(express.json());
        this.routerConfig()
    }

    private routerConfig() {
        this.app.use('/accounts', accountsRouter)
        this.app.use('/products', prodcutsRouter)
    }
    public start() {
        this.app.listen(this.PORT, (): void => {
            console.log(`server is listening ${this.PORT}`);
        })
    }
}

export default Server;