import express from 'express';
import Routes from './routes'
import cors from 'cors'

const app = express();

app.use(cors())
app.use(express.json())
app.use(Routes)

app.listen(3003, () => console.log('Servidor rodando na porta *3333 link -> https://localhost:3333'));
