define(function () {
    return {
        load: function load(name, req, onLoad) {
            var filename = "templates/" + name + ".html";
        
            require(["text!" + filename], function (templateContent) {
                var node = document.createElement("script");
                node.id = name;
                node.type = "text/html";
                node.innerHTML = templateContent;
                document.body.appendChild(node);
                onLoad();
            });
        }
    };
});
