/**
 * Author: Yuriy Nedostup, yuriy.nedostup@gmail.com.
 * Version: 1.0
 * Date: 10.07.14 12:34
 */
$(function () {
    $('.js-simple-popup').click(function (e) {
        e.preventDefault();
        var popup = new Popup();
        popup.loadContent('<div class="simple-popup span6 clearfix">' +
            '<h1>Simple Popup</h1>' +
            '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
            'Mauris ornare turpis nec tellus ultricies feugiat. ' +
            'Phasellus lorem metus, pulvinar sed ultricies id, pharetra a nunc. ' +
            'Pellentesque dolor leo, pretium in urna in, pretium posuere libero. ' +
            'Ut at consectetur tortor, vitae tincidunt ipsum. </p>' +
            '</div>');
        popup.showPopup();
        popup.alignCenter();
    });
});