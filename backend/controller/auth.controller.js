const Funcionario = require('../models/Funcionario')

const cryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const login = async(req,res)=>{
    const valores = req.body

    if(!valores.email || !valores.senha){
        return res.status(400).json({message: "todos os campos são obrigatórios!"})
    }

    const funcionario = await Funcionario.findOne({where: {email: valores.email}})

    try{
        const bytes = cryptoJs.AES.decrypt(funcionario.senha, CHAVE_SECRETA)
        const senha = bytes.toString(cryptoJs.enc.Utf8)

        if(valores.senha !== senha){
            return res.status(401).json({message: "Senha inválida Faça login novamente!"})
        
        }

        const tresHorasEm = 3 * 60 * 60 * 1000
        const tempoExpira = Date.now() + tresHorasEm

        const payload = {
            codigo_funcionario: funcionario.codFuncionario,
            nome: funcionario.nome,
            expiraEm: tempoExpira
        }

        const token = cryptoJs.AES.encrypt(payload, CHAVE_SECRETA).toString()
        
        return res.status(200).json({
            message: "Login realizado com sucesso!",
            nome: funcionario.nome,
            token: token
        })


    } catch (err){
        console.error('Erro ao realizar o login')
        return res.status(500).json({message: "Erro ao realizar o login"})
        
    }
}

module.exports = {login}