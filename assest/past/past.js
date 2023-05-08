
console.log(data)

// let containerCardPast = document.getElementById("containerCardPast")

 let containerCardPast = document.getElementById("containerCardPast")
 
 function createCard (events){
    return `<div class="card row row-cols-1 row-cols-md-1 g-1" style="width: 22rem; border-radius: 1rem; background-color:  rgba(23, 56, 56, 0.425); color: white;">
    <img src="${events.image}" class="card-img-top object-fit-cover" alt="...">
    <div class="card-body ">
      <h5 class="card-title">${events.name}</h5>
      <p class="card-text">${events.description}</p>
    </div>
    <div class="d-flex justify-content-around">
      <h5>${events.date}</h5>
      <h5>${events.price} USD</h5>
      <form class="d-flex" role="search">
        <button class=" m-2 bg-info btn-outline-success" type="submit">See More</button>
      </form>
    </div>
    </div>`
 }
 
 function armarCard(array, lugar) {
     let template = ''
     for(let evento of array){
         template += createCard(evento)
     }    
     containerCardPast.innerHTML = template
 }
 function filtradasPast(evento){
    return evento.date < data.currentDate
 }

 const pastEvent = data.events.filter((filtradasPast))

armarCard(pastEvent, containerCardPast)