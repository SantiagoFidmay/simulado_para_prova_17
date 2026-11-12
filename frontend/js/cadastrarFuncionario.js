const resposta = document.getElementById('resposta')
const btn_cadastrar = document.getElementById('btn_cadastrar')

btn_cadastrar.addEventListener('click', (e)=>{
    
    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value

    const valores = {
        nome:nome,
        email: email,
        senha: senha
    }
    console.log(valores)

    fetch('http://localhost:3000/funcionario',{
        method: 'POST',
        headers: {'Content-Type':'application:json'},
        body: JSON.stringify(valores)
    })

    .then(res => res.json())
        .then((dados)=>{
            resposta.innerHTML = ``
            resposta.innerHTML += `<p>${dados.message}</p>`
        })
    .catch((err)=>{
        console.error(`Erro ao cadastrar o funcionario!`,err)
    })
})

