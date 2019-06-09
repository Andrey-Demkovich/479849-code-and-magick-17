'use strict';

var WIZARDS_PROPERTIES = {
  NAMES: [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ],

  SURNAMES: [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ],

  COATS_COLORS: [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ],

  EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green']
};

var generateRandomInteger = function (min, max) {
  return min + Math.floor((max + 1 - min) * Math.random());
};

var generateWizards = function (properties) {
  var cloneNames = properties.NAMES.slice();
  var wizards = [];

  for (var i = 0; i < properties.SURNAMES.length; i++) {
    wizards[i] = {};

    wizards[i].name =
      cloneNames.splice(generateRandomInteger(0, cloneNames.length - 1), 1) +
      ' ' +
      properties.SURNAMES[i];

    wizards[i].coatColor =
      properties.COATS_COLORS[
        generateRandomInteger(0, properties.COATS_COLORS.length - 1)
      ];

    wizards[i].eyesColor =
      properties.EYES_COLORS[
        generateRandomInteger(0, properties.EYES_COLORS.length - 1)
      ];
  }

  return wizards;
};

console.log(generateWizards(WIZARDS_PROPERTIES));

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
