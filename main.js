function getProductHtml(product) {
    return `
      <div class="card">
      <img src="Images/${product.image}" class="card-img" alt="..." >
      <div class="card-body" >
        <h5 class="card-title" >${product.title}</h5>
        <p class="card-text" >${product.description}</p>
        <div class= "card-down">
            <span class="card-price" >Ціна ${product.price}$</</span>
            <button class="buy-button cart-btn" data-product='${JSON.stringify(product)}'>Купить</button>
        </div>
      </div>
    </div>
    `
  }

function displayProducts(products) {
  const productsContainer = document.querySelector('.catalog');
  productsContainer.innerHTML = '';

  if (products.length === 0) {
      productsContainer.innerHTML = '<p>Товари не знайдено</p>';
  }

  products.forEach(function (product) {
      productsContainer.innerHTML += getProductHtml(product);
  });

  const buyButtons = productsContainer.querySelectorAll('.cart-btn');
  buyButtons.forEach(function (button) {
      button.addEventListener('click', addToCart);
  });}

function filterProducts(query, products) {
    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase()) || 
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    displayProducts(filteredProducts); 
}

async function getProducts() {
    const response = await fetch('products.json');
    return await response.json();
}

getProducts().then(function(products) {
    displayProducts(products);
    document.getElementById('search-input').addEventListener('input', function(event) {
        const query = event.target.value;
        filterProducts(query, products);
    });
});
  
async function getProducts() {
  const response = await fetch('products.json')
  return await response.json()
}
  
getProducts().then(function (products) {
  const productsContainer = document.querySelector('.catalog')
  
  if (products) {
    products.forEach(function (product) {
      productsContainer.innerHTML += getProductHtml(product)
    })
  }

  let buyButtons = document.querySelectorAll('.cart-btn')

  if(buyButtons.length > 0) {
  buyButtons.forEach(function(button) {
      button.addEventListener('click', addToCart)
    })
}

})
  
class Cart {
  constructor() {
      this.items = {}
      this.total = 0
      this.loadCartToCookies()
  }

  addItem(item) {
      if(this.items[item.title]) {
          this.items[item.title].quantity += 1
      } else {
          this.items[item.title] = item
          this.items[item.title].quantity = 1
      }
      this.saveCartToCookies()
  }

  removeItem(title) {
    if (this.items[title]) {
      delete this.items[title]; // Видаляємо товар з кошика
      this.saveCartToCookies(); // Оновлюємо куки
    }
  }

  clearCart() {
    this.items = {}; // Очищаємо всі товари
    this.saveCartToCookies(); // Оновлюємо куки
  }

  saveCartToCookies() {
      let cartJSON = JSON.stringify(this.items)
      document.cookie = `cart=${cartJSON}; max-age=${60 * 60 * 24 * 7}; path=/`

      console.log(document.cookie)
  }

  loadCartToCookies() {
      let cartCookies = getCookieValue('cart');

      if (cartCookies && cartCookies !== '') {
          this.items = JSON.parse(cartCookies)
      }
  }
}

let cart = new Cart();

function buyAllItems() {
  cart.clearCart(); // Очищаємо кошик
  showCart(); // Оновлюємо відображення
  alert('Всі товари куплено! Дякуємо за замовлення.');
}

// Прив'язуємо обробник до кнопки
document.querySelector('.buy-all-btn').addEventListener('click', buyAllItems);

function removeCartItem(event) {
  const title = event.target.getAttribute('data-title'); // Отримуємо назву товару
  cart.removeItem(title); // Видаляємо товар з кошика
  showCart(); // Оновлюємо відображення кошика
  alert(`Товар "${title}" успішно видалено з кошика.`);
}



function addToCart(event) {
  const productData = event.target.getAttribute('data-product')
  const product = JSON.parse(productData)

  cart.addItem(product)

  alert(`Товар \"${product.title}\" успішно додано до кошика!`);
}

function getCookieValue(cookieName) {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name === cookieName) {
          return decodeURIComponent(value);
      }
  }
  return null;
}

function getCartProductHtml(item) {
  return `
      <div class="cart-item">

      <div class="cart-item-details">
        <h3 class="cart-item-title">${item.title}</h3>
        <p class="cart-item-price">Ціна: ${item.price}$ </p>
        <p class="cart-item-quantity">Кількість: ${item.quantity}</p>
      </div>
      <button class="cart-item-remove-btn" data-title="${item.title}">Видалити</button>
    </div>
`
}

function showCart() {
  const cartContainer = document.querySelector('.cart-container')
  cartContainer.innerHTML = ''
  for (let key in cart.items) {
      cartContainer.innerHTML += getCartProductHtml(cart.items[key])
  }

  const removeButtons = cartContainer.querySelectorAll('.cart-item-remove-btn');
  removeButtons.forEach(button => {
    button.addEventListener('click', removeCartItem);
  });


  cart.loadCartToCookies()
}

showCart()







