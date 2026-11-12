const Equipamento  = require('../models/Equipamento')

const cryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'


const cadastrar = async(req,res)=>{
    const valores = req.body

    if(!valores.modelo || !valores.fabricante || !valores.numSerie || !valores.idCliente){
        return res.status(400).json({message: "Todos os campos são obrigatorios"})
    }

    try {
        const numCripto = cryptoJs.AES.encrypt(valores.numSerie, CHAVE_SECRETA).toString()

        await Equipamento.create({
            modelo: valores.modelo,
            fabricante: valores.fabricante,
            numSerie: numCripto,
            idCliente: valores.idCliente
        })
        
    } catch (err) {
        console.error('Erro ao cadastrar')
    }
}

module.exports = {cadastrar}