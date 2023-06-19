////// getting the data from the json//////
fetch('data.json')
  .then((response) => response.json())
  .then((data) => {
    // Use the data
    console.log(data);
    handleData(data);
  })
  .catch((error) => console.error('Error:', error));
function handleData(data) {
  ////insert dishes into the menu
  const menu = document.getElementById('menu');
  data.dishes.forEach((dish) => menu.appendChild(createDishCard(dish)));
}

////create a card for each dish from data ////
function createDishCard(dish) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.id = dish.id;
  card.dataset.category = dish.category;
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
  `;
  return card;
}

// Add event listeners to the category filters
document.querySelectorAll('nav ul button').forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.data.category;
    document.querySelectorAll('.card').forEach((card) => {
      card.style.display = card.dataset.category === category ? '' : 'none';
    });
  });
});

///getting the dishes from the ////
function getCategories(dishes) {
  return [...new Set(dishes.map((dish) => dish.category))];
}

///////////// dark mode toggle /////

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

// add
let prevClick = null;
let prevImg = null;
let bigImg = document.querySelector('#side-view big-img');
let bigDesc = document.querySelector('#side-view big-description');
let asideView = document.getElementById('side-view');

setTimeout(() => {
  console.log('hello');
  let foodCard = document.getElementsByClassName('card');

  Array.from(foodCard).forEach((card) => {
    let productShot = card.getElementsByClassName('product-shot');
    let description = card.getElementsByClassName('description');

    ///

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
