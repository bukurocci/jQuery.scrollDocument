/*
 * jQuery ScrollDocument
 *
 * License: MIT license.
 * Copyright 2013 Naokazu Shimabukuro
 *
*/

;(function($, window, undefined) {

    var ScrollDocument = function() {
        this._init.apply(this, arguments);
    };

    ScrollDocument.defaultOptions = {
        duration: 500,
        easing: 'linear'
    };

    var proto = ScrollDocument.prototype;

    proto._init = function($el, options) {
        this.$element = $el;
        this._options = $.extend(true, {}, ScrollDocument.defaultOptions, options);

        this._setUp();
    };

    proto._setUp = function() {

        var elementName = this.$element.prop('tagName').toLowerCase();
        var href = "";

        if(elementName !== 'a') {
            return;
        }

        href = this.$element.attr('href')

        if(/^#[\w-]+$/.test(href)) {
            this.$element.on('click', $.proxy(this._handleScroll, this));
        }
    };

    proto._handleScroll = function(evt) {

        var href = this.$element.attr('href');

        var $target = $(href);
        var scrollTop = $target.offset().top;

        $('html, body').stop(true).animate({scrollTop:scrollTop}, this._options.duration, this._options.easing);

        evt.preventDefault();
        evt.stopPropagation();

    };


    $.fn.scrollDocument = function(options) {
        return this.each(function(index, element) {
            new ScrollDocument($(element), options);
        });
    };

})(jQuery, window);
