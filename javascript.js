
let nome = null;
let tempoAtualizacao = 5000;
let tempoMensagens = 3000;


function guardarNome() {
nome = prompt("Digite seu nome!");
 promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", { name: nome});
promise.then(function(resposta){
    pegarMensagens();
    setInterval(pegarMensagens, tempoMensagens)
setInterval(sinalizarEstarAtivo, tempoAtualizacao);
});

promise.catch(function (erro) {
 console.error(erro.response);
 guardarNome();
});
}

function pegarMensagens(){
let promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
promise.then(function(resposta) {
 console.log(resposta.data);
 aparecerMensagens(resposta.data)
 sempreUltimaMensagem();
})
promise.catch(function(erro){
 console.error(erro.response);
 alert("Mensagem não pode ser recebida!")
})
}

function aparecerMensagens(mensagens) {
const ul = document.querySelector(".principal ul")
ul.innerHTML = "";

mensagens.forEach(function(mensagem) {
    let tipo = mensagem.type;
    let remetente = mensagem.from;
    let destinatario = mensagem.to;
    let hora = mensagem.time;
    let texto = mensagem.text;

    let mensagemHTML = null;
    if(tipo === "status") {
        mensagemHTML = `
        <li class="status">
    <span class="horario">(${hora})</span>
    <span class="pessoas"><strong>${remetente}</strong></span>
    <span class="texto">${texto}</span>
   </li>
        `;
    } else {
     if( tipo === "message") {
         mensagemHTML = `
         <li class="mensagem-publica">
         <span class="horario">(${hora})</span>
    <span class="pessoas"><strong>${remetente}</strong> para <strong>${destinatario}</strong>:</span>
    <span class="texto">${texto}</span>
</li>`;
     } else {
      if(remetente === nome || destinatario === nome) {
          mensagemHTML = `
          <li class="mensagem-reservada">
          <span class="horario">(${hora})</span>
      <span class="pessoas"><strong>${remetente}</strong> reservadamente para <strong>${destinatario}</strong>:</span>
      <span class="texto">${texto}</span>
    </li>`;
      }
     }
    }
    if(mensagemHTML !== null) {
        ul.innerHTML += mensagemHTML;
    }
})
}

function sempreUltimaMensagem() {
    const ul = document.querySelector(".principal ul")
    const ultimaMensagem = ul.lastElementChild;
    ultimaMensagem.scrollIntoView()
}

function enviarTexto() {
    const input = document.querySelector(".conversa input")
    const mensagem = input.value;
    const promise = axios.post(`https://mock-api.driven.com.br/api/v6/uol/messages`, {
from: nome,
to: "Todos", 
text: mensagem, 
type: "message"
    })

    promise.then(function(response){
console.log("Mensagem enviada")
    })
    promise.catch(function (erro) {
          console.error("Mensagem não enviada");
          alert("Mensagem não enviada")
    })

    input.innerHTML = "";
}

function sinalizarEstarAtivo(){
 promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", { name: nome});
    promise.then(function(resposta){
        console.info("Ainda Olline");
  })
  promise.catch(function(erro) { 
      console.error(erro.response);
      alert("Usuário caiu!");
      window.location.reload();
  })
}

guardarNome();