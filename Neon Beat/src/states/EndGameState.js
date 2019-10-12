function EndGameState(){
    var textX;
    var textY;

    var container;
    var canvas;

    var fondoVictoria;
    var placeholder_particulas;
    var texto_victoria;

    var button_salir_encendido;
    var button_salir_apagado;
    var button_otravez_encendido;
    var button_otravez_apagado;

    var state;

    var texto;
    
    // enter() will be executed each time the SceneManager switches
    // to this animation
    // Note: Animation1() doesn't have setup() or draw()
    this.enter = function()
    {
        console.log("[DEBUG] ***ENTERING ENDGAME STATE***")

        container = document.getElementById("container");
        state = 0;

        //crear imagenes
        canvas = createCanvas(1120, 630);
        canvas.position(0,0);
        canvas.parent(container);
        canvas.background(0);

        fondoVictoria = createImg('assets/images/PantallaVictoria/fondo.png'); 
        fondoVictoria.position(0, 0); 
        fondoVictoria.parent(container);

        placeholder_particulas = createImg('assets/images/PantallaVictoria/placeholder_particulas.png'); 
        placeholder_particulas.position(0, 0); 
        placeholder_particulas.parent(container);

        texto_victoria = createImg('assets/images/PantallaVictoria/cartelVictoria.png'); 
        texto_victoria.position(0, 0); 
        texto_victoria.parent(container);     

        button_salir_apagado = createImg('assets/images/PantallaVictoria/boton_salir_apagado.png'); 
        button_salir_apagado.position(767, 320); 
        button_salir_apagado.parent(container);

        button_otravez_encendido = createImg('assets/images/PantallaVictoria/boton_otravez.png'); 
        button_otravez_encendido.position(771, 100); 
        button_otravez_encendido.parent(container); 

        /*background("teal");
        textX = 10;
        textY = 0;
        textAlign(CENTER);
        fill("black");
        text("[STATE] ***END GAME STATE*** \n" + 
            "... or mouse to advance animation.\n\n" +
            "Press any other key to display it.", width / 2, height / 2);
        fill(255, 255, 255);
        textSize(30);
        stroke('rgba(100%,0%,100%,0.0)');
        text('Final Score: ' + finalScore + "\n" + 
            "Max combo: " + maxCombo, 100, 100);*/
    }
    this.keyPressed = function(){
        if(keyCode === 32){
            if(state === 0){
                canvas.remove();
                mgr.showScene(GameState);
            }
            if(state === 1){
                reset();
                canvas.remove();
                mgr.showScene(MainMenuState);
            }
        }else{
            if(keyCode === 83 || keyCode === 87){
                if(state === 0){
                    state = 1;
                    button_intentar_encendido.remove();
                    button_intentar_apagado = createImg('assets/images/PantallaVictoria/boton_intentar_apagado.png'); 
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
    this.mousePressed = function()
    {
        this.sceneManager.showNextScene();
    }
}