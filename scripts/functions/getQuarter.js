export function getQuarter(schedule) {
    var date = new Date();
    var quarter;

    /* Iterates through the quarter dates until the current date is before the "next" quarter starting date */
    let nextStart;
    let i = -1;
    do {
        i++;
        nextStart = new Date(schedule.quarters[i+1].startDate);
        quarter = schedule.quarters[i];
    } while (date > nextStart);

    return {quarter, nextStart};
}