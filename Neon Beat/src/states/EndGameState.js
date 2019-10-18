function EndGameState(){

    var texto_victoria;
    var caja_puntuacion;

    var boton_intentar;
    var boton_salir;

    var backgroundIndex = 0;

    var button_salir_encendido;
    var button_salir_apagado;
    var button_otravez_encendido;
    var button_otravez_apagado;

    var state;
        
    // enter() will be executed each time the SceneManager switches
    // to this animation
    // Note: Animation1() doesn't have setup() or draw()
    this.enter = function()
    {
        console.log("[DEBUG] ***ENTERING ENDGAME STATE***")

        container = document.getElementById("container");
        state = 0;

        //cancion
        if(!cancion_ganar.sound.isPlaying()){
            cancion_ganar.sound.play();
        }        

        //crear imagenes
        canvas = createCanvas(ancho, alto);
        canvas.position(0,0);
        canvas.parent(container);
        canvas.background(0);

        texto_victoria = createImg('assets/images/PantallaVictoria/cartelVictoria.png');
        texto_victoria.position(0, 0); 
        texto_victoria.size(673 * wPercentaje, 333 * hPercentaje);
        texto_victoria.parent(container); 

        caja_puntuacion = createImg('assets/images/PantallaVictoria/caja_puntuacion.png');
        caja_puntuacion.position(0, 270*hPercentaje); 
        caja_puntuacion.size(467 * wPercentaje, 380 * hPercentaje);
        caja_puntuacion.parent(container);  

        //crear botones
        boton_intentar = createDiv();
        boton_intentar.parent(container);
        boton_intentar.position(772*wPercentaje, 101*hPercentaje);
        boton_intentar.mousePressed(this.clickJugar); 
        button_otravez_encendido = createImg('assets/images/PantallaVictoria/boton_otravez.png'); 
        button_otravez_encendido.parent(boton_intentar);
        button_otravez_encendido.size(348*wPercentaje, 220*hPercentaje);

        boton_salir = createDiv();
        boton_salir.parent(container);
        boton_salir.position(767*wPercentaje, 290*hPercentaje);
        boton_salir.mousePressed(this.clickCreditos);
        button_salir_apagado = createImg('assets/images/PantallaVictoria/boton_salir_apagado.png'); 
        button_salir_apagado.parent(boton_salir);
        button_salir_apagado.size(364*wPercentaje, 236*hPercentaje);

        state = 0;
    }

    this.draw = function(){          
        background(0);         

        fill(255, 255, 255);
        textAlign(CENTER);
        textFont(myFont[0]);
        textSize(30);
        stroke('rgba(100%,0%,100%,0.0)');
        text("Points: " + points, 0.25 * width, 0.6 * height);   

        fill(255, 255, 255);
        textAlign(CENTER);
        textFont(myFont[0]);
        textSize(30);
        stroke('rgba(100%,0%,100%,0.0)');
        text("Max Combo: " + combo, 0.25 * width, 0.8 * height); 

        //Animación del fondo
        if(!mobileDevice){
            let bgIndex = Math.floor(backgroundIndex % victoryAnim.length);
            imageMode(CORNER);
            image(victoryAnim[bgIndex], 0, 0, width, height);  
            backgroundIndex++;
        }
    }
    
    this.clickJugar = function(){
        clickSound.play();
        if(state === 1){
            state = 0;
            button_otravez_apagado.remove();
            button_otravez_encendido = createImg('assets/images/PantallaVictoria/boton_otravez.png');  
            button_otravez_encendido.parent(boton_intentar);
            button_otravez_encendido.size(348*wPercentaje, 220*hPercentaje);
            boton_intentar.position(772*wPercentaje, 101*hPercentaje);
            button_salir_encendido.remove();
            button_salir_apagado = createImg('assets/images/PantallaVictoria/boton_salir_apagado.png'); 
            button_salir_apagado.parent(boton_salir);
            button_salir_apagado.size(364*wPercentaje, 236*hPercentaje);
            boton_salir.position(767*wPercentaje, 290*hPercentaje);
        }else if(state === 0){            
            canvas.remove();
            texto_victoria.remove();
        
            boton_intentar.remove();
            boton_salir.remove();
            
            playAgain();
            cancion_ganar.stop();
            mgr.showScene(PreloadState);            
        }
    }

    this.clickCreditos = function(){
        clickSound.play();
        if(state === 0){
            state = 1;
            button_otravez_encendido.remove();
            button_otravez_apagado = createImg('assets/images/PantallaVictoria/boton_otravez_apagado.png'); 
            button_otravez_apagado.parent(boton_intentar);
            boton_intentar.position(772*wPercentaje, 101*hPercentaje);
            button_otravez_apagado.size(348*wPercentaje, 220*hPercentaje);
            button_salir_apagado.remove();
            button_salir_encendido = createImg('assets/images/PantallaVictoria/boton_salir.png'); 
            button_salir_encendido.parent(boton_salir);
            boton_salir.position(767*wPercentaje, 290*hPercentaje);
            button_salir_encendido.size(364*wPercentaje, 236*hPercentaje);
        }else if(state === 1){          
            texto_victoria.remove();
        
            boton_intentar.remove();
            boton_salir.remove();

            canvas.remove();
            reset();
            cancion_ganar.sound.stop();
            mgr.showScene(MainMenuState);
        }
    }
    
    this.windowResized = function(){        
        resizeContainer();
    }
    
    this.setSize = function(){
        if (!mobileDevice) {
            ancho = window.innerWidth - window.innerWidth*0.208*2;   
            alto = window.innerHeight - window.innerHeight*0.163*2;
            wPercentaje = ancho/1120;
            hPercentaje = alto/630;
            resizeCanvas(ancho, alto);
            background(0);
            
            texto_victoria.size(694*wPercentaje, 323*hPercentaje); 
            if(state === 0){
                button_otravez_encendido.size(348*wPercentaje, 220*hPercentaje);
                boton_intentar.position(772*wPercentaje, 101*hPercentaje);
                button_salir_apagado.size(364*wPercentaje, 236*hPercentaje);
                boton_salir.position(767*wPercentaje, 290*hPercentaje);
            }else{
                button_otravez_apagado.size(348*wPercentaje, 220*hPercentaje);
                boton_intentar.position(772*wPercentaje, 101*hPercentaje);
                button_salir_encendido.size(364*wPercentaje, 236*hPercentaje);
                boton_salir.position(767*wPercentaje, 290*hPercentaje);
            }
        }else{            
            ancho = window.innerWidth;
            alto = window.innerHeight;
            wPercentaje = ancho/1120;
            hPercentaje = alto/630;
            resizeCanvas(ancho, alto);
            canvas.background(0); 
            
            texto_victoria.size(694*wPercentaje, 323*hPercentaje); 
            if(state === 0){
                button_otravez_encendido.size(348*wPercentaje, 220*hPercentaje);
                boton_intentar.position(772*wPercentaje, 101*hPercentaje);
                button_salir_apagado.size(364*wPercentaje, 236*hPercentaje);
                boton_salir.position(767*wPercentaje, 290*hPercentaje);
            }else{
                button_otravez_apagado.size(348*wPercentaje, 220*hPercentaje);
                boton_intentar.position(772*wPercentaje, 101*hPercentaje);
                button_salir_encendido.size(364*wPercentaje, 236*hPercentaje);
                boton_salir.position(767*wPercentaje, 290*hPercentaje);
            }
        }
    }

    this.windowResized = function(){
         this.setSize();
    }
}