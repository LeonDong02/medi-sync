var vars = {};
window.onload = function() {
  //window.location.replace('https://echacks-892cd.firebaseapp.com/landing?' + decodeURI(window.location.hash.substring(1)));
  let hash = decodeURI(window.location.hash);
  hash.replace(/[#&]+([^=&]+)=?([^&]*)?/gi, (m, key, value) => {
    vars[key] = value;
  });

}

function getData(url) {
  return fetch('https://api.fitbit.com/1/user/-/' + url + '.json', {
    'method': 'GET',
    'headers': {
      'Authorization': 'Bearer ' + vars.access_token
    }
  }).then(res => res.json()).catch(err => console.log(error));
}
