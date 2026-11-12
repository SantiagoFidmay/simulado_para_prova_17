const Cliente  = require('../models/Cliente')

const cryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const cadastrar = async(req,res)=>{
    const valores = req.body

    if(!valores.nome|| !valores.cpf || !valores.email || !valores.senha){
        return res.status(400).json({message: "Todos os campos são obrigatorios"})
    }

    try {
        const cpfCripto = cryptoJs.AES.encrypt(valores.senha, CHAVE_SECRETA).toString()
        const senhaCripto = cryptoJs.AES.encrypt(valores.senha, CHAVE_SECRETA).toString()

        await Cliente.create({
            nome: valores.nome,
            cpf: cpfCripto,
            email: valores.email,
            senha: senhaCripto
        })
    } catch (err) {
        console.error('Erro ao cadastrar')
    }
}

const consultarId = async(req,res)=>{
    const id = req.params.id

    try {
        const cliente = await Cliente.findByPk(id)
        if(!cliente){
            return res.status(404).json({message: "Cliente não encontrado"})
        }

        const bytes = cryptoJs.AES.decrypt(cliente.cpf,CHAVE_SECRETA)
        const cpfDescriptografado = bytes.toString(cryptoJs.enc.Utf8)

        return res.status(200).json({
            nome: cliente.nome,
            cpf: cpfDescriptografado,
            email: cliente.email,
        
        })
    } catch (err) {
        console.error('Erro ao consultar cliente')
        return res.status(500).json({message: "Erro ao consultar o cliente"})
    }
}



const consultarNome = async(req,res)=>{
    const nome = req.params.nome

    try {
        const cliente = await Cliente.findOne({where: {nome: nome}})
        if(!cliente){
            return res.status(404).json({message: "Cliente não encontrado"})
        }

        const bytes = cryptoJs.AES.decrypt(cliente.cpf,CHAVE_SECRETA)
        const cpfDescriptografado = bytes.toString(cryptoJs.enc.Utf8)

        return res.status(200).json({
            nome: cliente.nome,
            cpf: cpfDescriptografado,
            email: cliente.email,
        
        })
    } catch (err) {
        console.error('Erro ao consultar cliente')
        return res.status(500).json({message: "Erro ao consultar o cliente"})
    }
}


const apagar = async(req,res)=>{
    const id = req.params.id

    try {
        const cliente = Cliente.findByPk(id)
        if(!cliente){
            return res.status(404).json({message: "Cliente não encotrado!"})
        }

        await Cliente.destroy({where: {codCliente: id}})
         return res.status(200).json({message: "Dados excluidos com sucesso!"})
    } catch (err) {
        console.error('Erro ao apagar cliente')
        return res.status(500).json({message: "Erro ao apagar o cliente"})
    }
}

module.exports = {cadastrar, consultarId, consultarNome, apagar}