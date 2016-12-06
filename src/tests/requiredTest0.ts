import {expect} from 'chai';
import {observable} from 'cascade';

import {required} from '../scripts/CascadeValidation';

describe('required', () => {
    class Model {
        @required @observable value: string;
    }

    it('should be false with default values', () => {
        var model = new Model();
        var valid = model['value-valid'];
        expect(valid).to.equal(false);
    });

    it('should be true if property is truthy', () => {
        var model = new Model();
        model.value = 'abcd';
        var valid = model['value-valid'];
        expect(valid).to.equal(true);
    });

    it('should be false if property is falsy', () => {
        var model = new Model();
        model.value = '';
        var valid = model['value-valid'];
        expect(valid).to.equal(false);
    });
});
