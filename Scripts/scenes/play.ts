/**
 * The Scenes module is a namespace to reference all scene objects
 * 
 * @module scenes
 */
module scenes {
    /**
     * The Play class is where the main action occurs for the game
     * 
     * @class Play
     * @param havePointerLock {boolean}
     */
    export class Play extends scenes.Scene {
        private havePointerLock: boolean;
        private element: any;

        private blocker: HTMLElement;
        private instructions: HTMLElement;
        private spotLight: SpotLight;
        private groundGeometry: CubeGeometry;
        private groundPhysicsMaterial: Physijs.Material;
        private groundMaterial: PhongMaterial;
        private ground: Physijs.Mesh;
        private groundTexture: Texture;
        private groundTextureNormal: Texture;
        private playerGeometry: CubeGeometry;
        private playerMaterial: Physijs.Material;
        private player: Physijs.Mesh;
        private keyboardControls: objects.KeyboardControls;
        private mouseControls: objects.MouseControls;
        private isGrounded: boolean;
        private deathPlaneGeometry: CubeGeometry;
        private deathPlaneMaterial: Physijs.Material;
        private deathPlane: Physijs.Mesh;

        private velocity: Vector3;
        private prevTime: number;
        private clock: Clock;

        private stage: createjs.Stage;
        private scoreLabel: createjs.Text;
        private livesLabel: createjs.Text;
        private scoreValue: number;
        private livesValue: number;
        
        //team declorations 
        
        //donutGeometry
        private donutGeometry: Geometry;
        private donutMaterial: Physijs.Material;
        
        //donuts
        private donut: Physijs.ConcaveMesh;
        private donut2: Physijs.ConcaveMesh;
        private donut3: Physijs.ConcaveMesh;
        private donut4: Physijs.ConcaveMesh;
        private donut5: Physijs.ConcaveMesh;
        private donut6: Physijs.ConcaveMesh;
        
        //ugjyDonuts
        private uglyDonuts: Physijs.ConcaveMesh[];
        private uglyDonut: Physijs.ConcaveMesh;
        private uglyDonut2: Physijs.ConcaveMesh;
        private uglyDonut3: Physijs.ConcaveMesh;
        
        private donuts: Physijs.ConcaveMesh[];
        
        //level objects
        
