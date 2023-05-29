//Contact Us Actions
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
//cart js
document.addEventListener("DOMContentLoaded", function () {
  const cartOverlay = document.querySelector(".cart-overlay");
  const cartBtn = document.querySelector(".fa-shopping-cart");
  const closeBtn = document.querySelector(".close-btn");
  const cartHider = document.querySelector(".cart-hider-div");

  // showCart
  function showCart() {
    cartOverlay.classList.add("showCart");
  }

  function hideCart() {
    cartOverlay.classList.remove("showCart");
  }

  cartBtn.addEventListener("click", showCart);
  closeBtn.addEventListener("click", hideCart);
  cartHider.addEventListener("click", hideCart);

  const cartTotal = document.querySelector(".cart-total");
  const cartContent = document.querySelector(".cart-content");

  // Initialize cart data
  let cartItems = [];
  let total = 0;

  // Function to update the cart total
  function updateCartTotal() {
    total = cartItems.reduce((acc, item) => acc + item.price, 0);
    cartTotal.textContent = total.toFixed(2);
  }

  // Function to check if a product already exists in the cart
  function isProductInCart(productTitle) {
    return cartItems.some((item) => item.title === productTitle);
  }

  // Function to add a product to the cart
var id = 0;
function addToCart(product) {
  const { title, price, img } = product;
  const existingItem = cartItems.find((item) => item.title === title);

  if (!existingItem) {
    id++;
    cartItems.push({ title, price, img, id });
    let results = `
      <div class="cart-item">
        <div class="cart-img-container">
          <img src="${img}" alt="" />
        </div>
        <div class="cart-description-container">
          <div class="cart-product-title">
            <p>Product: <span class="product-title-innerCart">${title}</span></p>
          </div>
          <div class="cart-product-price">
            <p>Price: <span class="product-price-innerCart">${price}$</span></p>
          </div>
        </div>
        <div class="remove-btn-container">
          <i class="fa fa-remove" data-id="${id}" style="margin: 0%; padding: 0%; display: inline;"></i>
        </div>
      </div>
    `;
    cartContent.insertAdjacentHTML("beforeend", results);
    const removeBtn = document.querySelector(`[data-id="${id}"]`);
    attachRemoveEventListener(removeBtn);
  }
  updateCartTotal();
}

// Function to attach event listener to remove button
function attachRemoveEventListener(removeBtn) {
  removeBtn.addEventListener("click", () => {
    const btnId = parseInt(removeBtn.dataset.id);
    cartItems = cartItems.filter((item) => item.id !== btnId);

    // Remove the specific item's HTML from the cart content
    const itemContainer = removeBtn.closest(".cart-item");
    itemContainer.remove();

    updateCartTotal();
  });
}
  function clearCart() {
    cartItems = []; 
    cartContent.innerHTML = "";
    updateCartTotal(); 
  }

  const checkOutBtn = document.querySelector(".checkout-btn");
  checkOutBtn.addEventListener("click", clearCart);

 // Add event listeners to "Add to Cart" buttons
 const addToCartButtons = document.querySelectorAll(".bi-cart-plus");
 addToCartButtons.forEach((button) => {
   button.addEventListener("click", function () {
     showCart();
     const productContainer = this.closest(".single-product-container");
     const imageElement = productContainer.querySelector(".product-img img");
     const productImg = imageElement.getAttribute("src");
     const productTitle =
       productContainer.querySelector(".product-title h5").textContent;
     const productPrice = parseFloat(
       productContainer.querySelector(".product-price p").textContent.slice(1)
     );

     if (!isProductInCart(productTitle)) {
       addToCart({
         title: productTitle,
         price: productPrice,
         img: productImg,
       });
     }
   });
 });
 
});
const checkOutBtn = document.querySelector(".checkout-btn");
checkOutBtn.addEventListener("click", clearCart);

function clearCart() {
  alert("Checkout completed successfully!");
}