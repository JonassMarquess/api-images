const mongoose = require("mongoose");
const Use = mongoose.model('Use', {
    imagemPerfil: String,
    nome: String,
    email: String,
    
})

const insert = async (collection, document) => {
    const insertResult = await _db.collection(collection.find)({}).insertOne(document)
    return insertResult
}
const multer = require("multer")
module.exports = Use