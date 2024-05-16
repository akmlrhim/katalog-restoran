import FAVORITE_IDB from "../../data/favorite-idb";
import { restaurantList } from "../template/rest-template";

const Favorite = {
  async render() {
    return /* html */ `
      <main tabindex="0" id="content" class="main-resto-box">
        <section class="content">
            <h2 class="restaurant-empty"></h2>
            <div id="main-resto-list" class="list-resto"></div>
        </section>
      </main>
    `;
  },

  async afterRender() {
    const restaurants = await FAVORITE_IDB.getAllData();
    const restaurantContainer = document.getElementById("main-resto-list");
    const empty = document.querySelector(".restaurant-empty");
    if (restaurants.length === 0) {
      empty.innerHTML = `
      <h3>Tidak ada favorite restaurant yang ditampilkan</h3>
      `;
    }

    restaurants.forEach((restaurant) => {
      restaurantContainer.innerHTML += restaurantList(restaurant);
    });
  },
};

export default Favorite;
