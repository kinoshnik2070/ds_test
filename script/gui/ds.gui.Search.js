(function () {

    "use strict";

    ds.gui.Search = function (options) {
        ds.Observer.apply(this, arguments);
        options = options || {};
        this._init = function () {
            this._container = $(".j-search");
            this._source = options.source || [];
            this._tags = [];
            this._autocomplete = new ds.gui.Autocomplete({
                container: this._container,
                source: options._source
            });
            this._template = {
                search: doT.template($("#search-template").html())
            };

            this._initEvents();
        };

        this.getLayout = function () {
            return this._container;
        };

        this._initEvents = function () {
            var self = this;
            this.getLayout().on("click", function () {
                $("input").focus();
            });
            $(".b-search__clear").on("click", function () {
                self._tags = [];
                self.renderTags();
                self.emit("search", self._tags);
            });
            this.getLayout().on("click", ".b-tag__close", function () {
                var index = self._tags.indexOf($(this).data("tag"));
                self._tags.splice(index, 1);
                self.renderTags();
                self.emit("search", self._tags);
            });
            this._autocomplete.on("select", function(tag) {
                if (self._tags.indexOf(tag) === -1) {
                    self._tags.push(tag);
                    self.renderTags();
                }
                self.emit("search", self._tags);
            });
        };



        this.renderTags = function () {
            this.getLayout().html(this._template.search({
                tags: this._tags
            }));
        };

        this.setTags = function (arr) {
            this._autocomplete._source = arr;
        };

        this._init();
        this.renderTags();
    };

}());