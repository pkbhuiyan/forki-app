import {elements} from './base';

// GET INPUT VALUE FOR SEARCH
export const getInput= () =>  elements.searchInput.value; 

// clear SEARCH INPUT FIELD AFTER SUBMIT
export const clearInput = () => {
    elements.searchInput.value = ''; 
// WRAP THIS IN CURLY BRACES OHTER WISE THERE WILL BE IMPLICIT RETURN,WE DON'T WAT IT
}

// HIGHLIGHT selected item from search view list
export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'))
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active')
    })

    document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active')
}

// CLEAR RESULTS AFTTER NEW SEARCH ITEM CALLED
export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchPageRes.innerHTML = '';
// WRAP THIS IN CURLY BRACES OHTER WISE THERE WILL BE IMPLICIT RETURN,WE DON'T WAT IT
}

// RENDER recipie to HTML content
const renderRecipe = recipe => {
    const markup = 
    `<li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${recipe.title}...</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>`;
    elements.searchResList.insertAdjacentHTML('beforeend',markup);

}

/**
 *  create button
 */

const createButton = (page, type) => 
`
    <button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page - 1 : page + 1}">
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    </button>

`;

/**
 *  render button according to page number
 */

const renderButtons = (page, numResult, resPerPage) => {
    const pages = Math.ceil(numResult / resPerPage);
    let button;
    if(page === 1 && pages > 1 ){
        // next button
        button = createButton(page, 'next')
    }else if(page < pages){
        // both button
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `
    }else if(page === pages && pages > 1){
        // prev button
        button = createButton(page, 'prev')
    }
    elements.searchPageRes.insertAdjacentHTML('afterbegin',button)
}

/**
 *  get recipies per page
 */
export const resultRecipes = (recipies, page = 1, resPerPage = 10) => {
    console.log(recipies);
    // render result for current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    recipies.slice(start, end).forEach(renderRecipe);

    // render pagination button
    renderButtons(page, recipies.length, resPerPage)
}








//  central DOM elements
// searchview


// render recipies
// export render result