'use strict';

(function () {
  const picturesLoad = [];
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
  /*
  const clickOnFilter = function (evt) {
    evt.preventDefault();
    if (evt.target.matches(`#filter-random`)) {
      window.util.getRandomItem(arrPictures);
    } else if (evt.target.matches(`#filter-discussed`)) {

    } else {

    }
  };

  const filterPictures = function (item, index) {
    getRenderPicture(item, index);
  }; */

  window.load(function (img) {
    const fragment = document.createDocumentFragment();
    img.forEach(function (item, index) {
      fragment.appendChild(getRenderPicture(item, index));
      picturesLoad.push(item);
    });
    picturesList.appendChild(fragment);
    imgFilters.classList.remove(`img-filters--inactive`);
  }, function () {});

  /* imgFiltersButtons.addEventListener(`click`, clickOnFilter); */

  window.gallery = {
    getPosts,
    picturesList,
    picturesLoad
  };
})();
