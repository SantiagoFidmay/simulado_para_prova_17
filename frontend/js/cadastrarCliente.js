const resposta = document.getElementById('resposta')
const btn_cadastrar = document.getElementById('btn_cadastrar')

btn_cadastrar.addEventListener('click', (e)=>{
    
    const nome = document.getElementById('nome').value
    const cpf = document.getElementById('cpf').value
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value

    const valores = {
        nome:nome,
        cpf: cpf,
        email: email,
        senha: senha
    }
    console.log(valores)

    fetch('http://localhost:3000/cliente',{
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

