import Cascade from 'cascade';

import Validation from './Validation';
import Rule from './Rule';

export function required<T>(target: any, propertyKey: string, descriptor?: TypedPropertyDescriptor<T>): any {
    var validPropertyKey = propertyKey + '-valid';
    Object.defineProperty(target, validPropertyKey, {
        enumerable: true,
        configurable: true,
        get: function() {
            var graph = Cascade.attachGraph(this);
            Validation.attachGraph(this);
            if (!graph.observables[validPropertyKey]) {
                var rule = new Rule(() => {
                    return !!this[propertyKey];
                });
                graph.observables[validPropertyKey] = rule;
                Validation.addRule(this, propertyKey, rule);
            }
            return graph.observables[validPropertyKey].getValue();
        }
    });
}
