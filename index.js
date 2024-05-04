//Required Libraries
var express = require('express');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })
var cors = require('cors');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

//Load the html file after the get request
app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

var link = '<a href="javascript:history.back()">Back</a>'
//Take the user input and display the data of their file
app.post("/api/fileanalyse", upload.single('upfile'), (req, res) => {
  res.json({
    "name": req.file.originalname,
    "type": req.file.mimetype,
    "size": req.file.size,
    "file location": req.file.path
  })
});

//Deploys the website to a local server
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
