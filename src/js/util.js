/*
 * Copyright 2014 Baidu Inc. All rights reserved.
 *
 * author:  mycoin (nqliujiangtao@gmail.com)
 * date:    2013/09/28
 * resp:    https://github.com/mycoin/SDK/
 */
define(function(require, exports) {
    'use strict';
    
    /**
     * 倒计时优化函数
     *
     * @public
     * @param {number} condition The condition to test.  Note that this may be used to
     * @return opt_message A message to use in any error.
     */
    exports.formatTime = function(t) {
        var d = Math.floor((t / 3600) / 24);
        var h = Math.floor((t / 3600) % 24);
        var m = Math.floor((t / 60) % 60);
        var s = Math.floor(t % 60);

        d = d < 10 ? '0' + d : d;
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        return d + '天' + h + '时' + m + '分' + s + '秒';
    };

    /**
     * encoding the target string from HTML
     *
     * @function
     * @param source {String} the target string
     * @return {string} safe source
     */
    exports.encode = function(source) {
        source = source.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
        return source;
    };

    return exports;
});