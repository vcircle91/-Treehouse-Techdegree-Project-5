// Add search container to the DOM using JS
const searchContainer = document.querySelector('.search-container');
searchContainer.insertAdjacentHTML('beforeend', `
<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>
`);