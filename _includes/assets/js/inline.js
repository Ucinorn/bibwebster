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

 	 const observerOptions = {
 	  root: null,
 	  rootMargin: '0px 50px',
 	  threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
 	 }

 	observerElements.forEach(function(el) {
 	  var elObserver = new IntersectionObserver(
 	    function( entry ) {
 	      if (entry[0].intersectionRatio > 0) {
					if ( entry[0].boundingClientRect && entry[0].boundingClientRect.top ) {
						// raise the visibility ratio to a round number
						// then invert the ratio so theat 100% visibility == 0 transform
						let ratio = 100 - parseInt( entry[0].intersectionRatio * 100 );
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
						let transformText = "translate3d(" + ratio + "vw, -" + ratio + "vh, 0)";
						if ( entry[0].boundingClientRect.top < 0 ) {
							let transformText = "translate3d(-" + ratio + "vw, " + ratio + "vh, 0)";
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
