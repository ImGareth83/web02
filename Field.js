const FIELD_CHARACTER = '░';
const HAT = '^';
const HOLE = 'O';
const STAR ='*';

class Field {
    static OUT_OF_BOUNDS=1;
    static FELL_INTO_HOLE=0;
    static SUCCESS=2;
    static OK=3;

    constructor(cols, rows,percentage=0.1){
        this.locationX=0;
        this.locationY=0;
        this.field=[];
        this.cols=cols;
        this.rows=rows;

        this.hatX=0;
        this.hatY=0;

        //initialise the 2D Array
        for (let i=0; i<cols; i++){
            this.field[i]=[];
        }

        //generate the fields with default or input col and rows
        this.generateField(cols, rows);

        this.field[this.locationX][this.locationY]=STAR;

        this.setHat(cols,rows);

        this.setHole(cols,rows,percentage);

    }

    generateField(width, height){
        for(let i=0; i<width; i++){
            for(let j=0; j<height; j++){
                this.field[i][j]=FIELD_CHARACTER;
            }
        }
    }

    setHat(cols, rows){
        let x = 0;
        let y = 0;
        do{
            x = this.randomNumber(0, cols);
            y = this.randomNumber(0, rows);

        //Avoid hat on 0,0
        }while(x==0 && y==0);

        this.hatX=x;
        this.hatY=y;

        this.field[x][y]= HAT;
    }

    setHole(cols, rows, percentage){
        //find out total number of holes by multiplying cols and rows and total should less than fields
        let totalHoles = this.randomNumber(0,cols*rows*percentage);
        for(let i=0; i<totalHoles; i++){
            let x = this.randomNumber(0, cols);
            let y = this.randomNumber(0, rows);

            //avoid hole on 0,0 or on the hat
            if((x==0 && y==0) || (x==this.hatX && y==this.hatY)) continue;

            this.field[x][y]=HOLE;
        }
    }

    moveUp(){
        let newX = this.locationX-1;
        let code = this.move(newX, this.locationY);

        this.field[newX][this.locationY]=STAR;
        this.locationX=newX;
        return code; //move up successful

    }

    moveDown(){
        let newX = this.locationX + 1;
        let code =this.move(newX, this.locationY);

        this.field[newX][this.locationY]=STAR;
        this.locationX=newX;
        return code;
    
    }
    moveLeft(){
        let newY = this.locationY-1;
        let code = this.move(this.locationX, newY);

        this.field[this.locationX][newY]=STAR;
        this.locationY=newY;
        return code;
    
    }

    moveRight(){
        let newY = this.locationY+1;
        let code = this.move(this.locationX, newY);

        this.field[this.locationX][newY]=STAR;
        this.locationY=newY;

        return code;
    }

    move(x, y){
        if(!this.checkBoundaries(x, y)){
            return Field.OUT_OF_BOUNDS; //move right unsuccessful

        }

        if(this.isHole(x, y)){
            return Field.FELL_INTO_HOLE; //move right unsuccessful
        }

        if(this.isHat(x, y)){
            return Field.SUCCESS; //found hat
        }

        return Field.OK; //move right successful
    }

    checkBoundaries(x,y){
        if(x<0 || x>this.cols-1 || y<0 || y>this.rows-1){
            // console.log("Out of bounds");
            return false;
        }
        // console.log("in bounds");
        return true;
    }

    isHole(x,y){
        return this.field[x][y] == HOLE;
    }

    isHat(x,y){
        return this.field[x][y] == HAT;
    }

    runGame(){
        this.print();
    }
    print(){
        const displayString = this.field.map(row =>{
            return row.join('');
        }).join('\n');
        console.log(displayString);
    }

    randomNumber(min, max){
        //Avoid indexOutofBounds error
        max-=1;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


}

module.exports = {Field}