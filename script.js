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
  // Insert dishes into the menu
  const menu = document.getElementById("menu")
  data.dishes.forEach((dish) => menu.appendChild(createDishCard(dish)))

  // Insert category filters
  let categories = getCategories(data.dishes)
  categories.unshift("all") // Add "all" as the first category
  const categoryFiltersUl = document.getElementById("category-filters")
  categoryFiltersUl.innerHTML = categories.map(createCategoryFilter).join("")

  // Add event listeners to the category filters
  document.querySelectorAll("#category-filters button").forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category
      document.querySelectorAll(".card").forEach((card) => {
        if (category === "all") {
          // If the "all" button was clicked, display all cards
          card.style.display = ""
        } else {
          // Otherwise, display only the cards that include the selected category
          const categories = card.dataset.category.split(" ")
          card.style.display = categories.includes(category) ? "" : "none"
        }
      })
    })
  })
}
////create a card for each dish from data ////
function createDishCard(dish) {
  const card = document.createElement("div")
  card.classList.add("card")
  card.dataset.id = dish.id
  dish.category.forEach((category) => (card.dataset.category += " " + category))
  const categoriesListItems = dish.category.map(category => `<li>${category}</li>`).join("");
  card.innerHTML = `
     <div class="top-card">
    <div class="left">
      <h3>${dish.name}</h3>
      <img class="product-shot" src="${dish.picture}" alt="preview menu item" />
    </div>
    <div class="right">
      <span>
        <i class="fa-regular fa-star"></i>
        ${dish.rating}
      </span>
      <ul class="cathegories">
      ${categoriesListItems}
      </li>
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


///getting the dishes from the data////
function getCategories(dishes) {
  let categories = new Set()
  dishes.forEach((dish) =>
    dish.category.forEach((category) => categories.add(category))
  )
  return [...categories]
}

function createCategoryFilter(category) {
  const li = document.createElement("li")

  const button = document.createElement("button")
  button.dataset.category = category
  button.textContent = category.charAt(0).toUpperCase() + category.slice(1)

  li.appendChild(button)

  return li.outerHTML
}

//////// search bar functionality /////

const searchForDish = document.querySelector("#searchO");

searchForDish.addEventListener("click", searchItem);
function searchItem(){
    const searchTerm = inputValue.value.toLowerCase(); 
    document.querySelectorAll(".card").forEach((card) => {
      const dishName = card.querySelector("h3").textContent.toLowerCase(); 
      if (dishName.includes(searchTerm)) {
        card.style.display = ""; }
        else{
       card.style.display = "none";
      }
      inputValue.value = ""; 
    });
   
  }


//const searchForDish = document.querySelector("#searchO")
//const inputValue = document.querySelector("#inputValue")
//searchForDish.addEventListener("click", searchItem)
//function searchItem() {
//  console.log(inputValue.value)
//}

///////////// dark mode toggle ///////////////

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

///////////////////// aside image functionality /////////////
let prevClick = null
let prevImg = null
let bigImg = document.querySelector("#side-view big-img")
let bigDesc = document.querySelector("#side-view big-description")
let asideView = document.getElementById("side-view")

setTimeout(() => {
  let foodCard = document.getElementsByClassName("card")

  Array.from(foodCard).forEach((card) => {
    let productShot = card.getElementsByClassName("product-shot")
    let description = card.getElementsByClassName("description")
   

    Array.from(description).forEach((desc) => {
      card.addEventListener("click", (e) => {
        if (card.className === "card") {
          // e.currentTarget.classList.add('white');
          let current = desc.cloneNode(true)
          current.setAttribute("class", "big-description")
          asideView.append(current)
          console.log(desc.cloneNode(true))

          if (prevClick !== null && asideView.childNodes !== null) {
            // prevClick.classList.remove('white');

            bigDesc.replaceWith(current)
          }
          console.log(asideView.childNodes)
          bigDesc = current

          prevClick = e.currentTarget
        }
      })
    })
    //
    Array.from(productShot).forEach((img) => {
      card.addEventListener("click", (e) => {
        if (card.className === "card") {
          // e.currentTarget.classList.add('white');
          let current = img.cloneNode(true)
          current.setAttribute("class", "big-img")
          asideView.append(current)
          console.log(img.cloneNode(true))

          if (prevImg !== null && asideView.childNodes !== null) {
            // prevClick.classList.remove('white');

            bigImg.replaceWith(current)
          }
          console.log(asideView.childNodes)
          bigImg = current
          console.log(bigImg)
          prevImg = e.currentTarget
        }
      })
    })
  })
}, 200)
