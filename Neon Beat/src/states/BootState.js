var menuBackground = [];
var loadingScreen = [];
var tutorial = [];
var myFont = [];

var mainMenuAssets = [];

var mainMenuCounter = 0;
var totalMainMenuAssets = 7;

var container;
var canvas;

var ancho;        
var alto;
var wPercentaje;
var hPercentaje;

var atencion;
var cancion_menu = {sound: null};
var cancion_perder = {sound: null};;
var cancion_ganar = {sound: null};;
var clickSound;
var combo1Sound;
var combo2Sound;

function BootState() {
    ///Estado encargado de cargar los assets que aparecen en el menú
    this.angle = 0;

    this.enter = function () {
        console.log("[DEBUG] ***ENTERING BOOT STATE***")

        container = createDiv();
        this.setSize();
        container.id("container");

        canvas = createCanvas(ancho, alto);
        canvas.position(0, 0);
        canvas.parent(container);  

        atencion = loadImage("assets/images/atencion.png")       
        
        if(mobileDevice){
            this.loadAssetsForMobiles();
        }else{
            this.loadAssets();    
        }
        clickSound= loadSound('assets/sounds/pop.mp3');
        combo1Sound = loadSound('assets/sounds/combo1.mp3');
        combo2Sound = loadSound('assets/sounds/combo2.mp3');
    }

    this.draw = function () {
        background(51);
        
        imageMode(CORNER);
        image(atencion, 0, 0, ancho, alto);

        noStroke();
        fill(255, 200);
        textSize(ancho * 0.03);
        textAlign(LEFT);
        text('Cargando assets...', alto * 1/10, alto * 1/8);    
        
        translate(width * 6 / 7, 80);
        rotate(this.angle);
        strokeWeight(4);
        stroke(255);
        line(0, 0, ancho * 0.05, 0);
        this.angle += 1;  
    }

    this.loadSpritesheet = function (arr, numImages, width, height, url) {
        loadImage(url, assetLoaded, this.onLoadingError);

        function assetLoaded(asset) {
            let w = asset.width;
            let h = asset.height;

            let numCols = w / width;
            let numRows = h / height;

            for (let y = 0, i = 0; y < numRows; y++) {
                for (let x = 0; x < numCols; x++ , i++) {
                    if (i == numImages - 1) {
                        break;
                    }

                    let img = asset.get(x * width, y * height, width, height);
                    arr.push(img);
                }
            }

            mainMenuCounter++;

            if (mainMenuCounter == totalMainMenuAssets) {
                mgr.showScene(MainMenuState);
            }
        }
    }

    this.loadSound = function(varToStore, filename){
        loadSound(filename, soundLoaded);

        function soundLoaded(sound){
            mainMenuCounter++;
            varToStore.sound = sound;   

            if (mainMenuCounter == totalMainMenuAssets) {
                mgr.showScene(MainMenuState);
            }
        }            
    }

    this.loadAssets = function () {
        this.loadSpritesheet(menuBackground, 120, 912, 513, "assets/AfterEffect/Menu/menu_animation.png");
        this.loadSpritesheet(loadingScreen, 120, 450, 250, "assets/AfterEffect/CargaBGpeque/image1.png");     
        this.loadImage(tutorial, "assets/images/tutorial.png");
        this.loadFont(myFont, 'assets/fonts/gill-sans-ultra-bold-2.ttf');
        this.loadSound(cancion_menu, "assets/ost/Kate_Orange_-_You__instrumental_.mp3");
        this.loadSound(cancion_perder, "assets/ost/Julius_Nox_-_Giulio_s_Page_-_Tortoise.mp3");
        this.loadSound(cancion_ganar, "assets/ost/Sergey_Tsygankov_-_Spring_Rays.mp3");
    }

    this.setSize = function(){
        if (!mobileDevice) {
            container.position(window.outerWidth * 0.205, window.outerHeight * 0.165);
            ancho = window.innerWidth - window.innerWidth*0.208*2;   
            alto = window.innerHeight - window.innerHeight*0.163*2;
            wPercentaje = ancho/1120;
            hPercentaje = alto/630;
            resizeCanvas(ancho, alto);
            background(0);
        }else{
            container.position(0, 0);                
            ancho = window.innerWidth;
            alto = window.innerHeight;
            wPercentaje = ancho/1120;
            hPercentaje = alto/630;
            resizeCanvas(ancho, alto);
            background(0);
        }
    }

    this.windowResized = function(){
       this.setSize();
    }

    this.loadAssetsForMobiles = function () {
        this.loadSpritesheet(menuBackground, 2, 912, 513, "assets/AfterEffect/Menu/menu_animation.png");
        this.loadSpritesheet(loadingScreen, 2, 450, 250, "assets/AfterEffect/CargaBGpeque/image1.png");
        this.loadImage(tutorial, "assets/images/tutorial.png");
        this.loadFont(myFont, 'assets/fonts/gill-sans-ultra-bold-2.ttf');
        this.loadSound(cancion_menu, "assets/ost/Kate_Orange_-_You__instrumental_.mp3");
        this.loadSound(cancion_perder, "assets/ost/Julius_Nox_-_Giulio_s_Page_-_Tortoise.mp3");
        this.loadSound(cancion_ganar, "assets/ost/Sergey_Tsygankov_-_Spring_Rays.mp3");
    }

    this.loadImage = function(arr, url){
        loadImage(url, imageLoaded);

        function imageLoaded(asset){
            arr.push(asset);
            mainMenuCounter++;

            
            if (mainMenuCounter == totalMainMenuAssets) {
                mgr.showScene(MainMenuState);
            }
        }
    }

    this.loadFont = function(arr, url){
        loadFont(url, fontLoaded)

        function fontLoaded(asset){
            arr.push(asset);
            mainMenuCounter++;

            if (mainMenuCounter == totalMainMenuAssets) {
                mgr.showScene(MainMenuState);
            }
        }
    }
}