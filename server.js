const express = require('express')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const cors = require('cors')
const csv = require('csvtojson')
const PORT = 5000;

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors()); // it enables all cors requests
app.use(fileUpload());

app.post('/upload', (req, res) => {
  if (!req.files) {
      return res.status(500).send({ msg: "file is not found" })
  }
  const myFile = req.files.file
  //  mv() method places the file inside public directory
  myFile.mv(`${__dirname}/client/public/${myFile.name}`, function (err) {
      if (err) {
          console.log(err)
          return res.status(500).send({ msg: "Error occured" });
      }
      // returing the response with file path and name
      // return res.send({name: myFile.name, path: `/${myFile.name}`});
  });
  const csvFilePath = `${__dirname}/client/public/${myFile.name}`;
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      // console.log(jsonObj)
      return res.send(jsonObj)
    })
})

app.listen(PORT, () => {
  console.log(`==============================\nServer listening on port ${PORT}\n==============================`)
})