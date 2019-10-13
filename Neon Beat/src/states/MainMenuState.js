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
        boton_jugar = createDiv();
        boton_jugar.parent(container);
        boton_jugar.position(375, 250);
        boton_jugar.mousePressed(this.clickJugar); 
        jugar_encendido_img = createImg('assets/images/menuPrincipal/jugar_encendido.png'); 
        jugar_encendido_img.parent(boton_jugar);

        boton_creditos = createDiv();
        boton_creditos.parent(container);
        boton_creditos.position(502.5, 500);
        boton_creditos.mousePressed(this.clickCreditos);
        creditos_apagados_img = createImg('assets/images/menuPrincipal/creditos_apagado.png'); 
        creditos_apagados_img.parent(boton_creditos);

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
            boton_jugar.position(375, 250);
            creditos_encendidos_img.remove();
            creditos_apagados_img = createImg('assets/images/menuPrincipal/creditos_apagado.png'); 
            creditos_apagados_img.parent(boton_creditos);
            boton_creditos.position(502.5, 500);
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
            boton_jugar.position(486.5, 350);
            creditos_apagados_img.remove();
            creditos_encendidos_img = createImg('assets/images/menuPrincipal/creditos_encendidos.png'); 
            creditos_encendidos_img.parent(boton_creditos);
            boton_creditos.position(317, 370);
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

    this.keyPressed = function(){        
        if(keyCode === 32){
            if(state === 0){
                canvas.remove();
                boton_creditos.remove();
                boton_jugar.remove();
                placeholder_fondotitulo_img.remove();
                titulo_img.remove();
                mgr.showScene(SongSelectionState);
            }
            if(state === 1){
                canvas.remove();
                boton_creditos.remove();
                boton_jugar.remove();
                placeholder_fondotitulo_img.remove();
                titulo_img.remove();
                mgr.showScene(CreditsState);
            }
        }else{
            if(keyCode === 83 || keyCode === 87){
                if(state === 0){
                    state = 1;
                    jugar_encendido_img.remove();
                    jugar_apagado_img = createImg('assets/images/menuPrincipal/jugar_apagado.png'); 
                    jugar_apagado_img.parent(boton_jugar);
                    boton_jugar.position(486.5, 350);
                    creditos_apagados_img.remove();
                    creditos_encendidos_img = createImg('assets/images/menuPrincipal/creditos_encendidos.png'); 
                    creditos_encendidos_img.parent(boton_creditos);
                    boton_creditos.position(317, 370);
                }else if(state === 1){
                    state = 0;
                    jugar_apagado_img.remove();
                    jugar_encendido_img = createImg('assets/images/menuPrincipal/jugar_encendido.png'); 
                    jugar_encendido_img.parent(boton_jugar);
                    boton_jugar.position(375, 250);
                    creditos_encendidos_img.remove();
                    creditos_apagados_img = createImg('assets/images/menuPrincipal/creditos_apagado.png'); 
                    creditos_apagados_img.parent(boton_creditos);
                    boton_creditos.position(502.5, 500);
                }
            }
        }
    }
}