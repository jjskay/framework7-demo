import Framework7 from 'framework7';
// import _ from 'lodash';
import store from './utils/locaStorage'
import customAjax from './middlewares/customAjax';
import { homeInit } from './js/home';

// init f7
const f7 = new Framework7();
const $$ = Dom7;

const mainView = f7.addView('.view-main', {
        dynamicNavbar: true
    })
    // load index
mainView.router.load({
    url: './views/home.html'
})

/*
* Trigger lazy load img.
*/
$$('img.lazy').trigger('lazy');

const initEvent = f7.onPageInit('*', (page) => {
    page.name === 'home' && homeInit(f7);
})
