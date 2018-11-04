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
