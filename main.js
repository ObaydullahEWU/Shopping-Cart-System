let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Black Shirt',
        tag: 'blackshirt',
        price: 150,
        incart: 0
    },
    {
        name: 'Red Tshirt',
        tag: 'redshirt',
        price: 200,
        incart: 0
    },
    {
        name: 'White Shirt',
        tag: 'whiteshirt',
        price: 350,
        incart: 0
    },
    {
        name: 'Blue Shirt',
        tag: 'blueshirt',
        price: 400,
        incart: 0
    },
    {
        name: 'Green Shirt',
        tag: 'greenshirt',
        price: 450,
        incart: 0
    },
    {
        name: 'Black TShirt',
        tag: 'blacktshirt',
        price: 500,
        incart: 0
    },
    {
        name: 'Yellow Shirt',
        tag: 'yellowshirt',
        price: 550,
        incart: 0
    },
    {
        name: 'White TShirt',
        tag: 'whitetshirt',
        price: 600,
        incart: 0
    },

]


for(let i=0; i < carts.length; i++){
    carts[i].addEventListener("click", (e) => {
        cartNumbers( e.preventDefault() , products[i]);
        totalCost(products[i]);
    })
   
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(e, product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItem(product);

}

function setItem(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
   
    
    if(cartItems != null){
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].incart += 1; 
    }else{
        product.incart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
} 
function totalCost(product){
    
    // console.log("the product price is: ", product.price);
    let cartCost = localStorage.getItem('totalCost');
    
    
    if(cartCost !=null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost+product.price);
    }else{
        localStorage.setItem("totalCost", product.price)
    }
    
}
function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems  = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <i class="fas fa-window-close"></i>
                <img src="./image/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="price"> $${item.price}.00</div>
            <div class="quantity">
                <i class="fas fa-plus-square"></i>
                <span>${item.incart}</span>
                <i class="fas fa-minus-square"></i>
            </div>
            <div class="total">
            $${item.incart * item.price}.00
            </div>
            `
        });

        productContainer.innerHTML+=`
            <div class="basketTotalContainer">
                <h4 class = "basketTotalTitle">
                  Basket Total
                </h4>
                <h4 class="basketTotal">
                    $${cartCost}.00
                </h4>
            </div>
        `;
    }
    
}

onLoadCartNumbers();
displayCart();