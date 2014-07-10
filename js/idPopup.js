/**
 * Author: Yuriy Nedostup, yuriy.nedostup@gmail.com.
 * Version: 1.0
 * Date: 10.07.14 12:34
 */
$(function () {
    $('.js-id-popup').click(function (e) {
        e.preventDefault();
        var popup = new Popup();

        popup.addCallback('onContentLoad', function() { console.log('onContentLoad trigger toggled');});
        popup.addCallback('onShow',        function() { console.log('onShow trigger toggled');});
        popup.addCallback('beforeHide',    function() { console.log('beforeHide trigger toggled');});
        popup.addCallback('onHide',        function() { console.log('onHide trigger toggled');});

        popup.showById('js-popup-id');
    });
});