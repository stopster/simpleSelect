;(function($){
	var defaults = {
		triggerTpl: function($select){
			return $("<div>")
				.addClass("trigger")
				.append($("<span>Select item:</span>"))
				.append($("<span>").addClass("selected"))
				.append($("<span>").addClass("arrow"));
		},
		optionTpl: function($option, index){
			return $("<div>")
				.addClass("option")
				.html($option.html())
				.attr("data-value", $option.val())
				.attr("data-index", index);
		},
		optionsWrapTpl: function($select){
			return $("<div>").addClass("options-wrap");
		},
		wrapperTpl: function($select){
			return $("<div>").addClass("simple-select");
		}
	};

	function attachEvents($original, $select){
		function changeSelected($selectedOption, index, changeOriginal){
			$select.find(".trigger .selected")
				.html($selectedOption.html())
				.attr("data-value", $selectedOption.attr("data-value"));
			if(changeOriginal){
				$original.value = $selectedOption.attr("data-value");
			}
		}
		$select.find(".trigger").on("click", function(e){
			e.preventDefault();
			e.stopPropagation();
			$select.toggleClass("opened");
		});
		$select.delegate(".option", "click", function(e){
			changeSelected($(this), $(this).attr("data-index"), true);
		});
		$("body").on("click", function(e){
			$select.removeClass("opened");
		});

		$original.on("change", function(e){
			var $selected = $(this[this.selectedIndex]);
			changeSelected($selected);
		});
	}

	$.fn.simpleSelect = function(config){
		var conf = $.extend({}, defaults, config);
		var $optWrap = conf.optionsWrapTpl(this);
		this.find("option").each(function(index, element){
			$optWrap.append(conf.optionTpl($(this), index));
		});
		var $select = conf.wrapperTpl(this)
				.append(conf.triggerTpl(this))
				.append($optWrap);
		attachEvents(this, $select);
		this.hide().after($select);
	}
})(Zepto);