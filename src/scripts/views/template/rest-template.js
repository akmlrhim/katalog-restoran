/* eslint-disable comma-dangle */
/* eslint-disable indent */
import CONFIG from "../../globals/config";

const restaurantList = (restaurant) => {
  const { BASE_IMAGE_URL } = CONFIG;
  return `
    <div class="list-item">
        <img class="item-picture" src="${
          BASE_IMAGE_URL + restaurant.pictureId
        }" alt="${restaurant.name}" title="${restaurant.name}">
        <div class="city">Kota ${restaurant.city}</div>
        <div class="item-content">
            <p class="item-rating">
                Rating : 
                <a href="#" class="rating-value">${restaurant.rating}/5</a>
            </p>
            <h1 class="item-title"><a href="#">${restaurant.name}</a></h1>
            <article class="item-description" id="description">${restaurant.description.slice(
              0,
              200
            )}.....
						<a href="/#/detail/${restaurant.id}">Detail</a>
						</article>
        </div>
    </div>`;
};

const detailRestaurant = (restaurant) => {};
export { restaurantList, detailRestaurant };
