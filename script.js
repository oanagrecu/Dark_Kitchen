////// getting the data from the json//////
fetch('data.json')
  .then((response) => response.json())
  .then((data) => {
    // Use the data
    handleData(data);
  })
  .catch((error) => console.error('Error:', error));

function handleData(data) {
  // Insert dishes into the menu
  const menu = document.getElementById('menu');
  data.dishes.forEach((dish) => menu.appendChild(createDishCard(dish)));

  // Insert category filters
  let categories = getCategories(data.dishes);
  categories.unshift('all'); // Add "all" as the first category
  const categoryFiltersUl = document.getElementById('category-filters');
  categoryFiltersUl.innerHTML = categories.map(createCategoryFilter).join('');

  // Add event listeners to the category filters
  document.querySelectorAll('#category-filters button').forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;
      document.querySelectorAll('.card').forEach((card) => {
        if (category === 'all') {
          // If the "all" button was clicked, display all cards
          card.style.display = '';
        } else {
          // Otherwise, display only the cards that include the selected category
          const categories = card.dataset.category.split(' ');
          card.style.display = categories.includes(category) ? '' : 'none';
        }
      });
    });
  });
}

// Array for the shopping cart
let cart = [];
console.log(cart);

////create a card for each dish from data ////
function createDishCard(dish) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.id = dish.id;
  dish.category.forEach(
    (category) => (card.dataset.category += ' ' + category),
  );
  const categoriesListItems = dish.category
    .map((category) => `<li>${category}</li>`)
    .join('');
  card.innerHTML = `
     <div class="top-card">
    <div class="left">
      <h3>${dish.name}</h3>
      <img class="product-shot" src="${dish.picture}" alt="preview menu item" />
    </div>
    <div class="right">
      <button class="price-item">${dish.price}</button>
      <button class="add-to-cart">Add to cart</button>
    </div>
  </div>
  <aside class="card-expander">
  <p class="description">
    ${dish.description} 
      </p>
      <div class="cat-rating">
    <ul class="cathegories">
    ${categoriesListItems}
    </ul>   
    <span>
      <i class="fa-solid fa-star"></i>${dish.rating}
      </span>
 </div>
  </aside>
  `;
  // Add event listener to the "Add to Cart" button
  card.querySelector(".price-item").addEventListener("click", () => {
    const isDishInCart = cart.some((cartDish) => cartDish.id === dish.id)
    if (!isDishInCart) {
      cart.push(dish)
      updateCart()
    }
  })

  return card
}

//////functionality for cart ////
//let basket = document.getElementsByClassName("fa-cart-shopping")[0]
//basket.addEventListener("click", function () {
//  document.getElementsByClassName("price-expanded")[0].style.display = "flex"
//})
//let closeBtnCart = document.getElementsByClassName("fa-circle-xmark")[0]
//closeBtnCart.addEventListener("click", function () {
//  document.getElementsByClassName("price-expanded")[0].style.display = "none"
//})

/////desktop navbar update ////

const desktopNav = () => {
  let desktopButtonsNav = document.createElement('div');
  desktopButtonsNav.classList.add('desktop-buttons');
  desktopButtonsNav.innerHTML = `
    <button id="toggle-mode">DARK</button>
    <span>Last Item <span class="last-item"> € ${dish.price} </span></span>
    <h2>Total<span class="total"> € ${cart
      .reduce((total, dish) => total + dish.price, 0)
      .toFixed(2)}</span></h2>
      <i class="fa-solid fa-cart-shopping"></i>       
         <div class="price-expanded">
            <h3>Your order</h3>
            <i class="fa-regular fa-circle-xmark"></i>
            <p>Nothing in your cart yet
              Go back and add stuff!
            </p>
            </div>`;
  let navbarDesktop = document.getElementById('desktop');
  navbarDesktop.appendChild(desktopNav);
};

