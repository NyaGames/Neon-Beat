class Pointer{
    constructor(x, y, r, animation){
        this.x = x;
        this.y = y;
        this.r = r;

        this.animation = animation;

        this.len = this.animation.length;

        this.speed = 0.4;
        this.index = 0;        
    }

    display(){
        let index = Math.floor(this.index) % this.len;
        tint(0, 239, 255, 255);
        imageMode(CENTER);       
        image(this.animation[index], this.x, this.y, this.r, this.r);      
        noTint();
        this.index += this.speed;      
    }

    setPosition(x, y){
        this.x = x;
        this.y = y + 7;
    }
}