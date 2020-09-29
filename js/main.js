(function main() {
  const NAMES = ['Ozzy', 'Billy', 'Jimmy', 'Paul', 'John', 'Till', 'James', 'Flea'];
  const QUANTITY_IMG = 25;
  const QUANTITY_AVATAR = 6;
  const MESSAGE = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  const picturesList = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  const randomIndex = function randomIndex(num) {
    const randomNum = Math.floor(Math.random() * num);
    return randomNum;
  };

  const renderPicture = function renderPicture() {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = 1;
    pictureElement.querySelector('.picture__comments').textContent = MESSAGE[randomIndex(MESSAGE.length)];
    return renderPicture;
  };

  const fragment = document.createDocumentFragment();
  for (let i = 1; i <= QUANTITY_IMG; i += 1) {
    fragment.appendChild(renderPicture(i));
  }
  picturesList.appendChild(fragment);
}());
