let chart = document.getElementById("graph1").getContext("2d");

let myChart = new Chart(chart, {
  type: "bar",
  data: {
    labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [523, 900, 342, 535, 698, 729, 834],
        backgroundColor: "rgba(8, 18, 42, 0.842)",
        label: "Calories Burned"
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: "Daily Activity",
      fontSize: 20
    },
    layout: {},
    responsive: false,
    maintainAspectRatio: true,
    defaultFontFamily: (Chart.defaults.global.defaultFontFamily =
      "'Varela Round', sans-serif"),
    defaultFontColor: "#08122a",
    legend: {
      display: false
    }
  }
});

//Algorithm for overall health rating
var totalCalories = data.foods.nutritionalValues.calories;
var sleep = data.sleep.summary.totalMinutesAsleep;
var BMR = 1600;
var total = 0;
var activeTime = data.activity.summary.fairlyActiveMinutes;
var gender = 0;

if ((gender = 0)) {
  totalCalories = 2200 - (BMR + activeTime * 100);
} else {
  totalCalories = 2000 - (BMR + activeTime * 160);
}

if (totalCalories <= 200) {
  total += 2;
} else if (totalCalories >= 200 && totalCalories <= 400) {
  total += 1;
}

if (sleep >= 8 && sleep <= 10) {
  total += 4;
} else if (sleep >= 7 && sleep <= 11) {
  total += 2;
}

if (activeTime >= 1) {
  total += (activeTime / 2) * 4;
}
document.getElementById("righthead").innerHTML =
  "Overall health rating: " + total + "/10";
