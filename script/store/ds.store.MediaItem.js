(function () {

    "use strict";

    ds.store.MediaItem = function (options) {

        ds.Observer.apply(this, arguments);
        options = options || {};
        this._data = [];
        this._keywords = {};

        this.load = function () {
            var self = this;
            return $.ajax({
                url: ds.config.request.mediaItems,
                dataType: "xml",
                type: "GET",
                data: {
                    savedSearchesId: -1,
                    offset: 0,
                    limit: 999999
                },
                success: function (result) {
                    self._parse(result);
                    self._initKeywords();
                    self.emit("load", self._data);
                },
                error: function() {
                    self.emit("errorLoad");
                }
            });
        };

        this._parse = function (result) {
            var mediItems = result.getElementsByTagName("mediaItem"),
                item,
                obj = {},
                i,
                j,
                tagValues,
                tmplImageSmallUrl = doT.template(ds.config.request.mediaImageSmall),
                tmplImageMediumUrl = doT.template(ds.config.request.mediaImageMedium),
                tmplImageLargeUrl = doT.template(ds.config.request.mediaImageLarge);
            for (i = 0; i < mediItems.length; i++) {
                item = mediItems[i];
                obj = {};
                obj.id = parseInt(item.getAttribute("id"), 10);
                obj.uri = item.getAttribute("uri");
                obj.urlImageSmall = tmplImageSmallUrl(obj);
                obj.urlImageMedium = tmplImageMediumUrl(obj);
                obj.urlImageLarge = tmplImageLargeUrl(obj);
                tagValues = item.getElementsByTagName("tagValue");
                for (j = 0; j < tagValues.length; j++) {
                    obj[tagValues[j].getAttribute("name")] = tagValues[j].getAttribute("formattedValue");
                }
                this._data.push(obj);
            }
        };

        this.get = function(id) {
            var i;
            for(i = 0; i < this._data.length; i++) {
                if(id === this._data[i].id) {
                    return this._data[i];
                }
            }
            return false;
        };

        this._initKeywords = function() {
            var i,
                search = {};
            for(i = 0; i < this._data.length; i++) {
                if(this._data[i]["Keywords"]) {
                    var keywords = this._data[i]["Keywords"].split(",");
                    for(var j = 0; j < keywords.length; j++) {
                        if(!this._keywords[keywords[j].trim()]) {
                            this._keywords[keywords[j].trim()] = [];
                        }
                        this._keywords[keywords[j].trim()].push(this._data[i]["id"]);
                    }
                }
            }
        };

        this.search = function(tags) {
            if(!tags || tags.length === 0) {
                return [];
            }
            var result = [];
            for(var i = 0; i < tags.length; i++) {
                result = result.concat(this._keywords[tags[i]]);
            }
            var r = []
            for(var j = 0; j < result.length; j++) {
                var id = result[j]; 
                if(!id) {
                    continue;
                }
                var arr = result.filter(function(value) {
                    if(value === id) {
                        result[j] = false;
                        return value;
                    }
                });
                if(arr.length === tags.length) {
                    r.push(this.get(id));
                }
            }
            return r;
        }
    };

}());