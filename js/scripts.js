// Add search container to the DOM using JS
const searchContainer = document.querySelector('.search-container');
searchContainer.insertAdjacentHTML('beforeend', `
<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>
`);

const gallery = document.querySelector('.gallery')

//Function to display users
function displayUsers(userList) {
    console.log(userList);
    // Add every user to page
    for (var i = 0; i < userList.length; i++) {
        gallery.insertAdjacentHTML('beforeend', `
        <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${userList[i].picture.thumbnail}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${userList[i].name.first} ${userList[i].name.last}</h3>
            <p class="card-text">${userList[i].email}</p>
            <p class="card-text cap">${userList[i].location.city}, ${userList[i].location.state}</p>
        </div>
        </div>
    `);
    }
}

// Using fetch() to get users
fetch('https://randomuser.me/api/?results=12&nat=US')
.then(response => response.json())
.then(data => displayUsers(data.results))
// Catch any errors
.catch(error => {
    gallery.insertAdjacentHTML('beforeend', `Something went wrong. Please try again later.<br>(${error})`);
  });


// Listen to clicks on user element  
