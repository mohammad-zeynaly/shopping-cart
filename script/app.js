const allProducts = [
    {id: 1, img: 'images/product-1.jpg', title: 'Ocean',Category:'Furniture',Status:'Active', StatusClass: "product-item-body-texts--active",Price:'560', count:1,},
    {id: 2, img: 'images/product-2.jpg', title: 'Lou',Category:'Kitchen',Status:'Disabled', StatusClass: "product-item-body-texts--disabled",Price:'710', count:1,},
    {id: 3, img: 'images/product-3.jpg', title: 'Yellow',Category:'Decoration',Status:'Active', StatusClass: "product-item-body-texts--active",Price:'360', count:1,},
    {id: 4, img: 'images/product-4.jpg', title: 'Dreamy',Category:'Bedroom',Status:'Disabled', StatusClass: "product-item-body-texts--disabled",Price:'260', count:1,},
    {id: 5, img: 'images/product-5.jpg', title: 'Boheme',Category:'Furniture',Status:'Active', StatusClass: "product-item-body-texts--active",Price:'350', count:1,},
    {id: 6, img: 'images/product-6.jpg', title: 'Sky',Category:'Bathroom',Status:'Disabled', StatusClass: "product-item-body-texts--disabled",Price:'160', count:1,},
    {id: 7, img: 'images/product-7.jpg', title: 'Midnight',Category:'Furniture',Status:'Active', StatusClass:"product-item-body-texts--active",Price:'340', count:1,},
    {id: 8, img: 'images/product-8.jpg', title: 'Boheme',Category:'Furniture',Status:'Active', StatusClass: "product-item-body-texts--active",Price:'350', count:1,},
    {id: 9, img: 'images/product-9.jpg', title: 'Palm',Category:'Decoration',Status:'Active', StatusClass: "product-item-body-texts--active",Price:'60', count:1,},
    {id: 10, img: 'images/product-10.jpg', title: 'Forest',Category:'Living Room',Status:'Active', StatusClass: "product-item-body-texts--active",Price:'270', count:1,},
    {id: 11, img: 'images/product-11.jpg', title: 'Sand',Category:'Living Room',Status:'Disabled', StatusClass: "product-item-body-texts--disabled",Price:'230', count:1,},
    {id: 12, img: 'images/product-1.jpg', title: 'Autumn',Category:'Decoration',Status:'Active', StatusClass: "product-item-body-texts--active",Price:'252', count:1,},
];

// Select Element To Dom 
const productsWrapper = document.querySelector('#products-wrapper'),
themeBtn = document.querySelector(".header__theme-btn"),
overlayContainer = document.querySelector('#overlay'),
userBasket = document.querySelector(".header-basket"),
basketModalCart = document.querySelector(".basket-modal"),
basketModalItems = document.querySelector("#basketModalItems"),
basketModalClose = document.querySelector(".basket-modal__close"),
basketModalClear = document.querySelector("#basketModalClear"),
basketModalConfirm = document.querySelector("#basketModalConfirm"),
userBasketBadge = document.querySelector(".header-basket__badge"),
totalPriceProduct = document.querySelector("#totalPrice");


// user Basket Cart 
let userBasketCart = [
    //{id: 1, img: 'images/product-1.jpg', title: 'Ocean',Category:'Furniture',Status:'Active', StatusClass: "product-item-body-texts--active",Price:'560', count:1,},
]


// Generate All Products And Add To Dom 
function generateProducts () {
    allProducts.forEach(product => {
        productsWrapper.insertAdjacentHTML("beforeend",`
        <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
        <div class="product-item">
        <div class="product-item-img">
        <img class="product-item__image" src="${product.img}" alt="image product">
        </div>
        <div class="product-item-body">
        <h4 class="product-item-body__title">${product.title}</h4>
        <div class="product-item-body-texts">
            <span class="product-item-body-texts__title">Category:</span>
            <span class="product-item-body-texts__caption">${product.Category}</span>
        </div>
        <div class="product-item-body-texts">
            <span class="product-item-body-texts__title">Status:</span>
            <span class="product-item-body-texts__caption ${product.StatusClass}">${product.Status}</span>
        </div>
        <div class="product-item-body-texts">
            <span class="product-item-body-texts__title">Price:</span>
            <span class="product-item-body-texts__caption">$${product.Price}</span>
        </div>
        </div>
         <div class="product-item__btn">
        <button class="app-btn" onclick="addProductBasket(${product.id})" >Add Product</button>
        </div>
        </div>
        </div>`)
    
    })
}
generateProducts ()


