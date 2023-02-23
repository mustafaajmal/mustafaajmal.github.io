import { getDaysRemaining } from "./functions/daysRemaining.js";

export function renderRate() {
    let userSlugPoints = document.querySelector("#userSlugPoints").value;
    let {diffDays, nextStart} = getDaysRemaining()
    document.getElementById('rate').innerHTML = (+userSlugPoints / diffDays).toFixed(2);
}