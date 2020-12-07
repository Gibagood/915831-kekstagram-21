'use strict';

(function () {
  let picturesLoad = [];
  const picturesList = document.querySelector(`.pictures`);
  const imgFilters = document.querySelector(`.img-filters`);
  const imgFiltersButtons = imgFilters.querySelectorAll(`.img-filters__button`);
  const pictureTemplate = document.querySelector(`#picture`)
    .content
    .querySelector(`.picture`);

  const getPosts = function (item) {
    const post = {
      url: item.url,
      description: item.description,
      likes: item.likes,
      comments: item.comments,
    };
    return post;
  };

  const getRenderPicture = function (item, index) {
    const post = getPosts(item);
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector(`.picture__img`).src = post.url;
    pictureElement.querySelector(`.picture__comments`).textContent = post.comments.length - 1;
    pictureElement.querySelector(`.picture__likes`).textContent = post.likes;
    pictureElement.id = index + 1;
    return pictureElement;
  };

  const clickOnFilter = function (evt) {
    evt.preventDefault();
    if (evt.target.matches(`#filter-random`)) {
      window.util.getRandomItem(picturesLoad);
    } else if (evt.target.matches(`#filter-discussed`)) {

    } else {

    }
  };

  const filterPictures = function (arrPictures) {
    let j;
    let temp;
    for (let i = arrPictures.length - 1; i >= 0; i--) {
      j = window.util.getRandomNumber(0, arrPictures.length - 1);
      temp = arrPictures[j];
      arrPictures[j] = arrPictures[i];
      arrPictures[i] = temp;
    }
    return arrPictures;
  };

  const successHandler = function (img) {
    img.forEach(function (item) {
      picturesLoad.push(item);
    });
    const fragment = document.createDocumentFragment();
    filterPictures(picturesLoad);
    picturesLoad.forEach(function (item, index) {
      fragment.appendChild(getRenderPicture(item, index));
    });
    picturesList.appendChild(fragment);
    imgFilters.classList.remove(`img-filters--inactive`);
  };

  const createErrorMessage = function (message) {
    let node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = message;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const errorHandler = function (errorMessage) {
    createErrorMessage(errorMessage);
  };

  window.load(successHandler, errorHandler);
  /* imgFiltersButtons.addEventListener(`click`, clickOnFilter); */

  window.gallery = {
    getPosts,
    picturesList,
    picturesLoad
  };
})();
