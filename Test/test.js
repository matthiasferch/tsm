///<reference path='./../../TSM/tsm-0.7.d.ts' />
window.onload = function () {
    var v1 = new TSM.vec3([1, 2, 3]);
    var v2 = new TSM.vec3([4, 5, 6]);

    var v3 = TSM.vec3.sum(v1, v2);

    console.log('vec2(' + v1.xyz + ') + vec2(' + v2.xyz + ') = vec2(' + v3.xyz + ')');

    var m1 = TSM.mat4.perspective(45, 1, 1, 100);

    console.log('Perspective projection, 45 degree FOV:');
    console.log('mat4([');
    console.log('   ' + m1.row(0)[0] + ', ' + m1.row(0)[1] + ', ' + m1.row(0)[2] + ', ' + m1.row(0)[3]);
    console.log('   ' + m1.row(1)[0] + ', ' + m1.row(1)[1] + ', ' + m1.row(1)[2] + ', ' + m1.row(1)[3]);
    console.log('   ' + m1.row(2)[0] + ', ' + m1.row(2)[1] + ', ' + m1.row(2)[2] + ', ' + m1.row(2)[3]);
    console.log('   ' + m1.row(3)[0] + ', ' + m1.row(3)[1] + ', ' + m1.row(3)[2] + ', ' + m1.row(3)[3]);
    console.log(']);');

    var v4 = new TSM.vec3([90, 0, 0]);

    var q1 = v4.toQuat();

    console.log('vec3(' + v4.xyz + ').toQuat() = quat(' + q1.xyzw + ')');
};
//# sourceMappingURL=test.js.map
