//Elementos
const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";

//Recorro la url 151 veces
for (let i = 1; i <= 150; i++) {
  fetch(URL + i)
    .then((response) => response.json())
    .then((data) => mostrarPokemon(data));
}

//Muestas la data obtenidad del fetch
function mostrarPokemon(poke) {
  //Me devuelve  un array con los tipos de pokemon y armo con funcion flecha un parrafo con ellos
  let tipos = poke.types.map((type) => `<p>tipo: ${type.type.name}</p>`);
  //Junta los elementos de un Array en un String
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

  listaPokemon.append(div);
}
// botones para filtar por tipos de pokemon
//Eventos
botonesHeader.forEach((boton) =>
  boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id; // Trae el id del boton que clikeamos en el html

    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
      fetch(URL + i)
        .then((response) => response.json())
        .then((data) => {
          if (botonId === "ver-todos") {
            mostrarPokemon(data);
          } else {
            const tipos = data.types.map((type) => type.type.name); // Me devuelve un Array con los nombres de tipo
            //Buscamos dentro del Array si hay incluido tipo guardado en la variable botonId
            if (tipos.some((tipo) => tipo.includes(botonId))) {
              mostrarPokemon(data);
            }
          }
        });
    }
  })
);

//Barra de busqueda
//Elementos
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
      let tipos = poke.types.map((type) => `<p>tipo: ${type.type.name}</p>`);
      tipos = tipos.join("");
      console.log(tipos);
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
            ${tipos}
      </div>
  </div>`;
    });
}
