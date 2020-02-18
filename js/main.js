'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var map = document.querySelector('.map');
var maPins = document.querySelector('.map__pins');
var template = document.querySelector('#pin').content.querySelector('.map__pin');

var PIN_OFFSET_TOP = template.offsetHeight;
var PIN_OFFSET_LEFT = template.offsetWidth;

function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function randomElementArray(array) {
  var RandomIndex = Math.floor(Math.random() * array.length);
  return array[RandomIndex];
}

function buildRandomArray(array) {
  var items = [];
  for (var i = 0; i <= randomInteger(1, array.length); i++) {
    items.push(items.length);
  }
  return items;
}

function getLocationX() {
  return randomInteger(1, 1200);
}

function getLocationY() {
  return randomInteger(130, 630);
}

function getSinglePin() {
  var singlePin = {
    author: {
      avatar: 'img/avatars/user0' + randomInteger(1, 8) + '.png'
    },
    offer: {
      title: 'Заголовок',
      address: getLocationX() + ' ' + getLocationY(),
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
      x: getLocationX(),
      y: getLocationY()
    }
  };
  return singlePin;
}

function getPins(numbers) {
  var array = [];
  for (var i = 0; i < numbers; i++) {
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
maPins.appendChild(fragment);
