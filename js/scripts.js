// Add search container to the DOM using JS
const searchContainer = document.querySelector('.search-container');
searchContainer.insertAdjacentHTML('beforeend', `
<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>
`);

const gallery = document.querySelector('.gallery');

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

// Initialize empty user list
let allUsers = '';

// Hide modal in the beginning
const modal = document.querySelector('.modal-container');
modal.style.display = "none";

// Function to show and feed the modal
function showAndFeedModal(id) {
    modal.style.display = "inherit";

    // Process date of birth into requested format
    let birthDate = Date.parse(allUsers.results[id].dob.date);
    birthDate = new Date(birthDate);
    birthDate = birthDate.toLocaleString("en-US").slice(0, 10);

    // Process phone number into required format
    var index = 5;
    const phone = allUsers.results[id].phone.substring(0, index) + ' ' + allUsers.results[id].phone.substring(index + 1);

    document.querySelector('.modal-info-container').insertAdjacentHTML('beforeend', `
    <img class="modal-img" src="${allUsers.results[id].picture.thumbnail}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${allUsers.results[id].name.first} ${allUsers.results[id].name.last}</h3>
                        <p class="modal-text">${allUsers.results[id].email}</p>
                        <p class="modal-text cap">${allUsers.results[id].location.city}</p>
                        <hr>
                        <p class="modal-text">${phone}</p>
                        <p class="modal-text">${allUsers.results[id].location.street.number} ${allUsers.results[id].location.street.name}, ${allUsers.results[id].location.city}, ${allUsers.results[id].location.state} ${allUsers.results[id].location.postcode}</p>
                        <p class="modal-text">Birthday: ${birthDate}</p>
                    </div>
    `);
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
            showAndFeedModal(e.currentTarget.id);
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