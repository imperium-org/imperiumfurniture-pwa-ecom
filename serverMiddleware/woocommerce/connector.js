import express from 'express';
import bodyParser from 'body-parser';
import WooCommerceApi from '@woocommerce/woocommerce-rest-api';

const getConnector = () => {
  const apiSettings = {
    url: 'https://imperiumfurniture.com',
    consumerKey: 'ck_2da043ae6ae4b0b871a9b18992e6f41b0e1661f2',
    consumerSecret: 'cs_b243c283ebe3f0ffff312b8c26f0f67ef8923985',
    version: 'wc/v3',
    queryStringAuth: true
  };

  return new WooCommerceApi(apiSettings);
}

const app = express();

app.use(bodyParser.json());

app.all('*', async function (req, res, next) {
  const connector = getConnector();

  const method = req.method.toLowerCase();
  const requestArgs = req.method === 'GET' ? req.query : req.body;

  const apiEndpointUrl = req.url;
  const apiEndpoint = apiEndpointUrl.substring(1);

  const responseData = await connector[method](apiEndpoint, requestArgs).then(apiRes => apiRes.data);

  res.json(responseData);

  next();
});

export default app;
