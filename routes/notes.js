const fs = require('fs');
const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('../helpers/fsUtils');
//Get all notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});
// Get note by id
notes.get('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
          const result = json.filter((note) => note.id === noteId);
          return result.length > 0
            ? res.json(result)
            : res.json('No note with that ID');
        });
})
// Delete note based on id number
notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
          // single out note based on id and delete
        const result = json.filter((note) => note.id !== noteId);
        writeToFile('./db/db.json', result);
        res.json(`Note deleted!`);
      });
  });
// Post notes to db.json file
notes.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            // Note id is randomaly generated using uuid
            id: uuidv4(),
        };
        // Append to json file and respond with the newly generated note 
        readAndAppend(newNote, './db/db.json');
        res.json(newNote)        
    } else {
        res.error('Error')
    }
});

module.exports = notes;