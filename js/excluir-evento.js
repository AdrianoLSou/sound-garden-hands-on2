
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
        
        const eventoFiltrado = eventos.filter((evento) => {
            return evento._id == id;
        })
        if(eventoFiltrado.length == 0) {
            alert("Id de evento invalido!");
            window.location.href = "admin.html";
        }
        
        eventoFiltrado.forEach(evento => {
            if(evento._id == id) { 

                nome.value = evento.name;
                banner.value = evento.poster;
               
                atracoes.value = evento.attractions.join(', ');
                descricao.value = evento.description;
               
                data.value = evento.scheduled.substring(0, evento.scheduled.length-1);
                lotacao.value = evento.number_tickets;
                
            }
        });
    })
    .catch(error => console.error(error)); 

const button = document.querySelector('button');

button.addEventListener('click', (e) => {
    e.preventDefault(); 

    if(!id) {
        alert("Id invalido, tente novamente!");
        window.location.href = "admin.html";
    }

   
    const requisicao = {
        method: 'DELETE'
    }
    
    fetch(`https://xp41-soundgarden-api.herokuapp.com/events/${id}`, requisicao)
        .then( response => {
           
            if(response.status != 204){
                throw new Error();
            }
            alert("Excluido com sucesso!");
            window.location.href = "admin.html"; 
        })
        .catch(error => {
            
            console.log(error);
            alert("Algo saiu errado, tente novamente!");
        })
});
