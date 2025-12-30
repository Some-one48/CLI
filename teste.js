const fs = require("fs");
const { DateTime } = require("luxon");

const fileContent = fs.readFileSync('notes.json', 'utf8');
const file = JSON.parse(fileContent);

function newID(){
    let listinha = file.noteList;
    let lastID = parseInt(listinha[listinha.length-1].id);
    return lastID+1;
}

let arquivo = file;

let note = {
    id: newID(), 
    title: "Teste2",
    body: "teste3",
    createdAt: DateTime.now()
};

arquivo.noteList.push(note);

let write = JSON.stringify(arquivo, null, 2);
fs.writeFileSync('notes.json', write)