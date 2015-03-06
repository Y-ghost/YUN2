<script type="text/javascript">
  2 
  var myScroll, 
       pullDownEl, pullDownOffset,
       pullUpEl, pullUpOffset, _maxScrollY;
       
   var generatedCount = 0;
   
  9 function pullDownAction(){
 10         setTimeout(function () {    // <-- Simulate network congestion, remove setTimeout from production!
 11             var el, li, i;
 12             el = document.querySelector('#scroller ul');
 13     
 14             for (i=0; i<3; i++) {
 15                 li = document.createElement('li');
 16                 li.innerHTML = '(Pull down) Generated row ' + (++generatedCount);//Firefox  does not suppose innerText, use innerHTML instead.
 17                 el.insertBefore(li, el.childNodes[0]);
 18             }
 19             if(myScroll){
 20                 myScroll.refresh();        // Remember to refresh when contents are loaded (ie: on ajax completion)
 21             }
 22         }, 1000);    // <-- Simulate network congestion, remove setTimeout from production!
 23 }
 24 
 25 function pullUpAction () {
 26     setTimeout(function () {    // <-- Simulate network congestion, remove setTimeout from production!
 27         var el, li, i;
 28         el = document.querySelector('#scroller ul');
 29 
 30         for (i=0; i<3; i++) {
 31             li = document.createElement('li');
 32             li.innerHTML = '(Pull up) Generated row ' + (++generatedCount);//Firefox  does not suppose innerText, use innerHTML instead.
 33             el.appendChild(li, el.childNodes[0]);
 34         }
 35         if(myScroll){
 36             myScroll.refresh();        // Remember to refresh when contents are loaded (ie: on ajax completion)
 37         }
 38     }, 1000);    // <-- Simulate network congestion, remove setTimeout from production!
 39 }
 40 
 41 function loaded() {
 42     pullDownEl = document.querySelector('#pullDown');
 43     if (pullDownEl) {
 44         pullDownOffset = pullDownEl.offsetHeight;
 45     } else {
 46         pullDownOffset = 0;
 47     }
 48     pullUpEl = document.querySelector('#pullUp');    
 49     if (pullUpEl) {
 50         pullUpOffset = pullUpEl.offsetHeight;
 51     } else {
 52         pullUpOffset = 0;
 53     }
 54     
 55     console.log('pullDownOffset:'+pullDownOffset);
 56     console.log('pullUpOffset:'+pullUpOffset);
 57     
 58     //Options of IScroll
 59     var myOptions = {
 60             mouseWheel: true,
 61             scrollbars: true,
 62             fadeScrollbars: true,
 63             probeType:1,
 64             startY:-pullDownOffset
 65         };
 66     myScroll = new IScroll('#wrapper',myOptions);
 67     console.log('maxScrollY-1:'+myScroll.maxScrollY);
 68     _maxScrollY = myScroll.maxScrollY = myScroll.maxScrollY + pullUpOffset;
 69     console.log('maxScrollY-2:'+myScroll.maxScrollY);
 70     
 71     var isScrolling = false;
 72     
 73     //Event: scrollStart
 74     myScroll.on("scrollStart", function() {
 75         if(this.y==this.startY){
 76             isScrolling = true;
 77         }
 78         console.log('start-y:'+this.y);
 79     });
 80     
 81     //Event: scroll
 82     myScroll.on('scroll', function(){
 83         if (this.y >= 5 && pullDownEl && !pullDownEl.className.match('flip')) {
 84             pullDownEl.className = 'flip';
 85             pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh';
 86             //this.minScrollY = 0;
 87         } else if (this.y < 5  && pullDownEl && pullDownEl.className.match('flip')) {
 88             pullDownEl.className = '';
 89             pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh';
 90             //this.minScrollY = -pullDownOffset;
 91         }else if (this.y <= (_maxScrollY - pullUpOffset) && pullUpEl && !pullUpEl.className.match('flip')) {
 92             pullUpEl.className = 'flip';
 93             pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to refresh';
 94             //this.maxScrollY = this.maxScrollY;
 95             this.maxScrollY = this.maxScrollY - pullUpOffset;
 96         } else if (this.y > (_maxScrollY - pullUpOffset) && pullUpEl && pullUpEl.className.match('flip')) {
 97             pullUpEl.className = '';
 98             pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more';
 99             //this.maxScrollY = pullUpOffset;
100             this.maxScrollY = this.maxScrollY + pullUpOffset;
101         }
102                     
103         console.log('y:'+this.y);
104     });
105     
106     //Event: scrollEnd
107     myScroll.on("scrollEnd", function() {
108         console.log('scroll end'); 
109         console.log('directionY:'+this.directionY);
110         console.log('y1:'+this.y);
111         console.log('maxScrollY-3:'+this.maxScrollY);
112         if (pullDownEl && !pullDownEl.className.match('flip') && this.y > this.options.startY) {
113             console.log('resume'); 
114             this.scrollTo(0, this.options.startY,800);
115           }
116         else if (pullDownEl && pullDownEl.className.match('flip')){
117                 pullDownEl.className = 'loading';
118                 pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';                
119                 // Execute custom function (ajax call?)
120                 if (isScrolling) {
121                     console.log('before pull down action:'+this.y); 
122                     pullDownAction();
123                       console.log('after pull down action:'+this.y); 
124                   }
125         }
126         else if (pullUpEl && pullUpEl.className.match('flip')) {
127                 console.log('pull up loading'); 
128                 pullUpEl.className = 'loading';
129                 pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';    
130                 // Execute custom function (ajax call?)
131                 if (isScrolling) {            
132                     console.log('before pull up action:'+this.y); 
133                     pullUpAction();    
134                     console.log('after pull up action:'+this.y); 
135                 }
136         }
137         isScrolling = false;
138     });
139     
140     //Event: refresh
141     myScroll.on("refresh", function() {
142           
143          console.log('maxScrollY-4:'+this.maxScrollY);
144          _maxScrollY = this.maxScrollY = this.maxScrollY+pullUpOffset;
145          console.log('maxScrollY-5:'+this.maxScrollY);
146          
147          if (pullDownEl  && pullDownEl.className.match('loading')) {
148                 pullDownEl.className = '';
149                 pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh';
150                 this.scrollTo(0,this.options.startY,0);
151          } else if (pullUpEl && pullUpEl.className.match('loading')) {
152                 pullUpEl.className = '';
153                 pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more';
154                 this.scrollTo(0,this.maxScrollY,0);
155          }
156          
157          console.log('refresh finished!'); 
158     });
159     
160     setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 500);
161     
162 }
163 
164 document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
165 
166 </script>