const pokemonList = document.getElementById("pokemon-list");
const pokemonImg = document.getElementById("pokemon-img");
const pokemonName = document.getElementById("pokemon-name");
const pokemonDesc = document.getElementById("pokemon-desc");
const pokemonTypes = document.getElementById("pokemon-types");
const pokemonDescription = document.getElementById("pokemon-description");

// Fetch and display the list of Pokémon
async function fetchPokemonList() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    const data = await response.json();
    data.results.forEach((pokemon, index) => {
      const item = document.createElement("div");
      item.classList.add("pokemon-item");
      item.textContent = `${index + 1}. ${capitalize(pokemon.name)}`;
      item.addEventListener("click", () => fetchPokemonDetails(pokemon.name));
      pokemonList.appendChild(item);
    });
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
  }
}

// Fetch and display details of a selected Pokémon
async function fetchPokemonDetails(name) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    pokemonImg.src = data.sprites.front_default;
    pokemonName.textContent = capitalize(data.name);
    pokemonDesc.textContent = `ID: ${data.id}`;
    displayTypes(data.types);
    fetchPokemonSpecies(data.species.url);
  } catch (error) {
    console.error("Error fetching Pokémon details:", error);
  }
}

// Display Pokémon types
function displayTypes(types) {
  pokemonTypes.innerHTML = "";
  types.forEach((typeInfo) => {
    const span = document.createElement("span");
    span.classList.add("type-box", typeInfo.type.name);
    span.textContent = capitalize(typeInfo.type.name);
    pokemonTypes.appendChild(span);
  });
}

// Fetch and display Pokémon description
async function fetchPokemonSpecies(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const entry = data.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    );
    pokemonDescription.textContent = entry
      ? entry.flavor_text
      : "No description available.";
  } catch (error) {
    console.error("Error fetching Pokémon species:", error);
  }
}

// Capitalize first letter
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Initialize
fetchPokemonList();
