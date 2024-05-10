import { LikeButton, UnlikeButton } from "../views/template/rest-template";

const Like = {
  async init({ likeButtonContainer, favoriteRestaurants, restaurant }) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = restaurant;
    this._favoriteRestaurants = favoriteRestaurants;
    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;

    if (await this._isRestaurantExist(id)) {
      this._renderLikedButton();
    } else {
      this._renderLikeButton();
    }
  },

  async _isRestaurantExist(id) {
    const restaurant = await this._favoriteRestaurants.getData(id);
    return !!restaurant;
  },

  _renderLikeButton() {
    this._likeButtonContainer.innerHTML = LikeButton();

    const likeButton = document.getElementById("likeButton");
    likeButton.addEventListener("click", async () => {
      await this._favoriteRestaurants.putData(this._restaurant);
      this._renderButton();
    });
  },

  _renderLikedButton() {
    this._likeButtonContainer.innerHTML = UnlikeButton();

    const likedButton = document.getElementById("likeButton");
    likedButton.addEventListener("click", async () => {
      await this._favoriteRestaurants.deleteData(this._restaurant.id);
      this._renderButton();
    });
  },
};

export default Like;
