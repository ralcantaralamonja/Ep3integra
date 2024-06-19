const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/users');
const db = require('./config/database');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.post('/api/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const user = new User({ firstName, lastName, email, password });
        await user.save();
        res.status(201).send({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).send({ message: 'Correo electrónico o contraseña incorrectos' });
        }
        res.status(200).send({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
