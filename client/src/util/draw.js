const draw = {
    ctx: Object,
    init(params = {
        el: "#canvas",
        width: window.innerWidth,
        height: window.innerHeight
    }) {
        let canvas = document.querySelector(params.el);
        this.ctx = canvas.getContext('2d');
        canvas.width = params.width;
        canvas.height = params.height;
    }
}

export default draw