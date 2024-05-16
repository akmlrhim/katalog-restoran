/* eslint-disable no-promise-executor-return */
/* eslint-disable comma-dangle */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
const assert = require("assert");

Feature("Liking Restaurants");

Before(({ I }) => {
  I.amOnPage("#/favorite");
});

async function likeRestaurant(I) {
  I.amOnPage("/#");

  await I.waitForElement(".resto-item-name", 10);
  I.seeElement(".resto-item-name");

  const firstRestaurant = locate(".resto-item-name").first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  await I.waitForElement("#likeButton", 5);
  I.seeElement("#likeButton");
  I.click("#likeButton");

  I.amOnPage("#/favorite");
  await I.waitForElement(".resto-item", 10);
  I.seeElement(".resto-item");

  const likedRestaurantName = await I.grabTextFrom(".resto-item-name");
  assert.strictEqual(firstRestaurantName, likedRestaurantName);

  I.seeElement(".resto-item-name");
}

async function unlikeRestaurant(I) {
  I.amOnPage("/#");

  await I.waitForElement(".resto-item-name", 10);
  I.seeElement(".resto-item-name");

  const firstRestaurant = locate(".resto-item-name").first();
  I.click(firstRestaurant);

  await I.waitForElement("#likeButton", 5);
  I.seeElement("#likeButton");
  I.click("#likeButton");

  await new Promise((resolve) => setTimeout(resolve, 1000));

  I.amOnPage("#/favorite");
  await I.waitForElement(".restaurant-empty", 10);
  I.see("Tidak ada favorite restaurant yang ditampilkan", ".restaurant-empty");
}

Scenario("liking one restaurant", async ({ I }) => {
  I.see("Tidak ada favorite restaurant yang ditampilkan", ".restaurant-empty");
  await likeRestaurant(I);
});

Scenario("unlike one restaurant", async ({ I }) => {
  I.see("Tidak ada favorite restaurant yang ditampilkan", ".restaurant-empty");
  await likeRestaurant(I);
  await unlikeRestaurant(I);
});
