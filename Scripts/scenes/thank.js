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
     * This class is where we say thanks for playing
     *
     * @class Thank
     * @extends scenes.Scene
     */
    var Thank = (function (_super) {
        __extends(Thank, _super);
        /**
         * Empty Contructor
         *
         * @constructor
         */
        function Thank() {
            _super.call(this);
            this._initialize();
            this.start();
        }
        Thank.prototype._setupCanvas = function () {
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
        Thank.prototype._initialize = function () {
            // Create to HTMLElements
            this._blocker = document.getElementById("blocker");
            this._blocker.style.display = "none";
            // setup canvas for menu scene
            this._setupCanvas();
            // setup a stage on the canvas
            this._stage = new createjs.Stage(canvas);
            this._stage.enableMouseOver(20);
            this._stage;
        };
        /**
         * The start method is the main method for the scene class
         *
         * @method start
         * @return void
         */
        Thank.prototype.start = function () {
            this._thank = new createjs.Bitmap(assets.getResult("ThankYou"));
            this._thank.regX = this._thank.getBounds().width * 0.5;
            this._thank.regY = this._thank.getBounds().height * 0.5;
            this._thank.x = config.Screen.WIDTH * 0.5;
            this._thank.y = (config.Screen.HEIGHT * 0.5);
            this._stage.addChild(this._thank);
        };
        /**
         * The update method updates the animation loop and other objects
         *
         * @method update
         * @return void
         */
        Thank.prototype.update = function () {
            this._stage.update();
        };
        /**
         * The resize method is a procedure that sets variables and objects on screen resize
         *
         * @method resize
         * @return void
         */
        Thank.prototype.resize = function () {
            this._setupCanvas();
        };
        return Thank;
    }(scenes.Scene));
    scenes.Thank = Thank;
})(scenes || (scenes = {}));

//# sourceMappingURL=thank.js.map
