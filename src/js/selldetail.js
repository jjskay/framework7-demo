import config from '../config';
import customAjax from '../middlewares/customAjax';
import { home } from '../utils/template';
import { html } from '../utils/string';

function selldetailInit(f7, view, page) {
    const {infoId} = page.query;
    const callback = (data) => {
    	console.log(data)
    }

    customAjax.ajax({
        apiCategory: 'demandInfo',
        api: 'getDemandInfo',
        data: [infoId],
        type: 'get'
    }, callback);
}

module.exports = {
    selldetailInit,
}
