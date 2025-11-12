"use client";

import p5 from "p5";
import { useEffect, useRef } from "react";
import AcidTower from "./sprites/Acid Tower Outline.png";
import EnemyArm from  "./sprites/Enemy Quad Walker, Arm.png";
import EnemyChassis from "./sprites/Enemy Quad Walker, Chassis.png";
import Drill from "./sprites/Enemy Quad Walker, Drill 1.png";
import LegsFront1 from "./sprites/Enemy Quad Walker, Legs Front 1.png";
import LegsFront2 from "./sprites/Enemy Quad Walker, Legs Front 2.png";
import LegsFront3 from "./sprites/Enemy Quad Walker, Legs Front 3.png";
import LegsFront4 from "./sprites/Enemy Quad Walker, Legs Front 4.png";
import LegsBehind1 from "./sprites/Enemy Quad Walker, Legs Behind 1.png";
import LegsBehind2 from "./sprites/Enemy Quad Walker, Legs Behind 2.png";
import LegsBehind3 from "./sprites/Enemy Quad Walker, Legs Behind 3.png";
import LegsBehind4 from "./sprites/Enemy Quad Walker, Legs Behind 4.png";


class Enemy {
  x: number;
  y: number;
  frame: number;
  counter: number; // decreases frame speed
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.frame = 0;
    this.counter = 0;
  }

  update() {
    this.counter++;
    if(this.counter > 5) {
      this.frame++;
      this.counter = 0;
    }
    this.x -= 1;
    if(this.frame > 3) {
      this.frame = 0;
    }
  }
}

 class Projectile {
  x: number;
  y: number;
  dx: number; // direction x
  dy: number; // direction y
  vx: number; // vel x
  vy: number; // vel y
  length: number;
  constructor(x: number, y: number, targetX: number, targetY: number, speed: number) {
    this.x = x;
    this.y = y;
    this.dx = targetX - x;
    this.dy = targetY - y;
    this.length = Math.sqrt(this.dx ** 2 + this.dy ** 2);
    this.vx = (this.dx / this.length) * speed;
    this.vy = (this.dy / this.length) * speed;
    console.log();
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
  }
}

