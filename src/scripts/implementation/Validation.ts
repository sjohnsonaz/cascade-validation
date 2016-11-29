import Cascade from 'cascade';

import Rule from './Rule';

export interface RuleIndex {
    [index: string]: Rule<any>;
}

export default class Validation {
    parent: any;
    rules: RuleIndex = {};

    constructor(parent?: any) {
        this.parent = parent;
    }

    static attachGraph(obj) {
        if (!obj._graph) {
            Object.defineProperty(obj, '_validation', {
                configurable: true,
                writable: true,
                enumerable: false,
                value: new Validation(obj)
            });
        }
    }

    static createProperty<T>(obj: any, property: string, rule: Rule<T>) {
        Validation.attachGraph(obj);
        //if (obj._validation.rules[property]) { }
        obj._validation.rules[property] = rule;
    }

    static createRule<T>(obj: any, property: string, rule: Rule<T>) {
        Cascade.attachObservable(obj, property + '-valid', rule);
        Validation.createProperty(obj, property, rule);
    }
}
