# Cascade Valication

[![Build Status](https://travis-ci.org/sjohnsonaz/cascade-validation.svg?branch=master)](https://travis-ci.org/sjohnsonaz/cascade-validation) [![npm version](https://badge.fury.io/js/cascade-validation.svg)](https://badge.fury.io/js/cascade-validation)

This library extends Cascade by introducing validation support.

Simply use validation decorators before observable properties.

```typescript
import {observable} from 'cascade';
import {required} from 'cascade-validation';

export default class User {
    @required @observable firstName: string = '';
    @required @observable lastName: string = '';
}
```
