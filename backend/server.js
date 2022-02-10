import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import Mongoose from 'mongoose';

import UsersRouter from './Routes/UsersRouter.js'
import ListsRouter from './Routes/ListsRouter.js'
import ItemsRouter from './Routes/ItemsRouter.js'
import auth from './Middleware/auth.js';



const app = express()

// Config
dotenv.config()
app.use( cors() )
app.use( express.json() )


app.use( '/api/users', UsersRouter )
app.use( '/api/lists', auth, ListsRouter )
app.use( '/api/items', auth, ItemsRouter )


const PORT = process.env.PORT || 8080
app.listen( PORT, () =>
{
   console.log( `server nasłuchuje na porcie ${ PORT }` )
} )


const URL = process.env.URL
Mongoose.connect( URL, ( err ) =>
{
   if ( err ) return console.log( err )
   console.log( 'Connected with database' )
} )

