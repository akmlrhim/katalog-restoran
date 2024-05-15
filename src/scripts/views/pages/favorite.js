import FAVORITE_IDB from "../../data/favorite-idb";
import { restaurantList } from "../template/rest-template";

const Favorite = {
  async render() {
    return `
      <a href="#content" class="skip-link">To Main Content</a>
      <main id="content">
        <section class="content">
          <div class="latest-list">
            <h1 style="font-size: 42px;">Your Favorite</h1>
            <div id="list-resto" class="list"></div>
            <h1 class="restaurant-empty"></h1>
          </div>
        </section>
      </main>
    `;
  },

  async afterRender() {
    const restaurants = await FAVORITE_IDB.getAllData();
    const restaurantContainer = document.getElementById("list-resto");
    const empty = document.querySelector(".restaurant-empty");

    if (restaurants.length === 0) {
      empty.innerHTML = `
        <h2>Tidak ada favorite restaurant yang ditampilkan</h2>
      `;
    }

    restaurants.forEach((restaurant) => {
      restaurantContainer.innerHTML += restaurantList(restaurant);
    });
  },
};

export default Favorite;
