function DefeatState(){    
        
   
    var boton_creditos;
    var boton_jugar;

    var fondoDerrota;
    var placeholder_particulas;
    var texto_derrota;

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
        console.log("[DEBUG] ***ENTERING DEFEAT STATE***")

        container = document.getElementById("container");
        state = 0;

        //crear imagenes
        canvas = createCanvas(1120, 630);
        canvas.position(0, 0); 
        canvas.parent(container);
        canvas.background(0);

        placeholder_fondotitulo_img = createImg('assets/images/PantallaDerrota/placeholder_particulas.png'); 
        placeholder_fondotitulo_img.position(0, 0); 
        placeholder_fondotitulo_img.parent(container);

        texto_derrota = createImg('assets/images/PantallaDerrota/texto_derrota.png');
        texto_derrota.position(0, 0); 
        texto_derrota.parent(container); 

        //crear botones
        boton_intentar = createDiv();
        boton_intentar.parent(container);
        boton_intentar.position(645, 100);
        boton_intentar.mousePressed(this.clickJugar); 
        button_otravez_encendido = createImg('assets/images/PantallaDerrota/boton_intentar.png'); 
        button_otravez_encendido.parent(boton_intentar);

        boton_salir = createDiv();
        boton_salir.parent(container);
        boton_salir.position(777, 350);
        boton_salir.mousePressed(this.clickCreditos);
        button_salir_apagado = createImg('assets/images/PantallaDerrota/boton_salir_apagado.png'); 
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
            button_otravez_encendido = createImg('assets/images/PantallaDerrota/boton_intentar.png'); 
            button_otravez_encendido.parent(boton_intentar);
            boton_intentar.position(645, 100);
            button_salir_encendido.remove();
            button_salir_apagado = createImg('assets/images/PantallaDerrota/boton_salir_apagado.png'); 
            button_salir_apagado.parent(boton_salir);
            boton_salir.position(777, 350);
        }else if(state === 0){            
            canvas.remove();
            mgr.showScene(PreloadState);
        }
    }

    this.clickCreditos = function(){
        if(state === 0){
            state = 1;
            button_otravez_encendido.remove();
            button_otravez_apagado = createImg('assets/images/PantallaDerrota/boton_intentar_apagado.png'); 
            button_otravez_apagado.parent(boton_intentar);
            boton_intentar.position(740, 150);
            button_salir_apagado.remove();
            button_salir_encendido = createImg('assets/images/PantallaDerrota/boton_salir.png'); 
            button_salir_encendido.parent(boton_salir);
            boton_salir.position(667, 300);
        }else if(state === 1){            
            canvas.remove();
            mgr.showScene(MainMenuState);
        }
    }
}