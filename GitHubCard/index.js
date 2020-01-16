/* Step 1: using axios, send a GET request to the following URL 
           (replacing the placeholder with your Github name):
           https://api.github.com/users/<your name>
*/
const mainUser = 'fireblastdaniel';
const usersArray = [];

function addCardToPage(username){
  const cards = document.querySelector('.cards')
  axios.get(`https://api.github.com/users/${username}`)
  .then( response => {
    cards.append(createCard(response.data))
  })
  .catch( error => {
    console.log('the data was not returned', error)
  })
}

usersArray.push(mainUser);
axios.get(`https://api.github.com/users/${mainUser}/followers`)
.then( response => {
  response.data.forEach( item => {
    usersArray.push(item.login);
  })
})
.catch( error => {
  console.log('the data was not returned', error)
})

setTimeout(function(){
  usersArray.forEach(item => {
    addCardToPage(item);
  });
}, 500)

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/
function createCard(user){
  const card = document.createElement('div');
  const cardImg = document.createElement('img');
  const cardInfo = document.createElement('div');
  const cardName = document.createElement('h3');
  const cardUserName = document.createElement('p');
  const cardLocation = document.createElement('p');
  const cardProfile = document.createElement('p');
  const cardAddress = document.createElement('a');
  const cardFollowers = document.createElement('p');
  const cardFollowing = document.createElement('p');
  const cardBio = document.createElement('p');

  card.classList.add('card');
  cardInfo.classList.add('card-info');
  cardName.classList.add('name');
  cardUserName.classList.add('username');

  card.append(cardImg);
  card.append(cardInfo);
  cardInfo.append(cardName);
  cardInfo.append(cardUserName);
  cardInfo.append(cardLocation);
  cardInfo.append(cardProfile);
  cardInfo.append(cardFollowers);
  cardInfo.append(cardFollowing);
  cardInfo.append(cardBio);

  cardImg.src = user.avatar_url;
  cardName.textContent = user.name;
  cardUserName.textContent = user.login;
  cardLocation.textContent = `Location: ${user.location}`;
  // cardAddress.textContent = user.html_url;
  // cardAddress.href = user.html_url;
  const anchor = user.html_url;
  cardAddress.innerHTML = anchor.link(user.html_url);
  cardProfile.innerHTML = `Profile: ${cardAddress.outerHTML}`;
  cardFollowers.textContent = `Follwers: ${user.followers}`;
  cardFollowing.textContent = `Following: ${user.following}`;
  cardBio.textContent = `Bio: ${user.bio}`;

  return card;
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
