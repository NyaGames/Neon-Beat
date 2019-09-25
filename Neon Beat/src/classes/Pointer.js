class Pointer{
    constructor(x, y, r, img){
        this.x = x;
        this.y = y;
        this.r = r;
        this.img = img;
    }

    display(){
        image(this.img, this.x, this.y, this.r, this.r);
    }

    setPosition(x, y){
        this.x = x;
        this.y = y;
    }
}