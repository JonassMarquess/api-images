const Use = require("../models/Use")

module.exports = {
    async getUse(email){
        const foundUse = Use.findOne({email:email})
        return foundUse
    },
    async deleteUse(email){
        const foundUse = Use.findOne({email:email}).remove().exec()
        return foundUse
    },
    async updateUse(values){
        const {nome, email, imagemPerfil} = values
        const updateUse = await Use.updateOne({ email:email }, { nome, email, imagemPerfil });
        return updateUse
    },
    async createUse({nome, email, imagemPerfil}){
     console.log(imagemPerfil)
        const createdUse = await Use.create({nome, email, imagemPerfil:imagemPerfil||'default.png'})
        return createdUse
    }
}