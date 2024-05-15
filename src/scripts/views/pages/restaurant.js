import RestaurantSource from "../../data/db-source";
import { restaurantList } from "../template/rest-template";

const Restaurant = {
  async render() {
    return `<section class="content" id='content'>
      <div class="latest-list">
        <h1 style="font-size: 42px;">Find Your Restaurant</h1>
        <div class="list" id="list-resto"></div>
      </div>
    </section>`;
  },

  async afterRender() {
    const restaurants = await RestaurantSource.restaurantList();

    if (restaurants && Array.isArray(restaurants)) {
      const restaurantContainer = document.querySelector("#list-resto");

      restaurants.forEach((restaurant) => {
        restaurantContainer.innerHTML += restaurantList(restaurant);
      });
    } else {
      console.error("Failed to fetch restaurants data.");
    }
  },
};

export default Restaurant;
