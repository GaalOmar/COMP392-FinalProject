var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @module scenes
 */
var scenes;
(function (scenes) {
    /**
     * This class is where we show the win scence
     *
     * @class Win
     * @extends scenes.Scene
     */
    var Win = (function (_super) {
        __extends(Win, _super);
        /**
         * Empty Contructor
         *
         * @constructor
         */
        function Win() {
            _super.call(this);
            this._initialize();
            this.start();
        }
        Win.prototype._setupCanvas = function () {
            canvas.style.width = "100%";
            canvas.setAttribute("height", config.Screen.HEIGHT.toString());
            canvas.setAttribute("width", config.Screen.WIDTH.toString());
            canvas.style.backgroundColor = "#FFFFFF";
        };
        /**
         * This method sets up default values for class member variables
         * and objects
         *
         * @method _initialize
         * @return void
         */
        Win.prototype._initialize = function () {
            // Create to HTMLElements
            this._blocker = document.getElementById("blocker");
            this._blocker.style.display = "none";
            // setup canvas for menu scene
            this._setupCanvas();
            // setup a stage on the canvas
            this._stage = new createjs.Stage(canvas);
            this._stage.enableMouseOver(20);
        };
        /**
         * The start method is the main method for the scene class
         *
         * @method start
         * @return void
         */
        Win.prototype.start = function () {
            this._menu = new createjs.Bitmap(assets.getResult("Win"));
            this._menu.regX = this._menu.getBounds().width * 0.5;
            this._menu.regY = this._menu.getBounds().height * 0.5;
            this._menu.x = config.Screen.WIDTH * 0.5;
            this._menu.y = (config.Screen.HEIGHT * 0.5);
            this._stage.addChild(this._menu);
            this._restartButton = new createjs.Bitmap(assets.getResult("RestartButton"));
            this._restartButton.regX = this._restartButton.getBounds().width * 0.5;
            this._restartButton.regY = this._restartButton.getBounds().height * 0.5;
            this._restartButton.x = config.Screen.WIDTH * 0.5;
            this._restartButton.y = (config.Screen.HEIGHT * 0.5) + 100;
            this._stage.addChild(this._restartButton);
            this._menuButton = new createjs.Bitmap(assets.getResult("MenuButton"));
            this._menuButton.regX = this._menuButton.getBounds().width * 0.5;
            this._menuButton.regY = this._menuButton.getBounds().height * 0.5;
            this._menuButton.x = config.Screen.WIDTH * 0.5;
            this._menuButton.y = (config.Screen.HEIGHT * 0.5) + 170;
            this._stage.addChild(this._menuButton);
            this._restartButton.on("mouseover", function (event) {
                event.target.alpha = 0.7;
            });
            this._restartButton.on("mouseout", function (event) {
                event.target.alpha = 1.0;
            });
            this._restartButton.on("click", function (event) {
                currentScene = config.Scene.PLAY;
                changeScene();
            });
            this._menuButton.on("mouseover", function (event) {
                event.target.alpha = 0.7;
            });
            this._menuButton.on("mouseout", function (event) {
                event.target.alpha = 1.0;
            });
            this._menuButton.on("click", function (event) {
                currentScene = config.Scene.MENU;
                changeScene();
            });
        };
        /**
         * The update method updates the animation loop and other objects
         *
         * @method update
         * @return void
         */
        Win.prototype.update = function () {
            this._stage.update();
        };
        /**
         * The resize method is a procedure that sets variables and objects on screen resize
         *
         * @method resize
         * @return void
         */
        Win.prototype.resize = function () {
            this._setupCanvas();
        };
        return Win;
    }(scenes.Scene));
    scenes.Win = Win;
})(scenes || (scenes = {}));

//# sourceMappingURL=win.js.map