        //big island
        private bigIsland: Physijs.Mesh;
        private bigIslandGeometry: CubeGeometry;
        private bigIslandMaterial: Physijs.Material;
        //small island
        private smallIsland;
        private smallIslandGeometry;
        private smallIslandMaterial;
        //board
        private board: Physijs.Mesh;
        private boardGeometry: CubeGeometry;
        private boardMaterial: Physijs.Material;
        //doorvar doorTexture; Texture;
        private doorTextureNormal: Texture;
        private doorPhysicsMaterial: Physijs.Material;
        private doorMaterial: PhongMaterial;
        private doorTexture; Texture;
        //light
        private light = new THREE.DirectionalLight(0xffffff);
        
        
        /**
         * @constructor
         */
        constructor() {
            super();

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
        private _setupCanvas(): void {
            canvas.setAttribute("width", config.Screen.WIDTH.toString());
            canvas.setAttribute("height", (config.Screen.HEIGHT * 0.1).toString());
            canvas.style.backgroundColor = "#000000";
        }

        /**
         * The initialize method sets up key objects to be used in the scene
         * 
         * @method _initialize
         * @returns void
         */
        private _initialize(): void {          
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
        }
        /**
         * This method sets up the scoreboard for the scene
         * 
         * @method setupScoreboard
         * @returns void
         */
        private setupScoreboard(): void {
            // initialize  score and lives values
            this.scoreValue = 0;
            this.livesValue = 1;

            // Add Lives Label
            this.livesLabel = new createjs.Text(
                "LIVES: " + this.livesValue,
                "40px Consolas",
                "#ffffff"
            );
            this.livesLabel.x = config.Screen.WIDTH * 0.1;
            this.livesLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.addChild(this.livesLabel);
            console.log("Added Lives Label to stage");

            // Add Score Label
            this.scoreLabel = new createjs.Text(
                "SCORE: " + this.scoreValue,
                "40px Consolas",
                "#ffffff"
            );
            this.scoreLabel.x = config.Screen.WIDTH * 0.8;
            this.scoreLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.addChild(this.scoreLabel);
            console.log("Added Score Label to stage");
        }

        /**
         * Add a DirectionalLight to the scene
         * 
         * @method addDirectionalLight
         * @return void
         */
        private addDirectionalLight(): void {
            // DirectionalLight 
            this.light.castShadow = true; // soft white light
            this.light.shadowCameraNear = 2;
            this.add(this.light);
            console.log("Added DirectionalLight to scene");
        }

        /**
         * Add a level to the scene
         * 
         * @method addLevel
         * @return void
         */
        private addLevel(): void {
            
            // Beginning Big Island
       
            //Ground texture
            this.groundTexture = new THREE.TextureLoader().load('../../Images/Grass.jpg');
            this.groundTexture.wrapS = THREE.RepeatWrapping;
            this.groundTexture.wrapT = THREE.RepeatWrapping;
            this.groundTexture.repeat.set(10, 10);

            this.groundTextureNormal = new THREE.TextureLoader().load('../../Images/Grass.jpg');
            this.groundTextureNormal.wrapS = THREE.RepeatWrapping;
            this.groundTextureNormal.wrapT = THREE.RepeatWrapping;
            this.groundTextureNormal.repeat.set(10, 10);

            this.groundMaterial = new PhongMaterial();
            this.groundMaterial.map = this.groundTexture;
            this.groundMaterial.bumpMap = this.groundTextureNormal;
            this.groundMaterial.bumpScale = 0.2;
            
            //Door Texture
            this.doorTexture = new THREE.TextureLoader().load('../../Images/door.jpg');
            this.doorTexture.wrapS = THREE.RepeatWrapping;
            this.doorTexture.wrapT = THREE.RepeatWrapping;
            this.doorTexture.repeat.set(10, 10);

            this.doorTextureNormal = new THREE.TextureLoader().load('../../Images/door.jpg');
            this.doorTextureNormal.wrapS = THREE.RepeatWrapping;
            this.doorTextureNormal.wrapT = THREE.RepeatWrapping;
            this.doorTextureNormal.repeat.set(10, 10);

            this.doorMaterial = new PhongMaterial();
            this.doorMaterial.map = this.doorTexture;
            this.doorMaterial.bumpMap = this.doorTextureNormal;
            this.doorMaterial.bumpScale = 0.2;
            
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
            this.smallIslandMaterial =Physijs.createMaterial(this.groundMaterial, 0, 0);
            this.smallIsland = new Physijs.ConvexMesh(this.smallIslandGeometry, this.smallIslandMaterial, 0);
            this.smallIsland.position.set(9, 0, - 58);
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
            this.boardGeometry = new BoxGeometry(32, 1, 10);
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
            this.smallIslandMaterial =Physijs.createMaterial(this.groundMaterial, 0, 0);
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
            this.bigIslandMaterial = Physijs.createMaterial(this.groundMaterial, 0, 0);
            this.bigIsland = new Physijs.ConvexMesh(this.bigIslandGeometry, this.bigIslandMaterial, 0);
            this.bigIsland.position.set(0, 10, -199);
            this.bigIsland.receiveShadow = true;
            this.bigIsland.name = "BigIsland";
            this.add(this.bigIsland);
            console.log("Added BigIsland to scene");
        
        }

        /**
         * Adds the player controller to the scene
         * 
         * @method addPlayer
         * @return void
         */
        private addPlayer(): void {
            // Player Object
            this.playerGeometry = new BoxGeometry(2, 4, 2);
            this.playerMaterial = Physijs.createMaterial(new LambertMaterial({ color: 0x00ff00 }), 0.4, 0);

            this. player = new Physijs.BoxMesh(this.playerGeometry, this.playerMaterial, 1);
            this.player.position.set(0, 30, 10);
            this.player.receiveShadow = true;
            this.player.castShadow = true;
            this.player.name = "Player";
            this.add(this.player);
            console.log("Added Player to Scene");
        }
        
        /**
         * Add the death plane to the scene
         * 
         * @method addDeathPlane
         * @return void
         */
        private addDeathPlane():void {
            this.deathPlaneGeometry = new BoxGeometry(100, 1, -720);
            this.deathPlaneMaterial = Physijs.createMaterial(new MeshBasicMaterial({color: 0xADD8E6}), 0.4, 0.6);
       
            this.deathPlane =  new Physijs.BoxMesh(this.deathPlaneGeometry, this.deathPlaneMaterial, 0);
            this.deathPlane.position.set(0, -10, 0);
            this.deathPlane.name = "DeathPlane";
            this.add(this.deathPlane);
       }
            
        /**
         * This method adds a donut to the scene
         * 
         * @method addDonutMesh
         * @return void
         */
        private addDonutMesh(): void {
            var self = this;

            this.donuts = new Array<Physijs.ConvexMesh>(); // Instantiate a convex mesh array

            var donutLoader = new THREE.JSONLoader().load("../../Assets/imported/donut.json", function(geometry: THREE.Geometry,materials) {
                //jem color    
                var phongMaterial = new PhongMaterial({ color: 0xF21F88 });
                phongMaterial.emissive = new THREE.Color(0xF21F88);
                materials[0] = Physijs.createMaterial((phongMaterial), 0.4, 0.6);
            
                //bun color    
                var phongMaterial = new PhongMaterial({ color: 0x946931 });
                phongMaterial.emissive = new THREE.Color(0x946931);
                materials[1] = Physijs.createMaterial((phongMaterial), 0.4, 0.6);
                
                //first donut
                this.donut2 = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial( materials ));
                this.donut2.receiveShadow = true;
                this.donut2.castShadow = true;
                this.donut2.name = "Donut";
                this.donut2.position.set(0,10,-10);
                scene.add(this.donut2);
                donuts.push(this.donut2); 
                //second donut
                this.donut3 = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial( materials ));
                this.donut3.receiveShadow = true;
                this.donut3.castShadow = true;
                this.donut3.name = "Donut";
                this.donut3.position.set(-11, 10, -38);
                scene.add(this.donut3);
                this.donuts.push(this.donut3); 
                
                //third donut
                this.donut4 = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial( materials ));
                this.donut4.receiveShadow = true;
                this.donut4.castShadow = true;
                this.donut4.name = "Donut";
                this.donut4.position.set(9, 10, - 58);
                scene.add(this.donut4);
                this.donuts.push(this.donut4); 
            
                //fourth donut
                this.donut5 = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial( materials ));
                this.donut5.receiveShadow = true;
                this.donut5.castShadow = true;
                this.donut5.name = "Donut";
                this.donut5.position.set(-1, 10, -170);
                scene.add(this.donut5);
                this.donuts.push(this.donut5); 
                
