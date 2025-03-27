'use strict';

async function pesquisarFilmes(nomeFilme) {
    if (!nomeFilme) {
        console.error("Erro: Nenhum nome de filme foi fornecido!");
        return;
    }

    const url = `https://api.tvmaze.com/singlesearch/shows?q=${encodeURIComponent(nomeFilme)}&embed=episodes`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erro ao buscar os dados: ${response.status}`);
        }

        const dados = await response.json();
        console.log(dados);
        return dados;
    } catch (error) {
        console.error("Erro ao buscar filme:", error);
    }
}

// Chamando a função ao clicar no botão
document.getElementById("botaoBuscar").addEventListener("click", () => {
    const nomeFilme = document.getElementById("inputFilme").value.trim();
    pesquisarFilmes(nomeFilme);
});
