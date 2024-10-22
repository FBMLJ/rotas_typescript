import { Router } from 'express';
import { Get,Post,Delete,Put } from './routerService';


let appInstance: Router = Router() ;

export function getRouter(){
    return appInstance
}

export {Get,Post,Delete,Put};