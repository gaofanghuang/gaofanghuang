const draw = {
    ctx: Object,
    canvas: Object,
    init(params = {
        el: "#canvas",
        width: window.innerWidth,
        height: window.innerHeight
    }) {
        this.canvas = document.querySelector(params.el);
        this.ctx = canvas.getContext('2d');
        this.canvas.width = params.width;
        this.canvas.height = params.height;
    },
    clear() {
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
    }
}

export default draw