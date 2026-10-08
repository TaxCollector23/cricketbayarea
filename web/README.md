# Cricket Bay Area

Static Next.js catalog for cricket equipment available for local pickup in the Bay Area.

## Run locally

```bash
npm ci
npm run dev
```

Open `http://localhost:1111/cricketbayarea/`.

## Inventory

The site reads `data/inventory.csv` by default. To build from a published Google Sheet CSV export, set `INVENTORY_CSV_URL` in the build environment. The sheet must include these columns:

```text
Product Name,Category,Price,Stock,Image
```

Accepted categories are `Bats`, `Balls`, and `Kitbags`.

## Checks

```bash
npm run lint
npm run build
```

The build creates a static export in `out/` with the `/cricketbayarea` base path used by GitHub Pages.

## Deployment

`.github/workflows/deploy.yml` builds `web/` and deploys `web/out` to GitHub Pages whenever `main` changes. The workflow also runs daily so a configured Google Sheet export can refresh the catalog.
