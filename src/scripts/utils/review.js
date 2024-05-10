import RestaurantSource from "../data/db-source";
import UrlParser from "../routes/url-pars";

const Review = async () => {
  const url = UrlParser.parseActiveUrlWithoutCombiner();
  const inputReviewName = document.getElementById("inputName");
  const inputReview = document.getElementById("inputReview");
  const reviewContainer = document.querySelector(".detail-review");

  const dataInput = {
    id: url.id,
    name: inputReviewName.value,
    review: inputReview.value,
  };

  const newReview = `
    <div class="detail-review-item">
      <div class="header-review">
        <p class="name-review"><i title="restaurant" style="font-size:1.3em; padding-right:10px;"></i>${dataInput.name}</p>
      </div>
      <div class="body-review">
        ${dataInput.review}
      </div>
    </div>
  `;

  await RestaurantSource.postReview(dataInput);
  reviewContainer.innerHTML += newReview;
  inputReviewName.value = "";
  inputReview.value = "";
};

export default Review;
