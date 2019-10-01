function MainMenuState(){    
    
    this.enter = function()
    {
       console.log("[DEBUG] ***ENTERING MAIN MENU STATE***")    
       mgr.showScene(GameState);   
    }  

    this.draw = function()
    {
        
    }
    this.keyPressed = function(){
        if(keyCode === 32){
            mgr.showScene(GameState);
        }
    }
}