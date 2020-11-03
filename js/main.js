'use strict';

(function main() {
  const NAMES = [`Ozzy`, `Billy`, `Jimmy`, `Paul`, `John`, `Till`, `James`, `Flea`];
  const QUANTITY_IMG = 25;
  const MESSAGES = [`Всё отлично!`, `В целом всё неплохо. Но не всё.`, `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`, `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`, `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`, `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`];
  const MIN_LIKES = 15;
  const MAX_LIKES = 200;
  const MIN_COMMENTS = 3;
  const MAX_COMMENTS = 5;
  const SIZE_AVATAR = 35;
  const STEP_SIZE = 25;
  const MAX_SCALE = 100;
  const MIN_SCALE = 25;
  const MAX_NAME_LENGTH = 20;
  const HASH_PATTERN = /^#/;
  const LETTER_NUM_PATTERN = /^#[0-9a-z]+/i;
  const MAX_QANTITY_HASHTAGS = 5;
  const bigPicture = document.querySelector(`.big-picture`);
  const bigPictureImg = bigPicture.querySelector(`.big-picture__img`);
  const socialComments = bigPicture.querySelector(`.social__comments`);
  const commentsCount = bigPicture.querySelector(`.comments-count`);
  const socialCommentsCount = bigPicture.querySelector(`.social__comment-count`);
  const commentsLoader = bigPicture.querySelector(`.comments-loader`);
  const bigPictureCancel = bigPicture.querySelector(`.big-picture__cancel`);
  const picturesList = document.querySelector(`.pictures`);
  const fileInput = picturesList.querySelector(`#upload-file`);
  const formUpload = picturesList.querySelector(`.img-upload__overlay`);
  const buttonUploadCancel = picturesList.querySelector(`#upload-cancel`);
  const imgPreview = formUpload.querySelector(`.img-upload__preview`);
  const effectsList = formUpload.querySelector(`.effects__list`);
  const slider = formUpload.querySelector(`.effect-level__pin`);
  const sliderValue = formUpload.querySelector(`.effect-level__value`);
  const scaleControlValue = formUpload.querySelector(`.scale__control--value`);
  const scaleControlSmaller = formUpload.querySelector(`.scale__control--smaller`);
  const scaleControlBigger = formUpload.querySelector(`.scale__control--bigger`);
  const hashtagsInput = formUpload.querySelector(`.text__hashtags`);
  const textDescription = formUpload.querySelector(`.text__description`);

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

  fileInput.addEventListener(`change`, function () {
    formUpload.classList.remove(`hidden`);
    document.body.classList.add(`modal-open`);
    scaleControlValue.value = `100%`;

    const closeFileInput = function () {
      formUpload.classList.add(`hidden`);
      document.body.classList.remove(`modal-open`);
      fileInput.value = ``;
    };

    buttonUploadCancel.addEventListener(`click`, function () {
      closeFileInput();
    });

    const clickOnEscape = document.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        closeFileInput();
      }
    });

    const clickOnEscapeInput = document.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Escape`) {
        evt.target.blur();
      }
    });

    textDescription.focusin = function (evt) {
      clickOnEscapeInput(evt);
    };

    textDescription.focusout = function (evt) {
      clickOnEscape(evt);
    };
  });

  const clickOnPicture = function (evt) {
    if (evt.target.matches(`.picture`)) {
      bigPicture.classList.remove(`hidden`);
      socialCommentsCount.classList.add(`hidden`);
      commentsLoader.classList.add(`hidden`);
      document.body.classList.add(`modal-open`);

      const closeBigPicture = function () {
        bigPicture.classList.add(`hidden`);
        socialCommentsCount.classList.remove(`hidden`);
        commentsLoader.classList.remove(`hidden`);
        document.body.classList.remove(`modal-open`);
      };
      bigPictureCancel.addEventListener(`click`, function () {
        closeBigPicture();
      });

      document.addEventListener(`keydown`, function (event) {
        if (event.key === `Escape`) {
          evt.preventDefault();
          closeBigPicture();
        }
      });
      getBigPicture(evt.target.id);
    }
  };

  picturesList.addEventListener(`click`, clickOnPicture);

  picturesList.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      evt.preventDefault();
      clickOnPicture(evt);
    }
  });

  const effectsClasses = [
    `effects__preview--none`,
    `effects__preview--chrome`,
    `effects__preview--sepia`,
    `effects__preview--marvin`,
    `effects__preview--phobos`,
    `effects__preview--heat`
  ];

  const onEffectsClick = function (evt) {
    const target = evt.target;
    let anotherClass;
    if (evt.target.matches(`span`)) {
      let classes = target.classList;
      anotherClass = classes.item(classes.length - 1);
      effectsClasses.forEach(function (item) {
        if (imgPreview.classList.contains(item)) {
          imgPreview.classList.remove(item);
        }
        imgPreview.classList.add(anotherClass);
      });
    }
  };

  effectsList.addEventListener(`click`, onEffectsClick);

  const sliderValuePosition = 66;
  slider.style.left = sliderValuePosition + `%`;
  const sliderMouseUp = function () {
    if (!imgPreview.classList.contains(`effects__preview--none`)) {
      if (imgPreview.classList.contains(`effects__preview--chrome`)) {
        if (sliderValuePosition >= 50) {
          imgPreview.style.filter = `grayscale(1)`;
        } else {
          imgPreview.style.filter = `grayscale(0)`;
        }
      }
      if (imgPreview.classList.contains(`effects__preview--sepia`)) {
        if (sliderValuePosition >= 50) {
          imgPreview.style.filter = `sepia(1)`;
        } else {
          imgPreview.style.filter = `sepia(0)`;
        }
      }
      if (imgPreview.classList.contains(`effects__preview--marvin`)) {
        imgPreview.style.filter = `invert(${sliderValuePosition})`;
      }
      if (imgPreview.classList.contains(`effects__preview--phobos`)) {
        if (sliderValuePosition <= 33) {
          imgPreview.style.filter = `blur(1px)`;
        } else if (sliderValuePosition > 33 || sliderValuePosition <= 66) {
          imgPreview.style.filter = `blur(2px)`;
        } else if (sliderValuePosition > 66 || sliderValuePosition <= 100) {
          imgPreview.style.filter = `blur(3px)`;
        }
      }
      if (imgPreview.classList.contains(`effects__preview--heat`)) {
        if (sliderValuePosition <= 33) {
          imgPreview.style.filter = `brightness(1px)`;
        } else if (sliderValuePosition > 33 || sliderValuePosition <= 66) {
          imgPreview.style.filter = `brightness(2px)`;
        } else if (sliderValuePosition > 66 || sliderValuePosition <= 100) {
          imgPreview.style.filter = `brightness(3px)`;
        }
      }
    } else {
      sliderValue.classList.add(`hidden`);
    }
  };

  slider.addEventListener(`mouseup`, sliderMouseUp);

  let SCALE_CONTROL_DEFAULT = 100;
  scaleControlValue.value = SCALE_CONTROL_DEFAULT + `%`;
  scaleControlSmaller.addEventListener(`click`, function () {
    if (SCALE_CONTROL_DEFAULT > MIN_SCALE) {
      scaleControlValue.value = (SCALE_CONTROL_DEFAULT - STEP_SIZE) + `%`;
      SCALE_CONTROL_DEFAULT = SCALE_CONTROL_DEFAULT - STEP_SIZE;
      imgPreview.style.transform = `scale(0.${SCALE_CONTROL_DEFAULT})`;
    } else {
      scaleControlValue.value = MIN_SCALE + `%`;
    }
  });

  scaleControlBigger.addEventListener(`click`, function () {
    if (SCALE_CONTROL_DEFAULT < MAX_SCALE) {
      scaleControlValue.value = (SCALE_CONTROL_DEFAULT + STEP_SIZE) + `%`;
      SCALE_CONTROL_DEFAULT = SCALE_CONTROL_DEFAULT + STEP_SIZE;
      if (SCALE_CONTROL_DEFAULT === MAX_SCALE) {
        imgPreview.style.transform = `scale(1)`;
      } else {
        imgPreview.style.transform = `scale(0.${SCALE_CONTROL_DEFAULT})`;
      }
    } else {
      scaleControlValue.value = MAX_SCALE + `%`;
    }
  });

  const getCommentArray = function () {
    const newComments = [];
    const quantityComments = getRandomNumber(MIN_COMMENTS, MAX_COMMENTS);
    for (let i = 0; i < quantityComments; i += 1) {
      newComments.push({
        name: getRandomItem(NAMES),
        avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
        message: getRandomItem(MESSAGES),
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
      id: item,
    };
    return post;
  };

  const getRenderPicture = function (item) {
    const post = getPosts(item);
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector(`.picture__img`).src = post.url;
    pictureElement.querySelector(`.picture__comments`).textContent = post.comments;
    pictureElement.querySelector(`.picture__likes`).textContent = post.likes;
    pictureElement.id = post.id;
    return pictureElement;
  };

  const getComment = function (item) {
    const newComment = document.createElement(`li`);
    newComment.classList.add(`social__comment`);
    const newAvatar = document.createElement(`img`);
    newComment.appendChild(newAvatar);
    newAvatar.classList.add(`social__picture`);
    const newText = document.createElement(`p`);
    newComment.appendChild(newText);
    newText.classList.add(`social__text`);

    const commentArr = getCommentArray()[item];
    newAvatar.alt = commentArr.name;
    newAvatar.src = commentArr.avatar;
    newText.textContent = commentArr.message;
    newAvatar.width = SIZE_AVATAR;
    newAvatar.height = SIZE_AVATAR;
    return newComment;
  };

  const getBigPicture = function (item) {
    const post = getPosts(item);
    bigPictureImg.querySelector(`img`).src = post.url;
    bigPicture.querySelector(`.likes-count`).textContent = post.likes;
    commentsCount.textContent = post.comments;
    bigPicture.querySelector(`.social__caption`).textContent = post.description;

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < commentsCount.textContent; i += 1) {
      fragment.appendChild(getComment(i));
    }
    socialComments.appendChild(fragment);
  };

  const fragment = document.createDocumentFragment();
  for (let i = 1; i <= QUANTITY_IMG; i += 1) {
    fragment.appendChild(getRenderPicture(i));
  }
  picturesList.appendChild(fragment);

  hashtagsInput.addEventListener(`input`, function () {
    let hashtagsArray = hashtagsInput.value.trim().split(` `);

    if (hashtagsArray.length <= MAX_QANTITY_HASHTAGS) {
      hashtagsArray.forEach(function (item) {
        const valueLength = item.length;

        if (!HASH_PATTERN.test(item)) {
          hashtagsInput.setCustomValidity(`Хэш-тег должен начинаться с символа # (решётка)`);
        } else if (!LETTER_NUM_PATTERN.test(item)) {
          hashtagsInput.setCustomValidity(`Cтрока после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;`);
        } else if (item === `#`) {
          hashtagsInput.setCustomValidity(`Хеш-тег не может состоять только из одной решётки`);
        } else if (valueLength > MAX_NAME_LENGTH) {
          hashtagsInput.setCustomValidity(`Удалите лишние ` + (valueLength - MAX_NAME_LENGTH) + ` симв.`);
        } else {
          hashtagsInput.setCustomValidity(``);
        }
      });
    } else {
      hashtagsInput.setCustomValidity(`Нельзя указывать больше пяти хэш-тегов`);
    }
    if (hashtagsArray.length > 1) {
      for (let i = 0; i < hashtagsArray.length; i += 1) {
        for (let j = i + 1; j < hashtagsArray.length; j += 1) {
          if (j.value === i.value) {
            hashtagsInput.setCustomValidity(`Один и тот же хэш-тег не может быть использован дважды`);
          } else {
            hashtagsInput.setCustomValidity(``);
          }
        }
      }
    }
    hashtagsInput.reportValidity();
  });
}());
