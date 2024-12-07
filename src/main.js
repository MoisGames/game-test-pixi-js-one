import { Application, Assets, Sprite } from 'pixi.js';
import { Friends } from './friend.js';

class Game {
    constructor() {
        this.app = new Application();
        globalThis.__PIXI_APP__ = this.app;

        this.currentIndex = 0;
        this.points = [];

        this.initialize(); 
    }

    async initialize() {
        await this.app.init({
            background: 'rgb(2,109,97)',
            width: 980, 
            height: 630 });
        document.getElementById('app').appendChild(this.app.canvas);

        await this.loadAssets();
        this.setupButtons();
    }

    async loadAssets() {
        this.points = [
            { start: { x: 434, y: 508 }, control1: { x: 399, y: 488 },
                control2: { x: 375, y: 445 }, end: { x: 342, y: 478 } },
            { start: { x: 342, y: 478 }, control1: { x: 313, y: 498 },
                control2: { x: 292, y: 507 }, end: { x: 266, y: 521 } },
            { start: { x: 266, y: 521 }, control1: { x: 232, y: 535 }, 
                control2: { x: 213, y: 539 }, end: { x: 178, y: 539 } },
            { start: { x: 178, y: 539 }, control1: { x: 140, y: 533 }, 
                control2: { x: 121, y: 524 }, end: { x: 99, y: 511 } },
            { start: { x: 99, y: 511 }, control1: { x: 72, y: 493 }, 
                control2: { x: 71, y: 479 }, end: { x: 112, y: 447 } },
        ];

        const backgroundTexture = await Assets.load('./map/0008_Layer-64.png');
        const background = new Sprite(backgroundTexture);
        background.anchor.set(0.5);
        background.x = this.app.screen.width / 2;
        background.y = this.app.screen.height / 2;
        this.app.stage.addChild(background);

        const furnitureTexture = await Assets.load('./map/0007_мебель.png');
        const furniture = new Sprite(furnitureTexture);
        furniture.anchor.set(0.5);
        furniture.x = this.app.screen.width / 2;
        furniture.y = this.app.screen.height / 2;
        this.app.stage.addChild(furniture);

        const treeTexture = await Assets.load('./map/_0002_цветок-.png');
        const tree = new Sprite(treeTexture);
        tree.anchor.set(0.5);
        tree.x = 371;
        tree.y = 511;
        this.app.stage.addChild(tree);

        const stairTexture = await Assets.load('./map/_0006_лесенка.png');
        const stairs = new Sprite(stairTexture);
        stairs.anchor.set(0.5);
        stairs.x = 418;
        stairs.y = 482;
        this.app.stage.addChild(stairs);

        const firstCourseTexture = await Assets.load('./map/_0005_первый-курс.png');
        const firstCourse = new Sprite(firstCourseTexture);
        firstCourse.anchor.set(0.5);
        firstCourse.x = 457;
        firstCourse.y = 523;
        this.app.stage.addChild(firstCourse);

        const lastCourseTexture = await Assets.load('./map/_0004_Выпускной.png');
        this.lastCourse = new Sprite(lastCourseTexture);
        this.lastCourse.anchor.set(0.5);
        this.lastCourse.x = 914;
        this.lastCourse.y = 177;
        this.app.stage.addChild(this.lastCourse);

        const pathTexture = await Assets.load('./map/Путь с кнопками.png');
        const path = new Sprite(pathTexture);
        path.x = 0;
        path.y = 0;
        this.app.stage.addChild(path);

        const girlTexture = await Assets.load('./map/_0000_иконка.png');
        this.girl = new Sprite(girlTexture);
        this.girl.anchor.set(0, 1);
        this.girl.x = 434;
        this.girl.y = 508;
        this.app.stage.addChild(this.girl);
    }

    setupButtons() {
        const friendsList = new Friends();

        document.getElementById('leftArrow').addEventListener('click', () => friendsList.changingQtFriendDecrement());
        document.getElementById('rightArrow').addEventListener('click', () => friendsList.changingQtFriendIncrement());

        const buttonToUniversity = document.getElementById('toUniversityButton');

        buttonToUniversity.addEventListener('pointerover', () => {
            buttonToUniversity.style.transform = 'scale(1.03)';
        });

        buttonToUniversity.addEventListener('pointerout', () => {
            buttonToUniversity.style.transform = 'scale(1)';
        });

        buttonToUniversity.addEventListener('pointerdown', () => {
            buttonToUniversity.style.transform = 'scale(0.9)';
        });

        buttonToUniversity.addEventListener('pointerup', () => {
            buttonToUniversity.style.transform = 'scale(1.1)'
            this.moveToNextPoint();
        });
    }

    moveToNextPoint() {
        if (this.currentIndex >= this.points.length) return;

        const { start, control1, control2, end } = this.points[this.currentIndex];
        let progress = 0;
        const duration = 2000;
        let startTime;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;

            progress = Math.min(elapsed / duration, 1);
            const position = this.cubicBezier(progress, start, control1, control2, end);
            this.girl.x = position.x;
            this.girl.y = position.y;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
    }

        this.currentIndex++;
        requestAnimationFrame(animate);
    }

        cubicBezier(t, p0, p1, p2, p3) {
            const x = Math.pow(1 - t, 3) * p0.x +
                    3 * Math.pow(1 - t, 2) * t * p1.x +
                    3 * (1 - t) * Math.pow(t, 2) * p2.x +
                    Math.pow(t, 3) * p3.x;
        
            const y = Math.pow(1 - t, 3) * p0.y +
                    3 * Math.pow(1 - t, 2) * t * p1.y +
                    3 * (1 - t) * Math.pow(t, 2) * p2.y +
                    Math.pow(t, 3) * p3.y;
        
            return { x, y };
    }

}

const game = new Game();