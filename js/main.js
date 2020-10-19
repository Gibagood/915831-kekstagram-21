'use strict';

(function main() {
  const NAMES = [`Ozzy`, `Billy`, `Jimmy`, `Paul`, `John`, `Till`, `James`, `Flea`];
  const QUANTITY_IMG = 25;
  const MESSAGE = [`Всё отлично!`, `В целом всё неплохо. Но не всё.`, `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`, `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`, `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`, `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`];
  const MIN_LIKES = 15;
  const MAX_LIKES = 200;
  const MIN_COMMENTS = 1;
  const MAX_COMMENTS = 5;
  const PHOTO = 1;
  const bigPicture = document.querySelector(`.big-picture`);
  const bigPictureImg = bigPicture.querySelector(`.big-picture__img`);
  const socialComments = bigPicture.querySelector(`.social__comments`);
  const commentsCount = bigPicture.querySelector(`.comments-count`);
  const socialCommentsCount = bigPicture.querySelector(`.social__comment-count`);
  const commentsLoader = bigPicture.querySelector(`.comments-loader`);
  const body = document.querySelector(`body`);
  const SIZE_AVATAR = 35;
  bigPicture.classList.remove(`hidden`);
  socialCommentsCount.classList.add(`hidden`);
  commentsLoader.classList.add(`hidden`);
  body.classList.add(`modal-open`);

  const picturesList = document.querySelector(`.pictures`);
  const pictureTemplate = document.querySelector(`#picture`)
    .content
    .querySelector(`.picture`);

  const getRandomItem = function (array) {
    const randomNum = Math.floor(Math.random() * array.length);
    const randomNumIndex = array[randomNum];
    return randomNumIndex;
  };

  const getRandomNumber = function (min, max) {
    const randomNum = Math.floor(min + Math.random() * (max + 1 - min));
    return randomNum;
  };

  const getCommentArray = function () {
    const newComments = [];
    const quantityComments = getRandomNumber(MIN_COMMENTS, MAX_COMMENTS);
    for (let i = 0; i < quantityComments; i += 1) {
      newComments.push({
        name: getRandomItem(NAMES),
        avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
        message: getRandomItem(MESSAGE),
      });
    }
    return newComments;
  };

  const getPosts = function (item) {
    const post = {
      url: `photos/${item}.jpg`,
      description: `описание фотографии`,
      likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: getCommentArray().length,
    };
    return post;
  };

  const getRenderPicture = function (item) {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector(`.picture__img`).src = getPosts(item).url;
    pictureElement.querySelector(`.picture__comments`).textContent = getPosts(item).comments;
    pictureElement.querySelector(`.picture__likes`).textContent = getPosts(item).likes;
    return pictureElement;
  };

  const getComment = function () {
    const newComment = document.createElement(`li`);
    newComment.classList.add(`social__comment`);
    const newAvatar = document.createElement(`img`);
    newComment.appendChild(newAvatar);
    newAvatar.classList.add(`social__picture`);
    const newText = document.createElement(`p`);
    newComment.appendChild(newText);
    newText.classList.add(`social__text`);

    newText.textContent = getCommentArray()[PHOTO].message;
    newAvatar.src = getCommentArray()[PHOTO].avatar;
    newAvatar.alt = getCommentArray()[PHOTO].name;
    newAvatar.width = SIZE_AVATAR;
    newAvatar.height = SIZE_AVATAR;
    socialComments.appendChild(newComment);
    return newComment;
  };

  const getBigPicture = function (item) {
    bigPictureImg.querySelector(`img`).src = getPosts(item).url;
    bigPicture.querySelector(`.likes-count`).textContent = getPosts(item).likes;
    commentsCount.textContent = getPosts(item).comments;
    bigPicture.querySelector(`.social__caption`).textContent = getPosts(item).description;

    for (let i = 1; i <= commentsCount.textContent; i += 1) {
      getComment();
    }
  };

  const fragment = document.createDocumentFragment();
  for (let i = 1; i <= QUANTITY_IMG; i += 1) {
    fragment.appendChild(getRenderPicture(i));
  }
  picturesList.appendChild(fragment);
  getBigPicture(PHOTO);
}());
