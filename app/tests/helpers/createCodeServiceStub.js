import sinon from 'sinon';
import * as codeService from '../../services/code';

const createCodeServiceStub = () => ({
  replace: method => ({
    with: data => {
      const sandbox = sinon.sandbox.create();
      sandbox.stub(codeService, 'default').returns({
        [method]: data
      });
      return sandbox;
    }
  })
});

export default createCodeServiceStub;
