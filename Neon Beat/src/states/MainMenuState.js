function MainMenuState(){      
    var boton_creditos;
    var boton_jugar;
    var placeholder_fondotitulo_img;
    var titulo_img;
    
    var container;
    var canvas;
    var state;


    var menuBackgroundIndex = 0;

    this.enter = function()
    {
        console.log("[DEBUG] ***ENTERING MAIN MENU STATE***")
       
        container = document.getElementById("container");

        //cancion de menu
        if(!cancion_menu.isPlaying()){
            cancion_menu.play();
        }

        //crear imagenes
        canvas = createCanvas(ancho, alto);
        canvas.parent(container);
        canvas.background(0);

        placeholder_fondotitulo_img = createImg('assets/images/menuPrincipal/placeholder_animacion_titulo.png'); 
        placeholder_fondotitulo_img.position(106 * wPercentaje, 0); 
        placeholder_fondotitulo_img.parent(container);
        placeholder_fondotitulo_img.size(908 * wPercentaje, 206 * hPercentaje);

        titulo_img = createImg('assets/images/menuPrincipal/titulo.png');
        titulo_img.position(52 * wPercentaje, 0 * hPercentaje);         
        titulo_img.size(1011 * wPercentaje, 316 * hPercentaje); 
        titulo_img.parent(container); 

        //crear botones
        boton_jugar = createDiv();
        boton_jugar.parent(container);
        boton_jugar.position(375 * wPercentaje, 250 * hPercentaje);
        boton_jugar.mousePressed(this.clickJugar); 
        jugar_encendido_img = createImg('assets/images/menuPrincipal/jugar_encendido.png'); 
        jugar_encendido_img.parent(boton_jugar);
        jugar_encendido_img.size(377 * wPercentaje, 237 * hPercentaje);

        boton_creditos = createDiv();
        boton_creditos.parent(container);
        boton_creditos.position(502.5* wPercentaje, 500* hPercentaje);
        boton_creditos.mousePressed(this.clickCreditos);
        creditos_apagados_img = createImg('assets/images/menuPrincipal/creditos_apagado.png'); 
        creditos_apagados_img.parent(boton_creditos);
        creditos_apagados_img.size(115 * wPercentaje, 40 * hPercentaje);

        state = 0;
    }  

    this.draw = function()
    {
        background(0);

        //Animación del fondo
        let bgIndex = Math.floor(menuBackgroundIndex % menuBackground.length);
        imageMode(CORNER);
        image(menuBackground[bgIndex], 0, 0, width, height);

        menuBackgroundIndex++;        
    }

    this.clickJugar = function(){
        if(state === 1){
            state = 0;
            jugar_apagado_img.remove();
            jugar_encendido_img = createImg('assets/images/menuPrincipal/jugar_encendido.png'); 
            jugar_encendido_img.parent(boton_jugar);
            jugar_encendido_img.size(377 * wPercentaje, 237 * hPercentaje);
            boton_jugar.position(375* wPercentaje, 250* hPercentaje);
            creditos_encendidos_img.remove();
            creditos_apagados_img = createImg('assets/images/menuPrincipal/creditos_apagado.png'); 
            creditos_apagados_img.parent(boton_creditos);
            creditos_apagados_img.size(115 * wPercentaje, 40 * hPercentaje);
            boton_creditos.position(502.5* wPercentaje, 500* hPercentaje);
        }else if(state === 0){            
            canvas.remove();
            boton_creditos.remove();
            boton_jugar.remove();
            placeholder_fondotitulo_img.remove();
            titulo_img.remove();
            mgr.showScene(SongSelectionState);
        }
    }

    this.clickCreditos = function(){
        if(state === 0){
            state = 1;
            jugar_encendido_img.remove();
            jugar_apagado_img = createImg('assets/images/menuPrincipal/jugar_apagado.png'); 
            jugar_apagado_img.parent(boton_jugar);
            jugar_apagado_img.size(141 * wPercentaje, 56 * hPercentaje);
            boton_jugar.position(530* wPercentaje, 350* hPercentaje);
            creditos_apagados_img.remove();
            creditos_encendidos_img = createImg('assets/images/menuPrincipal/creditos_encendidos.png'); 
            creditos_encendidos_img.parent(boton_creditos);
            creditos_encendidos_img.size(486 * wPercentaje, 259 * hPercentaje);
            boton_creditos.position(317* wPercentaje, 370* hPercentaje);
        }else if(state === 1){      
            canvas.remove();
            boton_creditos.remove();
            boton_jugar.remove();
            placeholder_fondotitulo_img.remove();
            titulo_img.remove();
            boton_creditos.remove();
            boton_jugar.remove();
            placeholder_fondotitulo_img.remove();
            titulo_img.remove();
            mgr.showScene(CreditsState);
        }
    }
}