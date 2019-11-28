# ffmpeg

## fluent-ffmpeg

```
var ffmpeg = require('fluent-ffmpeg');
```

### ffmpeg.ffprobe
看音频视频文件信息并输出为json格式: `format`里面包含比特率，时长，文件大小等信息;`streams`包含视频音频信息详情，一般为两个stream值;
```
ffmpeg.ffprobe('dist/hl_00003_010.mp4',function(err, metadata) {
    console.log(metadata);
});
```
### change file
- `save`时可另存文件，改变源文件属性
- `inputFPS(25)`可改变帧速率
- `seek(10)`设置开始时间，从第10s开始保存
- `duration(10)`设置总时长
- `input( "work/music/Enya - One By One.mp3")`可合并音频
- `aspect("16:9")` 设置视频横纵比
- `withSize('1600x900')`设置视频宽高

```
withSize('1600x?').aspect('12:8').autoPad();  // 设置比例后，宽高值可以只设置一个值

var file1 = "1.mp4";
var file2 = "2.mp4";
var outPath = "out.mp4";
var proc = ffmpeg(file1).input(file2).mergeToFile(outPath); // 合并视频

var proc = ffmpeg('work/video/0000/frame%d.png').inputFPS(25).save('work/music/target.avi')； // 将图片按规则input到ffmpeg即可存成你所需要的格式
```

