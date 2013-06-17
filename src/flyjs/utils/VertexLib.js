/**
 *
 * @author Oleg Pimenov, https://github.com/fost
 *
 */
/*jslint nomen: true, plusplus: true, vars: true, eqeq: true */
/*global flyjs, createjs, extend*/

this.flyjs = this.flyjs || {};

(function () {

    'use strict';
    /**
     * A helper for common key codes
     * @class VertexLib
     * @constructor
     */
    var VertexLib = function () {
        throw "VertexLib cannot be instantiated.";
    };

    /**
     * SAT edge test
     */
    VertexLib.testEdges = function (shape1, shape2) {
        var i = 0,
            pointSibling,
            edge,
            perpendicular;

        for (i; i < shape1.length; i++) {
            // Get the current edge
            if (i + 1 < shape1.length) {
                pointSibling = i + 1;
            } else {
                pointSibling = 0;
            }
            // Might need to be an absolute difference, not too sure
            edge = this.subtract(shape1[i], shape1[pointSibling]);

            // Turn edge into a perpendicular line
            perpendicular = this.vertex(-edge[1], edge[0]);

            // Test the sign of each opposing square's point, returns false here if a gap is detected
            if (this.separationTest(perpendicular, shape1[pointSibling], shape2)) {
                return false;
            }
        }

        // No gap between edges
        return true;
    };

    /**
     * SAT test to look for a gap
     */
    VertexLib.separationTest = function (perpendicular, shape1, shape2) {
        var j = 0,
            shape2Length = shape2.length,
            testResult;

        for (j; j < shape2Length; j++) {
            // Four consecutive 1s or 0s mean that there is a gap
            testResult = flyjs.MathUtil.sign(perpendicular[0] * (shape2[j][0] - shape1[0]) + perpendicular[1] * (shape2[j][1] - shape1[1]));

            // 0 and 1 indicates a gap may be present, -1 indicates that there is no gap
            if (testResult === -1) {
                return false;
            }
        }

        // Gap is present
        return true;
    };

    VertexLib.sat = function (shape1, shape2) {
        var isCollide = true;
        if (this.testEdges(shape1, shape2) === false || this.testEdges(shape2, shape1) === false) {
            isCollide = false;
        }
        return isCollide;
    };

    /**
     * cartesian graph vertex point
     * @param x
     * @param y
     * @returns {Array}
     */
    VertexLib.vertex = function (x, y) {
        return [x, y];
    };

    /**
     * square: {
     *  x,
     *  y,
     *  width,
     *  height,
     *  angel
     * }
     * @param square {Object}
     */
    VertexLib.convertSquare = function (square) {
        // Convert center x and y to top left x and y, must be done since we're moving squares from the center
        square.center = this.vertex(square.x + (square.width / 2), square.y + (square.height / 2));

        var points = [
            // top left
            this.vertex(square.x, square.y),

            // top right
            this.vertex(square.x + square.width, square.y),

            // bottom right
            this.vertex(square.x + square.width, square.y + square.height),

            // bottom left
            this.vertex(square.x, square.y + square.height)
        ];

        if (typeof square.angle === 'number' && square.angle !== 0) {
            var rad = flyjs.MathUtil.degreesToRadian(square.angle),
                i = points.length;
            while (i) {
            //for (i; i--;) {
                var rotatedPoint = this.rotatePoint(square.center, points[i], rad);
                points[i][0] = rotatedPoint[0];
                points[i][1] = rotatedPoint[1];
            }
        }
        return points;
    };

    VertexLib.angleBetweenPoints = function (startVert, endVert) {
        return Math.atan2(-(endVert[1] - startVert[1]), endVert[0] - startVert[0]);
    };

    VertexLib.rotatePoint = function (axis, point, angle) {
        var location = [
            point[0] - axis[0],
            point[1] - axis[1]
        ];

        var x = axis[0] + location[0] * Math.cos(angle) - location[1] * Math.sin(angle);
        var y = axis[1] + location[0] * Math.sin(angle) + location[1] * Math.cos(angle);

        return [x, y];
    };

    VertexLib.add = function (vertexFirst, vertexSecond) {
        return [
            vertexFirst[0] + vertexSecond[0],
            vertexFirst[1] + vertexSecond[1]
        ];
    };

    VertexLib.subtract = function (vertexFirst, vertexSecond) {
        return [
            vertexFirst[0] - vertexSecond[0],
            vertexFirst[1] - vertexSecond[1]
        ];
    };

    flyjs.VertexLib = VertexLib;
}());