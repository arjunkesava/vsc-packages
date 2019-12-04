import * as sinon from 'sinon';
import * as commands from '../../commands';
import * as sidebar from '../../sidebar';
import * as webviews from '../../webviews';
import { extViews } from '../../constants';
import { mockCmds, mockContext } from '../mocks';
import { setupExt } from '../../core/activate';

suite('activate()', function() {
  test('setupExt() sets up extension correctly', function() {
    const stubRc = sinon.stub(commands, 'registerCommands');
    const stubWv = sinon.stub(webviews, 'registerWebviews');
    const stubSb = sinon.stub(sidebar, 'setupSidebar');
    setupExt(mockCmds, extViews, mockContext);

    sinon.assert.calledOnce(stubRc);
    sinon.assert.calledOnce(stubWv);
    sinon.assert.calledOnce(stubSb);

    sinon.assert.calledWith(stubRc, mockCmds, mockContext);
    sinon.assert.calledWith(stubWv, mockContext);
    sinon.assert.calledWith(stubSb, extViews, mockContext);

    stubRc.restore();
    stubWv.restore();
    stubSb.restore();
  });
});