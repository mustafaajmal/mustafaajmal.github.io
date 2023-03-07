import { getPointsRemaining } from "./functions/pointsRemaining.js";
import { getDaysRemaining } from "./functions/daysRemaining.js";

export function renderPoints(plan) {
    console.log(plan);
    let {diffDays, nextStart} = getDaysRemaining();
    if (0 < diffDays) {
        document.getElementById('pointsRemaining').innerHTML = getPointsRemaining(plan);
        let comment;
        if (plan == 'banana') {
            comment = "Do you really eat 21 meals a week?";
        } else if (plan == 'gold') {
            comment = "Eat up or swipe me in, your local starved off campus student";
        } else {
            comment = "I'm guessing you're not a breakfast person"
        }
        document.getElementById('comment').innerHTML = comment;
    } else if (diffDays == 0) {
        document.getElementById('pointsRemaining').innerHTML = "ZERO";
        document.getElementById('comment').innerHTML = "I hope you spent all of your points!";
    } else {    
        document.getElementById('pointsRemaining').innerHTML = "UMM";
        document.getElementById('comment').innerHTML = "The next quarter hasn't begun!";
    }
}