// FIXME:用vue-router的router-link
$("#app").on("click", "a", function (event) {
    var self = $(this);
    var href = self.attr("href");
    switch (true) {
        case !href:
            event.preventDefault();
            break;
        case !(href.toLowerCase().indexOf("javascript")):
        case !(href.toLowerCase().indexOf("mailto")):
        case self.attr("target") === "_blank":
        case self.attr("download"):
            break;
        default:
            router.push(href);
            event.preventDefault();
            break;
    }
});