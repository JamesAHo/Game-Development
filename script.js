// setting up canvas
window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    // drawing context, a built in object that contains all methods and properties that allow to draw and animate colours, shapes and other graphics on HTML canvas.
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;
    // Implementation of Object Oriented Programming.
    // player class 
    class Player {
       constructor(game) {
            this.game = game;
            this.width = 120;
            this.height = 195;
            this.x = 20;
            this.y = 100;
            this.speedY = 0;
       }
       // methods
       update() {
            this.y += this.speedY
       }
       draw(context){
            context.fillRect(this.x, this.y, this.width, this.height);
       }
    }
    class Enemy {

    }
    class InputHandler {

    }
    class Projectile {

    }
    class Particle {

    }
    class Layer {

    }
    class Background {

    }
    class UI {

    }
    class GamepPlay {
        constructor(width,height) {
            this.width = width;
            this.height = height;
            this.player = new Player(this);
        }
        update() {
            this.player.update();
        }
        draw(context){
            this.player.draw(context);
        }
    }
    const game = new GamepPlay(canvas.width, canvas.height);
    // create an animation loop
    function animation(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        game.draw(ctx);
        // using existing window objet requestAnimationFrame
        requestAnimationFrame(animation)
    }
    animation();
});
