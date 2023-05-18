let datos; // Variable para almacenar los datos de la API

fetch('https://mindhub-xj03.onrender.com/api/amazing')
  .then(response => response.json())
  .then(data => {
    datos = data.events;
    $conteinerCard.innerHTML = pintarCard(datos);
    printCheckbox(cargarCheckbox(datos), $checkboxContainer);
    console.log(datos)
  })
  .catch(error => {console.log('Error al obtener los datos de la API:', error);});

//----------------------------------------------------------//CREANDO CARD
let $conteinerCard = document.getElementById("containerCard");
function crearCard(evento) {
  return `<div class="card row row-cols-1 row-cols-md-1 g-1" style="width: 22rem; border-radius: 1rem; background-color:  rgba(23, 56, 56, 0.425); color: white;">
  <img src=${evento.image} class="card-img-top object-fit-cover img-fluid" alt="${evento.name}">
  <div class="card-body">
  <h5 class="card-title">${evento.name}</h5>
  <p class="cardp card-text">${evento.description}</p>
  <div class="d-flex justify-content-around">
           <form class="d-flex" role="search">
           <button class="m-2 bg-info btn-outline-success" type="submit"><a style="text-decoration: none; color: white;" href="../card/card.html?id=${evento._id}">See More</a></button>
         </form>
       </div>
</div>
</div> `;
}
//----------------------------------------------------------//PINTANDO CARD
function pintarCard(list) {
let template = '';
if (list.length === 0) {
  template = `<p class="fs-5">Sorry, that event is currently unavailable.</p>`;
} else {
  for (let info of list) {
    template += crearCard(info);
  }
}
return template;
}

//---------------------------------------------------------//CREANDO CHECK DINAMICOS
let $checkboxContainer = document.getElementById('checkbox');

function plantillaCheck(check) {
return `<div id='checkboxUnit' class="d-flex justify-content-center align-items-center">
            <input class="ms-1" type="checkbox" id='${check}' value='${check}'>
            <label for='${check}'>${check}</label>
        </div>`;
}

function printCheckbox(lista, $checkboxContainer) {
let template = '';
for (let check of lista) {
  template += plantillaCheck(check);
}
$checkboxContainer.innerHTML = template;
}

function cargarCheckbox(data) {
let arrayFiltrado = data.map((item) => item.category);
let arrayFiltradoNoRepetido = [...new Set(arrayFiltrado)];
return arrayFiltradoNoRepetido;
}

function filtrarCategory(data, categorias) {      //FILTRAR POR CATEGORÍA
if (categorias.length === 0) return data;
return data.filter(evento => categorias.includes(evento.category));
}

function filterTitulo(data, input) {             //FILTRAR POR BÚSQUEDA
let filtroTitulo = data.filter(item => item.name.toLowerCase().includes(input.toLowerCase()));
return filtroTitulo;
}

function filtroDoble() {                           //FILTRO DOBLE
let checkboxChecked = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(item => item.value);
let filterByTitle = filterTitulo(datos, $search.value);
let filtrarEventos = filtrarCategory(filterByTitle, checkboxChecked);

$conteinerCard.innerHTML = pintarCard(filtrarEventos);
}
//----------------------------------------------//ESCUCHANDO AL SEARCH Y CHECK
$checkboxContainer.addEventListener('change', () => {
filtroDoble();
});

let $search = document.getElementById("search");
$search.addEventListener('input', () => {  
filtroDoble();
});