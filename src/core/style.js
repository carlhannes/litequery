export default function content(obj) {
/**
 * Get or set the CSS style for elements
 *
 * @param  {String} prop The property to get or set
 * @param  {Any} value Set the prop to this value
 * @return {Object}
 */
  obj.css = function getOrSetCSS(prop, value) {
    if (value) {
      obj.apply((item) => {
        item.style[prop] = value;
      });

      return obj;
    }
    return window.getComputedStyle(obj.single().elements[0], null).getPropertyValue(prop) || obj.single().elements[0].style[prop];
  };
}
