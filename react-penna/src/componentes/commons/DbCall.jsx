import axios from 'axios';
import store from '../../store';
import * as ApiAuth from '../../api/autenticacion_api';

export function DbCall(args) {
    const base_url='http://localhost:8000/api/';
    const token= localStorage.getItem('id_token');
    console.log("token",token);
    var promise = new Promise(function(resolve, reject) {
        axios({method: args.metodo,url:base_url+args.url,params: args.params,headers:{'Content-Type': 'application/x-www-form-urlencoded','Authorization': `Bearer ${token}`}})
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
         })
         .catch(error => {
              switch (error.response.data.error) {
                case 'token_expired':
                  ApiAuth.logoutUser();
                  break
              }
              reject(error.response.data.error);
            })
    });
    return promise;
}
