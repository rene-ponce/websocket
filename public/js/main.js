const socket = io.connect();

socket.on('list-products', products => {
  console.log('event table');
  const t = tableProducts(products);
  t.then(r => {
    document.getElementById('productos').innerHTML = r;
  })
});

const tableProducts = (products) => {
  return fetch('templates/products-table.hbs')
    .then(response => response.text())
    .then(template => {
      const view = Handlebars.compile(template);
      const html = view({products})
      return html;
    });
}

const productBtn = document.getElementById('btnSendProduct');

productBtn.addEventListener('click', e => {
  const data = {
    title: document.getElementById('nombre').value,
    price: document.getElementById('precio').value,
    thumbnail: document.getElementById('foto').value
  };
  socket.emit('add-product', data);
});

socket.on('list-messages', messages => {
  renderMessages(messages);
});

const renderMessages = (messages) => {
  const html = messages.map((message, index) => {
    return (`<div><span style="color: blue">${message.email}</span> <span style="color: brown">[${message.date}]</span>: <span style="color: green"><em>${message.message}</em></span></div>`)
  }).join(" ");
  document.getElementById('mensajes').innerHTML = html;
};

const chatBtn = document.getElementById('btnEnviar');

chatBtn.addEventListener('click', e => {
  if (document.getElementById('inputMensaje').value === "") {
    alert('Introdiuce un email');
    return;
  }
  const data = {
    email: document.getElementById('inputUsername').value,
    message: document.getElementById('inputMensaje').value
  }
  socket.emit('add-message', data);
});