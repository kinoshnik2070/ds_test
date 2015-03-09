(function() {

	"use strict";

	ds.gui.Autocomplete = function(options) {
		ds.Observer.apply(this, arguments);

		this._init = function() {
			this._container = options.container;
			this._template = {
				result: doT.template($("#result-search-template").html()),
				findString: doT.template($("#find-string").html())
			};
			this._source = options.source;
			this._popup = $("<div></div>").addClass("b-autocomplete");
			this._popup.append(this._template.result({
				result: []
			}));
			$(document.body).append(this._popup);
			this._popup.hide();
			this._elements = {
				resultSearch: $(".j-result-search")
			};
			this._minLength = 1;
			this._initEvents();
		};

		this._initEvents = function() {
			var self = this;
			this._container.on("input", "input", $.proxy(this._onInput, this));
			this.getLayout().on("click", "li", function() {
				var tag = $(this).text().trim();
				self.getLayout().hide();
				self.emit("select", tag);
			});
			$(document).click(function() {
				self.getLayout().hide();
			});
		};

		this.render = function(result) {
			var offset = this._container.offset();
			this.getLayout().css({
				left: offset.left,
				top: offset.top + this._container.height(),
				width: this._container.width()
			}).html(this._template.result({
				result: result
			})).show();
		};

		this.getLayout = function() {
			return this._container;
		};

		this._onInput = function(el) {
			var value = $(el.target).val().toLowerCase().replace(/[\\]+/, " "),
				reg = new RegExp("^" + value),
				result = [],
				i,
				find;
			if (value.length === 0) {
				this.getLayout().hide();
			}
			if (value.length < this._minLength) {
				return;
			}

			for (var key in this._source) {
				if (key.toLowerCase().search(reg) !== -1) {
					find = key.slice(0, value.length);
					result.push(this._template.findString({
						findString: find,
						otherString: key.slice(value.length, key.length)
					}));
				}
			}
			this.render(result);
		};

		this.getLayout = function() {
			return this._popup;
		};

		this._init();
	};

}())