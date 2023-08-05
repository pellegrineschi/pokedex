const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 150; i++) {
  fetch(URL + i)
    .then((response) => response.json())
    .then((data) => mostrarPokemon(data));
}

function mostrarPokemon(poke) {
  let tipos = poke.types.map((type) => `<p>tipo: ${type.type.name}</p>`);
  tipos = tipos.join("");

  const div = document.createElement("div");
  div.classList.add("pokemon");
  div.innerHTML = `

  <div class="pokemon">
    
    <div class="pokemon-imagen">
            <img src="${poke.sprites.other.dream_world.front_default}" alt="${poke.name}">
        </div>
    <div class="pokemon-info">
        <div class="nombre-contenedor">
            <p class="pokemon-id">#${poke.id}</p>
            <h2 class="pokemon-nombre">${poke.name}</h2>
        </div>
        <div class="pokemon-tipos">
            ${tipos}
        </div>
        <div class="pokemon-stats">
            <p>Altura: ${poke.height}M</p>
            <p>Peso: ${poke.weight}KG</p>
        </div>
        
    </div>
</div>`;
  //botones
  // const botonesAgregar = document.querySelectorAll(".btnAgregar");
  // for (const boton of botonesAgregar) {
  //   boton.addEventListener("click", (event) => {
  //     event.preventDefault();
  //     console.log("estyo hacindo click en agragar a la pokeball");
  //   });
  // }

  listaPokemon.append(div);
}

botonesHeader.forEach((boton) =>
  boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
      fetch(URL + i)
        .then((response) => response.json())
        .then((data) => {
          if (botonId === "ver-todos") {
            mostrarPokemon(data);
          } else {
            const tipos = data.types.map((type) => type.type.name);
            if (tipos.some((tipo) => tipo.includes(botonId))) {
              mostrarPokemon(data);
            }
          }
        });
    }
  })
);

//barra de busqueda

const formPokemon = document.querySelector("#formPokemon");
const inputPokemon = document.querySelector("#inputPokemon");
const divInfoPokemon = document.querySelector("#infoPokemon");

formPokemon.addEventListener("submit", (event) => {
  event.preventDefault();

  cargarPokemon(inputPokemon.value);
});

function cargarPokemon(numero) {
  

  fetch("https://pokeapi.co/api/v2/pokemon/" + numero)
    .then((response) => response.json())
    .then((poke) => {
      divInfoPokemon.innerHTML = `

      <div class="pokemon">
      
      <div class="pokemon-imagen">
              <img src="${poke.sprites.other.dream_world.front_default}" alt="${poke.name}">
          </div>
      <div class="pokemon-info">
          <div class="nombre-contenedor">
              <p class="pokemon-id">#${poke.id}</p>
              <h2 class="pokemon-nombre">${poke.name}</h2>
          </div>
          <div class="pokemon-tipos">
            
          </div>
          <div class="pokemon-stats">
              <p >Atura: ${poke.height}M</p>
              <p >Peso: ${poke.weight}KG</p>
          </div>
         
      </div>
  </div>`;
      const botonesAgregar = document.querySelectorAll(".btnAgregar");
      for (const boton of botonesAgregar) {
        boton.addEventListener("click", (event) => {
          event.preventDefault();
          console.log(boton.datset.id);
        });
      }
      // <div class="pokemon">
      // <h1>#${pokemon.id} ${pokemon.name}</h1>
      // <img src="${pokemon.sprites.other.dream_world.front_default}" />
      // <p>Peso: ${pokemon.weight}lbs |
      // Altura: ${pokemon.height}"
      // | HP: ${pokemon.stats[0].base_stat}</p>
      // </div>
    });
}
