document.addEventListener("DOMContentLoaded", function () {
  // Variable para almacenar los datos de la API
  let datos = [];
  let currentDate = null;
fetch("https://mindhub-xj03.onrender.com/api/amazing")
.then((response) => response.json())
.then((data) => {
datos = data.events;
currentDate = data.currentDate;

const pastEvents = pastFilter(datos, currentDate);
const UpEvents = UpFilter(datos, currentDate);
console.log(pastEvents)

//tabla1
let eventosMasPorcentaje = altoPorcentaje(pastEvents);
console.log(eventosMasPorcentaje);
let eventoBajoPorcentaje = bajoPorcentaje(pastEvents);
console.log(eventoBajoPorcentaje);
let eventoMascapacidad= porcMasCapacidad(pastEvents);
console.log(eventoMascapacidad)

let $sectionTable = document.getElementById("sectionTable");
$sectionTable.innerHTML = `
<table class="border-ras">
 <tr><th colspan="3"> Events statistics </th></tr>
 <tr><th>Category</th><th>Events Statis</th><th>asisistencia Percentage</th></tr>
  <tr>
        <td>${eventosMasPorcentaje.name} with ${((eventosMasPorcentaje.assistance * 100) /eventosMasPorcentaje.capacity).toFixed(1)}%</td>
        <td>${eventoBajoPorcentaje .name} with ${((eventoBajoPorcentaje .assistance * 100) / eventoBajoPorcentaje .capacity).toFixed(1)}%</td>
        <td>${eventoMascapacidad.name} with ${eventoMascapacidad.capacity.toLocaleString()} of capacity</td>
  </tr>
<table/> `;

        
//tabla2
let $sectionTable2 = document.getElementById("sectionTable2");
let datosUpTabla = upComing(UpEvents);

let template = `<table class="border-ras">
<tr><th colspan="3"> Upcoming Events statistics by category</th></tr>
<tr><th class"d-flex justify-content-center align-items-center p-1 " >Category</th><th>Revenue Estimate</th><th>asisistencia Percentage</th></tr>`; 

for (let i = 0; i < datosUpTabla[0].length; i++) {
    template += `
    <tr>
        <td>${datosUpTabla[0][i]}</td>
        <td>$${datosUpTabla[1][i].toLocaleString()}</td>
        <td>${datosUpTabla[2][i].toFixed(2)}%</td>
    </tr>`;
}

template += `</table>`;
$sectionTable2.innerHTML = template;

//tabla3
let $sectionTable3 = document.getElementById("sectionTable3");
let datosPastTabla = pastTabla(pastEvents);

let template2 = `<table class="border-ras"> 
<tr><th colspan="3"> Past Events statistics by category </th></tr>
<tr><th>Category</th><th>Revenue Estimate</th><th>asisistencia Percentage</th></tr>`; 

for (let i = 0; i < datosPastTabla[0].length; i++) {
template2 += `
    <tr>
        <td>${datosPastTabla[0][i]}</td>
        <td>$${datosPastTabla[1][i].toLocaleString()}</td>
        <td>${datosPastTabla[2][i].toFixed(2)}%</td>
    </tr>`;
}
template2 += `</table>`;
$sectionTable3.innerHTML = template2;  
}) 
.catch((error) => console.log(error)); 

//-------------------------------------------//
  function pastFilter(data, currentDate) {
  //FILTRO POR FECHA PAST
  let pastEvents = [];
  for (let evento of data) {
    if (evento.date < currentDate) {
        pastEvents.push(evento);
      }
    }
    return pastEvents;
  }

  function UpFilter(data, currentDate) {
  //FILTRO POR FECHA UP
  let UpEvents = [];
  for (let evento of data) {
    if (evento.date > currentDate) {
        UpEvents.push(evento);
      }
  }  
  return UpEvents;
}
//-------------------//TABLA 1
function altoPorcentaje(eventos) {
let inicio = 0;
let eventoAltoPorcentaje;
for (let evento of eventos) { 
  let asisistencia = (evento.assistance * 100) / evento.capacity;
  if (asisistencia > inicio) {
    inicio = asisistencia;
    eventoAltoPorcentaje = evento;}
  }
    return eventoAltoPorcentaje;
}

function bajoPorcentaje(eventos) {
let eventoMasBajo = 0;
let eventoBajoPorcentaje;
for (let evento of eventos) {
  let asisistencia = (evento.assistance * 100) / evento.capacity;
  if (eventoMasBajo === 0 || asisistencia < eventoMasBajo) {
    eventoMasBajo = asisistencia;
    eventoBajoPorcentaje = evento;
      }
    }
    return eventoBajoPorcentaje;
}

function porcMasCapacidad(eventos) {
let inicio = 0;
let eventosMasCapacidad;
for (let evento of eventos) {
  if (evento.capacity > inicio) {
    inicio = evento.capacity;
    eventosMasCapacidad = evento;
  }
 }
  return eventosMasCapacidad;
}

//-------------------//TABLA 2
function upComing(eventos) {
let datosCompletosUp = [];
let upCategorias = Array.from( new Set(eventos.map((evento) => evento.category)));

let ingresosUp = [];
for (let category of upCategorias) {
  let upContador = 0;
  for (let evento of eventos) {
      if (evento.category == category) {
        upContador += evento.estimate * evento.price;
      }
    }
    ingresosUp.push(upContador);
}

let porcenDeAsis = [];
for (let category of upCategorias) {
let estimadoUp = 0;
let capacidad = 0;
for (let evento of eventos) {
  if (evento.category === category) {
    estimadoUp += evento.estimate;
    capacidad += evento.capacity;
  }
 }
  porcenDeAsis.push((estimadoUp * 100) / capacidad);
}

  datosCompletosUp.push(upCategorias, ingresosUp, porcenDeAsis);
  return datosCompletosUp;
}
//-------------------//TABLA 3
function pastTabla(eventos) {
let datosCompletosPast = [];
let pastCategorias = Array.from(new Set(eventos.map((evento) => evento.category)));
let ingresosPast = [];
for (let category of pastCategorias) {
  let contadorPast = 0;
  for (let evento of eventos) {
    if (evento.category == category) {
        contadorPast += evento.assistance * evento.price;
      }
    }
    ingresosPast.push(contadorPast);
}

let porcenDeAsis = [];
for (let category of pastCategorias) {
let estimadoPast = 0;
let capacidad = 0;
for (let evento of eventos) {
  if (evento.category === category) {
    estimadoPast += evento.assistance;
    capacidad += evento.capacity;
    }
  }
  porcenDeAsis.push((estimadoPast * 100) / capacidad);
 } 
 datosCompletosPast.push(pastCategorias, ingresosPast, porcenDeAsis);
return datosCompletosPast;
}
})