// Update the cart display
function updateCart() {
  const cartElement = document.getElementById('cart');
  cartElement.innerHTML = `
 ${cart
   .map(
     (dish, index) => `
    <div class="price-expanded">
      <h3>Your order</h3>
      <i class="fa-regular fa-circle-xmark"></i>
      <ul>
        <li>
        <p>${dish.name}: <span class="price-item"> $${dish.price}</span></p>
          <span class="minus" data-index="${index}"> - </span>
          <span class="plus" data-index="${index}"> + </span>
        </li>    `,
   )
   .join('')}
        <hr />
        <p>Total: $${cart
          .reduce((total, dish) => total + dish.price, 0)
          .toFixed(2)}</p>
        <button id="checkout">Checkout</button>
        </ul>
    </div>
  `;
  // Add event listeners to the "Minus" buttons
  cartElement.querySelectorAll('.minus').forEach((button) => {
    button.addEventListener('click', () => {
      const index = parseInt(button.dataset.index, 10);
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
      } else {
        cart.splice(index, 1);
      }
      updateCart();
    });
  });

  // Add event listeners to the "Plus" buttons
  cartElement.querySelectorAll('.plus').forEach((button) => {
    button.addEventListener('click', () => {
      const index = parseInt(button.dataset.index, 10);
      cart[index].quantity++;
      updateCart();
    });
  });

  // Add event listener to the "Checkout" button
  cartElement.querySelector('#checkout').addEventListener('click', () => {
    if (cart.length > 0) {
      alert('Thank you for your order!');
      cart = [];
      updateCart();
    } else {
      alert('Your cart is empty.');
    }
  });
}

///getting the dishes from the data////
function getCategories(dishes) {
  let categories = new Set();
  dishes.forEach((dish) =>
    dish.category.forEach((category) => categories.add(category)),
  );
  return [...categories];
}

function createCategoryFilter(category) {
  const li = document.createElement('li');

  const button = document.createElement('button');
  button.dataset.category = category;
  button.textContent = category.charAt(0).toUpperCase() + category.slice(1);

  li.appendChild(button);

  return li.outerHTML;
}

//////// search bar functionality /////

const searchForDish = document.querySelector('#searchO');

searchForDish.addEventListener('click', searchItem);
function searchItem() {
  const searchTerm = inputValue.value.toLowerCase();
  document.querySelectorAll('.card').forEach((card) => {
    const dishName = card.querySelector('h3').textContent.toLowerCase();
    const dishCategory = card
      .querySelector('.cathegories li')
      .textContent.toLowerCase();

    if (dishName.includes(searchTerm) || dishCategory.includes(searchTerm)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
    inputValue.value = '';
  });
}

///////////// dark mode toggle ///////////////

const darkModeSelect = document.getElementById('toggle-mode');
darkModeSelect.addEventListener('click', function () {
  var body = document.body;

  // Toggle the theme classes on the body
  body.classList.toggle('dark-theme');
  body.classList.toggle('light-theme');

  // Toggle the button text
  var currentTheme = darkModeSelect.textContent;
  var newTheme = currentTheme === 'DARK' ? 'LIGHT' : 'DARK';
  darkModeSelect.textContent = newTheme;
});

///////////////////// aside image functionality /////////////
let prevClick = null;
let prevImg = null;
let bigImg = document.querySelector('#side-view big-img');
let bigDesc = document.querySelector('#side-view big-description');
let asideView = document.getElementById('side-view');

setTimeout(() => {
  let foodCard = document.getElementsByClassName('card');

  Array.from(foodCard).forEach((card) => {
    let productShot = card.getElementsByClassName('product-shot');
    let description = card.getElementsByClassName('description');

    Array.from(description).forEach((desc) => {
      card.addEventListener('click', (e) => {
        if (card.className === 'card') {
          // e.currentTarget.classList.add('white');
          let current = desc.cloneNode(true);
          current.setAttribute('class', 'big-description');
          asideView.append(current);
          console.log(desc.cloneNode(true));

          if (prevClick !== null && asideView.childNodes !== null) {
            // prevClick.classList.remove('white');

            bigDesc.replaceWith(current);
          }
          console.log(asideView.childNodes);
          bigDesc = current;

          prevClick = e.currentTarget;
        }
      });
    });
    //
    Array.from(productShot).forEach((img) => {
      card.addEventListener('click', (e) => {
        if (card.className === 'card') {
          // e.currentTarget.classList.add('white');
          let current = img.cloneNode(true);
          current.setAttribute('class', 'big-img');
          asideView.append(current);
          console.log(img.cloneNode(true));

          if (prevImg !== null && asideView.childNodes !== null) {
            // prevClick.classList.remove('white');

            bigImg.replaceWith(current);
          }
          console.log(asideView.childNodes);
          bigImg = current;
          console.log(bigImg);
          prevImg = e.currentTarget;
        }
      });
    });
  });
}, 200);
