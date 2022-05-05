const express = require('express');
const {Server: HttpServer} = require('http');
const {Server: Socket} = require('socket.io');
const moment = require('moment');

const DatabaseApi = require('../api/database.js');

const config = require('../config/config.js');

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

const products = new DatabaseApi(config.mysql, 'products');
const messages = new DatabaseApi(config.sqlite, 'messages');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

// Functions
const getAllProducts = (socket) => {
  products.getAll().then(rows => {
    socket.emit('list-products', rows);
  });
};

const getAllMessages = (socket) => {
  messages.getAll().then(list => {
    socket.emit('list-messages', list);
    getAllProducts(socket);
  }).catch(e => console.log(e));
};


// Socket configuration
io.on('connection', async socket => {
  // Products list
  getAllProducts(socket);

  // Add product
  socket.on('add-product', product => {
    products.create(product).then(response => {
      getAllProducts(socket);
    });
  });

  // List messages
  getAllMessages(socket);
  // Add message
  socket.on('add-message', data => {
    const message = {
      ...data,
      date: moment(new Date()).format('DD/MM/YYYY HH:MM:SS')
    };
    messages.create(message).then(response => {
      getAllMessages(socket);
      getAllProducts(socket);
    }).catch(error => console.log(error));
  });
});

// Start server
const PORT = 8080;
const server = httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
server.on('error', error => console.log(`Server error: ${error}`));