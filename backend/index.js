const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

dotenv.config();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const ConnectDB = require('./config/db');
ConnectDB();

const PORT = process.env.PORT || 3000;

app.get('/', (req,res)=>{
    res.send("Working")
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

app.use('/api/auth', require('./Routes/authRoutes'));
app.use('/api/products', require('./Routes/productRoutes'));