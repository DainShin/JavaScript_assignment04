const baseUrl = 'https://www.themealdb.com/api/json/v1/1/';
let url;

const word = document.querySelector('#word');

const form = document.querySelector('form');
const submit = document.querySelector('.submit');
const section = document.querySelector('section');

submit.addEventListener('click', fetchResults);

function fetchResults(event) {
    event.preventDefault();

    const letter = document.getElementById('letter').value.trim(); 
    url = baseUrl + 'search.php?f=' + letter;

    fetch(url).then(res => {
        return res.json();
    }).then(json => showResults(json))
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
            const name = document.createElement('h2');
            const link = document.createElement('a');
            const img = document.createElement('img');
            const recipe = document.createElement('p');

            const current = meals[i];
            console.log(current);

            link.href = current.strYoutube;
            link.textContent = current.strMeal;
            recipe.textContent = current.strInstructions;

            if(current.strMealThumb.length!== null) {
                img.src = current.strMealThumb;
                img.alt = current.strMeal;
            }

            menu.appendChild(name);
            name.appendChild(link);
            menu.appendChild(img);
            menu.appendChild(recipe);
            section.appendChild(menu);
        }
    }
}



