const baseUrl = 'https://www.themealdb.com/api/json/v1/1/';
let url;

const form = document.querySelector('form');
const section = document.querySelector('section');

form.addEventListener('submit', fetchResults);

function fetchResults(event) {
    event.preventDefault();

    const letter = document.getElementById('letter').value.trim(); 
    const word = document.getElementById('word').value.trim();

    if(letter !== '' && letter !== null) {
        url = baseUrl + 'search.php?f=' + letter;
    } else{
        url = baseUrl + 'search.php?s=' + word;
    } 

    fetch(url)
    .then(res => res.json())
    .then(json => showResults(json));
};

function showResults(json) {
    console.log(json);

    while(section.firstChild) {
        section.removeChild(section.firstChild);
    };

    let meals = json.meals;

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

            const current = meals[i];
            console.log(current);

            link.textContent = 'Watch the video';
            link.href = current.strYoutube;
            recipe.textContent = current.strInstructions;
            name.textContent = current.strMeal;
            country.textContent = current.strArea;
            countrySection.textContent = 'Country: '

            if(current.strMealThumb.length!== null) {
                img.src = current.strMealThumb;
                img.alt = current.strMeal;
            }

            img.style.width = '450px';
            img.style.height = '350px';
            countrySection.style.fontWeight = 'bold';

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



