let offset = 0;
const limit = 20;
const API_URL = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
const wrapper = document.getElementById('wrappper');
const cardContainer = document.getElementById('card-container');
// const nextButton = document.getElementById('next_button');
// const previousButton = document.getElementById('previous_button');
let allPokemon = [];
// let next = '';


async function fetchData(url) {
    const response = await fetch(url);
    let data = await response.json();
    allPokemon = data.results;
    allPokemon.forEach((pokemon) => {
        const pokemonId = pokemon.url.split('/')[6];
        const pokemonName = pokemon.name;
        const pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;
        generateCards(createPokemonImage(pokemonImage, createPokemonIndex(pokemonId)), createPokemonName(pokemonName), pokemonName);
    });
    // next = data.next;
}


function generateCards(imageDiv, nameDiv, str) {
    const card = document.createElement('a');
    card.setAttribute('href', `/info.html?name=${str}`);
    card.classList.add('card');
    card.appendChild(imageDiv);
    card.appendChild(nameDiv);
    cardContainer.appendChild(card);
}

function createPokemonImage(str, indexDiv) {
    const imageContainer = document.createElement('div');
    const pokemonImage = document.createElement('img');
    imageContainer.classList.add('pokemon-image');
    pokemonImage.setAttribute('src', str);
    pokemonImage.setAttribute('loading', 'lazy');
    imageContainer.appendChild(pokemonImage);
    imageContainer.appendChild(indexDiv);
    return imageContainer;
}

function createPokemonName(str) {
    const nameContainer = document.createElement('div');
    const pokemonName = document.createElement('a');
    pokemonName.setAttribute('href', `/info.html?name=${str}`);
    nameContainer.classList.add('pokemon-name');
    pokemonName.innerText = str;;
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

async function getPokemonInfoByName(name) {
    const response = await fetch(API_URL + name);
    const data = await response.json();
    // return data;
    console.log(data);
}

async function changeRoute(name) {
    const response = await getPokemonInfoByName(name);
    if (response) {
        window.location.href = `./info.html?name=${name}`;
    }
} 






document.addEventListener('DOMContentLoaded', fetchData(API_URL));
