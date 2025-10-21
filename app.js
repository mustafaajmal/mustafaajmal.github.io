// ===== helpers / utilities =====
function formatDate(date) {
  const dd = date.getDate();   // day of month
  const mm = date.getMonth();  // month 0-11
  const year = date.getFullYear();
  const monthList = [
    'Janurary','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];

  // suffix rules (except 11–19)
  let suff;
  const lsd = dd % 10;
  if ((4 <= lsd && lsd <= 9) || lsd === 0 || (11 <= dd && dd <= 19)) suff = 'th';
  else if (lsd === 1) suff = 'st';
  else if (lsd === 2) suff = 'nd';
  else if (lsd === 3) suff = 'rd';

  return `${monthList[mm]} ${dd + suff}, ${year}`;
}

function getQuarter() {
  const schedule = {
    quarters: [
      // ---- 2022 ----
      { name: "Summer 22", startDate: "06/20/22", endDate: "08/26/22" },
      { name: "Fall 22",   startDate: "09/17/22", endDate: "12/09/22" },

      // ---- 2023 ----
      { name: "Winter 23", startDate: "01/06/23", endDate: "03/24/23" },
      { name: "Spring 23", startDate: "04/03/23", endDate: "06/15/23" },
      { name: "Summer 23", startDate: "06/26/23", endDate: "09/01/23" },
      { name: "Fall  23",  startDate: "09/23/23", endDate: "12/15/23" },

      // ---- 2024 ----
      { name: "Winter 24", startDate: "01/05/24", endDate: "03/22/24" },
      { name: "Spring 24", startDate: "04/01/24", endDate: "06/13/24" },
      { name: "Summer 24", startDate: "06/24/24", endDate: "08/30/24" },
      { name: "Fall 24",   startDate: "09/21/24", endDate: "12/13/24" },

      // ---- 2025 ----
      { name: "Winter 25", startDate: "01/03/25", endDate: "03/21/25" },
      { name: "Spring 25", startDate: "03/31/25", endDate: "06/12/25" },
      { name: "Summer 25", startDate: "06/23/25", endDate: "08/29/25" },
      { name: "Fall 25",   startDate: "09/20/25", endDate: "12/12/25" },

      // ---- 2026 ----
      { name: "Winter 26", startDate: "01/05/26", endDate: "03/20/26" },
      { name: "Spring 26", startDate: "03/30/26", endDate: "06/11/26" },
      { name: "Summer 26", startDate: "06/22/26", endDate: "08/28/26" },
      { name: "Fall 26",   startDate: "09/19/26", endDate: "12/11/26" },

      // ---- 2027 ----
      { name: "Winter 27", startDate: "01/04/27", endDate: "03/19/27" },
      { name: "Spring 27", startDate: "03/29/27", endDate: "06/10/27" },
      { name: "Summer 27", startDate: "06/21/27", endDate: "08/27/27" },
      { name: "Fall 27",   startDate: "09/18/27", endDate: "12/10/27" },

      // ---- 2028 ----
      { name: "Winter 28", startDate: "01/07/28", endDate: "03/24/28" },
      { name: "Spring 28", startDate: "04/03/28", endDate: "06/15/28" },
      { name: "Summer 28", startDate: "06/26/28", endDate: "09/01/28" },
      { name: "Fall 28",   startDate: "09/23/28", endDate: "12/15/28" },

      // ---- 2029 ----
      { name: "Winter 29", startDate: "01/05/29", endDate: "03/23/29" },
      { name: "Spring 29", startDate: "04/02/29", endDate: "06/14/29" },
      { name: "Summer 29", startDate: "06/25/29", endDate: "08/31/29" },
      { name: "Fall 29",   startDate: "09/22/29", endDate: "12/14/29" },

      // ---- 2030 ----
      { name: "Winter 30", startDate: "01/04/30", endDate: "03/22/30" },
      { name: "Spring 30", startDate: "04/01/30", endDate: "06/13/30" },
      { name: "Summer 30", startDate: "06/24/30", endDate: "08/30/30" },
      { name: "Fall 30",   startDate: "09/21/30", endDate: "12/13/30" },

      // ---- 2031 ----
      { name: "Winter 31", startDate: "01/03/31", endDate: "03/21/31" },
      { name: "Spring 31", startDate: "03/31/31", endDate: "06/12/31" },
      { name: "Summer 31", startDate: "06/23/31", endDate: "08/29/31" }
    ]
  };

  const date = new Date();
  let quarter;
  let nextStart;
  let i = -1;

  // iterate until current date is before the next quarter's start
  do {
    i++;
    const next = schedule.quarters[i + 1];
    nextStart = new Date(next ? next.startDate : schedule.quarters[i].endDate);
    quarter = schedule.quarters[i];
  } while (date > nextStart && i < schedule.quarters.length - 1);

  return { quarter, nextStart };
}

function getDaysRemaining() {
  const { quarter, nextStart } = getQuarter();
  const quarterEnd = new Date(quarter.endDate);
  const now = new Date();
  const diffTime = quarterEnd - now;                 // ms
  const diffDays = Math.ceil(diffTime / 86400000);   // ms -> days
  return { diffDays, nextStart };
}

/* ---------------- plan data + updated points math (no per-meal price) ---------------- */

const PLANS = {
  blue:   { pointsPerQuarter: 1359, weeklyAvg: 124 },
  gold:   { pointsPerQuarter: 1905, weeklyAvg: 173 },
  banana: { pointsPerQuarter: 2592, weeklyAvg: 236 }
};

// Target points you *should* have left right now for a given plan
function getPointsRemaining(plan) {
  const planKey = (plan || "").toLowerCase();
  const planInfo = PLANS[planKey];
  if (!planInfo) return "--";

  // current quarter boundaries
  const { quarter } = getQuarter();
  const start = new Date(quarter.startDate);
  const end   = new Date(quarter.endDate);

  // days left in quarter (ceil'd)
  const { diffDays } = getDaysRemaining();

  // total days in quarter
  const totalDays = Math.ceil((end - start) / 86400000);

  // If before quarter starts, UI already handles this branch; return 0 just in case
  if (diffDays < 0) return "0.00";

  // Proportional budget remaining
  const remaining = planInfo.pointsPerQuarter * (diffDays / totalDays);
  return remaining.toFixed(2);
}

/* ------------------------------------------------------------------------------------- */

// ===== renderers =====
function renderPoints(plan) {
  console.log(plan);
  const { diffDays } = getDaysRemaining();

  if (0 < diffDays) {
    const pointsEl = document.getElementById('pointsRemaining');
    const commentEl = document.getElementById('comment');
    if (pointsEl) pointsEl.textContent = getPointsRemaining(plan);

    let comment;
    if (plan === 'banana') {
      comment = "Do you really eat 21 meals a week?";
    } else if (plan === 'gold') {
      comment = "Eat up or swipe me in, your local starved off campus student";
    } else {
      comment = "I'm guessing you're not a breakfast person";
    }
    if (commentEl) commentEl.textContent = comment;

  } else if (diffDays === 0) {
    const pointsEl = document.getElementById('pointsRemaining');
    const commentEl = document.getElementById('comment');
    if (pointsEl) pointsEl.textContent = "ZERO";
    if (commentEl) commentEl.textContent = "I hope you spent all of your points!";
  } else {
    const pointsEl = document.getElementById('pointsRemaining');
    const commentEl = document.getElementById('comment');
    if (pointsEl) pointsEl.textContent = "UMM";
    if (commentEl) commentEl.textContent = "The next quarter hasn't begun!";
  }
}

function renderRate() {
  const { diffDays } = getDaysRemaining();
  const input = document.querySelector(".pointRate");
  const rateEl = document.getElementById('rate');
  if (!input || !rateEl) return;

  const userSlugPoints = +input.value;
  if (diffDays > 0) {
    rateEl.textContent = (userSlugPoints / diffDays).toFixed(2);
  } else {
    rateEl.textContent = "--";
  }
}

// ===== page setup / event wiring =====
(function init() {
  // date
  const dateEl = document.getElementById("date");
  if (dateEl) dateEl.textContent = formatDate(new Date());

  // days remaining
  const daysEl = document.getElementById("daysleft");
  if (daysEl) {
    const { diffDays, nextStart } = getDaysRemaining();
    if (0 < diffDays) {
      daysEl.textContent = `${diffDays} days left in the quarter`;
    } else if (diffDays === 0) {
      daysEl.textContent = 'Today is the final day of the quarter!';
    } else {
      daysEl.textContent = `The next quarter starts on ${formatDate(nextStart)}`;
    }
  }

  // buttons & interactions
  const touchEvent = ('ontouchstart' in window) ? 'touchstart' : 'click';

  // meal plan buttons
  const banana = document.getElementById('banana');
  const gold   = document.getElementById('gold');
  const blue   = document.getElementById('blue');

  banana?.addEventListener(touchEvent, () => renderPoints('banana'));
  gold?.addEventListener(touchEvent,   () => renderPoints('gold'));
  blue?.addEventListener(touchEvent,   () => renderPoints('blue'));

  // debug logs (optional)
  console.log(touchEvent);
  console.log(banana);

  // calculator button
  const calcBtn = document.getElementById('calculate');
  calcBtn?.addEventListener(touchEvent, () => renderRate());
})();
