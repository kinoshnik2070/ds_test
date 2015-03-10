(function () {

    "use strict";

    ds.gui.ListMediaItems = function () {
        ds.Observer.apply(this, arguments);

        this._init = function () {
            this._container = $(".j-list_media_item");
            this._templates = {
                item: doT.template($("#list-media-items").html()),
                imageSmall: doT.template(ds.config.request.mediaImageSmall)
            };
            this._pagination = {
                current: 0,
                count: 0,
                maxItem: 12
            };
            this._initEvents();
            this.clsDisabledControl = "b-control_disabled";
            this._result = [];
        };

        this._initEvents = function () {
            var self = this;

            this.getLayout().on("click", ".b-nex_page", function () {
                if (!$(this).hasClass(self.clsDisabledControl)) {
                    self._pagination.current++;
                    self.render(this._result);
                }
            });

            this.getLayout().on("click", ".b-prev-page", function () {
                if (!$(this).hasClass(self.clsDisabledControl)) {
                    self._pagination.current--;
                    self.render(this._result);
                }
            });

            this.getLayout().on("click", ".b-list_item__container li", function () {
                self.emit("selectitem", $(this).data("item_id"));
            });
        };

        this.render = function (data) {
            var result = [],
                start = this._pagination.current * this._pagination.maxItem,
                i;

            if (data) {
                this._result = data;
            } else {
                data = this._result;
            }
            this._pagination.count = parseInt(data.length / this._pagination.maxItem, 10);
            for (i = start; i < start + this._pagination.maxItem && i < data.length; i++) {
                result.push(data[i]);
            }
            this.getLayout().html(this._templates.item({
                result: result,
                pagination: this._pagination,
                itemLength: data.length,
                imageTemplate: this._templates.imageSmall
            }));
        };

        this.reset = function () {
            this._pagination.current = 0;
        };

        this.getLayout = function () {
            return this._container;
        };

        this._init();

    };

}());