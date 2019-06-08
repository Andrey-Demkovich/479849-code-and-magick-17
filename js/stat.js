'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_HEIGHT = 16;
var GAP_X = 50;
var LINE_HEIGHT = FONT_HEIGHT + GAP;
var BAR_MAX = 150;
var BAR_WIDTH = 40;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.textAlign = 'center';
  ctx.fillText('Ура вы победили!', CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + GAP);
  ctx.fillText(
      'Список результатов:',
      CLOUD_X + CLOUD_WIDTH / 2,
      CLOUD_Y + GAP + LINE_HEIGHT
  );

  var maxTime = getMaxElement(times);

  ctx.textAlign = 'start';

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';

    ctx.fillText(
        Math.round(times[i]),
        CLOUD_X + GAP_X + (BAR_WIDTH + GAP_X) * i,
        CLOUD_Y +
        GAP +
        LINE_HEIGHT * 2 +
        BAR_MAX -
        (times[i] * BAR_MAX) / maxTime,
        BAR_WIDTH,
        (times[i] * BAR_MAX) / maxTime
    );
    ctx.fillText(
        names[i],
        CLOUD_X + GAP_X + (BAR_WIDTH + GAP_X) * i,
        CLOUD_Y + GAP + LINE_HEIGHT * 3 + GAP + BAR_MAX
    );

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle =
        'hsla(240, 100%,' +
        times[i].toFixed()[2] +
        times[i].toFixed()[3] +
        '%, 1)';
    }

    ctx.fillRect(
        CLOUD_X + GAP_X + (BAR_WIDTH + GAP_X) * i,
        CLOUD_Y +
        GAP +
        LINE_HEIGHT * 3 +
        BAR_MAX -
        (times[i] * BAR_MAX) / maxTime,
        BAR_WIDTH,
        (times[i] * BAR_MAX) / maxTime
    );
  }
};
