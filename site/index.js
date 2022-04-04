const ul = document.querySelector("ul")

fetch("https://pokeapi.co/api/v2/pokemon?limit=50&offset=128")
    .then(response => response.json())
    .then((response) => {
        const pokeBall = response.results
        const httpReq = pokeBall
            .map(pokemon => pokemon.url)
            .map(url => {
                return fetch(url).then(response => response.json())
            })
        console.log(httpReq)
        return Promise.all(httpReq)
    }).then(responses => {
        responses.map(response => {
            const pokemonList = document.createElement("dic")
            pokemonList.classList = "pokemon-list"
            const name = `${response.species.name[0].toUpperCase()}${response.species.name.slice(1)}`;
            pokemonList.innerHTML = `
                <figure>
                    <img src ="${response.sprites.front_shiny}" alt="${name}" />
                    <figcaption>
                        <a href="pokemon.html?pokemon=${response.id}">
                            ${name}
                        </a>
                    </figcaption>
                </figure>
            `
            return pokemonList
        }).forEach(pokemonList => {
            const spinner = document.querySelector(".spinner")
            spinner.classList.add("hidden")
            ul.append(pokemonList)
        })
    })