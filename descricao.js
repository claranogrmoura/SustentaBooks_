document.addEventListener("DOMContentLoaded", function() {
    const lerMaisBtn = document.querySelector(".ler-mais");
    const descricao = document.querySelector(".descricao");

    if (lerMaisBtn && descricao) {
        // Define o número inicial de linhas exibidas
        let linhasVisiveis = 4; // Número de linhas iniciais visíveis
        const incremento = 4; // Número de linhas a serem mostradas por clique

        // Função para atualizar a descrição e o botão
        function atualizarDescricao() {
            const totalLinhas = descricao.dataset.linhasTotais || 12; // Máximo de linhas que o texto possui (exemplo: 12)

            if (linhasVisiveis < totalLinhas) {
                linhasVisiveis += incremento; // Mostra mais linhas
                descricao.style.setProperty("-webkit-line-clamp", linhasVisiveis); // Atualiza o número de linhas visíveis
                lerMaisBtn.textContent = "Ler mais"; // Mantém o texto do botão
            } else {
                // Exibe o texto completo
                descricao.classList.add("expandida");
                descricao.style.removeProperty("-webkit-line-clamp");
                lerMaisBtn.textContent = "Ler menos";
            }
        }

        // Evento no botão
        lerMaisBtn.addEventListener("click", function() {
            if (descricao.classList.contains("expandida")) {
                // Recolhe o texto
                descricao.classList.remove("expandida");
                descricao.style.setProperty("-webkit-line-clamp", 4); // Reseta para 4 linhas
                linhasVisiveis = 4; // Volta ao valor inicial
                lerMaisBtn.textContent = "Ler mais";
            } else {
                atualizarDescricao(); // Expande o texto progressivamente
            }
        });
    }
});