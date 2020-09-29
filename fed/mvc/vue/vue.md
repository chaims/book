# Vue

## 基础

## 进阶

### 双向绑定

了解vue的双向数据绑定原理

如何实现双向绑定

核心代码模块

主流的实现数据双向绑定的做法：
- 发布者-订阅者模式（backbone.js）
- 脏值检查（angular.js）
- 数据劫持（vue.js）


```  
vue.js 则是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

 1、实现一个数据监听器Observer，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者 
 2、实现一个指令解析器Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数 3、实现一个Watcher，作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图 4、mvvm入口函数，整合以上三者
```

```
function DataBinder (selector) {
    let pubSub = $({});
    let data_attr = `bind-${selector}`, 
        msg = `${selector}:change`;

    $(document).on('change', `[data-${data_attr}]`, (evt) => {
        let input = $(this);
        pubSub.trigger(msg, [input.data(data_attr), input.val()]);
    });

    pubSub.on(msg, (evt, prop_name, new_val) => {
        $(`[data-${data_attr}=${prop_name}]`).each(() => {
            let $bound = $(this);
            if ($bound.is('input, textarea, select')) {
                $bound.val(new_val)
            } else {
                $bound.html(new_val);
            }
        })
    });

}

function User(uid) {
    let binder = new DataBinder(uid),
        user = {
            attributes: {},
            set: function (attr_name, val) {
                this.attributes[attr_name] = val;
                binder.trigger(`${uid}:change`, [attr_name, val, this]);
            },
            get: function (attr_name) {
                return this.attributes[attr_name];
            },
            _binder: binder
        }
        binder. on(`${uid}:change`, ())
}

```
