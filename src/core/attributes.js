export default function content(obj) {
/**
 * Gets or sets the attribute
 *
 * @param  {String} attr The attribute to get or set
 * @param  {String} value The value to set
 * @return {Object}
 */
  obj.attr = function getOrSetAttribute(attr, value) {
    if (value) {
      obj.apply((item) => {
        item.setAttribute(attr, value);
      });

      return obj;
    }
    return obj.single().elements[0].getAttribute(attr);
  };
}
