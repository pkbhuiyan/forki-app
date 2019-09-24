import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import {elements,renderLoader,clearLoader} from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';


// APPLICATION STATE
const state = {};
window.state = state;




/**
 *  SEARCH  RESULT CONTROLLER
 */

const searchControl = async () => {
    // get input for search
    const query = searchView.getInput();
    
    if(query){
        // 1. new search instance and add to state
        state.search = new Search(query);

        // 2. prepare ui for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.loaderImg);


        try{
            // 3. search for recipies
            await state.search.getSearchResult();
            
            // 4. render result on UI
            clearLoader();
            searchView.resultRecipes(state.search.result);

        }catch(err){
            alert("Error in Search ..." + err);
            clearLoader();
        }
    }
    
}



// EVENT FOR SEARCH BUTTON
elements.searchForm.addEventListener('submit',e => {
    e.preventDefault();
    searchControl()
});


// Event delegation allows you to avoid adding event listeners to specific nodes; 
// instead, the event listener is added to one parent. 

//  pagination
elements.searchPageRes.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn){
        // prop target
        const gotoPage = parseInt(btn.dataset.goto,10);
        // prepare UI & clear UI
        searchView.clearResults();
        // show recipies page wise
        searchView.resultRecipes(state.search.result, gotoPage);
    }
});





/**
 *  RECIPE VIEW CONTROLLER
 */


const recipeControl = async() => {
    const id = window.location.hash.replace('#', '');

    if(id){
        // prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight selected recipe
       if(state.search) searchView.highlightSelected(id);

        // new recipe instance and added to state
        state.recipe = new Recipe(id);

    try{
        // get recipes data
        await state.recipe.getRecipies();
        state.recipe.parseIngredients();

        // calculate serving and time
        state.recipe.calcTime();
        state.recipe.calcServings();

        // render recipe
        clearLoader();
        recipeView.renderRecipe(
            state.recipe, 
            state.likes.isLiked(id)
        ); 

    }catch(err){
        console.log("Error: "+err);
    }
        
    }

}

['hashchange', 'load'].forEach(event => window.addEventListener(event, recipeControl));


/**
 *
 * SHopping List Controller
 *
 */

 const controlList = () => {
    //  create new list if there is no list
    if(!state.list) state.list = new List();
    // add each ingredient to the list
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
        
    }) 
 }

/**
 *  LIKES controller
 */
state.likes = new Likes();
likesView.toggleLikeMenu(state.likes.getNumLikes());

 const controlLike = () => {
    //  create new LIKE if there is now like in STATE
    if(!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;
    
     if (!state.likes.isLiked(currentID)){
        // ADD like to the STATE 
        const newLike = state.likes.addLikes(
            currentID,
            state.recipe.title,
            state.recipe.publisher,
            state.recipe.img_url
        );
        // toggle likes button
         likesView.toggleLikes(true);
        // add like to UI list
         likesView.renderLike(newLike);
        // console.log(state.likes);
    }else{
        // remove like from state
         state.likes.deleteLikes(currentID);
        // toggle button
         likesView.toggleLikes(false);
        // remove like from UI list
        likesView.deleteLike(currentID);
        // console.log(state.likes);
        
    }
     likesView.toggleLikeMenu(state.likes.getNumLikes());

 } 


//  SHOPPING LIST event handler

elements.shopping.addEventListener('click', el => {
    const id = el.target.closest('.shopping__item').dataset.itemid;

    // Handle Delete button
    if (el.target.matches('.shopping__delete, .shopping__delete *')){
        // Delete from state
        state.list.deleteItem(id);

        // Delete from UI
        listView.deleteItem(id);
    } else if (el.target.matches('.shopping__count--value')) {
        const val = parseFloat(el.target.value, 10);
        state.list.updateItem(id, val);
    }
})


// Handling recipe [Events Listeners] button clicks

elements.recipe.addEventListener('click', el => {
    if (el.target.matches('.btn-decrease, .btn-decrease *')){
        // servings will decrease until it greater than 1
        if(state.recipe.servings > 1){
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (el.target.matches('.btn-increase, .btn-increase *')){
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (el.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        controlList()
    } else if (el.target.matches('.recipe__love, .recipe__love *')){
        // CLICK heart button
        controlLike();
    }
    
    
})








