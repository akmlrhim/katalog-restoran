/* eslint-disable quotes */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
import FavoriteIDB from "../src/scripts/data/favorite-idb";
import * as Test from "./helper/testFactories";

const addLikeButtonContainer = () => {
  document.body.innerHTML = '<div id="likeButtonContainer"></div>';
};

describe("Unliking A Restaurant", () => {
  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteIDB.putData({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteIDB.deleteData(1);
  });

  it("should display unlike widget when the restaurant has been liked", async () => {
    await Test.createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(
      document.querySelector('[aria-label="unlike restaurants"]')
    ).toBeTruthy();
  });

  it("should not display like widget when the restaurant has been liked", async () => {
    await Test.createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(
      document.querySelector('[aria-label="like restaurants"]')
    ).toBeFalsy();
  });

  it("should be able to remove liked restaurant from the list", async () => {
    await Test.createLikeButtonPresenterWithRestaurant({ id: 1 });

    document
      .querySelector('[aria-label="unlike restaurants"]')
      .dispatchEvent(new Event("click"));

    expect(await FavoriteIDB.getAllData()).toEqual([]);
  });

  it("should not throw error if the unliked restaurant is not in the list", async () => {
    await Test.createLikeButtonPresenterWithRestaurant({ id: 1 });

    await FavoriteIDB.deleteData(1);

    document
      .querySelector('[aria-label="unlike restaurants"]')
      .dispatchEvent(new Event("click"));

    expect(await FavoriteIDB.getAllData()).toEqual([]);
  });
});
