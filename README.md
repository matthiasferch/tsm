tsm: A Typescript vector and matrix math library
=================================================

tsm is a a collection of vector and matrix classes written in Typescript. The library's design is influenced by both [gl-matrix](https://github.com/toji/gl-matrix) and [glm](https://github.com/g-truc/glm). 

What's special about tsm?
-------------------------

- tsm makes use of Typescript's type annotations to reduce the number of possible bugs.

- tsm makes use of Javascript's new property definitions to enable GLSL-style swizzle operators:

        var v1 = new vec2();
        var q1 = new quat();

        v1.xy = [0, 1];
        q1.w = 1.0;

- tsm offers both non-static and static methods for many operations:

        var v1 = new vec3([1, 2, 3]);
        var v2 = new vec3([4, 5, 6]);

        var v3 = vec3.sum(v1, v2);
        var v4 = v1.copy().add(v2);

        console.log(v3.equals(v4)); // output: "true"


General design notes
--------------------

Swizzle operators return numeric arrays, not vector instances:

    var v = new vec4([1, 2, 3, 4]);
    var n = v.xyz; // n = [1, 2, 3]

If, instead, you want to create a new instance of a vector or a matrix, use the copy() method:

    var v1 = new vec4([1, 2, 3, 4]);
    var v2 = v1.copy();

You can also initialize a new vector with the values of another:

    var v1 = new vec4([1, 2, 3, 4]);
    var v2 = new vec4(v1.xyzw);

Or copy the values of one vector to another using the swizzle operators or the copy() method:

    v2.xyzw = v1.xyzw; // same as v1.copy(v2)

The four basic arithmetic operations can be performed on vector instances or using static methods:

    var v1 = new vec4([1, 2, 3, 4]);
    var v2 = new vec4([5, 6, 7, 8]);

    var v3 = vec4.product(v1, v2); // returns a new vec4 instance

    v1.multiply(v2); // writes the result of the multiplication into v1
    v2.multiply(v1); // writes the result of the multiplication into v2

The reason for all of these different ways of doing the same thing is that object allocation in Javascript is slow and dynamic allocation shoud therefore be reduced to a minimum.

For this reason, static methods offer an optional destination parameter:

    var v3 = vec3.cross(v1, v2) // allocates a new instance of vec3

is the same as:

    var v3 = new vec3();
    vec3.cross(v1, v2, v3) // writes into the existing instance

Matrices do not have swizzle operators. Instead, they provide the all(), row() and col() methods:

    var m = new mat2([1, 2, 3, 4]);

    var all = m.all();  // [1, 2, 3, 4]  
    var row = m.row(0); // [1, 2]
    var col = m.col(0); // [1, 3] 

