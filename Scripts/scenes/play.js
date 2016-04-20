var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * The Scenes module is a namespace to reference all scene objects
 *
 * @module scenes
 */
var scenes;
(function (scenes) {
    /**
     * The Play class is where the main action occurs for the game
     *
     * @class Play
     * @param havePointerLock {boolean}
     */
    var Play = (function (_super) {
        __extends(Play, _super);
        /**
         * @constructor
         */
        function Play() {
            _super.call(this);
            this.donutCount = 5;
            //light
            this.light = new THREE.DirectionalLight(0xffffff);
            this._initialize();
            this.start();
        }
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++
        /**
         * Sets up the initial canvas for the play scene
         *
         * @method setupCanvas
         * @return void
         */
        Play.prototype._setupCanvas = function () {
            canvas.setAttribute("width", config.Screen.WIDTH.toString());
            canvas.setAttribute("height", (config.Screen.HEIGHT * 0.1).toString());
            canvas.style.backgroundColor = "#000000";
        };
        /**
         * The initialize method sets up key objects to be used in the scene
         *
         * @method _initialize
         * @returns void
         */
        Play.prototype._initialize = function () {
            // Create to HTMLElements
            this.blocker = document.getElementById("blocker");
            this.instructions = document.getElementById("instructions");
            this.blocker.style.display = "block";
            // setup canvas for menu scene
            this._setupCanvas();
            this.prevTime = 0;
            this.stage = new createjs.Stage(canvas);
            this.velocity = new Vector3(0, 0, 0);
            // setup a THREE.JS Clock object
            this.clock = new Clock();
            // Instantiate Game Controls
            this.keyboardControls = new objects.KeyboardControls();
            this.mouseControls = new objects.MouseControls();
        };
        /**
         * This method sets up the scoreboard for the scene
         *
         * @method setupScoreboard
         * @returns void
         */
        Play.prototype.setupScoreboard = function () {
            // initialize  score and lives values
            this.scoreValue = 0;
            this.livesValue = 5;
            // Add Lives Label
            this.livesLabel = new createjs.Text("LIVES: " + this.livesValue, "40px Mouse Memoirs", "#ffffff");
            this.livesLabel.x = config.Screen.WIDTH * 0.1;
            this.livesLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.addChild(this.livesLabel);
            console.log("Added Lives Label to stage");
            // Add Score Label
            this.scoreLabel = new createjs.Text("SCORE: " + this.scoreValue, "40px Mouse Memoirs", "#ffffff");
            this.scoreLabel.x = config.Screen.WIDTH * 0.8;
            this.scoreLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.addChild(this.scoreLabel);
            console.log("Added Score Label to stage");
        };
        /**
         * Add a DirectionalLight to the scene
         *
         * @method addDirectionalLight
         * @return void
         */
        Play.prototype.addDirectionalLight = function () {
            // DirectionalLight 
            this.light.castShadow = true; // soft white light
            this.light.shadowCameraNear = 2;
            this.add(this.light);
            console.log("Added DirectionalLight to scene");
        };
        /**
         * Add a level to the scene
         *
         * @method addLevel
         * @return void
         */
        Play.prototype.addLevel = function () {
            //add soundtrack
            createjs.Sound.play("soundtracklvl1");
            createjs.Sound.volume = 0.1;
            // Beginning Big Island
            //Ground texture
            this.groundTexture = new THREE.TextureLoader().load('../../Images/grass.png');
            this.groundTexture.wrapS = THREE.RepeatWrapping;
            this.groundTexture.wrapT = THREE.RepeatWrapping;
            this.groundTexture.repeat.set(2, 2);
            this.groundMaterial = new PhongMaterial();
            this.groundMaterial.map = this.groundTexture;
            this.groundMaterial.bumpMap = this.groundTextureNormal;
            this.groundMaterial.bumpScale = 0.2;
            //Door Texture
            this.doorTexture = new THREE.TextureLoader().load('../../Images/door.jpg');
            this.doorTexture.wrapS = THREE.RepeatWrapping;
            this.doorTexture.wrapT = THREE.RepeatWrapping;
            this.doorTexture.repeat.set(1, 1);
            this.doorTextureNormal = new THREE.TextureLoader().load('../../Images/door.jpg');
            this.doorTextureNormal.wrapS = THREE.RepeatWrapping;
            this.doorTextureNormal.wrapT = THREE.RepeatWrapping;
            this.doorTextureNormal.repeat.set(1, 1);
            this.doorMaterial = new PhongMaterial();
            this.doorMaterial.map = this.doorTexture;
            this.doorMaterial.bumpMap = this.doorTextureNormal;
            this.doorMaterial.bumpScale = 0.4;
            //Big Island
            this.bigIslandGeometry = new BoxGeometry(32, 1, 20);
            this.bigIslandMaterial = Physijs.createMaterial(this.groundMaterial, 0, 0);
            this.bigIsland = new Physijs.ConvexMesh(this.bigIslandGeometry, this.bigIslandMaterial, 0);
            this.bigIsland.position.set(0, 0, 5);
            this.bigIsland.receiveShadow = true;
            this.bigIsland.name = "BigIsland";
            this.add(this.bigIsland);
            console.log("Added BigIsland to scene");
            // Board
            this.boardGeometry = new BoxGeometry(32, 1, 5);
            this.boardMaterial = Physijs.createMaterial(this.groundMaterial, 0, 0);
            this.board = new Physijs.ConvexMesh(this.boardGeometry, this.boardMaterial, 0);
            this.board.position.set(0, 0, -9);
            this.board.receiveShadow = true;
            this.board.name = "Board";
            this.add(this.board);
            console.log("Added Board to scene");
            // Board
            this.boardGeometry = new BoxGeometry(32, 1, 5);
            this.boardMaterial = Physijs.createMaterial(this.groundMaterial, 0, 0);
            this.board = new Physijs.ConvexMesh(this.boardGeometry, this.boardMaterial, 0);
            this.board.position.set(0, 0, -16);
            this.board.receiveShadow = true;
            this.board.name = "Board";
            this.add(this.board);
            console.log("Added Board to scene");
            // Big Island
            this.bigIslandGeometry = new BoxGeometry(32, 1, 10);
            this.bigIslandMaterial = Physijs.createMaterial(this.groundMaterial, 0, 0);
            this.bigIsland = new Physijs.ConvexMesh(this.bigIslandGeometry, this.bigIslandMaterial, 0);
            this.bigIsland.position.set(0, 0, -26);
            this.bigIsland.receiveShadow = true;
            this.bigIsland.name = "BigIsland";
            this.add(this.bigIsland);
            console.log("Added BigIsland to scene");
            // Small Island 1
            this.smallIslandGeometry = new BoxGeometry(10, 1, 10);
            this.smallIslandMaterial = Physijs.createMaterial(this.groundMaterial, 0, 0);
            this.smallIsland = new Physijs.ConvexMesh(this.smallIslandGeometry, this.smallIslandMaterial, 0);
            this.smallIsland.position.set(-11, 0, -38);
            this.smallIsland.receiveShadow = true;
            this.smallIsland.name = "SmallIsland";
            this.add(this.smallIsland);
            console.log("Added SmallIsland to scene");
            //Small Island 2
            this.smallIslandGeometry = new BoxGeometry(10, 1, 10);
            this.smallIslandMaterial = Physijs.createMaterial(this.groundMaterial, 0, 0);
            this.smallIsland = new Physijs.ConvexMesh(this.smallIslandGeometry, this.smallIslandMaterial, 0);
            this.smallIsland.position.set(-1, 0, -48);
            this.smallIsland.receiveShadow = true;
            this.smallIsland.name = "SmallIsland";
            this.add(this.smallIsland);
            console.log("Added SmallIsland to scene");
            console.log("Finished setting up Level...");
            //Small Island 3
            this.smallIslandGeometry = new BoxGeometry(10, 1, 10);
            this.smallIslandMaterial = Physijs.createMaterial(this.groundMaterial, 0, 0);
            this.smallIsland = new Physijs.ConvexMesh(this.smallIslandGeometry, this.smallIslandMaterial, 0);
            this.smallIsland.position.set(9, 0, -58);
            this.smallIsland.receiveShadow = true;
            this.smallIsland.name = "SmallIsland";
            this.add(this.smallIsland);
            console.log("Added SmallIsland to scene");
            // Safe Board
            this.boardGeometry = new BoxGeometry(32, 1, 10);
            this.boardMaterial = Physijs.createMaterial(this.groundMaterial, 0, 0);
            this.board = new Physijs.ConvexMesh(this.boardGeometry, this.boardMaterial, 0);
            this.board.position.set(0, 0, -70);
            this.board.receiveShadow = true;
            this.board.name = "Board";
            this.add(this.board);
            console.log("Added Board to scene");
            // Small Island 
            this.smallIslandGeometry = new BoxGeometry(10, 1, 10);
            this.smallIslandMaterial = Physijs.createMaterial(this.groundMaterial, 0, 0);
            this.smallIsland = new Physijs.ConvexMesh(this.smallIslandGeometry, this.smallIslandMaterial, 0);
            this.smallIsland.position.set(-1, 0, -82);
            this.smallIsland.receiveShadow = true;
            this.smallIsland.name = "SmallIsland";
            this.add(this.smallIsland);
            console.log("Added SmallIsland to scene");
            // Safe Board
            this.boardGeometry = new BoxGeometry(32, 1, 10);
            this.boardMaterial = Physijs.createMaterial(this.groundMaterial, 0, 0);
            this.board = new Physijs.ConvexMesh(this.boardGeometry, this.boardMaterial, 0);
            this.board.position.set(-1, 0, -94);
            this.board.receiveShadow = true;
            this.board.name = "Board";
            this.add(this.board);
            console.log("Added Board to scene");
            // Long Board
            this.boardGeometry = new BoxGeometry(6, 1, 32);
            this.boardMaterial = Physijs.createMaterial(this.groundMaterial, 0, 0);
            this.board = new Physijs.ConvexMesh(this.boardGeometry, this.boardMaterial, 0);
            this.board.position.set(-1, 0, -118);
            this.board.receiveShadow = true;
            this.board.name = "Board";
            this.add(this.board);
            console.log("Added Board to scene");
            // Safe Board
            this.boardGeometry = new BoxGeometry(32, 1, 16);
            this.boardMaterial = Physijs.createMaterial(this.groundMaterial, 0, 0);
            this.board = new Physijs.ConvexMesh(this.boardGeometry, this.boardMaterial, 0);
            this.board.position.set(-1, 0, -145);
            this.board.receiveShadow = true;
            this.board.name = "Board";
            this.add(this.board);
            console.log("Added Board to scene");
            //Island 1
            this.smallIslandGeometry = new BoxGeometry(10, 1, 10);
            this.smallIslandMaterial = Physijs.createMaterial(this.groundMaterial, 0, 0);
            this.smallIsland = new Physijs.ConvexMesh(this.smallIslandGeometry, this.smallIslandMaterial, 0);
            this.smallIsland.position.set(-11, 0, -158);
            this.smallIsland.receiveShadow = true;
            this.smallIsland.name = "SmallIsland";
            this.add(this.smallIsland);
            console.log("Added SmallIsland to scene");
            //Island 2
            this.smallIslandGeometry = new BoxGeometry(10, 1, 10);
            this.smallIslandMaterial = Physijs.createMaterial(this.groundMaterial, 0, 0);
            this.smallIsland = new Physijs.ConvexMesh(this.smallIslandGeometry, this.smallIslandMaterial, 0);
            this.smallIsland.position.set(-1, 0, -170);
            this.smallIsland.receiveShadow = true;
            this.smallIsland.name = "SmallIsland";
            this.add(this.smallIsland);
            console.log("Added SmallIsland to scene");
            //Island 3
            this.smallIslandGeometry = new BoxGeometry(10, 1, 10);
            this.smallIslandMaterial = Physijs.createMaterial(this.groundMaterial, 0, 0);
            this.smallIsland = new Physijs.ConvexMesh(this.smallIslandGeometry, this.smallIslandMaterial, 0);
            this.smallIsland.position.set(-11, 0, -182);
            this.smallIsland.receiveShadow = true;
            this.smallIsland.name = "SmallIsland";
            this.add(this.smallIsland);
            console.log("Added SmallIsland to scene");
            console.log("Finished setting up Level...");
            // Finish Line Island
            this.bigIslandGeometry = new BoxGeometry(32, 1, 20);
            this.bigIslandMaterial = Physijs.createMaterial(this.groundMaterial, 0, 0);
            this.bigIsland = new Physijs.ConvexMesh(this.bigIslandGeometry, this.bigIslandMaterial, 0);
            this.bigIsland.position.set(0, 0, -199);
            this.bigIsland.receiveShadow = true;
            this.bigIsland.name = "BigIsland";
            this.add(this.bigIsland);
            console.log("Added BigIsland to scene");
            //Door to success
            this.bigIslandGeometry = new BoxGeometry(32, 20, 1);
            this.bigIslandMaterial = Physijs.createMaterial(this.doorMaterial, 0, 0);
            this.bigIsland = new Physijs.ConvexMesh(this.bigIslandGeometry, this.bigIslandMaterial, 0);
            this.bigIsland.position.set(0, 10, -199);
            this.bigIsland.receiveShadow = true;
            this.bigIsland.name = "Door";
            this.add(this.bigIsland);
            console.log("Added BigIsland to scene");
        };
        /**
         * Adds the player controller to the scene
         *
         * @method addPlayer
         * @return void
         */
        Play.prototype.addPlayer = function () {
            // Player Object
            this.playerGeometry = new BoxGeometry(2, 4, 2);
            this.playerMaterial = Physijs.createMaterial(new LambertMaterial({ color: 0x00ff00 }), 0.4, 0);
            this.player = new Physijs.BoxMesh(this.playerGeometry, this.playerMaterial, 1);
            this.player.position.set(0, 30, 10);
            this.player.receiveShadow = true;
            this.player.castShadow = true;
            this.player.name = "Player";
            this.add(this.player);
            console.log("Added Player to Scene");
        };
        /**
         * Add the death plane to the scene
         *
         * @method addDeathPlane
         * @return void
         */
        Play.prototype.addDeathPlane = function () {
            this.deathPlaneGeometry = new BoxGeometry(100, 1, -720);
            this.deathPlaneMaterial = Physijs.createMaterial(new MeshBasicMaterial({ color: 0xADD8E6 }), 0.4, 0.6);
            this.deathPlane = new Physijs.BoxMesh(this.deathPlaneGeometry, this.deathPlaneMaterial, 0);
            this.deathPlane.position.set(0, -10, 0);
            this.deathPlane.name = "DeathPlane";
            this.add(this.deathPlane);
        };
        /**
         * This method adds a donut to the scene
         *
         * @method addDonutMesh
         * @return void
         */
        Play.prototype.addDonutMesh = function () {
            // Add the Donut mesh to the scene
            var self = this;
            this.donuts = new Array(); // Instantiate a convex mesh array
            var donutLoader = new THREE.JSONLoader().load("../../Assets/imported/donut.json", function (geometry, materials) {
                //jem color    
                var phongMaterial = new PhongMaterial({ color: 0xF21F88 });
                phongMaterial.emissive = new THREE.Color(0xF21F88);
                materials[0] = Physijs.createMaterial((phongMaterial), 0.4, 0.6);
                //bun color    
                var phongMaterial = new PhongMaterial({ color: 0x946931 });
                phongMaterial.emissive = new THREE.Color(0x946931);
                materials[1] = Physijs.createMaterial((phongMaterial), 0.4, 0.6);
                for (var count = 0; count < self.donutCount; count++) {
                    self.donuts[count] = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial(materials));
                    self.donuts[count].receiveShadow = true;
                    self.donuts[count].castShadow = true;
                    self.donuts[count].name = "Donut";
                    self.addDonutPosition(self.donuts[count], count);
                }
            });
            console.log("Added Donut Mesh to Scene");
        };
        /**
        * This method sets the donuts object's position
        *
        * @method addDonutPosition
        * @return void
        */
        Play.prototype.addDonutPosition = function (donut, count) {
            if (count == 0) {
                donut.position.set(0, 10, -10);
            }
            else if (count == 1) {
                donut.position.set(-11, 10, -38);
            }
            else if (count == 2) {
                donut.position.set(9, 10, -58);
            }
            else if (count == 3) {
                donut.position.set(-1, 10, -170);
            }
            else {
                donut.position.set(1, 10, -195);
            }
            this.add(donut);
        };
        /**
         * This method adds the ugly donut controller to the scene
         *
         * @method addDonutMesh
         * @return void
         */
        Play.prototype.addUglyDonutMesh = function () {
            // Add the Ugly Donut to the scene
            var self = this;
            this.uglyDonuts = new Array(); // Instantiate a convex mesh array
            var donutLoader2 = new THREE.JSONLoader().load("../../Assets/imported/donut.json", function (geometry, materials) {
                //ugly donat gem
                var phongMaterial = new PhongMaterial({ color: 0x0add08 });
                phongMaterial.emissive = new THREE.Color(0x0add08);
                materials[0] = Physijs.createMaterial((phongMaterial), 0.4, 0.6);
                //ugly donat bun
                var phongMaterial = new PhongMaterial({ color: 0x000000 });
                phongMaterial.emissive = new THREE.Color(0x000000);
                materials[1] = Physijs.createMaterial((phongMaterial), 0.4, 0.6);
                for (var count = 0; count < self.donutCount - 2; count++) {
                    self.uglyDonuts[count] = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial(materials));
                    self.uglyDonuts[count].receiveShadow = true;
                    self.uglyDonuts[count].castShadow = true;
                    self.uglyDonuts[count].name = "UglyDonut";
                    self.addUglyDonutPosition(self.uglyDonuts[count], count);
                }
            });
            console.log("Added Donut Mesh to Scene");
        };
        /**
         * This method sets the ugly donuts object's position
         *
         * @method addUglyDonutPosition
         * @return void
         */
        Play.prototype.addUglyDonutPosition = function (uglyDonut, count) {
            if (count == 0) {
                uglyDonut.position.set(0, 10, -30);
            }
            else if (count == 1) {
                uglyDonut.position.set(-1, 10, -118);
            }
            else {
                uglyDonut.position.set(-1, 10, -168);
            }
            this.add(uglyDonut);
        };
        /**
         * Event Handler method for any pointerLockChange events
         *
         * @method pointerLockChange
         * @return void
         */
        Play.prototype.pointerLockChange = function (event) {
            if (document.pointerLockElement === this.element) {
                // enable our mouse and keyboard controls
                this.keyboardControls.enabled = true;
                this.mouseControls.enabled = true;
                this.blocker.style.display = 'none';
            }
            else {
                if (this.livesValue <= 0) {
                    this.blocker.style.display = 'none';
                    document.removeEventListener('pointerlockchange', this.pointerLockChange.bind(this), false);
                    document.removeEventListener('mozpointerlockchange', this.pointerLockChange.bind(this), false);
                    document.removeEventListener('webkitpointerlockchange', this.pointerLockChange.bind(this), false);
                    document.removeEventListener('pointerlockerror', this.pointerLockError.bind(this), false);
                    document.removeEventListener('mozpointerlockerror', this.pointerLockError.bind(this), false);
                    document.removeEventListener('webkitpointerlockerror', this.pointerLockError.bind(this), false);
                }
                else {
                    this.blocker.style.display = '-webkit-box';
                    this.blocker.style.display = '-moz-box';
                    this.blocker.style.display = 'box';
                    this.instructions.style.display = '';
                }
                // disable our mouse and keyboard controls
                this.keyboardControls.enabled = false;
                this.mouseControls.enabled = false;
                console.log("PointerLock disabled");
            }
        };
        /**
         * Event handler for PointerLockError
         *
         * @method pointerLockError
         * @return void
         */
        Play.prototype.pointerLockError = function (event) {
            this.instructions.style.display = '';
            console.log("PointerLock Error Detected!!");
        };
        // Check Controls Function
        /**
         * This method updates the player's position based on user input
         *
         * @method checkControls
         * @return void
         */
        Play.prototype.checkControls = function () {
            if (this.keyboardControls.enabled) {
                if (this.keyboardControls.cheatKey) {
                    this.remove(this.player);
                    this.player.position.set(0, 10, -190);
                    this.add(this.player);
                }
                this.velocity = new Vector3();
                var time = performance.now();
                var delta = (time - this.prevTime) / 1000;
                if (this.isGrounded) {
                    var direction = new Vector3(0, 0, 0);
                    if (this.keyboardControls.moveForward) {
                        this.velocity.z -= 400.0 * delta;
                    }
                    if (this.keyboardControls.moveLeft) {
                        this.velocity.x -= 400.0 * delta;
                    }
                    if (this.keyboardControls.moveBackward) {
                        this.velocity.z += 400.0 * delta;
                    }
                    if (this.keyboardControls.moveRight) {
                        this.velocity.x += 400.0 * delta;
                    }
                    if (this.keyboardControls.jump) {
                        this.velocity.y += 4000.0 * delta;
                        if (this.player.position.y > 4) {
                            this.isGrounded = false;
                            createjs.Sound.play("jump");
                        }
                    }
                    this.player.setDamping(0.7, 0.1);
                    // Changing player's rotation
                    this.player.setAngularVelocity(new Vector3(0, this.mouseControls.yaw, 0));
                    direction.addVectors(direction, this.velocity);
                    direction.applyQuaternion(this.player.quaternion);
                    if (Math.abs(this.player.getLinearVelocity().x) < 20 && Math.abs(this.player.getLinearVelocity().y) < 10) {
                        this.player.applyCentralForce(direction);
                    }
                    this.cameraLook();
                } // isGrounded ends
                //reset Pitch and Yaw
                this.mouseControls.pitch = 0;
                this.mouseControls.yaw = 0;
                this.prevTime = time;
            } // Controls Enabled ends
            else {
                this.player.setAngularVelocity(new Vector3(0, 0, 0));
            }
        };
        Play.prototype._unpauseSimulation = function () {
            scene.onSimulationResume();
            console.log("resume simulation");
        };
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++
        /**
         * The start method is the main method for the scene class
         *
         * @method start
         * @return void
         */
        Play.prototype.start = function () {
            var _this = this;
            // Set Up Scoreboard
            this.setupScoreboard();
            //check to see if pointerlock is supported
            this.havePointerLock = 'pointerLockElement' in document ||
                'mozPointerLockElement' in document ||
                'webkitPointerLockElement' in document;
            // Check to see if we have pointerLock
            if (this.havePointerLock) {
                this.element = document.body;
                this.instructions.addEventListener('click', function () {
                    // Ask the user for pointer lock
                    console.log("Requesting PointerLock");
                    _this.element.requestPointerLock = _this.element.requestPointerLock ||
                        _this.element.mozRequestPointerLock ||
                        _this.element.webkitRequestPointerLock;
                    _this.element.requestPointerLock();
                });
                document.addEventListener('pointerlockchange', this.pointerLockChange.bind(this), false);
                document.addEventListener('mozpointerlockchange', this.pointerLockChange.bind(this), false);
                document.addEventListener('webkitpointerlockchange', this.pointerLockChange.bind(this), false);
                document.addEventListener('pointerlockerror', this.pointerLockError.bind(this), false);
                document.addEventListener('mozpointerlockerror', this.pointerLockError.bind(this), false);
                document.addEventListener('webkitpointerlockerror', this.pointerLockError.bind(this), false);
            }
            // Scene changes for Physijs
            this.name = "Main";
            this.fog = new THREE.Fog(0xffffff, 0, 750);
            this.setGravity(new THREE.Vector3(0, -10, 0));
            // start simulation
            /*
            this.addEventListener('update', this._simulateScene);
            console.log("Start Simulation"); */
            // Add Spot Light to the scene
            this.addDirectionalLight();
            // Level Load
            this.addLevel();
            // Add player controller
            this.addPlayer();
            // Add custom donut imported from Blender
            this.addDonutMesh();
            this.addUglyDonutMesh();
            // Add death plane to the scene
            this.addDeathPlane();
            // Collision Check
            this.player.addEventListener('collision', function (eventObject) {
                if (eventObject.name === "BigIsland") {
                    console.log("player hit the big island");
                    this.isGrounded = true;
                    createjs.Sound.play("land");
                }
                if (eventObject.name === "Board") {
                    console.log("player hit the board");
                    this.isGrounded = true;
                    createjs.Sound.play("land");
                }
                if (eventObject.name === "SmallIsland") {
                    console.log("player hit the board");
                    this.isGrounded = true;
                    createjs.Sound.play("land");
                }
                if (eventObject.name === "Donut") {
                    createjs.Sound.play("bite");
                    scene.remove(eventObject);
                    this.scoreValue += 100;
                    this.scoreLabel.text = "SCORE: " + this.scoreValue;
                }
                if (eventObject.name === "UglyDonut") {
                    createjs.Sound.play("bite");
                    this.livesValue--;
                    this.livesLabel.text = "LIVES: " + this.livesValue;
                    scene.remove(eventObject);
                }
                if (eventObject.name === "Door") {
                    config.Scene.gScore = this.scoreValue;
                    config.Scene.gLive = this.livesValue;
                    console.log("score: " + config.Scene.gScore);
                    currentScene = config.Scene.LEVEL2;
                    changeScene();
                }
                if (eventObject.name === "DeathPlane") {
                    createjs.Sound.play("hit");
                    this.livesValue--;
                    if (this.livesValue <= 0) {
                        // Exit Pointer Lock
                        document.exitPointerLock();
                        this.children = []; // an attempt to clean up
                        this._isGamePaused = true;
                        // Play the Game Over Scene
                        currentScene = config.Scene.OVER;
                        changeScene();
                    }
                    else {
                        // otherwise reset my player and update Lives
                        this.livesLabel.text = "LIVES: " + this.livesValue;
                        this.remove(this.player);
                        this.player.position.set(0, 30, 10);
                        this.add(this.player);
                    }
                }
            }.bind(this));
            // create parent-child relationship with camera and player
            this.player.add(camera);
            camera.position.set(0, 1, 0);
            this.simulate();
        };
        /**
         * Camera Look function
         *
         * @method cameraLook
         * @return void
         */
        Play.prototype.cameraLook = function () {
            var zenith = THREE.Math.degToRad(90);
            var nadir = THREE.Math.degToRad(-90);
            var cameraPitch = camera.rotation.x + this.mouseControls.pitch;
            // Constrain the Camera Pitch
            camera.rotation.x = THREE.Math.clamp(cameraPitch, nadir, zenith);
        };
        /**
         * @method update
         * @returns void
         */
        Play.prototype.update = function () {
            this.donuts.forEach(function (donut) {
                donut.setAngularFactor(new Vector3(0, 0, 0));
                donut.setAngularVelocity(new Vector3(0, 1, 0));
            });
            this.donuts.forEach(function (donut) {
                donut.setAngularFactor(new Vector3(0, 0, 0));
                donut.setAngularVelocity(new Vector3(0, 1, 0));
            });
            this.uglyDonuts.forEach(function (uglyDonut) {
                uglyDonut.setAngularFactor(new Vector3(0, 0, 0));
                uglyDonut.setAngularVelocity(new Vector3(0, 1, 0));
            });
            this.checkControls();
            this.stage.update();
            if (!this.keyboardControls.paused) {
                this.simulate();
            }
        };
        /**
         * Responds to screen resizes
         *
         * @method resize
         * @return void
         */
        Play.prototype.resize = function () {
            canvas.style.width = "100%";
            this.livesLabel.x = config.Screen.WIDTH * 0.1;
            this.livesLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.scoreLabel.x = config.Screen.WIDTH * 0.8;
            this.scoreLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.update();
        };
        return Play;
    }(scenes.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));

//# sourceMappingURL=play.js.map
