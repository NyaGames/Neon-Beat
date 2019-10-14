var menuBackground = [];
var loadingScreen = [];

var mainMenuAssets = [];

var mainMenuCounter = 0;
var totalMainMenuAssets = 2;

var container;
var canvas;

var atencion;
var cancion_menu;
var cancion_perder;
var cancion_ganar;

function BootState() {
    ///Estado encargado de cargar los assets que aparecen en el menú
    this.angle = 0;

    this.enter = function () {
        console.log("[DEBUG] ***ENTERING BOOT STATE***")
        container = createDiv();
        container.position(window.outerWidth * 0.205, window.outerHeight * 0.165);
        container.id("container");

        canvas = createCanvas(1120, 630);
        canvas.position(0, 0);
        canvas.parent(container);  

        atencion = loadImage("assets/images/atencion.png")
        cancion_menu = loadSound("assets/ost/Kate_Orange_-_You__instrumental_.mp3")
        cancion_perder = loadSound("assets/ost/Julius_Nox_-_Giulio_s_Page_-_Tortoise.mp3")
        cancion_ganar = loadSound("assets/ost/Sergey_Tsygankov_-_Spring_Rays.mp3")
        
        this.loadAssets();      
    }

    this.draw = function () {
        background(51);
        
        imageMode(CORNER);
        image(atencion, 0, 0, width, height);

        noStroke();
        fill(255, 200);
        textSize(32);
        textAlign(LEFT);
        text('Cargando assets...', 40, 80);
       
        /*stroke(255);
        noFill();
        rect(10, 10, 200, 20);

        noStroke();
        fill(255, 100);

        var w = 200 * mainMenuCounter / totalMainMenuAssets;
        rect(10, 10, w, 20);

        */


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

    this.loadAssets = function () {
        this.loadSpritesheet(menuBackground, 120, 912, 513, "assets/AfterEffect/Menu/menu_animation.png");
        this.loadSpritesheet(loadingScreen, 120, 450, 250, "assets/AfterEffect/CargaBGpeque/image1.png");
    }
}