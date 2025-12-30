const fs = require("fs");
const fsp = require("fs").promises;
const { DateTime } = require("luxon");

const fileContent = fs.readFileSync('notes.json', 'utf8');
const file = JSON.parse(fileContent);
const listinha = file.noteList;

function addNote(title, body){
    function igual(title){
        let verif = title.toLowerCase();
        for(let i = 0; i < listinha.length; i++){
            let titulo = listinha[i].title.toLowerCase();
            if(verif === titulo){
                return false;
            }else if (i == listinha.length-1){
                return true;
            }
        }
    }

    function newID(){
        let lastID = parseInt(listinha[listinha.length-1].id);
        return lastID+1;
    }
    
    if(igual(title)){
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
    }else {
        console.error('ERRO: Título já existente');
    }
}

function list(){
    console.log('Suas Notas:');
    for(let i = 0; i < listinha.length; i++) {
        let algo = DateTime.fromISO(listinha[i].createdAt);
        const formattedDate = `${algo.day}/${algo.month}/${algo.year}`;
        console.log(`- (Criada em: ${formattedDate}) ${listinha[i].title}`);
    }
}

module.exports = {
    addNote
};