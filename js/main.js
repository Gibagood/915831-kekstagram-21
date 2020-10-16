(function main() {
  const NAMES = ['Ozzy', 'Billy', 'Jimmy', 'Paul', 'John', 'Till', 'James', 'Flea'];
  const QUANTITY_IMG = 25;
  const MESSAGE = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  const MIN_LIKES = 15;
  const MAX_LIKES = 200;
  const MIN_COMMENTS = 1;
  const MAX_COMMENTS = 5;

  const picturesList = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  const getRandomIndex = function getrandomIndex(array) {
    const randomNum = Math.floor(Math.random() * array.length);
    const randomNumIndex = array[randomNum];
    return randomNumIndex;
  };

  const getRandomNumber = function getRandomNumber(min, max) {
    const randomNum = Math.floor(min + Math.random() * (max + 1 - min));
    return randomNum;
  };

  const getCommentArray = function getCommentArray() {
    const newComment = [];
    const QUANTITY_COMMENTS = getRandomNumber(MIN_COMMENTS, MAX_COMMENTS);
    for (let i = 0; i <= QUANTITY_COMMENTS; i += 1) {
      i = {
        name: getRandomIndex(NAMES),
        avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
        message: getRandomIndex(MESSAGE),
      };
      newComment.push(i);
    }
    console.log(newComment);
    return newComment;
  };

  const getImageArray = function getImageArray(item) {
    const imageArray = {
      url: `photos/${item}.jpg`,
      description: 'описание фотографии',
      likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: getCommentArray().length,
    };
    return imageArray;
  };

  const getRenderPicture = function renderPicture(item) {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = getImageArray(item).url;
    pictureElement.querySelector('.picture__comments').textContent = getImageArray(item).comments;
    pictureElement.querySelector('.picture__likes').textContent = getImageArray(item).likes;
    return pictureElement;
  };

  const fragment = document.createDocumentFragment();
  for (let i = 1; i <= QUANTITY_IMG; i += 1) {
    fragment.appendChild(getRenderPicture(i));
  }
  picturesList.appendChild(fragment);
}());
