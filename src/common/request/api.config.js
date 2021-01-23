const apiConfig = {
    getApiRoot() {
        let webapi = "";
        let webapish = "";
        if (process.env.NODE_ENV === 'development') {
            const apiType = 0;
            switch (apiType) {
                case 0:
                    webapi = "//10.17.34.96:8101/webapi";// 测试环境
                    webapish = "//10.8.11.61:8101";// 覃士蘅

                    // order = "//192.168.31.63:8081/order";
                    // mall = "//192.168.31.63:8082/mall";
                    break;
                case 1:
                    webapi = "//10.8.11.240:8101/webapi";// 甘德锦
                    webapish = "//10.8.11.61:8101";// 覃士蘅
                    break;
                case 2://业财（前期拿来项目搭建接口测试）
                    webapi = "//10.88.15.160:13301/webapi";
                    webapish = "//10.8.11.61:8101";// 覃士蘅
                    break;
                case 3:
                    webapi = "//10.8.11.61:8101/webapi";//覃士蘅
                    webapish = "//10.8.11.61:8101";// 覃士蘅
                    break;


                    //http://10.8.11.61:8101/portal/sendSuperSMS
                default:
                    webapi = "//10.88.15.160:13301/webapi";
                    webapish = "//10.88.15.160:13301";// 覃士蘅
            }

        } else {
            // 部署
            const baseAPI = process.env.VUE_APP_API === 'test' ? '//10.88.15.160:13301/' : "//10.88.15.160:13301/";
            webapi = baseAPI + 'webapi';
            // mall = baseAPI + 'mall';
            // order = baseAPI + 'order';
        }
        return {webapi, webapish};
    }
};


export default apiConfig;



