if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}

(function() {
	 const observerElements = document.querySelectorAll('.productWrapper');
	 const thresholds = []
	 var lowEnd = 0;
	 while( lowEnd <= 100 ){
	   thresholds.push( +((lowEnd / 100).toFixed(2)) );
		 lowEnd++;
		}
		console.log(thresholds)

 	 const observerOptions = {
 	  root: null,
 	  rootMargin: '100px 0px',
 	  threshold: thresholds
 	 }

 	observerElements.forEach(function(el, index) {
 	  var elObserver = new IntersectionObserver(
 	    function( entry ) {
 	      if (index,  entry[0].intersectionRatio > 0 ) {
					if ( entry[0].boundingClientRect ) {
						// raise the visibility ratio to a round number
						// then invert the ratio so theat 100% visibility == 0 transform
						let ratio = parseInt( ( 1 - entry[0].intersectionRatio ) * 100 );
						/*
							detect if the object is entering from above or below
							if the top value of the element rect is positive,
							it is below the top of the viewport
							and  we are coming down to it
							so we animate it in from the top right
							if its negative, it is above the top of the viewport
							and we are leaving or coming up from below
							so we animate it in from the bottom left
						*/
						var horizontalRatio = Math.ceil( ( ratio / 2 ) * 3 );
						horizontalRatio = horizontalRatio < 0 ? 0 : horizontalRatio;
						let transformText = "translate3d(" + horizontalRatio + "vw, -" + ratio + "vh, 0)";
						let is_leaving = entry[0].boundingClientRect.top < 0
						if ( is_leaving ) {
							transformText = "translate3d(-" + horizontalRatio + "vw, " + ratio + "vh, 0)";
						}

						var prefixes = ['webkit', 'moz', 'ms', 'o', '']
						var target = el.children[0];
						if ( target ) {
							prefixes.forEach( function( value ) {
								target.style[value + 'Transform'] = transformText;
							})
						}
					}
 	      }
 	    },
 	    observerOptions
 	  );

 	  elObserver.observe(el);
 	});
})();
