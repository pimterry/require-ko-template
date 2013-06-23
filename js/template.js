define(["lib/jquery"], function ($) {
    return {
        load: function load(name, req, onLoad, config) {
            var filename = "templates/" + name + ".html";
        
            require(["text!" + filename], function (templateContent) {
                $("body").append("<script id='" + name + "' type='text/html'>" +
                                  templateContent +
                                  "</script>");
                onLoad();
            });
        }
    };
});
