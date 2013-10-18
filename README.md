TSM - A TypeScript vector and matrix math library
=================================================

TSM is a a collection of vector and matrix classes written in Microsoft's new JavaScript superset *TypeScript*, which compiles to plain JavaScript. The library's design is influenced by both [gl-matrix](https://github.com/toji/gl-matrix) and [GLM](https://github.com/g-truc/glm). 

What's special about TSM?
-------------------------

- TSM makes use of TypeScript's type annotations to reduce the number of possible bugs and has been used extensively in the development of a large-scale WebGL application (more information about that project will be published soon).

- TSM makes use of JavaScript's new property definitions to enable GLSL-style swizzle operators:

        var v1 = new TSM.vec2();
        var q1 = new TSM.quat();

        v1.xy = [0, 1];
        q1.w = 1.0;

- TSM offers both non-static and static methods for many operations:

        var v1 = new TSM.vec3([1, 2, 3]);
        var v2 = new TSM.vec3([4, 5, 6]);

        var v3 = TSM.vec3.sum(v1, v2);
        var v4 = v1.copy().add(v2);

        console.log(v3.equals(v4)); // output: "true"


Building TSM
------------

This project includes a solution file for *Visual Studio 2012*. It also works with the free Express version of *Visual Studio 2012 for the Web*, which can be downloaded for free from the Microsoft website. Please install the *TypeScript plugin for Visual Studio 2012* to get syntax highlighting and IntelliSense support: http://www.microsoft.com/en-us/download/details.aspx?id=34790.

If you do not want to or cannot use Visual Studio, you can use the command line tool which comes with the plugin instead:

    tsc --target "ES5" --out "tsm-[x.y].js" -sourcemap -declarations tsm.ts

The *target* parameter is necessary for the swizzle operators (.xyz, etc.) to work.

After successful compilation, four files will be created:

- *tsm-[x.y].js:*
The compiled JavaScript source, readable
- *tsm-[x.y].min.js:*
The compiled JavaScript source, minified
- *tsm-[x.y].d.ts:*
The TypeScript declarations file, which contains a listing of all classes and methods
- *tsm-[x.y].js.map:*
A source map which maps the compiled JavaScript output to the original TypeScript source files


Using TSM
---------

### In Visual Studio

You can use a reference comment to the declarations file or a module import to get access to TSM classes.

**Reference comment:**
    
    ///<reference path='./path/to/TSM/tsm-[x.y].d.ts' />

**Module import:**
    
    import TSM = module("path/to/TSM")

### In JavaScript

If you want to use the generated JavaScript instead, simply load the compiled .js or .min.js file by use of a script tag:

    <script src="/path/to/TSM/tsm-[x.y].js"></script>


Testing TSM
-----------

The solution contains a test application. Open *TSM/Test/index.html* in a browser and bring up the console. You should see the following output:

    vec2(1,2,3) + vec2(4,5,6) = vec2(5,7,9)

    Perspective projection, 45° FOV:
    mat4([
       2.4142136573791504, 0, 0, 0
       0, 2.4142136573791504, 0, 0
       0, 0, -1.0202020406723022, -1
       0, 0, -2.0202019214630127, 0
    ]);

    vec3(90,0,0).toQuat() = quat(0.8509035110473633,0,0,0.5253219604492188) 

If instead you receive an error message along the lines of "TSM is not defined", please make sure that your script tags are properly set up.


Documentation
-------------

Unfortunately, there is no way yet to automatically generate documentation from TypeScript sources. I'll see what I can do. Please refer to [the declarations file](https://github.com/vexator/TSM/blob/master/TSM/tsm-0.7.d.ts) in the meantime.

###General design notes

Swizzle operators return numeric arrays, not vector instances:

    var v = new TSM.vec4([1, 2, 3, 4]);
    var n = v.xyz; // n = [1, 2, 3]

If, instead, you want to create a new instance of a vector or a matrix, use the copy() method:

    var v1 = new TSM.vec4([1, 2, 3, 4]);
    var v2 = v1.copy();

You can also initialize a new vector with the values of another:

    var v1 = new TSM.vec4([1, 2, 3, 4);
    var v2 = new TSM.vec4(v1.xyzw);

Or copy the values of one vector to another using the swizzle operators or the copy() method:

    v2.xyzw = v1.xyzw; // same as v1.copy(v2)

The four basic arithmetic operations can be performed on vector instances or using static methods:

    var v1 = new TSM.vec4([1, 2, 3, 4]);
    var v2 = new TSM.vec4([5, 6, 7, 8]);

    var v3 = TSM.vec4.product(v1, v2); // returns a new vec4 instance

    v1.multiply(v2); // writes the result of the multiplication into v1
    v2.multiply(v1); // writes the result of the multiplication into v2

The reason for all of these different ways of doing the same thing is that object allocation in JavaScript is slow and dynamic allocation shoud therefore be reduced to a minimum. For this reason, static methods offer an optional destination parameter:

    var v3 = TSM.vec3.cross(v1, v2) // allocates a new instance of vec3

is the same as:

    var v3 = new TSM.vec3();
    TSM.vec3.cross(v1, v2, v3) // writes into the existing instance

Matrices do not have swizzle operators. Instead, they provide the all(), row() and col() methods:

    var m = new mat2([1, 2, 3, 4]);

    var all = m.all();  // [1, 2, 3, 4]  
    var row = m.row(0); // [1, 2]
    var col = m.col(0); // [1, 3] 

