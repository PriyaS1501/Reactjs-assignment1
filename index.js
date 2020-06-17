let express = require("express");
let Joi = require("@hapi/joi");
//console.log(express);
let app = express();
app.use(express.json());
let port = 5000 ;

let music = [
{id : 1,name : "song1",singer : "singer1"},
{id : 2,name : "song2",singer : "singer2"},
{id : 3,name : "song3",singer : "singer3"}
];


//get  all songs information
app.get("/Music", (req,res) => {
 res.send(music);
});


// get song by id
app.get ("/Music/:id", (req,res) => {
    let song = music.find(
        (item) => item.id === parseInt(req.params.id)
        );
    
    if (!song){
        return res.status(404).send({message : "Invalid song id"});
    }
    res.send(song);
    });

 // create a song    
app.post ("/Music/uploadsong", (req,res) => {
   

let upload = {
id: music.length + 1,
name: req.body.name,
singer: req.body.singer
};

let schema = Joi.object({
name: Joi.string().min(5).max(20).required(),
singer: Joi.string().min(5).max(20).required()
});

let result = schema.validate(req.body);

if (result.error) {
    return res.status(400).send(result.error.details[0].message);
}

music.push(upload);
res.send(music);
});


// update song by id
app.put("/Music/songs/:id", (req, res) => {
//step1 :
let song = music.find(
    (item) => item.id === parseInt(req.params.id)
    );

if (!song){
    return res.status(404).send({message : "Invalid song id"});
}
//step2:
let schema = Joi.object({
    name: Joi.string().min(5).max(20).required(),
    singer: Joi.string().min(5).max(20).required()
    });
    
    let result = schema.validate(req.body);
    
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }
//step3:
song.name = req.body.name;
song.singer = req.body.singer;
res.send(music);
});

//delete song by id
app.delete("/Music/removesong/:id", (req,res) => {
    //step1:
    let song = music.find(
        (item) => item.id === parseInt(req.params.id)
        );
    
    if (!song){
        return res.status(404).send({message : "Invalid song id"});
    }
    let index = music.indexOf(song);
    let data1 = music.splice(index, 1);
    res.send(music);
}); 




app.listen(port, () => console.log(`port working on ${port}`));