function PageNotFound() {
  const myRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // return if myRef is null since it has to be set later.
    if (!myRef.current) return;

    const Sketch = (p: p5) => {
      let tower: p5.Image;

      let enemyArm: p5.Image;
      let enemyChassis: p5.Image;
      let enemyDrill: p5.Image
      let enemyFront1: p5.Image;
      let enemyFront2: p5.Image;
      let enemyFront3: p5.Image;
      let enemyFront4: p5.Image;
      let enemyBehind1: p5.Image;
      let enemyBehind2: p5.Image;
      let enemyBehind3: p5.Image;
      let enemyBehind4: p5.Image;

      let score = 0;
      let towerX: number;
      let towerY: number;
      const projectiles: Projectile[] = [];
      const enemies: Enemy[] = [];
      const imageScale = 2;

      function spawnEnemy() {
        const offset = -200 + (Math.random()*400);
        enemies.push(new Enemy(p.width, p.height/2 + offset));
      }
      
      p.setup = () => {
        p.createCanvas(800, 600);
        p.noSmooth();
        p.background(20);
        setInterval(spawnEnemy, 1000);
        p.loadImage(AcidTower, (img: p5.Image) => {
          tower = img;
          p.image(tower, 20, p.height-tower.height*imageScale-20, tower.width*imageScale, tower.height*imageScale);
          towerX = tower.width*imageScale;
          towerY = p.height-tower.height*imageScale-20 + 25;
        });
        p.loadImage(EnemyArm, (img: p5.Image) => {
          enemyArm = img;
        });
        p.loadImage(EnemyChassis, (img: p5.Image) => {
          enemyChassis = img;
        });
        p.loadImage(Drill, (img: p5.Image) => {
          enemyDrill = img;
        });
        p.loadImage(LegsFront1, (img: p5.Image) => {
          enemyFront1 = img;
        });
        p.loadImage(LegsFront2, (img: p5.Image) => {
          enemyFront2 = img;
        });
        p.loadImage(LegsFront3, (img: p5.Image) => {
          enemyFront3 = img;
        });
        p.loadImage(LegsFront4, (img: p5.Image) => {
          enemyFront4 = img;
        });
        p.loadImage(LegsBehind1, (img: p5.Image) => {
          enemyBehind1 = img;
        });
        p.loadImage(LegsBehind2, (img: p5.Image) => {
          enemyBehind2 = img;
        });
        p.loadImage(LegsBehind3, (img: p5.Image) => {
          enemyBehind3 = img;
        });
        p.loadImage(LegsBehind4, (img: p5.Image) => {
          enemyBehind4 = img;
          spawnEnemy();
        });
      };

      p.draw = () => {
        p.background(20);
        if(tower != null) {
          p.image(tower, 20, p.height-tower.height*imageScale-20, tower.width*imageScale, tower.height*imageScale);

        }
        p.fill(255);
        p.textSize(32);
        p.textAlign(p.CENTER, p.CENTER);
        p.text("FloraHive for free!!!", p.width / 2, 40);
        p.text("Score: " + score, 80, 40);

        //projectiles 
        for (let index = 0; index < projectiles.length; index++) {
          const e = projectiles[index];
          e.update();
          
          // remove projectiles when offscreen
          if (e.x < 0 || e.x > p.width || e.y < 0 || e.y > p.height) {
            projectiles.splice(index, 1);
            continue;
          }

          // Check for collisions with enemies
          for (let j = enemies.length - 1; j >= 0; j--) {
            const enemy = enemies[j];
            const d = p.dist(e.x, e.y - enemyArm.height / 2, enemy.x, enemy.y);

            const collisionRadius = 40;
  
            if (d < collisionRadius) {
              enemies.splice(j, 1);
              projectiles.splice(index, 1);
              score += 1;
              break; // stop checking this projectile
            }
          }
          
          p.rect(e.x, e.y, 5, 5)
        }


        // enemies
        for (let index = 0; index < enemies.length; index++) {
          const e = enemies[index];
          e.update();

          // remove enemies when offscreen
          if (e.x < -100) {
            enemies.splice(index, 1);
            continue;
          }

          p.push();
          p.scale(-1, 1);
          p.image(enemyArm, -e.x, e.y, enemyArm.width*imageScale, enemyArm.height*imageScale);
          p.image(enemyChassis, -e.x, e.y, enemyChassis.width*imageScale, enemyChassis.height*imageScale);
          p.image(enemyDrill, -e.x, e.y, enemyDrill.width*imageScale, enemyDrill.height*imageScale);
          if(e.frame == 0) {
            p.image(enemyFront1, -e.x, e.y, enemyFront1.width*imageScale, enemyFront1.height*imageScale);
            p.image(enemyBehind1, -e.x, e.y, enemyBehind1.width*imageScale, enemyBehind1.height*imageScale);
          } else if(e.frame == 1) {
            p.image(enemyFront2, -e.x, e.y, enemyFront2.width*imageScale, enemyFront2.height*imageScale);
            p.image(enemyBehind2, -e.x, e.y, enemyBehind2.width*imageScale, enemyBehind2.height*imageScale);
          } else if (e.frame == 2){
            p.image(enemyFront3, -e.x, e.y, enemyFront3.width*imageScale, enemyFront3.height*imageScale);
            p.image(enemyFront4, -e.x, e.y, enemyFront4.width*imageScale, enemyFront4.height*imageScale);
          } else if (e.frame == 3) {
            p.image(enemyBehind3, -e.x, e.y, enemyBehind3.width*imageScale, enemyBehind3.height*imageScale);
            p.image(enemyBehind4, -e.x, e.y, enemyBehind4.width*imageScale, enemyBehind4.height*imageScale);
          }
          p.pop();
        }
      };

      p.mouseClicked = () => {
        projectiles.push(new Projectile(towerX, towerY, p.mouseX, p.mouseY, 15))
      }
    };

    const myP5 = new p5(Sketch, myRef.current);
    return () => myP5.remove();
  }, []);

  return (
    <>
      <div className="page-title">
        <p>404 Page Not Found!</p>
      </div>
      <section className="content header-spacing d-flex justify-content-center">
        <div ref={myRef}></div>
      </section>
    </>
  );
}

export default PageNotFound;
