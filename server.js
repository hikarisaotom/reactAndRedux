const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

//conectar la base de datos
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

//app.get('/', (req, res) => res.send('API Running'));
// el segundo parametro es lo que vamos a responder cuando nos hagan un get

//Definir routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/post'));
app.use('/api/profile', require('./routes/api/profile'));

//Serve static assets in prod
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

//segundo parametro es lo que va a pasar cuando nos conectemos
// ` (tecla [`^])es diferente de ' (tecla ?')
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
