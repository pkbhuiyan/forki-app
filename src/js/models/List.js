/**
 *     List MODEL
 *
 */



import uniqid from 'uniqid'

export default class List{
    constructor(){
        this.items = []
    }

    addItem(count, unit, ingredient){
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }

        this.items.push(item);
        return item;
    }

    deleteItem(id){
        // get the the index of slected item
        const index = this.items.findIndex(el => el.id === id);
        // remove the item
        this.items.splice(index, 1);
    }

    updateItem(id, newCount){
        // find the element and update the count
        this.items.find(el => el.id === id).count = newCount;
    }
}