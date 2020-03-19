'use strict';

(function () {

  window.dataMain.mainPinTemplate.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.dataMain.mainPinTemplate.style.top = (window.dataMain.mainPinTemplate.offsetTop - shift.y) + 'px';
      window.dataMain.mainPinTemplate.style.left = (window.dataMain.mainPinTemplate.offsetLeft - shift.x) + 'px';
      window.setPinLocation();
      if (window.dataMain.mainPinTemplate.offsetTop < window.dataMisc.locationMinY && shift.y > 0) {
        window.dataMain.mainPinTemplate.style.top = window.dataMisc.locationMinY + 'px';
      }
      if (window.dataMain.mainPinTemplate.offsetTop > window.dataMisc.locationMaxY && shift.y < 0) {
        window.dataMain.mainPinTemplate.style.top = window.dataMisc.locationMaxY + 'px';
      }
      if ((window.dataMain.mainPinTemplate.offsetLeft + window.dataMisc.pinHalfWidth) < 0 && shift.x > 0) {
        window.dataMain.mainPinTemplate.style.left = -window.dataMisc.pinHalfWidth + 'px';
      }
      if ((window.dataMain.mainPinTemplate.offsetLeft + window.dataMisc.pinHalfWidth) > window.dataMisc.locationMaxX && shift.x < 0) {
        window.dataMain.mainPinTemplate.style.left = (window.dataMisc.locationMaxX - window.dataMisc.pinHalfWidth) + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          window.dataMain.mainPinTemplate.removeEventListener('click', onClickPreventDefault);
        };
        window.dataMain.mainPinTemplate.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
