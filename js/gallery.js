'use strict';

(function () {
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
    pictureElement.querySelector(`.picture__comments`).textContent = post.comments.length;
    pictureElement.querySelector(`.picture__likes`).textContent = post.likes;
    pictureElement.id = index + 1;
    return pictureElement;
  };

  window.load(function (img) {
    const fragment = document.createDocumentFragment();
    img.forEach(function (item, index) {
      fragment.appendChild(getRenderPicture(item, index));
    });
    picturesList.appendChild(fragment);
  }, function () {});


  window.gallery = {
    getCommentArray,
    getPosts,
    picturesList,
  };
})();
