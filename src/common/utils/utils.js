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
        const isValid = Moment(date).isValid();
        if (isValid === false || !date) {
            return '-'
        } else {
            return Moment(date).format(formatType)
        }
    },
    emptyFilter(data) {
        // '' | null | undefined  返回 "-"
        if(!data && data !== 0) {
            return '-'
        }else {
            return data
        }
    }
};

export default utils
