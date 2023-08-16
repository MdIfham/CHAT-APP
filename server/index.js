const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./routes/userRoutes')
const messageRoutes = require('./routes/messageRoutes')
require('dotenv').config();
const socket = require('socket.io');

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`DB Connection Successful`);
}).catch((err) => {
    console.log(err.message);
});

const server = app.listen(PORT, () => {
    console.log(`Server started on Port ${PORT}`);
});

const io = socket(server, {
    cors: {
        origin: ["http://localhost:3000", "https://chat-app-xejg.onrender.com"],
        credentials: true,
    }
});

global.onlineUsers = new Map();
 
io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        // console.log("send-msg", {data});
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.message);
        }
    });
});

