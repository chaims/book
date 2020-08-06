### 对象
StaticCanvas                        // 静态画布，不能交互

### 常用属性
canvas.setZoom(2);                          // 设置画板缩放比例
canvas.isDrawingMode = true;                // 可以自由绘制
canvas.selectable = true/false;             // 控件能/不能被选择，不会被操作
canvas.selection = true/false;              // 打开/禁用组选择
canvas.skipTargetFind = true;               // 整个画板元素不能被选中
canvas.freeDrawingBrush.color = "#E34F51"   // 设置自由绘画笔的颜色
freeDrawingBrush.width                      // 自由绘笔触宽度

- uniScaleKey 默认是 `shiftKey`,按下时，对object 调整时，不固定比例
- selectionKey 设置能选择多个控件的按键，默认键 `shift key`
- altSelectionKey  默认`alt key` 当两个目标重合时,按此键调整层级
- preserveObjectStacking = true 才有效，功能？




### 方法
add(object)                     // 添加元素
insertAt(object,index)          // 添加元素到数组中某个索引位置
remove(object)                  // 移除
forEachObject                   // 循环遍历 
       
item(int)                       // 获取子项
isEmpty()                       // 判断是否空画板
size()                          // 画板元素个数
contains(object)                // 查询是否包含某个元素

setCursor()                     // 设置手势图标
getWidth().get('width')  
setWidth()
getHeight()
getScaleX().get('scale')
setColor(color)
rotate()                        
setCoords()                     //一些更新位置的操作动作，需要调用此方法，以便进行重新计算，set('left/width/height/scaleX/scaleX/skewX/skewY/padding/angle/strokeWidth...', 123)、setTop() 、center()、centerH()、centerV()、zoomToPoint()
rect.set({ left: 20, top: 50 });   // 更新rect位置
rect.set('fill', 'red');           // 更新填充色
rect.set({ strokeWidth: 5, stroke: 'rgba(100,200,200,0.5)' });  // 更新边框颜色及宽度
rect.set('angle', 15).set('flipY', true);     // 更新角度 及反转
rect.set('selectable', false);                // 设定rect不能被选中

zoomToPoint({x: , y: }, scale)     // 以某点为中心点，放大缩小

getObjects()                    // 获取所有对象  
getActiveObject()               // 获取选中的对象
getActiveObjects()              // 获取选中的多个对象
discardActiveObject()           // 取消当前选中对象 
setActiveObject(sel)            // 设置选中

canvas.renderAll();             // 重新渲染
requestRenderAll()              // 请求重新渲染
canvas.getCenter();             // 画布的中心点 top/left
clear()                         // 清空

toDatalessJSON()                // 画板信息序列化成最小的json
toJSON()                        // 画板信息序列化成json
JSON.stringfy(canvas);   
canvas.toObject();          
canvas.toDataURL('png');
canvas.toSvg();

loadFromJSON()
loadFromDatalessJSON()

fabric.util.cos
fabric.util.sin
fabric.util.drawDashedLine 绘制虚线
rendercanvas() 
moveTo(object,index) 移动?
dispose() 释放?
getSelectionContext()获取选中的context
getSelectionElement()获取选中的元素
isType() 图片的类型?

### 事件及扩展

// 通过url 加载图片，修改并添加到画布上
fabric.Image.fromURL('my_image.png', function(oImg) {
  // scale image down, and flip it, before adding it onto canvas
  oImg.scale(0.5).set('flipX, true);
  canvas.add(oImg);
});

// options 包含 event and target
canvas.on('...', function (options) {
    if (options.target) {
        console.log('an object was clicked', options.target.type);
    }
})

大多数 Fabric Object 继承自 fabric.Object，所以想共享公共的方法，可以直接把方法添加到 fabric.Object 原型上
fabric.Object.prototype.getAngleInRadians = function() {
  return this.get('angle') / 180 * Math.PI;
};

// 扩展 toObject 的 object
var rect = new fabric.Rect();
rect.toObject = (function(toObject) {
return function() {
    return fabric.util.object.extend(toObject.call(this), {
    name: this.name
    });
};
})(rect.toObject);
canvas.add(rect);
rect.name = 'trololo';
console.log(JSON.stringify(canvas));


canvas:
    mouse:up:before
    mouse:up           
    mouse:down:before
    mouse:down
    mouse:move:before
    mouse:move
    mouse:dblclick
    mouse:wheel
    mouse:over
    mouse:out

    drop         // 拖入放开后
    dragover     // 拖动经过
    dragenter    // 拖入
    dragleave    // 拖出

    after:render // 渲染完成

    object:moving
    object:moved
    object:modified

    object:scaling
    object:rotating
    object:skewing
    object:scaled
    object:rotated
    object:skewed

    before:transform
    before:selection:cleared
    selection:cleared
    selection:created
    selection:updated

    path:created
    object:added
    object:removed

Object:
    moving
    moved

    scaling
    rotating
    skewing
    scaled
    rotated
    skewed
    selected
    deseleted

    mouseup

    mousedown
    mousemove
    mouseup:before
    mousedown:before
    mousemove:before
    mousedblclick
    mousewheel
    mouseover
    mouseout

    drop
    dragover
    dragenter
    dragleave

    

### object
- __uid: 构造svg时，内部使用的唯一的id
- backgroundColor: 背景色
- angle: 旋转角度
- borderColor : 控制对象边界的颜色（当它处于活动状态时）
- borderDashArray： 指定对象边框的短划线模式的数组（hasBorder必须为true）
- borderOpacityWhenMoving：对象处于活动和移动状态时对象控制边界的不透明度
- borderScaleFactor： 控制边界的缩放比例
- cacheProperties：在检查缓存是否需要刷新时要考虑的属性列表，这些属性由statefullCache打开（如果需要，则为惰性模式）或从对Object.set（key，value）的单个调用中检查。如果键在此列表中，则对象被标记为脏，并在下次呈现时刷新
- centeredRotation： 如果为true，则该对象在通过控件旋转时将使用圆心作为变换的原点。向后不兼容注意：此属性替换“centerTransform”（布尔值）。
- centeredScaling：如果为true，则当通过控件缩放时，此对象将使用圆心作为变换的原点。向后不兼容注意：此属性替换“centerTransform”（布尔值）。


- hasControls: 是否有控制点
- cornerStyle： 控制点的类型：circle | rect
- cornerSize： 控制点大小
- cornerColor： 控制点颜色
- cornerStrokeColor： 控制点框颜色
- hasBorders： 是否有边框
- borderColor： 边框颜色
- hasRotatingPoint 是否有旋转点
- rotatingPointOffset： 旋转控制点距object的距离
- visible： 画布上是否可见
- selectable： 是否可被选中
- evented: 事件是否可用
- transparentCorners： true，则对象的控制角在内部呈现为透明（即笔划而不是填充）
- centeredScaling： 以中心为缩放
- centeredRotation: 以中心点旋转
- padding: object内边距
- strokeUniform: 宽度不变换

- setControlVisible 设置控制点是否可见


> 默认情况下，通过角点控件调整大小，会保持纵横比，（通过对canvas进行 uniScaleTransform 的设置，已废弃） 默认情况下，按shiftKey可实现自由调整

> rect 在通过控制角调整的情况下，会导致borderWidth变化，通过 `strokeUniform:true` 和 `noScaleCache:false` 去调整

> 两个object重合时，选取下层的操作？
#### rect

