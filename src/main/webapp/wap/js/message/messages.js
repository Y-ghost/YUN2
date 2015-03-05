;
"user strict";

var rainet = rainet || {};
rainet.message = rainet.message || {};

// 信息管理所用模块的视图
rainet.message.view = function(){
	
	var module_init = function(){
		var module = $('#module').val();
		if (!rainet.message.controller[module]) {
			rainet.message.controller['project'].init();
		} else {
			rainet.message.controller[module].init();
		}
	};
	
	var loadData = function(){

		var myScroll,
			pullDownEl, pullDownOffset,
			pullUpEl, pullUpOffset,
			generatedCount = 0;


		function pullUpAction () {
			setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
				var el, li, i;
				el = document.getElementById('list');

				for (i=0; i<3; i++) {
					li = document.createElement('li');
					li.innerText = 'Generated row ' + (++generatedCount);
					el.appendChild(li, el.childNodes[0]);
				}
				
				myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
			}, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
		}

		function loaded() {
			pullUpEl = document.getElementById('pullUp');	
			pullUpOffset = pullUpEl.offsetHeight;
			
			myScroll = new iScroll('wrapper', {
				useTransition: true,
				topOffset: pullDownOffset,
				onRefresh: function () {
					 if (pullUpEl.className.match('loading')) {
						pullUpEl.className = '';
						pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
					}
				},
				onScrollMove: function () {
					if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
						pullUpEl.className = 'flip';
						pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to refresh...';
						this.maxScrollY = this.maxScrollY;
					} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
						pullUpEl.className = '';
						pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
						this.maxScrollY = pullUpOffset;
					}
				},
				onScrollEnd: function () {
					if (pullUpEl.className.match('flip')) {
						pullUpEl.className = 'loading';
						pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';				
						pullUpAction();	// Execute custom function (ajax call?)
					}
				}
			});
			
			setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
		}

		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		loaded();
		//document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
	};
	
	// 初始化信息管理页面
	var init = function(){
		module_init();
		loadData();
	}
	
	return {
		init : init
	};
	
}();

$(document).ready(function(){
	rainet.header.view.init();
	rainet.message.view.init();
});
