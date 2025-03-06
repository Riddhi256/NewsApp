const API_KEY = "ce49146f9112480b9b7c52a83bf878c8";
const url = "https://newsapi.org/v2/everything?q=";

document.addEventListener("DOMContentLoaded", () => {
    fetchNews("India"); // Load default news
});

async function fetchNews(query) {
    try {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        const data = await res.json();
        if (data.articles) {
            bindData(data.articles);
        }
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

function bindData(articles) {
    const contentContainer = document.querySelector(".content");
    contentContainer.innerHTML = ""; // Clear previous content

    articles.slice(0, 8).forEach((article) => {  // Display up to 8 articles
        if (!article.urlToImage) return;

        const card = document.createElement("div");
        card.className = "card my-3 mx-2";
        card.style.width = "18rem";
        card.innerHTML = `
            <img src="${article.urlToImage}" class="card-img-top news-img" alt="News Image">
            <div class="card-body">
                <h5 class="card-title news-title">${article.title}</h5>
                <p class="card-text news-text">${article.description || "No description available."}</p>
                <a href="${article.url}" target="_blank" class="btn btn-primary">Read More</a>
            </div>
        `;
        contentContainer.appendChild(card);
    });
}

// Handle navigation clicks
document.querySelectorAll(".nav-link").forEach((navItem) => {
    navItem.addEventListener("click", (event) => {
        event.preventDefault();
        const category = navItem.textContent.trim();
        fetchNews(category);
        setActiveNav(navItem);
    });
});

let curSelectedNav = null;
function setActiveNav(selectedNav) {
    curSelectedNav?.classList.remove("active");
    curSelectedNav = selectedNav;
    curSelectedNav.classList.add("active");
}

// Search Functionality
document.querySelector(".btn-outline-success").addEventListener("click", (event) => {
    event.preventDefault();
    const searchInput = document.querySelector(".form-control");
    const query = searchInput.value.trim();
    if (query) {
        fetchNews(query);
        curSelectedNav?.classList.remove("active");
        curSelectedNav = null;
    }
});

// Pagination Handling (for future expansion)
document.querySelectorAll(".pagination button").forEach((button) => {
    button.addEventListener("click", (event) => {
        alert("Pagination feature coming soon!");
    });
});
