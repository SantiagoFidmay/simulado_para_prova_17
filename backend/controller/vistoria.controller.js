const Vistoria  = require('../models/Vistoria')



const cadastrar = async(req,res)=>{
    const valores = req.body

    if(!valores.status || !valores.data || !valores.idEquipamento){
        return res.status(400).json({message: "Todos os campos são obrigatorios"})
    }

    try {
        
        await Vistoria.create({
            status: valores.status,
            data: valores.data,
            idEquipamento: valores.idEquipamento
        })
    } catch (err) {
        console.error('Erro ao cadastrar')
    }
}

module.exports = {cadastrar}