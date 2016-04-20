module config {
    export class Screen {
        static WIDTH:number = window.innerWidth;
        static HEIGHT:number = window.innerHeight;
        static RATIO:number = window.innerWidth / window.innerHeight;
    }
    
    // Scene Constants
    export class Scene {
        //Added every scene required
        public static MENU: number = 0;
        public static PLAY: number = 1;
        public static OVER: number = 2;
        public static LEVEL2: number = 3;
        public static LEVEL3: number = 4;
        public static gLive: number;
        public static gScore: number;
        public static WIN: number = 5;
        public static INSTRUCTIONS: number = 6;
        public static THANK: number = 7;
        
    }
    
}