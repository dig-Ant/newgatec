import dva from 'dva';
import './index.css';


const sys = require('../core/sys');
console.log(sys.cfg)
// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
app.model(require('./models/OAuth').default);
app.model(require('./models/handleToken').default);
app.model(require('./models/homepage').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
