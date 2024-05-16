/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable no-undef */
import FavoriteIDB from "../src/scripts/data/favorite-idb";
import * as Test from "./helper/testFactories";

describe("Restaurant Liking and Unliking", () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it("should display a like button when a restaurant is not yet liked", async () => {
    await Test.LikeButton({ id: 1 });

    expect(
      document.querySelector('[aria-label="like restaurants"]')
    ).toBeTruthy();
  });

  it("should not display an unlike button when a restaurant is not yet liked", async () => {
    await Test.LikeButton({ id: 1 });

    expect(
      document.querySelector('[aria-label="unike restaurants"]')
    ).toBeFalsy();
  });

  it("should be able to like a restaurant", async () => {
    await Test.LikeButton({ id: 1 });

    document.querySelector("#likeButton").dispatchEvent(new Event("click"));
    const restaurant = await FavoriteIDB.getData(1);

    expect(restaurant).toEqual({ id: 1 });

    FavoriteIDB.deleteData(1);
  });

  it("should not allow adding a restaurant again if it's already liked", async () => {
    await Test.LikeButton({ id: 1 });

    await FavoriteIDB.putData({ id: 1 });
    document.querySelector("#likeButton").dispatchEvent(new Event("click"));

    expect(await FavoriteIDB.getAllData()).toEqual([{ id: 1 }]);

    FavoriteIDB.deleteData(1);
  });

  it("should not add a restaurant if it doesn't have an ID", async () => {
    await Test.LikeButton({});
    document.querySelector("#likeButton").dispatchEvent(new Event("click"));

    expect(await FavoriteIDB.getAllData()).toEqual([]);
  });
});
