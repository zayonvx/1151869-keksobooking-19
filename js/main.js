'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var template = document.querySelector('#pin').content.querySelector('.map__pin');

var PIN_OFFSET_TOP = template.offsetHeight;
var PIN_OFFSET_LEFT = template.offsetWidth;
var LOCATION_X_MIN = 1;
var LOCATION_X_MAX = mapPins.offsetWidth;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var TARGET_AMOUNT = 8;

function getRandomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function getRandomElementArray(array) {
  var randomIndex = getRandomInteger(0, array.lenght - 1);
  return array[randomIndex];
}

function getLocationX() {
  return getRandomInteger(LOCATION_X_MIN, LOCATION_X_MAX);
}

function getLocationY() {
  return getRandomInteger(LOCATION_Y_MIN, LOCATION_Y_MAX);
}

function setRandomArray(array) {
  var items = [];
  var randomAmount = getRandomInteger(1, array.lenght);
  for (var i = 0; i <= randomAmount; i++) {
    items.push(items.length);
  }
  return items;
}

function getPins(amount) {
  var array = [];
  for (var i = 0; i < amount; i++) {
    array[array.length] = getSinglePin(i);
  }
  return array;
}

function getSinglePin(i) {
  var singlePin = {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },
    offer: {
      title: 'Заголовок',
      address: location.x + ', ' + location.y,
      price: getRandomInteger(1000, 1000000),
      type: getRandomElementArray(TYPES),
      rooms: getRandomInteger(1, 3),
      guests: getRandomInteger(1, 3),
      checkin: getRandomElementArray(TIMES),
      checkout: getRandomElementArray(TIMES),
      features: setRandomArray(FEATURES),
      photos: getRandomElementArray(PHOTOS),
    },
    location: {
      x: getLocationX(),
      y: getLocationY()
    }
  };
  return singlePin;
}

function renderPin(singlePin) {
  var pinItem = template.cloneNode(true);

  pinItem.style.left = singlePin.location.x + PIN_OFFSET_LEFT + 'px';
  pinItem.style.top = singlePin.location.y + PIN_OFFSET_TOP + 'px';
  pinItem.querySelector('img').src = singlePin.author.avatar;
  pinItem.querySelector('img').alt = singlePin.offer.title;

  return pinItem;
}

function main() {
  map.classList.remove('map--faded');
  var fragment = document.createDocumentFragment();
  var pins = getPins(TARGET_AMOUNT);
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPin(pins[i]));
  }
  mapPins.appendChild(fragment);
}

main();
