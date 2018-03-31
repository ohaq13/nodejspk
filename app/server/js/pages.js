"use strict";

const pages = {
    index: "index",
}

class  Pages {
    constructor(app) {
        this.app = app;
    }

    initPages(){
        // render home page 
        this.app.get('/', (req, res) => {
            res.render(pages.index, {pageName:pages.index, nocache: Date.now()});
        });
    }
}

module.exports = Pages; 