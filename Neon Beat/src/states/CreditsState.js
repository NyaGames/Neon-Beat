function CreditsState(){    
        
    var container;
    var creditos;

    this.enter = function()
    {
        console.log("[DEBUG] ***ENTERING CREDITS STATE***")

        container = document.getElementById("container");

        //crear imagenes

        var ancho = window.innerWidth - window.innerWidth*0.208*2;        
        var alto = window.innerHeight - window.innerHeight*0.163*2;

        canvas = createCanvas(ancho, alto);
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