'use strict';

var WIZARDS_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var WIZARDS_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var COATS_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var generateRandomInteger = function (min, max) {
  return min + Math.floor((max + 1 - min) * Math.random());
};

var generateWizards = function (names, surnames, coatsColors, eyesColors) {
  var cloneNames = names.slice();
  var wizards = [];

  for (var i = 0; i < surnames.length; i++) {
    wizards[i] = {};

    wizards[i].name =
      cloneNames.splice(generateRandomInteger(0, cloneNames.length - 1), 1) +
      ' ' +
      surnames[i];

    wizards[i].coatColor =
      coatsColors[generateRandomInteger(0, coatsColors.length - 1)];

    wizards[i].eyesColor =
      eyesColors[generateRandomInteger(0, eyesColors.length - 1)];
  }

  return wizards;
};

console.log(
    generateWizards(WIZARDS_NAMES, WIZARDS_SURNAMES, COATS_COLORS, EYES_COLORS)
);

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
