jQuery.noConflict();

(function( $ ){
    console.log("I'm loaded!");


    $( '.read-more' ).on( 'click', function( event ){
        console.log("I'm clicked!");
        event.preventDefault();

        var target = this.hash;
        console.log(target);
        var $target = $( target );

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function(){
            window.location.hash = target;
        })

    } );



})( jQuery );
