(function main() {
  const NAMES = ['Ozzy', 'Billy', 'Jimmy', 'Paul', 'John', 'Till', 'James', 'Flea'];
  const QUANTITY_IMG = 25;
  const QUANTITY_AVATAR = 6;
  const MESSAGE = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  const MIN_LIKES = 15;
  const MAX_LIKES = 200;

  const picturesList = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  /*
  const pictures(num) = {
    url: `photos/${num}.jpg`,
    likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
    comments: [
      {
        name: getRandomIndex(NAMES),
        avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
        message: getRandomIndex(MESSAGE),
      },
    ],
  }; */

  const getrandomIndex = function getrandomIndex(array) {
    const randomNum = Math.floor(Math.random() * array.length);
    const randomNumIndex = array[randomNum];
    return randomNumIndex;
  };

  const getRandomNumber = function getRandomNumber(min, max) {
    const randomNum = Math.floor(min + Math.random() * (max + 1 - min));
    return randomNum;
  };

  const renderPicture = function renderPicture() {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = `photos/${getRandomNumber(1, QUANTITY_IMG)}.jpg`;
    pictureElement.querySelector('.picture__comments').textContent = getrandomIndex(MESSAGE);
    pictureElement.querySelector('.picture__likes').textContent = getRandomNumber(MIN_LIKES, MAX_LIKES);
    return renderPicture;
  };

  const fragment = document.createDocumentFragment();
  for (let i = 1; i <= QUANTITY_IMG; i += 1) {
    fragment.appendChild(renderPicture());
  }
  picturesList.appendChild(fragment);
}());
