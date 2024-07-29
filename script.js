const accessKey = "hqECMEiqwcnLd8fSpNnPNPAv0HZS8D8jAG05V34Fa3o";   //our api key
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");
let keyword = "";
let page = 1;

async function searchImages() {
    const keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    // Clear previous results
    searchResult.innerHTML = '';
    if(page===1)
    {
        searchResult.innerHTML="";
    }

    results.forEach((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;  // Ensure this is the correct property
        image.alt = result.alt_description || 'Image';  // Add alt text for accessibility

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.appendChild(image);

        searchResult.appendChild(imageLink);
    })
    showMoreBtn.style.display="block";
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;  // Reset page number
    searchImages();
});
showMoreBtn.addEventListener("click",()=>{
    page++;
    searchImages();
})
