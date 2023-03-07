import { renderRate } from "./renderRate.js";

let touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';

const calc = document.getElementById('calculate');
calc.addEventListener(touchEvent, (event) => renderRate());