const apiConfig = {
    getApiRoot() {
        let webapi = "";
        if (process.env.NODE_ENV === 'development') {
            const apiType = 2;
            switch (apiType) {
                case 0:
                    webapi = "//10.88.15.160:13301/webapi";
                    // order = "//192.168.31.63:8081/order";
                    // mall = "//192.168.31.63:8082/mall";
                    break;
                case 1:
                    webapi = "//10.88.15.160:13301/webapi";
                    break;
                case 2://测试环境
                    webapi = "//10.88.15.160:13301/webapi";
                    break;
                default:
                    webapi = "//10.88.15.160:13301/webapi";
            }

        } else {
            // 部署
            const baseAPI = process.env.VUE_APP_API === 'test' ? '//10.88.15.160:13301/' : "//10.88.15.160:13301/";
            webapi = baseAPI + 'webapi';
            // mall = baseAPI + 'mall';
            // order = baseAPI + 'order';
        }
        return {webapi};
    }
};


export default apiConfig;



