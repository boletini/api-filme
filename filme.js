async function buscarFilmes() {
    const consulta = document.getElementById('consulta').value;
    const resposta = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(consulta)}`);
    const dados = await resposta.json();

    const resultadoDiv = document.getElementById('resultados');
    while (resultadoDiv.firstChild) resultadoDiv.removeChild(resultadoDiv.firstChild);

    const favoritosSection = document.getElementById('favoritos-section');
    favoritosSection.style.display = 'none';

    if (dados.length === 0) {
      const p = document.createElement('p');
      p.appendChild(document.createTextNode('Nenhum programa encontrado.'));
      resultadoDiv.appendChild(p);
      return;
    }

    dados.forEach(item => resultadoDiv.appendChild(criarCardPrograma(item.show)));
  }

  function criarCardPrograma(programa) {
    const div = document.createElement('div');
    div.className = 'programa';
  
    if (programa.image) {
      const imagem = document.createElement('img');
      imagem.src = programa.image.medium;
      imagem.alt = programa.name;
      div.appendChild(imagem);
    }
  
    const titulo = document.createElement('h2');
    titulo.appendChild(document.createTextNode(programa.name));
    titulo.className = 'titulo-filme';
    div.appendChild(titulo);
  
    div.addEventListener('click', () => exibirDetalhes(programa));
  
    return div;
    }

  function exibirDetalhes(programa) {
    const resultadoDiv = document.getElementById('resultados');
    while (resultadoDiv.firstChild) resultadoDiv.removeChild(resultadoDiv.firstChild);

    const botaoVoltar = document.createElement('button');
    botaoVoltar.appendChild(document.createTextNode('← Voltar'));
    botaoVoltar.style.marginBottom = '20px';
    botaoVoltar.onclick = () => {
      while (resultadoDiv.firstChild) resultadoDiv.removeChild(resultadoDiv.firstChild);
      document.getElementById('favoritos-section').style.display = 'block';
    };
    resultadoDiv.appendChild(botaoVoltar);

    const container = document.createElement('div');
    container.className = 'detalhes-container';

    const imagem = document.createElement('img');
    imagem.src = programa.image?.medium || '';
    imagem.alt = programa.name;
    container.appendChild(imagem);

    const boxInfo = document.createElement('div');
    boxInfo.className = 'info-box';

    const titulo = document.createElement('h2');
    titulo.appendChild(document.createTextNode(`Assistir ${programa.name}`));
    boxInfo.appendChild(titulo);

    const data = document.createElement('p');
    data.appendChild(document.createTextNode(programa.premiered ? new Date(programa.premiered).toDateString() : ''));
    boxInfo.appendChild(data);

    const generos = document.createElement('p');
    generos.appendChild(document.createTextNode(programa.genres.join(' ')));
    boxInfo.appendChild(generos);

    container.appendChild(boxInfo);

    const resumoBox = document.createElement('div');
    resumoBox.className = 'resumo-box';

    const tituloResumo = document.createElement('h3');
    tituloResumo.appendChild(document.createTextNode('Sinopse:'));
    resumoBox.appendChild(tituloResumo);

    const resumoTexto = document.createElement('p');
    if (programa.summary) {
      const tempDiv = document.createElement('div');
      resumoTexto.appendChild(document.createTextNode(tempDiv.textContent));
    } else {
      resumoTexto.appendChild(document.createTextNode('Sem resumo disponível.'));
    }
    resumoBox.appendChild(resumoTexto);

    const tituloOriginal = document.createElement('p');
    tituloOriginal.appendChild(document.createTextNode(`Título original: ${programa.name}`));
    resumoBox.appendChild(tituloOriginal);

    resultadoDiv.appendChild(container);
    resultadoDiv.appendChild(resumoBox);
  }

  async function carregarFavoritos() {
    const favoritos = ['me before you', 'stranger things', 'game of thrones', 'the office'];
    const container = document.getElementById('favoritos');

    for (const nome of favoritos) {
      const resposta = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(nome)}`);
      const dados = await resposta.json();

      if (dados.length > 0) {
        const card = criarCardPrograma(dados[0].show);
        card.classList.add('card-favorito');
        container.appendChild(card);
      }
    }
  }

  window.onload = carregarFavoritos;