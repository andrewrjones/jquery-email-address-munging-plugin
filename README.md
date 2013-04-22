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

Contributing
------------

I really appreciate any and all contributions.

I use [Grunt](http://gruntjs.com/) to build this plugin. Once you have installed with `npm install`, run `grunt --help` to see the available tasks.

If you are contibuting code, please tidy the code by running `grunt tidy`. This helps ensure the pull request only shows relevant changes and keeps the code readable and in one style.

Ensure the unit tests pass by running `grunt test`. Please also try to add new tests where it helps.

Thanks again for contributing to this plugin!

Build status
------------

[![Build Status](https://secure.travis-ci.org/andrewrjones/jquery-email-address-munging-plugin.png)](http://travis-ci.org/andrewrjones/jquery-email-address-munging-plugin)
