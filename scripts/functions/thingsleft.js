function daysleft () {

    var starts = [];
    var ends = [];
    for (let i = 0; i < starting_dates.length; i++) {
        starts.push(new Date(starting_dates[i]))
        ends.push(new Date(ending_dates[i]))
    };



    const date = new Date();
    curr_start = starts[0];
    curr_end = ends[0];
    for (let i = 0; starts[i] < date; i++) {
        curr_start = starts[i];
        curr_end = ends[i];
    }
    const diffTime = Math.abs(curr_end - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (0 < diffDays) {
        return diffDays;
    } else {
        return 0;
    }
}


//  expected inputs:
//      plan: "banana", "Gold", "Blue"
//      daysleft: integer
var mealsleft = function (plan) {
    const date = new Date();
    meals = daysleft();
    weeksleft = Math.floor(daysleft() / 7);
    if (plan != 'banana') {
        meals -= weeksleft;
        if (plan != 'gold') {
            meals -= weeksleft;
        }
    }

    return (meals * 3);
}

//  expected input:
//      mealsleft: integer
var pointsleft = function (plan) {
    return (mealsleft(plan) * 8.28).toFixed(2);
}

document.getElementById("daysleft").innerHTML = `${daysleft()} days left in the quarter`;

function display(num) {
    if (num == 1)
    {
        document.getElementById('show').innerHTML = pointsleft('banana');
        document.getElementById('comment').innerHTML = 'Do you really eat 21 meals a week?';
    }
    else if (num == 2)
    {
        document.getElementById('show').innerHTML = pointsleft('gold');
        document.getElementById('comment').innerHTML = 'Eat up or swipe me in, your local starved off campus student';
    }
    else
    {
        document.getElementById('show').innerHTML = pointsleft('blue');
        document.getElementById('comment').innerHTML = 'I am guessing you are not a breakfast person';
    }
}
