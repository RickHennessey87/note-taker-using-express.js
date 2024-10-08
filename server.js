const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = 3001;
const { v4: uuidv4 } = require('uuid');
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
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
    
    note.id = uuidv4();
    
    fs.readFile('db/db.json', 'utf8', (error, data) => {
        if (error) {
            throw error
        } else {
            const notes = JSON.parse(data);
            
            notes.push(note);
            
            fs.writeFile('db/db.json', JSON.stringify(notes), (error) => {
                if (error) {
                    throw error;
                } else {
                    res.json(note);
                }
            })
        }
    })
});

app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;

    fs.readFile('db/db.json', 'utf8', (error, data) => {
        if (error) {
            throw error;
        } else {
            let notes = JSON.parse(data);

            notes = notes.filter(note => note.id !== noteId);

            fs.writeFile('db/db.json', JSON.stringify(notes), (error) => {
                if (error) {
                    throw error;
                } else {
                    res.json({ message: `Note id ${noteId} deleted` });
                }
            });
        }
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});