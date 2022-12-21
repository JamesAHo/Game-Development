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
            this.maxSpeed = 2;
            this.projectiles = [];
       }
       // methods
       update(){
            if(this.game.keys.includes('ArrowUp')) this.speedY = -this.maxSpeed;
            else if(this.game.keys.includes('ArrowDown')) this.speedY = this.maxSpeed;
            else this.speedY = 0;
            this.y += this.speedY;
            // handle projectiles
            this.projectiles.forEach(projectile => {
                projectile.update();
            });
            this.projectiles = this.projectiles.filter(projectile => !projectile.DeleteParticle);
       }
       draw(context){
            context.fillStyle = 'black';
            context.fillRect(this.x, this.y, this.width, this.height);
            this.projectiles.forEach(projectile => {
                projectile.draw(context);
            });
       }
       shootTop(){
            if(this.game.ammo > 0) {
                this.projectiles.push(new Projectile(this.game, this.x, this.y));
                console.log(this.projectiles);
                this.game.ammo--;
            }
       }
    }
    class Enemy {

    }
    class InputHandler {
        constructor(game) {
            this.game = game;
            window.addEventListener('keydown', e => {
                if(((e.key === 'ArrowUp') || (e.key === 'ArrowDown')) && this.game.keys.indexOf(e.key) === -1){
                    this.game.keys.push(e.key)
                } else if( e.key === ' ') {
                    this.game.player.shootTop();
                }
            });
            window.addEventListener('keyup', e => {
                if(this.game.keys.indexOf(e.key) > -1) {
                    this.game.keys.splice(this.game.keys.indexOf(e.key),1);
            
                }
            })
        }
    }
    class Projectile {
        constructor(game,x,y) {
            this.game = game;
            this.x = x;
            this.y = y;
            this.width = 10;
            this.height = 3;
            this.speed = 3;
            this.DeleteParticle = false;
        }
        update(){
            this.x += this.speed;
            if(this.x > this.game.width * 0.8) this.DeleteParticle = true;
        }
        draw(context) {
            context.fillStyle = 'black';
            context.fillRect(this.x, this.y, this.width, this.height);
        }
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
            // player object
            this.player = new Player(this);
            // input object
            this.input = new InputHandler(this);
            // keep track all keys
            this.keys = [];
            this.ammo = 20;
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
