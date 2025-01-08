const express=require('express');
const app=express();
const cors=require('cors');
const cookieParser=require('cookie-parser');
const {connectToMongo}=require('./controller/Connection');
require('dotenv').config();


connectToMongo(process.env.DB_CONNECTION_STRING)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exit the process if the DB connection fails
    });


const corsOptions={
    origin:'http://localhost:5173',
    methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials:true
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send('Hello World');
});


app.use('/Auth',require('./routes/AuthRoutes'));
app.use('/wishList',require('./routes/WishListRoute'))
app.use('/Billing',require('./routes/BillingRoutes'));
app.use('/Product',require('./routes/ProductRoutes'));
app.use('/Cart',require('./routes/CartRoute'));

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});