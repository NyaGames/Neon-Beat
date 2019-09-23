var NeonBeat = NeonBeat || {};
NeonBeat.game = new Phaser.Game(600, 600, Phaser.AUTO, ' ');

NeonBeat.global = {
    DEBUG_MODE: true
}

NeonBeat.game.state.add('Boot', NeonBeat.Boot);
NeonBeat.game.state.add('Preload', NeonBeat.Preload);
NeonBeat.game.state.add('MainMenu', NeonBeat.MainMenu);
NeonBeat.game.state.add('Game', NeonBeat.Game);
NeonBeat.game.state.add('EndGame', NeonBeat.EndGame);

NeonBeat.game.state.start('Boot');

document.getElementById('files').addEventListener('change', handleFileSelect, false);

//To Do: integrar esto en phaser y solo en el estado game
function handleFileSelect(evt){
    var files = evt.target.files;

    //Cargar el archivo
    for (var i = 0, f; f = files[i]; i++) {    
      if (f.type === "audio/aiff" || true) {
        var reader = new FileReader();
        reader.onload = NeonBeat.Game.prototype.songAdded; //On load end callback
        reader.readAsArrayBuffer(f);
      } else {
        trow("No good file");
      }
    }
}
