/*Copyright 2014 Baidu Inc. All rights reserved.*/
define(function(require,a){"use strict";return a.formatTime=function(a){var b=Math.floor(a/3600/24),c=Math.floor(a/3600%24),d=Math.floor(a/60%60),e=Math.floor(a%60);return b=10>b?"0"+b:b,c=10>c?"0"+c:c,d=10>d?"0"+d:d,e=10>e?"0"+e:e,b+"天"+c+"时"+d+"分"+e+"秒"},a.encode=function(a){return a=a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")},a});
/*last modify: 2014-08-15 06:57:27 */