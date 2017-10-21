# LiteQuery
Lightweight JavaScript DOM manipulation, inspired by jQuery and jqlite, but runs using webpack-compiled, babel transpiled ES6 code.

## But why?
I wanted an easy wrapper for document.querySelector and querySelector all that mimics the behaviour of jQuery but is still lightweight, manageable and easy to develop.

## How do I get going...
### ...really fast?
Include the following snippet in your HTML:
```html
<script src="https://unpkg.com/litequery/dist/litequery.min.js"></script>
```
Then you can start using it, it'll be attached as the global variable `litequery()`.

### ...the proper way?
* Make sure you have NodeJS & NPM installed (or Yarn, if you prefer that)
* Use `npm i litequery --save` in your project folder
* Import `node_modules/litequery/dist/litequery.min.js` in your project, such as:
```js
import litequery from 'litequery';

litequery('div.container').html('Hello World!');
```

# Is it chainable?
Yes.
```js
import lq from 'litequery';

lq('div').addClass('test').html('asdf');
```
works just as you would expect.
Some functions do however return variables, such as `hasClass('test')` returns a boolean. So those functions break the chain.

## What does it do?
```js
import lq from 'litequery';

// Classes
lq('div#myDiv').hasClass('selected'); // Do all the selected elements have the class specified? (returns Boolean)
lq('div#myDiv').dedupClass(); // Deduplicates all classes on all affected elements.
lq('div#myDiv').addClass('highlight'); // Just like jQuery! Add a class to a div.
lq('div#myDiv').removeClass('posh'); // div#myDiv is just not *that* classy after this.
lq('div#myDiv').toggleClass('active'); // Toggle a class

// Content manipulation
lq('#content').html('<h1>Wowza</h1>'); // Set the HTML of #content to "<h1>Wowza</h1>".
var content = lq('#content').html(); // Return #content's innerHTML as a string.

// Events (pretty basic and might not fire accurately at the moment, feel free to contribute)
lq('#hammer').on('touchstart', function(event) {
	event.preventDefault(); // Can't touch this
});

// Window events
lq().on('resize', function(event) {
  console.log('Awh lag');
});

lq().trigger('resize'); // Trigger resize on window

// Selection
lq('li').single(); // Get the first li item, expects it to be a single element. Warns if multiple selected, but still returns the first.
lq('li').first(); // Get the first matched li item.
lq('li').last(); // Get the last matched li item.
lq('li').parent(); // Get the parent of the first matched item.
lq('ul').children(); // Return the children of all selected objects
lq('li').eq(0); // Get the first matched li item. By index, zero-based.
lq('ul').find('div'); // Traverse the DOM down from UL and select ALL DIVs in each UL.
lq('ul').closest('div'); // Traverse the DOM up from UL and select the first DIV for each UL.

// Advanced selection
lq('li').filter(function(item) {
  return item.html(); === 'lol'; // Filter and return all li items containing the world "lol".
});

lq('li').get(); // Returns a NodeList of all matched li elements.
lq('li').get(0); // Returns a specific, non-litequery wrapped element (node) by index, zero-based.

// Apply something to all items using their actual node or element rather than the litequery wrapped one.
lq('.item').apply(function (item) {
  item.innerHTML = '';
  item.setAttribute('src', '../../test.jpg');
});

// Do something to each and every item, but with a litequery wrapped object.
lq('.item').each(function(item) {
  if (item.hasClass('onclear')) {
    item.html('');
  }
})
```

## Is this... tested?
Yes. Test are in the `tests` folder and run by mocha using `npm run test`.

## Happy coding!
If you want to contribute, please do so. Feel free to add pull requests and likewise.
