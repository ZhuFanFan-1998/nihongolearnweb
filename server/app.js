const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db'); // Use destructuring
const apiRoutes = require('./routes/api');
const { WebSocketServer } = require('ws');
const handlerSocket = require('./socket/socket');

const app = express();

const server = require('http').createServer(app);

app.use(cors());
app.use(express.json());

// Connect to the database
connectDB();
// Initialize HTTP ROUTES
app.use('/api', apiRoutes);

// Initialize UI PORT
app.use(cors({ origin: 'http://localhost:4173' }));

// Initialize WebSocket server
const WS_PATH_PK = process.env.WS_PATH_PK || '/pk';
const wss = new WebSocketServer({ server, path: WS_PATH_PK });
handlerSocket(wss);

// Listen HTTP & WebSocket Messages
const PORT = process.env.PORT || 3003;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
