# Product images

Put product photos in this folder. Reference them from the inventory sheet's
`Image` column as a site-relative path.

Example: for a file called `bat-ss-ton.jpg` in this folder, the sheet cell is:

```
/products/bat-ss-ton.jpg
```

## Naming

Lowercase, hyphens, no spaces. Try to match the product:

- `bat-ss-ton.jpg`
- `ball-kookaburra-red.jpg`
- `kitbag-cca-travel.jpg`

## Format and size

- JPG works best. PNG or WebP also fine.
- Aim for roughly 1000x1250 (4:5 portrait) or square.
- Under about 500 KB per image.
- A plain background (white sheet, wooden table) reads best in the grid.

## External URLs

The `Image` column also accepts a full `https://...` URL. Google Drive and
Dropbox share links do not work directly. Use a plain public image URL.

If a product has no image at all, the card shows a "No image" placeholder.
