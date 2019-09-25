function EndGameState(){
    var textX;
    var textY;
    
    // enter() will be executed each time the SceneManager switches
    // to this animation
    // Note: Animation1() doesn't have setup() or draw()
    this.enter = function()
    {
        textX = 10;
        textY = 0;
        background("teal");
        textAlign(CENTER);
        fill("black");
        text("[STATE] ***END GAME STATE*** \n" + 
            "... or mouse to advance animation.\n\n" +
            "Press any other key to display it.", width / 2, height / 2);
    }
    this.keyPressed = function()
    {
        text(keyCode, textX, textY += 10);
        if ( textY > height )
        {
            textX += 20;
            textY = 0;
        }
    }
    this.mousePressed = function()
    {
        this.sceneManager.showNextScene();
    }
}