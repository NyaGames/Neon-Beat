function CreditsState(){    
        
    var container;
    var canvas;

    var creditos;

    this.enter = function()
    {
        console.log("[DEBUG] ***ENTERING CREDITS STATE***")

        container = createDiv();
        container.position(window.outerWidth * 0.205, window.outerHeight * 0.165);

        //crear imagenes
        canvas = createCanvas(1120, 630);
        canvas.parent(container);
        canvas.background(0);

        creditos = createImg('assets/images/creditos.png');
        creditos.parent(container);
        creditos.position(0,0);
    }  

    this.keyPressed = function(){
        if(keyCode === 27){
            mgr.showScene(MainMenuState);
        }
    }
}