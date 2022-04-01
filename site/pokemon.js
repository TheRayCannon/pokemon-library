const details = document.querySelector(".entry")
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
    details.append(div)
}


function pokemonDetails(pokemon) {


}


const newUrl = new URL(window.location)
const query = new URLSearchParams(newUrl.search)
    //console.log(query.get("pokemon"))








fetch(`https://pokeapi.co/api/v2/pokemon/${query.get("pokemon")}`)
    .then(response => {
        return response.json()
    }).then(parsedResponse => {
        addImage(parsedResponse)
        spinner.classList.add("hidden")
        console.log(parsedResponse)
    })