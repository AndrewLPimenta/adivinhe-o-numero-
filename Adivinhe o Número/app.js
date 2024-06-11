let listaDeNumerosSorteados = [];

//variável com o número teto para random -->>
let maximo = 10;


//váriavel com o número aleatório sendo gerado e armazenado em número secreto
// junto ao número de tentativas -->>
let numeroSecreto = numeroAleatório();
let tentativas = 1;


//função de limpar o campo de texto do número quando errar -->>
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';

}


// função com paramêtro com tag e string -->>
function mostra(tag, texto,) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}


//chamando a função criada e função de mensagem inicial -->>

function mensagemInicial() {
    mostra('h1','Jogo do número Secreto');
}

mensagemInicial ();
mostra('p',` Escolha um número entre 1 em ${maximo}`);


// função sem retorno e sem paramêtro -->>
// verifica se o chute do usuário é igual ao número gerado,
// se acertar mostra na tela (comemora) errar mostra na tela (quase)
//

function verificarChute() {
    let chute = document.querySelector('input').value 
    

    if (chute == numeroSecreto) { 
        mostra('h1',` ACERTOU!!!`);

    // verifica se tentativa(s) será no singular ou no plural -->>

        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você Descobriu o número com ${tentativas} ${palavraTentativa}!`;
        
        mostra('p', mensagemTentativas);
        
    //pegando o botão reiniciar (novo jogo) pelo 
    // ID - identificador de usuário e removendo o atributo "disable" 
    // quando o usuário acertar -->>
    

        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {
        if (chute > numeroSecreto) {
            mostra('h1', 'Ops...');
            mostra('p', `o número secreto é menor que ${chute}`);
        } else {
            mostra('h1','foi quase..!');
            mostra('p',`o número secreto é maior que ${chute}`);
        }
        
        // atribui valor ao número de vezes que se foi 
        // tentado acertar (tentativas) -->>
        tentativas++;
        limparCampo();
    }  
}

// função pra me gerar um número aleatório, e  verificar se esse número 
//  gerado já esteja na lista .(includes) 
// Se estiver, uma outra função (return) para gerar outro número 
// Caso o número gerado não esteja na lista será gerado normalmente
// E é colocado no final da lista de Números gerados(push) 
// Caso já tiverem sido sorteados todos os números possíveis
// Limpa a lista de repetição -->>

function numeroAleatório () {
    let numeroEscolhido = parseInt(Math.random() * maximo + 1);
    let quantidadeElementosLista = listaDeNumerosSorteados.length;
    
    if (quantidadeElementosLista == maximo) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return numeroAleatório();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;

    }

}


// função de reiniciar jogo ao clicar no botão -->>
function reiniciarJogo() {
    numeroSecreto = numeroAleatório();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    mostra('p',` Será que consegue de novo?<br>Escolha um número entre 1 em ${maximo}`);
    document.getElementById('reiniciar').setAttribute('disabled', true);
}