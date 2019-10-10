function EndGameState(){
    var textX;
    var textY;

    var boton_creditos;
    var boton_jugar;

    var fondoVictoria;
    var placeholder_particulas;
    var texto_victoria;

    var boton_intentar;
    var boton_salir;

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
        canvas.parent(container);
        canvas.background(0);

        placeholder_fondotitulo_img = createImg('assets/images/menuPrincipal/placeholder_animacion_titulo.png'); 
        placeholder_fondotitulo_img.position(106, 0); 
        placeholder_fondotitulo_img.parent(container);

        titulo_img = createImg('assets/images/menuPrincipal/titulo.png');
        titulo_img.position(52, 0); 
        titulo_img.parent(container); 

        //crear botones
        boton_intentar = createDiv();
        boton_intentar.parent(container);
        boton_intentar.position(375, 250);
        boton_intentar.mousePressed(this.clickJugar); 
        button_otravez_encendido = createImg('assets/images/menuPrincipal/jugar_encendido.png'); 
        button_otravez_encendido.parent(boton_intentar);

        boton_salir = createDiv();
        boton_salir.parent(container);
        boton_salir.position(502.5, 500);
        boton_salir.mousePressed(this.clickCreditos);
        button_salir_apagado = createImg('assets/images/menuPrincipal/creditos_apagado.png'); 
        button_salir_apagado.parent(boton_salir);

        state = 0;
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
    
    this.clickJugar = function(){
        if(state === 1){
            state = 0;
            button_otravez_apagado.remove();
            button_otravez_encendido = createImg('assets/images/menuPrincipal/jugar_encendido.png'); 
            button_otravez_encendido.parent(boton_intentar);
            boton_intentar.position(375, 250);
            button_salir_encendido.remove();
            button_salir_apagado = createImg('assets/images/menuPrincipal/creditos_apagado.png'); 
            button_salir_apagado.parent(boton_salir);
            boton_salir.position(502.5, 500);
        }else if(state === 0){            
            canvas.remove();
            mgr.showScene(PreloadState);
        }
    }

    this.clickCreditos = function(){
        if(state === 0){
            state = 1;
            button_otravez_encendido.remove();
            button_otravez_apagado = createImg('assets/images/menuPrincipal/jugar_apagado.png'); 
            button_otravez_apagado.parent(boton_intentar);
            boton_intentar.position(486.5, 350);
            button_salir_apagado.remove();
            button_salir_encendido = createImg('assets/images/menuPrincipal/creditos_encendidos.png'); 
            button_salir_encendido.parent(boton_salir);
            boton_salir.position(317, 370);
        }else if(state === 1){            
            canvas.remove();
            mgr.showScene(MainMenuState);
        }
    }


    /*this.mousePressed = function()
    {
        this.sceneManager.showNextScene();
    }*/
}