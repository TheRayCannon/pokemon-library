const dex = document.querySelector(".pokemon")
const url = "https://pokeapi.co/api/v2/pokemon?limit=50&offset=151"
const spinner = document.querySelector(".spinner")


function addImage(pokemon) {
    const div = document.createElement("div")
    div.innerHTML = `
     <a href="pokemon.html?pokemon=${pokemon.name}">
        <img src="${pokemon.sprites.front_shiny}" alt="${pokemon.name}"/>
     </a>
    `
        //const img = document.createElement("img")
        //img.src = url
    dex.append(div)

}

fetch(url)
    .then(response => {
        return response.json()
    }).then(parsedResponse => {
        const urls = parsedResponse.results.map(result => result.url)
        const fetches = urls.map(url => fetch(url).then(
            response => response.json()
        ))
        return Promise.all(fetches)
            //const imageUrl = parsedResponse.sprites.front_default
            //addImage(imageUrl)

    }).then(responses => {
        responses.forEach(response => {
            spinner.classList.add("hidden")
            addImage(response)

        })
    })