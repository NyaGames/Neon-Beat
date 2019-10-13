class Minimum{

    constructor(x,y,visited,animation,successAnimation,successAnimation2,successAnimation3,failAnimation,failAnimation2,failAnimation3,lowestScoreAnimation,midScoreAnimation,highestScoreAnimation,sphereAnimation){
        this.x = x;
        this.y = y;
        this.visited = visited;
        this.second;
        //Círculo
        this.animation = animation;
        this.animationIndex = 0;
        this.animationLength = this.animation.length;
        this.sizeForPerfectSuccsess = 24;
        this.size;
        //Partículas de acierto y error
        this.success = false;
        this.fail = false;
        this.successAnimation = successAnimation;
        this.successAnimationIndex = 0;
        this.successAnimationLength = this.successAnimation.length;
        this.successAnimation2 = successAnimation2;
        this.successAnimation2Index = 0;
        this.successAnimation2Length = this.successAnimation2.length;
        this.successAnimation3 = successAnimation3;
        this.successAnimation3Index = 0;
        this.successAnimation3Length = this.successAnimation3.length;
        this.randomSuccess = Math.floor(Math.random() * 3);   

        this.failAnimation = failAnimation;
        this.failAnimationIndex = 0;
        this.failAnimationLength = this.failAnimation.length;
        this.failAnimation2 = failAnimation2;
        this.failAnimation2Index = 0;
        this.failAnimation2Length = this.failAnimation2.length;
        this.failAnimation3 = failAnimation3;
        this.failAnimation3Index = 0;
        this.failAnimation3Length = this.failAnimation3.length;
        this.randomFail = Math.floor(Math.random() * 3);   

        //Textos de puntuaciones
        this.endAnimation = false;
        this.increment = 0;
        this.endScoreAnimation = false;
        this.score = 0;
        this.scoreIncrement = 0;

        this.lowestScoreAnimation = lowestScoreAnimation;
        this.lowestScoreAnimationIndex = 0;
        this.lowestScoreAnimationLength = this.lowestScoreAnimation.length;
        this.midScoreAnimation = midScoreAnimation;
        this.midScoreAnimationIndex = 0;
        this.midScoreAnimationLength = this.midScoreAnimation.length;
        this.highestScoreAnimation = highestScoreAnimation;
        this.highestScoreAnimationIndex = 0;
        this.highestScoreAnimationLength = this.highestScoreAnimation.length;
        this.scoreSize = 100;

        //Dibujar el mínimo
        this.sphereIncrement = 0;
        this.sphereAnimation = sphereAnimation;
        this.sphereAnimationIndex = 0;
        this.successColor = color(0,255,0);
        this.notVisitedColor = color(0,0,255);
        this.failColor = color(255,0,0);

        this.flash = false;
    }

    drawCircle(playerX,startDiameter,graphAmplitude){
        var x = 500;
        if(((this.x * graphAmplitude) - playerX) <= x && ((this.x * graphAmplitude)- playerX) >= 0){
            this.size = lerp(this.sizeForPerfectSuccsess,startDiameter,((this.x * graphAmplitude) - playerX)/500);
            let index = Math.floor(this.animationIndex) % this.animationLength;
            imageMode(CENTER);       
            image(this.animation[index], this.x * graphAmplitude, this.y, this.size, this.size);      
            this.animationIndex += 0.5;       
        }
    }

    successOrFail(graphAmplitude){
        if(!this.endAnimation){
            if(this.success == true){
                switch(this.randomSuccess){
                    case 0:
                        this.increment += 4;
                        let index = Math.floor(this.successAnimationIndex) % this.successAnimationLength;
                        imageMode(CENTER);       
                        image(this.successAnimation[index],this.x * graphAmplitude, this.y - this.increment, 200, 200);      
                        this.successAnimationIndex += 0.6;     
                        if (index == this.successAnimation.length - 1){
                            this.endAnimation = true;
                        }
                        break;

                    case 1:
                        this.increment += 4;
                        let index2 = Math.floor(this.successAnimation2Index) % this.successAnimation2Length;
                        imageMode(CENTER);       
                        image(this.successAnimation2[index2],this.x * graphAmplitude, this.y - this.increment, 200, 200);      
                        this.successAnimation2Index += 0.6;     
                        if (index2 == this.successAnimation2.length - 1){
                            this.endAnimation = true;
                        }  
                        break;

                    case 2:
                        this.increment += 4;
                        let index3 = Math.floor(this.successAnimation3Index) % this.successAnimation3Length;
                        imageMode(CENTER);       
                        image(this.successAnimation3[index3],this.x * graphAmplitude, this.y - this.increment, 200, 200);      
                        this.successAnimation3Index += 0.6;     
                        if (index3 == this.successAnimation3.length - 1){
                            this.endAnimation = true;
                        }
                        break;
                }
               
            }else if(this.fail == true){
                switch(this.randomFail){
                    case 0:
                        this.increment += 4;
                        let index = Math.floor(this.failAnimationIndex) % this.failAnimationLength;
                        imageMode(CENTER);       
                        image(this.failAnimation[index],this.x * graphAmplitude, this.y - this.increment, 200, 200);      
                        this.failAnimationIndex += 0.6;   
                        if (index == this.failAnimation.length - 1){
                            this.endAnimation = true;
                        }
                        break;
                    case 1:
                        this.increment += 4;
                        let index2 = Math.floor(this.failAnimation2Index) % this.failAnimation2Length;
                        imageMode(CENTER);       
                        image(this.failAnimation2[index2],this.x * graphAmplitude, this.y - this.increment, 200, 200);      
                        this.failAnimation2Index += 0.6;   
                        if (index2 == this.failAnimation2.length - 1){
                            this.endAnimation = true;
                        }
                        break;
                    case 2:
                        this.increment += 4;
                        let index3 = Math.floor(this.failAnimation3Index) % this.failAnimation3Length;
                        imageMode(CENTER);       
                        image(this.failAnimation3[index3],this.x * graphAmplitude, this.y - this.increment, 200, 200);      
                        this.failAnimation3Index += 0.6;   
                        if (index3 == this.failAnimation3.length - 1){
                            this.endAnimation = true;
                        }
                        break;
                }
                
            }
        }
    }

    drawText(graphAmplitude){
        if(!this.endScoreAnimation){
            if(this.score != 0){
                switch(this.score){
                    case 100:
                        this.scoreIncrement += 2;
                        let index = Math.floor(this.lowestScoreAnimationIndex) % this.lowestScoreAnimationLength;
                        imageMode(CENTER);       
                        image(this.lowestScoreAnimation[index],this.x * graphAmplitude, this.y + this.scoreIncrement, this.scoreSize, this.scoreSize);      
                        this.lowestScoreAnimationIndex += 0.6;   
                        if (index == this.lowestScoreAnimation.length - 1){
                            this.endScoreAnimation = true;
                        }
                        break;
                    case 200:
                        this.scoreIncrement += 2;
                        let index2 = Math.floor(this.midScoreAnimationIndex) % this.midScoreAnimationLength;
                        imageMode(CENTER);       
                        image(this.midScoreAnimation[index2],this.x * graphAmplitude, this.y + this.scoreIncrement, this.scoreSize, this.scoreSize);      
                        this.midScoreAnimationIndex += 0.6;   
                        if (index2 == this.midScoreAnimation.length - 1){
                            this.endScoreAnimation = true;
                        }
                        break;
    
                    case 300:
                        this.scoreIncrement += 1;
                        let index3 = Math.floor(this.highestScoreAnimationIndex) % this.highestScoreAnimationLength;
                        imageMode(CENTER);       
                        image(this.highestScoreAnimation[index3],this.x * graphAmplitude, this.y + this.scoreIncrement, this.scoreSize, this.scoreSize);      
                        this.highestScoreAnimationIndex += 0.6;   
                        if (index3 == this.highestScoreAnimation.length - 1){
                            this.endScoreAnimation = true;
                        }
                        break;
                }
            }
        }
        
    }

    display(graphAmplitude,r){
        let index = Math.floor(this.sphereAnimationIndex) % this.sphereAnimation.length;
        if(this.success){
            tint(this.successColor);
        }else if(this.fail){
            tint(this.failColor);
        }/*else{
            tint(this.notVisitedColor);
        }*/
        imageMode(CENTER);       
        image(this.sphereAnimation[index],this.x * graphAmplitude, this.y , r, r);    
        noTint();
        this.sphereAnimationIndex += 0.6;   
       
    }

}