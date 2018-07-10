import tinybee from 'tinybee';

const mapState = ({ user, loading }) => {
    return {
        ...user,
        loading
    };
};

const mapFunc = dispatch => {
    return {
        defaultTap() {
            dispatch({ type: 'user/countTest' });
        },

        queryLocation() {
            dispatch({ type: 'user/getLocation' });
        }
    };
};

Page(
    tinybee.core.connect(mapState, mapFunc)({
        onLoad(query) {
            // 页面加载
            console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
        },
        onReady() {
            // 页面加载完成
        },
        onShow() {
            // 页面显示
        },
        onHide() {
            // 页面隐藏
        },
        onUnload() {
            // 页面被关闭
        },
        onTitleClick() {
            // 标题被点击
        },
        onPullDownRefresh() {
            // 页面被下拉
        },
        onReachBottom() {
            // 页面被拉到底部
        },
        onShareAppMessage() {
            // 返回自定义分享信息
            return {
                title: 'My App',
                desc: 'My App description',
                path: 'pages/index/index'
            };
        }
    })
);
