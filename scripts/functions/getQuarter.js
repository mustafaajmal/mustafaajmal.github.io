 export function getQuarter() {
    let schedule = {
                    "quarters": [
                        {
                            "name": "Winter 23",
                            "startDate": "01/06/23",
                            "endDate": "03/24/23"
                        },
                        {
                            "name": "Spring 23",
                            "startDate": "04/03/23",
                            "endDate": "06/15/23"
                        },
                        {
                            "name": "Fall  23",
                            "startDate": "09/23/23",
                            "endDate": "12/15/23"
                        },
                        {
                            "name": "Winter 24",
                            "startDate": "01/05/24",
                            "endDate": "03/22/24"
                        },
                        {
                            "name": "Spring 24",
                            "startDate": "04/01/24",
                            "endDate": "06/13/24"
                        },
                        {
                            "name": "Fall 24",
                            "startDate": "09/21/24",
                            "endDate": "12/13/24"
                        },
                        {
                            "name": "Winter 25",
                            "startDate": "01/03/25",
                            "endDate": "03/14/25"
                        },
                        {
                            "name": "Spring 25",
                            "startDate": "03/31/25",
                            "endDate": "06/12/25"
                        },
                        {
                            "name": "Fall 25",
                            "startDate": "09/20/25",
                            "endDate": "12/12/25"
                        },
                        {
                            "name": "Winter 26",
                            "startDate": "01/05/26",
                            "endDate": "03/20/26"
                        },
                        {
                            "name": "Spring 26",
                            "startDate": "03/30/26",
                            "endDate": "06/11/26"
                        }
                    ]
                };

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