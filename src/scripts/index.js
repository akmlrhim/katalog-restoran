import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.css";
import "../styles/fontawasome/fontawesome-free-6.5.1-web/css/all.min.css";
import data from "../public/data/DATA.json";

const listData = document.querySelector("#list");
let listRestaurant = "";
data.restaurants.forEach((row) => {
  listRestaurant +=
    /*html*/
    `<div class="list-item">
	<img class="item-picture" src="${row["pictureId"]}" alt="${
      row["name"]
    }" title="${row["name"]}">
	<div class="city">Kota ${row["city"]}</div>
	<div class="item-content">
			<p class="item_rating">
					Rating : 
					<a href="#" class="rating-value">${row["rating"]}</a>
			</p>
			<h1 class="item-title"><a href="#">${row["name"]}</a></h1>
			<div class="item-description">${row["description"].slice(0, 150)}...</div>
	</div>
</div>`;

  listData.innerHTML = listRestaurant;
});

const drawer = document.querySelector("#drawer-nav");
const menu = document.querySelector("#menu");
const jumbotron = document.querySelector(".jumbotron");
const main = document.querySelector("main");

menu.addEventListener("click", function (event) {
  drawer.classList.toggle("open");
  event.stopPropagation();
});

jumbotron.addEventListener("click", function () {
  drawer.classList.remove("open");
});

main.addEventListener("click", function () {
  drawer.classList.remove("open");
});

console.log("Hello Coders! :)");