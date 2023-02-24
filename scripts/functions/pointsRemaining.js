import { getDaysRemaining } from "./daysRemaining.js";

//  expected inputs:
//      plan: "banana", "gold", "blue"
//      daysleft: integer
function getMealsRemaining(plan) {
    let {diffDays, nextStart} = getDaysRemaining();
    
    var mealDays = diffDays
    var weeksRemaining = Math.floor(mealDays / 7);
    if (plan != "banana") {
        mealDays -= weeksRemaining;
        if (plan == "blue") {
            mealDays -= weeksRemaining;
        }
    }

    return (mealDays * 3);
}

export function getPointsRemaining(plan) {
    return (getMealsRemaining(plan) * 8.28).toFixed(2);
}