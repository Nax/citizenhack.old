module CitizenHack {
    export class Symbol {
        public char: string;
        public color: string;
        public bgcolor: string;

        constructor (char: string, color: string, bgcolor: string) {
            this.char = char;
            this.color = color;
            this.bgcolor = bgcolor;
        }
    }
}