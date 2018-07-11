import tinybee from 'tinybee';
let { bee } = tinybee;
console.log('asd', bee);

export default {
  namespace: 'user',

  state: {
    countTime: 0,
    userInfo: {},
  },

  reducers: {
    getSysInfoSuccess(state, action) {
      const sysInfo = action.payload;
      return { ...state, sysInfo };
    },
    getLocationSuccess(state, action) {
      const location = action.payload;
      return { ...state, location };
    },
    getUserInfoSuccess(state, action) {
      const { userInfo } = action.payload;
      return { ...state, userInfo };
    },
    countAdd(state) {
      console.log('countAdd', state);
      let countTime = state['countTime'] + 1;
      console.log(countTime);
      return { ...state, countTime };
    }
  },

  effects: {
    *countTest(action, { call, put }) {
        yield put({ type: 'countAdd' })
    },
    *getSysInfo(action, { call, put }) {
      const sysInfo = yield call(bee.asyncApi, 'getSystemInfo');
      yield put({ type: 'getSysInfoSuccess', payload: sysInfo })
    },

    *getLocation(action, { call, put }) {
      try {
        const location = yield call(bee.asyncApi, 'getLocation');
        yield put({ type: 'getLocationSuccess', payload: location })
      } catch (e) {
        console.log(e);
      }
    },

    *getUserInfo(action, { call, put }) {
      let userInfo;
      try {
        let code = yield call(bee.asyncApi, 'getAuthCode', { scopes: 'auth_user'});
        console.log(code)
        const userInfo  = yield call(bee.asyncApi, 'getAuthUserInfo');
        yield call(bee.asyncApi, 'setStorage', { key: 'userInfo', data: userInfo });
      } catch(e) {
          console.log(e);
      }

      if (userInfo) {
        yield put({ type: 'getUserInfoSuccess', payload: { userInfo } });
      }
    },

    *init(action, { all, put }) {
      yield all([
        put({ type: 'getUserInfo' }),
        put({ type: 'getLocation' }),
        put({ type: 'getSysInfo' }),
      ]);
    }
 },

};