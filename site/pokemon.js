const spinner = document.querySelector(".spinner")
const url = new URL(window.location)
const query = new URLSearchParams(url.search)
const main = document.querySelector("main")


fetch(`https://pokeapi.co/api/v2/pokemon/${query.get("pokemon")}`)
    .then(response => response.json())
    .then(response => {
        const name = `${response.name[0].toUpperCase()}${response.name.slice(1)}`;
        const title = document.querySelector("title");
        title.textContent = name;
        const pokemonDetails = document.createElement("div")
        pokemonDetails.classList = "pokemon-details"
        pokemonDetails.innerHTML = `
                <figure>
                    <img src ="${response.sprites.front_shiny}" alt="${name}" />
                    <figcaption>${name}</figcaption>
                </figure>

                <h2>Abilities</h2>
            `;
        main.append(pokemonDetails);
        spinner.classList.add("hidden")
        console.log(response)
        const abilityList = response.abilities
            .map(response => response.ability.url)
            .map(url => {
                return fetch(url).then(response => response.json())
            })
        return Promise.all(abilityList)
    }).then(response => {
        const ul = document.createElement("ul")
        ul.classList = "abilities"
        main.append(ul)
        response.map(response => {
            const li = document.createElement("li")
            li.innerHTML = `
                    <span class="move-name">
                        ${response.name[0].toUpperCase()}${response.name.slice(1)}
                    </span>
                    <span class="move-description">
                        ${response.effect_entries[1].short_effect}
                    </span>
                    `
            return li;
        }).forEach(li => {
            ul.append(li)
        })
    })