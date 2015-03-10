(function () {

    "use strict";

    ds.gui.DetailsItem = function () {

        this._init = function () {
            this._templates = {
                details: doT.template($("#details-item").html()),
                imageLarge: doT.template(ds.config.request.mediaImageLarge)
            };
            this._container = $("<div class=\"b-popup_container\"></div>");
            $(".j-page").append(this._container);
            this._initEvents();
            this.hide();
        };

        this._initEvents = function () {
            var self = this;
            this.getLayout().on("mousewheel", function () {
                return false;
            });
            this.getLayout().on("click", "a", function () {
                self.hide();
            });
        };

        this.render = function (data) {
            data = data || {};
            $(document.body).addClass("g-fixed_over_screen");
            this.getLayout().html(this._templates.details({
                item: data,
                imageUrl: this._templates.imageLarge(data)
            }));
            this.getLayout().show();
            this.center();
        };

        this.getLayout = function () {
            return this._container;
        };

        this.center = function () {
            var self = this,
                popup,
                height;

            if (!this.getLayout().find("img").get(0).complete) {
                this.getLayout().find("img").load(function () {
                    self.center();
                });
                return;
            }
            popup = this.getLayout().find(".j-details_popup");
            popup.css({
                left: ($(document.body).width() / 2) - (popup.width() / 2)
            });
            if (popup.height() > window.innerHeight) {
                height = 0;
            } else {
                height = (Math.abs(popup.height() - window.innerHeight)) / 2;
            }
            popup.css({
                top: height + $(document.body).scrollTop()
            });
        };

        this.hide = function () {
            $(document.body).removeClass("g-fixed_over_screen");
            this.getLayout().hide();
            this.getLayout().html("");
        };

        this._init();
    };

}());