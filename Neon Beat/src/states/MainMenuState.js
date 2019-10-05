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

    var state = 0;

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

        titulo_img = createImg('assets/images/menuPrincipal/titulo.png');
        titulo_img.position(59.5, 0); 
        titulo_img.parent(container); 

        //crear botones
        boton_jugar = createDiv();
        boton_jugar.parent(container);
        boton_jugar.position(0, 0);
        jugar_encendido_img = createImg('assets/images/menuPrincipal/jugar_encendido.png'); 
        jugar_encendido_img.parent(boton_jugar);

        boton_creditos = createDiv();
        boton_creditos.parent(container);
        boton_creditos.position(0, 0);
        creditos_apagados_img = createImg('assets/images/menuPrincipal/creditos_apagado.png'); 
        creditos_apagados_img.parent(boton_creditos);
    }  

    this.draw = function()
    {
        background(0);

        //Animación del fondo
        let bgIndex = Math.floor(backgroundIndex % backgroundAnimation.length);
        imageMode(CORNER);
        image(fondo_menu_img, 0, 0, width, height);
        
    }
    this.keyPressed = function(){
        switch(keyCode){
            case 119:
                if(state === 0){
                    state = 1;
                }
                if(state === 1){
                    state = 0;
                }
                break;
            case 115:
                if(state === 0){
                     state = 1;
                }
                if(state === 1){
                     state = 0;
                }
                break;
            case 32:
                if(state === 0){
                    mgr.showScene(GameState);
                }
                if(state === 1){

                }
        }
    }
}