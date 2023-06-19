////// getting the data from the json////// 
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    // Use the data
    console.log(data)
    handleData(data)
  })
  .catch((error) => console.error("Error:", error))
function handleData(data) {

  ////Insert dishes into the menu
  const menu = document.getElementById("menu")
  data.dishes.forEach((dish) => menu.appendChild(createDishCard(dish)))
}


////create a card for each dish from data ////
function createDishCard(dish) {
    const card = document.createElement("div")
    card.classList.add("card")
    card.dataset.id = dish.id
    card.dataset.category = dish.category
    card.innerHTML = `
  
     <div class="card">
    <div class="left">
      <h3>${dish.name}</h3>
      <img src="${dish.picture}" alt="preview menu item" />
    </div>
    <div class="right">
      <span>
        <i class="fa-regular fa-star"></i>
        ${dish.rating}
      </span>
      <ul class="cathegories">
        <li>${dish.category}</li>
      </ul>
      <span class="price-item"> ${dish.price}</span>
      <button>ADD</button>
    </div>
  </div>
  <aside class="card-expander">
  <p class="description">
    ${dish.description}
  </p>
  </aside>
  `
    return card
  }

  const darkModeSelect = document.getElementById("toggle-mode");
  darkModeSelect.addEventListener("click", function () {
    var body = document.body;
  
    // Toggle the theme classes on the body
    body.classList.toggle("dark-theme");
    body.classList.toggle("light-theme");
  
    // Toggle the button text
    var currentTheme = toggleButton.textContent;
    var newTheme = currentTheme === "dark" ? "light" : "dark";
    toggleButton.textContent = newTheme;
  });
  