import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import PDVSchema from './schemas/PDV';

const app = express();

app.set('port', 8888);

app.set('view engine', 'pug');

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: PDVSchema }));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.use('/', (req, res) => {
  res.render('index');
});

app.listen(app.get('port'), () => {
  console.log(`Now browse to http://localhost:${app.get('port')}/graphiql`);
});
