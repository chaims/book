# html

## 基础


### Embed

加载PDF的一些属性： 
- nameddest = name
- page=pagenum
- comment=commentID
- collab=setting
- zoom= scale | scale,left,top
- view
    view=Fit
    view=FitH
    view=FitH,top
    view=FitV
    view=FitV,left
    view=FitB
    view=FitBH
    view=FitBH,top
    view=FitBV
    view=FitBV,left
- viewrect=left,top,wd,ht
- pagemode = bookmarks|thumbs|none
- scrollbar = 1|0
- search=wordList
- toolbar=1|0
- statusbar=1|0
- messages=1|0
- navpanes=1|0
  
examples:

```
http://xxx/doc.pdf#nameddest=Chapter6
http://xxx/doc.pdf#page=3
http://xxx/doc.pdf#page=3&&zoom=200,250,100
http://xxx/doc.pdf#page=3&&view=fitH,100
http://xxx/doc.pdf#pagemode=bookmarks&&page=2
http://xxx/doc.pdf#fdf=http://xxx/doc.pdf
```