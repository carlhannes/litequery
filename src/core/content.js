export default function content(obj) {
/**
 * Sets the HTML of all affected elements
 *
 * @param  {String} html The HTML to set
 * @return {Object}
 */
  obj.html = function getOrSetHTML(html) {
    if (html) {
      obj.apply((item) => {
        item.innerHTML = html;
      });

      return obj;
    }
    return obj.single().elements[0].innerHTML;
  };
}
