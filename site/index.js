const dex = document.querySelector(".pokemon")
const url = "https://pokeapi.co/api/v2/pokemon/152"
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
        const imageUrl = parsedResponse.sprites.front_default
        addImage(imageUrl)
        spinner.classList.add("hidden")
    })