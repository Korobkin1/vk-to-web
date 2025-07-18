require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const http = require('http');
const cors = require('cors');
const { initializeAdmin } = require('./auth');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:8080"
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  initializeAdmin();
})
.catch(err => console.error('MongoDB connection error:', err));

// WebSocket
io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('newQuestion', (data) => {
    io.emit('newQuestion', data);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/questions', require('./routes/questions'));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
