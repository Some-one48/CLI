const yargs = require("yargs");
const notes = require('./notes.js');

const argv = yargs(process.argv.slice(2)).argv;

if (argv.title && argv.body) {
    notes.addNote(argv.title, argv.body);
}