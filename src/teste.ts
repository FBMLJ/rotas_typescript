import {  Post } from "./routerService";
import { getSwaggerPaths } from "./swaggerPaths";
class Controller {
    @Post({path: "/", requestBody: Controller, headers: [
        {name: "authorized", required: true}]
    })
    getUsuarios(_:any, __:any){}
}

new Controller();
console.log(JSON.stringify(getSwaggerPaths()));