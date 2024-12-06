function getProductHtml(product) {
    return `
      <div class="card" style="width: 18rem;">
      <img src="Images/${product.image}" class="card-img" alt="...">
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">${product.description}</p>
        <a href="#" class="btn btn-primary">${product.price}$</a>
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
  