# Craco CSS Modules Plugin

![test](https://github.com/crazyurus/craco-css-modules/actions/workflows/test.yaml/badge.svg)
![publish](https://github.com/crazyurus/craco-css-modules/actions/workflows/publish.yaml/badge.svg)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![npm](https://badgen.net/npm/v/craco-css-modules)](https://www.npmjs.com/package/craco-css-modules)
[![npm dependents](https://badgen.net/npm/dependents/craco-css-modules)](https://www.npmjs.com/package/craco-css-modules?activeTab=dependents)
[![npm downloads](https://badgen.net/npm/dt/craco-css-modules)](https://www.npmjs.com/package/craco-css-modules)

This is a [craco](https://craco.js.org) plugin that adds CSS Modules support to [create-react-app](https://facebook.github.io/create-react-app/).

## Introduction

When you use `craco-css-modules`, you no longer need to add the module suffix to `css` `less` or
`scss` file names. For example:
```js
// Before
import styles from './index.module.scss';

// After
import styles from './index.scss';
```

We judge whether we should use CSS Modules based on how the less file is imported.

```js
// use CSS Modules
import styles from './index.scss';

// do not use CSS Modules
import './index.scss';
```

## Supported Versions

`craco-css-modules` is tested with:

- **react-scripts**: `^5.0.0`
- **@craco/craco**: `6.4.0` and above, `7.0.0`

And you can also use with follow plugins:

- **craco-less**: `^2.0.0`

## Installation

First, follow the [`craco` Installation Instructions](https://github.com/dilanx/craco/blob/master/packages/craco/README.md) to install the `craco` package, create a `craco.config.js` file, and modify the scripts in your `package.json`.

Then install `craco-css-modules`:

```bash
$ yarn add --dev craco-css-modules

# OR

$ npm install --dev craco-css-modules
```

## Usage

Here is a complete `craco.config.js` configuration file that adds CSS Modules rule to `create-react-app`:

```js
const CracoCSSModules = require('craco-css-modules');

module.exports = {
  plugins: [
    { plugin: CracoCSSModules }
  ],
};
```

## Example

Here is a complete example [create-react-app-with-craco](https://github.com/crazyurus/create-react-app). You can directly use this template.

## License

[MIT](./LICENSE)
