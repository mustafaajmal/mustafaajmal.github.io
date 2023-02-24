import { getDaysRemaining } from "./functions/daysRemaining.js";
import { formatDate } from "./functions/formatDate.js";

let {diffDays, nextStart} = getDaysRemaining();

if (0 < diffDays) {
    document.getElementById("daysleft").innerHTML = `${diffDays} days left in the quarter`;
} else if (diffDays == 0) {
    document.getElementById("daysleft").innerHTML = 'Today is the final day of the quarter!';
} else {
    document.getElementById("daysleft").innerHTML = `The next quarter starts on ${formatDate(nextStart)}`;
}