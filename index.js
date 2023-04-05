const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');
// 
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');

// configuring env
dotenv.config();

// imporrting routes file
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

// database connection
connectDB();

// executing express
const app = express()

// middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// routes 
// app.get('/', (req, resp) => {
//     resp.status(200).send({
//         message: "node server"
//     });
// });
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);


// port, exporting from env file 
const PORT = process.env.PORT || 4000;

app.listen(5000, () => {
    console.log(`server running on ${process.env.Dev_Mode} mode port ${PORT}`.bgCyan.white);
})