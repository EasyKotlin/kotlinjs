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
