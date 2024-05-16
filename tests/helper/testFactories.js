/* eslint-disable import/prefer-default-export */
import LikeButtonPresenter from "../../src/scripts/utils/like-button";
import FAVORITE_IDB from "../../src/scripts/data/favorite-idb";

const LikeButton = async (restaurant) => {
  await LikeButtonPresenter.init({
    likeButtonContainer: document.querySelector("#likeButtonContainer"),
    favoriteRestaurants: FAVORITE_IDB,
    restaurant,
  });
};

export { LikeButton };
