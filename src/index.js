import dva from 'dva'
import * as _ from 'lodash'
// 1. Initialize
const app = dva()

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/Func').default)
app.model(require('./models/Project').default)
app.model(require('./models/Editing').default)
app.model(require('./models/Material').default)
app.model(require('./models/Issue').default)
app.model(require('./models/Common').default)
app.model(require('./models/Healthz').default)
app.model(require('./models/Article').default)
app.model(require('./models/Authority').default)

// 4. Router
app.router(require('./router').default)

// 5. Start
app.start('#root')
