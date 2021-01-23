import CryptoJS from 'crypto-js';
import Moment from 'moment'


const utils = {
    typeTranslate(type, valueKey, nameKey, dict) {
        // dict 数据类型
        // [
        //     {
        //         value: '123',
        //         name: '456',
        //     },
        //     {
        //         value: '123',
        //         name: '456',
        //     },
        // ]
        // 常用于翻译，因此默认返回 '-'
        let translateItem = '-';
        if (!valueKey && valueKey !== 0) {
            return translateItem
        }
        for (let i = 0, len = dict.length; i < len; i++) {
            if (dict[i][valueKey] === type) {
                translateItem = dict[i][nameKey]
            }
        }
        return translateItem
    },
    dateToString(date, formatType) {
        // 如果传进来的是非法date, 则返回 '-'
        const xx = Moment(date).isValid();
        if (xx === false || !date) {
            return '-'
        }else {
            return Moment(date).format(formatType)
        }
    }
};

export default utils
