import {expect} from 'chai';
import {observable} from 'cascade';

import {required} from '../scripts/CascadeValidation';

describe('required', () => {
    it('should observe model properties', () => {
        class Model {
            @required @observable value: string = 'abcd';
        }

        var model = new Model();
        var valid = model['value-valid'];
        expect(valid).to.equal(true);
    });
});
