const fs = require("fs");
const fsp = require("fs").promises;
const { DateTime } = require("luxon");

// Variáveis Globais
let empty = false;

function verif(){
    if(fs.existsSync('notes.json')){
        let auxiliar = fs.readFileSync('notes.json', 'utf8');
        if(auxiliar == ''){
            return [JSON.stringify({noteList: []}, null, 2), true];
        }else{
            return [auxiliar, false];
        }
    }else{
        return [JSON.stringify({noteList: []}, null, 2), false];
    }
}
retorno = verif();
empty = retorno[1];

const fileContent = retorno[0];
const file = JSON.parse(fileContent);
const listinha = file.noteList;

// Funções auxiliares

function igual(title, id){
    let verif = title.toLowerCase();
    for(let i = 0; i < listinha.length; i++){
        let titulo = listinha[i].title.toLowerCase();
        if(id == 0){
            if(verif === titulo){
            return false;
            }else if (i == listinha.length-1){
                return true;
            }
        }else{
            id = id-1;
            if(i != id){
                if(verif === titulo){
                    return false;
                }else if (i == listinha.length-1){
                    return true;
                }
            }
        }
    }
}

function isID(id){
    if(id <= listinha.length){
        return true;
    }else {
        return false;
    }
}

function isEmpty(str){
    if(str.length == 0){
        return true;
    }else{
        return false;
    }
}

function write(wfile, msg){
    let write = JSON.stringify(wfile, null, 2);
    fsp.writeFile('notes.json', write)
    .then(() => {
        console.log(msg);
    })
    .catch(error => {
        console.error('Ocorreu um erro: ', error);
    });
}

// Funçoes principais

function addNote(title, body){
    function newID(){
        let lastID = parseInt(listinha[listinha.length-1].id);
        return lastID+1;
    }
    
    if(igual(title, 0)){
        let arquivo = file;
        
        arquivo.noteList.push({
            id: newID(), 
            title: title,
            body: body,
            createdAt: DateTime.now()
        });
        
        write(arquivo, `Nota '${title}' adicionada com sucesso!`);
    }else {
        console.error('ERRO: Título já existente');
    }
}

function list(){
    if(empty){
        console.log('Nenhuma nota encontrada');
    }else {
        console.log('Suas Notas:');
        for(let i = 0; i < listinha.length; i++) {
            let algo = DateTime.fromISO(listinha[i].createdAt);
            const formattedDate = `${algo.day}/${algo.month}/${algo.year}`;
            console.log(`${listinha[i].id}. (Criada em: ${formattedDate}) ${listinha[i].title}`);
        }
    }
}

function read(id){
    function format(i){
        let algo = DateTime.fromISO(listinha[i].createdAt);
        return `${algo.day}/${algo.month}/${algo.year} ${algo.hour}:${algo.minute}`;
    }
    
    if(isID(id)){
        console.log('----------------------------------------');
        console.log('ID:', listinha[id-1].id);
        console.log('Título:', listinha[id-1].title);
        console.log('Criada em:', format(id-1));
        console.log('----------------------------------------');
        console.log(listinha[id-1].body);
    }else {
        console.error('ERRO: ID não encontrado');
    }
}

function update(id, newTitle, newBody){
    if(isID(id)){
        let arquivo = file;
        let aux = id-1;

        let v = 2;

        if(igual(newTitle, id)) {
            if(isEmpty(newTitle)){
                newTitle = arquivo.noteList[aux].title;
                v = v-1;
            }
            if(isEmpty(newBody)){
                newBody = arquivo.noteList[aux].body;
                v = v-1;
            }

            if(v >= 1){
                arquivo.noteList[aux] = {
                    id: arquivo.noteList[aux].id, 
                    title: newTitle,
                    body: newBody,
                    createdAt: arquivo.noteList[aux].createdAt
                };

                write(arquivo, `Nota de ID ${listinha[aux].id} alterada com sucesso!`);
            }else {
                console.error('ERRO: Você deve alterar pelo menos uma (1) instância para atualizar uma nota');
            }
        }else{
            console.error('ERRO: Título existente');
        }
    }else{
        console.error('ERRO: ID não encontrado');
    }
}

function remove(id){
    if(isID(id)){
        let arquivo = file;
        let aux = id-1;
        let title = listinha[aux].title;

        arquivo.noteList.splice(aux, 1);
        for(let i = 0; i < arquivo.noteList.length; i++){
            arquivo.noteList[i].id = i+1;
        }

        write(arquivo, `Nota '${title}' (ID ${id}) foi removida com sucesso!`);
    }else{
        console.error('ERRO: ID não encontrado');
    }
}

// Exportaçao
module.exports = {
    addNote,
    list,
    read,
    update,
    remove
};