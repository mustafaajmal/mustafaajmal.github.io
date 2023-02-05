var getday = function(){
    today = new Date();
    var date = "";
    var dd = today.getDate();
    var mm = today.getMonth(); //As January is 0.
    var yyyy = today.getFullYear();
    var monthList = ['Janurary', 'February', 'March', 
                    'April', 'May', 'June', 'July', 
                    'August', 'September', 'October', 
                    'November', 'December'];
    suff = dd % 10;
if ((4 <= suff && suff <= 9) || suff == 0 || (11 <= dd && dd <= 19)) {
    suff = 'th';
} else if (suff == 1) {
    suff = 'st';
} else if (suff == 2) {
    suff = 'nd';
} else {
    suff = 'rd';
}

    date = `${monthList[mm]} ${dd + suff}, ${yyyy}`; 
    return (date);
};
document.getElementById("date").innerHTML = getday();
