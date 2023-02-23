import { renderPoints } from "./renderPoints.js";

const banana = document.querySelector('.banana');
banana.addEventListener('click', (event) => renderPoints('banana'));
const gold = document.querySelector('.gold');
gold.addEventListener('click', (event) => renderPoints('gold'));
const blue = document.querySelector('.blue');
blue.addEventListener('click', (event) => renderPoints('blue'));