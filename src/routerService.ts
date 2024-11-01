import { Request, Response, Router } from 'express';
import 'reflect-metadata';
import { GeneralException, ErroNaoTratado } from 'projeto_erros_padroes';
import { createPathSwagger, headerInterface, responseInterface} from "./swaggerPaths"

interface dadosRotas{
    path: string, headers?: headerInterface[],  requestBody?: any, response?:responseInterface[]
}
const router = Router();
const callMethodClass = (target: any, propertyKey: string, req: Request, res: Response)=> {
    const instance = new target.constructor();

      const promisse: Promise<any> = instance[propertyKey](req, res);
      return promisse.catch((err: Error) => {

        if (err instanceof GeneralException){
          err.resolve(res);
        }
        else {
          (new ErroNaoTratado).resolve(res);
        }
      })

}


export function Get(dados: dadosRotas) {
    return function(target: any, propertyKey: string) {  
        createPathSwagger(target,dados.path,"get",dados.headers,dados.requestBody,dados.response)
        router.get(dados.path, (req: Request, res: Response) => {
            callMethodClass(target,propertyKey,req,res);
        });
    };
}

export function Post(dados: dadosRotas){
    return function(target: any, propertyKey: string){
        
        createPathSwagger(target,dados.path,"post",dados.headers,dados.requestBody,dados.response)
        router.post(dados.path, (req: Request, res: Response) => { 
            callMethodClass(target,propertyKey,req,res);
        })
    }
}

export function Delete(dados: dadosRotas){
    return function(target: any, propertyKey: string){
        createPathSwagger(target,dados.path,"delete",dados.headers,dados.requestBody,dados.response)    
        router.delete(dados.path, (req: Request, res: Response) => {
            callMethodClass(target,propertyKey,req,res);
        })
    }
}

export function Put(dados: dadosRotas){
    return function(target: any, propertyKey: string){
        createPathSwagger(target,dados.path,"put",dados.headers,dados.requestBody,dados.response)
        router.put(dados.path, (req: Request, res: Response) => {
            callMethodClass(target,propertyKey,req,res);
        })
    }
}

export function getRouter() {
    return router;
}
