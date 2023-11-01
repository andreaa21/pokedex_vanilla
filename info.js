const pokemonName = window.location.search.split('=')[1];
const API_URL = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
const infoWrapper = document.getElementById('info-wrapper');

async function fetchPokemonInfoByName() {
    const response = await fetch(API_URL);
    const pokemon = await response.json();
    // const pokemonImage = pokemon.sprites.other.dream_world.front_default;
    // const pokemonAbilities = pokemon.abilities;
    // const pokemonStats = pokemon.stats;
    // const pokemonTypes = pokemon.types;
    // const pokemonHeight = pokemon.height;
    // const pokemonWeight = pokemon.weight;
    generateInfo(pokemon);
    console.log(pokemon);

}

function generateInfo(obj) {
    const nameContainer = document.createElement('div');
    nameContainer.classList.add('info-text');
    nameContainer.innerText = pokemonName;
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('info-image');
    const pokemonImage = document.createElement('img');
    pokemonImage.setAttribute('src', obj.sprites.other.dream_world.front_default);
    imageContainer.appendChild(pokemonImage);
    infoWrapper.appendChild(nameContainer);
    infoWrapper.appendChild(imageContainer);
}


document.addEventListener('DOMContentLoaded', fetchPokemonInfoByName());
