import select from '../index';
import { warn } from './errors';

export default function selection(obj) {
/**
 * Require the object to be single, otherwise show a warning and return the first object.
 *
 * @return {Object}
 */
  obj.single = function single() {
    if (obj.elements.length === 1) {
      return obj;
    }

    const bestChoice = obj.first();

    warn('This method requires a single item, will return', bestChoice);
    return bestChoice;
  };

  /**
 * Return the first element as an object
 *
 * @return {Object}
 */
  obj.first = function first() {
    return select(obj.elements[0] || '');
  };

  /**
 * Return the last element as an object
 *
 * @return {Object}
 */
  obj.last = function last() {
    return select(obj.elements[obj.elements.length - 1]);
  };

  /**
 * Return the last element as an object
 *
 * @return {Object}
 */
  obj.parent = function parent() {
    return select(obj.single().elements[0].parentElement);
  };

  /**
 * Return the the children of all selected objects objects
 *
 * @return {Object}
 */
  obj.children = function children() {
    const items = [];

    obj.apply((item) => {
      items.push(...item.children);
    });

    return select(items);
  };

  /**
 * Return a specific item
 *
 * @param  {Integer} index Index to get by, zero-based
 * @return {Object}
 */
  obj.eq = function eq(index) {
    return obj.elements[index] ? select(obj.elements[index]) : undefined;
  };

  /**
 * Return the the children of all selected objects objects
 *
 * @param  {String} selectItem Selector string
 * @return {Object}
 */
  obj.find = function find(selectItem) {
    const items = [];

    obj.apply((baseItem) => {
      items.push(...select(selectItem, baseItem).elements);
    });

    return select(items);
  };

  /**
 * Return closest parent by selector from the current selections
 *
 * @param  {String} selectItem Selector string
 * @return {Object}
 */
  obj.closest = function closest(selectItem) {
    const items = [];

    function traverse(element, previous = null) {
      if (!element.parentElement) {
        return [];
      }

      const potential = select(selectItem, element.parentElement).elements;
      const len = potential.length;

      if (potential && len) {
        if (!previous || len === 1) {
          return potential;
        }

        for (let i = 0; i < len; i++) {
          if (potential[i] === previous) {
            return [potential[i]];
          }
        }
      }

      return traverse(element.parentElement, element);
    }

    obj.apply((element) => {
      items.push(...traverse(element));
    });

    return select(items);
  };

  /**
 * Filter items
 *
 * @param  {Function} filter Function to filter by
 * @return {Object}          Select object
 */
  obj.filter = function filterItems(filter) {
    const items = [];

    obj.apply((item) => {
      if (filter(select(item))) {
        items.push(item);
      }
    });

    return select(items);
  };

  /**
 * Get element NOT wrapped in select by index
 *
 * @param  {Integer} index Index to get by, zero-based
 * @return {NodeElement/Array} Node Element if index specified, otherwise array of node elements
 */
  obj.get = function get(index) {
    if (index === undefined) {
      return obj.elements;
    }

    return obj.elements[index];
  };
}
