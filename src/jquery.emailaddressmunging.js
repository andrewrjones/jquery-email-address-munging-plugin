(function($) {
    $.fn.emailAddressMunging = function(opts) {

        return this.each(function() {
            var $el = $(this);
            var $newEl;
            
            // get email address
            var mail = $.fn.emailAddressMunging._createEmail($el.text());
            
            // make a new link element with email address
            $newEl = $('<a href="mailto:'+ mail + '">' + mail + '</a>');
            
            // copy attributes from old element
            $.each(this.attributes, function(i, attr){
                // dont overwrite our href
                if( attr.name !== 'href' ){
                    $newEl.attr(attr.name, attr.value);
                }
            });
            
            // replace existing element with our new one
            $el.replaceWith($newEl);
        });
    };
    
    // creates the email adress from the parsed string
    $.fn.emailAddressMunging._createEmail = function(mail){
        // replace (at) and [at]
        mail = mail.replace(/(\[|\()at(\]|\))/i, '@');
        
        // replace (dot) and [dot]
        mail = mail.replace(/(\[|\()dot(\]|\))/ig, '.');
        
        // remove white space
        mail = mail.replace(/ /g, '');
        
        return mail;
    };
    
})(jQuery);