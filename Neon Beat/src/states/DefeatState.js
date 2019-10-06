function DefeatState(){    
        
    var container;
    var canvas;

    var fondoDerrota;
    var placeholder_particulas;
    var texto_derrota;

    this.enter = function()
    {
        console.log("[DEBUG] ***ENTERING DEFEAT STATE***")

        container = createDiv();
        container.position(window.outerWidth * 0.205, window.outerHeight * 0.165);

        //crear imagenes
        canvas = createCanvas(1120, 630);
        canvas.parent(container);
        canvas.background(0);

        fondoDerrota = createImg('assets/images/PantallaDerrota/fondo_derrota.png'); 
        fondoDerrota.position(0, 0); 
        fondoDerrota.parent(container);

        placeholder_particulas = createImg('assets/images/PantallaDerrota/placeholder_particulas.png'); 
        placeholder_particulas.position(0, 0); 
        placeholder_particulas.parent(container);

        texto_derrota = createImg('assets/images/PantallaDerrota/texto_derrota.png'); 
        texto_derrota.position(0, 0); 
        texto_derrota.parent(container);
    }  

    this.keyPressed = function(){
        if(keyCode === 27){
            mgr.showScene(MainMenuState);
        }
    }
}