// const _DbCall(metodo='get',url,params={}){
//
// }
import axios from 'axios';
import store from '../../store';

export function DbCall(args) {
    const base_url='http://localhost:8000/api/';
    var promise = new Promise(function(resolve, reject) {
        axios({method: args.metodo,url:base_url+args.url,params: args.params,headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
        .then(response => {
                if (response.data.success){
                    if (typeof args.callbackParams == "undefined"){
                        store.dispatch(args.callback(response.data.result));
                    }
                    else{
                        store.dispatch(args.callback(args.callbackParams));
                    }
                    resolve(1);
                }
                else{
                    console.log(response.data.msg);
                    reject(response.data.msg);
                }
         });
    });
    return promise;
}
