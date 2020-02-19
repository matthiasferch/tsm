ts-matrix: A Typescript vector and matrix math library
=================================================

ts-matrix is a collection of vector, matrix and quaternion classes written in Typescript. 

How to install it
=================

Using `npm` or `yarn`

```bash
npm install --save ts-matrix
yarn add ts-matrix
```

Or add the cdn link to your html

```html
<link src="TODO/ts-matrix.js">
```

The library is built as a UMD module, so you can import from both frontend-script (AMD) and NodeJS (CommonJS).

Usage
--------------------

Import the module, from Typescript or ES6 javascript.

```typescript
import { Vector, Matrix } from 'tsmatrix';
```

Then use the methods as you want :)

```typescript
const v1 = new Vector([1, 2]);
const v2 = new Vector([3, 1]);
v1.add(v2);
// ==> [4, 3]
```

Most operation return a new Vector instance.

If you use typescript, the declarations files are available with self documentation.