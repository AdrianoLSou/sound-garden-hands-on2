let eventoID;

function exibirEventos(eventos) {
    
  eventos.forEach((evento) => {
    const eventoModel = document
      .querySelector(".models article")
      .cloneNode(true);

    const data = new Date(evento.scheduled);
    const dataFormatada = data.toLocaleDateString();

    eventoModel.querySelector(
      "h2"
    ).innerHTML = `${evento.name} - ${dataFormatada}`;
    
    eventoModel.querySelector("h4").innerHTML = evento.attractions.join(", ");
   
    eventoModel.querySelector("p").innerText = evento.description;
    
    eventoModel.querySelector("a").addEventListener("click", (e) => {
      e.preventDefault();
      
      const modal = document.querySelector(".modal");

      modal.style.display = "flex";
      
      document.querySelector(
        ".modal-window p"
      ).innerHTML = `<b>Evento</b>: ${evento.name}<br><b>Data</b>: ${dataFormatada}`;

      document
        .querySelector(".modal-window span")
        .addEventListener("click", () => {
          modal.style.display = "none";
        });

      eventoID = evento._id;
    });
    //Apos preparar nosso elemento HTML com as informacoes desse evento
    //Entao usamos um append para adiciona-lo na pagina
    //No HTML peguei a Div que guarda os elementos e dei um id 'boxEventos' para ela
    document.getElementById("boxEventos").append(eventoModel);
  });
}

try {
   fetch("https://xp41-soundgarden-api.herokuapp.com/events")
    .then((data) => data.json())
    .then((listaEventos) => exibirEventos(listaEventos));
} catch (error) {
   console.error(error);
}

document.querySelector(".modal-window a").addEventListener("click", (e) => {
  e.preventDefault();

  const modal = document.querySelector(".modal");
  
  let nome = document.querySelector(`.modal-window #nomeInput`);
  let email = document.querySelector(`.modal-window #emailInput`);
  let qntTickets = document.querySelector(`.modal-window label > input`);

  let body = {
    owner_name: nome.value,
    owner_email: email.value,
    number_tickets: qntTickets.value,
    event_id: eventoID,
  };
 
  const requisicao = {
    method: "POST",
    body: JSON.stringify(body), 
    headers: { "Content-type": "application/json" },
  };
  
  fetch("https://xp41-soundgarden-api.herokuapp.com/bookings", requisicao)
    .then((response) => {
     
      if (response.status != 201) {
        throw new Error();
      }

      modal.style.display = "none"; 
      nome.value = "";
      email.value = "";
      qntTickets.value = 1;

      alert("Reservado com sucesso!");
    })
    .catch((error) => {
      alert("Algo saiu errado, tente novamente :C");
      console.error("error: ", error.message);
    });
});