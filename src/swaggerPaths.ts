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

interface swaggerReponse {
    description?: string,
    schema?: {
        $ref: string
    }
}

export interface headerInterface{
    name: string,
    required?: boolean,
    description: string
}

export interface responseInterface {
    status: string,
    description?: string,
    classResponse: any
}

type method = "get"| "post" | "put" | "delete";
export function createPathSwagger(path:string, metodoRequest: method,headers?: headerInterface[], body?: any, responses?: responseInterface[] ){
    if (!swaggerPaths[path]){
        swaggerPaths[path] = {}
    }
    
    
    swaggerPaths[path][metodoRequest] = {
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: getParameter(headers, body),
        responses: getResponse(responses)
    }

    console.log(swaggerPaths[path][metodoRequest])
    
}

function getResponse(responses?: responseInterface[]){
    const responseObj:any = {}
    if (responses){
        responses.forEach(response=> {
            
            responseObj[response.status]={
                description: response.description ?? response.classResponse.name,
                schema: {
                    $ref: `#/definitions/${response.classResponse.name}`
                }
            } as swaggerReponse
        })
    }
    return responseObj;
    
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