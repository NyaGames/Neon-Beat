function BootState(){
    this.enter = function()
    {
       console.log("[DEBUG] ***ENTERING BOOT STATE***")
       mgr.showScene(PreloadState);
    }  

    this.draw = function(){
        
    }
}