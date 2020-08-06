# protocol buffers

## 概念

### 历史
2001年初，Protobuf首先在Google内部创建， 我们把它称之为 proto1；
2008年7月7日，Protobuf2开始公布出来；
2016年，Proto3，目前Protobuf的稳定版本是3.9.2，于2019年9月23日发布；

### ProtocolBuffer
Protocol buffers 是一种语言中立，平台无关，可扩展的序列化数据的格式，可用于通信协议，数据存储等。
Protocol buffers 在序列化数据方面，它是灵活的，高效的。
比 XML 更加小巧，更加快速，更加简单。
一旦定义了要处理的数据的数据结构之后，就可以利用 Protocol buffers 的代码生成工具生成相关的代码。
使用 Protobuf 对数据结构进行一次描述，即可利用各种不同语言或从各种不同数据流中对你的结构化数据轻松读写。
Protocol buffers 很适合做数据存储或 RPC 数据交换格式。可用于通讯协议、数据存储等领域的语言无关、平台无关、可扩展的序列化结构数据格式。
Protobuf中最基本的数据单元是message，是类似Go语言中结构体的存在。在message中可以嵌套message或其它的基础数据类型的成员。

### 序列化
序列化(serialization、marshalling)的过程是指将数据结构或者对象的状态转换成可以存储(比如文件、内存)或者传输的格式(比如网络)。
反向操作就是反序列化(deserialization、unmarshalling)的过程。

### proto3
changelog
- 移除了原始值字段的出现逻辑。
- 移除了required字段
- 移除了缺省值
- 移除了unknown字段 （3.5中又加上了）
- 移除了扩展，使用Any代替
- 修复了未知的枚举值的语义
- 添加了map类型
- 添加了一些标准类似，比如time、动态数据的呈现
- 可以使用JSON编码代替二进制proto编码

### message

- 字段是以`[ "repeated" ] type fieldName "=" fieldNumber [ "[" fieldOptions "]" ] ";"`格式定义的
- 复杂的一些字段定义，比如Oneof、Map、Reserved、enum定义

```
syntax = "proto3";         // 指定版本
message SearchRequest {
  string query = 1;
  int32 page_number = 2;
  int32 result_per_page = 3;
}
```

执行`protoc -I=. -I/usr/local/include -I=$(GOPATH)/src --go_out=. simple.proto` 生成go代码

`protoc -I=$SRC_DIR --python_out=$DST_DIR $SRC_DIR/addressbook.proto`

### 格式

#### 版本定义

```
syntax = "proto3";
```

#### 引入其它proto文件

```
import  "other.proto";
import public "other2.proto";
import weak "other.proto";
```

#### package
定义proto的包名，包名可以避免对message 类型之间的名字冲突，同名的Message可以通过package进行区分

```
package foo.bar;
```

#### option
option可以用在proto的scope中，或者message、enum、service的定义中。可以是Protobuf定义的option，或者自定义的option。

option的定义格式是`"option" optionName "=" constant ";"`,比如:

```
option java_package = "com.example.foo";
```

一些Protobuf定义的option:
- java_package
- java_multiple_files
- java_outer_classname
- optimize_for
- cc_enable_arenas
- objc_class_prefix
- deprecated

```
option (gogoproto.testgen_all) = true;
option (gogoproto.populate_all) = true;
option (gogoproto.benchgen_all) = true;
message NidRepPackedNative {
	repeated double Field1 = 1 [(gogoproto.nullable) = false, packed = true];
	repeated float Field2 = 2 [(gogoproto.nullable) = false, packed = true];
	repeated int32 Field3 = 3 [(gogoproto.nullable) = false, packed = true];
}
```

#### 普通字段

其中类型可以是以下几种类型：
- 数字类型： double、float、int32、int64、uint32、uint64、sint32、sint64: 存储长度可变的浮点数、整数、无符号整数和有符号整数
- 存储固定大小的数字类型：fixed32、fixed64、sfixed32、sfixed64: 存储空间固定
- 布尔类型: bool
- 字符串: string
- bytes: 字节数组
- messageType: 消息类型
- enumType:枚举类型

字段名、消息名、枚举类型名、map名、服务名等名称首字母必须是字母类型，然后可以是字母、数字或者下划线_。

```
message AllNormalTypes {
    double field1 = 1;
    float field2 = 2;
    int32 field3 = 3;
    int64 field4 = 4;
    sint32 field5 = 5;
    sint64 field6 = 6;
    uint32 field7 = 7;
    unit64 field8 = 8;
    fixed32 field9 = 9;
    fixed64 field10 = 10;
    sfixed32 field11 = 11;
    sfixed64 field12 = 12;
    bool field13 = 13;
    string field14 = 14;
    bytes field15 = 15;
}
```

默认值：

- 对于string，默认是一个空string
- 对于bytes，默认是一个空的bytes
- 对于bool，默认是false
- 对于数值类型，默认是0
- 对于枚举，默认是第一个定义的枚举值，必须为0;
- 对于消息类型（message），域没有被设置，确切的消息是根据语言确定的，详见generated code guide


**Oneof**
如果你有一组字段，同时最多允许这一组中的一个字段出现，就可以使用Oneof定义这一组字段，Oneof允许你设置零各值。
Oneof有判断字段是否设置的功能。

