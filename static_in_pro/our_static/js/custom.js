jQuery.noConflict();

(function( $ ){
    console.log( "I'm loaded!" );

    $( '.jumbotron' ).animate({
        opacity: 1
    }, 600);

    $( '.jumbo-flow' ).children().each(function( i ){
        console.log( $( this ) );

        var $val = $( this );

        setTimeout(function(){
            $val.animate({
                opacity: 1,
                marginLeft: "+=600"
            }, {
                duration: 1200,
                queue: false
            })
            .delay(1500);
        }, i*500);

    })

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

    $( '.about-flow' ).on('click', scrollTo);

    $( '.contact-flow' ).on( 'click', scrollTo);

    $( '.read-more' ).on( 'click', scrollTo );

    function createEmail(){
        console.log('createEmail is working!');
        console.log( $( '.contact-message' ).val() );
        $.ajax({
            url : "contact_email/",  // The Endpoint
            type : "POST", // http method
            data : {
                contact_name : $( '.contact-name' ).val(),
                contact_email: $( '.contact-email' ).val(),
                contact_message: $( '.contact-message' ).val(),
            }, //Data sent with POST request

            // handle a successful response
            success: function( json, textStatus, xhr ){

                console.log( json.result);

                if (json.result == "success") {

                    console.log( textStatus + " 1" );
                    // Remove the value from the input
                    var $form = $( '.contact-form' );
                    var $sibling = $form.prev();

                    $form.animate({
                        width: "25%",
                        marginLeft : "-=600",
                        opacity: 0.1
                    }, {
                        queue: false,
                        duration: 1200,
                        complete: function( e ){
                            $sibling.fadeOut('800', function( e ){
                            $form.css({display: 'none'});
                            $( this ).text('Thank you ' + json.name + ' for contacting us!').fadeIn(1300);
                            console.log("see i did run");
                            })
                        },
                    })


                } else {
                // Remove form errors
                    $( '.contact-form' ).find(".errorField").remove();
                    // console.log( json.result + " 2");
                    for (var key in json.result) {
                        if (key in { name: 1, email: 1, message: 1,}) {

                            error = json.result[key][0];

                            field = $( '.contact-form' ).find("#div_id_" + key);

                            $( '<p class="errorField"><em></em>' + error + '</p>' ).insertBefore( field ).fadeIn(400);

                        }
                    }

                    for (var i = 0; i < 2; i++){
                        $( '.errorField' ).fadeOut(400).fadeIn(400);
                    }
                }
            },

            error: function(xhr, textStatus, errorThrown){
                console.log(xhr.status + ": " + xhr.responseText + " " + textStatus + " " + errorThrown);
            }


        })
    };

    $( '.contact-form' ).on('submit', function( event ){
        event.preventDefault();
        console.log("Form Submitted!");
        createEmail();
    });



})( jQuery );



// SAMPLE CSRF JS BELOW!!!


(function( $ ) {


    // This function gets cookie with a given name
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');

    /*
    The functions below will create a header with csrftoken
    */

    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    function sameOrigin(url) {
        // test that a given url is a same-origin URL
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }

    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
                // Send the token to same-origin, relative URLs only.
                // Send the token only if the method warrants CSRF protection
                // Using the CSRFToken value acquired earlier
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });

})( jQuery );
