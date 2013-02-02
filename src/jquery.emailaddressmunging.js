(function ($) {
  "use strict";

  $.fn.emailAddressMunging = function (opts) {

    return this.each(function () {
      var $el = $(this);

      // get email address
      var mail = $.fn.emailAddressMunging._createEmail($el.text());

      var attributes = {};
      // copy attributes from old element
      $.each(this.attributes, function (i, attr) {

        // dont overwrite our href and workarounds for IE
        if (attr.value !== 'null' && attr.value !== '' && attr.name !== 'dataFormatAs' && attr.name !== 'href') {
          attributes[attr.name] = attr.value;
        }
      });

      // make a new link element with email address
      var $newEl = $('<a href="mailto:' + mail + '">' + mail + '</a>').attr(attributes);

      // replace existing element with our new one
      $el.replaceWith($newEl);
    });
  };

  // creates the email adress from the parsed string
  $.fn.emailAddressMunging._createEmail = function (mail) {
    // replace (at) and [at]
    mail = mail.replace(/(\[|\()at(\]|\))/i, '@');

    // replace (dot) and [dot]
    mail = mail.replace(/(\[|\()dot(\]|\))/ig, '.');

    // remove white space
    mail = mail.replace(/ /g, '');

    return mail;
  };
}(jQuery));