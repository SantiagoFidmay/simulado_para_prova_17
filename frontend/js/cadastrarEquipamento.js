const resposta = document.getElementById('resposta')
const btn_cadastrar = document.getElementById('btn_cadastrar')

btn_cadastrar.addEventListener('click', (e)=>{
    
    const modelo = document.getElementById('modelo').value
    const fabricante = document.getElementById('fabricante').value
    const numSerie = document.getElementById('numSerie').value
    const idCliente = document.getElementById('idCliente').value
    

    const valores = {
        modelo: modelo,
        fabricante: fabricante,
        numSerie: numSerie,
        idCliente: idCliente,
      
    }
    console.log(valores)

    fetch('http://localhost:3000/equipamento',{
        method: 'POST',
        headers: {'Content-Type':'application:json',
                'Authorization': token
        },
        body: JSON.stringify(valores)
    })

    .then(res => res.json())
        .then((dados)=>{
            resposta.innerHTML = ``
            resposta.innerHTML += `<p>${dados.message}</p>`
        })
    .catch((err)=>{
        console.error(`Erro ao cadastrar o cliente!`,err)
    })
})

