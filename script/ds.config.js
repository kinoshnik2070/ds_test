(function () {

    "use strict";

    ds.config = {
        request: {
            mediaItems: "/api/mediaitems",
            mediaImageSmall: "/api/mediaitems/{{=it.id}}/thumbnail?size=small",
            mediaImageMedium: "/api/mediaitems/{{=it.id}}/thumbnail?size=medium",
            mediaImageLarge: "/api/mediaitems/{{=it.id}}/thumbnail?size=large"
        },
        requestDebug: {
            mediaItems: "/data/mediaitems.xml",
            mediaImageSmall: "/data/thumbnail_small.jpg",
            mediaImageMedium: "/data/thumbnail_medium.jpg",
            mediaImageLarge: "/data/thumbnail_large.jpg"
        },
        run: function () {
            var key;
            for (key in this.request) {
                this.request[key] = (ds.debugMode ? this.requestDebug[key] : this.request[key]);
            }
        }
    };

    ds.config.run();

}());