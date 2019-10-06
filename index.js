/**
* Написание кода — Лев Цыпанов
* Идея — интернет книга по дискретной математике
* Помощь по коду — интернет, учебники по дискретной математике
/**
 * Возвращает координату барицентра формы
 * @param {Array<Array<number>>} shape Список вершин формы для поиска
 * барицентр
 * @return {Array<number>}
 */
const getBarycenter = shape => {
  const min = [Math.min(...shape.map(axis => axis[0])), Math.min(...shape.map(axis => axis[1]))];

  return shape
    .map(axis => [axis[0] - min[0], axis[1] - min[1]])
    .reduce((a, b) => [a[0] + b[0], a[1] + b[1]])
    .map((axis, i) => axis / shape.length + min[i]);
};

/**
 * Создает функцию, которая рисует круги в указанном контексте
 * @param {CanvasRenderingContext2D} context Контекст холста для рисования
 */
const createCircleDrawer = context => {
  /**
   * Рисует круг
   * @param {Array<number>} point Координата центра круга
   * @param {string} [color] Цвет круга
   * @param {number} [radius] Радиус круга
   */
  return function drawCircle(point, color = '#000000', radius = 1) {
    context.beginPath();
    context.arc(point[0], point[1], radius, 0, 2 * Math.PI, false);
    context.fillStyle = color;
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = color;
    context.stroke();
  };
};

/**
 * Функция остановки бегущего чертежа
 * @type {null|Function}
 */
let stopDrawing = null;

/**
 * Начинает рисовать случайные точки
 * @param {HTMLCanvasElement} canvas Рисует на холсте
 * @param {Array<Array<number>>} attractors Список точек для привлечения
 * @param {(a, v) => v} formula Формула для расчета следующей точки
 * @param {number} [delay=0] Задержка между точками рисунка в миллисекундах
 * @param {(dot: number) => void} [callback] Обратный вызов каждого точечного рисунка
 * @returns Функция остановки
 */
const startChaosGame = (canvas, attractors, formula, delay = 0, callback) => {
  const context = canvas.getContext('2d');
  const drawPoint = createCircleDrawer(context);

  //  Остановка предыдущего рисунка
  if (stopDrawing) {
    stopDrawing();
  }

  // Прозрачный холст
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Рисование аттракторов
  for (const vertex of attractors) {
    drawPoint(vertex, '#48f', 2);
  }

  /** Создает случайную точку на основе предыдущего */
  const createNextDotCoordinate = prevDot => {
    const attractor = attractors[(Math.random() * attractors.length) | 0];

    return [formula(attractor[0], prevDot[0]), formula(attractor[1], prevDot[1])];
  };

  // Начальная точка
  let currentDot = getBarycenter(attractors);
  drawPoint(currentDot, '#f00', 2);

  // Счетчик точек
  let dotCount = 0;

  const interval = setInterval(() => {
    currentDot = createNextDotCoordinate(currentDot);
    drawPoint(currentDot, '#fff');

    dotCount += 1;

    if (dotCount) {
      callback(dotCount);
    }
  }, delay);

  return function stop() {
    clearInterval(interval);
  };
};
