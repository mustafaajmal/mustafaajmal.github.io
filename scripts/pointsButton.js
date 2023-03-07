import { renderPoints } from "./renderPoints.js";

let touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';

const banana = document.getElementById('banana');
banana.addEventListener(touchEvent, (event) => renderPoints('banana'));
console.log(touchEvent);
console.log(banana); 

const gold = document.getElementById('gold');
gold.addEventListener(touchEvent, (event) => renderPoints('gold'));

const blue = document.getElementById('blue');
blue.addEventListener(touchEvent, (event) => renderPoints('blue'));