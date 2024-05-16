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

describe("Removing Liked Restaurants", () => {
  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteIDB.putData({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteIDB.deleteData(1);
  });

  it("should display unlike button when a restaurant is already liked", async () => {
    await Test.LikeButton({ id: 1 });

    expect(
      document.querySelector('[aria-label="unlike restaurants"]')
    ).toBeTruthy();
  });

  it("should not display like button when a restaurant is already liked", async () => {
    await Test.LikeButton({ id: 1 });

    expect(
      document.querySelector('[aria-label="like restaurants"]')
    ).toBeFalsy();
  });

  it("should be able to remove a liked restaurant from the list", async () => {
    await Test.LikeButton({ id: 1 });

    document
      .querySelector('[aria-label="unlike restaurants"]')
      .dispatchEvent(new Event("click"));

    expect(await FavoriteIDB.getAllData()).toEqual([]);
  });

  it("should not throw an error if the unliked restaurant is not in the list", async () => {
    await Test.LikeButton({ id: 1 });

    await FavoriteIDB.deleteData(1);

    document
      .querySelector('[aria-label="unlike restaurants"]')
      .dispatchEvent(new Event("click"));

    expect(await FavoriteIDB.getAllData()).toEqual([]);
  });
});
