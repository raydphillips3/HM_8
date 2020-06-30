var fs = require("fs");
var path = require("path");
var filePath = 'db/db.json'
function apiRoutes(app) {
    app.post("/api/notes", function (req, res) {
        var newNote = req.body;
        //TODO -- give the newNote object an id property
        newNote.id = Math.floor(Math.random() * 1000);
        console.log(newNote.id);
        //Opene the db.json file using fs.readFile
        //Parse the file content
        //Push the newNote into the array
        //stringify the updated array
        //fs.writeFile to write the new array into db.json
        const data = fs.readFileSync(filePath);
        var dataJSON = JSON.parse(data);
        dataJSON.push(newNote);
        var strNote = JSON.stringify(dataJSON);
        fs.writeFileSync(filePath, strNote);

        res.json(newNote);
    } );


    app.get("/api/notes", function (req, res) {
        const data = fs.readFileSync(filePath);
        var dataJSON = JSON.parse(data);
        res.json(dataJSON);
    });

    app.delete("/api/notes/:id", function (req, res) {
        var noteToDelete = parseInt(req.params.id);
        //open notes and parse
        const data = fs.readFileSync(filePath);
        var dataJSON = JSON.parse(data);
        //find the note with the correct id and delete it (will not be in order)
        for (i = 0; i < dataJSON.length; i++) {
            if (dataJSON[i].id === noteToDelete) {
                dataJSON.splice(i, 1);
                break;
            };

        } 
        //stringify array
        var stringArray = JSON.stringify(dataJSON);
        //fs.writeFile
        fs.writeFileSync(filePath, stringArray);
        res.json(noteToDelete);
    })

    
}


module.exports = apiRoutes;