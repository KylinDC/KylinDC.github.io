var options;$.prototype.justifiedGallery&&(options={rowHeight:140,margins:4,lastRow:"justify"},$(".article-gallery").justifiedGallery(options)),$(document).ready(function(){var e,i,o,t;$("#header > #nav > ul > .icon").click(function(){$("#header > #nav > ul").toggleClass("responsive")}),$(".post").length&&(e=$("#menu"),i=$("#menu > #nav"),o=$("#menu-icon, #menu-icon-tablet"),1440<=$(document).width()&&(e.show(),o.addClass("active")),o.click(function(){return e.is(":hidden")?(e.show(),o.addClass("active")):(e.hide(),o.removeClass("active")),!1}),e.length&&$(window).on("scroll",function(){var o=e.offset().top;!i.is(":visible")&&o<50?i.show():i.is(":visible")&&100<o&&i.hide(),!$("#menu-icon").is(":visible")&&o<50?($("#menu-icon-tablet").show(),$("#top-icon-tablet").hide()):!$("#menu-icon").is(":visible")&&100<o&&($("#menu-icon-tablet").hide(),$("#top-icon-tablet").show())}),$("#footer-post").length&&(t=0,$(window).on("scroll",function(){var o=$(window).scrollTop();t<o?$("#footer-post").hide():$("#footer-post").show(),t=o,$("#nav-footer").hide(),$("#toc-footer").hide(),$("#share-footer").hide(),o<50?$("#actions-footer > #top").hide():100<o&&$("#actions-footer > #top").show()})))});