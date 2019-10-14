function CreditsState(){    
        
    var container;
    var creditos;

    this.enter = function()
    {
        console.log("[DEBUG] ***ENTERING CREDITS STATE***")

        container = document.getElementById("container");

        //crear imagenes
        canvas = createCanvas(ancho, alto);
        canvas.parent(container);        
        canvas.mousePressed(this.escape); 
        canvas.background(0);

        creditos = createImg('assets/images/creditos.png');
        creditos.position(0, 0); 
        creditos.parent(container);
        creditos.mousePressed(this.escape); 
        creditos.size(1120 * wPercentaje, 630 * hPercentaje);
    }  

    this.escape = function(){
        canvas.remove();
        creditos.remove();
        mgr.showScene(MainMenuState);
    }
}