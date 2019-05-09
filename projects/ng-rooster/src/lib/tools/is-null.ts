import { isBoolean } from 'util';

export function isNull(val: any): boolean
{
    if(val)
      return false;
    else if(isBoolean(val))
        return false;
      else  
        return true;
}      
