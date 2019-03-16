const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();

app.use('graphql', graphqlHTTP({

}));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
