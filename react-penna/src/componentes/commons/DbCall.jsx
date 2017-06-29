// const _DbCall(metodo='get',url,params={}){
//
// }
import axios from 'axios';
import store from '../../store';

export function DbCall(args) {
   	return axios({method: args.metodo,url:args.url,params: args.params,headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
    .then(response => {
            if (response.data.success){
                if (typeof args.callbackParams == "undefined"){
                    store.dispatch(args.callback(response.data.result));
                }
                else{
                    store.dispatch(args.callback(args.callbackParams));
                }
            }
            else{
                console.log("ERRORRRRRRR ");
            }
       return response;
     });
}
