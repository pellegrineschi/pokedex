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
// function mostrarPokemon(poke) {
//   //Me devuelve  un array con los tipos de pokemon y armo con funcion flecha un parrafo con ellos
//   let tipos = poke.types.map((type) => `<p>tipo: ${type.type.name}</p>`);
//   //Junta los elementos de un Array en un String
//   tipos = tipos.join("");

//   const div = document.createElement("div");
//   div.classList.add("pokemon");
//   div.innerHTML = `
  
  
    
//       <div class="col-lg-4 mb-4">
//           <div class="card">
//               <img class="card-img-top" src="${poke.sprites.other.dream_world.front_default}" alt="${poke.name}">
//                   <div class="card-body">
//                     <h5 class="text-uppercase card-title">${poke.name}</h5>
//                     <h6 class="card-subtitle text-muted mb-2">#${poke.id}</h6>
//                      <div class="card" style="width: 18rem;">
//                         <ul class="list-group list-group-flush">
//                           <li class="text-uppercase list-group-item">${tipos}</li>
//                           <li class="list-group-item">Altura: ${poke.height} M</li>
//                           <li class="list-group-item">Peso: ${poke.weight}KG</li>
//                         </ul>
//                       </div>
//                    <a href="#" class="mt-3 btn btn-primary ">boton</a>
//                   </div>
//           </div>
//       </div>
    
//     `;

//   listaPokemon.append(div);
// }

// en este caso al aplicar bootstarp la proyecto tuvq que modificar la funcion, ya que la misma me crea un div adicional que envuleve a la tajeta
//al agregar un div adicional por card este me genera conflicto con la grid de bootstarp

// function mostrarPokemon(poke) {
//   // Me devuelve un array con los tipos de pokemon y armo con función flecha un párrafo con ellos
//   let tipos = poke.types.map((type) => `<p>tipo: ${type.type.name}</p>`);
//   // Junta los elementos de un Array en un String
//   tipos = tipos.join("");

//   // Crear la tarjeta directamente, sin un div adicional
//   const card = document.createElement("div");
//   card.classList.add("col-lg-4", "mb-4"); // Clases Bootstrap para el diseño
//   card.innerHTML = `
//     <div class="card">
//       <img class="card-img-top" src="${poke.sprites.other.dream_world.front_default}" alt="${poke.name}">
//       <div class="card-body">
//         <h5 class="text-uppercase card-title">${poke.name}</h5>
//         <h6 class="card-subtitle text-muted mb-2">#${poke.id}</h6>
//         <div class="card" style="width: 18rem;">
//           <ul class="list-group list-group-flush">
//             <li class="text-uppercase list-group-item">${tipos}</li>
//             <li class="list-group-item">Altura: ${poke.height} M</li>
//             <li class="list-group-item">Peso: ${poke.weight}KG</li>
//           </ul>
//         </div>
//         <a href="#" class="mt-3 btn btn-primary">boton</a>
//       </div>
//     </div>
//   `;

//   // Agregar la tarjeta directamente al contenedor de Pokémon
//   listaPokemon.append(card);
// }

function mostrarPokemon(poke) {
  let tipos = poke.types.map((type) => `<p>tipo: ${type.type.name}</p>`);
  tipos = tipos.join("");

  const card = document.createElement("div");
  card.classList.add("col-lg-4", "mb-4", "pokemon-card"); // Clases personalizadas
  card.innerHTML = `
    <div class="card">
      <img class="card-img-top img-fluid" src="${poke.sprites.other.dream_world.front_default}" alt="${poke.name}" style="object-fit: cover; height: 400px; max-width: 100%;"> <!-- Ajustar la imagen -->
      <div class="card-body">
        <h5 class="text-uppercase card-title">${poke.name}</h5>
        <h6 class="card-subtitle text-muted mb-2">#${poke.id}</h6>
        <div class="card">
          <ul class="list-group list-group-flush">
            <li class="text-uppercase list-group-item">${tipos}</li>
            <li class="list-group-item">Altura: ${poke.height} M</li>
            <li class="list-group-item">Peso: ${poke.weight}KG</li>
          </ul>
        </div>
        <a href="#" class="mt-3 btn btn-primary">boton</a>
      </div>
    </div>
  `;

  listaPokemon.append(card);
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
