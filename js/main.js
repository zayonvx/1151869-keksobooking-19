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

function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function randomElementArray(array) {
  var elem = randomInteger(array[0], array.lenght);
  return Math.floor(elem);
}

function randomArrayLenght(array) {
  randomInteger(1, array.lenght);
}

function buildRandomArray(array) {
  var items = [];
  var randomAmount = randomArrayLenght(array);
  for (var i = 0; i <= randomAmount; i++) {
    items.push(items.length);
  }
  return items;
}

function getSinglePin(i) {
  var singlePin = {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },
    offer: {
      title: 'Заголовок',
      address: location.x + ', ' + location.y,
      price: randomInteger(1000, 1000000),
      type: randomElementArray(TYPES),
      rooms: randomInteger(1, 3),
      guests: randomInteger(1, 3),
      checkin: randomElementArray(TIMES),
      checkout: randomElementArray(TIMES),
      features: buildRandomArray(FEATURES),
      photos: randomElementArray(PHOTOS),
    },
    location: {
      x: randomInteger(LOCATION_X_MIN, LOCATION_X_MAX),
      y: randomInteger(LOCATION_Y_MIN, LOCATION_Y_MAX)
    }
  };
  return singlePin;
}

function getPins(amount) {
  var array = [];
  for (var i = 0; i < amount; i++) {
    array[array.length] = getSinglePin(i);
  }
  return array;
}

var pins = getPins(8);

map.classList.remove('map--faded');

function renderPin(singlePin) {
  var pinItem = template.cloneNode(true);

  pinItem.style.left = singlePin.location.x + PIN_OFFSET_LEFT + 'px';
  pinItem.style.top = singlePin.location.y + PIN_OFFSET_TOP + 'px';
  pinItem.querySelector('img').src = singlePin.author.avatar;
  pinItem.querySelector('img').alt = singlePin.offer.title;

  return pinItem;
}

var fragment = document.createDocumentFragment();
for (var i = 0; i < pins.length; i++) {
  fragment.appendChild(renderPin(pins[i]));
}
mapPins.appendChild(fragment);
