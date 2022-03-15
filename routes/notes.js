const fs = require('fs');
const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    //writeToFile,
  } = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(data));
});

notes.post('/', (req, res) => {
    console.log(req.body);

    const note = req.body;

    if (req.body) {
        const newNote = {
            note,
            note_id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json('Note added!')        
    } else {
        res.error('Error')
    }
});

module.exports = notes;