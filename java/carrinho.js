document.addEventListener("DOMContentLoaded", function () {
  const botoesCarrinho = document.querySelectorAll(".add-to-cart");
  const carrinhoDiv = document.getElementById("cart-items");
  const totalSpan = document.getElementById("total");
  const btnFinalizar = document.querySelector(".checkout-btn");

  // Função para carregar o carrinho (usada na página carrinho.html)
  function carregarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    if (!carrinhoDiv || !totalSpan) return;

    carrinhoDiv.innerHTML = "";
    let total = 0;

    carrinho.forEach((item, index) => {
      const div = document.createElement("div");
      div.classList.add("cart-item");

      const nomeSpan = document.createElement("span");
      nomeSpan.textContent = `${item.nome} (x${item.quantidade})`;

      const precoSpan = document.createElement("span");
      precoSpan.textContent = `R$ ${(item.preco * item.quantidade).toFixed(2)}`;

      const botaoRemover = document.createElement("button");
      botaoRemover.textContent = "Remover";
      botaoRemover.classList.add("remove-btn");
      botaoRemover.style.marginLeft = "10px";
      botaoRemover.addEventListener("click", () => removerItem(index));

      div.appendChild(nomeSpan);
      div.appendChild(precoSpan);
      div.appendChild(botaoRemover);
      carrinhoDiv.appendChild(div);

      total += item.preco * item.quantidade;
    });

    totalSpan.textContent = total.toFixed(2);
  }

  // Função para remover item
  function removerItem(index) {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.splice(index, 1);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    carregarCarrinho();
  }

  // Função de finalizar compra
  if (btnFinalizar) {
    btnFinalizar.addEventListener("click", function () {
      const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

      if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
      }

      localStorage.removeItem("carrinho");
      alert("Compra finalizada com sucesso! Obrigado pela preferência.");
      window.location.reload(); // Atualiza a página
    });
  }

  // Adiciona produtos ao carrinho (na página de produtos)
  botoesCarrinho.forEach((botao) => {
    botao.addEventListener("click", function () {
      const produto = botao.closest(".product");
      const nome = produto.querySelector("h3").textContent;
      const precoTexto = produto.querySelector("p").textContent;
      const preco = parseFloat(precoTexto.replace("R$", "").replace(",", "."));
      const quantidade = parseInt(
        produto.querySelector(".quantidade-input").value
      );

      const novoItem = { nome, preco, quantidade };
      const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];

      const existente = carrinhoAtual.find((item) => item.nome === nome);
      if (existente) {
        existente.quantidade += quantidade;
      } else {
        carrinhoAtual.push(novoItem);
      }

      localStorage.setItem("carrinho", JSON.stringify(carrinhoAtual));
      alert(`${quantidade}x ${nome} adicionado(s) ao carrinho!`);
    });
  });

  carregarCarrinho();
});
