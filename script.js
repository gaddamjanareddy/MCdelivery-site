const btn = document.getElementById("dropdownBtn");
const menu = document.getElementById("dropdownMenu");
const icon = document.getElementById("arrowIcon");

document.addEventListener("click", () => {
  if (window.innerWidth > 970) return;
  menu.style.display = "none";
});

btn.addEventListener("click", () => {
  const isOpen = menu.style.display === "block";
  menu.style.display = isOpen ? "none" : "block";
  icon.className = isOpen ? "fa-solid fa-angle-down" : "fa-solid fa-angle-up";
});




// document.addEventListener("DOMContentLoaded", function () {
//   const slides = document.querySelectorAll(".slide");
//   const buttons = document.querySelectorAll(".slide-btn");

//   buttons.forEach((btn, index) => {
//     btn.addEventListener("click", () => {
//       // Hide all slides
//       slides.forEach(slide => {
//         slide.style.display = "none";
//       });

//       // Show the clicked slide
//       slides[index].style.display = "block";
//     });
//   });

//   // Optional: show the first slide by default
//   slides.forEach((slide, index) => {
//     slide.style.display = index === 0 ? "block" : "none";
    
//   });
// });





// creating cards
let container = document.getElementById("food-content-middle");
let Allproducts = [];



fetch("items.json")
  .then((response) => response.json())
  .then((data) => {
    Allproducts = data;
    // console.log(Allproducts);
  })
  .catch((error) => {
    console.error("Error loading JSON:", error);
  });


//search bar
const searchBar = document.getElementById('searchbar');

searchBar.addEventListener('input', () => {
    const searchTerm = searchBar.value.toLowerCase();
    const allCards = document.querySelectorAll('.card-container');

    allCards.forEach(card => {
        const title = card.dataset.title || '';
        const description = card.dataset.description || '';

        const matches = title.includes(searchTerm) || description.includes(searchTerm);
        card.style.display = matches ? 'block' : 'none';
    });
});






// creating cards
let foodtype = document.querySelectorAll(".food-type");
let heading = document.getElementById("heading");
foodtype.forEach((food, index) => {
  food.addEventListener("click", () => {
    document.getElementById("cards-container").innerHTML = "";

    document.getElementById("veg-btn").style.display = "block";
    document.getElementById("non-veg-btn").style.display = "block";

    Allproducts[index].map((product, index) => {
      console.log("product", product);
      if (index == 0) {
        console.log("heading", heading);
        document.getElementById("heading").innerHTML = `${product.headings}`;
      } else {
        product.items.forEach((p) => {
          console.log(p);
          return (document.getElementById("cards-container").innerHTML += `
  <div class="card-container" 
       data-title="${p?.title.toLowerCase()}" 
       data-description="${p?.description.toLowerCase()}" 
       id="card-${p?.id}">

               
               <div class="card-img-container" id="card-img-container"> 
                <img src= ${p?.image} alt= "" id="card-img"/>
                </div>
        
                <div class="card-text" id="card-text">
                  <h4 class="food-title" id="food-title">${p?.title} </h4>
                  <p class="food-description" id="food-description">${p?.description} </p>
                  <h2 id="price">${p?.price} </h2>
                  
                  <button class="add-btn" id="add-btn${p.id}" onclick="addToCart('${p.id}', '${p.image}','${p.title}', '${p.price}')" > ${countArr.find((ele) => ele.id == p.id) ? addToCart('${p.id}', '${p.image}','${p.title}', '${p.price}') : 
                  p?.button} </button>
                </div>
              </div>`);
        });
      }
    });
  });
});

function addToCart(...card) {
  let btn = document.getElementById(`add-btn${card[0]}`);
  btn.removeAttribute("onclick");
  btn.innerHTML = `<div class="amount-of-items" style="display: flex; justify-content: center; width: 100%">
          <button class="food-amount-btn" id="remove-btn" onclick= "decrease(${card[0]})">-</button>
          <h4 class="number-of-items" id="number-of-item${card[0]}">1</h4>
          <button class="food-amount-btn" id="plus-btn" onclick= "increase(${card[0]})">+</button>
         </div>`;

  console.log(card);
  let cart = document.getElementById("addtocart-content");
  let emptycart = document.getElementById("empty-cart-content");
  if (card.length > 0) {
    emptycart.innerHTML = "";
    cart.innerHTML += `<div class= "cart-container" id="${card[0]}">
               
      <div class="cart-top">
         
        <div class="cart-img-container" id="cart-img-container"> 
         <img src= "${card[1]}" alt= "" id="cart-img"/>
         </div>
 
         <div class="cart-text" id="cart-text">
           <h4 class="food-cart-title" id="food-cart-title">${card[2]}</h4>
           <h3 id="cart-price">${card[3]} </h3>
         </div>

      </div> 

      <div class="cart-bottom">  
        
        <div class="amount-of-items">
          <button class="food-amount-btn" id="remove-btn" onclick= "decrease(${card[0]})">-</button>
          <h4 class="number-of-items" id="number-of-items${card[0]}">1</h4>
          <button class="food-amount-btn" id="plus-btn" onclick= "increase(${card[0]})">+</button>
         </div>

      </div>    
         
       </div>`;
  }
}

// Adding items to the cart

let countArr = [];
// let count = 1;

function increase(id) {
  let obj = {
    id: id,
    count: 2,
  };
  let idx = countArr.findIndex((ele) => ele.id == id);

  if (idx === -1) {
    countArr.push(obj);
  } else {
    countArr[idx] = {
      ...countArr[idx],
      count: ++countArr[idx].count,
    };
  }

  console.log(countArr);

  let idxVal = countArr.findIndex((ele) => ele.id == id);
  document.getElementById(`number-of-items${id}`).textContent =
    countArr[idxVal].count;
  document.getElementById(`number-of-item${id}`).textContent =
    countArr[idxVal].count;
}

// function decrease(id) {
  
//   let idx = countArr.findIndex((ele) => ele.id == id);

//   if (idx === -1) {
//     // countArr.push(obj);
//   } else {
//     countArr[idx] = {
//       ...countArr[idx],
//       count: --countArr[idx].count,
//     };
//   }

//   console.log(countArr);

//   let idxVal = countArr.findIndex((ele) => ele.id == id);
//   document.getElementById(`number-of-items${id}`).textContent =
//     countArr[idxVal].count;
//   document.getElementById(`number-of-item${id}`).textContent =
//     countArr[idxVal].count;
// }


function decrease(id) {
  let idx = countArr.findIndex((ele) => ele.id == id);
  if (idx === -1) return;

  // Decrease count
  countArr[idx].count--;

  if (countArr[idx].count === 0) {
    // Remove item from cart display
    let cartItem = document.getElementById(id);
    if (cartItem) cartItem.remove();

    // Remove item from countArr
    countArr.splice(idx, 1);

    // Reset the "Add" button on product card
    const originalProduct = Allproducts.flatMap(group => group.items || []).find(p => p.id == id);
    if (originalProduct) {
      const btn = document.getElementById(`add-btn${id}`);
      if (btn) {
        btn.setAttribute("onclick", `addToCart('${originalProduct.id}', '${originalProduct.image}', '${originalProduct.title}', '${originalProduct.price}')`);
        btn.innerHTML = originalProduct.button;
      }
    }

  } else {
    // Update count display in both card and cart
    document.getElementById(`number-of-items${id}`).textContent = countArr[idx].count;
    document.getElementById(`number-of-item${id}`).textContent = countArr[idx].count;
  }

  console.log(countArr);
}



