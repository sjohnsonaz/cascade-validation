import Cascade from 'cascade';

import Rule from './Rule';

export interface RuleIndex {
    [index: string]: Rule<any>;
}

export default class Validation {
    parent: any;
    ruleIndex: RuleIndex = {};
    rules: Rule<any>[] = [];

    constructor(parent?: any) {
        this.parent = parent;
    }

    static attachGraph(obj) {
        if (!obj._validation) {
            Object.defineProperty(obj, '_validation', {
                configurable: true,
                writable: true,
                enumerable: false,
                value: new Validation(obj)
            });
        }
        return obj._validation as Validation;
    }

    static createProperty<T>(obj: any, property: string, rule: Rule<T>) {
        Validation.attachGraph(obj);
        //if (obj._validation.rules[property]) { }
        obj._validation.ruleIndex[property] = rule;
    }

    static createRule<T>(obj: any, property: string, rule: Rule<T>) {
        Cascade.attachObservable(obj, property + '-valid', rule);
        Validation.createProperty(obj, property, rule);
    }

    static addRule<T>(obj: any, property: string, rule: Rule<T>) {
        var validation = Validation.attachGraph(obj);
        var oldRule = validation.ruleIndex[property];
        if (oldRule) {
            var index = validation.rules.indexOf(oldRule);
            if (index >= 0) {
                validation.rules.splice(index, 1);
            }
        }
        validation.ruleIndex[property] = rule;
        validation.rules.push(rule);
    }
}
