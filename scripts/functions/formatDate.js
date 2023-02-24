export function formatDate(date) {
    var dd = date.getDate();   //  day of month
    var mm = date.getMonth();  //  month 0-11
    var year = date.getFullYear();
    var monthList = ['Janurary',  'February',  'March', 
                     'April',     'May',      'June', 
                     'July',      'August',   'September', 
                     'October',   'November', 'December'];

    /*  The suffix of an integer depends on the least significant digit. 
        Unless its 11-19 cuz language is weird */
    var suff;
    var lsd = dd % 10; //  least significant digit of date

    /* These are the rules for number suffixes */
    if ((4 <= lsd && lsd <= 9) || lsd == 0 || (11 <= dd && dd <= 19)) {
        suff = 'th';
    } else if (lsd == 1) {
        suff = 'st';
    } else if (lsd == 2) {
        suff = 'nd';
    } else if (lsd == 3) {
        suff = 'rd';
    }

    return `${monthList[mm]} ${dd + suff}, ${year}`; 
};
