define(["template"], function(template) {
    describe("Load function", function() {
        beforeEach(function () {
            this.addMatchers({
                toContainTemplate: function (expected) {
                    var actualHTML = this.actual.innerHTML;
                    this.message = function () {
                        return "Expected " + actualHTML + " to contain a script with id " + expected;
                    };

                    return actualHTML.indexOf('<script id=\"' + expected + '"') != -1;
                }
            });
        });

        it("can load a default template", function() {
            var done = false;
            template.load('default', null, function () {
                done = true;
            }, {});

            waitsFor(function () {
                return done;
            });

            runs(function () {
                expect(document.body).toContainTemplate('default');
            });
        });

        it("loads the template containing the correct content", function() {
            var done = false;
            template.load('default', null, function () {
                done = true;
            }, {});

            waitsFor(function () {
                return done;
            });

            runs(function () {
                expect(document.getElementById("default").innerHTML).toContain("default template content");
            });
        });
    });
});
