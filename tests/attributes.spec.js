import jsdom from 'mocha-jsdom';
import { expect } from 'chai';
import select from '../src/index';

describe('Attributes manipulation', () => {
  jsdom();

  it('should change DOM elements attributes correctly', () => {
    let n = document.createElement('asdf');

    n.setAttribute('test', 'asdf');

    n = select(n);

    n.attr('test2', 'value2');

    expect(n.attr('test')).to.be.equal('asdf');
    expect(n.attr('test2')).to.be.equal('value2');
  });
});
