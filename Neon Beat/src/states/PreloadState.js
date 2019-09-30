function PreloadState(){
    this.enter = function()
    {
       console.log("[DEBUG] ***ENTERING PRELOAD STATE***");
       mgr.showScene(MainMenuState);
    }  
}