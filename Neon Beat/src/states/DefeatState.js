    var fondoDerrota;
    var texto_derrota;

    var boton_intentar;
    var boton_salir;
    var button_salir_encendido;
    var button_salir_apagado;
    var button_otravez_encendido;
    var button_otravez_apagado;
function DefeatState(){    
        
   
    var boton_creditos;
    var boton_jugar;

    var backgroundIndex = 0;

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

        //cancion
        if(!cancion_perder.sound.isPlaying()){
            cancion_perder.sound.play();
        }
        
        //crear imagenes
        canvas = createCanvas(ancho, alto);
        canvas.position(0, 0); 
        canvas.parent(container);
        canvas.background(0);

        texto_derrota = createImg('assets/images/PantallaDerrota/texto_derrota.png');
        texto_derrota.position(0, 0); 
        texto_derrota.size(694*wPercentaje, 323*hPercentaje); 
        texto_derrota.parent(container); 

        //crear botones
        boton_intentar = createDiv();
        boton_intentar.parent(container);
        boton_intentar.position(645*wPercentaje, 100*hPercentaje);
        boton_intentar.mousePressed(this.clickJugar); 
        button_otravez_encendido = createImg('assets/images/PantallaDerrota/boton_intentar.png'); 
        button_otravez_encendido.size(475*wPercentaje, 302*hPercentaje); 
        button_otravez_encendido.parent(boton_intentar);

        boton_salir = createDiv();
        boton_salir.parent(container);
        boton_salir.position(777*wPercentaje, 350*hPercentaje);
        boton_salir.mousePressed(this.clickCreditos);
        button_salir_apagado = createImg('assets/images/PantallaDerrota/boton_salir_apagado.png'); 
        button_salir_apagado.size(340*wPercentaje, 209*hPercentaje); 
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

    this.draw = function(){    
        //Animación del fondo
        
        background(0);
        if(!mobileDevice){
            let bgIndex = Math.floor(backgroundIndex % defeatAnim.length);
            imageMode(CORNER);
            image(defeatAnim[bgIndex], 0, 0, width, height);  
    
            backgroundIndex++;
        }
    }
    
    this.clickJugar = function(){
        if(state === 1){
            state = 0;
            button_otravez_apagado.remove();
            button_otravez_encendido = createImg('assets/images/PantallaDerrota/boton_intentar.png'); 
            button_otravez_encendido.parent(boton_intentar);
            button_otravez_encendido.size(475*wPercentaje, 302*hPercentaje); 
            boton_intentar.position(645*wPercentaje, 100*hPercentaje);
            button_salir_encendido.remove();
            button_salir_apagado = createImg('assets/images/PantallaDerrota/boton_salir_apagado.png'); 
            button_salir_apagado.parent(boton_salir);
            button_salir_apagado.size(340*wPercentaje, 209*hPercentaje); 
            boton_salir.position(777*wPercentaje, 350*hPercentaje);
        }else if(state === 0){            
            canvas.remove();
            texto_derrota.remove();
        
            boton_intentar.remove();
            boton_salir.remove();
            
            //reset(true);
            playAgain();
            
            cancion_perder.sound.stop();
            mgr.showScene(PreloadState);

            //location.reload(); 
        }
    }
    

    this.clickCreditos = function(){
        if(state === 0){
            state = 1;
            button_otravez_encendido.remove();
            button_otravez_apagado = createImg('assets/images/PantallaDerrota/boton_intentar_apagado.png'); 
            button_otravez_apagado.parent(boton_intentar);
            button_otravez_apagado.size(379*wPercentaje, 206*hPercentaje); 
            boton_intentar.position(740*wPercentaje, 150*hPercentaje);
            button_salir_apagado.remove();
            button_salir_encendido = createImg('assets/images/PantallaDerrota/boton_salir.png'); 
            button_salir_encendido.parent(boton_salir);
            button_salir_encendido.size(451*wPercentaje, 282*hPercentaje); 
            boton_salir.position(667*wPercentaje, 300*hPercentaje);
        }else if(state === 1){         
            canvas.remove();
            texto_derrota.remove();
        
            boton_intentar.remove();
            boton_salir.remove();

            reset(false);
            cancion_perder.sound.stop();
            mgr.showScene(MainMenuState);

            //location.reload(); 
        }
    }
    
    this.setSize = function(){
        if (!mobileDevice) {
            ancho = window.innerWidth - window.innerWidth*0.208*2;   
            alto = window.innerHeight - window.innerHeight*0.163*2;
            wPercentaje = ancho/1120;
            hPercentaje = alto/630;
            resizeCanvas(ancho, alto);
            background(0);
            
            texto_derrota.size(694*wPercentaje, 323*hPercentaje); 
            if(state === 0){
                button_otravez_encendido.size(475*wPercentaje, 302*hPercentaje); 
                boton_intentar.position(645*wPercentaje, 100*hPercentaje);
                button_salir_apagado.size(340*wPercentaje, 209*hPercentaje); 
                boton_salir.position(777*wPercentaje, 350*hPercentaje);
            }else{
                button_otravez_apagado.size(379*wPercentaje, 206*hPercentaje); 
                boton_intentar.position(740*wPercentaje, 150*hPercentaje);
                button_salir_encendido.size(451*wPercentaje, 282*hPercentaje); 
                boton_salir.position(667*wPercentaje, 300*hPercentaje);
            }
        }else{            
            ancho = window.innerWidth;
            alto = window.innerHeight;
            wPercentaje = ancho/1120;
            hPercentaje = alto/630;
            resizeCanvas(ancho, alto);
            canvas.background(0);                
            
            texto_derrota.size(694*wPercentaje, 323*hPercentaje); 
            if(state === 0){
                button_otravez_encendido.size(475*wPercentaje, 302*hPercentaje); 
                boton_intentar.position(645*wPercentaje, 100*hPercentaje);
                button_salir_apagado.size(340*wPercentaje, 209*hPercentaje); 
                boton_salir.position(777*wPercentaje, 350*hPercentaje);
            }else{
                button_otravez_apagado.size(379*wPercentaje, 206*hPercentaje); 
                boton_intentar.position(740*wPercentaje, 150*hPercentaje);
                button_salir_encendido.size(451*wPercentaje, 282*hPercentaje); 
                boton_salir.position(667*wPercentaje, 300*hPercentaje);
            }
    }
}   

    this.windowResized = function(){
         this.setSize();
    }
}