import request from '../request/axios';
import api from '../request/api/api';

const commonRes = {
    getDynamicSecretKey() {
        return new Promise(resolve => {
            api.getDynamicSecretKey().then(res => {
                resolve(res);
            });
        });
    },
};

export default commonRes;
