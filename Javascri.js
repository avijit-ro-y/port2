const loadallproduct = () =>{
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
            .then(res=>res.json())
            .then(data=>displayproduct(data.drinks))
};



const displayproduct=(products)=>{
    const productcontainer=document.getElementById("product_container");

    products.forEach((product) => {
        const div=document.createElement("div");
        div.classList.add("card");
        div.innerHTML =  ` 
        <img class="card-img" src="${product.strDrinkThumb}" alt="${product.strDrink}" />
        <h5>Drink name : ${product.strDrink}</h5>
        <h5>Drink Catagory : ${product.strCategory}</h5>
        <p>Instruction : ${product.strInstructions ? product.strInstructions.slice(0, 14) : ''}</p>
        <button>Details</button>
        <button onclick='handeladdtocart("${product.strDrink}", "${product.idDrink}")'>Add to cart</button>
        ` ;
        productcontainer.appendChild(div);
    });
};

const searchDrinks = () => {
    const query = document.getElementById("searchInput").value.trim();
    const container = document.getElementById("product_container");
    container.innerHTML = "";

    if (query === "") {
        container.innerHTML = "<h3>Please enter a search term.</h3>";
        return;
    }

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => {
            if (!data.drinks) {
                container.innerHTML = "<h3>No drinks found.</h3>";
                return;
            }
            displayproduct(data.drinks);
        })
        .catch(err => {
            console.error("Error:", err);
            container.innerHTML = "<h3>Something went wrong. Try again later.</h3>";
        });
};


let cartCount = 0;

const handeladdtocart = (title,price) =>{
    if (cartCount >= 7) {
        alert("You cannot add more than 7 drinks to the cart.");
        return;
    }
    const container=document.getElementById("cart_main_container")
    const div=document.createElement("div")
    div.innerHTML =  ` 
        <p>${title}</p>
        ` ;
    container.appendChild(div);
    cartCount++;
    document.getElementById("cart_count").innerText = cartCount;
};

loadallproduct();