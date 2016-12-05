import Cascade from 'cascade';

import Validation from './Validation';
import Rule from './Rule';

export function required<T>(target: any, propertyKey: string, descriptor?: TypedPropertyDescriptor<T>): any {
    var validPropertyKey = propertyKey + '-valid';
    Object.defineProperty(target, validPropertyKey, {
        enumerable: true,
        configurable: true,
        get: function() {
            Cascade.attachGraph(this);
            if (!this._graph.observables[validPropertyKey]) {
                this._graph.observables[validPropertyKey] = new Rule(() => {
                    return !!this[propertyKey];
                });
            }
            return this._graph.observables[validPropertyKey].getValue();
        }
    });
}
