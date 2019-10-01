class Minimum{

    constructor(x,y,visited,animation,successAnimation,failAnimation){
        this.x = x;
        this.y = y;
        this.visited = visited;
        this.second;
        //Círculo
        this.animation = animation;
        this.animationIndex = 0;
        this.animationLength = this.animation.length;
        //Partículas de acierto y error
        this.success = false;
        this.fail = false;
        this.successAnimation = successAnimation;
        this.successAnimationIndex = 0;
        this.successAnimationLength = this.successAnimation.length;
        this.failAnimation = failAnimation;
        this.failAnimationIndex = 0;
        this.failAnimationLength = this.failAnimation.length;
        
    }

    drawCircle(playerX,startDiameter,graphAmplitude){
        var x = 500;
        //var newDiameter = (startDiameter * (this.second - circleSeconds))/playerSecond;
        if(((this.x * graphAmplitude) - playerX) <= x && ((this.x * graphAmplitude)- playerX) >= 0){
            var tamaño = lerp(30,startDiameter,((this.x * graphAmplitude) - playerX)/300);
            let index = Math.floor(this.animationIndex) % this.animationLength;
            imageMode(CENTER);       
            image(this.animation[index], this.x * graphAmplitude, this.y, tamaño, tamaño);      
            this.animationIndex += 0.5;       
        }
    }

    successOrFail(graphAmplitude){
        if(this.success == true){
            let index = Math.floor(this.successAnimationIndex) % this.successAnimationLength;
            imageMode(CENTER);       
            image(this.successAnimation[index],this.x * graphAmplitude, this.y - 50, 200, 200);      
            this.successAnimationIndex += 0.6;     

        }else if(this.fail == true){
            let index = Math.floor(this.failAnimationIndex) % this.failAnimationLength;
            imageMode(CENTER);       
            image(this.failAnimation[index],this.x * graphAmplitude, this.y - 50, 200, 200);      
            this.failAnimationIndex += 0.6;   
        }
       
    }

}