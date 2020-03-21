'use strict';

(function () {
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var TYPES_COSTS = {
    palace: {
      name: 'Дворец',
      price: '10000'
    },
    flat: {
      name: 'Квартира',
      price: '1000'
    },
    house: {
      name: 'Дом',
      price: '5000'
    },
    bungalo: {
      name: 'Бунгало',
      price: '0'
    }
  };
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
  var template = document.querySelector('#pin').content.querySelector('.map__pin');
  var rooms = document.querySelector('select[name=rooms]');
  var capacity = document.querySelector('select[name=capacity]');
  var templatePopup = document.querySelector('#card').content.querySelector('.map__card');
  var address = adForm.querySelector('input[name="address"');
  var type = adForm.querySelector('#type');
  var price = adForm.querySelector('#price');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var PIN_OFFSET_TOP = template.offsetHeight;
  var PIN_OFFSET_LEFT = template.offsetWidth;
  var PIN_HALF_WIDTH = 30;
  var LOCATION_X_MIN = 1;
  var LOCATION_X_MAX = mapPins.offsetWidth;
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;
  var AMOUNT = 8;
  var ENTER_KEY = 'Enter';
  var MOUSE_KEY = 0;
  var ESC_KEY = 'Escape';
  window.keys = {
    enter: ENTER_KEY,
    mouseButton: MOUSE_KEY,
    esc: ESC_KEY,
  };
  window.dataMain = {
    typesObj: TYPES,
    costsObj: TYPES_COSTS,
    timesObj: TIMES,
    featuresObj: FEATURES,
    photosObj: PHOTOS,
    mapTemplate: map,
    adFormTemplate: adForm,
    mapFormTemplate: mapForm,
    mapPinsTemplate: mapPins,
    mainPinTemplate: mainPin,
    popupTemplate: templatePopup,
    pinTemplate: template,
    addressField: address,
    roomsField: rooms,
    capacityField: capacity,
    typeField: type,
    priceField: price,
    timeInField: timeIn,
    timeOutField: timeOut,
  };
  window.dataMisc = {
    pinOffsetTop: PIN_OFFSET_TOP,
    pinOffsetLeft: PIN_OFFSET_LEFT,
    locationMinX: LOCATION_X_MIN,
    locationMaxX: LOCATION_X_MAX,
    locationMinY: LOCATION_Y_MIN,
    locationMaxY: LOCATION_Y_MAX,
    amount: AMOUNT,
    pinHalfWidth: PIN_HALF_WIDTH,
  };
})();
