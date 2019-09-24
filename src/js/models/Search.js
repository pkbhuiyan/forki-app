/**
 *     SEARCH MODEL
 *
 */


import axios from 'axios';
import { key } from '../config';


export default class Search{
    constructor(query){
        this.query = query;
    }
    async getSearchResult(){    // ASYNC function
        
        try {
            const RES = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);  // AWAIT is promise response
            this.result = RES.data.recipes 
        } catch (error) {
            alert(error);
        }
    }
}


/*

SEARCH MODEL

-- CONSTRUCTION


-- METHODS
    -- getRecepies()

*/