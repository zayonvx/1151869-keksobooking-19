'use strict';

(function () {
  window.onEscPress = function (event) {
    if (event.key === window.keys.esc) {
      window.popupRemove();
    }
  };
  window.dataMain.mainPinTemplate.addEventListener('mousedown', window.active);
  window.dataMain.mainPinTemplate.addEventListener('keydown', window.active);
  window.dataMain.mainPinTemplate.addEventListener('mousedown', window.getPinCord);
  window.dataMain.roomsField.addEventListener('change', window.validation);
  window.dataMain.capacityField.addEventListener('change', window.validation);
  window.dataMain.typeField.addEventListener('change', function () {
    window.setPrice(window.dataMain.costsObj);
  });
  window.dataMain.timeInField.addEventListener('change', function () {
    window.setTime(window.dataMain.timeInField, window.dataMain.timeOutField);
  });
  window.dataMain.timeOutField.addEventListener('change', function () {
    window.setTime(window.dataMain.timeOutField, window.dataMain.timeInField);
  });
})();