> proto3没有办法区分正常的值是否是设置了还是取得缺省值(比如int64类型字段，如果它的值是0，可能是数据中设置的值，也可能是这个字段的零值)，可以通过Oneof取得这个功能

```
syntax = "proto3";
package abc;
message OneofMessage {
    oneof test_oneof {
        string name = 4;
        int64 value = 9;
    }
}
```

**map类型**
map类型需要设置键和值的类型，格式是`"map" "<" keyType "," type ">" mapName "=" fieldNumber [ "[" fieldOptions "]"`。

```
map<int64,string> values = 1;
```

> map字段不能同时使用repeated。

**Reserved**
Reserved可以用来指明此message不使用某些字段，也就是忽略这些字段。可以通过字段编号范围或者字段名称指定保留的字段：

```
syntax = "proto3";
package abc;
message AllNormalTypes {
  reserved 2, 4 to 6;
  reserved "field14", "field11";
  double field1 = 1;
  // float field2 = 2;
  int32 field3 = 3;
  // int64 field4 = 4;
  // uint32 field5 = 5;
  // uint64 field6 = 6;
  sint32 field7 = 7;
  sint64 field8 = 8;
  fixed32 field9 = 9;
  fixed64 field10 = 10;
  // sfixed32 field11 = 11;
  sfixed64 field12 = 12;
  bool field13 = 13;
  // string field14 = 14;
  bytes field15 = 15;
}
```

**枚举类型**
- 枚举类型也是常用的一种类型，它限定字段的值只能取某个特定的值；
- 枚举值是枚举类型的兄弟类型，而不是子类型
- 枚举的常量必须是一个32比特的整数，从效率的角度考虑，不推荐采用负数。
- 第一个枚举值必须是0，而且必须定义。

```
enum EnumAllowingAlias {
  option allow_alias = true;   // 允许字段编号重复,RUNNING是STARTED的别名
  UNKNOWN = 0;
  STARTED = 1;
  RUNNING = 1;
}
enum EnumNotAllowingAlias {
  UNKNOWN2 = 0;
  STARTED2 = 1;
  // RUNNING = 1; 
}
```

```
message SearchRequest {
  string query = 1;
  int32 page_number = 2;
  int32 result_per_page = 3;
  enum Corpus {
    UNIVERSAL = 0;
    WEB = 1;
    IMAGES = 2;
    LOCAL = 3;
    NEWS = 4;
    PRODUCTS = 5;
    VIDEO = 6;
  }
  Corpus corpus = 4;
}
```

**使用其它类型**
类型可以是消息类型和枚举类型，枚举类型如上所示，而消息类型如下所示：

```
message SearchResponse {
  repeated Result results = 1;
}
message Result {
  string url = 1;
  string title = 2;
  repeated string snippets = 3;
}
```

**嵌套类型**
嵌套类型就是消息类型里面定义了消息类型：

```
message SearchResponse {
  message Result {
    string url = 1;
    string title = 2;
    repeated string snippets = 3;
  }
  repeated Result results = 1;
}

message SomeOtherMessage {
  SearchResponse.Result result = 1;
}
```

**未知类型**
proto3最开始对于不能识别的数据就丢弃掉了，但是自3.5 版本后重新引入了未知字段，以匹配proto2的行为。

**Any**
一个Any以bytes呈现序列化的消息，并且包含一个URL作为这个类型的唯一标识和元数据。
为了使用Any类型，你需要引入google/protobuf/any.proto。

```
import "google/protobuf/any.proto";
message ErrorStatus {
  string message = 1;
  repeated google.protobuf.Any details = 2;
}
```

**更新消息类型**
- 不要改变已有字段的字段编号
- 当你增加一个新的字段的时候，老系统序列化后的数据依然可以被你的新的格式所解析，只不过你需要处理新加字段的缺省值。 老系统也能解析你信息的值，新加字段只不过被丢弃了
- 字段也可以被移除，但是建议你Reserved这个字段，避免将来会使用这个字段
- int32, uint32, int64, uint64 和 bool类型都是兼容的
- sint32 和 sint64兼容，但是不和其它整数类型兼容
- string 和 bytes兼容，如果 bytes 是合法的UTF-8 bytes的话
- 嵌入类型和bytes兼容，如果bytes包含一个消息的编码版本的话
- fixed32和sfixed32, fixed64和sfixed64 enum和int32, uint32, int64, uint64格式兼容
- 把单一一个值改变成一个新的oneof类型的一个成员是安全和二进制兼容的。把一组字段变成一个新的oneof字段也是安全的，如果你确保这一组字段最多只会设置一个。把一个字段移动到一个已存在的oneof字段是不安全的

如果没有Any类型，序列化后的数据是没有类型的元数据信息的。这也意味着序列化的包和序列化后的包可以不一样，只要保证数据格式的定义兼容即可。

```
syntax = "proto3";
option go_package = "main";

message Person {
    string name = 1;
    int32 id = 2;
    repeated string email = 3;

}
```
=>
```
p := Person {
    Name: "test",
    Id: 1212,
    Email: []string{'test@emain.com'}
}
```

#### 命名规则
- message 采用驼峰命名法。message 首字母大写开头。字段名采用下划线分隔法命名。
- 枚举类型采用驼峰命名法。枚举类型首字母大写开头。每个枚举值全部大写，并且采用下划线分隔法命名。
- 每个枚举值用分号结束，不是逗号。服务名和方法名都采用驼峰命名法。并且首字母都大写开头。