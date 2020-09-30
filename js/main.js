(function main() {
  const NAMES = ['Ozzy', 'Billy', 'Jimmy', 'Paul', 'John', 'Till', 'James', 'Flea'];
  const QUANTITY_IMG = 25;
  const QUANTITY_AVATAR = 6;
  const MESSAGE = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  const picturesList = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  const randomIndex = function randomIndex(array) {
    const randomNum = Math.floor(Math.random() * array.length);
    const randomNumIndex = array[randomNum];
    return randomNumIndex;
  };

  const renderPicture = function renderPicture() {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = 'photos/1.jpg';
    pictureElement.querySelector('.picture__comments').textContent = randomIndex(MESSAGE);
    return renderPicture;
  };

  const fragment = document.createDocumentFragment();
  for (let i = 1; i <= QUANTITY_IMG; i += 1) {
    fragment.appendChild(renderPicture(i));
  }
  picturesList.appendChild(fragment);
}());