                //fifth donut
                this.donut6 = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial( materials ));
                this.donut6.receiveShadow = true;
                this.donut6.castShadow = true;
                this.donut6.name = "Donut";
                this.donut6.position.set(1, 10, -195);
                scene.add(this.donut6);
                this.donuts.push(this.donut6); 
            });

            console.log("Added Donut Mesh to Scene");
        }
        /**
         * This method adds a donut to the scene
         * 
         * @method addDonutMesh
         * @return void
         */
        private addUglyDonutMesh(): void {
            var self = this;

            this.uglyDonuts = new Array<Physijs.ConvexMesh>(); // Instantiate a convex mesh array

            var donutLoader2 = new THREE.JSONLoader().load("../../Assets/imported/donut.json", function(geometry: THREE.Geometry,materials) {
                //ugly donat gem
                var phongMaterial = new PhongMaterial({ color: 0x0add08 });
                phongMaterial.emissive = new THREE.Color(0x0add08);
                materials[0] = Physijs.createMaterial((phongMaterial), 0.4, 0.6);
                //ugly donat bun
                var phongMaterial = new PhongMaterial({ color: 0x000000 });
                phongMaterial.emissive = new THREE.Color(0x000000);
                materials[1] = Physijs.createMaterial((phongMaterial), 0.4, 0.6);
                
                //first ugly donut  
                this.uglyDonut = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial( materials )); 
                this.uglyDonut.receiveShadow = true;
                this.uglyDonut.castShadow = true;
                this.uglyDonut.name = "UglyDonut";
                this.uglyDonut.position.set(0,10,-30);
                scene.add(this.uglyDonut);
                this.uglyDonuts.push(this.uglyDonut); 
            
                //second ugly donut  
                this.uglyDonut2 = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial( materials )); 
                this.uglyDonut2.receiveShadow = true;
                this.uglyDonut2.castShadow = true;
                this.uglyDonut2.name = "UglyDonut";
                this.uglyDonut2.position.set(-1, 10, -118);
                scene.add(this.uglyDonut2);
                this.uglyDonuts.push(this.uglyDonut2); 
            
                //third ugly donut  
                this.uglyDonut3 = new Physijs.ConvexMesh(geometry, new THREE.MeshFaceMaterial( materials )); 
                this.uglyDonut3.receiveShadow = true;
                this.uglyDonut3.castShadow = true;
                this.uglyDonut3.name = "UglyDonut";
                this.uglyDonut3.position.set(-1, 10, -168);
                scene.add(this.uglyDonut3);
                this.uglyDonuts.push(this.uglyDonut3);
               
            
                
            });

            console.log("Added Donut Mesh to Scene");
        }

        /**
         * This method randomly sets the donut object's position
         * 
         * @method setdonutPosition
         * @return void
         */
        private setdonutPosition(donut: Physijs.ConvexMesh): void {
            var randomPointX: number = Math.floor(Math.random() * 20) - 10;
            var randomPointZ: number = Math.floor(Math.random() * 20) - 10;
            donut.position.set(randomPointX, 10, randomPointZ);
            this.add(donut);
        }

        /**
         * Event Handler method for any pointerLockChange events
         * 
         * @method pointerLockChange
         * @return void
         */
        pointerLockChange(event): void {
            if (document.pointerLockElement === this.element) {
                // enable our mouse and keyboard controls
                this.keyboardControls.enabled = true;
                this.mouseControls.enabled = true;
                this.blocker.style.display = 'none';
            } else {
                if (this.livesValue <= 0) {
                    this.blocker.style.display = 'none';
                    document.removeEventListener('pointerlockchange', this.pointerLockChange.bind(this), false);
                    document.removeEventListener('mozpointerlockchange', this.pointerLockChange.bind(this), false);
                    document.removeEventListener('webkitpointerlockchange', this.pointerLockChange.bind(this), false);
                    document.removeEventListener('pointerlockerror', this.pointerLockError.bind(this), false);
                    document.removeEventListener('mozpointerlockerror', this.pointerLockError.bind(this), false);
                    document.removeEventListener('webkitpointerlockerror', this.pointerLockError.bind(this), false);
                } else {
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
        }

        /**
         * Event handler for PointerLockError
         * 
         * @method pointerLockError
         * @return void
         */
        private pointerLockError(event): void {
            this.instructions.style.display = '';
            console.log("PointerLock Error Detected!!");
        }

        // Check Controls Function

        /**
         * This method updates the player's position based on user input
         * 
         * @method checkControls
         * @return void
         */
        private checkControls(): void {
            if (this.keyboardControls.enabled) {
                this.velocity = new Vector3();

                var time: number = performance.now();
                var delta: number = (time - this.prevTime) / 1000;

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
        }
        
        private _unpauseSimulation():void {
            scene.onSimulationResume();
            console.log("resume simulation");
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++

        /**
         * The start method is the main method for the scene class
         * 
         * @method start
         * @return void
         */
        public start(): void {
            // Set Up Scoreboard
            this.setupScoreboard();

            //check to see if pointerlock is supported
            this.havePointerLock = 'pointerLockElement' in document ||
                'mozPointerLockElement' in document ||
                'webkitPointerLockElement' in document;



            // Check to see if we have pointerLock
            if (this.havePointerLock) {
                this.element = document.body;

                this.instructions.addEventListener('click', () => {

                    // Ask the user for pointer lock
                    console.log("Requesting PointerLock");

                    this.element.requestPointerLock = this.element.requestPointerLock ||
                        this.element.mozRequestPointerLock ||
                        this.element.webkitRequestPointerLock;

                    this.element.requestPointerLock();
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
            this.player.addEventListener('collision', function(eventObject) {
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
                createjs.Sound.play("donut");
                scene.remove(eventObject);
                this.scoreValue += 100;
                this.scoreLabel.text = "SCORE: " + this.scoreValue;
            }
            if (eventObject.name === "UglyDonut") {
                createjs.Sound.play("donut");
                this.livesValue--;
                this.livesLabel.text = "LIVES: " + this.livesValue;
                this.remove(this.uglyDonut);
                
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
                    } else {
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
        }

        /**
         * Camera Look function
         * 
         * @method cameraLook
         * @return void
         */
        private cameraLook(): void {
            var zenith: number = THREE.Math.degToRad(90);
            var nadir: number = THREE.Math.degToRad(-90);

            var cameraPitch: number = camera.rotation.x + this.mouseControls.pitch;

            // Constrain the Camera Pitch
            camera.rotation.x = THREE.Math.clamp(cameraPitch, nadir, zenith);
        }

        /**
         * @method update
         * @returns void
         */
        public update(): void {

            this.donuts.forEach(donut => {
                donut.setAngularFactor(new Vector3(0, 0, 0));
                donut.setAngularVelocity(new Vector3(0, 1, 0));
            });
            
            this.donuts.forEach(donut => {
                donut.setAngularFactor(new Vector3(0, 0, 0));
                donut.setAngularVelocity(new Vector3(0, 1, 0));
            });
        
            this.uglyDonuts.forEach(uglyDonut => {
                uglyDonut.setAngularFactor(new Vector3(0, 0, 0));
                uglyDonut.setAngularVelocity(new Vector3(0, 1, 0));
            });

            this.checkControls();
            this.stage.update();
            
            if(!this.keyboardControls.paused) {
                this.simulate();
            }
            
        }

        /**
         * Responds to screen resizes
         * 
         * @method resize
         * @return void
         */
        public resize(): void {
            canvas.style.width = "100%";
            this.livesLabel.x = config.Screen.WIDTH * 0.1;
            this.livesLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.scoreLabel.x = config.Screen.WIDTH * 0.8;
            this.scoreLabel.y = (config.Screen.HEIGHT * 0.15) * 0.20;
            this.stage.update();
        }
    }
}