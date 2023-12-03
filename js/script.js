// URLs to for the API
const baseUrl = 'https://www.themealdb.com/api/json/v1/1/';
let url;

// Variables
const stuNum = document.querySelector('#stuNum');
const stuNumBtn = document.querySelector('#stuNumBtn');
const form = document.querySelector('form');
const section = document.querySelector('section');

// Event Listeners
// Dynamically added my student id and name
stuNumBtn.addEventListener('click', function () {
    stuNum.textContent = '200535561 Dain Shin';
});

// If the submit is clicked, fetchResults function will be called
form.addEventListener('submit', fetchResults);

// Functions 
// This function will get the data we want
function fetchResults(event) {
    // This is to prevent the default submit event(transmitting the data)
    event.preventDefault();

    // Those are the variables for input sections
    const letter = document.getElementById('letter').value.trim(); 
    const word = document.getElementById('word').value.trim();

    // Users can search for the recipe either by the first letter of the name or the full name
    // The value of the URL will be decided according to the input value
    if(letter !== '' && letter !== null) {
        url = baseUrl + 'search.php?f=' + letter;
    } else{
        url = baseUrl + 'search.php?s=' + word;
    } 

    // This makes the request, recieves the response and call the showResults function with the JSON data
    fetch(url)
    .then(res => res.json())
    .then(json => showResults(json));
};

// This function will show the JSON data
function showResults(json) {
    
    while(section.firstChild) {
        section.removeChild(section.firstChild);
    };

    // This meals variable stores the value of meals from JSON
    let meals = json.meals;

    // If there is data in the meals, it will create html elements and put the data in each element
    if(meals.length === 0) {
        const p = document.querySelector('p');
        p.textContent = 'No Result returned';
        section.appendChild(p);
    } else {
        for(let i=0; i<meals.length; i++) {
            const menu = document.createElement('div');
            const name = document.createElement('h3');
            const video = document.createElement('p');
            const country = document.createElement('span');
            const link = document.createElement('a');
            const img = document.createElement('img');
            const recipe = document.createElement('p');
            const countrySection = document.createElement('span');

            // It loops through the array to display the current data
            const current = meals[i];

            link.textContent = 'Click to watch the video';
            link.href = current.strYoutube;
            recipe.textContent = current.strInstructions;
            name.textContent = current.strMeal;
            country.textContent = current.strArea;
            countrySection.textContent = 'Country: '

            if(current.strMealThumb.length!== null) {
                img.src = current.strMealThumb;
                img.alt = current.strMeal;
            }

            // Some styles for the image and text
            img.style.width = '450px';
            img.style.height = '350px';
            countrySection.style.fontWeight = 'bold';

            // Finally the data will be shown in the web page
            menu.appendChild(name);
            video.appendChild(link);
            menu.appendChild(video);
            menu.appendChild(img);
            menu.appendChild(countrySection);
            menu.appendChild(country);
            menu.appendChild(recipe);
            section.appendChild(menu);
        }
    }
}



