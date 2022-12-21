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
                this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 30));
                console.log(this.projectiles);
                this.game.ammo--;
            }
       }
    }
    // Enemy class Section
    class Enemy {
        constructor(game){
            this.game = game;
            this.x = this.game.width;
            this.speedX = Math.random() * -0.8 - 0.2;
            this.DeleteParticle = false;
        }
        update(){
            this.x += this.speedX;
            if(this.x + this.width < 0) return this.DeleteParticle = true; 
        }
        draw(context){
            context.fillStyle = 'red';
            context.fillRect(this.x,this.y,this.width,this.height);
        }
    }
    class Angler1 extends Enemy{
        constructor(game){
            super(game);
            this.width = 228 * 0.2;
            this.height = 169 * 0.2;
            this.y = Math.random() * (this.game.height * 0.9 - this.height);
        }
    }
    // End of Enemy Section
    class InputHandler {
        constructor(game) {
            this.game = game;
            window.addEventListener('keydown', e => {
                if(((e.key === 'ArrowUp') || (e.key === 'ArrowDown')) && this.game.keys.indexOf(e.key) === -1){
                    this.game.keys.push(e.key)
                } else if( e.key === ' ') {
                    this.game.player.shootTop();
                }
                console.log(this.game.keys)
            });
            window.addEventListener('keyup', e => {
                if(this.game.keys.indexOf(e.key) > -1) {
                    this.game.keys.splice(this.game.keys.indexOf(e.key),1);
                }
                console.log(this.game.keys)
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
            this.speed = 0.8;
            this.DeleteParticle = false;
        }
        update(){
            this.x += this.speed;
            if(this.x > this.game.width * 0.8) this.DeleteParticle = true;
        }
        draw(context) {
            context.fillStyle = 'yellow';
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
        constructor(game){
            this.game = game;
            this.fontSize = 25;
            this.family = 'Helvetica';
            this.color = 'yellow';
        }
        draw(context){
            // ammo
            context.fillStyle = this.color;
            for(let i = 0; i < this.game.ammo;i++){
                context.fillRect(20 + 5 * i, 50, 3, 20);
            }
        }
       
    }
    class GamepPlay {
        constructor(width,height) {
            this.width = width;
            this.height = height;
            // Player instance
            this.player = new Player(this);
            // Input instance
            this.input = new InputHandler(this);
            // UI instance
            this.ui = new UI(this);
            // Enemy instance
            this.enemies = [];
            // keep track all keys
            this.keys = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.ammo = 20;
            this.maxAmmo = 50;
            this.ammoTimer = 0;
            this.ammoInterval = 500;
            this.gameOver = false;
        }
        update(deltaTime) {
            this.player.update();
            if(this.ammoTimer > this.ammoInterval){
                if(this.ammo < this.maxAmmo) this.ammo++;
                this.ammoTimer = 0
            } else {
                this.ammoTimer += deltaTime;
            }
            // Enemy
            this.enemies.forEach(enemy => {
                enemy.update()
            });
            this.enemies = this.enemies.filter(enemy => !enemy.DeleteParticle);
            if(this.enemyTimer > this.enemyInterval && !this.gameOver){
                this.addEnemy();
                this.enemyTimer = 0
            }else {
                this.enemyTimer += deltaTime;
            }
        };
        draw(context){
            this.player.draw(context);
            this.ui.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            })
        };
        // add enemy 
        addEnemy(){
            this.enemies.push(new Angler1(this));
        }
        // check to see if enemy collide with player
      
    }
    const game = new GamepPlay(canvas.width, canvas.height);
    let lastTime = 0;
    // create an animation loop
    function animation(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        // using existing window objet requestAnimationFrame
        requestAnimationFrame(animation)
    }
    animation(0);
});
