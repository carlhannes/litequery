import jsdom from 'mocha-jsdom';
import { expect } from 'chai';
import select from '../src/index';

/* eslint no-unused-expressions: 0 */

describe('Class manipulation', () => {
  jsdom();

  it('should handle addClass and hasClass correctly', () => {
    let n = document.createElement('test');

    n = select(n);

    n.addClass('test');

    expect(n.elements[0].className).to.be.equal('test');
    expect(n.hasClass('test')).to.be.true;
  });

  it('should deduplicate classes', () => {
    let n = document.createElement('test');

    n.className = 'duplicate duplicate';

    n = select(n).dedupClass();

    expect(n.elements[0].className).to.be.equal('duplicate');
  });

  it('should remove classes', () => {
    let n = document.createElement('test');

    n.className = 'test1 test2';

    n = select(n).removeClass('test2');

    expect(n.elements[0].className).to.be.equal('test1');
  });

  it('should toggle classes', () => {
    let n = document.createElement('test');

    n.className = 'test1';

    n = select(n).toggleClass('test1');

    expect(n.elements[0].className).to.be.equal('');

    n.toggleClass('test1');

    expect(n.elements[0].className).to.be.equal('test1');
  });
});
