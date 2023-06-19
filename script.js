////// getting the data from the json//////
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    // Use the data
    handleData(data)
  })
  .catch((error) => console.error("Error:", error))
function handleData(data) {
  ////insert dishes into the menu
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
     <div class="top-card">
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
      <button class="price-item">${dish.price}</button>
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




// Getting the categories from the dishes
function getCategories(dishes) {
   // get unique categories from dishes
const categories = getCategories(dishes);

// create a list item for each category and join them into a single HTML string
const categoryListItems = categories.map(category => `<li><button>${category}</button></li>`).join('');

// insert the list items into the unordered list into the HTML
document.querySelector('.categories ul').innerHTML = categoryListItems;

  }


  
  // Add event listeners to the category filters
  document.querySelectorAll(".categories ul li button").forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;
      document.querySelectorAll(".card").forEach((card) => {
        card.style.display = card.dataset.category === category ? " " : "none";
      });
    });
  });
  

// Create a "All Categories" button
const showAllButton = document.createElement('button');
showAllButton.innerText = 'All Categoties';
showAllButton.addEventListener('click', () => {
  // Show all cards when the "Show All" button is clicked
  document.querySelectorAll('.card').forEach((card) => {
    card.style.display = '';
  });
});

// Add the "Show All" button to the list of category buttons
document.querySelector('.categories ul').appendChild(showAllButton);


///////////// dark mode toggle /////

const darkModeSelect = document.getElementById("toggle-mode")
darkModeSelect.addEventListener("click", function () {
  var body = document.body

  // Toggle the theme classes on the body
  body.classList.toggle("dark-theme")
  body.classList.toggle("light-theme")

  // Toggle the button text
  var currentTheme = darkModeSelect.textContent
  var newTheme = currentTheme === "DARK" ? "LIGHT" : "DARK"
  darkModeSelect.textContent = newTheme
})
