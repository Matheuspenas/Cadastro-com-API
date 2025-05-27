document.addEventListener("DOMContentLoaded", function () {
  function validarCpf(cpf) {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11) return null;

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  }

  const cpfInput = document.getElementById("LoginCpf");
  let typingTimer;
  const doneTypingInterval = 800; // ms
  const messageDiv = document.createElement("div");
  messageDiv.id = "message";
  messageDiv.className = "message";
  cpfInput.parentNode.appendChild(messageDiv);

  cpfInput.addEventListener("input", function (e) {
    clearTimeout(typingTimer);

    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);

    // Máscara
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    e.target.value = value;

    typingTimer = setTimeout(() => {
      validarECriarFeedback(e.target.value);
    }, doneTypingInterval);
  });

  function validarECriarFeedback(cpf) {
    const status = validarCpf(cpf);

    if (status === null) {
      messageDiv.textContent = "CPF Incompleto";
      applyStyles("incompleto");
    } else if (status) {
      messageDiv.textContent = "CPF Válido";
      applyStyles("valido");
    } else {
      messageDiv.textContent = "CPF Inválido";
      applyStyles("invalido");
    }

    messageDiv.style.display = "block";

    setTimeout(() => {
      messageDiv.style.display = "none";
      messageDiv.textContent = "";
      cpfInput.className = "";
      messageDiv.className = "message";
    }, 4000);
  }

  function applyStyles(status) {
    cpfInput.className = status;
    messageDiv.className = `message ${status}`;
  }
});

// cosumo de api

("use strict"); //modo restrito

//  função para limpar formulario

const limparFormulario = (cep) => {
  document.getElementById("cep").value = "";
  document.getElementById("rua").value = "";
  document.getElementById("bairro").value = "";
  document.getElementById("cidade").value = "";
};

const preencherFormulario = (endereco) => {
  document.getElementById("rua").value = endereco.logradouro;
  document.getElementById("bairro").value = endereco.bairro;
  document.getElementById("cidade").value = endereco.localidade;
};

// verifica se o cpf é valido
const eNumero = (numero) => /^[0-9]+$/.test(numero);
// confere se o tamnho do cep é correto
const cepValido = (cep) => cep.length == 8 && eNumero(cep);

// consumo de api viaCep

const pesquisacep = async () => {
  limparFormulario();
  const url = `http://viacep.com.br/ws/${cep.value}/json/`;

  if (cepValido(cep.value)) {
    const dados = await fetch(url);
    const addres = await dados.json();

    if (addres.hasOwnProperty("erro")) {
      alert("CEP não encontrado");
    } else {
      preencherFormulario(addres);
    }
  } else {
    alert("CEP Incorreto");
  }
};

document.getElementById("cep").addEventListener("focusout", pesquisacep);
