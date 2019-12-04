import { expect } from 'chai';
import { mockCmds } from '..';

suite('mockCmds()', () => {
  test('Has correct length', () => {
    expect(mockCmds).to.be.an('array');
    expect(mockCmds).to.have.length(1);
  });

  test('Has correct cmd', () => {
    expect(mockCmds[0].cmd).to.be.a('string');
  });

  test('Has correct callback', () => {
    expect(mockCmds[0].callback).to.be.a('function');
  });
});