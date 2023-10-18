
export class Menu {
    constructor(
        public id: string,
        public name: string,
        public price: number | String,
        public description: string,
        public category: string
    ) { }
}


export class Orders {
    constructor(
        public status: 'pending' | 'delivered' | 'confirmed',
        public items: Menu[],
        public createdAt: Date,
        public clientId?: string
    ) { }
}


export class Employee {
    constructor(
      public username: string,
      public email: string,
      public id?: string,
      public password?: string
    ) { }
  }