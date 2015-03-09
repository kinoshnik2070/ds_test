$(function () {

    "use strict";

    ds.page.Main = function () {
        ds.Page.apply(this, arguments);

        this._init = function () {
            this.itemStore = new ds.store.MediaItem();
            this.search = new ds.gui.Search();
            this.listItems = new ds.gui.ListMediaItems();
            this.detailsItem = new ds.gui.DetailsItem();
            this.itemStore.load();
            this.showInfiniteProgress();
            this._initEvents();
        };

        this._initEvents = function () {
            var self = this;
            this.itemStore.on("load", function (result) {
                self.hideInfiniteProgress();
                self.search.setTags(self.itemStore._keywords);
                self.listItems.render();
            });
            this.itemStore.on("errorLoad", function() {
                self.hideInfiniteProgress();
                ds.gui.alert("Ошибка загрузки")
            });
            this.listItems.on("selectitem", function(id) {
                var model = self.itemStore.get(id);
                self.detailsItem.render(model);
            });
            this.search.on("search", function(tags) {
                var store = self.itemStore.search(tags);
                self.listItems.render(store);
            });
        };

        this._init();
    };

    window.page = new ds.page.Main();
});