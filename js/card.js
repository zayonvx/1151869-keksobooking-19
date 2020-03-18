'use strict';

(function () {
  function getPhoto(popupPhotoTemplate, index) {
    var photoItem = popupPhotoTemplate.cloneNode(true);
    photoItem.src = window.dataMain.photosObj[index];
    photoItem.alt = 'Квартира' + (index + 1);
    photoItem.style.width = 40;
    photoItem.style.hight = 45;

    return photoItem;
  }

  function renderPhoto(tempPopup, array) {
    var popupPhotos = tempPopup.querySelector('.popup__photos');
    var popupPhotoTemplate = popupPhotos.querySelector('.popup__photo');
    popupPhotos.innerHTML = '';
    for (var i = 0; i < array.length; i++) {
      popupPhotos.appendChild(getPhoto(popupPhotoTemplate, i));
    }
  }

  window.renderPopup = function (singlePin) {
    var popupItem = window.dataMain.popupTemplate.cloneNode(true);
    popupItem.querySelector('.popup__avatar').src = singlePin.author.avatar;
    popupItem.querySelector('.popup__title').textContent = singlePin.offer.title;
    popupItem.querySelector('.popup__text--address').textContent = singlePin.offer.address;
    popupItem.querySelector('.popup__text--price').textContent = singlePin.offer.price + 'Р/Ночь';
    popupItem.querySelector('.popup__type').textContent = window.dataMain.costsObj[singlePin.offer.type].name;
    popupItem.querySelector('.popup__text--capacity').textContent = singlePin.offer.rooms + ' комнаты для ' + singlePin.offer.guests + ' гостей';
    popupItem.querySelector('.popup__text--time').textContent = 'Заезд после ' + singlePin.offer.checkin + ' выезд до ' + singlePin.offer.checkout;
    popupItem.querySelector('.popup__feature').textContent = singlePin.offer.features;
    popupItem.querySelector('.popup__description').textContent = singlePin.offer.description;
    renderPhoto(popupItem, window.dataMain.photosObj);
    var buttonClose = popupItem.querySelector('.popup__close');
    buttonClose.addEventListener('click', window.popupRemove);
    return popupItem;
  };
})();
