(function($) {
	
	var noteSettings;

	$.fn.note = $.note = function(options) {
		
		$.fn.note.defaults = {
			transitionSpeed: 200,
			autoHide: true,
			hideDelay: 5000,
			clickToClose: true,
			message: 'No message specified'
		}

		if (typeof options == 'string') {
			$.fn.note.defaults.message = options;
			options = null;
		}
		
		options = $.extend({}, $.fn.note.defaults, noteSettings, options);

		var noteTemplate = '<div class="jq-note" />';
		var itemTemplate = $('<div class="jq-note-item" />');

		if (!$('.jq-note').length)
			$('body').append(noteTemplate);

		var elem = {
			note: $('.jq-note'),
			item: undefined
		};

		var methods = {
			init: function() {
				elem.note.append(itemTemplate);
				elem.item = itemTemplate.append(options.message);
				elem.item.hide();
				this.showItem();
				if (options.autoHide)
					this.autohide();

			},
			showItem: function() {
				elem.item.slideDown(options.transitionSpeed);
			},
			hideItem: function() {
				elem.item.slideUp(options.transitionSpeed, function() {
					this.remove();
				});
			},
			autohide: function() {
				setTimeout(this.hideItem, options.hideDelay);
			},
		};

		methods.init();

		if (options.clickToClose)
			elem.item.on('click touchstart', methods.hideItem);

		$.fn.note.destroy = function() {
			elem.note.remove();
		};

		return this;
	}

	$.fn.noteSetup = $.noteSetup = function(args) {
		noteSettings = args;
	}

})(jQuery);
