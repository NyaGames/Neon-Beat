function DefeatState(){    
        
    var container;
    var canvas;

    var fondoDerrota;
    var placeholder_particulas;
    var texto_derrota;

    var button_salir_encendido;
    var button_salir_apagado;
    var button_intentar_encendido;
    var button_intentar_apagado;

    var state;

    this.enter = function()
    {
        console.log("[DEBUG] ***ENTERING DEFEAT STATE***")

        container = createDiv();
        container.position(window.outerWidth * 0.205, window.outerHeight * 0.165);

        state = 0;

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

        button_intentar_encendido = createImg('assets/images/PantallaDerrota/boton_intentar.png'); 
        button_intentar_encendido.position(0, 0); 
        button_intentar_encendido.parent(container);        

        button_salir_apagado = createImg('assets/images/PantallaDerrota/boton_salir_apagado.png'); 
        button_salir_apagado.position(0, 0); 
        button_salir_apagado.parent(container);
    }  

    this.keyPressed = function(){
        if(keyCode === 32){
            if(state === 0){
                container.remove();
                mgr.showScene(GameState);
            }
            if(state === 1){
                container.remove();
                mgr.showScene(MainMenuState);
            }
        }else{
            if(keyCode === 83 || keyCode === 87){
                if(state === 0){
                    state = 1;
                    button_intentar_encendido.remove();
                    button_intentar_apagado = createImg('assets/images/PantallaDerrota/boton_intentar_apagado.png'); 
                    button_intentar_apagado.position(0, 0); 
                    button_intentar_apagado.parent(container);  
                    button_salir_apagado.remove();
                    button_salir_encendido = createImg('assets/images/PantallaDerrota/boton_salir.png'); 
                    button_salir_encendido.position(0, 0); 
                    button_salir_encendido.parent(container);
                }else if(state === 1){
                    state = 0;
                    button_intentar_apagado.remove();
                    button_intentar_encendido = createImg('assets/images/PantallaDerrota/boton_intentar.png'); 
                    button_intentar_encendido.position(0, 0); 
                    button_intentar_encendido.parent(container);  
                    button_salir_encendido.remove();
                    button_salir_apagado = createImg('assets/images/PantallaDerrota/boton_salir_apagado.png'); 
                    button_salir_apagado.position(0, 0); 
                    button_salir_apagado.parent(container);
                }
            }
        }
    }
}