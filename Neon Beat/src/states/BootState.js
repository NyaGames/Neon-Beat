var creditos_apagados_img;
var creditos_encendidos_img;
var fondo_menu_img;
var jugar_apagado_img;
var jugar_encendido_img;
var titulo_img;
var placeholder_fondotitulo_img;
var menuBackground = [];

var menuBackgroundNumber = 120;

var mainMenuAssets = [];
var totalMainMenuAssets = 7 + menuBackgroundNumber;
var mainMenuCounter = 0;

var bootLoading = true;

function BootState(){
    ///Estado encargado de cargar los assets que aparecen en el menú
    this.angle = 0;

    this.enter = function()
    {
       console.log("[DEBUG] ***ENTERING BOOT STATE***")
       this.loadAssets();
       createCanvas(1120, 630);
       //mgr.showScene(MainMenuState);
    }  

    this.draw = function(){
        background(51);
        if (bootLoading) {
            stroke(255);
            noFill();
            rect(10, 10, 200, 20);

            noStroke();
            fill(255, 100);

            var w = 200 * mainMenuCounter / totalMainMenuAssets;
            rect(10, 10, w, 20);
            
            textSize(32);
            textAlign(CENTER);
            text('Loading assets', width / 2, height - 100);

            translate(width * 0.5, height * 0.5);
            rotate(this.angle);
            strokeWeight(4);
            stroke(255);
            line(0, 0, 100, 0);
            this.angle += 1;
        } else {
            background(0, 255, 0);
        }
    }

    this.loadAsset = function (type, arr, index, url) {
        switch (type) {
            case "IMAGE":
                loadImage(url, this.assetLoaded, this.onLoadingError)
                break;
        }

        this.assetLoaded = function (asset) {          
            mainMenuAssets[mainMenuCounter] = asset;
            if(arr != null){
                arr[index] = asset;
            }
            mainMenuCounter++;

            if (mainMenuCounter == totalMainMenuAssets - 1) {
                mgr.showScene(MainMenuState);
            }
        }
    }

    this.loadAssets = function(){

        for (let i = 0; i < menuBackgroundNumber; i++) {        
            if (i < 10) {
                //highestScoreAnimation.push(loadImage('assets/AfterEffect/300/0000' + i + '.png'));
                this.loadAsset("IMAGE", menuBackground, i, 'assets/AfterEffect/Menu/0000' + i + '.png');
            } else if (i < 100) {
                this.loadAsset("IMAGE", menuBackground, i, 'assets/AfterEffect/Menu/000' + i + '.png');
            } else if (i < 1000) {
                this.loadAsset("IMAGE", menuBackground, i, 'assets/AfterEffect/Menu/00' + i + '.png');
            }
        }

        creditos_apagados_img = this.loadAsset("IMAGE", null, 0, 'assets/images/menuPrincipal/creditos_apagado.png');//loadImage('assets/images/menuPrincipal/creditos_apagado.png'); 
        creditos_encendidos_img = this.loadAsset("IMAGE", null, 0, 'assets/images/menuPrincipal/creditos_encendidos.png');//loadImage('assets/images/menuPrincipal/creditos_encendidos.png'); 
        fondo_menu_img = this.loadAsset("IMAGE", null, 0, 'assets/images/menuPrincipal/fondo_menu.png');//loadImage('assets/images/menuPrincipal/fondo_menu.png'); 
        jugar_apagado_img = this.loadAsset("IMAGE", null, 0, 'assets/images/menuPrincipal/jugar_apagado.png');//loadImage('assets/images/menuPrincipal/jugar_apagado.png'); 
        jugar_encendido_img = this.loadAsset("IMAGE", null, 0, 'assets/images/menuPrincipal/jugar_encendido.png');//loadImage('assets/images/menuPrincipal/jugar_encendido.png'); 
        titulo_img = this.loadAsset("IMAGE", null, 0, 'assets/images/menuPrincipal/titulo.png');//loadImage('assets/images/menuPrincipal/titulo.png'); 
        placeholder_fondotitulo_img = this.loadAsset("IMAGE", null, 0, 'assets/images/menuPrincipal/placeholder_animacion_titulo.png');//loadImage('assets/images/menuPrincipal/placeholder_animacion_titulo.png'); 
    }
}