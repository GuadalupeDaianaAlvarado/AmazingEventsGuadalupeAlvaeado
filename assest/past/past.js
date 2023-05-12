
console.log(data)

let containerCardPast = document.getElementById("containerCardPast");
let checkbox = document.getElementById('checkbox');
let search = document.getElementById('search');

function createCard(events) {
  return `<div class="card row row-cols-1 row-cols-md-1 g-1" style="width: 22rem; border-radius: 1rem; background-color:  rgba(23, 56, 56, 0.425); color: white;">
    <img src="${events.image}" class="card-img-top object-fit-cover" alt="...">
    <div class="card-body ">
      <h5 class="card-title">${events.name}</h5>
      <p class="card-text">${events.description}</p>
    </div>
    <div class="d-flex justify-content-around">
      <form class="d-flex" role="search">
        <button class=" m-2 bg-info btn-outline-success" type="submit"><a style="text-decoration: none; color: white;" href="../card/card.html?id=${events._id}">See More</a></button>
      </form>
    </div>
  </div>`;
}

function armarCard(array, lugar) {
  let template = '';
  for (let evento of array) {
    template += createCard(evento);
  }
  containerCardPast.innerHTML = template;
}

function filtradasPast(evento) {                         //FILTRO POR FECHA
  return evento.date > data.currentDate; //01/01/2023
}

const pastEvent = data.events.filter(filtradasPast);

armarCard(pastEvent, containerCardPast);

//------------------------------------------------------CREANDO CHECK

const categorias = data.events.map(evento => evento.category);
const newCategory = new Set(categorias);
const categoriasArray = Array.from(newCategory);

const reduceCategory = (acumulador, eventoActual, indice) => {
  return acumulador +=
    `<div id="checkbox" class="d-flex justify-content-evenly align-items-center flex-grow-1 bg-black text-white p-2">
      <input type="checkbox" name="" id="${eventoActual}-${indice}" value="${eventoActual}">
      <label class="p-1" form="flexSwitchCkecked" for="${eventoActual}-${indice}" >${eventoActual}</label>
    </div>`;
};

const categoryCheck = categoriasArray.reduce(reduceCategory, '');
checkbox.innerHTML = categoryCheck;
//console.log(categoryCheck)

//------------------------------------------------------------ESCUCHANDO

checkbox.addEventListener('change', () => {
  const checkboxCheckedPast = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(check => check.value);
  const eventosFiltradosPastCheck = filtrarCategoryPast(pastEvent, checkboxCheckedPast);
  armarCard(eventosFiltradosPastCheck, containerCardPast);
  //console.log(eventosFiltradosPastCheck)

});


function filtrarCategoryPast(evento, categorias) {             //FILTRO POR CATEGORIA
  if (categorias.length === 0) {
    return evento;
  }

  return evento.filter(pastEvent => categorias.includes(pastEvent.category));
}

search.addEventListener('input', () => {
  const filterSearch = filterTitulo(pastEvent, search.value);
  const checkboxCheckedPast = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(check => check.value);
  
  if (checkbox.checked) {
    const filterCategorySearchCheck = filtrarCategoryUp(filterSearch, checkboxCheckedPast);
    armarCard(filterCategorySearchCheck, containerCardPast);
  } else {
    armarCard(filterSearch, containerCardPast);
  }
});

function filterTitulo(events, search) {                      //FILTRO POR TITULO
  return events.filter(event => event.name.toLowerCase().includes(search.toLowerCase()));
}
