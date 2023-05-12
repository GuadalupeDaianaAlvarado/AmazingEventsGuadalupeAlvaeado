let detalles = document.getElementById('detalles')

const params = new URLSearchParams( location.search )


const nombreParam = params.get('id')

let detalleId=data.events.find(item => item._id==nombreParam)


detalles.innerHTML= 
`          <div class="card mb-3">
                <img class"300px" src="${detalleId.image}">
                <div class="card-body" style="background-color: rgba(45, 124, 98, 0.315); color: black; border-radius: 1rem; padding: 2rem;border: 2px solid black;">
                    <h5 class="card-title">${detalleId.name}</h5>
                    <p class="card-text text-black">${detalleId.description}</p>
                    <div style="background-color: rgba(45, 124, 98, 0.315); color: black; border-radius: 1rem; padding: 2rem; border: 1px solid black;">
                    <ul>
                    <li>Category: ${detalleId.category}</li>
                    <li>Place: ${detalleId.place}</li>
                    <li>Capacity:${detalleId.capacity}</li>
                    <li>Assistance:${detalleId.assistance}</li>
                    <li>Date:${detalleId.date}</li>
                    <li> <h6>Price: ${detalleId.price} USD</h6></li>
                    </ul>
                    </div>
                </div>
            </div> `


