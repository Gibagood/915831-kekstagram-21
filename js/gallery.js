'use strict';

(function () {
  let picturesLoad = [];
  const picturesList = document.querySelector(`.pictures`);
  const imgFilters = document.querySelector(`.img-filters`);
  const imgFiltersButtons = imgFilters.querySelector(`.img-filters__form`);
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

  const filterPictures = function (evt, arrPictures) {
    if (evt.target.matches(`#filter-random`)) {
      let j;
      let temp;
      for (let i = arrPictures.length - 1; i >= 0; i--) {
        j = window.util.getRandomNumber(0, arrPictures.length - 1);
        temp = arrPictures[j];
        arrPictures[j] = arrPictures[i];
        arrPictures[i] = temp;
      }
      render(arrPictures);
    } else if (evt.target.matches(`#filter-discussed`)) {
      arrPictures.sort((a, b) => a.comments.length < b.comments.length ? 1 : -1);
      render(arrPictures);
    } else if (evt.target.matches(`#filter-default`)) {
      arrPictures.sort((a, b) => a.id - b.id);
      render(arrPictures);
    }
  };

  const successHandler = function (img) {
    let i = 0;
    img.forEach(function (item) {
      item.id = i;
      picturesLoad.push(item);
      i += 1;
    });
    render(picturesLoad);
  };

  const render = function (newPicturesLoad) {
    while (picturesList.querySelector(`.picture`)) {
      picturesList.removeChild(picturesList.querySelector(`.picture`));
    }
    const fragment = document.createDocumentFragment();
    newPicturesLoad.forEach(function (item, index) {
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
  imgFiltersButtons.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    filterPictures(evt, picturesLoad);
  });

  window.gallery = {
    getPosts,
    picturesList,
    picturesLoad
  };
})();
