//---------------  Arr of object end

//------------Fetch by Api

async function fetchData() {
  try {
    let url = await fetch("http://localhost:2345/product");

    let data = await url.json();

    console.log(data);

    showData(data);
  } catch (err) {
    console.log("err:", err);
  }
}

//------------------------------------------------------
let right = document.getElementById("right");
let itemsId;

function showData(arr) {
  right.innerHTML = "";
  arr.forEach(function (item) {
    var main = document.createElement("div");
    main.setAttribute("id", "main");

    var image = document.createElement("img");
    image.setAttribute("class", "prodImage");
    image.setAttribute("src", item.img);

    var title = document.createElement("h4", "div");
    title.setAttribute("class", "prodData");
    title.innerHTML = item.name;

    var rate = document.createElement("div");
    rate.setAttribute("class", "rate");
    rate.innerHTML = `<span>${item.rating}★</span>`;

    var text1 = document.createElement("div");
    text1.innerHTML = `<h5 class="review">Rating & Review</h5>`;

    var d1 = document.createElement("li");
    d1.setAttribute("class", "dots");
    d1.innerHTML = item.d1;

    var d2 = document.createElement("li");
    d2.setAttribute("class", "dots");
    d2.innerHTML = item.d2;

    var d3 = document.createElement("li");
    d3.setAttribute("class", "dots");
    d3.innerHTML = item.d3;

    var d4 = document.createElement("li");
    d4.setAttribute("class", "dots");
    d4.innerHTML = item.d4;

    var d5 = document.createElement("li");
    d5.setAttribute("class", "dots");
    d5.innerHTML = item.d5;

    var d6 = document.createElement("li");
    d6.setAttribute("class", "dots");
    d6.innerHTML = item.d6;

    var price = document.createElement("h2");
    price.setAttribute("class", "priceTag");
    price.innerHTML = "₹" + item.price;

    var img1 = document.createElement("img");
    img1.setAttribute("class", "assure");
    img1.src =
      "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png";

    price.append(img1);

    title.append(rate, text1, d1, d2, d3, d4, d5, d6);

    main.append(image, title, price);

    right.append(main);

    // Add Event listtner to main div

    main.addEventListener("click", function () {
      localStorage.setItem("itemsId", JSON.stringify(item.id));
      window.location.href = "../Gopala/itemDetail.html";
    });
  });
}

fetchData();

showData(data);

//---------------------------------------------------------------

// Short DAta
//let btn1 = document.querySelector(".low-to-high");
//let btn2 = document.querySelector(".high-to-low");

// let btn3 = document.querySelector(".above20");
// let btn4 = document.querySelector(".above30");
//  let btn5 = document.querySelector(".rate4");
//  let btn6 = document.querySelector(".rate3");

//----------------------------------- Price Low to High

async function lth(price) {
  try {
    let url = await fetch(`http://localhost:2345/product?filter=${price}`);

    let data = await url.json();

    // console.log(data);

    showData(data);
  } catch (err) {
    console.log("err:", err);
  }
  // console.log("here");
}

//----------------------------------- Coustom ratings

async function rating(num) {
  try {
    let url = await fetch(`http://localhost:2345/product?rating=${num}`);

    let data = await url.json();

    //console.log(data);

    showData(data);
  } catch (err) {
    console.log("err:", err);
  }
}

//-----------------------------------Price above 30k and 60k

async function coustom(el) {
  try {
    let url = await fetch(`http://localhost:2345/product?coustom=${el}`);

    let data = await url.json();

    //console.log(data);

    showData(data);
  } catch (err) {
    console.log("err:", err);
  }
  console.log(el);
}

//-----------------------------------  High to Low
// btn2.addEventListener("click", htl);

// function htl() {
//   let soreted_htl = data.sort(function (a, b) {
//     return b.price - a.price;
//   });
//   showData(soreted_htl);
// }

// //------------------------------------ Filter the data
// btn3.addEventListener("click", above20);

// function above20() {

//   console.log("here");
// }

// btn4.addEventListener("click", above30);

// function above30() {
//   let abovethirty = data.filter(function (item) {
//     return item.price < 30000;

//   });
//   showData(abovethirty);
// }
// //--------------------------------------------
// btn5.addEventListener("click", rate4);

// function rate4() {
//   console.log("hete")

// }

// btn6.addEventListener("click", rate3);

// function rate3() {
//   console.log("hete");
// }
