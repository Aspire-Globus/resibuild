# Resibuild – Figma-style React Homepage

This version was rebuilt to follow the uploaded Figma screenshot's visual direction:
- white header
- dark hero image
- teal / dark teal brand areas
- bright lime green content sections
- 4-card inspiration area
- podcast hero block
- teal insight cards
- lime resources section
- project spotlight
- testimonial and white footer

## Run

```bash
npm install
npm run dev
```

## Important

The uploaded screenshot is only 159 × 659 px, so the exact original Figma photography cannot be extracted at production quality from it.

For now this project includes local SVG placeholders with the correct image positions and overall color direction.

Replace the files in:

`public/images/`

with exported images from Figma while keeping the same filenames.

## WordPress later

Static homepage content is stored in:

`src/data/homeData.js`

This can later be replaced by ACF + WPGraphQL data without changing the page components.
