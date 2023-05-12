/* console.log(data)
 let conteinerCard = document.getElementById("containerCard")
 
 function createCard (fede){
   return `<div class="card row row-cols-1 row-cols-md-1 g-1" style="width: 22rem; border-radius: 1rem; background-color:  rgba(23, 56, 56, 0.425); color: white;">
   <img src="${fede.image}" class="card-img-top object-fit-cover" alt="...">
   <div class="card-body ">
     <h5 class="card-title">${fede.name}</h5>
     <p class="card-text">${fede.description}</p>
   </div>
   <div class="d-flex justify-content-around">
     <h5>${fede.date}</h5>
     <h5>${fede.price} USD</h5>
     <form class="d-flex" role="search">
       <button class=" m-2 bg-info btn-outline-success" type="submit"><a style=" text-decoration: none; color: white;" href="../card/eventsgastronomic.html"> See More</a></button>
     </form>
   </div>
   </div>`
}

function armarCard(array, lugar) {
    let template = ''
    for(let evento of array){
        template += createCard(evento)
    }    
    lugar.innerHTML = template
}
armarCard(data.events, conteinerCard) */
//---------------------------------------------------------------


let conteinerCard = document.getElementById("containerCard");
let checkbox = document.getElementById('checkbox');
let search = document.getElementById('search');

//----------------------------------------Creando Check

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

//----------------------------------------Creando Card

function createTemplate(lista) {
  return lista.reduce((acumulados, actuales) => {
    return acumulados +=
      `<div class="card row row-cols-1 row-cols-md-1 g-1" style="width: 22rem; border-radius: 1rem; background-color: rgba(23, 56, 56, 0.425); color: white;">
         <img src="${actuales.image}" class="card-img-top object-fit-cover" alt="...">
         <div class="card-body">
           <h5 class="card-title">${actuales.name}</h5>
           <p class="card-text">${actuales.description}</p>
         </div>
         <div class="d-flex justify-content-around">
           <form class="d-flex" role="search">
             <button class="m-2 bg-info btn-outline-success" type="submit"><a style="text-decoration: none; color: white;" href="../card/card.html?id=${actuales._id}">See More</a></button>
           </form>
         </div>
       </div>`;
  }, '');
}

conteinerCard.innerHTML = createTemplate(data.events);

//----------------------------------------Escuchando

checkbox.addEventListener('change', () => {
  const checkboxChecked = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(check => check.value);
  const categoriasFiltradas = filtrarCategory(data, checkboxChecked);
  if (checkbox.checked) {
    const filtradasPorCategory = filtrarCategory(filterSearch, checkboxChecked);
    conteinerCard.innerHTML = createTemplate(filtradasPorCategory);
  } else {
    conteinerCard.innerHTML = createTemplate(categoriasFiltradas);
  }
});

function filtrarCategory(data, categorias) {
  if (categorias.length === 0) return data.events;
  return data.events.filter(evento => categorias.includes(evento.category));
}

search.addEventListener('input', () => {
  const filterSearch = filterTitulo(data.events, search.value);
  if (checkbox.checked) {
    const filtradasPorCategory = filtrarCategory(filterSearch, checkboxChecked);
    conteinerCard.innerHTML = createTemplate(filtradasPorCategory);
  } else {
    conteinerCard.innerHTML = createTemplate(filterSearch);
  }
});

function filterTitulo(events, search) {
  return events.filter(event => event.name.toLowerCase().includes(search.toLowerCase()));
}