document.addEventListener("DOMContentLoaded", function () {
    const movies = [
        { title: "Bad Boys for Life", image: "img/badboys4.jpg" },
        { title: "Alerta Vermelho", image: "img/alerta.jpg" },
        { title: "Crônicas de Natal", image: "img/cronicas.jpg" },
        { title: "Capitão América", image: "img/capitao.jpg" },
        { title: "Thor", image: "img/thor.jpg" },
        { title: "Código Alarum", image: "img/codigo.jpg" }
    ];

    const moviesGrid = document.getElementById("moviesGrid");

    function createMovieCard(movie) {
        const card = document.createElement("div");
        card.classList.add("movie-card");

        const img = document.createElement("img");
        img.src = movie.image;
        img.alt = movie.title;

        card.appendChild(img);
        return card;
    }

    function displayMovies(movieList) {
        while (moviesGrid.firstChild) {
            moviesGrid.removeChild(moviesGrid.firstChild);
        }

        movieList.forEach(movie => {
            moviesGrid.appendChild(createMovieCard(movie));
        });
    }

    function searchMovies() {
        const query = document.getElementById("search").value.toLowerCase();
        const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(query));
        displayMovies(filteredMovies);
    }

    document.getElementById("search").addEventListener("input", searchMovies);

    displayMovies(movies);
});