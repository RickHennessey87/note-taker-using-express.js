const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = 3001;
const { v4: uuidv4 } = require('uuid');
const app = express();

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8', (error, notes) => {
        if (error) {
            throw error
        } else {
            res.json(JSON.parse(notes))
        }
    });
});

app.post('/api/notes', (req, res) => {
    const note = req.body;
})