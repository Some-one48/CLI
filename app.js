const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const notes = require('./notes.js');
const argv = yargs(hideBin(process.argv)).parse();

if (argv._ == 'add'){
    if (argv.title){
        let titulo = argv.title;
        let body = argv.body;
        notes.addNote(titulo, body);
    }else {
        console.error('ERRO: O campo do título (title) é obrigatório');
    }
}else if(argv._ == 'list'){
    notes.list();
}else if(argv._ == 'read'){
    if(argv.id){
        let id = argv.id;
        notes.read(id);
    }else {
        console.error('ERRO: O campo do id é obrigatório');
    }
}else if(argv._ == 'update'){
    if(argv.id){
        let id = argv.id;
        let newtitle = argv.newTitle;
        let newbody = argv.newBody;
        notes.update(id, newtitle, newbody);
    }else {
        console.error('ERRO: O campo do id é obrigatório');
    }
}else if(argv._ == 'remove'){
    if(argv.id){
        let id = argv.id;
        notes.remove(id);
    }else {
        console.error('ERRO: O campo do id é obrigatório');
    }
}else {
    console.error('ERRO: Digite uma operação válida');
}