//Set Data LocalStorage
function setInLocalStorage (nameSet,dataSet) {
    localStorage.setItem(`${nameSet}`,`${dataSet}`);
}


// add Product User Basket 
function addProductBasket (productId) {
    let basket = userBasketCart.some(basketProduct => {
        return basketProduct.id === productId 
    })

    if(basket === true){

    }else{

        let mainProduct = allProducts.find(basketProduct => {
            return productId == basketProduct.id
        })

        userBasketCart.push(mainProduct)
        generateProductBasket(userBasketCart);
        totalPrice(userBasketCart)
        setInLocalStorage("basket",JSON.stringify(userBasketCart))
    }

}


// Set Theme Dark In Template
function themeHandler () {
    let setTheme = document.documentElement.classList.toggle("dark-theme");

    if(setTheme){
        setInLocalStorage('Theme','dark-theme')
    }else{
        setInLocalStorage('Theme','light-theme')
    }
}


// user Basket Show
function userBasketShow () {
    basketModalCart.style.top = '50%';
    overlayContainer.classList.add("overlay");
}


// close all form in overlay
function overlayHandler () {
    basketModalCart.style.top = '-50%';
    overlayContainer.classList.remove("overlay");
}


// Close Modal Basket
function basketModalCloseHandler () {
    basketModalCart.style.top = '-50%';
    overlayContainer.classList.remove("overlay");
}


// Generate Products User Basket
function generateProductBasket (userBasketCarts){
    console.log("userBasketCarts:",userBasketCarts);
    if(userBasketCart.length === 0){
        basketModalItems.innerHTML = '';
        basketModalItems.insertAdjacentHTML('beforeend', `<p class="basket-modal__caption">cart is empty!</p>`)
    }else{
    basketModalItems.innerHTML = '';
    userBasketCarts.forEach(basketProduct => {
        basketModalItems.insertAdjacentHTML("beforeend", `
        <div class="basket-modal-item">
        <div class="basket-modal-item__picture">
            <img src="${basketProduct.img}" alt="">
        </div>
        <div class="basket-modal-item__caption">
            <span class="basket-modal-item__title">${basketProduct.title}</span>
            <span class="basket-modal-item__price">$${basketProduct.Price}</span>
        </div>
        <div class="basket-modal-item__number">
        <button onclick="basketProductMinus(this,${basketProduct.id},this.parentNode.querySelector('input[type=number]').value)" class="basket-modal-item__minus">
            <svg xmlns="http://www.w3.org/2000/svg" class="basket-modal-item__icon" width="23px" height="23px" viewBox="0 0 24 24" fill="#FF0000">
            <path d="M7 11C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H7Z" fill="#FF0000"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 2C3.11929 2 2 3.11929 2 4.5V19.5C2 20.8807 3.11929 22 4.5 22H19.5C20.8807 22 22 20.8807 22 19.5V4.5C22 3.11929 20.8807 2 19.5 2H4.5ZM4 4.5C4 4.22386 4.22386 4 4.5 4H19.5C19.7761 4 20 4.22386 20 4.5V19.5C20 19.7761 19.7761 20 19.5 20H4.5C4.22386 20 4 19.7761 4 19.5V4.5Z" fill="#FF0000"/>
            </svg>
        </button>
        <input type="number" class="basket-modal-item__input" value="${basketProduct.count}" min="0" max="10">
        <button onclick="basketProductPlus(this,${basketProduct.id},this.parentNode.querySelector('input[type=number]').value)" class="basket-modal-item__plus">
            <svg xmlns="http://www.w3.org/2000/svg" class="basket-modal-item__icon" width="23px" height="23px" viewBox="0 0 24 24" fill="#008000">
            <path d="M12 6C12.5523 6 13 6.44772 13 7V11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H13V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V13H7C6.44772 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11H11V7C11 6.44772 11.4477 6 12 6Z" fill="#008000"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2 4.5C2 3.11929 3.11929 2 4.5 2H19.5C20.8807 2 22 3.11929 22 4.5V19.5C22 20.8807 20.8807 22 19.5 22H4.5C3.11929 22 2 20.8807 2 19.5V4.5ZM4.5 4C4.22386 4 4 4.22386 4 4.5V19.5C4 19.7761 4.22386 20 4.5 20H19.5C19.7761 20 20 19.7761 20 19.5V4.5C20 4.22386 19.7761 4 19.5 4H4.5Z" fill="#008000"/>
            </svg>
        </button>
      </div>
        <div class="basket-modal-item__trash" onclick="removeBasketProduct(${basketProduct.id})">
            <svg class="basket-modal-item__icon" fill="#920000" width="23px" height="23px" viewBox="0 0 24 24">
                <path d="M22,5a1,1,0,0,1-1,1H3A1,1,0,0,1,3,4H8V3A1,1,0,0,1,9,2h6a1,1,0,0,1,1,1V4h5A1,1,0,0,1,22,5ZM4.934,21.071,4,8H20l-.934,13.071a1,1,0,0,1-1,.929H5.931A1,1,0,0,1,4.934,21.071ZM15,18a1,1,0,0,0,2,0V12a1,1,0,0,0-2,0Zm-4,0a1,1,0,0,0,2,0V12a1,1,0,0,0-2,0ZM7,18a1,1,0,0,0,2,0V12a1,1,0,0,0-2,0Z"/>
            </svg>
        </div>
    </div>
    
        `)
    })
}

    userBasketBadge.textContent = userBasketCart.length
}


