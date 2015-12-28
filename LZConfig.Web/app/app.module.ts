((): void => {
    "use script";

    angular.module("app", [
        "app.core",
        "app.layout",
        "app.services",
        "app.widgets",
        "app.blocks",
        //Features
        "app.applications"
    ]);
    }
)();