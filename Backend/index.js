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
        process.exit(1); 
    });


    const corsOptions = {
        origin: [process.env.FRONTEND, "http://localhost:3000"],
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true
    };
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send('Hello World');
});


app.use('/api',require('./routes/AuthRoutes'));
app.use('/wishList',require('./routes/WishListRoute'))
app.use('/Billing',require('./routes/BillingRoutes'));
app.use('/Product',require('./routes/ProductRoutes'));
app.use('/Cart',require('./routes/CartRoute'));
app.use('/Contect',require('./routes/ContectRoutes'));
app.use('/Profile',require('./routes/ProfileRoutes'));
app.use('/order',require('./routes/OrderRoutes'))

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});