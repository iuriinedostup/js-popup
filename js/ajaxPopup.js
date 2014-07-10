/**
 * Author: Yuriy Nedostup, yuriy.nedostup@gmail.com.
 * Version: 1.0
 * Date: 10.07.14 12:34
 */
$(function () {
    $('.js-ajax-popup').click(function (e) {
        e.preventDefault();
        var popup = new Popup();
        popup.showByUrl('ajax.php', 'post', {'name': 'John Doe'});
    });
});