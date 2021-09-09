const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());
app.options('*', cors());

require('dotenv/config');
const api = process.env.API_URL

const productRouter = require('./routers/product');
const categoryRouter = require('./routers/category');
const userRouter = require('./routers/users');
//middleware
app.use(express.json());
app.use(morgan('tiny'));

//Routers
app.use(`${api}/products`, productRouter);
app.use(`${api}/categories`, categoryRouter);
app.use(`${api}/users`, userRouter);

mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName:'eshop_database'
})
.then(() => {
    console.log('database connection is ready...');
})
.catch((err)=>{
    console.log(err);
})
app.listen(3000, ()=> {
    console.log(api);
    console.log('server is runing http://localhost:3000');
})