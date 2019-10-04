class Pointer{
    constructor(x, y, r, animation){
        this.x = x;
        this.y = y;
        this.r = r;

        this.animation = animation;

        this.len = this.animation.length;

        this.speed = 0.4;
        this.index = 0;  

        this.maxHp = 100;
        this.actualHp = this.maxHp;
        this.startWidth = 600;
    }

    display(damageOverTime){
        let index = Math.floor(this.index) % this.len;
        tint(0, 239, 255, 255);
        imageMode(CENTER);       
        image(this.animation[index], this.x, this.y, this.r, this.r);      
        noTint();
        this.index += this.speed;   
        
        //Vida del jugador
        this.actualHp -= damageOverTime;
        if(this.actualHp < 0){
            this.actualHp = 0;
        }
        //rectMode(CENTER);
        stroke(255,0,0);
        fill(255,0,0);
        let newWidth = (this.actualHp * this.startWidth) / this.maxHp;
        rect(this.x - 150,height - 20,newWidth,10); 
    }

    setPosition(x, y){
        this.x = x;
        this.y = y + 7;
    }
}