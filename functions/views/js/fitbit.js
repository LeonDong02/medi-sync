var vars = {};
window.onload = function() {
  //window.location.replace('https://echacks-892cd.firebaseapp.com/landing?' + decodeURI(window.location.hash.substring(1)));
  let hash = decodeURI(window.location.hash);
  hash.replace(/[#&]+([^=&]+)=?([^&]*)?/gi, (m, key, value) => {
    vars[key] = value;
  });
  let d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  let today = [year, month, day].join('-');
  // get data
  getData(today, '7d').then(data => console.log(data));/*.then(data => fetch('https://echacks-892cd.firebaseapp.com/dashboard', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(data)
  }));*/
}
async function getData(date, period) {
  let data = {};
  data.profile = await fetchData('profile');
  data.heart = await fetchData('activities/heart/date/' + date + '/' + period);
  data.bodyFat = await fetchData('body/log/weight/date/' + date + '/' + period);
  data.bmi = await fetchData('body/bmi/date/' + date + '/' + period);
  return data;
}

function fetchData(url) {
  return fetch('https://api.fitbit.com/1/user/-/' + url + '.json', {
    'method': 'GET',
    'headers': {
      'Authorization': 'Bearer ' + vars.access_token
    }
  }).then(res => res.json()).catch(err => console.log(error));
}
