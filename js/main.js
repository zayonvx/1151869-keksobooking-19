'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS =
['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var mapForm = document.querySelector('.map__filters');
var mapPins = document.querySelector('.map__pins');
var mainPin = document.querySelector('.map__pin--main');
var addressField = adForm.querySelector('input[name="address"');
var template = document.querySelector('#pin').content.querySelector('.map__pin');
var rooms = document.querySelector('select[name=rooms]');
var capacity = document.querySelector('select[name=capacity]');
// var templatePopup = document.querySelector('#card').content.querySelector('.map__card');
var PIN_OFFSET_TOP = template.offsetHeight;
var PIN_OFFSET_LEFT = template.offsetWidth;
var LOCATION_X_MIN = 1;
var LOCATION_X_MAX = mapPins.offsetWidth;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var TARGET_AMOUNT = 8;
var ENTER_KEY = 'Enter';
var MOUSE_KEY = 0;

// var TYPES_TEXT = {
//   palace: 'Дворец',
//   flat: 'Квартира',
//   house: 'Дом',
//   bungalo: 'Бунгало'
// };

function getRandomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function getRandomElementArray(array) {
  var randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
}

function setDisabled(form) {
  var fieldsArray = form.querySelectorAll('fieldset');
  for (var i = 0; i < fieldsArray.length; i++) {
    fieldsArray[i].setAttribute('disabled', '');
  }
}

function setEnabled(form) {
  var fieldsArray = form.querySelectorAll('fieldset');
  for (var i = 0; i < fieldsArray.length; i++) {
    fieldsArray[i].removeAttribute('disabled', '');
  }
}

function inactiveFields() {
  var fieldsSetArray = [adForm, mapForm];
  for (var i = 0; i < fieldsSetArray.length; i++) {
    setDisabled(fieldsSetArray[i]);
  }
}

function activeFields() {
  var fieldsSetArray = [adForm, mapForm];
  for (var i = 0; i < fieldsSetArray.length; i++) {
    setEnabled(fieldsSetArray[i]);
  }
}

function getLocationX() {
  return getRandomInteger(LOCATION_X_MIN, LOCATION_X_MAX);
}

function getLocationY() {
  return getRandomInteger(LOCATION_Y_MIN, LOCATION_Y_MAX);
}

function setRandomArray(array) {
  var items = [];
  var randomAmount = getRandomInteger(1, array.length);
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
  var author = {
    avatar: 'img/avatars/user0' + (i + 1) + '.png'
  };

  var location = {
    x: getLocationX(),
    y: getLocationY(),
  };

  var offer = {
    title: 'Заголовок',
    address: location.x + ', ' + location.y,
    price: getRandomInteger(1000, 1000000),
    type: getRandomElementArray(TYPES),
    rooms: getRandomInteger(1, 3),
    guests: getRandomInteger(1, 3),
    checkin: getRandomElementArray(TIMES),
    checkout: getRandomElementArray(TIMES),
    features: setRandomArray(FEATURES),
    description: 'Описание недвижимости номер ' + (i + 1),
    photos: getRandomElementArray(PHOTOS),
  };

  var singlePin = {
    author: author,
    offer: offer,
    location: location,
  };

  return singlePin;
}

// function getPhoto(popupPhotoTemplate, index) {
//   var photoItem = popupPhotoTemplate.cloneNode(true);
//   photoItem.src = PHOTOS[index];
//   photoItem.alt = 'Квартира' + (index + 1);
//   photoItem.style.width = 40;
//   photoItem.style.hight = 45;

//   return photoItem;
// }

// function renderPhoto(tempPopup) {
//   var popupPhotos = tempPopup.querySelector('.popup__photos');
//   var popupPhotoTemplate = popupPhotos.querySelector('.popup__photo');
//   popupPhotos.innerHTML = '';
//   for (var i = 0; i < PHOTOS.length; i++) {
//     popupPhotos.appendChild(getPhoto(popupPhotoTemplate, i));
//   }
// }

function renderPin(singlePin) {
  var pinItem = template.cloneNode(true);

  pinItem.style.left = singlePin.location.x + PIN_OFFSET_LEFT + 'px';
  pinItem.style.top = singlePin.location.y + PIN_OFFSET_TOP + 'px';
  pinItem.querySelector('img').src = singlePin.author.avatar;
  pinItem.querySelector('img').alt = singlePin.offer.title;

  return pinItem;
}

// function renderPopup(singlePin) {
//   var popupItem = templatePopup.cloneNode(true);
//   popupItem.querySelector('.popup__avatar').src = singlePin.author.avatar;
//   popupItem.querySelector('.popup__title').textContent = singlePin.offer.title;
//   popupItem.querySelector('.popup__text--address').textContent = singlePin.offer.address;
//   popupItem.querySelector('.popup__text--price').textContent = singlePin.offer.price + 'Р/Ночь';
//   popupItem.querySelector('.popup__type').textContent = TYPES_TEXT[singlePin.offer.type];
//   popupItem.querySelector('.popup__text--capacity').textContent = singlePin.offer.rooms + ' комнаты для ' + singlePin.offer.guests + ' гостей';
//   popupItem.querySelector('.popup__text--time').textContent = 'Заезд после ' + singlePin.offer.checkin + ' выезд до ' + singlePin.offer.checkout;
//   popupItem.querySelector('.popup__feature').textContent = singlePin.offer.features;
//   popupItem.querySelector('.popup__description').textContent = singlePin.offer.description;
//   renderPhoto(popupItem);

//   return popupItem;
// }

function inactive() {
  inactiveFields();
}

inactive();

function moveToActive() {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  activeFields();
}

function getPinCord(event) {
  if (event.button === MOUSE_KEY) {
    var pinX = Math.floor(event.pageX + PIN_OFFSET_TOP / 2);
    var pinY = Math.floor(event.pageY + PIN_OFFSET_TOP / 2);
    addressField.value = pinX + ', ' + pinY;
    mainPin.removeEventListener('mousedown', getPinCord);
  }
}

function validation() {
  rooms.setCustomValidity('');
  capacity.setCustomValidity('');
  if (+rooms.value < +capacity.value) {
    rooms.setCustomValidity('Количество комнат не может быть меньше, чем количество гостей');
    capacity.setCustomValidity('Количество комнат не может быть меньше, чем количество гостей');
  }
  if ((+rooms.value === 100 && +capacity.value !== 0) || (+rooms.value !== 100 && +capacity.value === 0)) {
    rooms.setCustomValidity('Доступно не для гостей');
    capacity.setCustomValidity('Доступно не для гостей');
  }
}

function main() {
  moveToActive();
  var fragment = document.createDocumentFragment();
  var pins = getPins(TARGET_AMOUNT);
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPin(pins[i]));
  }
  mapPins.appendChild(fragment);
  // map.insertBefore(fragment.appendChild(renderPopup(pins[0])), map.querySelector('.map__filters-container'));
}

function active(event) {
  if (event.button === MOUSE_KEY || event.key === ENTER_KEY) {
    main();
    mainPin.removeEventListener('mousedown', active);
    mainPin.removeEventListener('keydown', active);
  }
}

mainPin.addEventListener('mousedown', active);
mainPin.addEventListener('keydown', active);
mainPin.addEventListener('mousedown', getPinCord);
rooms.addEventListener('change', validation);
capacity.addEventListener('change', validation);
