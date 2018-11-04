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
  getData(today, '7d').then(data => saveData(data));
}
async function getData(date, period) {
  let data = {};
  data.profile = await fetchData('profile');
  data.heart = await fetchData('activities/heart/date/' + date + '/' + period);
  data.bodyFat = await fetchData('body/log/weight/date/' + date + '/' + period);
  data.bmi = await fetchData('body/bmi/date/' + date + '/' + period);
  data.calories = await fetchData('foods/log/date/' + date);
  data.sleep = await fetchData('sleep/date/' + date);
  data.activity = await fetchData('activities/date/' + date);
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

function saveData(data) {
  // save data to firebase under user id
  database.ref('users/' + vars.user_id).set(data);
  // redirect to /dashboard/<user_id>
  window.location.replace('/dashboard/' + vars.user_id);
}
