import express from 'express';
import cors from 'cors';
import rotaConsole from './Rotas/rotaConsole.js';
import rotaMarca from './Rotas/rotaMarca.js';

const host='0.0.0.0';
const porta=3000;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/marca',rotaMarca);
app.use('/console',rotaConsole);

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
