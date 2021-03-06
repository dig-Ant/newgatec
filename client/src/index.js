import dva from 'dva';
import 'babel-polyfill';
import './index.less';
// test


// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/handleToken').default);
app.model(require('./models/homepage').default);
app.model(require('./models/activation').default);
app.model(require('./models/wxSdk').default);
app.model(require('./models/validUser').default);
app.model(require('./models/salary').default);
app.model(require('./models/welfare').default);
app.model(require('./models/ticket').default);
app.model(require('./models/company').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

export default app._store;
