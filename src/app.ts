import express, {Request, Response }  from "express";
import cors from 'cors';
import morgan from "morgan";
import path from "path";

import estudianteRoutes from'./routes/estudianteRoutes';

import methodOverride from 'method-override';
import profesoresRoutes from "./routes/profesoresRoutes"; 
import cursosRoutes from "./routes/cursosRoutes"; 

const app=express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('public'));

app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use(cors());

app.get('/',(req:Request,res:Response)=>{
    return res.render('layout', {
        pagina: 'App Univerdsidad',
    });
});

app.use('/estudiantes', estudianteRoutes);
app.use('/profesores', profesoresRoutes);
app.use('/cursos', cursosRoutes);

export default app;