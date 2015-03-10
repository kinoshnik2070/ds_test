(function (w) {

    "use strict";

    w.ds = {
        debugMode: true
    };
    w.ds.gui = {
        alert: function (message) {
            window.alert(message);
        }
    };
    w.ds.store = {};
    w.ds.util = {};
    w.ds.page = {};
}(window));