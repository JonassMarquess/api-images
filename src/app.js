const express = require('express');
const app = express();
const uploadUser = require('../middlewares/uploadImagemid');
const cors = require("cors");
const mongoose = require("mongoose");
const Use = require('../models/Use');
const multer = require('multer')


var path = require('path');
const UseController = require('../controllers/UseController');
const { createUse } = require('../controllers/UseController');

app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Conectando o banco ao node
mongoose.connect(
    "mongodb+srv://JonasMarques:jonas21092001@imageperfil.fyszgrq.mongodb.net/?retryWrites=true&w=majority"
)
.then(
    () =>{
        console.log("Conectado")
        
    }
)
.catch(
    (error)=>{
        console.log("Erro")
        console.log(error)
    }
    
)

// Fazendo o get, post e a validação do post ao node
app.get('/user/:email', async (req, res) =>{
    const findUser = await UseController.getUse(req.params.email)
    return res.json(findUser)
})

app.post('/upload-image', uploadUser.single('image'), async (req, res) => {
    const {nome, email} = req.body
     
    if(req.file){
    const createUse = await UseController.createUse({nome, email, imagemPerfil: req.file.filename})

        return res.json({
            erro: false,
            mensagem: 'Upload realizado com sucesso!',
            
            filename: req.file.filename
        });
    }
     return res.status(400).json({
        erro: true,
        mensagem: "Erro: Upload não realizado ERRO!"
    })
   
});


// Definindo a porta em que o node vai rodar
app.listen(8080, () => {
    console.log('Servidor iniciado na porta 8080: http://localhost:8080');
});