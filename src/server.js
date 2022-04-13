const express = require('express');
const {Server: HttpServer} = require('http');
const {Server: Socket} = require('socket.io');
const moment = require('moment');

const ProductsApi = require('../api/products.js');
const MessagesApi = require('../api/messages.js');

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

const products = new ProductsApi();
const messages = new MessagesApi('./data/messages.json');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

// Functions
const getAllProducts = (socket) => {
  socket.emit('list-products', products.getAll());
};

const getAllMessages = (socket) => {
  messages.getAll().then(list => {
    socket.emit('list-messages', JSON.parse(list));
    getAllProducts(socket);
  }).catch(e => console.log(e));
};


// Socket configuration
io.on('connection', async socket => {
  // Products list
  getAllProducts(socket);

  // Add product
  socket.on('add-product', product => {
    products.createProduct(product);
    socket.emit('list-products', products.getAll());
  });

  // List messages
  getAllMessages(socket);
  // Add message
  socket.on('add-message', data => {
    const message = {
      ...data,
      date: moment(new Date()).format('DD/MM/YYYY HH:MM:SS')
    };
    messages.save(message).then(response => {
      getAllMessages(socket);
      getAllProducts(socket);
    }).catch(error => console.log(error));
  });
});

// Start server
const PORT = 8080;
const server = httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
server.on('error', error => console.log(`Server error: ${error}`));