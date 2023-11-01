const FIRST_GEN = 151;
const SECOND_GEN = 100;
const ALL_POKEMON_API_URL = `https://pokeapi.co/api/v2/pokemon`;
const UNIQUE_POKEMON_API_URL = `https://pokeapi.co/api/v2/pokemon/`;
const wrapper = document.getElementById('wrappper');
const cardContainer = document.getElementById('card-container');
let allPokemon = [];

async function fetchData(url) {
    const response = await fetch(url);
    let data = await response.json();
    allPokemon = data.results;
    allPokemon.forEach((pokemon) => {
        const pokemonId = pokemon.url.split('/')[6];
        const pokemonName = pokemon.name;
        const pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;
        generateCards(createPokemonImage(pokemonImage, createPokemonIndex(pokemonId)), createPokemonName(pokemonName));
    });
    // return allPokemon;
}


function generateCards(imageDiv, nameDiv) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.appendChild(imageDiv);
    card.appendChild(nameDiv);
    cardContainer.appendChild(card);
}

function createPokemonImage(str, indexDiv) {
    const imageContainer = document.createElement('div');
    const pokemonImage = document.createElement('img');
    imageContainer.classList.add('pokemon-image');
    pokemonImage.setAttribute('src', str)
    imageContainer.appendChild(pokemonImage);
    imageContainer.appendChild(indexDiv);
    return imageContainer;
}

function createPokemonName(str) {
    const nameContainer = document.createElement('div');
    const pokemonName = document.createElement('p');
    nameContainer.classList.add('pokemon-name');
    pokemonName.innerText = str;
    nameContainer.appendChild(pokemonName);
    return nameContainer;
}

function createPokemonIndex(str) {
    const indexContainer = document.createElement('div');
    const pokemonIndex = document.createElement('span');
    indexContainer.classList.add('pokemon-index');
    pokemonIndex.innerText = '# ' + str;
    indexContainer.appendChild(pokemonIndex);
    return indexContainer;
}


async function getPokemonById(id) {
    const response = await fetch(UNIQUE_POKEMON_API_URL + id)
    let data = await response.json();
    console.log(data);
}

// getPokemonById(300);

document.addEventListener('DOMContentLoaded', fetchData(ALL_POKEMON_API_URL));
