'use strict';

(function () {
  const SIZE_AVATAR = 35;
  const COMMENTS_QANTITY = 5;
  const bigPicture = document.querySelector(`.big-picture`);
  const bigPictureImg = bigPicture.querySelector(`.big-picture__img`);
  const socialComments = bigPicture.querySelector(`.social__comments`);/*
  const socialComment = bigPicture.querySelectorAll(`.social__comment`); */
  const commentsCount = bigPicture.querySelector(`.comments-count`);
  const socialCommentsCount = bigPicture.querySelector(`.social__comment-count`);
  const commentsLoader = bigPicture.querySelector(`.comments-loader`);
  const bigPictureCancel = bigPicture.querySelector(`.big-picture__cancel`);

  const showCommentsQuantity = function () {
    const elList = socialComments.children;
    if (elList.length >= COMMENTS_QANTITY) {
      socialCommentsCount.classList.remove(`hidden`);
      commentsLoader.classList.remove(`hidden`);
      for (let z = 0; z <= elList.length - 1; z += 1) {
        if (z >= COMMENTS_QANTITY) {
          if (socialComments.children[z].classList.contains(`hidden`)) {
            socialComments.children[z].classList.remove(`hidden`);
          } else {
            socialComments.children[z].classList.add(`hidden`);
          }
        } else {
          socialComments.children[z].classList.remove(`hidden`);
        }
      }
    } else {
      socialCommentsCount.classList.add(`hidden`);
      commentsLoader.classList.add(`hidden`);
    }
  };

  const getBigPicture = function (i) {
    let item = window.gallery.picturesLoad[i - 1];
    bigPictureImg.querySelector(`img`).src = item.url;
    bigPicture.querySelector(`.likes-count`).textContent = item.likes;
    commentsCount.textContent = item.comments.length;
    bigPicture.querySelector(`.social__caption`).textContent = item.description;

    const getComment = function (j) {
      const newComment = document.createElement(`li`);
      newComment.classList.add(`social__comment`);
      const newAvatar = document.createElement(`img`);
      newComment.appendChild(newAvatar);
      newAvatar.classList.add(`social__picture`);
      const newText = document.createElement(`p`);
      newComment.appendChild(newText);
      newText.classList.add(`social__text`);

      const commentArr = item.comments[j];
      newAvatar.alt = commentArr.name;
      newAvatar.src = commentArr.avatar;
      newText.textContent = commentArr.message;
      newAvatar.width = SIZE_AVATAR;
      newAvatar.height = SIZE_AVATAR;
      return newComment;
    };

    const fragment = document.createDocumentFragment();
    for (let k = 0; k < commentsCount.textContent; k += 1) {
      fragment.appendChild(getComment(k));
    }
    socialComments.appendChild(fragment);
    showCommentsQuantity();
  };

  const clickOnPicture = function (evt) {
    bigPicture.classList.remove(`hidden`);
    document.body.classList.add(`modal-open`);
    socialCommentsCount.classList.add(`hidden`);
    commentsLoader.classList.add(`hidden`);

    const closeBigPicture = function () {
      bigPicture.classList.add(`hidden`);
      document.body.classList.remove(`modal-open`);
      socialCommentsCount.classList.remove(`hidden`);
      commentsLoader.classList.remove(`hidden`);
      while (socialComments.firstChild) {
        socialComments.removeChild(socialComments.firstChild);
      }
    };
    bigPictureCancel.addEventListener(`click`, function () {
      closeBigPicture();
    });

    document.addEventListener(`keydown`, function (event) {
      if (event.key === `Escape`) {
        event.preventDefault();
        closeBigPicture();
      }
    });

    getBigPicture(evt.id);
  };


  window.gallery.picturesList.addEventListener(`click`, function (evt) {
    if (evt.target.matches(`.picture__img`)) {
      evt.preventDefault();
      clickOnPicture(evt.target.parentNode);
    }
  });

  window.gallery.picturesList.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      evt.preventDefault();
      clickOnPicture(evt.target);
    }
  });

  commentsLoader.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    showCommentsQuantity();
  });
})();
