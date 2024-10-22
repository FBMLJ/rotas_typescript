import { Request, Response, Router } from 'express';
import 'reflect-metadata';
import { GeneralException, ErroNaoTratado } from 'projeto_erros_padroes';

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


export function Get(path: string) {
    return function(target: any, propertyKey: string) {  
        router.get(path, (req: Request, res: Response) => {
            callMethodClass(target,propertyKey,req,res);
        });
    };
}

export function Post(path: string){
    return function(target: any, propertyKey: string){
        router.post(path, (req: Request, res: Response) => {
            callMethodClass(target,propertyKey,req,res);
        })
    }
}

export function Delete(path: string){
    return function(target: any, propertyKey: string){
        router.delete(path, (req: Request, res: Response) => {
            callMethodClass(target,propertyKey,req,res);
        })
    }
}

export function Put(path: string){
    return function(target: any, propertyKey: string){
        router.put(path, (req: Request, res: Response) => {
            callMethodClass(target,propertyKey,req,res);
        })
    }
}

export function getRouter() {
    return router;
}
