const express = require('express');
const app = express();
const puerto = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];


app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});


app.get('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const usuario = usuarios.find(user => user.nombre === nombre);
    if (!usuario) {
        res.status(404).send('Usuario no encontrado');
    } else {
        res.json(usuario);
    }
});

app.post('/usuarios', (req, res) => {
    const nuevoUsuario = req.body;
    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
});


app.put('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const index = usuarios.findIndex(user => user.nombre === nombre);
    if (index === -1) {
        res.status(404).send('Usuario no encontrado');
    } else {
        usuarios[index] = req.body;
        res.json(usuarios[index]);
    }
});


app.delete('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    usuarios = usuarios.filter(user => user.nombre !== nombre);
    res.status(204).send();
});

app.listen(puerto, () => {
    console.log(`Express está escuchando en el puerto ${puerto}`);
});


