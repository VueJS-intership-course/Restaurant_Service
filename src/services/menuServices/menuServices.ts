class Menu {
    constructor(
        public name: string,
        public price: number,
        public description: string,
        public id?: string
    ) { }
}






function validateMenu(menuItem: Menu) {
    if(!menuItem.name) {
        throw new Error('Add proper dish name!')
    }

    if(!menuItem.description) {
        throw new Error('Add proper description for the dish!')
    }

    if(!menuItem.price || menuItem.price < 0) {
        throw new Error('Add valid and non negative price for the dish!')
    }
}