const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const PORT = process.env.PORT || 4000;
app.use('/graphql', graphqlHTTP({}));
app.listen(PORT, () => {
    console.info(`port ${PORT} listenin`);
});
//# sourceMappingURL=app.js.map