var menuBackground = [];
var loadingScreen = [];

var mainMenuAssets = [];

var mainMenuCounter = 0;
var totalMainMenuAssets = 5;

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
    }

    this.draw = function () {
        background(51);
        
        imageMode(CORNER);
        image(atencion, 0, 0, ancho, alto);

        noStroke();
        fill(255, 200);
        textSize(32);
        textAlign(LEFT);
        text('Cargando assets...', 40, 80);    
        
        translate(width * 6 / 7, 80);
        rotate(this.angle);
        strokeWeight(4);
        stroke(255);
        line(0, 0, 50, 0);
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
        this.loadSound(cancion_menu, "assets/ost/Kate_Orange_-_You__instrumental_.mp3");
        this.loadSound(cancion_perder, "assets/ost/Julius_Nox_-_Giulio_s_Page_-_Tortoise.mp3");
        this.loadSound(cancion_ganar, "assets/ost/Sergey_Tsygankov_-_Spring_Rays.mp3");
    }
}