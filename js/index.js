let eventoID;

function orderEvents(events) {
    return events.sort((event1, event2) => { return new Date(event1.scheduled) - new Date(event2.scheduled) })
}

function removePastEvents(events) {
    return events.filter((event) => {
        return new Date() - new Date(event.scheduled) < 0;
    })
}

function exibirEventos(listaEventos) {

    const eventosOrdenados = orderEvents(listaEventos);
    const eventos = removePastEvents(eventosOrdenados);

    
    const divEventos = document.getElementById("divEventos").children;
        
    
    for(let i=0; i < divEventos.length; i++) {
        const item = divEventos[i]; 
        const evento = eventos[i]; 
        
        const data = new Date(evento.scheduled);
        const dataFormatada = data.toLocaleDateString();
        
       
        item.querySelector('h2').innerText = `${evento.name} - ${dataFormatada}`;
       
        item.querySelector('H4').innerHTML = evento.attractions.join(', ');
        
        item.querySelector('p').innerText = evento.description

        item.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();

            const modal = document.querySelector('.modal')

            modal.style.display = 'flex';
            document.querySelector('.modal-window p').innerHTML = `<b>Evento</b>: ${evento.name}<br><b>Data</b>: ${dataFormatada}`
            
            document.querySelector('.modal-window span').addEventListener('click', () => {
                modal.style.display = 'none';
            })
            
            eventoID = evento._id
        })

        
    }
}

try {
    fetch("https://xp41-soundgarden-api.herokuapp.com/events")
    .then(data => data.json())
    .then(listaEventos => exibirEventos(listaEventos));

} catch (error) {
    console.error(error);
}



document.querySelector('.modal-window a').addEventListener('click', (e) => {
    e.preventDefault();
    const modal = document.querySelector('.modal');

    let nome = document.querySelector(`.modal-window #nomeInput`);
    let email = document.querySelector(`.modal-window #emailInput`);
    let qntTickets = document.querySelector(`.modal-window label > input`);
    

    const body = {
        owner_name: nome.value,
        owner_email: email.value,
        number_tickets: qntTickets.value,
        event_id: eventoID
    }
    
    const requisicao = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {"Content-type": "application/json"}
    }
    
    fetch("https://xp41-soundgarden-api.herokuapp.com/bookings", requisicao)
        .then(response => {
           
            if(response.status != 201) {
                throw new Error();
            }

            alert('Reservado com sucesso!');

            
            modal.style.display = 'none';
            nome.value = "";
            email.value = "";
            qntTickets.value = 1;
        })
        .catch(error => {
            alert('Algo saiu errado, tente novamente :C');
            console.error('error: ', error.message);
        })
})