/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function ($) {

  module('jQuery#emailAddressMunging#unit', {
    setup: function () {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test("andrew (at) arjones.co.uk", 1, function () {
    strictEqual($.fn.emailAddressMunging._createEmail("andrew (at) arjones.co.uk"), "andrew@arjones.co.uk");
  });

  test("andrew [at] arjones.co.uk", 1, function () {
    strictEqual($.fn.emailAddressMunging._createEmail("andrew [at] arjones.co.uk"), "andrew@arjones.co.uk");
  });

  test("andrew@arjones (dot) com", 1, function () {
    strictEqual($.fn.emailAddressMunging._createEmail("andrew@arjones (dot) com"), "andrew@arjones.com");
  });

  test("andrew@arjones [dot] com", 1, function () {
    strictEqual($.fn.emailAddressMunging._createEmail("andrew@arjones [dot] com"), "andrew@arjones.com");
  });

  test("andrew@arjones (dot) co (dot) uk", 1, function () {
    strictEqual($.fn.emailAddressMunging._createEmail("andrew@arjones (dot) co (dot) uk"), "andrew@arjones.co.uk");
  });

  test("andrew@arjones [dot] co [dot] uk", 1, function () {
    strictEqual($.fn.emailAddressMunging._createEmail("andrew@arjones [dot] co [dot] uk"), "andrew@arjones.co.uk");
  });

  test("andrew [at] arjones [dot] co [dot] uk", 1, function () {
    strictEqual($.fn.emailAddressMunging._createEmail("andrew [at] arjones [dot] co [dot] uk"), "andrew@arjones.co.uk");
  });

  test("andrew [AT] arjones [DOT] co [DOT] uk", 1, function () {
    strictEqual($.fn.emailAddressMunging._createEmail("andrew [AT] arjones [DOT] co [DOT] uk"), "andrew@arjones.co.uk");
  });

  test("andrew[AT]arjones[DOT]com", 1, function () {
    strictEqual($.fn.emailAddressMunging._createEmail("andrew[AT]arjones[DOT]com"), "andrew@arjones.com");
  });

  module('jQuery#emailAddressMunging#functional', {
    setup: function () {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('is chainable', 1, function () {
    strictEqual(this.elems.emailAddressMunging(), this.elems, 'should be chaninable');
  });

  test("<a> element with correct href and all existing attributes", 5, function () {
    // create an element to test and run plugin
    $('<a id="test1" class="email tests" title="my email">andrew (at) arjones.co.uk</a>').appendTo(this.elems).emailAddressMunging();

    // get the new element
    var el = $('#test1');

    // tests
    strictEqual(el.attr('href'), 'mailto:andrew@arjones.co.uk');
    strictEqual(el.attr('title'), 'my email');
    ok(el.hasClass('email'));
    ok(el.hasClass('tests'));
    strictEqual(el.text(), 'andrew@arjones.co.uk');
  });

  test("should not overwrite href", 2, function () {
    // create an element to test and run plugin
    $('<a id="test2" href="foo">andrew (at) arjones.co.uk</a>').appendTo(this.elems).emailAddressMunging();

    // get the new element
    var el = $('#test2');

    // tests
    strictEqual(el.attr('href'), 'mailto:andrew@arjones.co.uk');
    strictEqual(el.text(), 'andrew@arjones.co.uk');
  });

}(jQuery));