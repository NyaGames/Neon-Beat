function CreditsState(){    
        
    var container;
    var creditos;

    this.enter = function()
    {
        console.log("[DEBUG] ***ENTERING CREDITS STATE***")

        container = document.getElementById("container");

        //crear imagenes
        canvas = createCanvas(1120, 630);
        canvas.parent(container);
        canvas.background(0);

        creditos = createImg('assets/images/creditos.png');
        creditos.position(0, 0); 
        creditos.parent(container);
    }  

    this.keyPressed = function(){
        if(keyCode === 27){
            canvas.remove();
            mgr.showScene(MainMenuState);
        }
    }
}