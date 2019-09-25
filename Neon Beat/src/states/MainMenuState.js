function MainMenuState(){    
    
    this.enter = function()
    {
       console.log("[DEBUG] ***ENTERING MAIN MENU STATE***")
       mgr.showScene(GameState);
    }  
}