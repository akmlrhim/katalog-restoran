import RestaurantSource from "../../data/db-source";
import urlParser from "../../routes/url-pars";
import { restaurantDetail } from "../template/rest-template";
import FAVORITE_IDB from "../../data/favorite-idb";
import Review from "../../utils/review";
import Like from "../../utils/like-button";

const Detail = {
  async render() {
    return `
    <div tabindex="0" class="main">
      <section id="detail-rest"></section>
      <div class="like" id="likeButtonContainer"></div>
    </div>

  <div class="form-review">
	<form>
	<h1>How About This Restaurant ?</h1>
            <div class="mb-3">
              <label for="inputName" class="form-label">Name</label>
              <input name="inputName" type="text" class="form-control" id="inputName">
            </div>
            <div class="mb-3">
              <label for="inputReview" class="form-label">Review</label>
              <textarea name="inputReview" type="text" class="form-control" id="inputReview"></textarea>
            </div>
            <button id="submit-review" type="submit" class="btn">Submit</button>
          </form>
        </div>
    </div>
      `;
  },

  async afterRender() {
    const url = urlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantSource.restaurantDetail(url.id);
    const restaurantContainer = document.querySelector("#detail-rest");
    restaurantContainer.innerHTML = restaurantDetail(restaurant.restaurant);

    Like.init({
      likeButtonContainer: document.querySelector("#likeButtonContainer"),
      favoriteRestaurants: FAVORITE_IDB,
      restaurant: {
        id: restaurant.restaurant.id,
        name: restaurant.restaurant.name,
        city: restaurant.restaurant.city,
        pictureId: restaurant.restaurant.pictureId,
        description: restaurant.restaurant.description,
        rating: restaurant.restaurant.rating,
      },
    });

    const submitReview = document.getElementById("submit-review");
    submitReview.addEventListener("click", (event) => {
      event.preventDefault();
      Review();
    });
  },
};

export default Detail;
