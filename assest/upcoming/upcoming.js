let datos; // Variable para almacenar los datos de la API
fetch('https://mindhub-xj03.onrender.com/api/amazing')
.then(response => response.json())
.then(data => {
currentData = data;
datos = currentData.events;
pintarCheck(cargarCheckbox(datos), $checkboxContainer);
filtroDoble();
})
.catch(err => console.log(err));

//---------------------------------------------//FUNCIONES
//----------------------------//CREAR CARD
let $containerCardUp = document.getElementById("containerCardUp");

function crearCard(evento) {
  return `<div class="card row row-cols-1 row-cols-md-1 g-1" style="width: 22rem; border-radius: 1rem; background-color: rgba(23, 56, 56, 0.425); color: white;">
    <img src=${evento.image} class="card-img-top object-fit-cover" alt="${evento.name}">
    <div class="card-body">
      <h5 class="card-title">${evento.name}</h5>
      <p class="cardp card-text">${evento.description}</p>
      <div class="d-flex justify-content-around">
        <form class="d-flex" role="search">
          <button class="m-2 bg-info btn-outline-success" type="submit">
            <a style="text-decoration: none; color: white;" href="../card/card.html?id=${evento._id}">See More</a>
          </button>
        </form>
      </div>
    </div>
  </div>`;
}
//----------------------------//PINTAR CARD
function pintarCard(list, container) {
  let template = '';
  if (list.length === 0) {
    template = `<p class="fs-5">Sorry, there are no matching events available.</p>`;
  } else {
    for (let evento of list) {
      template += crearCard(evento);
    }
  }
  container.innerHTML = template;
}
//-----------------------------//CREANDO CHECK DINAMICOS
let $checkboxContainer = document.getElementById('checkbox');
$checkboxContainer.addEventListener('change', filtroDoble);
//----------------------------//CREAR CHECK
function creandoCheck(check) {
  return `<div id='checkboxUnit' class="d-flex justify-content-center align-items-center">
    <input class="ms-1" type="checkbox" id='${check}' value='${check}'>
    <label for='${check}'>${check}</label>
  </div>`;
}
//----------------------------//PINTAR CHECK
function pintarCheck(lista, container) {
  let template = '';
  for (let check of lista) {
    template += creandoCheck(check);
  }
  container.innerHTML = template;
}
//----------------------------//CARGAR CHECK
function cargarCheckbox(data) {
  let arrayFiltrado = data.map((item) => item.category);
  let arrayFiltradoNoRepetido = [...new Set(arrayFiltrado)];
  return arrayFiltradoNoRepetido;
}
//---------------------------------------------//FILTROS
//----------------------------//FILTRAR POR CATRGORY
function filtrarCategory(data, categorias) { 
  if (categorias.length === 0) return data;
  return data.filter(evento => categorias.includes(evento.category));
}
//----------------------------//FILTRAR POR BUSQUEDA DE TITULO
let $search = document.getElementById("search");
$search.addEventListener('input', filtroDoble);

function filterTitulo(data, input) {
  let filtroTitulo = data.filter(item => item.name.toLowerCase().includes(input.toLowerCase()));
  return filtroTitulo;
}
//-----------------------------//FILTRO DOBLE
function filtroDoble() {
  let checboxCheckeados = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(item => item.value);
  let filterByTitle = filterTitulo(datos, $search.value);
  let filtrarEventos = filtrarCategory(filterByTitle, checboxCheckeados);
  
// Obtener los eventos que cumplen con la condición de fecha
let eventUp = filtrarEventos.filter((evento) => evento.date > currentData.currentDate);
  
  pintarCard(eventUp, $containerCardUp);
  }