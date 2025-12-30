const fs = require("fs");
const fsp = require("fs").promises;
const { DateTime } = require("luxon");

const fileContent = fs.readFileSync('notes.json', 'utf8');
const file = JSON.parse(fileContent);
const listinha = file.noteList;

function igual(){
    
}

function addNote(title, body){
    function newID(){
        let lastID = parseInt(listinha[listinha.length-1].id);
        return lastID+1;
    }
    
    let arquivo = file;
    
    arquivo.noteList.push({
        id: newID(), 
        title: title,
        body: body,
        createdAt: DateTime.now()
    });
    
    let write = JSON.stringify(arquivo, null, 2);
    fsp.writeFile('notes.json', write)
    .then(data => {
        console.log(`Nota '${title}' adcionada com sucesso!`);
    })
    .catch(error => {
        console.error('Ocorreu um erro: ', error);
    });
}

module.exports = {
    addNote
};