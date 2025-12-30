const fs = require("fs");
const { DateTime } = require("luxon");

const fileContent = fs.readFileSync('notes.json', 'utf8');
const file = JSON.parse(fileContent);
const listinha = file.noteList;

//function list(){
    console.log('Suas Notas:');
    for(let i = 0; i < listinha.length; i++) {
        let algo = DateTime.fromISO(listinha[i].createdAt);
        const formattedDate = `${algo.day}/${algo.month}/${algo.year}`;
        console.log(`- (Criada em: ${formattedDate}) ${listinha[i].title}`);
    }
