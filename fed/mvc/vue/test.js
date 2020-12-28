let obj = { name: 'kidding'};

let observe = (data) => {
    if (!data || typeof data !== "object") {
        return ;
    }
    Object.keys(data).forEach((key) => {
        defineReactive(data, key, data[key])
    })
}
let defineReactive = (data, key, val) => {
    observe(val);
    let dep = new Dep();
    Object.defineProperties(data, key, {
        enumerable: true,
        configurable: false,
        get: function () {
            return val;
        },
        set: function(newVal) {
            val = newVal
        }
    })
}
observe(obj);


class Dep {
    constructor () {
        this.subs = []
    }
    addSub (params) {
        this.subs.push(params)
    }
    notify () {
        this.subs.forEach((sub) => {
            sub.update();
        })
    }
}