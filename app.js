const listaPokemon = document.querySelector("#listaPokemon");
let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
  fetch(URL + i)
    .then((response) => response.json())
    .then((data) => mostrarPokemon(data));
}

function mostrarPokemon(poke) {
  const div = document.createElement("div");
  div.classList.add("pokemon");
  div.innerHTML = `
    
    <div class="pokemon">
    <p class="pokemon-id-back">#${poke.id}</p>
    <div class="pokemon-imagen>
        <img src="${poke.sprites.other.dream_world.front_default}"alt="${poke.name}">
    </div>
    <div class="pokemon-info">
        <div class="nombre-contenedor">
            <p class="pokemon-id">#${poke.id}</p>
            <h2 class="pokemon-nombre">${poke.name}</h2>
        </div>
        <div class="pokemon-tipos">
            <p class="electric tipo">ELECTRIC</p>
            <p class="fighting tipo">FIGHTING</p>
        </div>
        <div class="pokemon-stats">
            <p class="stat">4m</p>
            <p class="stat">60kg</p>
        </div>
    </div>
</div>`;
listaPokemon.append(div);
}