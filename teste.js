const fs = require("fs");
const { DateTime } = require("luxon");

const fileContent = fs.readFileSync('notes.json', 'utf8');
const file = JSON.parse(fileContent);
const listinha = file.noteList;

id = 2;

let arquivo = file;
let lista = listinha;
console.log(arquivo.noteList[2]);
arquivo.noteList[2] = {
    id: lista[2].id, 
    title: ':D',
    body: 'bora',
    createdAt: lista[2].createdAt,
    updatedAt: DateTime.now()
};
console.log(arquivo.noteList[2]);