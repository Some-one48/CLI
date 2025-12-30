const fs = require("fs");
const { DateTime } = require("luxon");

const fileContent = fs.readFileSync('notes.json', 'utf8');
const file = JSON.parse(fileContent);

let listinha = file.noteList;

let lastID = parseInt(listinha[listinha.length-1].id);

console.log(lastID);