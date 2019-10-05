function MainMenuState(){    
    
    var creditos_apagados_img;
    var creditos_encendidos_img;
    var fondo_menu_img;
    var jugar_apagado_img;
    var jugar_encendido_img;
    var titulo_img;
    var placeholder_fondotitulo_img;

    var boton_creditos;
    var boton_jugar;
    
    var container;
    var canvas;
    var backgroundIndex = 0;

    var state;

    this.enter = function()
    {
        console.log("[DEBUG] ***ENTERING MAIN MENU STATE***")
       
        //cargar imagenes
        creditos_apagados_img = loadImage('assets/images/menuPrincipal/creditos_apagado.png'); 
        creditos_encendidos_img = loadImage('assets/images/menuPrincipal/creditos_encendidos.png'); 
        fondo_menu_img = loadImage('assets/images/menuPrincipal/fondo_menu.png'); 
        jugar_apagado_img = loadImage('assets/images/menuPrincipal/jugar_apagado.png'); 
        jugar_encendido_img = loadImage('assets/images/menuPrincipal/jugar_encendido.png'); 
        titulo_img = loadImage('assets/images/menuPrincipal/titulo.png'); 
        placeholder_fondotitulo_img = loadImage('assets/images/menuPrincipal/placeholder_animacion_titulo.png'); 

        container = createDiv();
        container.position(window.outerWidth * 0.205, window.outerHeight * 0.165);

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
        jugar_encendido_img = createImg('assets/images/menuPrincipal/jugar_encendido.png'); 
        jugar_encendido_img.parent(boton_jugar);

        boton_creditos = createDiv();
        boton_creditos.parent(container);
        boton_creditos.position(502.5, 500);
        creditos_apagados_img = createImg('assets/images/menuPrincipal/creditos_apagado.png'); 
        creditos_apagados_img.parent(boton_creditos);

        state = 0;
    }  

    this.draw = function()
    {
        background(0);

        //Animación del fondo
        let bgIndex = Math.floor(backgroundIndex % backgroundAnimation.length);
        imageMode(CORNER);
        image(backgroundAnimation[bgIndex], 0, 0, width, height);

        backgroundIndex++;
        
    }
    this.keyPressed = function(){
        console.log(state);
        if(keyCode === 32){
            if(state === 0){
                mgr.showScene(GameState);
            }
            if(state === 1){
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