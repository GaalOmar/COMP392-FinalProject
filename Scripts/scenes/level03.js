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
     * This is Level 3 where you have to walk across the path and avoid the lava
     *
     * @class Level03
     * @param havePointerLock {boolean}
     */
    var Level03 = (function (_super) {
        __extends(Level03, _super);
        /**
         * @constructor
         */
        function Level03() {
            _super.call(this);
            this.winGame = false;
            this.donutCount = 5;
            //light
            this.light = new THREE.DirectionalLight(0xffffff);
            this.xCoordinate = -11;
            this.zCoordinate = -158;
            this.zCoordinate2 = -56;
            this.yRotate = 0.03;
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
        Level03.prototype._setupCanvas = function () {
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
        Level03.prototype._initialize = function () {
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
        Level03.prototype.setupScoreboard = function () {
            // initialize  score and lives values
            this.scoreValue = config.Scene.gScore;
            this.livesValue = config.Scene.gLive;
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
        Level03.prototype.addDirectionalLight = function () {
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
        Level03.prototype.addLevel = function () {
            //add soundtrack
            createjs.Sound.play("soundtracklvl1");
            createjs.Sound.volume = 0.1;
            // Beginning Big Island
            //Ground texture
            this.groundTexture = new THREE.TextureLoader().load('../../Images/seamless.jpg');
            this.groundTexture.wrapS = THREE.RepeatWrapping;
            this.groundTexture.wrapT = THREE.RepeatWrapping;
            this.groundTexture.repeat.set(2, 2);
            this.groundTextureNormal = new THREE.TextureLoader().load('../../Images/seamless.jpg');
            this.groundTextureNormal.wrapS = THREE.RepeatWrapping;
            this.groundTextureNormal.wrapT = THREE.RepeatWrapping;
            this.groundTextureNormal.repeat.set(2, 2);
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
            this.bigIsland = new Physijs.ConvexMesh(this.bigIslandGeometry, this.bigIslandMaterial, 0);
            this.bigIsland.position.set(0, 0, -83);
            this.bigIsland.receiveShadow = true;
            this.bigIsland.name = "BigIsland";
            this.add(this.bigIsland);
            console.log("Added BigIsland to scene");
            this.bigIsland = new Physijs.ConvexMesh(new BoxGeometry(32, 1, 43), this.bigIslandMaterial, 0);
            this.bigIsland.position.set(0, 0, -30);
            this.bigIsland.receiveShadow = true;
            this.bigIsland.name = "EnemyBoard";
            this.add(this.bigIsland);
            console.log("Added EnemyBoard to scene");
            // movingBoard            
            this.movingboardGeometry1 = new BoxGeometry(10, 1, 5);
            this.movingboardMaterial1 = Physijs.createMaterial(this.groundMaterial, 0, 0);
            this.movingboard1 = new Physijs.ConvexMesh(this.movingboardGeometry1, this.movingboardMaterial1, 0);
            this.movingboard1.position.set(-11, 0, -99);
            this.movingboard1.receiveShadow = true;
            this.movingboard1.name = "MovingBoard";
            this.add(this.movingboard1);
            console.log("Added Board to scene");
            // Board
            this.boardGeometry = new BoxGeometry(32, 1, 6);
            this.boardMaterial = Physijs.createMaterial(this.groundMaterial, 0, 0);
            this.board = new Physijs.ConvexMesh(this.boardGeometry, this.boardMaterial, 0);
            this.board.position.set(0, 0, -107);
            this.board.receiveShadow = true;
            this.board.name = "Board";
            this.add(this.board);
            console.log("Added Board to scene");
            //spinningboard
            this.spinningboardGeometry = new BoxGeometry(10, 1, 21);
            this.spinningboardMaterial = Physijs.createMaterial(this.groundMaterial, 0, 0);
            this.spinningboard = new Physijs.ConvexMesh(this.spinningboardGeometry, this.spinningboardMaterial, 0);
            this.spinningboard.position.set(0, 0, -125);
            this.spinningboard.receiveShadow = true;
            this.spinningboard.name = "SpinningBoard";
            this.add(this.spinningboard);
            console.log("Added BigIsland to scene");
            // Board
            this.board = new Physijs.ConvexMesh(this.boardGeometry, this.boardMaterial, 0);
            this.board.position.set(0, 0, -141);
            this.board.receiveShadow = true;
            this.board.name = "Board";
            this.add(this.board);
            console.log("Added Board to scene");
            // moving board
            this.movingboard2 = new Physijs.ConvexMesh(this.movingboardGeometry1, this.movingboardMaterial1, 0);
            this.movingboard2.position.set(0, 0, -148);
            this.movingboard2.receiveShadow = true;
            this.movingboard2.name = "Board";
            this.add(this.movingboard2);
            console.log("Added Board to scene");
            this.movingboard3 = new Physijs.ConvexMesh(this.movingboardGeometry1, this.movingboardMaterial1, 0);
            this.movingboard3.position.set(0, 0, -56);
            this.movingboard3.receiveShadow = true;
            this.movingboard3.name = "Board";
            this.add(this.movingboard3);
            console.log("Added Board to scene");
            // Finish Line Island
            this.bigIslandGeometry = new BoxGeometry(32, 1, 20);
            this.bigIslandMaterial = Physijs.createMaterial(this.groundMaterial, 0, 0);
            this.bigIsland = new Physijs.ConvexMesh(this.bigIslandGeometry, this.bigIslandMaterial, 0);
            this.bigIsland.position.set(0, 0, -173);
            this.bigIsland.receiveShadow = true;
            this.bigIsland.name = "BigIsland";
            this.add(this.bigIsland);
            console.log("Added BigIsland to scene");
            //Door to success
            this.bigIslandGeometry = new BoxGeometry(32, 20, 1);
            this.bigIslandMaterial = Physijs.createMaterial(this.doorMaterial, 0, 0);
            this.bigIsland = new Physijs.ConvexMesh(this.bigIslandGeometry, this.bigIslandMaterial, 0);
            this.bigIsland.position.set(0, 10, -183);
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
        Level03.prototype.addPlayer = function () {
            // Player Object
            this.playerGeometry = new BoxGeometry(2, 4, 2);
            this.playerMaterial = Physijs.createMaterial(new LambertMaterial({ color: 0x00ff00 }), 0.4, 0);
            this.player = new Physijs.BoxMesh(this.playerGeometry, this.playerMaterial, 1);
            this.player.position.set(0, 5, 10);
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
        Level03.prototype.addDeathPlane = function () {
            this.deathPlaneGeometry = new BoxGeometry(100, 1, -720);
            this.deathPlaneMaterial = Physijs.createMaterial(new MeshBasicMaterial({ color: 0xcc0000 }), 0.4, 0.6);
            this.deathPlane = new Physijs.BoxMesh(this.deathPlaneGeometry, this.deathPlaneMaterial, 0);
            this.deathPlane.position.set(0, -10, 0);
            this.deathPlane.name = "DeathPlane";
            this.add(this.deathPlane);
        };
        /**
          * This method adds a ghost to the scene
          *
          * @method addGhostMesh
          * @return void
          */
        Level03.prototype.addGhostMesh = function () {
            var self = this;
            this.ghost = new Array(); // Instantiate a convex mesh array
            var ghostLoader = new THREE.JSONLoader().load("../../Assets/imported/ghoust.json", function (geometry, materials) {
                var phongMaterial = new PhongMaterial({ color: 0xffffff });
                phongMaterial.emissive = new THREE.Color(0xffffff);
                materials[0] = Physijs.createMaterial((phongMaterial), 0.4, 0.6);
                var phongMaterial = new PhongMaterial({ color: 0x990000 });
                phongMaterial.emissive = new THREE.Color(0x990000);
                materials[1] = Physijs.createMaterial((phongMaterial), 0.4, 0.6);
                var phongMaterial = new PhongMaterial({ color: 0x000000 });
                phongMaterial.emissive = new THREE.Color(0x000000);
                materials[2] = Physijs.createMaterial((phongMaterial), 0.4, 0.6);
                var phongMaterial = new PhongMaterial({ color: 0xffffff });
                phongMaterial.emissive = new THREE.Color(0xffffff);
                materials[3] = Physijs.createMaterial((phongMaterial), 0.4, 0.6);
                for (var count = 0; count < 1; count++) {
                    self.ghost[count] = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial(materials), 0);
                    self.ghost[count].receiveShadow = true;
                    self.ghost[count].castShadow = true;
                    self.ghost[count].name = "Ghost";
                    self.setGhostPosition(self.ghost[count]);
                }
            });
            console.log("Added Ghost Mesh to Scene");
        };
        /**
         * This method adds a donut to the scene
         *
         * @method addDonutMesh
         * @return void
         */
        Level03.prototype.addDonutMesh = function () {
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
        Level03.prototype.addDonutPosition = function (donut, count) {
            if (count == 0) {
                donut.position.set(0, 10, -83);
            }
            else if (count == 1) {
                donut.position.set(-10, 10, -83);
            }
            else if (count == 2) {
                donut.position.set(10, 10, -83);
            }
            else if (count == 3) {
                donut.position.set(5, 10, -170);
            }
            else {
                donut.position.set(-5, 10, -170);
            }
            this.add(donut);
        };
        /**
         * This method adds the ugly donut controller to the scene
         *
         * @method addDonutMesh
         * @return void
         */
        Level03.prototype.addUglyDonutMesh = function () {
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
        Level03.prototype.addUglyDonutPosition = function (uglyDonut, count) {
            if (count == 0) {
                uglyDonut.position.set(-5, 10, -83);
            }
            else if (count == 1) {
                uglyDonut.position.set(5, 10, -83);
            }
            else {
                uglyDonut.position.set(0, 10, -170);
            }
            this.add(uglyDonut);
        };
        /**
         * This method randomly sets the donut object's position
         *
         * @method setdonutPosition
         * @return void
         */
        Level03.prototype.setdonutPosition = function (donut) {
            var randomPointX = Math.floor(Math.random() * 20) - 10;
            var randomPointZ = Math.floor(Math.random() * 20) - 10;
            donut.position.set(randomPointX, 10, randomPointZ);
            this.add(donut);
        };
        /**
         * This method the ghost object position
         *
         * @method setGhostPosition
         * @return void
         */
        Level03.prototype.setGhostPosition = function (ghostMesh) {
            ghostMesh.position.set(0, 2, -30);
            this.add(ghostMesh);
        };
        /**
         * Event Handler method for any pointerLockChange events
         *
         * @method pointerLockChange
         * @return void
         */
        Level03.prototype.pointerLockChange = function (event) {
            if (document.pointerLockElement === this.element) {
                // enable our mouse and keyboard controls
                this.keyboardControls.enabled = true;
                this.mouseControls.enabled = true;
                this.blocker.style.display = 'none';
            }
            else {
                if (this.livesValue <= 0 || this.winGame) {
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
        Level03.prototype.pointerLockError = function (event) {
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
        Level03.prototype.checkControls = function () {
            if (this.keyboardControls.enabled) {
                if (this.keyboardControls.cheatKey) {
                    this.remove(this.player);
                    this.player.position.set(0, 10, -173);
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
        Level03.prototype._unpauseSimulation = function () {
            scene.onSimulationResume();
            console.log("resume simulation");
        };
        /**
         * This method updates the moving ground's position
         *
         * @method movingGroundLTR
         * @return void
         */
        Level03.prototype.movingGroundLTR = function () {
            this.movingboard1.__dirtyPosition = true;
            if (this.xCoordinate >= 11) {
                this.xFlag = true;
            }
            else if (this.xCoordinate <= -11) {
                this.xFlag = false;
            }
            if (this.xFlag) {
                this.xCoordinate -= 0.05;
            }
            else {
                this.xCoordinate += 0.05;
            }
            this.movingboard1.position.set(this.xCoordinate, 0, -99);
        };
        /**
         * This method updates the moving ground's position
         *
         * @method movingGroundBNF
         * @return void
         */
        Level03.prototype.movingGroundBNF = function () {
            this.movingboard2.__dirtyPosition = true;
            if (this.zCoordinate <= -148 && !this.zFlag) {
                this.zCoordinate -= 0.05;
                if (this.zCoordinate < -158) {
                    this.zFlag = true;
                }
            }
            else {
                this.zCoordinate += 0.05;
                if (this.zCoordinate > -148) {
                    this.zCoordinate = -148;
                    this.zFlag = false;
                }
            }
            this.movingboard2.position.set(0, 0, this.zCoordinate);
        };
        /**
         * This method updates the moving ground's position
         *
         * @method movingGroundBNF2
         * @return void
         */
        Level03.prototype.movingGroundBNF2 = function () {
            this.movingboard3.__dirtyPosition = true;
            if (this.zCoordinate2 <= -56 && !this.zFlag2) {
                this.zCoordinate2 -= 0.05;
                if (this.zCoordinate2 < -69) {
                    this.zFlag2 = true;
                }
            }
            else {
                this.zCoordinate2 += 0.05;
                if (this.zCoordinate2 > -56) {
                    this.zCoordinate2 = -56;
                    this.zFlag2 = false;
                }
            }
            this.movingboard3.position.set(0, 0, this.zCoordinate2);
        };
        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++
        /**
         * The start method is the main method for the scene class
         *
         * @method start
         * @return void
         */
        Level03.prototype.start = function () {
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
            this.addGhostMesh();
            this.addDonutMesh();
            this.addUglyDonutMesh();
            this.spinningboard.rotation.y = 0.5;
            // Add death plane to the scene
            this.addDeathPlane();
            // Collision Check
            this.player.addEventListener('collision', function (eventObject) {
                if (eventObject.name === "BigIsland") {
                    console.log("player hit the big island");
                    this.isGrounded = true;
                    this.onGround = false;
                    createjs.Sound.play("land");
                }
                if (eventObject.name === "EnemyBoard") {
                    console.log("player hit the big island");
                    this.isGrounded = true;
                    this.onGround = false;
                    createjs.Sound.play("land");
                }
                if (eventObject.name === "Board") {
                    console.log("player hit the board");
                    this.isGrounded = true;
                    this.onGround = false;
                    createjs.Sound.play("land");
                }
                if (eventObject.name === "SmallIsland") {
                    console.log("player hit the board");
                    this.isGrounded = true;
                    this.onGround = false;
                    createjs.Sound.play("land");
                }
                if (eventObject.name === "Donut") {
                    createjs.Sound.play("bite");
                    scene.remove(eventObject);
                    this.scoreValue += 100;
                    this.scoreLabel.text = "SCORE: " + this.scoreValue;
                }
                if (eventObject.name === "Ghost") {
                    this.livesValue--;
                    this.livesLabel.text = "LIVES: " + this.livesValue;
                }
                if (eventObject.name === "UglyDonut") {
                    createjs.Sound.play("bite");
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
                        this.livesLabel.text = "LIVES: " + this.livesValue;
                        scene.remove(eventObject);
                    }
                }
                if (eventObject.name === "Door") {
                    document.exitPointerLock();
                    this.children = []; // an attempt to clean up
                    this.winGame = true;
                    currentScene = config.Scene.WIN;
                    changeScene();
                }
                if (eventObject.name === "EnemyBoard") {
                    this.onGround = true;
                    createjs.Sound.play("land");
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
            camera.position.set(0, 1.5, 0);
            //camera.position.set(0, 3, 0);
            //this.add(camera)
            this.simulate();
        };
        /**
         * Camera Look function
         *
         * @method cameraLook
         * @return void
         */
        Level03.prototype.cameraLook = function () {
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
        Level03.prototype.update = function () {
            var _this = this;
            this.movingGroundLTR();
            this.movingGroundBNF();
            this.movingGroundBNF2();
            this.spinningboard.rotation.y += this.yRotate;
            if (this.spinningboard.rotation.y > this.yRotate) {
                this.yRotation = this.spinningboard.rotation.y;
            }
            else {
                this.spinningboard.rotation.y = this.yRotation;
            }
            this.donuts.forEach(function (donut) {
                donut.setAngularFactor(new Vector3(0, 0, 0));
                donut.setAngularVelocity(new Vector3(0, 1, 0));
            });
            this.uglyDonuts.forEach(function (uglyDonut) {
                uglyDonut.setAngularFactor(new Vector3(0, 0, 0));
                uglyDonut.setAngularVelocity(new Vector3(0, 1, 0));
            });
            this.ghost.forEach(function (ghostMesh) {
                var direction = new Vector3(0, 0, 0);
                ghostMesh.lookAt(_this.player.position);
                var rotation_matrix = new THREE.Matrix4();
                rotation_matrix.makeRotationFromEuler(ghostMesh.rotation);
                ghostMesh.rotation.setFromRotationMatrix(rotation_matrix);
                ghostMesh.__dirtyRotation = true;
                ghostMesh.__dirtyPosition = true;
                rotation_matrix.makeRotationFromEuler(_this.rotation);
                ;
                var velocity = ghostMesh.getLinearVelocity();
                velocity.z = ghostMesh === _this.player ? 8 : 2;
                velocity.x = 0;
                velocity.applyMatrix4(rotation_matrix);
                ghostMesh.setLinearVelocity(velocity);
                if (_this.onGround) {
                    if (ghostMesh.position.z > -50 && ghostMesh.position.z < -10) {
                        if (ghostMesh.position.x > -16 && ghostMesh.position.x < 16) {
                            var distanceZ = _this.player.position.z - ghostMesh.position.z;
                            var distanceX = _this.player.position.x - ghostMesh.position.x;
                            var x, z;
                            if (distanceZ > 0) {
                                z = ghostMesh.position.z + 0.01;
                            }
                            else {
                                z = ghostMesh.position.z - 0.01;
                            }
                            if (distanceX < 0) {
                                x = ghostMesh.position.x - 0.01;
                            }
                            else {
                                x = ghostMesh.position.x + 0.01;
                            }
                            ghostMesh.position.set(x, 2, z);
                        }
                    }
                }
                else {
                    ghostMesh.position.set(0, 2, -30);
                }
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
        Level03.prototype.resize = function () {
            canvas.style.width = "100%";
            this.livesLabel.x = config.Screen.WIDTH * 0.1;
            this.livesLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.scoreLabel.x = config.Screen.WIDTH * 0.8;
            this.scoreLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.update();
        };
        return Level03;
    }(scenes.Scene));
    scenes.Level03 = Level03;
})(scenes || (scenes = {}));

//# sourceMappingURL=level03.js.map
