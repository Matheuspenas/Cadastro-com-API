 'use strict' //modo restrito

//  função para limpar formulario

 const limparFormulario = (cep) =>{
    document.getElementById('cep').value = '';
    document.getElementById('rua').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
 }

const preencherFormulario = (endereco) =>{
    document.getElementById('rua').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
}

// verifica se o cpf é valido
const eNumero = (numero) => /^[0-9]+$/.test(numero);
// confere se o tamnho do cep é correto
const cepValido =(cep) => cep.length == 8 && eNumero(cep);

// consumo de api viaCep

const pesquisacep =async() => {
    limparFormulario ();
    const url = `http://viacep.com.br/ws/${cep.value}/json/`;

    if(cepValido(cep.value)){
        const dados  =   await fetch(url);
        const addres =   await dados.json();

        if(addres.hasOwnProperty('erro')){
            alert('CEP não encontrado');

        } else{
            preencherFormulario(addres);
        }
    } else{
        alert('CEP Incorreto')
    }
}

document.getElementById('cep').addEventListener('focusout', pesquisacep);