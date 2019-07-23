'use strict';

(function () {
  var uploadElement = window.userDialogElement.querySelector('.upload');

  var setupArtifactsShop = window.userDialogElement.querySelector(
      '.setup-artifacts-shop'
  );

  var onMouseDown = function (evtDown, setInstruction) {
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

    var isFirst = true;

    var startCoordinats = new Coordinats(evtDown.clientX, evtDown.clientY);
    var startCoordinatFirst = startCoordinats;

    var onUploadMousemove = function (evtMove) {
      var shiftCoordinats = new Coordinats(
          startCoordinats.x - evtMove.clientX,
          startCoordinats.y - evtMove.clientY
      );

      if (isFirst) {
        isFirst = false;
        if (
          Math.abs(shiftCoordinats.x) < 2 &&
          Math.abs(shiftCoordinats.y) < 2
        ) {
          return;
        }
      }

      startCoordinats = new Coordinats(evtMove.clientX, evtMove.clientY);

      setInstruction(shiftCoordinats, startCoordinatFirst);
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

  var setInstruction1 = function (shiftCoordinats) {
    window.dialog.isDragged = true;

    window.userDialogElement.style.left =
      window.userDialogElement.offsetLeft - shiftCoordinats.x + 'px';
    window.userDialogElement.style.top =
      window.userDialogElement.offsetTop - shiftCoordinats.y + 'px';
  };

  var onUploadMouseDown = function (evt) {
    onMouseDown(evt, setInstruction1);
  };

  uploadElement.addEventListener('mousedown', onUploadMouseDown);

  var onUploadMouseDown2 = function (evt) {
    var elem = evt.target.closest('img');
    if (!elem) {
      return;
    }

    var setInstruction2 = function (shiftCoordinats, startCoordinatFirst) {
      elem.style.position = 'absolute';
      elem.draggable = false;

      elem.style.left = elem.offsetLeft - shiftCoordinats.x + 'px';
      elem.style.top = elem.offsetTop - shiftCoordinats.y + 'px';
    };

    onMouseDown(evt, setInstruction2);

    var instr2MouseUp = function () {
      console.log(100);
      document.removeEventListener('mouseup', instr2MouseUp);
    };

    document.addEventListener('mouseup', instr2MouseUp);
  };

  setupArtifactsShop.addEventListener('mousedown', onUploadMouseDown2);
})();
