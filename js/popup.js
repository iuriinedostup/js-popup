function mergeParams(arr1, arr2) {
    if (typeof  arr2 == 'undefined') {
        return arr1;
    }
    for (var i in arr1) {
        if (arr1.hasOwnProperty(i) && arr2.hasOwnProperty(i)) {
            if (typeof arr2[i] != 'undefined') {
                arr1[i] = arr2[i];
            }
        }
    }
    return arr1;
}

Popup = function Popup(options) {

    var defaults = {
        'overlay'       : 'popup-overlay',
        'popup'         : 'popup',
        'popup_content' : 'popup-content',
        'popup_close'   : 'popup-close'
    };

    this.params = mergeParams(defaults, options);

    this.callbacks = {
        'onAjaxFormSubmitSuccess'   : [],
        'onContentLoad'             : [],
        'onShow'                    : [],
        'beforeHide'                : [],
        'onHide'                    : []
    };

    this.popup          = $('.' + this.params.popup);
    this.popupContent   = this.popup.find('.' + this.params.popup_content);
    this.popupClose     = $('.' + this.params.popup_close);
    this.overlay        = $('#' + this.params.overlay);

    this.overlay.hide();
    this.popup.hide();
};

Popup.prototype.getPopupContent = function () {
    return this.popupContent;
};

Popup.prototype.showPopup = function () {
    var obj = this;
    this.overlay
        .width($(document).width())
        .height($(document).height())
        .click(function () {
            if (obj.popupClose.is(':visible')) {
                obj.closePopup();
            }
        });

    this.overlay.fadeTo('slow', 0.7);

    this.popup.show().css({'opacity': 0}).animate({'opacity': 1}, {
        duration: 500,
        complete: function () {
            if (typeof obj.callbacks['onShow'] != 'undefined') {
                for (var i in obj.callbacks['onShow']) {
                    obj.callbacks['onShow'][i]();
                }
            }
        }
    });

    this.popupClose.off('click').on('click', function () {
        obj.closePopup();
        return false;
    });
    this.setStyle();
    this.alignCenter();
    return this;
};

Popup.prototype.addCallback = function (type, callback) {
    if (typeof this.callbacks[type] != 'undefined') {
        if (typeof callback == 'function') {
            this.callbacks[type].push(callback);
        }
    }
}

Popup.prototype.removeCallback = function (type) {
    if (typeof this.callbacks[type] != 'undefined') {
        this.callbacks[type] = [];
    }
};

Popup.prototype.removeCallbacks = function () {
    if (typeof this.callbacks != 'undefined') {
        for (var i in this.callbacks) {
            this.removeCallback(i);
        }
    }
};

Popup.prototype.loadContent = function (content) {
    this.popupContent.html(content);
    if (typeof this.callbacks['onContentLoad'] != 'undefined') {
        for (var i in this.callbacks['onContentLoad']) {
            this.callbacks['onContentLoad'][i]();
        }
    }
    return this;
};

Popup.prototype.ajaxFormSubmitSuccess = function () {
    if (typeof this.callbacks['onAjaxFormSubmitSuccess'] != 'undefined') {
        for (var i in this.callbacks['onAjaxFormSubmitSuccess']) {
            this.callbacks['onAjaxFormSubmitSuccess'][i]();
        }
    }
    return this;
}

Popup.prototype.showByUrl = function (url, data) {
    if (typeof data == 'undefined') {
        data = {};
    }

    var obj = this;
    $.get(url, data, function (res) {
        if (res.result == true) {
            obj.loadContent(res.data);
            obj.showPopup();
        } else {
            obj.closePopup();
        }
    }, 'json');
};

Popup.prototype.showById = function (id) {
    if (typeof id == 'undefined') {
        return false;
    }

    var obj = this,
        content = $("#" + id).html();

    if (content) {
        obj.loadContent(content);
        obj.showPopup();
    } else {
        obj.closePopup();
    }
};

Popup.prototype.closePopup = function () {
    var obj = this,
        continueClose = true;
    if (typeof obj.callbacks['beforeHide'] != 'undefined') {
        for (var i in obj.callbacks['beforeHide']) {
            if (continueClose != false) {
                continueClose = obj.callbacks['beforeHide'][i]();
            }
        }
    }
    if (continueClose == false) {
        return;
    }
    this.overlay.animate({'opacity': 0}, 500, function () {
        obj.overlay.hide();
    });
    this.popup.animate({'opacity': 0}, 500, function () {
        $(this).hide();
        obj.popupContent.html('');
        if (typeof obj.callbacks['onHide'] != 'undefined') {
            for (var i in obj.callbacks['onHide']) {
                obj.callbacks['onHide'][i]();
            }
        }
    });
};

Popup.prototype.closeButton = function (enable) {
    enable != false
        ? this.popupClose.show()
        : this.popupClose.hide();
}

Popup.prototype.alignCenter = function () {
    var marginLeft = -this.popup.width() / 2 + 'px',
    //get margin top
        marginTop = -this.popup.height() / 2 + 'px';
    //return updated element
    this.popup.css({'margin-left': marginLeft, 'margin-top': marginTop});
};

Popup.prototype.setStyle = function () {
    this.popup.css({'position': 'fixed', 'top': '50%', 'left': '50%', 'marginLeft': 0, 'marginTop': 0});
};
