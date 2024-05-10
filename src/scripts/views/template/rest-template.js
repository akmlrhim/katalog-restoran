/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
import CONFIG from "../../globals/config";

const restaurantList = (restaurant) => `
    <div class="list-item">
        <img class="item-picture"  crossorigin="anonymous" src="${
          CONFIG.BASE_IMAGE_URL + restaurant.pictureId
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
						</article>
						<a href="/#/detail/${
              restaurant.id
            }" class="button-detail">Detail Selengkapnya</a>
        </div>
    </div>`;

const restaurantDetail = (restaurant) => `
<div class="detail">
  <div tabindex="0" class="container-info">
    <div class="img-container">
    <img class="resto-item_image-container" crossorigin="anonymous" src="${
      CONFIG.BASE_IMAGE_URL + restaurant.pictureId
    }" alt="Gambar ${restaurant.name}" tabindex="0"/>
    </div>
    <ul class="detail-info">
      <li class="resto-name">
        <i title="restaurant"></i>
        <p class="item-title">${restaurant.name}</p>
      </li>
    
      <li class="resto-address">
        <p class="item-address">Alamat: ${restaurant.address}, Kota ${
  restaurant.city
}</p>
      </li>
    
      <li class="resto-rating">
        <i title="ratings"></i>
        <p class="item-rating">&star; ${restaurant.rating}</p>
      </li>
      <h4> Description: </h4>
      <li><p class="detail-desc">${restaurant.description}</p></li>
    </ul>
  </div>
        
      <h2 tabindex="0" id="resto-detail-form-review-title"><span>List Menu</span></h2>
        <div class="restaurant-detail__menu-list">
          <div class="foods">
          <h3>Food</h3>
          </hr>
            <ul class="restaurant-detail-foods">
              ${restaurant.menus.foods
                .map(
                  (food) => `
              <li> ${food.name}</li>`
                )
                .join("")}
            </ul>
          </div>
          <div class="drinks">
          <h3>Drink</h3>
          </hr>
            <ul class="restaurant-detail-drinks">
              ${restaurant.menus.drinks
                .map(
                  (drink) => `
              <li> ${drink.name}</li>`
                )
                .join("")}
            </ul>
          </div>
        </div>
      <h2 tabindex="0" id="resto-detail-form-review-title"><span>Reviews</span></h2>
        <div tabindex="0" class="detail-review">
          ${restaurant.customerReviews
            .map(
              (review) => `
          <div class="detail-review-item">
            <div class="header-review">
              <p class="name-review">${review.name}</p>
            </div>
            <div class="body-review">
              ${review.review}
            </div>
          </div>
          `
            )
            .join("")}
        </div>
</div>
`;
const LikeButton = () => `
  <button id="likeButton" class="like">
  <i class="fa-regular fa-heart"></i>

  </button>
`;

const UnlikeButton = () => `
  <button id="likeButton" class="like">
    <i class="fa-solid fa-heart"></i>
  </button>
`;
export { restaurantList, restaurantDetail, LikeButton, UnlikeButton };
