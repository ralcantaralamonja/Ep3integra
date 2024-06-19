const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://<username>:<password>@cluster0.bzrdzoq.mongodb.net/UserDB?retryWrites=true&w=majority';

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'UserDB',
    user: 'ep3',      // Reemplaza con tu nombre de usuario
    pass: 'ep3'    // Reemplaza con tu contraseña
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB Atlas');
});

module.exports = db;
