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

/*   const getPosts = function (item) {

    console.log(item.url);
    const post = {
      url: item.url,
      description: item.description,
      likes: item.likes,
      comments: item.comments,
      id: 1,
    };
    return post;
  }; */

  const getRenderPicture = function (item) {
      console.log(item[1]);
    /* const post = getPosts(item); */
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector(`.picture__img`).src = item[1].url;
    pictureElement.querySelector(`.picture__comments`).textContent = item[1].comments.length;
    pictureElement.querySelector(`.picture__likes`).textContent = item[1].likes;
    /* pictureElement.id = item.id; */
    return pictureElement;
  };

  window.load(function (img) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i <= QUANTITY_IMG; i += 1) {
      fragment.appendChild(getRenderPicture(img));
    }
    picturesList.appendChild(fragment);
  }, function () {});


  window.gallery = {
    getCommentArray,
    /* getPosts, */
    picturesList,
  };
})();
