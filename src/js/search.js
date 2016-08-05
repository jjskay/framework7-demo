import config from '../config/';
import customAjax from '../middlewares/customAjax';
import { trim, html } from '../utils/string';

function searchInit(f7, view, page) {
    const $$ = Dom7;
    const input = $$('.search-page-input');
    const clear = $$('b.searchbar-clear');
    const hideVal = $$('.search-val');
    const list = $$('.search-return-list');
    let searchVal = '';

    const singleLink = (data) => {
        const { name, id } = data;
        let li = '';
        li += '<a href="' + `./views/filter.html?keyvalue＝${name}` + '">' + name + '</a>';
        return li;
    }

    const callback = (data) => {
        let listHtml = '';
        if (!data.data.length) {
            return;
        }

        $$.each(data.data, (index, item) => {
            listHtml += singleLink(item);
        })
        html(list, listHtml, f7);
    }

    clear.on('click', () => {
        input.val('');
        clear.removeClass('on');
        hideVal.removeClass('on').find('span').html('');
    })

    setTimeout(function() {
        input.focus();
    }, 900);
    input.on('keyup', () => {
        const val = input.val();
        if (val === '') {
            hideVal.removeClass('on').find('span').html('');
            clear.removeClass('on');
        } else {
            hideVal.addClass('on').find('span').html(`“${val}”`);
            clear.addClass('on');
        }

        if (trim(searchVal) !== trim(val) && val !== '') {
            searchVal = val;

            customAjax.ajax({
                apiCategory: 'demandInfo',
                api: 'getFishTypeList/5',
                data: [val],
                type: 'get',
                noCache: true
            }, callback)
        }
    })
}

module.exports = {
    searchInit
}
