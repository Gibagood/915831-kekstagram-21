'use strict';

(function main() {
  let NAMES = [`Ozzy`, `Billy`, `Jimmy`, `Paul`, `John`, `Till`, `James`, `Flea`];
  let QUANTITY_IMG = 25;
  let MESSAGE = [`\u0412\u0441\u0451 \u043E\u0442\u043B\u0438\u0447\u043D\u043E!`, `\u0412 \u0446\u0435\u043B\u043E\u043C \u0432\u0441\u0451 \u043D\u0435\u043F\u043B\u043E\u0445\u043E. \u041D\u043E \u043D\u0435 \u0432\u0441\u0451.`, `\u041A\u043E\u0433\u0434\u0430 \u0432\u044B \u0434\u0435\u043B\u0430\u0435\u0442\u0435 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u044E, \u0445\u043E\u0440\u043E\u0448\u043E \u0431\u044B \u0443\u0431\u0438\u0440\u0430\u0442\u044C \u043F\u0430\u043B\u0435\u0446 \u0438\u0437 \u043A\u0430\u0434\u0440\u0430. \u0412 \u043A\u043E\u043D\u0446\u0435 \u043A\u043E\u043D\u0446\u043E\u0432 \u044D\u0442\u043E \u043F\u0440\u043E\u0441\u0442\u043E \u043D\u0435\u043F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E.`, `\u041C\u043E\u044F \u0431\u0430\u0431\u0443\u0448\u043A\u0430 \u0441\u043B\u0443\u0447\u0430\u0439\u043D\u043E \u0447\u0438\u0445\u043D\u0443\u043B\u0430 \u0441 \u0444\u043E\u0442\u043E\u0430\u043F\u043F\u0430\u0440\u0430\u0442\u043E\u043C \u0432 \u0440\u0443\u043A\u0430\u0445 \u0438 \u0443 \u043D\u0435\u0451 \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u0430\u0441\u044C \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u044F \u043B\u0443\u0447\u0448\u0435.`, `\u042F \u043F\u043E\u0441\u043A\u043E\u043B\u044C\u0437\u043D\u0443\u043B\u0441\u044F \u043D\u0430 \u0431\u0430\u043D\u0430\u043D\u043E\u0432\u043E\u0439 \u043A\u043E\u0436\u0443\u0440\u0435 \u0438 \u0443\u0440\u043E\u043D\u0438\u043B \u0444\u043E\u0442\u043E\u0430\u043F\u043F\u0430\u0440\u0430\u0442 \u043D\u0430 \u043A\u043E\u0442\u0430 \u0438 \u0443 \u043C\u0435\u043D\u044F \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u0430\u0441\u044C \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u044F \u043B\u0443\u0447\u0448\u0435.`, `\u041B\u0438\u0446\u0430 \u0443 \u043B\u044E\u0434\u0435\u0439 \u043D\u0430 \u0444\u043E\u0442\u043A\u0435 \u043F\u0435\u0440\u0435\u043A\u043E\u0448\u0435\u043D\u044B, \u043A\u0430\u043A \u0431\u0443\u0434\u0442\u043E \u0438\u0445 \u0438\u0437\u0431\u0438\u0432\u0430\u044E\u0442. \u041A\u0430\u043A \u043C\u043E\u0436\u043D\u043E \u0431\u044B\u043B\u043E \u043F\u043E\u0439\u043C\u0430\u0442\u044C \u0442\u0430\u043A\u043E\u0439 \u043D\u0435\u0443\u0434\u0430\u0447\u043D\u044B\u0439 \u043C\u043E\u043C\u0435\u043D\u0442?!`];
  let MIN_LIKES = 15;
  let MAX_LIKES = 200;
  let MIN_COMMENTS = 1;
  let MAX_COMMENTS = 5;
  let PHOTO = 1;
  let bigPicture = document.querySelector(`.big-picture`);
  let bigPictureImg = bigPicture.querySelector(`.big-picture__img`);
  let socialComments = bigPicture.querySelector(`.social__comments`);
  let commentsCount = bigPicture.querySelector(`.comments-count`);
  let socialCommentsCount = bigPicture.querySelector(`.social__comment-count`);
  let commentsLoader = bigPicture.querySelector(`.comments-loader`);
  let body = document.querySelector(`body`);
  let SIZE_AVATAR = 35;
  bigPicture.classList.remove(`hidden`);
  socialCommentsCount.classList.add(`hidden`);
  commentsLoader.classList.add(`hidden`);
  body.classList.add(`modal-open`);
  let picturesList = document.querySelector(`.pictures`);
  let pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);

  let getRandomItem = function getRandomItem(array) {
    let randomNum = Math.floor(Math.random() * array.length);
    let randomNumIndex = array[randomNum];
    return randomNumIndex;
  };

  let getRandomNumber = function getRandomNumber(min, max) {
    let randomNum = Math.floor(min + Math.random() * (max + 1 - min));
    return randomNum;
  };

  let getCommentArray = function getCommentArray() {
    let newComments = [];
    let quantityComments = getRandomNumber(MIN_COMMENTS, MAX_COMMENTS);

    for (let i = 0; i < quantityComments; i += 1) {
      newComments.push({
        name: getRandomItem(NAMES),
        avatar: `img/avatar-`.concat(getRandomNumber(1, 6), `.svg`),
        message: getRandomItem(MESSAGE)
      });
    }

    return newComments;
  };

  let getPosts = function getPosts(item) {
    let post = {
      url: `photos/`.concat(item, `.jpg`),
      description: `\u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0438`,
      likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: getCommentArray().length
    };
    return post;
  };

  let getRenderPicture = function getRenderPicture(item) {
    let pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector(`.picture__img`).src = getPosts(item).url;
    pictureElement.querySelector(`.picture__comments`).textContent = getPosts(item).comments;
    pictureElement.querySelector(`.picture__likes`).textContent = getPosts(item).likes;
    return pictureElement;
  };

  let getComment = function getComment() {
    let newComment = document.createElement(`li`);
    newComment.classList.add(`social__comment`);
    let newAvatar = document.createElement(`img`);
    newComment.appendChild(newAvatar);
    newAvatar.classList.add(`social__picture`);
    let newText = document.createElement(`p`);
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

  let getBigPicture = function getBigPicture(item) {
    bigPictureImg.querySelector(`img`).src = getPosts(item).url;
    bigPicture.querySelector(`.likes-count`).textContent = getPosts(item).likes;
    commentsCount.textContent = getPosts(item).comments;
    bigPicture.querySelector(`.social__caption`).textContent = getPosts(item).description;

    for (let i = 1; i <= commentsCount.textContent; i += 1) {
      getComment();
    }
  };

  let fragment = document.createDocumentFragment();

  for (let i = 1; i <= QUANTITY_IMG; i += 1) {
    fragment.appendChild(getRenderPicture(i));
  }

  picturesList.appendChild(fragment);
  getBigPicture(PHOTO);
})();
