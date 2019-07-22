'use strict';

(function () {
  var uploadElement = userDialogElement.querySelector('.upload');

  uploadElement.addEventListener('mousedown', function (evtDown) {
    var Coordinats = function (x, y) {
      this.x = x;
      this.y = y;
    };

    var isDragged = false;

    var startCoordinats = new Coordinats(evtDown.clientX, evtDown.clientY);

    var onUploadMousemove = function (evtMove) {
      var shiftCoordinats = new Coordinats(
          startCoordinats.x - evtMove.clientX,
          startCoordinats.y - evtMove.clientY
      );

      if (Math.abs(shiftCoordinats.x) < 2 && Math.abs(shiftCoordinats.y) < 2) {
        return;
      }

      // isDragged = true;

      startCoordinats = new Coordinats(evtMove.clientX, evtMove.clientY);

      userDialogElement.style.left =
        userDialogElement.offsetLeft - shiftCoordinats.x + 'px';
      userDialogElement.style.top =
        userDialogElement.offsetTop - shiftCoordinats.y + 'px';
    };

    var onUploadMouseUp = function (evt) {
      uploadElement.removeEventListener('mousemove', onUploadMousemove);
      uploadElement.removeEventListener('mouseup', onUploadMouseUp);

      if (isDragged) {
        var onClickPreventDefault = function (evt) {
          evt.preventDefault();
          uploadElement.removeEventListener('click', onClickPreventDefault);
        };
        uploadElement.addEventListener('click', onClickPreventDefault);
      }
    };

    uploadElement.addEventListener('mousemove', onUploadMousemove);
    uploadElement.addEventListener('mouseup', onUploadMouseUp);
  });
})();
