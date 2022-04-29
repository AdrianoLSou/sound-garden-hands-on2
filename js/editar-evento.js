
const url = new URL(window.location.href);
id = url.searchParams.get("id");

const nome = document.querySelector('#nome');
const banner = document.querySelector('#banner');
const atracoes = document.querySelector('#atracoes');
const descricao = document.querySelector('#descricao');
const data = document.querySelector('#data');
const lotacao = document.querySelector('#lotacao');

fetch("https://xp41-soundgarden-api.herokuapp.com/events")
    .then(data => data.json()) 
    .then(eventos => { 
        eventos.forEach(evento => { 
            if(evento._id == id) { 

                
                const dataN = new Date(evento.scheduled);
                const dataFormatada = dataN.toLocaleDateString();

                nome.value = evento.name;
                banner.value = evento.poster;
             
                atracoes.value = evento.attractions.join(', ');
                descricao.value = evento.description;
   
                data.value = evento.scheduled.substring(0, evento.scheduled.length-1);
                lotacao.value = evento.number_tickets;
            }
        });
    })
    .catch(err => console.error(err)) 

const button = document.querySelector('button');

button.addEventListener('click', (e) => {
    e.preventDefault(); 

    const body = {
        name: nome.value,
        poster: banner.value,
        attractions: atracoes.value.split(', '),
        description: descricao.value,
        scheduled:  data.value,
        number_tickets: lotacao.value
    }
   
    const requisicao = {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {"Content-type": "application/json"}
    }
       fetch(`https://xp41-soundgarden-api.herokuapp.com/events/${id}`, requisicao)
        .then(response => response.json())
        .then(result => {
           
            if(result.error) {
                throw new Error(result.details.body[0].message);
            }

            alert('Editado com sucesso!'); 
            window.location.href = "admin.html"; 
        })
        .catch(error => {
            
            alert('Algo saiu errado, tente novamente!');
            console.error(error);
        })
});