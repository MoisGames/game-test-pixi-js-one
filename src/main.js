import { Application, Assets, Sprite } from 'pixi.js';
import { Friends } from './friend.js';

async function gameFunction() {
    
    const app = new Application();
    globalThis.__PIXI_APP__ = app;

    await app.init({ background: 'rgb(2,109,97)', width: 980, height: 630 });

    document.getElementById('app').appendChild(app.canvas);

    const backgroundTexture = await Assets.load('./map/0008_Layer-64.png');
    const background = new Sprite(backgroundTexture);

    background.anchor.set(0.5);

    background.x = app.screen.width / 2;
    background.y = app.screen.height / 2;

    app.stage.addChild(background);

    const furnitureTexture = await Assets.load('./map/0007_мебель.png');
    const furniture = new Sprite(furnitureTexture);

    furniture.anchor.set(0.5);

    furniture.x = app.screen.width / 2;
    furniture.y = app.screen.height / 2;

    app.stage.addChild(furniture);

    

    const treeTexture = await Assets.load('./map/_0002_цветок-.png');
    const tree = new Sprite(treeTexture);

    tree.anchor.set(0.5);

    tree.x = 371;
    tree.y = 511;

    app.stage.addChild(tree);

    const stairTexture = await Assets.load('./map/_0006_лесенка.png');
    const stairs = new Sprite(stairTexture);

    stairs.anchor.set(0.5);

    stairs.x = 418;
    stairs.y = 482;

    app.stage.addChild(stairs);

    const firstCourseTexture = await Assets.load('./map/_0005_первый-курс.png');
    const firstCourse = new Sprite(firstCourseTexture);

    firstCourse.anchor.set(0.5);

    firstCourse.x = 457;
    firstCourse.y = 523;

    app.stage.addChild(firstCourse);

    firstCourse.interactive = true; 
    firstCourse.buttonMode = true; 

    firstCourse.on('pointerover', () => {
        firstCourse.scale.set(1.1); 
    });

    firstCourse.on('pointerout', () => {
        firstCourse.scale.set(1); 
    });


    firstCourse.on('pointerdown', () => {
        firstCourse.scale.set(0.9); 
    });

    firstCourse.on('pointerup', () => {
        firstCourse.scale.set(1.1);
        moveToNextPoint();
    });

    const LastCourseTexture = await Assets.load('./map/_0004_Выпускной.png');
    const LastCourse = new Sprite(LastCourseTexture);

    LastCourse.anchor.set(0.5);

    LastCourse.x = 914;
    LastCourse.y = 177;

    app.stage.addChild(LastCourse);

    const pathTexture = await Assets.load('./map/Путь с кнопками.png');
    const path = new Sprite(pathTexture);

    path.x = 0;
    path.y = 0;

    app.stage.addChild(path);

    const girlTexture = await Assets.load('./map/_0000_иконка.png');
    const girl = new Sprite(girlTexture);

    girl.anchor.set(0,1);

    girl.x = 434;
    girl.y = 508;

    app.stage.addChild(girl);

    function cubicBezier(t, p0, p1, p2, p3) {
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
    
    let currentIndex = 0;

    const points = [
        { start: { x: 434, y: 508 }, control1: { x: 399, y: 488 }, control2: { x: 375, y: 445 }, end: { x: 342, y: 478 } },
        { start: { x: 342, y: 478 }, control1: { x: 313, y: 498 }, control2: { x: 292, y: 507 }, end: { x: 266, y: 521 } },
        { start: { x: 266, y: 521 }, control1: { x: 232, y: 535 }, control2: { x: 213, y: 539 }, end: { x: 178, y: 539 } },
        { start: { x: 178, y: 539 }, control1: { x: 140, y: 533 }, control2: { x: 121, y: 524 }, end: { x: 99, y: 511 } },
        { start: { x: 99, y: 511 }, control1: { x: 72, y: 493 }, control2: { x: 71, y: 479 }, end: { x: 112, y: 447 } },
    ];
    
    function moveToNextPoint() {

        if (currentIndex >= points.length) return;
    
        const { start, control1, control2, end } = points[currentIndex];
        
        let progress = 0;
        const duration = 2000;
        let startTime;
    
        function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
    
            progress = Math.min(elapsed / duration, 1); 
    
            const position = cubicBezier(progress, start, control1, control2, end);
            girl.x = position.x;
            girl.y = position.y;
    
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        currentIndex++
        requestAnimationFrame(animate);
    }
};

// Создайте экземпляр класса

gameFunction()

const friendsList = new Friends();

// Назначьте обработчики событий
document.getElementById('leftArrow').addEventListener('click', () => friendsList.changingQtFriendDecrement());
document.getElementById('rightArrow').addEventListener('click', () => friendsList.changingQtFriendIncrement());