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

selectionKey                                // 设置能选择多个控件的按键，默认键 ‘shift key’
altSelectionKey                             // 在preserveObjectStacking = true 才有效，功能？




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