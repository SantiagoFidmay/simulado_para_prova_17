const resposta = document.getElementById('resposta')
const btn_cadastrar = document.getElementById('btn_cadastrar')

btn_cadastrar.addEventListener('click', (e)=>{
    
    const status = document.getElementById('status').value
    const data = document.getElementById('data').value
    const idEquipamento = document.getElementById('idEquipamento').value
    

    const valores = {
        status: status,
        data: data,
        idEquipamento: idEquipamento
      
    }
    console.log(valores)

    fetch('http://localhost:3000/vistoria',{
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

