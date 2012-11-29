(function ($) {
    var lib = {};

    lib. makeScrollable = function(wrapper, scrollable) {
        var wrapper = $(wrapper), scrollable = $(scrollable);
        lib.enable(wrapper, scrollable);
    };

    lib.enable = function(wrapper, scrollable) {
        var inactiveMargin = 100;
        var wrapperHeight = wrapper.height();
        var scrollableHeight = scrollable.outerHeight() + 2 * inactiveMargin - 50;
        var lastTarget;
        wrapper.mousemove(function (e) {
            lastTarget = e.target;
            var wrapperOffset = wrapper.offset();
            // Scroll menu
           // var top = (e.pageY - wrapperOffset.top) * (scrollableHeight - wrapperHeight) / wrapperHeight - inactiveMargin;
            var top = (e.pageY - wrapperOffset.top) * (scrollableHeight - wrapperHeight) / wrapperHeight - inactiveMargin;

            if (top < 0) {
                top = 0;
            }
            wrapper.scrollTop(top);
        });
        wrapper.mouseleave(function () {
            lastTarget = false;
        });
    };

    var methods = {
        init:function (options) {
            lib.makeScrollable(".box", ".content");
        }
    };

    $.fn.scroller = function (method) {
        if (methods[method]) {
            return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.tooltip');
        }
    };
})(jQuery);