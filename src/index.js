import { error } from './core/errors';

import attributes from './core/attributes';
import classes from './core/classes';
import content from './core/content';
import events from './core/events';
import selection from './core/selection';
import style from './core/style';

export default function select(selector = window, baseElement = document) {
  const obj = { selector: null };

  if (typeof selector === 'string') {
    try {
      obj.elements = baseElement.querySelectorAll(selector);
      obj.selector = selector;
    } catch (e) {
      // TODO check if we can just reset the elements perhaps rather than throwing an error?
      error(true, e);
      obj.elements = [];
    }
  } else if (Array.isArray(selector)) {
    obj.elements = [...selector];
  } else {
    obj.elements = [selector];
  }

  /**
 * Apply a callback for each element in this object
 *
 * @param  {Function} callback Callback function
 * @return {Object}
 */
  obj.apply = function apply(callback) {
    for (let i = 0; i < obj.elements.length; i++) {
      callback(obj.elements[i]);
    }

    return obj;
  };

  /**
 * Each is just like apply, but wraps the items in a new select
 *
 * @param  {Function} callback Callback function
 * @return {Object}
 */
  obj.each = function each(callback) {
    obj.apply((item) => {
      callback(select(item));
    });

    return obj;
  };

  /**
 * Extend the functionality
 *
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
  obj.extend = function extend(callback) {
    callback(obj);
  };

  /**
 * Extend the obj with all the parts
 */
  obj.extend(attributes);
  obj.extend(classes);
  obj.extend(content);
  obj.extend(events);
  obj.extend(selection);
  obj.extend(style);

  return obj;
}
