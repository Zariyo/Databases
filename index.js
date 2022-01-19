const express = require('express');
const app = express();
const cards = require('./routes/cards');
const producents = require('./routes/producents')
const cors = require('cors');

app.use(express.json());
app.use(cors())
// „Podłączamy” obsługę „endpointów”, które zdefiniowaliśmy dla kolekcji 'cards' w katalogu routes/cards.js
app.use('/cards', cards);
app.use('/producents', producents)


require('dotenv').config();
const dbConnData = {
    host: process.env.MONGO_HOST || '127.0.0.1',
    port: process.env.MONGO_PORT || 27017,
    database: process.env.MONGO_DATABASE || 'local'
};
// Łączymy się z bazą i „stawiamy” serwer API
// Do kontaktu z serwerem MongoDB wykorzystamy bibliotekę Mongoose

const mongoose = require('mongoose');

mongoose
  .connect(`mongodb://${dbConnData.host}:${dbConnData.port}/${dbConnData.database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(response => {
    console.log(`Connected to MongoDB. Database name: "${response.connections[0].name}"`)
    const port = process.env.PORT || 5000
    app.listen(port, () => {
      console.log(`API server listening at http://localhost:${port}`);
    });
  })
  .catch(error => console.error('Error connecting to MongoDB', error));

