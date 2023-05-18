fetch('https://mindhub-xj03.onrender.com/api/amazing')
.then(response => response.json())
.then(data => {
datos = data.events;
console.log(datos);
        
const params = new URLSearchParams(location.search);
const nombreParam = params.get('id');
let detalleId = datos.find(item => item._id == nombreParam);
document.title = `Detalle de ${detalleId.name}` 
let detalles = document.getElementById('detalles');
detalles.innerHTML = `
    <div class="card mb-3" style="width: 30rem; justify-content-center">
      <img class="card-img-top" src="${detalleId.image}">
      <div class="card-body" style="background-color: rgba(45, 124, 98, 0.315); color: black; border-radius: 1rem; padding: 2rem; border: 2px solid black;">
        <h5 class="card-title">${detalleId.name}</h5>
        <p class="card-text text-black">${detalleId.description}</p>
        <div style="background-color: rgba(45, 124, 98, 0.315); color: black; border-radius: 1rem; padding: 2rem; border: 1px solid black;">
          <ul>
          <li>Category: ${detalleId.category}</li>
          <li>Place: ${detalleId.place}</li>
          <li>Capacity: ${detalleId.capacity}</li>
          <li>${detalleId.assistance  ? 'Assistance: ' + detalleId.assistance.toLocaleString() + '' : 'Estimate: ' + detalleId.estimate.toLocaleString()} </li>
          <li>Date: ${detalleId.date}</li>
          <li><h6>Price: ${detalleId.price} $USD</h6></li>
          </ul>
        </div>
      </div>
    </div>
  `;
})
.catch(error => {console.log('Error al obtener los datos de la API:', error);
})