let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const url = 'http://localhost:3000/toys'
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
    <p>Likes: ${toy.likes}</p>
    <button class="like-btn">Like <3</button>
  </div>
    `
    toyCollection.append(card)
  }
  const newToyForm = document.querySelector('.add-toy-form')

  newToyForm.addEventListener('submit', createToy)

  function createToy(event){
    event.preventDefault()
    const name = event.target[0].value
    const image = event.target[1].value
    const likes = 0
    const toy = {name, image, likes}
    renderOneToy(toy)

    fetch (url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json", 
          Accept: "application/json" 
      },
      body: JSON.stringify(toy)
    })
    .then(response => response.json())
    event.target.reset()
  }

  renderAllToys()

  toyCollection.addEventListener('click', addLikes)

  function addLikes(event){
    const card = event.target.closest('.toy-card')
    if (event.target.className === 'like-btn'){
      const likesDisplay = card.querySelector('p')
      const likes = (likesDisplay.textContent).split(" ")[1] 
      const likesint = parseInt(likes)
      // console.log(likes)
      // console.log(`${url}/${card.dataset.id}`)
      fetch (`${url}/${card.dataset.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json", 
            Accept: "application/json" 
        },
        body: JSON.stringify({likes: likesint +1})
      })
      .then(response => response.json())
      // .then(json => console.log(json))
      .then(data => likesDisplay.textContent = `Likes: ${data.likes}`)

    }
  }
});
