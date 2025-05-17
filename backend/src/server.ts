import express from 'express';
import colors from 'colors';
import morgan from 'morgan';

import { db } from './config/db';

//Routers
import budgetRouter from './routes/budgetRouter'
import authRouter from './routes/authRouter'
import { limiter } from './config/limiter';

async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        console.log(colors.blue.bold('The database has conect succesfully'));
    } catch (error) {
        console.log(colors.red.bold('Error al conectar a la base de datos ' + error));
    }
}

connectDB();


const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Limitador ( Rate limiter )

app.use(limiter)

//Rutas consumidas
app.use('/api/budgets', budgetRouter);
app.use('/api/auth', authRouter);



export default app;
