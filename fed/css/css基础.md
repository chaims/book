# css

## 基础

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

### background
background + svg
```
background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='150' width='300'><text style='transform: rotate(30deg);opacity: 0.5;' x='150' y='0' fill='#ccc' font-size='12'>无数据</text></svg>");
```