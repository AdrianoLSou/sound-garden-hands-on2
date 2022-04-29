
const nome = document.querySelector('#nome');
const atracoes = document.querySelector('#atracoes');
const descricao = document.querySelector('#descricao');
const data = document.querySelector('#data');
const lotacao = document.querySelector('#lotacao');

const button = document.querySelector('button');

button.addEventListener('click', (e) => {
    e.preventDefault(); 

    const body = {
        name: nome.value,
        poster: "https://i.imgur.com/fQHuZuv.png",
        attractions: atracoes.value.split(','),
        description: descricao.value,
        scheduled:  data.value,
        number_tickets: lotacao.value
    }

    const requisicao = {
        method: 'POST',
        body: JSON.stringify(body), 
        headers: {
            "Content-type": "application/json"
        }
    }
    
    fetch(`https://xp41-soundgarden-api.herokuapp.com/events`, requisicao)
        .then(response => response.json())
        .then(result => {
          
            if(result.error) {
                throw new Error(result.details.body[0].message);
            }
            
            alert('Evento cadastrado com sucesso!'); 
            window.location.href = "admin.html"; 
        })
        .catch(error => {
            
            alert('Algo saiu errado, tente novamente!');
            console.log(error);
        })
});