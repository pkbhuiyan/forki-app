/**
 *     RECIPE MODEL
 *
 */



import axios from 'axios';
import { key } from '../config';


export default class Recipe {
    constructor(id) {
        this.id = id;
    }
    async getRecipies() {    // ASYNC function
        try {
            const RES = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);  // AWAIT is promise response
            this.title = RES.data.recipe.title;
            this.publisher = RES.data.recipe.publisher;
            this.img_url = RES.data.recipe.image_url;
            this.source_url = RES.data.recipe.source_url;
            this.ingredients = RES.data.recipe.ingredients;
        } catch (error) {
            alert("error: "+ error);
        }
    }


    calcTime(){
        // assume we need 15 min for each 3 ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng/3);
        this.time = periods * 15;
    }

    calcServings(){
        this.servings = 4;
    }

    parseIngredients(){
        const unitLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds', 'pound'];
        const unitShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitShort, 'kg', 'g'];
        
        const newIngredients = this.ingredients.map(el => {
            // 1. uniform unit 
            let ingredient = el.toLowerCase();
            unitLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitShort[i]);
            })

            // 2. remove parenthesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');


            // 3.parse ingrdients into count, unit and ingredients
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

            let objIng;
            if(unitIndex > -1){
                // there is a unit
                const arrCount = arrIng.slice(0, unitIndex);
                let count;
                if(arrCount.length === 1){
                    count = eval(arrIng[0].replace('-','+'));
                }else{
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex+1).join(' ')
                }

            }else if (parseInt(arrIng[0], 10)) {
                // there is not unit but first element is number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            }else if(unitIndex === -1){
                // there is no unit 
                objIng = {
                    count:1,
                    unit: '',
                    ingredient
                }
            }
            return objIng;
        });
        this.ingredients = newIngredients;

    }
    updateServings(type){
        // get new serving either 'inc + ' or 'dec -' 
        const newServing = type === 'dec' ? this.servings - 1 : this.servings + 1;
        
        this.ingredients.forEach( ing => {
            ing.count *= (newServing / this.servings);
        })

        this.servings = newServing;
    }

}





