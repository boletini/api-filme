'use strict';

async function pesquisarFilmes(categoria) {
    const url = `https://api.tvmaze.com/singlesearch/shows?q=girls${show}`
    const proxyUrl = ` https://api.tvmaze.com/singlesearch/shows?q=girls&embed=episodes${encodeURIComponent(url)}` // Usando o proxy CORS
    const response = await fetch(proxyUrl)
    const dados = await response.json()
    return dados
}
