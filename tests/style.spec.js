import jsdom from 'mocha-jsdom';
import { expect } from 'chai';
import select from '../src/index';

describe('Style manipulation', () => {
  jsdom();

  it('should change css correctly', () => {
    document.body.innerHTML = '<div id="asdf" style="font-size: 16px;"></div>';

    const n = select('#asdf');

    n.css('background', 'purple');

    expect(n.css('font-size')).to.be.equal('16px');
    expect(n.css('background')).to.be.equal('purple');
  });
});
