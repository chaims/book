# css

## 基础

### rem
相对于html根元素font-size的值，默认为16px，一般设置为10px(62.5%)方便计算

## 妙用

### display 
- grid
`display:flex`中，用`space-between`会导致最后一行排列分开的现象，通过`grid`可以解决：
```
.wrapper{
    display: grid;
    justify-content: space-between;
    grid-template-columns: repeat(auto-fill, 312px);
    grid-gap: 10px;
}
```
> 设置了高度的话，行会平分高度。

### box-sizing
- border-box: 边框和内边距的值是包含在width内
- content-box: 不包含在width/height中
### background
background + svg
```
background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='150' width='300'><text style='transform: rotate(30deg);opacity: 0.5;' x='150' y='0' fill='#ccc' font-size='12'>无数据</text></svg>");
```

## 方法论

### OOCSS
Object oriented Css 面向对象CSS
- 作用： 在页面中识别，创建和模块化可重用的对象，并在页面中任何需要的地方重用，并扩展其附加功能。
- 两个原则：独立的结构和样式和独立的容器和内容
- 优点： 样式更具有重用性；样式变得更小；可扩展的标记和CSS样式；容易改变一个网站的设计
- 缺点： 适合可重用性组件特别的多；没用巧妙的使用，成为一烂摊子，带来维护的噩梦；每一个组件需要备写一份说明文档；
- 实施
  - 找出所有可重用的组件，并给这个组件创建HTML和CSS样式规则  
  - 独立的容器和内容，并且避免样式来依赖位置
  - 使用类名来扩展基础对象，OOCSS主张是通过在基础组件中添加更多的类，从而扩展基础组件的CSS规则
  - 坚持以语义来定义类的名称
- 范例：Bootstrap

```
<button class="btn btn-small btn-primary"></button>
```

### SMACSS
(scalable modular architecture css) 可扩展模块化CSS
规则：
- Base（基础）：只包含基本元素选择器或者那些伪类选择器，不应包含类选择器或者 ID 选择器。
- Layout（布局）：顶部的布局。
  - 主要的layout使用ID selectors
  - 次要的layout使用class selectors
  - 會加上”l-”的前綴字
- Modules（模块）： 描述页面的区块。
  - 通常只用class來命名，不要使用ID selectors或tag
- State（状态）：描述元素的状态。
  - 可以使用JavaScript來改變樣式
  - 可以合理的使用!important，因為永遠只會有其中一種狀態存在
  - 加上”is-”的前綴字
- Theme（主题）：定义了颜色、形状、边框、阴影还有其他等等，定义了一组最终外观的样式，唯一的颜色方案。

> 避免在`Base`、`Layout`中使用 !important
> 最小化适配深度

### BEM
Block，Element，Modifier:
  - Block: 页面中独立存在的区块。
  - Element: 描述Block或Element的属性或状态，元素是块的一部分。
  - Modifier: 是描述Block或Element的属性或状态。同一Block或Element可以有多个Modifier。
  - 范例： `element ui`

#### 统一数据域 
把页面拆成块，例如：Head，Main Layout和Foot块。Head由Logo，Search，Auth块和Menu组成。MainLayout包括一个Page Title和一个Text块。
#### 描述页面和模板的意义
块和元素按一定的顺序构成了页面的内容，每一个块和元素都应该有一个可以识别的关键字，块的名字（block name），对象结构的模型叫BEM树
#### 独立的CSS
- 一个块（或者一个元素）必须有一个唯一的“名字”（一个CSS类）这样才能被CSS规则所作用。
- HTML元素不能用作CSS选择器（如.menu td）因为这样的选择器并非是完全上下文无关的。
- 避免使用级联（cascading）选择器（译注：如.menu .item）。

建议：
- 一个块的CSS类名就是这个块的名字。 如.menu;
- 一个元素的CSS类名是一个块名和一个元素名的组合，它们中间用一些符号隔开。如.menu__item
- 长名称中使用连字符分隔单词，使用两个下划线来分隔块名和元素名。如.block-name .block-name__el-name

#### 块修饰符
创建一个和已存在的块非常相似的块，只是外观或行为有些许改变，引入修饰符（modifier）的概念。


### CSS Modules / Scoped CSS

scoped 

### CSS in JS

styled-components

### AMCSS
Attribute Modules for CSS CSS的属性模块，在CSS加上属性值，通过css属性选择器来模块化CSS，减少全局名称空间。


## Question

### display: inline-block 间距的问题

`font-size: 0 `