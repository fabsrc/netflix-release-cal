# 📆 Netflix Release Cal

💬  Returns an iCal calendar for all upcoming Netflix releases of a certain country.

🚀 Built with Cloudflare Workers and Cloudflare Workers KV.

## API

### `GET /:country`

_Returns release calendar for specified `country`._

**Examples**

- `GET /DE` - Get upcoming releases in Germany
- `GET /AT` - Get upcoming releases in Austria
- `GET /CH` - Get upcoming releases in Switzerland
- `GET /US` - Get upcoming releases in the USA
- `GET /GB` - Get upcoming releases in the United Kingdom

## Develop

```sh
npm run dev
```


## Deploy

```sh
npm run deploy
```
