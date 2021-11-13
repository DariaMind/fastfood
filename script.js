let elements = document.forms.f1.elements
let size = elements.size
let add = elements.add
let topp = elements.topp
let calc = elements.calc
let res = document.getElementById('res')

class Burger{
    #priceBurger = 0;
    #kcalBurger = 0;
    static priceSize = {large:100, small:50}
    static kcalSize = {large:40, small:20}
    static priceAdd = {cheese:10, potato:15, salad:20}
    static kcalAdd = {cheese:20, potato:10, salad:5}
    static priceTopp = {mayonez:20, spice:15}
    static kcalTopp = {mayonez:5, spice:0}
    constructor(sizeB, addB){
        this._size = sizeB; //'large'
        this._add = addB; //array
        this._topp = null; //array
    }
    static createBurger(){
        return new Burger('large', ['cheese','salad']);
    }
    calcAdd(){
        let price = 0; 
        let kcal = 0;
        for (let i = 0; i < this._add.length; i++) {
            price += Burger.priceAdd[this._add[i]];
            kcal += Burger.kcalAdd[this._add[i]];
        }
        return {price:price, kcal:kcal}
    }
    calcTopp(){
        let price = 0; 
        let kcal = 0;
        for (let i = 0; i < this._topp.length; i++) {
            price += Burger.priceTopp[this._topp[i]];
            kcal += Burger.kcalTopp[this._topp[i]];
        }
        return {price:price, kcal:kcal}
    }
    setTopp(topping){
        if(!arguments.length) return this._topp;
        this._topp = topping;
    }
    price(){
        this.#priceBurger += Burger.priceSize[this._size]
        this.#priceBurger += this.calcAdd().price
        if(this._topp)this.#priceBurger += this.calcTopp().price
        return this.#priceBurger;
    }
    kcal(){
        this.#kcalBurger += Burger.kcalSize[this._size]
        this.#kcalBurger += this.calcAdd().kcal
        if(this._topp)this.#kcalBurger += this.calcTopp().kcal
        return this.#kcalBurger;
    }
};

// const test = Burger.createBurger();
// console.log(test.setTopp())
// test.setTopp(['spice'])
// console.log(test.setTopp())
// res.innerHTML = `${test.price()}$, ${test.kcal()}kcal`

for (let i = 0; i < add.length; i++) {
    add[i].addEventListener('click', ()=>{
        let count = 0
        for (let j = 0; j < add.length; j++) {
            if(add[j].checked) count++;
        }
        if(!count) calc.disabled = true
        else calc.disabled = false
    })
}

calc.addEventListener('click', (event)=>{
    event.preventDefault();
    let addVal = [];
    for (let i = 0; i < add.length; i++) {
        if(add[i].checked) addVal.push(add[i].value);
    }
    let toppVal = [];
    for (let i = 0; i < topp.length; i++) {
        if(topp[i].checked) toppVal.push(topp[i].value);
    }
    const userBurger = new Burger(size.value, addVal);
    if(toppVal.length) userBurger.setTopp(toppVal)
    res.innerHTML = `${userBurger.price()}$, ${userBurger.kcal()}kcal`
})