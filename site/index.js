const dex = document.querySelector(".pokemon")
const url = "https://pokeapi.co/api/v2/pokemon?limit=50&offset=128"
const spinner = document.querySelector(".spinner")





fetch(url)
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
            li.textContent = name[0]
            const img = document.createElement("img")
            img.src = response.sprites.front_shiny
            li.append(img)
            return li
        }).forEach(li => {
            dex.append(li)
        })
    })

/* pokemonList
            .map(pokemon => {
                return pokemon.name

            }).map(name => {
                return `${name[0].toUpperCase()}${name.slice(1)}`
            })
            .map(name => {
                const li = document.createElement("li")
                li.textContent = name
                return li
            })
            .forEach(li => {
                dex.append(li)
            })
        return pokemonList
    }).then(pokemonList => {
        console.log(pokemonList)
    }) */