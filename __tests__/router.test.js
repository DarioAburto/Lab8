/**
 * @jest-environment jsdom
 */
import {pushToHistory} from '../scripts/router.js';

 describe('checks pushToHistory', () => {

    test('pushing settings', () => {
        let history = pushToHistory('settings',1);
        expect(history.state['page']).toEqual('settings');
    });

    test('pushing entry', () => {
        let history = pushToHistory('entry', 1);
        expect(history.state.page).toEqual('entry1');
        console.log(history.state.page);
    });
    test('pushing default', () => {
        let history = pushToHistory('',1);
        expect(history.state.page).toEqual();
    });

    test('history length', () => {
        expect(history.length).toEqual(4);
    });


});