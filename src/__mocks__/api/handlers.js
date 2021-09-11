// src/mocks/handlers.js
import { rest } from 'msw';
import jsonResponse from './response';

const handlers = [
  // Handles a GET /user request
  /* rest.get('/v2/country/Z4;Z7;ZJ;ZQ;XU;8S;ZG;XM;XN;XT;XD/indicator/NY.GNP.PCAP.CD',
    (req, res, ctx) => res(ctx.json('hi'), ctx.delay(150))), */
  rest.get('/v2/country/Z4;Z7;ZJ;ZQ;XU;8S;ZG;XM;XN;XT;XD/indicator/NY.GNP.PCAP.CD', (req, res, ctx) =>
  // If authenticated, return a mocked user details
    res(
      ctx.status(200),
      ctx.json(jsonResponse),
    )),
];

/* const query = req.url.searchParams; /v2/country/Z4;Z7;ZJ;ZQ;XU;8S;ZG;XM;XN;XT;XD/indicator/NY.GNP.PCAP.CD
      const format = query.get("format");
      const mrv = query.get("mrv");
      const gapfill = query.get("gapfill"); */

/* const handlers = [
  rest.get("/v2/country/Z4;Z7;ZJ;ZQ;XU;8S;ZG;XM;XN;XT;XD/indicator/NY.GNP.PCAP.CD", (req, res, ctx) => {
    const query = req.url.searchParams
    const format = query.get("json")
    const mrv = query.get("1")
    const gapfill = query.get("Y")
  })
]; */

/* const handlers = [
  rest.get('/v2/country/Z4;Z7;ZJ;ZQ;XU;8S;ZG;XM;XN;XT;XD/indicator/NY.GNP.PCAP.CD?format=json&mrv=1&gapfill=Y',
    (req, res, ctx) => res(ctx.json(jsonResponse), ctx.delay(150))),
]; */

export default handlers;
