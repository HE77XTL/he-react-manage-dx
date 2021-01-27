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
        if (!data && data !== 0) {
            return '-'
        } else {
            return data
        }
    },

    languageTypeFmt(type) {
        // 前后端没提前沟通。。。
        // 不过前端考虑也欠缺了，中文也分简体/繁体， 具体需要繁体的时候，再和后端协商统一字段
        switch (type) {
            case 'zh':
                return 'zh-cn';
            case 'en':
                return 'en-us';
            default:
                return 'en-us';
        }
    }
};

export default utils
