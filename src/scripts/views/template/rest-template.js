/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
import CONFIG from "../../globals/config";

const restaurantList = (restaurant) => `
<article tabindex="0" class="resto-item">
  <a href="/#/detail/${restaurant.id}">
    <img class="resto-item-image lazyload" data-src="${
      CONFIG.BASE_IMAGE_URL + restaurant.pictureId
    }" alt="Gambar ${restaurant.name}" tabindex="0"/>
      <p tabindex="0" class="resto-item-city" alt="kota restoran">Kota ${
        restaurant.city
      }
      </p>
      <p tabindex="0" class="resto-item-name" alt="nama restoran">${
        restaurant.name
      }</p>
      <span class="resto-item-rating" 
      ${restaurant.rating}">Rating : ${restaurant.rating}</span>
      <p class="resto-item-desc">${restaurant.description}</p>
  </a>
</article>
`;

const restaurantDetail = (restaurant) => `
<div class="detail">
  <div tabindex="0" class="container-info">
    <div class="img-container">
    <img class="lazyload resto-item-image-container" crossorigin="anonymous" src="${
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
  <button id="likeButton" aria-label="like restaurants" class="like">
  <i class="fa-regular fa-heart"></i>

  </button>
`;

const UnlikeButton = () => `
  <button id="likeButton" aria-label="unlike restaurants" class="like">
    <i class="fa-solid fa-heart"></i>
  </button>
`;
export { restaurantList, restaurantDetail, LikeButton, UnlikeButton };
