'use strict';

(function () {
  const SIZE_AVATAR = 35;
  const bigPicture = document.querySelector(`.big-picture`);
  const bigPictureImg = bigPicture.querySelector(`.big-picture__img`);
  const socialComments = bigPicture.querySelector(`.social__comments`);
  const commentsCount = bigPicture.querySelector(`.comments-count`);
  const socialCommentsCount = bigPicture.querySelector(`.social__comment-count`);
  const commentsLoader = bigPicture.querySelector(`.comments-loader`);
  const bigPictureCancel = bigPicture.querySelector(`.big-picture__cancel`);


  const getBigPicture = function (item) {
    const post = window.gallery.getPosts(item);
    bigPictureImg.querySelector(`img`).src = post.url;
    bigPicture.querySelector(`.likes-count`).textContent = post.likes;
    commentsCount.textContent = post.comments.length;
    bigPicture.querySelector(`.social__caption`).textContent = post.description;


    const getComment = function (i) {
      const newComment = document.createElement(`li`);
      newComment.classList.add(`social__comment`);
      const newAvatar = document.createElement(`img`);
      newComment.appendChild(newAvatar);
      newAvatar.classList.add(`social__picture`);
      const newText = document.createElement(`p`);
      newComment.appendChild(newText);
      newText.classList.add(`social__text`);

      const commentArr = post.comments[i];
      newAvatar.alt = commentArr.name;
      newAvatar.src = commentArr.avatar;
      newText.textContent = commentArr.message;
      newAvatar.width = SIZE_AVATAR;
      newAvatar.height = SIZE_AVATAR;
      return newComment;
    };

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < commentsCount.textContent; i += 1) {
      fragment.appendChild(getComment(i));
    }
    socialComments.appendChild(fragment);
  };

  const clickOnPicture = function (evt) {
    bigPicture.classList.remove(`hidden`);
    socialCommentsCount.classList.add(`hidden`);
    commentsLoader.classList.add(`hidden`);
    document.body.classList.add(`modal-open`);

    const closeBigPicture = function () {
      bigPicture.classList.add(`hidden`);
      socialCommentsCount.classList.remove(`hidden`);
      commentsLoader.classList.remove(`hidden`);
      document.body.classList.remove(`modal-open`);
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
})();
