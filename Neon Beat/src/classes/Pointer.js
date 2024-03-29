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
        this.minColor = color(255,0,0,255);
        //Cola de la bola
        this.history = [];
        var v=createVector(this.x, this.y);
    }

    display(damageOverTime,mobileDevice){
        let index = Math.floor(this.index) % this.len;

        let col = lerpColor(this.minColor,this.maxColor,this.actualHp/this.maxHp);
        //Imagenes de la cola de la bola
        if(!mobileDevice){
            for(var i=1; i < this.history.length-1; i++){
                var alpha = lerp(0, 255, i/this.history.length);
                var tamaño = lerp(0, this.r*0.3, i/this.history.length);
                var pos = this.history[i];
                imageMode(CENTER); 
                tint(col.levels[0], col.levels[1], col.levels[2], alpha);            
                image(playerTrail[0], pos.x, pos.y, tamaño, tamaño);  
                noTint();
            }
            
        }

        tint(col.levels);
        imageMode(CENTER);       
        image(this.animation[index], this.x, this.y, this.r, this.r);      
        noTint();
        this.index += this.speed; 
        
        //Vida del jugador
        this.actualHp -= damageOverTime;
        if(this.actualHp < 0){
            this.actualHp = 0;
        }
         
    }

    setPosition(x, y,mobileDevice){
        this.x = x;
        this.y = y + 7;
        if(!mobileDevice){
            var v=createVector(this.x, this.y);
            this.history.push(v)  
            if(this.history.length > 10){
                this.history.splice(0, 1);
            }
        }
    }
}