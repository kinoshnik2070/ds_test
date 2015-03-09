(function () {

    "use strict";

    ds.Page = function () {
        this.showInfiniteProgress = function () {
            $(".j-load").show();
        };
        this.hideInfiniteProgress = function () {
            $(".j-load").hide();
        };
    };

}());