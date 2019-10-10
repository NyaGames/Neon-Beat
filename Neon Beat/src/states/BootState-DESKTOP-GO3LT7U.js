var menuBackground = [];

var mainMenuCounter = 0;
var totalMainMenuAssets = 1;

var container;
var canvas;

function BootState() {
    ///Estado encargado de cargar los assets que aparecen en el menú
    this.angle = 0;

    this.enter = function () {
        console.log("[DEBUG] ***ENTERING BOOT STATE***")
        container = createDiv();
        container.position(window.outerWidth * 0.205, window.outerHeight * 0.165);
        container.id("container");
        this.loadAssets();
        canvas = createCanvas(1120, 630);
        canvas.position(0, 0);
        canvas.parent(container);        
    }

    this.draw = function () {
        background(51);
       
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
        this.loadSpritesheet(menuBackground, 120, 912, 513, "assets/AfterEffect/menu_animation.png");
    }
}