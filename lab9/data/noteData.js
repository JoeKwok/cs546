const fileData = require('./fileData');
const FILE_NAME =  'notes.json';
const uuid = require('node-uuid');
let exportedMethods = {
	saveNote(note){
        return new Promise( (resolve, reject)=>{

            fileData.getFileAsJSON(FILE_NAME).then(notes=>{
                console.log(notes);
                if(!notes) notes = {};
                let noteId =  uuid.v4();
                notes[noteId] = note;
                fileData.saveJSONToFile(FILE_NAME, notes).then(isSaved=>{
                    console.log( 'isSaved' +  isSaved);
                    resolve(noteId);
                }).catch(console.error);
            }).catch(console.error);
        })
	},
	getNotes(){
		return fileData.getFileAsJSON(FILE_NAME);
	},
    getNoteById(id){
        console.log(id);
        return new Promise((resolve, reject)=>{
            this.getNotes().then(notes=>{
               
                let note = notes[id];
            
                if(!note) reject("no such note");
                resolve(note);
            });
        });
    },
    nextNodeId(currentId){
        return new Promise((resolve, reject)=>{
            this.getNotes().then(notes=>{
                let nextId = "";
                let isNext = false;
                for(let id in notes){
                    if(isNext){
                        nextId = id;
                        break;    
                    }
                    if(id == currentId){
                        isNext = true;
                    }

                }
                resolve(nextId);
            }).catch(console.error);
        });
    }
}

module.exports = exportedMethods;
