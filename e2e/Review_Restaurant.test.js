/* eslint-disable max-len */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
const assert = require("assert");

Feature("Review Restaurant");

Before(({ I }) => {
  I.amOnPage("/");
});

Scenario("Post resto review", async ({ I }) => {
  const reviewText = "teks review";

  I.waitForElement(".resto-item", 10);
  I.seeElement(".resto-item");

  I.click(locate(".resto-item").first());

  I.seeElement(".form-review form");
  I.fillField("inputName", "nama review");
  I.fillField("inputReview", reviewText);
  I.click("#submit-review");

  await I.wait(2);

  const lastReview = locate(".body-review").last();
  const lastReviewText = await I.grabTextFrom(lastReview);
  const trimmedLastReviewText = lastReviewText.trim();
  assert.strictEqual(
    reviewText,
    trimmedLastReviewText,
    `Expected review text '${reviewText}' but got '${trimmedLastReviewText}'`
  );
});
