import express, {Request, Response, Application} from 'express';
import cors from 'cors';
import main from './database/db';

const app: Application = express();

const options: cors.CorsOptions = {
    origin: ['http://localhost:4200']
  };

app.use(cors(options))
app.use(express.json())

const PORT = 5000;

app.get("/", (req: Request, res: Response): void => {
    main().then((result) => {
        res.send(result)
    })
})

app.listen(PORT, (): void => {
    console.log(`server running here ${PORT}`);
})