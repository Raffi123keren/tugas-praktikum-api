const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let tasks = [
    { id: 1, title: 'Belajar API', status: 'Belum Selesai' }
];

app.get('/tasks', (req, res) => res.json(tasks));

app.post('/tasks', (req, res) => {
    const newTask = { id: Date.now(), title: req.body.title, status: 'Belum Selesai' };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.delete('/tasks/:id', (req, res) => {
    tasks = tasks.filter(t => t.id != req.params.id);
    res.send({ message: "Dihapus" });
});

// SATU Rute PUT untuk semua update (Edit judul & Checkbox)
app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id == req.params.id);
    if (task) {
        if (req.body.title !== undefined) task.title = req.body.title;
        if (req.body.status !== undefined) task.status = req.body.status;
        res.json(task);
    } else {
        res.status(404).send("Tidak ditemukan");
    }
});

app.listen(3000, () => console.log('Server berjalan di http://localhost:3000'));