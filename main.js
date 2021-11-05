//Listen for submit
document.querySelector("#zipForm").addEventListener("submit", getLocationInfo);

//Listen for delete
document.querySelector('body').addEventListener('click', deleteLocation);

function getLocationInfo(e) {
  //Get zip value from input
  var zip = document.querySelector('.zip').value;

  //Make request
  fetch(`https://api.zippopotam.us/us/${zip}`)
    .then(response => {
      showIcon('remove');
      if (response.status != 200) {
        document.querySelector('#output').innerHTML = `
        <article class='message message-body is-danger'>Invalid Zipcode, please try again</article>
        `;
        throw Error(response.statusText);
      } else {
        showIcon('check');
        return response.json()
      }
    })
    .then(data => {
      //Show location Info
      var output = '';
      data.places.forEach(place => {
        output += `
        <article class='message is-primary'>
        <div class= 'message-header'>
        <p>Location Info</p>
        <button class="delete"></button>
        </div>
        <div class= 'message-body'>
        <ul>
        <li><strong>City: </strong> ${place['place name']} </li>
        <li><strong>State: </strong> ${place['state']} </li>
        <li><strong>Longitude: </strong> ${place['longitude']} </li>
        <li><strong>Latitue: </strong> ${place['latitue']} </li>
        </ul>
        </div>
        </article>
        `;
      });

      //Insert into output div
      document.querySelector('#output').innerHTML = output;
    })
    .catch(err => console.log(err))

  e.preventDefault();
}

//Show icon check or remove
function showIcon(icon) {
  //Clear icon
  document.querySelector('.icon-remove').style.display = 'none';
  document.querySelector('.icon-check').style.display = 'none';

  //Show correct icon
  document.querySelector(`.icon-${icon}`).style.display = 'inline-flex';
}

function deleteLocation(e) {
  if (e.target.className == 'delete') {
    document.querySelector('.message').remove();
    document.querySelector('zip').value = '';
    document.querySelector('icon-check').remove();
  }
}
