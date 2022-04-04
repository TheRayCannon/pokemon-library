const dex = document.querySelector(".pokemon")
const url = "https://pokeapi.co/api/v2/pokemon?limit=50&offset=128"
const spinner = document.querySelector(".spinner")




const retrive = fetch(url)
retrive
    .then(response => response.json())
    .then(response => {
        const pokemonList = response.results
        const httpReq = pokemonList
            .map(pokemon => pokemon.url)
            .map(url => {
                return fetch(url)
                    .then(response => response.json())
            })
        return Promise.all(httpReq)
    })
    .then(responses => {
        responses.map(response => {
            const name = responses
                .map(response => response.species.name)
                .map(name => {
                    return `${response.species.name[0].toUpperCase()}${response.species.name.slice(1)}`
                })
            const li = document.createElement("li")
            li.classList.add("pokemonList")
            li.textContent = name[0]
            const img = document.createElement("img")
            img.src = response.sprites.front_shiny
            spinner.classList.add("hidden")
            li.append(img)
            return li
        }).forEach(li => {
            dex.append(li)
        })
    })