(function () {

    "use strict";

    ds.gui.DetailsItem = function () {
        this._templates = {
            details: doT.template($("#details-item").html())
        };
        this._container = $("<div style=\"width:100%;height:100%;position:absolute;top:0px;left:0px;bottom:0px;right:0px;\"></div>");
        $(".j-page").append(this._container);
        this.render = function(data) {
            data = data || {};
            $(document.body).addClass("g-fixed_over_screen");
            this.getLayout().append(this._templates.details(data));
            this.getLayout().show();
            this.center();
        };
        this.getLayout = function() {
            return this._container;
        }
        this.getLayout().on("mousewheel", function() {
            return false;
        });
        var self = this;
        this.getLayout().on("click", "a", function() {
            self.hide();
        });
        this.center = function() {
            var self = this;
            if(!this.getLayout().find("img").get(0).complete) {
                this.getLayout().find("img").load(function() {
                    self.center();
                });
                return;
            }
            var popup = this.getLayout().find(".j-details_popup");
            popup.css( {left: ($(document.body).width() / 2) - (popup.width() / 2)});
            if(popup.height() > window.innerHeight) {
                var height = 0;
            } else {
                var height = (Math.abs(popup.height() - window.innerHeight)) / 2;
            }
            popup.css( {top: height + $(document.body).scrollTop()});
        };
        this.hide = function() {
            $(document.body).removeClass("g-fixed_over_screen");
            this.getLayout().hide();
            this.getLayout().html("");
        };
        this.hide();
    };

}());