/**
* Написание кода — Лев Цыпанов
* Идея — интернет книга по дискретной математике
* Помощь по коду — интернет, учебники по дискретной математике
/**
 * Возвращает вершины равностороннего треугольника, который вписывается в заданную область
 * @param {number} width Ширина холста
 * @param {number} height Высота холста
 * @param {number} [padding] Обивка от края холста
 * @returns {Array<Array<number>>} Список координат точек
 */
const createTriangle = (width, height, padding) => {
  if (padding) {
    const triangle = createTriangle(width - padding * 2, height - padding * 2);

    return triangle.map(vertex => vertex.map(axis => axis + padding));
  }

  //     B
  //    /|\
  // a / |h\ a
  //  /__|__\
  // A       C

  const h = height;
  const a = h / (Math.sqrt(3) / 2);

  const A = [width / 2 - a / 2, height];
  const B = [width / 2, 0];
  const C = [width / 2 + a / 2, height];

  return [A, B, C];
};

const createHexagon = (width, height, padding) => {
  if (padding) {
    const hexagon = createHexagon(width - padding * 2, height - padding * 2);

    return hexagon.map(vertex => vertex.map(axis => axis + padding));
  }

  // https://ege.sdamgia.ru/get_file?id=22943
  const a = height / 2;
  const AE = a * Math.sqrt(3);

  const A = [width / 2, height];
  const B = [width / 2 + AE / 2, height - a / 2];
  const C = [width / 2 + AE / 2, a / 2];
  const D = [width / 2, 0];
  const E = [width / 2 - AE / 2, a / 2];
  const F = [width / 2 - AE / 2, height - a / 2];

  return [A, B, C, D, E, F];
};

const createCarpet = (width, height, padding) => {
  if (padding) {
    const square = createCarpet(width - padding * 2, height - padding * 2);

    return square.map(vertex => vertex.map(axis => axis + padding));
  }

  // B  ___G__  C
  //   |      |
  // F |      | H
  //   |______|
  // A    E     D

  const a = height;

  const A = [width / 2 - a / 2, a];
  const B = [width / 2 - a / 2, 0];
  const C = [width / 2 + a / 2, 0];
  const D = [width / 2 + a / 2, a];

  const E = [width / 2, a];
  const F = [width / 2 - a / 2, a / 2];
  const G = [width / 2, 0];
  const H = [width / 2 + a / 2, a / 2];

  return [A, B, C, D, E, F, G, H];
};
