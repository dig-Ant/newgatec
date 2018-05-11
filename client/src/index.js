import dva from 'dva';
import './index.css';
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

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
