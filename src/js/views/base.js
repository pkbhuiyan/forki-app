/**
 *  DOM elemets for FORRKIFY application
 */
export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    loaderImg: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'),
    searchPageRes: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    shopping: document.querySelector('.shopping__list'),
    likemenu: document.querySelector('.likes__field'),
    likelist: document.querySelector('.likes__list'),

}   


//  LOADING animation setup 
export const elementString = {
    loader: 'loader'
}

// RENDER loader html
export const renderLoader = parent => {
    const loader = `
        <div class="${elementString.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg> 
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
}

// clear loader
export const clearLoader = () => {
    const loader = document.querySelector(`.${elementString.loader}`);
    if(loader) loader.parentElement.removeChild(loader);
}