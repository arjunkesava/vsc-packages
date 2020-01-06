import { expect } from 'chai';
import * as sinon from 'sinon';
import { detailView } from '../../../../webviews/Package/views';
import { packageName, mockNpmData } from '../../../mocks';
import { Snippets } from '../../../../types';
import * as snippets from '../../../../webviews/Package/snippets';

const testSnippetCall = (methodName: Snippets): void => {
  test(`${methodName}() called once`, () => {
    const spy = sinon.spy(snippets, methodName);
    detailView(packageName, 'readme', mockNpmData);
    sinon.assert.calledOnce(spy);

    if (methodName !== 'tabboxSnippet') {
      const dataPartName = methodName.replace('Snippet', '');
      const npmDataPart = spy.getCall(0).args[0];
      expect(npmDataPart).to.be.eql(mockNpmData[dataPartName]);
    }

    spy.restore();
  });
};

suite.only('detailView()', () => {
  test('Returns a string', () => {
    expect(detailView(packageName, 'readme', mockNpmData)).to.be.a('string');
  });

  ([
    'authorSnippet',
    'bugsSnippet',
    'homepageSnippet',
    'licenseSnippet',
    'repositorySnippet',
    'tabboxSnippet',
  ] as Snippets[]).forEach((methodName: Snippets) => testSnippetCall(methodName));

  test('Renders a title', () => {
    const result = detailView(packageName, 'readme', mockNpmData);
    expect(result).contains(`<h1 class="data__name view__name">${packageName}</h1>`);
  });

  test('Renders a description', () => {
    const result = detailView(packageName, 'readme', mockNpmData);
    expect(result).contains(`<p class="data__description">${mockNpmData.description}</p>`);
  });
});