TSM - A TypeScript vector and matrix math library
=================================================

TSM is a a collection of vector and matrix classes written in Microsoft's new JavaScript superset *TypeScript*. It compiles to plain JavaScript.

What's special about TSM?
-------------------------

- TSM makes use of TypeScript's type annotations to reduce the number of possible bugs and has been used extensively in the development of a large-scale WebGL application (more information about that project will be published soon).

- TSM makes use of JavaScript's new property definitions to enable GLSL-style element access:

        myVector.xy = [0, 1]
        myQuaternion.w = 1.0

- TSM offers both non-static and static methods for many operations:

        var v1 = new TSM.vec3([1, 2, 3]);
        var v2 = new TSM.vec3([4, 5, 6]);

        var v3 = TSM.vec3.sum(v1, v2);
        var v4 = v1.copy().add(v2);

        console.log(v3.equals(v4)) // output: "true"


Building TSM
------------

This project includes a solution file for Visual Studio 2012. It also works with the free Express version of Visual Studio 2012 for the Web, which can be downloaded for free from the Microsoft website. Please install the TypeScript plugin for Visual Studio 2012 to get syntax highlighting and IntelliSense support: http://www.microsoft.com/en-us/download/details.aspx?id=34790.

If you do not want to or cannot use Visual Studio, you can use the command line tool which comes with the plugin instead:

    tsc --target "ES5" --out "tsm-[x.y].js" -sourcemap -declarations tsm.ts

The *target* parameter is necessary for the property definitions (.xyz, etc.) to work.

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

The solution contains a test application. Open TSM/Test/index.html in a browser and bring up the console. You should see the following output:

    vec2(1,2,3) + vec2(4,5,6) = vec2(5,7,9)

    Perspective projection, 45° FOV:
    mat4([
       2.4142136573791504, 0, 0, 0
       0, 2.4142136573791504, 0, 0
       0, 0, -1.0202020406723022, -1
       0, 0, -2.0202019214630127, 0
    ]);

    vec4(90,0,0).toQuat() = quat(0.8509035110473633,0,0,0.5253219604492188) 

If instead you receive an error message along the lines of "TSM is not defined", please make sure that your script tags are properly set up.


Documentation
-------------

Unfortunately, there is no way yet to automatically generate documentation from TypeScript sources. I'll see what I can do. Please refer to the declarations file in the meantime.