function CreditsState(){    
        
    var container;
    var creditos;

    this.enter = function()
    {
        console.log("[DEBUG] ***ENTERING CREDITS STATE***")

        container = document.getElementById("container");

        //crear imagenes
        canvas = createCanvas(ancho, alto);
        canvas.parent(container);        
        canvas.mousePressed(this.escape); 
        canvas.background(0);

        creditos = createImg('assets/images/creditos.png');
        creditos.position(0, 0); 
        creditos.parent(container);
        creditos.mousePressed(this.escape); 
        this.setSize();
    }  

    this.escape = function(){
        canvas.remove();
        creditos.remove();
        mgr.showScene(MainMenuState);
    }

    
    this.setSize = function(){
        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            container.position(window.outerWidth * 0.205, window.outerHeight * 0.165);
            ancho = window.innerWidth - window.innerWidth*0.208*2;   
            alto = window.innerHeight - window.innerHeight*0.163*2;
            wPercentaje = ancho/1120;
            hPercentaje = alto/630;
            
            creditos.size(1120 * wPercentaje, 630 * hPercentaje);
        }else{            
            ancho = window.innerWidth;
            alto = window.innerHeight;
            wPercentaje = ancho/1120;
            hPercentaje = alto/630;
            resizeCanvas(ancho, alto);
            canvas.background(0);
            
            creditos.size(1120 * wPercentaje, 630 * hPercentaje);
        }
    }

    this.windowResized = function(){
         this.setSize();
    }
}