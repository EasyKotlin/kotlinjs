requirejs.config({
    paths: {
        kotlin: '../web/kotlin',
        output: '../web/output'
    }
});

requirejs(["kotlin","output"], function (Kotlin,output) {
    console.log(JSON.stringify(output))
});
