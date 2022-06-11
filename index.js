const expressFileUpload = require('express-fileupload')
const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()
app.listen(3000)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(
  expressFileUpload({
    limits: { fileSize: 5000000 },
    abortOnLimit: true,
    responseOnLimit:
      'El peso del archivo que intentas subir supera el limite permitido',
  })
)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/formulario.html')
})

app.post('/imagen', (req, res) => {
  const { target_file } = req.files
  console.log(req.files)
  const { name } = target_file
  const { posicion} = req.body
  console.log(posicion)
  target_file.mv(`${__dirname}/imgs/imagen-${posicion}.jpg`, (err) => {
    res.redirect('/deleteImg')
  })
})
app.get('/deleteImg', (req, res) => {
  res.sendFile(__dirname + '/collage.html')
})

app.use('/public', express.static(__dirname + '/public'))
app.use('/imgs', express.static(__dirname + '/imgs'))

app.get('/deleteImg/:nombre', (req, res) => {
  const { nombre } = req.params
  fs.unlink(`${__dirname}/imgs/${nombre}`, (err) => {
    res.send(`Imagen ${nombre} fue eliminada con éxito`)
  })
})
