# code 

## 应用

### 网页另存为

```
function export_raw(name, data) {
    var urlObject = window.URL || window.webkitURL || window;
    var export_blob = new Blob([data]);
    var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
    save_link.href = urlObject.createObjectURL(export_blob);
    save_link.download = name;
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent(
        "click", true, false, window, 0, 0, 0, 0, 0
        , false, false, false, false, 0, null
        );
    save_link.dispatchEvent(ev);
}
$('a').click(function() {
    var tpl = `<style>
    .test-1{color: red;}
</style>
<div>
    <div>
        <li class="test-1">1</li>
        <li style="color:blue;">1</li>
        <li style="color: #ccc">1</li>
    </div>
</div>`;
    export_raw('test.html', tpl);
});
```



