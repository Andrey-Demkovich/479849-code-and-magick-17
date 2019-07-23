'use strict';

(function () {
  var uploadElement = window.userDialogElement.querySelector('.upload');

  var setupArtifactsShop = window.userDialogElement.querySelector(
      '.setup-artifacts-shop'
  );

  var onUploadMouseDown = function (evtDown) {
    if (evtDown.which != 1) {
      return;
    }

    var Coordinats = function (x, y) {
      this.x = x;
      this.y = y;
    };

    window.dialog = {
      isDragged: false
    };

    var startCoordinats = new Coordinats(evtDown.clientX, evtDown.clientY);

    var onUploadMousemove = function (evtMove) {
      var shiftCoordinats = new Coordinats(
          startCoordinats.x - evtMove.clientX,
          startCoordinats.y - evtMove.clientY
      );

      if (Math.abs(shiftCoordinats.x) < 2 && Math.abs(shiftCoordinats.y) < 2) {
        return;
      }

      window.dialog.isDragged = true;

      startCoordinats = new Coordinats(evtMove.clientX, evtMove.clientY);

      window.userDialogElement.style.left =
        window.userDialogElement.offsetLeft - shiftCoordinats.x + 'px';
      window.userDialogElement.style.top =
        window.userDialogElement.offsetTop - shiftCoordinats.y + 'px';
    };

    var onUploadMouseUp = function () {
      document.removeEventListener('mousemove', onUploadMousemove);
      uploadElement.removeEventListener('mouseup', onUploadMouseUp);

      if (window.dialog.isDragged) {
        var onClickPreventDefault = function (evt) {
          evt.preventDefault();
          uploadElement.removeEventListener('click', onClickPreventDefault);
        };
        uploadElement.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onUploadMousemove);
    document.addEventListener('mouseup', onUploadMouseUp);
  };

  uploadElement.addEventListener('mousedown', onUploadMouseDown);

  // setupArtifactsShop.addEventListener('mousedown', function (evt) {
  //   var elem = evt.target.closest('img');
  //   if (!elem) {
  //     return;
  //   }
  //   onUploadMouseDown(evt);
  // });
})();
