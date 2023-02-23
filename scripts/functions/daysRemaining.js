import { getQuarter } from "./getQuarter.js";
import schedule from "./quarters.json" assert {type: 'json'};

export function getDaysRemaining () {
    var {quarter, nextStart} = getQuarter(schedule);
    var quarterEnd = new Date(quarter.endDate);

    var date = new Date;

    const diffTime = quarterEnd - date;     // in milliseconds
    const diffDays = Math.ceil(diffTime / 86400000);   // conversion from milliseconds to days;
    return {diffDays, nextStart};
}