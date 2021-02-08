// let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const url = 'http://localhost:3007/toys'
  const addBtn = document.querySelector("#new-toy-btn");
  const toyCollection = document.querySelector("div#toy-collection");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  function renderAllToys(){
    fetch(url)
      .then(response => response.json())
      .then(toys => toys.forEach(toy => renderOneToy(toy)))
  }

  function renderOneToy(toy){
    const card = document.createElement('div')
    // card.setAttribute('toy-card', toy.id)
    card.className = 'toy-card'
    card.dataset.id = toy.id 

    card.innerHTML = `
    <div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>4 Likes: ${toy.likes}  </p>
    <button class="like-btn">Like <3</button>
  </div>
    `
    toyCollection.append(card)
  }

  renderAllToys()

});
