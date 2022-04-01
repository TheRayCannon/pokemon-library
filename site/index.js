const dex = document.querySelector(".pokemon")
const url = "https://pokeapi.co/api/v2/pokemon?limit=50&offset=151"
const spinner = document.querySelector(".spinner")


function addImage(url) {
    const img = document.createElement("img")
    img.src = url
    dex.append(img)

}

fetch(url)
    .then(response => {
        return response.json()
    }).then(parsedResponse => {
        const urls = parsedResponse.results.map(result => result.url)
        const fetches = urls.map(url => fetch(url).then(
            response => response.json()
        ))
        console.log(fetches)
        return Promise.all(fetches)
            //const imageUrl = parsedResponse.sprites.front_default
            //addImage(imageUrl)

    }).then(responses => {
        responses.forEach(response => {
            spinner.classList.add("hidden")
            addImage(response.sprites.front_shiny)

        })
    })