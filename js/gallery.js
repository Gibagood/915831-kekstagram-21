'use strict';

(function () {
  const QUANTITY_IMG = 25;
  const MIN_LIKES = 15;
  const MAX_LIKES = 200;
  const NAMES = [`Ozzy`, `Billy`, `Jimmy`, `Paul`, `John`, `Till`, `James`, `Flea`];
  const MESSAGES = [`Всё отлично!`, `В целом всё неплохо. Но не всё.`, `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`, `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`, `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`, `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`];
  const MIN_COMMENTS = 1;
  const MAX_COMMENTS = 5;
  const picturesList = document.querySelector(`.pictures`);
  const pictureTemplate = document.querySelector(`#picture`)
    .content
    .querySelector(`.picture`);

  const getCommentArray = function () {
    const newComments = [];
    const quantityComments = window.data.getRandomNumber(MIN_COMMENTS, MAX_COMMENTS);
    for (let i = 0; i < quantityComments; i += 1) {
      newComments.push({
        name: window.data.getRandomItem(NAMES),
        avatar: `img/avatar-${window.data.getRandomNumber(1, 6)}.svg`,
        message: window.data.getRandomItem(MESSAGES),
      });
    }
    return newComments;
  };

  const getPosts = function (item) {
    const post = {
      url: `photos/${item}.jpg`,
      description: `описание фотографии`,
      likes: window.data.getRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: getCommentArray(),
      id: item,
    };
    return post;
  };

  const getRenderPicture = function (item) {
    const post = getPosts(item);
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector(`.picture__img`).src = post.url;
    pictureElement.querySelector(`.picture__comments`).textContent = post.comments.length;
    pictureElement.querySelector(`.picture__likes`).textContent = post.likes;
    pictureElement.id = post.id;
    return pictureElement;
  };

  const fragment = document.createDocumentFragment();
  for (let i = 1; i <= QUANTITY_IMG; i += 1) {
    fragment.appendChild(getRenderPicture(i));
  }
  picturesList.appendChild(fragment);

  window.gallery = {
    getCommentArray,
    getPosts,
    picturesList,
  };
})();
