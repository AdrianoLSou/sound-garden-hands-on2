
fetch("https://xp41-soundgarden-api.herokuapp.com/events")
    .then(data => data.json()) 
    .then(eventos => { 
        eventos.forEach((evento, index) => { 
            const tabela = document.querySelector('.table tbody'); 
            const linha = tabela.insertRow(tabela.rows.length); 
            
            const data = new Date(evento.scheduled);
            const dataFormatada = data.toLocaleDateString();

            const th = document.createElement("th"); 
            th.innerHTML = index+1; 
            th.setAttribute("scope", "row"); 
            linha.appendChild(th);

            linha.insertCell(1).innerText = `${dataFormatada} ${evento.scheduled.substring(11, 16)}`;
           
            linha.insertCell(2).innerText = evento.name;
         
            linha.insertCell(3).innerText = evento.attractions.join(', ');

            const botaoVerReservas = document.createElement('a'); 
            botaoVerReservas.innerText = "ver reservas"; 
            botaoVerReservas.classList.add("btn"); 
            botaoVerReservas.classList.add("btn-dark"); 
            botaoVerReservas.setAttribute("href", "") 
            botaoVerReservas.addEventListener('click',(e) => {
                e.preventDefault();
                document.querySelector('.modalBackground').style.display = 'flex';
                listarReservas(evento._id)
            })

           
            const botaoEditar = document.createElement('a');
            botaoEditar.innerText = "editar";
            botaoEditar.classList.add("btn"); 
            botaoEditar.classList.add("btn-secondary"); 
          
            botaoEditar.setAttribute("href", `editar-evento.html?id=${evento._id}`);
            
            
            const botaoExcluir = document.createElement('a'); 
            botaoExcluir.innerText = "excluir";
            botaoExcluir.classList.add("btn"); 
            botaoExcluir.classList.add("btn-danger"); 
            
            botaoExcluir.setAttribute("href", `excluir-evento.html?id=${evento._id}`);
            
             
            const botoes = document.createElement("td"); 
            botoes.append(botaoVerReservas, botaoEditar, botaoExcluir); 
            linha.append(botoes); 
        })
    })
    .catch(error => console.log(error));


async function listarReservas(id) {
   
    const listaDeReservas = await fetch(`https://xp41-soundgarden-api.herokuapp.com/bookings/event/${id}`)
        .then(data => data.json())
        .catch(error => console.log(error))

    
    if(listaDeReservas.length < 1) {
        document.querySelector('.divTable').innerHTML = "Não há reservas para esse evento"
        return;
    }

    
    listaDeReservas.forEach((reserva, index) => {
        const tabelaReservas = document.querySelector('.modalTable tbody'); 

        
        const linha = tabelaReservas.insertRow(tabelaReservas.rows.length); 
        const pk = document.createElement('th'); 
        pk.innerHTML = index+1 
        linha.append(pk) 
        linha.insertCell(1).innerText = reserva.owner_name; 
        linha.insertCell(2).innerText = reserva.owner_email; 
        linha.insertCell(3).innerText = reserva.number_tickets; 
    })
}



function closeModal() {

   
    document.querySelector('.modalBackground').style.display = 'none';
    
    const table = document.createElement('table'); 
    
    const thead = document.createElement('thead'); 
    const tbody = document.createElement('tbody'); 
    table.classList.add("modalTable") 

    const linhaHead = thead.insertRow(thead.rows.length); 

    const thnumber = document.createElement('th'); 
    thnumber.innerText = "#";
    thnumber.setAttribute("scope", "col")
    const thnome = document.createElement('th'); 
    thnome.innerText = "Nome";
    thnome.setAttribute("scope", "col")
    const themail = document.createElement('th'); 
    themail.innerText = "Email";
    themail.setAttribute("scope", "col")
    const thtickets = document.createElement('th'); 
    thtickets.innerText = "Tickets";
    thtickets.setAttribute("scope", "col")
    
    
    linhaHead.append(thnumber, thnome, themail, thtickets)

    table.append(thead, tbody); 
    document.querySelector('.divTable').innerHTML = ''; 
    document.querySelector('.divTable').append(table); 

}