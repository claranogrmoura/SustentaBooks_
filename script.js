// Lista de livros disponíveis para busca com links de redirecionamento
const livros = [
    { title: "A Biblioteca da Meia-Noite", url: "Livro.html" },
    { title: "As Vantagens de ser Invisível", url: "Livro2.html" },
    { title: "Os Sete Maridos de Evelyn Hugo", url: "Livro3.html" },
    { title: "Por Lugares Incríveis", url: "Livro4.html" },
    { title: "Box: O Diário de um Banana", url: "Livro5.html" },
    { title: "Box: A Seleção - Kiera Cass - 6 Livros", url: "Livro6.html" },
    { title: "Box: Percy Jackson e Os Olimpianos", url: "Livro7.html" },
    { title: "Box Harry Potter", url: "Livro8.html" },
    { title: "O Apanhador no Campo de Centeio", url: "Livro9.html" },
    { title: "O Pequeno Príncipe", url: "Livro10.html" },
    { title: "Os Dois Morrem no Final", url: "Livro11.html" },
    { title: "A Culpa é Das Estrelas", url: "Livro12.html" },
    { title: "O Deus que Destrói Sonhos", url: "Livro13.html" },
    { title: "Eu e Esse Meu Coração", url: "Livro14.html" },
    { title: "Mentirosos", url: "Livro15.html" },
    { title: "It a Coisa", url: "Livro16.html" }
];



// Função para mostrar sugestões
function showSuggestions() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const suggestions = document.getElementById("suggestions");
    suggestions.innerHTML = ""; // Limpa sugestões anteriores

    if (searchTerm) {
        const matchedSuggestions = livros.filter(livro =>
            livro.title.toLowerCase().includes(searchTerm)
        ).slice(0, 5); // Limita a 5 sugestões

        matchedSuggestions.forEach(item => {
            const suggestionItem = document.createElement("div");
            suggestionItem.className = "suggestion-item";
            suggestionItem.textContent = item.title;
            suggestionItem.onclick = () => {
                window.location.href = item.url;
            };
            suggestions.appendChild(suggestionItem);
        });
    }
}



// Função para redirecionar para a página de resultados com o termo de busca
function redirectToSearch() {
    const searchTerm = document.getElementById("searchInput").value.trim();
    const livro = livros.find(livro => livro.title.toLowerCase() === searchTerm.toLowerCase());
    if (livro) {
        window.location.href = livro.url;
    } else {
        alert("Livro não encontrado. Tente outro título.");
    }
}


// Função para exibir os resultados como links na página de resultados
function displaySearchResults() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get("search");
    const result = document.getElementById("result");

    if (searchTerm) {
        const foundItems = livros.filter(livro =>
            livro.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (foundItems.length > 0) {
            let html = `<h3>Resultados para "<strong>${searchTerm}</strong>":</h3>`;
            foundItems.forEach(item => {
                html += `<div class="result-item">
                  <a href="${item.url}">${item.title}</a>
                </div>`;
            });
            result.innerHTML = html;
        } else {
            result.innerHTML = `<p>Nenhum resultado encontrado para "<strong>${searchTerm}</strong>".</p>`;
        }
    } else {
        result.innerHTML = "Nenhum termo de busca foi especificado.";
    }
}

// Detecta quando a página de resultados está carregada
if (window.location.pathname.includes("result.html")) {
    document.addEventListener("DOMContentLoaded", displaySearchResults);
}