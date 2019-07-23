'use strict';

var WizardProperty = {
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

  EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],

  FIREBALL_COLORS: [
    // 'rgb(238, 72, 48)',
    '#ee4830',
    // 'rgb(48, 168, 238)',
    '#30a8ee',
    // 'rgb(92, 230, 192)',
    '#5ce6c0',
    // 'rgb(232, 72, 213)',
    '#e848d5',
    // 'rgb(230, 232, 72)'
    '#e6e848'
  ]
};

// Коды клавиш Esc и Enter:
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var USER_DIALOG_LEFT = '50%';
var USER_DIALOG_TOP = '80px';

var userDialogElement = document.querySelector('.setup');
var similarListElement = userDialogElement.querySelector('.setup-similar-list');
var setupCloseElement = userDialogElement.querySelector('.setup-close');
var setupUserNameElement = userDialogElement.querySelector('.setup-user-name');
var setupOpenElement = document.querySelector('.setup-open');
var setupOpenIconElement = setupOpenElement.querySelector('.setup-open-icon');
var similarWizardTemplate = document
  .querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');

var generateRandomInteger = function (min, max) {
  return min + Math.floor((max + 1 - min) * Math.random());
};

var generateWizards = function (properties) {
  var cloneNames = properties.NAMES.slice();
  var cloneSurnames = properties.SURNAMES.slice();
  var wizards = [];

  properties.SURNAMES.forEach(function (item, i) {
    wizards[i] = {};

    wizards[i].name =
      cloneNames.splice(generateRandomInteger(0, cloneNames.length - 1), 1) +
      ' ' +
      cloneSurnames.splice(generateRandomInteger(0, cloneNames.length - 1), 1);

    wizards[i].coatColor =
      properties.COATS_COLORS[
        generateRandomInteger(0, properties.COATS_COLORS.length - 1)
      ];

    wizards[i].eyesColor =
      properties.EYES_COLORS[
        generateRandomInteger(0, properties.EYES_COLORS.length - 1)
      ];
  });

  return wizards;
};

var createWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

userDialogElement.querySelector('.setup-similar').classList.remove('hidden');

var wizardsCreateFragmentAppend = function () {
  var wizards = generateWizards(WizardProperty);

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 4; i++) {
    fragment.appendChild(createWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

wizardsCreateFragmentAppend();

// Открытие/закрытие окна настройки персонажа:
// Обработчик закрытия окна при нажатии Esc
var onDialogEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    onCloseDialog();
  }
};

// Обработчик открытия окна
var onOpenDialog = function () {
  userDialogElement.classList.remove('hidden');

  // ****Удаляем обработчик открытия окна при открытом окне
  setupOpenElement.removeEventListener('click', onOpenDialog);

  // Закрытие окна при клике на Х или нажатии на нем Enter
  setupCloseElement.addEventListener('click', onCloseDialog);
  setupCloseElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      onCloseDialog();
    }
  });

  // +++++ Закрытие окна при нажатии Esc
  document.addEventListener('keydown', onDialogEscPress);
  // Если фокус находится на форме ввода имени, то окно закрываться не должно
  setupUserNameElement.addEventListener('focus', function () {
    document.removeEventListener('keydown', onDialogEscPress);
  });
  setupUserNameElement.addEventListener('blur', function () {
    document.addEventListener('keydown', onDialogEscPress);
  });
};

// Обработчик закрытия окна
var onCloseDialog = function () {
  userDialogElement.classList.add('hidden');

  // Возвращаем обработчик открытия окна (смотри строку ****)
  setupOpenElement.addEventListener('click', onOpenDialog);

  // Удалям событие закрытия окна при нажатии Esc (смотри строку ++++)
  document.removeEventListener('keydown', onDialogEscPress);

  // Если окно перетаскивалось возвращаем его на штатное место
  if (window.dialog.isDragged) {
    window.userDialogElement.style.left = USER_DIALOG_LEFT;
    window.userDialogElement.style.top = USER_DIALOG_TOP;
  }
};

setupOpenElement.addEventListener('click', onOpenDialog);

setupOpenIconElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onOpenDialog();
  }
});

var setupPlayerElement = userDialogElement.querySelector('.setup-player');
var setupWizardCoatElement = setupPlayerElement.querySelector(
    '.setup-wizard .wizard-coat'
);
var setupWizardEyesElement = setupPlayerElement.querySelector(
    '.setup-wizard .wizard-eyes'
);
var setupFireballWrapElement = setupPlayerElement.querySelector(
    '.setup-fireball-wrap'
);

// Обработчик - Меняет цвет элемента мага при нажатии на него
var onWizardPropertyClick = function (
    properties,
    userPropertyElement,
    cssProperty,
    inputName
) {
  // Генерируем случайный цвет, если цвет повторяется берем другой случайный
  do {
    var userProperty =
      properties[generateRandomInteger(0, properties.length - 1)];
  } while (userProperty === userPropertyElement.style[cssProperty]);

  // Меняем цвет
  userPropertyElement.style[cssProperty] = userProperty;

  // Записываем цвет в input
  setupPlayerElement.querySelector(
      'input[name = ' + inputName + ']'
  ).value = userProperty;
};

// При клике меняем цвет мантии
setupWizardCoatElement.addEventListener('click', function () {
  onWizardPropertyClick(
      WizardProperty.COATS_COLORS,
      setupWizardCoatElement,
      'fill',
      'coat-color'
  );
});

// При клике меняем цвет глаз
setupWizardEyesElement.addEventListener('click', function () {
  onWizardPropertyClick(
      WizardProperty.EYES_COLORS,
      setupWizardEyesElement,
      'fill',
      'eyes-color'
  );
});

// При клике меняем цвет файербола
setupFireballWrapElement.addEventListener('click', function () {
  onWizardPropertyClick(
      WizardProperty.FIREBALL_COLORS,
      setupFireballWrapElement,
      'background',
      'fireball-color'
  );
});
