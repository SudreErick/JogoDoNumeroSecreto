let listaDeNumeros = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumero();
let tentativas = 1;

function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTexto("h1" , "Jogo Do Número Secreto");
    exibirTexto("p" , "Escolha um número de 1 à 10");  
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector("input").value;
    if (chute == numeroSecreto) {
        exibirTexto("h1", "Acertou!");
        let palavraTentativa = tentativas > 1? "tentativas": "tentativa";
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTexto("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if(chute > numeroSecreto) {
            exibirTexto("p", "O número secreto é menor");
        } else {
            exibirTexto("p", "O número secreto é maior");
        }
        tentativas++;
        limparCampo();
    }
} 

function gerarNumero() {
   let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
   let quantidadeElementos = listaDeNumeros.length;

   if (quantidadeElementos == numeroLimite) {
    listaDeNumeros = [];
   }

   if (listaDeNumeros.includes(numeroEscolhido)) {
   return gerarNumero();
} else {
    listaDeNumeros.push(numeroEscolhido);
    console.log(listaDeNumeros);
    return numeroEscolhido;
}
}

function limparCampo() {
    chute = document.querySelector("input");
    chute.value = "";
}
function reiniciarJogo() {
    numeroSecreto = gerarNumero();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}