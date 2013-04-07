jQuery Email Address Munging Plugin
===================================

This is a simple plugin for jQuery that converts email addresses such as you [at] example [dot] com into clickable mailto links.

To use it, simply add the plugins JS file to the page and write your email address in your page, as follows:

```html
<span class="email">you [at] example [dot] com</span>
```

Then use the following JS to initialise it:

```js
jQuery(document).ready(function($) {
  $(".email").emailAddressMunging();
});
```

For more information and some demos, see http://andrew-jones.com/jquery-email-address-munging-plugin

Build status
------------

[![Build Status](https://secure.travis-ci.org/andrewrjones/jquery-email-address-munging-plugin.png)](http://travis-ci.org/andrewrjones/jquery-email-address-munging-plugin)
