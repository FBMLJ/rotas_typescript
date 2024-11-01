const swaggerPaths:any= {}
interface swaggerParameter {
    in: "body" | "header",
    name: string,
    required?: boolean,
    type?: "string",
    schema?: {
        "$ref": string
    }
}

export interface headerInterface{
    name: string,
    required?: boolean
}

type method = "get"| "post" | "put" | "delete";
export function createPathSwagger(path:string, metodoRequest: method,headers?: headerInterface[], body?: any, responses?: any[] ){
    if (!swaggerPaths[path]){
        swaggerPaths[path] = {}
    }
    
    
    swaggerPaths[path][metodoRequest] = {
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: getParameter(headers, body),
        responses: getResponse(responses)
    }
    
}

function getResponse(_: any){
    
}

function getParameter(headers?: headerInterface[], body?: any) : swaggerParameter[]{
    const parameters: swaggerParameter[]= [];
    // adicionando body
    if (body)
    parameters.push({
        name: "body",
        in: "body",
        required: true,
        schema: {
            $ref: `#/definitions/${body.name}`
        }
    });
    if (headers){
        headers.forEach(header => {
            parameters.push({
                name: header.name,
                in: "header",
                required: header.required,
                type: "string"
            });
        });
    }
    
    return parameters;
    
}

export  function getSwaggerPaths(){
    return swaggerPaths;
}