// clear ALl Products Is User Basket
function basketModalClearHandler () {
    userBasketCart = [];
    localStorage.removeItem("basket")
    basketModalItems.innerHTML = '';
    generateProductBasket(userBasketCart);
    totalPrice (userBasketCart)
}


// Confirm ALl Product User Basket
function basketModalConfirmHandler () {
    basketModalCart.style.top = '-50%';
    overlayContainer.classList.remove("overlay");
}


// Remove One Basket Product 
function removeBasketProduct (productId) {
    userBasketCart = userBasketCart.filter(product => {
        return product.id !== productId
    })

    generateProductBasket(userBasketCart)
    setInLocalStorage("basket",JSON.stringify(userBasketCart))
    totalPrice (userBasketCart)
}


// sum product price
function totalPrice (userBasketCart) {
    let totalPriceValue = 0

    userBasketCart.forEach(product => {
        totalPriceValue += product.count * product.Price
        console.log(product.Price);
    })
    totalPriceProduct.textContent = totalPriceValue

}


// Update count & price Product 
function basketProductMinus (elem,basketProductId,basketProductValue) {

     elem.parentNode.querySelector('input[type=number]').stepDown()

     userBasketCart.forEach(basketProduct => {

        if(basketProduct.id === basketProductId){

            if(basketProductValue === '0'){
                basketProduct.count = Number(basketProductValue) 
            }else{
                basketProduct.count = Number(basketProductValue) -1
            }

        }

    })


    // Update Number Value Product
    let getLocalStorageBasket = JSON.parse(localStorage.getItem("basket"));

    if(getLocalStorageBasket !== null){
        setInLocalStorage("basket",JSON.stringify(userBasketCart)) 
    }

    totalPrice(userBasketCart)
}


// Update count & price Product 
function basketProductPlus (elem,basketProductId,basketProductValue) {

    elem.parentNode.querySelector('input[type=number]').stepUp()

    userBasketCart.forEach(basketProduct => {

        if(basketProduct.id === basketProductId){

            if(basketProductValue === '10'){
                basketProduct.count = Number(basketProductValue) 
            }else{
                basketProduct.count = Number(basketProductValue) + 1
            }

        }

    })

    // Update Number Value Product
    let getLocalStorageBasket = JSON.parse(localStorage.getItem("basket"));

    if(getLocalStorageBasket !== null){
        setInLocalStorage("basket",JSON.stringify(userBasketCart)) 
    }

    totalPrice(userBasketCart)
}


// dom loaded 
window.addEventListener("load", () =>  {
    let getLocalStorageTheme = localStorage.getItem("Theme");
    let getLocalStorageBasket = JSON.parse(localStorage.getItem("basket"));

    if(getLocalStorageBasket !== null){
        userBasketCart = getLocalStorageBasket
        totalPrice(userBasketCart)
    }

    if(getLocalStorageTheme === 'dark-theme'){
     document.documentElement.classList.add("dark-theme");

    }else{
     document.documentElement.classList.add("light-theme");
    }
    generateProductBasket(getLocalStorageBasket)
    console.log("getLocalStorageBasket: ",getLocalStorageBasket);

})


//Set Events
themeBtn.addEventListener('click',themeHandler);
userBasket.addEventListener("click", userBasketShow);
overlayContainer.addEventListener("click",overlayHandler);
basketModalClose.addEventListener("click",basketModalCloseHandler);
basketModalClear.addEventListener("click", basketModalClearHandler);
basketModalConfirm.addEventListener("click", basketModalConfirmHandler);