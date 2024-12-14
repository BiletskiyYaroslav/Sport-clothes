function getProductHtml(product) {
    return `
      <div class="card">
      <img src="Images/${product.image}" class="card-img" alt="..." >
      <div class="card-body" >
        <h5 class="card-title" >${product.title}</h5>
        <p class="card-text" >${product.description}</p>
        <div class= "card-down">
            <span class="card-price" >Ціна ${product.price}$</</span>
            <a href="#" class="buy-button" >Купить</a>
        </div>
      </div>
    </div>
    `
  }
  
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
  })
  
// Функция для отображения товаров в DOM
function displayProducts(products) {
  const productsContainer = document.querySelector('.catalog');
  productsContainer.innerHTML = ''; // очищаем контейнер перед добавлением новых товаров

  products.forEach(function(product) {
      productsContainer.innerHTML += getProductHtml(product);
  });
}

// Функция для фильтрации товаров по поисковому запросу
function filterProducts(query, products) {
  const filteredProducts = products.filter(product => 
      product.title.toLowerCase().includes(query.toLowerCase()) || 
      product.description.toLowerCase().includes(query.toLowerCase())
  );
  displayProducts(filteredProducts);
}

// Обработчик поиска
document.getElementById('search-input').addEventListener('input', function(event) {
  const query = event.target.value;
  getProducts().then(function(products) {
      filterProducts(query, products);
  });
});

// Загружаем и отображаем все товары при загрузке страницы
getProducts().then(function(products) {
  displayProducts(products);
});