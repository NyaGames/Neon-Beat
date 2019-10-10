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
        this.maxColor = color(100,239,255,255);
        this.minColor = color(0,30,30,255);

        //Cola de la bola
        this.history = [];
        var v=createVector(this.x, this.y);
    }

    display(damageOverTime){
        let index = Math.floor(this.index) % this.len;


        //Imagenes de la cola de la bola
        /*for(var i=1; i < this.history.length-1; i++){
            var alpha = lerp(0, 255, i/this.history.length);
            var tamaño = lerp(0, this.r*0.3, i/this.history.length);
            var pos = this.history[i];
            tint(lerpColor(this.minColor,this.maxColor,this.actualHp/this.maxHp), alpha);
            imageMode(CENTER);    
            image(playerTrail[0], pos.x, pos.y, tamaño, tamaño);  
            noTint();
        }*/

        tint(lerpColor(this.minColor,this.maxColor,this.actualHp/this.maxHp));
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
        var v=createVector(this.x, this.y);
        this.history.push(v)  
        if(this.history.length > 10){
            this.history.splice(0, 1);
        }
    }
}