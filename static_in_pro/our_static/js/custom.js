jQuery.noConflict();

(function( $ ){
    console.log("I'm loaded!");

    $( '.jumbotron' ).hide().fadeIn(700);

    function scrollTo( event ) {
        console.log("I'm clicked!");
        event.preventDefault();

        var target = this.hash;
        console.log(target);
        var $target = $( target );

        function showHash( event ){
            window.location.hash = target;
        };

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        },
        900, 'swing', showHash);
    };


    $( '.contact-flow' ).on( 'click', scrollTo);

    $( '.read-more' ).on( 'click', scrollTo );



})( jQuery );
