import RestaurantSource from "../../data/db-source";
import { restaurantList } from "../template/rest-template";

const Restaurant = {
  async render() {
    return ` 
    <main id="content" class="main-resto-box">
    <section class="content">
      <h2 tabindex="0" class="explore-restaurant-label">
        Find Your Restaurant Here
      </h2>
      <div id="main-resto-list" class="list-resto"></div>
    </section>
  </main>
  `;
  },

  async afterRender() {
    const restaurants = await RestaurantSource.restaurantList();

    if (restaurants && Array.isArray(restaurants)) {
      const restaurantContainer = document.querySelector(".list-resto");

      restaurants.forEach((restaurant) => {
        restaurantContainer.innerHTML += restaurantList(restaurant);
      });
    } else {
      console.error("Failed to fetch restaurants data.");
    }
  },
};

export default Restaurant;
