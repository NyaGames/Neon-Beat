class Minimum{

    constructor(x,y,visited,s){
        this.index;
        this.x = x;
        this.y = y;
        this.visited = visited;
        this.second = s;
    }

    drawCircle(playerX,startDiameter,graphAmplitude){
        var x = 500;
        //var newDiameter = (startDiameter * (this.second - circleSeconds))/playerSecond;
        if(((this.x * graphAmplitude) - playerX) <= x && ((this.x * graphAmplitude)- playerX) >= 0){
            var tamaño = lerp(30,startDiameter ,((this.x * graphAmplitude) - playerX)/300);
            console.log("tamaño: " + tamaño + " índice:"+this.index);
            stroke(0, 255, 255);
            fill(0,0,0,1); 
            ellipse(this.x * graphAmplitude, this.y, tamaño, tamaño);     
        }
        
    
        
    }

}