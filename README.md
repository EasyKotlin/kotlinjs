# kotlinjs
kotlinjs 示例

《Kotlin 程序设计》第十二章 Kotlin进阶之混合JavaScript开发
===



>一切皆是映射。

我们知道，JavaScript是动态类型的语言，这意味着它不会在编译期检查类型。而相对来说，Kotlin和Java都是静态类型的。

Kotlin1.1版本加入了对JavaScript的支持，也就是说我们可以Kotlin进行网页开发，并且Kotlin也支持与JavaScript的相互操作。

但是，Kotlin对于JavaScript的支持，更多的只是将Kotlin等价转换成JavaScript以达到支持的功能，然后做一些函数的封装工作。kotlinc-js编译器做的工作大致是：词法分析、语法分析、语义分析、转成JS代码，然后通过JavaScript引擎执行。


# Kotlin 之JavaScript HelloWorld！

下面我们介绍一下使用Kotlin进行JavaScript代码的开发。

首先，新建Kotlin（JavaScript）工程：

![](http://upload-images.jianshu.io/upload_images/1233356-c41f04ce56fa0177.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

你将得到一个如下 的工程：

```
.
├── build
│   └── kotlin-build
│       └── caches
│           └── version.txt
├── build.gradle
├── settings.gradle
└── src
    ├── main
    │   ├── java
    │   ├── kotlin
    │   └── resources
    └── test
        ├── java
        ├── kotlin
        └── resources

12 directories, 3 files

```

其中，build.gradle配置文件内容如下

```
group 'com.easy.kotlin'
version '1.0-SNAPSHOT'

buildscript {
    ext.kotlin_version = '1.1.1'

    repositories {
        mavenCentral()
    }
    dependencies {
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
    }
}

apply plugin: 'java'
apply plugin: 'kotlin2js'

sourceCompatibility = 1.8

repositories {
    mavenCentral()
}

dependencies {
    compile "org.jetbrains.kotlin:kotlin-stdlib-js:$kotlin_version"
    testCompile group: 'junit', name: 'junit', version: '4.12'
}

```

我们可以看出两个核心的配置：

- apply plugin: 'kotlin2js'
- kotlin-stdlib-js

kotlin2js会把我们写好的Kotlin代码编译转换成js代码。关于转换的规则和输出文件目录配置如下：

```
build.doLast {
    configurations.compile.each { File file ->
        copy {
            includeEmptyDirs = false

            from zipTree(file.absolutePath)
            into "${projectDir}/web"
            include { fileTreeElement ->
                def path = fileTreeElement.path
                path.endsWith(".js") && (path.startsWith("META-INF/resources/") || !path.startsWith("META-INF/"))
            }
        }
    }
}

compileKotlin2Js {
    kotlinOptions.outputFile = "${projectDir}/web/output.js"
    kotlinOptions.moduleKind = "amd" // AMD规范
    kotlinOptions.sourceMap = true
}
```
其中，`kotlinOptions.moduleKind = "amd" `, moduleKind支持的选项有

>plain (default)
amd
commonjs
umd

关于moduleKind更多介绍，可以参考[6].

新建KotlinJS.kt，编写代码如下

```kotlin
package com.easy.kotlin

import org.w3c.dom.Element
import kotlin.browser.document
import kotlin.js.Date

/**
 * Created by jack on 2017/5/29.
 */
fun main(args: Array<String>) {
    val msg = "Hello World!"
    println(msg)
    js("console.log(msg)")
    js("alert(msg)")
    js("alert('KotlinJS:'+new Date())")
    js("sayTime()")
    val emailElement = getEmail()
    println(emailElement?.getAttribute("value"))
}

fun getEmail(): Element? {
    return document.getElementById("email")
}

fun sayTime() {
    println(Date())
}

fun max(a: Int, b: Int): Int {
    return if (a > b) a else b
}

fun min(a: Int, b: Int): Int {
    return if (a < b) a else b
}

fun substring(src: String, start: Int, end: Int): String {
    return src.substring(start, end)
}

fun trim(src: String): String {
    return src.trim()
}


```
执行gradle build，我们将得到一个构建后的工程，目录如下：
```
.
├── build
│   └── kotlin-build
│       └── caches
│           └── version.txt
├── build.gradle
├── htmls
│   ├── kotlinjs.html
│   ├── main.js
│   └── require.js
├── settings.gradle
├── src
│   ├── main
│   │   ├── java
│   │   ├── kotlin
│   │   │   └── com
│   │   │       └── easy
│   │   │           └── kotlin
│   │   │               └── KotlinJS.kt
│   │   └── resources
│   └── test
│       ├── java
│       ├── kotlin
│       └── resources
└── web
    ├── kotlin.js
    ├── kotlin.meta.js
    ├── output
    │   └── com
    │       └── easy
    │           └── kotlin
    │               └── kotlin.kjsm
    ├── output.js
    └── output.meta.js

21 directories, 12 files

```




可以看出，当Kotlin编译器进行编译转换成了JavaScript，主要输出了两个文件:

- kotlin.js: Kotlin支持JavaScript运行时的标准库。它在应用程序之间都是一样的，可想而知，这是为了让Kotlin支持JavaScript而做的封装库。

- output.js： Kotlin代码转成JavaScript的等价代码。其中，output.js就是我们的KotlinJS.kt转换之后的js代码。这个代码如下：

```
define('output', ['exports', 'kotlin'], function (_, Kotlin) {
  'use strict';
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  function main(args) {
    var msg = 'Hello World!';
    println(msg);
    console.log(msg);
    alert(msg);
    alert('KotlinJS:' + new Date());
    sayTime();
    var emailElement = getEmail();
    println(emailElement != null ? emailElement.getAttribute('value') : null);
  }
  function getEmail() {
    return document.getElementById('email');
  }
  function sayTime() {
    println(new Date());
  }
  function max(a, b) {
    return a > b ? a : b;
  }
  function min(a, b) {
    return a < b ? a : b;
  }
  function substring(src, start, end) {
    return src.substring(start, end);
  }
  function trim(src) {
    var tmp$;
    return Kotlin.kotlin.text.trim_gw00vp$(Kotlin.isCharSequence(tmp$ = src) ? tmp$ : Kotlin.throwCCE()).toString();
  }
  var package$com = _.com || (_.com = {});
  var package$easy = package$com.easy || (package$com.easy = {});
  var package$kotlin = package$easy.kotlin || (package$easy.kotlin = {});
  package$kotlin.main_kand9s$ = main;
  package$kotlin.getEmail = getEmail;
  package$kotlin.sayTime = sayTime;
  package$kotlin.max_vux9f0$ = max;
  package$kotlin.min_vux9f0$ = min;
  package$kotlin.substring_3m52m6$ = substring;
  package$kotlin.trim_61zpoe$ = trim;
  Kotlin.defineModule('output', _);
  main([]);
  return _;
});

//@ sourceMappingURL=output.js.map

```


output.js的前置依赖是kotlin.js。

我们使用requirejs来管理js模块。kotlinjs.html代码如下：

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>KotlinJS</title>
    <!-- data-main attribute tells require.js to load
             scripts/main.js after require.js loads. -->
    <script data-main="main" src="require.js"></script>
</head>
<body>
Email: <input type="text" name="email" id="email" value="universsky@163.com"/>
</body>
</html>

```

其中，main.js代码如下：

```
requirejs.config({
    paths: {
        kotlin: '../web/kotlin',
        output: '../web/output'
    }
});

requirejs(["kotlin","output"], function (Kotlin,output) {
    console.log(JSON.stringify(output))
});

```
直接浏览器打开kotlinjs.html，我们可以在console看到输出：

```
Hello World!
Tue May 30 2017 01:17:48 GMT+0800 (CST)
universsky@163.com
{"com":{"easy":{"kotlin":{}}}}
```


##Kotlin-JS编译器转换过程


在Kotlin-JavaScript模式中，Kotlinc(编译器)只是进行了转换JS的操作，然后与标准库kotlin.js、项目中JS文件一起再通过JavaScript引擎执行。


Kotlin编译器会将原生的Kotlin代码转换成相应的JavaScript代码，并且对于原先Kotlin中定义的函数名和变量都不会改变，这样我们可以在JavaScript中调用经过Kotlin编译器转换后的JavaScript代码。

但是在Kotlin-JS编译器转换的这个过程，由于Kotlin类型系统与JavaScript类型系统无法完全一一对应上，所以在转换过程中，也会有些问题。

JavaScript中有以下几种数据类型：

>number
boolean
string
object
array
undefined
null

而Kotlin中，有以下类型：

>Int
Byte
Short
Long
Double
Float
Boolean
Char
String
Any
Array
List
Set
Map
…

显然，Kotlin拥有更复杂的数据类型。Kotlin编译器如何将Kotlin类型映射到JavaScript类型呢？如下：

>Kotlin中Int/Byte/Short/Float/Double 映射JavaScript的number
Kotlin中String映射JavaScript中string
Kotlin中Any映射Javas中Object
Kotlin中Array映射JavaScript中Array
Kotlin中Long不映射JavaScript中任何类型
Kotlin集合（List/Set/Map等）不映射JavaScript中类型类型

比如说，转换Kotlin的Long类型，由于JavaScript中没有64位整数，导致Kotlin中的Long类型没有映射到任何JavaScript对象，在实际转换过程中，是用Int类型来处理的。

同理，Kotlin中的集合也没有映射到JavaScript任何特定的类型。Kotlin为了不对语言做任何的改变，仅仅是将Long和集合当成了一个模拟。

Kotlin能够同时支持Java和JavaScript，愿景是美好的。但是就目前来说，Kotlin对于JavaScript的支持，不如Java那么丝般润滑。局限性和互操作上都显得有点“羞涩”。对于反射等功能，目前也尚不支持。KotlinJS未来有较大发展提升空间。




参考资料
====

1.https://kotlinlang.org/docs/tutorials/javascript/getting-started-gradle/getting-started-with-gradle.html

2.https://kotlinlang.org/docs/tutorials/javascript/working-with-modules/working-with-modules.html#using-amd

3.http://www.indiepig.com/blog/kotlin-hello-js.php

4.http://shinelw.com/2017/03/30/kotlin-new-features-for-javascript-support/?utm_source=tuicool&utm_medium=referral

5.http://kotlinlang.org/docs/tutorials/javascript/working-with-javascript.html#interacting-with-the-dom

6.https://kotlinlang.org/docs/tutorials/javascript/working-with-modules/working-with-modules.html
