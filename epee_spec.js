/*
 * epee
 *
 * Copyright (c) 2022 Yuichiro MORIGUCHI
 *
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 **/
/*
 * This test case is described for Jasmine.
 */
describe("epee", function() {
    beforeEach(function() {
    });

    describe("testing rational", function() {
        const rat = epee.rat;

        function make(n1, d1) {
            return rat.makeRational(n1, d1);
        }

        function compute(op, n1, d1, n2, d2) {
            return rat[op](make(n1, d1), make(n2, d2));
        }

        it("isEqual", function() {
            expect(rat.isEqual(rat.makeRational(1n, 1n), rat.makeRational(1n, 1n))).toBeTruthy();
            expect(rat.isEqual(rat.makeRational(1n, 1n), rat.makeRational(2n, 1n))).toBeFalsy();
            expect(rat.isEqual(rat.makeRational(2n, 1n), rat.makeRational(1n, 1n))).toBeFalsy();
            expect(rat.isEqual(rat.makeRational(2n, 3n), rat.makeRational(4n, 6n))).toBeTruthy();
        });

        it("add", function() {
            expect(rat.isEqual(compute("add", 2n, 3n, 2n, 5n), make(16n, 15n))).toBeTruthy();
            expect(rat.isEqual(compute("add", 2n, 3n, -2n, 5n), make(4n, 15n))).toBeTruthy();
            expect(rat.isEqual(compute("add", -2n, 3n, 2n, 5n), make(-4n, 15n))).toBeTruthy();
            expect(rat.isEqual(compute("add", -2n, 3n, -2n, 5n), make(-16n, 15n))).toBeTruthy();
        });

        it("subtract", function() {
            expect(rat.isEqual(compute("subtract", 2n, 3n, 2n, 5n), make(4n, 15n))).toBeTruthy();
            expect(rat.isEqual(compute("subtract", 2n, 3n, -2n, 5n), make(16n, 15n))).toBeTruthy();
            expect(rat.isEqual(compute("subtract", -2n, 3n, 2n, 5n), make(-16n, 15n))).toBeTruthy();
            expect(rat.isEqual(compute("subtract", -2n, 3n, -2n, 5n), make(-4n, 15n))).toBeTruthy();
        });

        it("multiply", function() {
            expect(rat.isEqual(compute("multiply", 2n, 3n, 2n, 5n), make(4n, 15n))).toBeTruthy();
            expect(rat.isEqual(compute("multiply", 2n, 3n, -2n, 5n), make(-4n, 15n))).toBeTruthy();
            expect(rat.isEqual(compute("multiply", -2n, 3n, 2n, 5n), make(-4n, 15n))).toBeTruthy();
            expect(rat.isEqual(compute("multiply", -2n, 3n, -2n, 5n), make(4n, 15n))).toBeTruthy();
        });

        it("divide", function() {
            expect(rat.isEqual(compute("divide", 2n, 3n, 2n, 5n), make(5n, 3n))).toBeTruthy();
            expect(rat.isEqual(compute("divide", 2n, 3n, -2n, 5n), make(-5n, 3n))).toBeTruthy();
            expect(rat.isEqual(compute("divide", -2n, 3n, 2n, 5n), make(-5n, 3n))).toBeTruthy();
            expect(rat.isEqual(compute("divide", -2n, 3n, -2n, 5n), make(5n, 3n))).toBeTruthy();
        });
    });

    describe("testing computed value", function() {
        const PI = Math.PI;
        const E = Math.E;

        function isok(expected, expr) {
            epee.piParser(x => expect(Math.abs(parseFloat(x) - expected) < 1e-12).toBeTruthy())("scale(" + expr + ", 14)");
        }

        it("value", function() {
            isok(PI, "pi");
            isok(E, "e");
            isok(PI + E, "pi + e");
            isok(PI + E, "pi+e");
            isok(PI - E, "pi - e");
            isok(PI * E, "pi * e");
            isok(PI / E, "pi / e");
            isok(PI + 2, "pi + 2");
            isok(PI - 2, "pi - 2");
            isok(PI * 2, "pi * 2");
            isok(PI / 2, "pi / 2");
            isok(2 + PI, "2 + pi");
            isok(2 - PI, "2 - pi");
            isok(2 * PI, "2 * pi");
            isok(2 / PI, "2 / pi");
            isok(2 + 3, "2 + 3");
            isok(2 - 3, "2 - 3");
            isok(2 * 3, "2 * 3");
            isok(2 / 3, "2 / 3");
            isok(2*PI + 3*E, "2*pi + 3*e");
            isok(2*PI + 3*E + 4, "2*pi + 3*e + 4");
            isok(2*PI*E + 3*PI*PI + 4, "2*pi*e + 3*pi*pi + 4");
            isok(1/PI + PI/E, "1/pi + pi/e");
            isok(1/PI - PI/E, "1/pi - pi/e");
            isok(1/PI * PI/E, "1/pi * pi/e");
            isok(1/PI / PI/E, "1/pi / pi/e");
            isok(E + PI/E, "e + pi/e");
            isok(E - PI/E, "e - pi/e");
            isok(E * PI/E, "e * pi/e");
            isok(E / PI/E, "e / pi/e");
            isok(PI/E + E, "pi/e + e");
            isok(PI/E - E, "pi/e - e");
            isok(PI/E * E, "pi/e * e");
            isok(PI/E / E, "pi/e / e");
            isok((PI + 1)/(E + 1), "(pi + 1)/(e + 1)");
            isok((2*PI + 1)/(3*E - 1), "(2*pi + 1)/(3*e - 1)");
            isok((0.01*PI + 2)/(0.2*PI + E), "(0.01*pi + 2)/(0.2*pi + e)")
            isok(PI, "(((((pi)))))");
            isok(2*PI + 1/3/E - 1, "2*pi + 1/3/e - 1");
            isok(-2*PI + 1/3/E - 1, "-2*pi + 1/3/e - 1");
        });
    });

    describe("testing scale", function() {
        function isok(expected, expr) {
            epee.piParser(x => expect(x).toBe(expected))(expr);
        }

        it("pi", function() {
            const pi =
                "3.14159265358979323846264338327950288419716939937510" +
                "58209749445923078164062862089986280348253421170679" +
                "82148086513282306647093844609550582231725359408128" +
                "48111745028410270193852110555964462294895493038196" +
                "44288109756659334461284756482337867831652712019091" +
                "45648566923460348610454326648213393607260249141273" +
                "72458700660631558817488152092096282925409171536436" +
                "78925903600113305305488204665213841469519415116094" +
                "33057270365759591953092186117381932611793105118548" +
                "07446237996274956735188575272489122793818301194912";
                //"98336733624406566430860213949463952247371907021798" +
                //"60943702770539217176293176752384674818467669405132" +
                //"00056812714526356082778577134275778960917363717872" +
                //"14684409012249534301465495853710507922796892589235" +
                //"42019956112129021960864034418159813629774771309960" +
                //"51870721134999999837297804995105973173281609631859" +
                //"50244594553469083026425223082533446850352619311881" +
                //"71010003137838752886587533208381420617177669147303" +
                //"59825349042875546873115956286388235378759375195778" +
                //"18577805321712268066130019278766111959092164201989";
            isok(pi, "scale(pi, 500)");
        });

        it("e", function() {
            const e =
                "2.71828182845904523536028747135266249775724709369995" +
                "95749669676277240766303535475945713821785251664274" +
                "27466391932003059921817413596629043572900334295260" +
                "59563073813232862794349076323382988075319525101901" +
                "15738341879307021540891499348841675092447614606680" +
                "82264800168477411853742345442437107539077744992069" +
                "55170276183860626133138458300075204493382656029760" +
                "67371132007093287091274437470472306969772093101416" +
                "92836819025515108657463772111252389784425056953696" +
                "77078544996996794686445490598793163688923009879312";
            isok(e, "scale(e, 500)");
        });

        it("rational", function() {
            isok("7.6500000000", "scale(7.65, 10)");
            isok("0.7650000000", "scale(0.765, 10)");
            isok("0.0000765000", "scale(0.0000765, 10)");
            isok("-7.6500000000", "scale(-7.65, 10)");
            isok("-0.7650000000", "scale(-0.765, 10)");
            isok("-0.0000765000", "scale(-0.0000765, 10)");
        });
    });

    describe("expand continuted fraction", function() {
        function isok(expected, expr) {
            epee.piParser(x => expect(x).toBe(expected))(expr);
        }

        it("pi", function() {
            isok("[3;7,15,1,292,1,1,1,2,1,3,...]", "expand(pi, 10)");
            isok("[0;7,15,1,292,1,1,1,2,1,3,...]", "expand(pi - 3, 10)");
            isok("[-1;7,15,1,292,1,1,1,2,1,3,...]", "expand(pi - 4, 10)");
        });

        it("e", function() {
            isok("[2;1,2,1,1,4,1,1,6,1,1,8,1,1,10,...]", "expand(e, 14)");
            isok("[0;1,2,1,1,4,1,1,6,1,1,8,1,1,10,...]", "expand(e - 2, 14)");
            isok("[-1;1,2,1,1,4,1,1,6,1,1,8,1,1,10,...]", "expand(e - 3, 14)");
        });

        it("rational", function() {
            isok("765", "expand(765, 10)");
            isok("[0;2]", "expand(1/2, 10)");
            isok("[0;3,2,3]", "expand(7/24, 10)");
            isok("[0;3,2,3]", "expand(7/24, 3)");
            isok("[0;3,2,...]", "expand(7/24, 2)");
            isok("[0;3,2,3]", "expand([0;3,2,3], 10)");
            isok("[0;3,2,3]", "expand([  0  ;  3  ,  2  ,  3  ], 10)");
            isok("[2;3,2,3]", "expand([2;3,2,3], 10)");
            isok("[-2;3,2,3]", "expand([-2;3,2,3], 10)");
        });
    });
});

