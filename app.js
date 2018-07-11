import tinybee from 'tinybee';
import User from './models/User';
console.log(tinybee);

let { createDvaApp } = tinybee

App(
    createDvaApp(
        {
            onLaunch(options) {
                // 第一次打开
                // options.query == {number:1}
                console.info('App onLaunch');
                this._store.dispatch({ type: 'user/init' });
            },
            onShow(options) {
                // 从后台被 scheme 重新打开
                // options.query == {number:1}
            }
        },
        [User]
    )
);
