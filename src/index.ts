import { log } from 'console'
import app from './app'
import { inicializeDatabase } from './db/db'

const port = parseInt(process.env.PORT || '6050', 10)
const host = process.env.HOST || '0.0.0.0'

async function main() {
    try {
        await inicializeDatabase()
        console.log('Base de datos conectada');
        
        app.listen(port, host, ()=> {
            console.log(`Servidor activo en el puerto ${port}`);            
        })
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log('Error al conectar con la base de datos: ', err.message)
        }        
    }
}

main()