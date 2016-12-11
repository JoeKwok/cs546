const xss = require('xss');
const noteData = require('../data/noteData');

const constructorMethod = (app) => {

    app.get("/", (req, res) => {
        noteData.getNotes().then((data)=> {
            console.log(data);
           res.render("examples/home", {
                    partial: "home-scripts", notes:data
            });
        });
    })


    app.get("/new", (req, res) => {
        res.render("examples/new", {
            partial: "new-scripts"
        });

    });


    app.post("/new", (req, res) => {
		let note = req.body; 
		
		noteData.saveNote(note).then( (noteId=>{
			res.json({success: true, noteId: noteId});
		})).catch(console.error);
		
        //json call_back
    });


    app.get("/favicon.ico", (req, res) => {
		res.send('favicon.ico is not set');
    });

    app.get("/:noteId", (req, res) => {
        let noteId = req.params.noteId;
        console.log(noteId);
        noteData.getNoteById(noteId).then((note)=>{
            let  mynote = {};
            mynote.title = xss(note.title);
            mynote.dueDate = xss(note.dueDate);
            mynote.summary = xss(note.summary);
            mynote.body = xss(note.body);
             noteData.nextNodeId(noteId).then(nextId=>{
                res.render("examples/note", {
                    partial: "note-scripts", note: mynote, nextId: nextId
                });
             }).catch(console.error);
        }).catch(error=>{
            res.render("examples/note", {
                partial: "note-scripts", error: error
            });

        });

    });

    app.post("/:noteId", (req, res) => {
        let noteId = req.params.noteId;
        console.log(noteId);

        noteData.getNoteById(noteId).then((note)=>{
            let  mynote = {};
            mynote.title = xss(note.title);
            mynote.dueDate = xss(note.dueDate);
            mynote.summary = xss(note.summary);
            mynote.body = xss(note.body);

            noteData.nextNodeId(noteId).then(nextId=>{
                res.json({success: true, note: mynote, nextId:nextId});
            });    
            
        }).catch(error=>{
            res.json( {success: false, msg: error});

        });

    });
    app.use("*", (req, res) => {
        res.send("page not found");
    })
};

module.exports = constructorMethod;
