
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
})
promise.catch(function(erro){
 console.error(erro.response);
 alert("Mensagem não pode ser recebida!")
})
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