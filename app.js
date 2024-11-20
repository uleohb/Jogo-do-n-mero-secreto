let listaDeNumerosSorteados = [];
let limiteDeNumero = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if(chute == numeroSecreto) {
        exibirTextoTela('h1', 'Acertou!!!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}.`;
        exibirTextoTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if(chute > numeroSecreto) {
            exibirTextoTela('p', 'O número secreto é menor.');
        } else {
            exibirTextoTela('p', 'O número secreto é maior.')
        }
        tentativas++;
        limparCampo();
    }
} 

function exibirTextoTela (tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoTela('h1', 'Jogo do número secreto');
    exibirTextoTela('p','Escolha um número entre 1 e 10'); 
}
exibirMensagemInicial();

function gerarNumeroAleatorio () {
    let numeroEscolhido = parseInt(Math.random() * limiteDeNumero + 1);
    let quantidadeNumeroEscolhido = listaDeNumerosSorteados.length;

    if(quantidadeNumeroEscolhido == limiteDeNumero) {
        listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    limparCampo();
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
