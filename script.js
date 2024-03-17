// function for homepage
document.addEventListener('DOMContentLoaded', function() {
    // Add click event listener to "Read More" buttons
    const readMoreButtons = document.querySelectorAll('.btn-primary');
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default behavior of anchor tag
            const newsTitle = event.target.closest('.card').querySelector('.card-title').textContent;
            alert(`You clicked on "${newsTitle}".`);
            // Redirect to detail page
            // window.location.href = event.target.getAttribute('href');
        });
    });

    // Fetch news data from News API
    fetch('https://newsapi.org/v2/everything?domains=wsj.com&apiKey=cd9fc896760d48e1846ccaa749723a34')
        .then(response => response.json())
        .then(data => {
            // Handle fetched news data
            const articles = data.articles;
            articles.forEach((article, index) => {
                // Display fetched news data (for demonstration purpose, you can adjust as needed)
                const newsList = document.getElementById('news-list');
                const newsItem = document.createElement('div');
                newsItem.classList.add('card', 'mb-3');
                newsItem.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text">${article.description}</p>
                        <a href="${article.url}" class="btn btn-primary" target="_blank">Read More</a>
                    </div>
                `;
                newsList.appendChild(newsItem);
            });
        })
        .catch(error => {
            console.error('Error fetching news data:', error);
        });

    // Add click event listener to navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default behavior of anchor tag
            const pageName = event.target.textContent.toLowerCase();
            alert(`You clicked on "${pageName}" link.`);
            // Redirect to corresponding page
            // window.location.href = event.target.getAttribute('href');
        });
    });
});


// Function to fetch news data from the News API and populate the detail page
async function fetchAndPopulateNews() {
    try {
      const response = await fetch('https://newsapi.org/v2/everything?domains=wsj.com&apiKey=cd9fc896760d48e1846ccaa749723a34');
      const data = await response.json();
  
      // Check if data is retrieved successfully
      if (data.status === 'ok') {
        // Get the first article from the response
        const article = data.articles[0];
  
        // Update HTML elements with the article information
        document.getElementById('newsTitle').innerText = article.title;
        document.getElementById('newsImage').src = article.urlToImage;
        document.getElementById('newsContent').innerText = article.content;
      } else {
        console.error('Failed to retrieve news data');
      }
    } catch (error) {
      console.error('Error fetching news data:', error);
    }
  }
  
  // Call the fetchAndPopulateNews function when the DOM content is loaded
  document.addEventListener('DOMContentLoaded', fetchAndPopulateNews);
  

// function for list page
  document.addEventListener('DOMContentLoaded', function() {
    // Add click event listener to navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default behavior of anchor tag
            const pageName = event.target.textContent.toLowerCase();
            alert(`You clicked on "${pageName}" link.`);
            // Redirect to corresponding page
            // window.location.href = event.target.getAttribute('href');
        });
    });

    // Function to fetch news data from the API
    function fetchNewsData(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Handle the fetched news data
                console.log(data);
                // Here you can handle the response data and update the UI accordingly
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    // Add click event listener to news type links
    const newsTypeLinks = document.querySelectorAll('.list-group-item a');
    newsTypeLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default behavior of anchor tag
            const newsType = event.target.textContent.toLowerCase();
            alert(`You clicked on "${newsType}" news type.`);
            const apiKey = 'cd9fc896760d48e1846ccaa749723a34';
            const newsAPIUrl = `https://newsapi.org/v2/everything?domains=wsj.com&q=${newsType}&apiKey=${apiKey}`;
            fetchNewsData(newsAPIUrl);
            // Redirect to detail page for the selected news type
            // window.location.href = event.target.getAttribute('href');
        });
    });
});
