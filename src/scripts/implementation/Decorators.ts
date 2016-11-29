import Validation from './Validation';
import Rule from './Rule';

export function required<T>(target: any, propertyKey: string, descriptor?: TypedPropertyDescriptor<T>): any {
    Object.defineProperty(target, propertyKey + '-valid', {
        enumerable: true,
        configurable: true,
        get: function() {
            Validation.attachGraph(target);
            if (!target._validation.rules[propertyKey]) {
                Validation.createRule(target, propertyKey, new Rule(() => {
                    return !!this[propertyKey];
                }));
            }
            return target._validation.rules[propertyKey].getValue();
        }
    });
}
