
import {e, evaluate} from 'mathjs'
export const calculate  = (
    type:string,
    value:string,
    equation:string,
    setEquation:Function,
    setResult:Function
) => {
    try{
   switch(type){
    case  'delete':
        setEquation('0')
        setResult(0)
        break;
    case 'operation':
        if (equation === '0' && value !== '-'){
            setEquation('0')
        }
       else  if (["+","-","*","/","%"].includes(equation.slice(-1))){
        console.log("i am here1")
            setEquation(equation.slice(0,-1)+value)
        }
        else{
            setEquation((equation === '0'? '' : equation)+ value)
        }
        break;
    case  'calculate':
        const res = evaluate(["+","-","*","/","%"].includes(equation.slice(-1))? equation.slice(0,-1):equation)
        setResult(res)
        setEquation(res+'')
        break;
    case 'deleteLastOne':
        if(equation.length === 1){
            setEquation('0')
            setResult(0);
        }
        setEquation(equation.slice(0,-2))
        setResult("hidden")
        break;
    case 'decimal':
        const lastNumber = equation.split(/[-+*/%]/).pop()
        if(!lastNumber?.includes('.')){
            console.log("i am here",lastNumber)
            console.log("i am here2")
            setEquation(equation + value)
            setResult(evaluate(equation + value))
        }
        break;
    case 'number':
        console.log("i am here3",equation,value,type)
        setEquation(equation === '0'? value : equation + value)
        setResult(evaluate(equation + value))
        break;
   }
}
    catch(e){
        setResult('Error')
    }
}


