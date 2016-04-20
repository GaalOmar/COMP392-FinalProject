/// <reference path="_reference.ts"/>
// MAIN GAME FILE
/*
Name: Ga-alo Omar, Eunmi Han and Nikita Chernykh
    Source File Name: Advanced Graphics- Final Project
    Last Modified by: Ga-alo Omar
    Date last Modified: Apr 20, 2016
    Program description: Creating a 3D game with 3 different levels
    Revision History:
    Commit 1-11: We were setting everyone up with the githun account and adding our assignment 3 as our first level
    Commit 12-14: Minor fixes
    Commit 15: Added Level 2
    Commit 16: Fixed dor and lives
    Commit 17: Added Collider on the doors
    Commit 18: Added sound to our levels
    Commit 19-23: Eunmi merging and updating sound
    Commit 24: Ghost Added
    Commit 25-29: Level 2 was completed
    Commit 30: Level 3 was added
    Commit 31-35: Merging levels together
    Commit 36-37: Testing Ghost
    Commit 38-39: Colored Ghost
    Commit 40-44: Merging ghost with level
    Commit 45: Soundtrack/donut fix and level 3 fix
    Commit 46-48: Merging levels
    Commit 49-51: Minor fixes and merges
    Commit 52: Adding win and intstruction scenes
    Commit 53: Designing win scene
    Commit 54-57: Merging levels
    Commit 58-60: Minor fixes and merges
    Commit 61: Added cheat key
    Commit 62-67: Merging cheat key
    Commit 68: Completing win and thanks scene
    Commit 69: Win/Game/Instruction Last Update
      
*/
// THREEJS Aliases
var Scene = Physijs.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var Geometry = THREE.Geometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var LineBasicMaterial = THREE.LineBasicMaterial;
var PhongMaterial = THREE.MeshPhongMaterial;
var Material = THREE.Material;
var Texture = THREE.Texture;
var Line = THREE.Line;
var Mesh = THREE.Mesh;
var Object3D = THREE.Object3D;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var AmbientLight = THREE.AmbientLight;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var Face3 = THREE.Face3;
var CScreen = config.Screen;
var Clock = THREE.Clock;
// Setup a Web Worker for Physijs
Physijs.scripts.worker = "/Scripts/lib/Physijs/physijs_worker.js";
Physijs.scripts.ammo = "/Scripts/lib/Physijs/examples/js/ammo.js";
var myWorker = new Worker(Physijs.scripts.worker);
console.log(myWorker);
// Game Variables
var scene;
var currentScene;
var renderer;
var camera;
var play;
var menu;
var over;
var win;
var level2;
var level3;
var instructions;
var thank;
var stats;
var canvas;
var assets;
var manifest = [
    { id: "land", src: "../../Assets/audio/Land.wav" },
    { id: "hit", src: "../../Assets/audio/hit.mp3" },
    { id: "bite", src: "../../Assets/audio/bite.mp3" },
    { id: "coin", src: "../../Assets/audio/coin.mp3" },
    { id: "soundtracklvl1", src: "../../Assets/audio/SoundtrackLevel1.mp3" },
    { id: "jump", src: "../../Assets/audio/Jump.wav" },
    { id: "bg", src: "../../Assets/images/bd.jpg" },
    { id: "wbd", src: "../../Assets/images/wbg.jpg" },
    { id: "sadcandy", src: "../../Assets/images/sadcandy.jpg" },
    { id: "thank", src: "../../Assets/images/thank.jpg" },
    { id: "reset", src: "../../Assets/images/reset.png" },
    { id: "StartButton", src: "../../Assets/images/StartButton.png" },
    { id: "MenuButton", src: "../../Assets/images/MenuButton.png" },
    { id: "ExitButton", src: "../../Assets/images/ExitButton.png" },
    { id: "InfoButton", src: "../../Assets/images/InfoButton.png" },
    { id: "RestartButton", src: "../../Assets/images/RestartButton.png" },
    { id: "bg", src: "../../Assets/images/bd.jpg" },
    { id: "ThankYou", src: "../../Assets/images/ThankYou.png" },
    { id: "Win", src: "../../Assets/images/win.png" },
    { id: "Instuctions", src: "../../Assets/images/instructions.png" },
    { id: "wbd", src: "../../Assets/images/wbg.jpg" },
    { id: "StartButton", src: "../../Assets/images/StartButton.png" },
    { id: "BackButton", src: "../../Assets/images/BackButton.png" },
    { id: "ExitButton", src: "../../Assets/images/ExitButton.png" },
    { id: "InfoButton", src: "../../Assets/images/InfoButton.png" },
    { id: "RestartButton", src: "../../Assets/images/RestartButton.png" }
];
function preload() {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    assets.on("complete", init, this);
    assets.loadManifest(manifest);
}
function setupCanvas() {
    canvas = document.getElementById("canvas");
    canvas.setAttribute("width", config.Screen.WIDTH.toString());
    canvas.setAttribute("height", (config.Screen.HEIGHT * 0.1).toString());
    canvas.style.backgroundColor = "#ccccff";
}
function init() {
    // setup the canvas for the game
    setupCanvas();
    // setup the default renderer
    setupRenderer();
    // setup the camera
    setupCamera();
    // set initial scene
    currentScene = config.Scene.MENU;
    changeScene();
    // Add framerate stats
    addStatsObject();
    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    // setup the resize event listener
    window.addEventListener('resize', onWindowResize, false);
}
// Window Resize Event Handler
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    scene.resize();
}
// Add Frame Rate Stats to the Scene
function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}
// Setup main game loop
function gameLoop() {
    stats.update();
    scene.update();
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
    // render the scene
    renderer.render(scene, camera);
}
// Setup default renderer
function setupRenderer() {
    renderer = new Renderer({ antialias: true });
    renderer.setClearColor(0xADD8E6, 1.0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
    renderer.shadowMap.enabled = true;
    renderer.autoClear = true;
    console.log("Finished setting up Renderer...");
}
// Setup main camera for the scene
function setupCamera() {
    camera = new PerspectiveCamera(35, config.Screen.RATIO, 0.1, 1000);
    //camera.position.set(0, 10, 30);
    //camera.lookAt(new Vector3(0, 0, 0));
    console.log("Finished setting up Camera...");
}
function changeScene() {
    // Launch various scenes
    switch (currentScene) {
        case config.Scene.MENU:
            // show the MENU scene
            menu = new scenes.Menu();
            scene = menu;
            console.log("Starting MENU Scene");
            break;
        case config.Scene.PLAY:
            // show the PLAY scene
            play = new scenes.Play();
            scene = play;
            console.log("Starting PLAY Scene");
            break;
        case config.Scene.OVER:
            // show the GAME OVER scene
            over = new scenes.Over();
            scene = over;
            console.log("Starting OVER Scene");
            break;
        case config.Scene.LEVEL2:
            // show the LEVEL2 scene
            level2 = new scenes.Level02();
            scene = level2;
            renderer.setClearColor(0x302013, 1.0);
            console.log("Starting level02 Scene");
            break;
        case config.Scene.LEVEL3:
            // show the LEVEL3 scene
            level3 = new scenes.Level03();
            scene = level3;
            renderer.setClearColor(0xcc0000, 1.0);
            console.log("Starting Level3 Scene");
            break;
        case config.Scene.WIN:
            // show the WIN scene
            win = new scenes.Win();
            scene = win;
            renderer.setClearColor(0xcc0000, 1.0);
            console.log("Starting Win Scene");
            break;
        case config.Scene.INSTRUCTIONS:
            // show the INSTRUCTIONS scene
            instructions = new scenes.Instructions();
            scene = instructions;
            renderer.setClearColor(0xcc0000, 1.0);
            console.log("Starting Instructions Scene");
            break;
        case config.Scene.THANK:
            // show the THANK scene
            thank = new scenes.Thank();
            scene = thank;
            renderer.setClearColor(0xcc0000, 1.0);
            console.log("Starting Thank Scene");
            break;
    }
}
window.onload = preload;

//# sourceMappingURL=game.js.map
