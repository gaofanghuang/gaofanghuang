axios.defaults.baseURL = "http://localhost:9000";

var project = new Vue({
    el: '#project',
    data: {
        dev: true,
        showModal: false,
        list: [],
        curItem: {
            cover: "",
            name: "",
            describe: "",
            tags: "",
            ios: "",
            android: "",
            wxapp: "",
            web: ""
        }
    },
    mounted() {
        this.getList()
    },
    methods: {
        getList() {
            console.log("获取项目列表")
        },
        addProject() {
            console.log("添加项目")
            this.showModal = true
            this.curItem = {
                cover: "",
                name: "",
                describe: "",
                tags: "",
                ios: "",
                android: "",
                wxapp: "",
                web: ""
            }
        },
        getFile(file) {
            let _file = file.target.files[0]
            //判断是否是图片类型
            if (!/image\/\w+/.test(_file.type)) {
                alert("只能选择图片");
                return false;
            }
            let self = this;
            let reader = new FileReader();
            reader.readAsDataURL(_file);
            reader.onload = function (e) {
                axios.post({
                    url: "/upload",
                    params: {
                        base64: this.result
                    }
                }).then(({
                    data
                }) => {
                    this.curItem.cover = `${axios.defaults.baseURL}/uploads/${data.id}`
                })
            }
        },
        editProject(item) {
            console.log("修改项目", item)
        }
    }
})