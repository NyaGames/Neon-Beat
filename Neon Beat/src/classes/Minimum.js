class Minimum{

    constructor(x,y,visited,limit){
        this.x = x;
        this.y = y;
        this.visited = visited;
        this.limitDown = this.x - limit;
        this.limitUp = this.x + limit;
    }

}