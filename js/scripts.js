const gallery = document.querySelector('.gallery');
let currentUser = null;

// Add modal to the DOM using JS
gallery.insertAdjacentHTML('afterend', `
<div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                    </div>
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>
`);

// Hide modal in the beginning
const modal = document.querySelector('.modal-container');
modal.style.display = "none";

// Allow modal to get closed
document.querySelector('.modal-close-btn').addEventListener('click', () => {
    modal.style.display = "none";
})


// Initialize empty user list
let allUsers = '';


// Function to show and feed the modal
function showAndFeedModal(id) {
    modal.style.display = "inherit";

    // Process date of birth into requested format
    let birthDate = Date.parse(allUsers.results[id].dob.date);
    birthDate = new Date(birthDate);
    birthDate = birthDate.toLocaleString("en-US").split(',')[0];

    // Process phone number into required format
    const phone = allUsers.results[id].phone.substring(0, 5) + ' ' + allUsers.results[id].phone.substring(5 + 1);

    document.querySelector('.modal-info-container').innerHTML = `
    <img class="modal-img" src="${allUsers.results[id].picture.thumbnail}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${allUsers.results[id].name.first} ${allUsers.results[id].name.last}</h3>
                        <p class="modal-text">${allUsers.results[id].email}</p>
                        <p class="modal-text cap">${allUsers.results[id].location.city}</p>
                        <hr>
                        <p class="modal-text">${phone}</p>
                        <p class="modal-text">${allUsers.results[id].location.street.number} ${allUsers.results[id].location.street.name}, ${allUsers.results[id].location.city}, ${allUsers.results[id].location.state}, ${allUsers.results[id].location.postcode}</p>
                        <p class="modal-text">Birthday: ${birthDate}</p>
                    </div>
    `;
}

//Function to display users
function displayUsers(userList) {
    console.log(userList);
    // Add every user to page
    for (var i = 0; i < userList.length; i++) {
        gallery.insertAdjacentHTML('beforeend', `
        <div class="card" id ="${i}">
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
    // Add event listener to all cards 
    const cards = document.querySelectorAll('.card')
    for (var i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', (e) => {
            currentUser = e.currentTarget.id;
            showAndFeedModal(currentUser);
        });
    }
}

// Using fetch() to get users
fetch('https://randomuser.me/api/?results=12&nat=US')
.then(response => response.json())
.then(data => allUsers = data)
.then(data => displayUsers(data.results))
// Catch any errors
.catch(error => {
    gallery.insertAdjacentHTML('beforeend', `Something went wrong. Please try again later.<br>(${error})`);
  });

// Event listeners for next and prev buttons
document.querySelector('#modal-next').addEventListener('click', () => {
    // Make sure to only scroll through when there is still a user left
    currentUser = parseInt(currentUser);
    if (currentUser < allUsers.results.length - 1) {
        currentUser += 1;
        showAndFeedModal(currentUser);
    }
});

document.querySelector('#modal-prev').addEventListener('click', () => {
    // Make sure to only scroll through when there is still a user left
    currentUser = parseInt(currentUser);
    if (currentUser > 0) {
        currentUser -= 1;
        showAndFeedModal(currentUser);
    }
});

// This function performs the search for first or last name    
function performSearch(search){
    let result = [];
    // Search for all users
    for (var i = 0; i < allUsers.results.length; i++) {
        if (allUsers.results[i].name.first.toLowerCase().includes(search) || allUsers.results[i].name.last.toLowerCase().includes(search))
        {
            result.push(allUsers.results[i]);
        }
    }
    if (result.length > 0) {
        // Empty users for search function and call function to display users
        gallery.innerHTML = '';
        displayUsers(result)
        
    } else {
        gallery.innerHTML = 'No results.';
    }
 }   

// Add search container to the DOM using JS
const searchContainer = document.querySelector('.search-container');
searchContainer.insertAdjacentHTML('beforeend', `
<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>
`);

// Listen to keyup on search field
const searchField = document.querySelector('.search-input');
searchField.addEventListener('keyup', (event) => {
    performSearch(searchField.value.toLowerCase());
 });