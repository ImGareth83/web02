const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');
const {Field} = require('./Field');

const row = 10;
const col = 10;

console.log("app started");

let f = new Field(col,row);
f.print();

let resultMap = new Map();
resultMap.set(Field.OK, "");
resultMap.set(Field.OUT_OF_BOUNDS, "Out of bounds - Game End!");
resultMap.set(Field.FELL_INTO_HOLE, "Fell into a hole - Game End!");
resultMap.set(Field.SUCCESS, "Found the hat - Game End!");

//AskQuestion () Menu
let whatMove=prompt("Which way?").toLowerCase();
let result = 0;
do{
    switch(whatMove){
        
        case "u": 
            result=f.moveUp();
            console.log(resultMap.get(result));
            if(result==Field.OK){
                f.print();
                whatMove=prompt("Which way?").toLowerCase();
            }
            break;

        case "d": 
            result=f.moveDown();
            console.log(resultMap.get(result));
            if(result==Field.OK){
                f.print();
                whatMove=prompt("Which way?").toLowerCase();
            }
            break;

        case "l": 
            result=f.moveLeft();
            console.log(resultMap.get(result));
            if(result==Field.OK){
                f.print();
                whatMove=prompt("Which way?").toLowerCase();
            }
            
            break;

        case "r": 
            result=f.moveRight();
            console.log(resultMap.get(result));
            if(result==Field.OK){
                f.print();
                whatMove=prompt("Which way?").toLowerCase();
            }
            break;
            
        default: 
            whatMove=prompt("Enter U, D, L or R").toLowerCase();
            break;
    }
    
}
while(result==Field.OK);