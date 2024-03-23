const express=require('express');
const app=express();
const {chats}=require('./data/data');
const connectDatabase=require('./config/database');
app.use(express.json());  // to accept json data
connectDatabase();
const userRoutes=require('./routes/userRoutes.js');
const chatRoutes=require('./routes/chatRoutes');
const messageRoutes=require('./routes/messageRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const port=5000;
app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes);
app.use(notFound);
app.use(errorHandler);
app.listen(port,
console.log("server is running on port "+port));