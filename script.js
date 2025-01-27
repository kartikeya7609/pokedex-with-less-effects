const pokemonConst = 25;
var pokedex = {};
const bulba =document.querySelector("#pokemon")
window.onload = async function () {
    for(let i=1;i<pokemonConst;i++){
            await getPokemon(i);
            let pokemon =document.createElement("div");
            pokemon.id =i;
            pokemon.innerText=i.toString()+ "."+pokedex[i]['name'].toUpperCase();
            pokemon.classList.add("pokemon-name");
            document.getElementById("pokemon-list").append(pokemon);
            pokemon.addEventListener("click",updatePokemon);
    }
};

async function getPokemon(num) {
    try {
        let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();
        let res = await fetch(url);
        let pokemon = await res.json();
        let pokemonName = pokemon["name"];
        let pokemonType = pokemon["types"].map(type =>type["type"]["name"]);
        let pokemonImg = pokemon["sprites"]["front_default"];
        res = await fetch(pokemon["species"]["url"]);
        let speciesData = await res.json();
        let flavorTextEntry = speciesData["flavor_text_entries"].find(entry => entry.language.name === "en");
        let pokemonDesc = flavorTextEntry ? flavorTextEntry["flavor_text"] : "No description available.";
        pokedex[num] = {
            name: pokemonName,
            img: pokemonImg,
            types: pokemonType,
            desc: pokemonDesc
        };   
        document.getElementById("pokemon-img").src = pokemonImg;
        document.getElementById("pokemon-name").textContent = capitalize(pokemonName);
        document.getElementById("pokemon-desc").textContent = pokemonDesc;
        document.getElementById("pokemon-types").textContent = `Type(s): ${pokemonType}`;
    } 
    catch (error) {
        console.error("Error fetching Pokémon data:", error);
    }function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}
function updatePokemon(){
    document.getElementById("pokemon-img").src =pokedex[this.id]["img"];
    document.getElementById("pokemon-name").textContent = pokedex[this.id]["name"];
    document.getElementById("pokemon-desc").textContent = pokedex[this.id]["desc"];
    document.getElementById("pokemon-types").textContent = pokedex[this.id]["types"];

}
