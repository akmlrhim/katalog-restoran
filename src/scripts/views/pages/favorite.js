import FAVORITE_IDB from "../../data/favorite-idb";
import { restaurantList } from "../template/rest-template";

const Favorite = {
  async render() {
    return `
    <main id="content">
        <section class="content">
        <div class="latest-list">
            <div id="list" class="list"></div>
            <h1 class="restaurant-empty"></h1>
          </div>
        </section>
      </main>
    `;
  },

  async afterRender() {
    const restaurants = await FAVORITE_IDB.getAllData();
    const restaurantContainer = document.getElementById("list");
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
