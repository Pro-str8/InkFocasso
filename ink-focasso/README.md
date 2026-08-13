# Ink_focasso website

Plain HTML, CSS, and JS. No build step, no installs required.

## File structure

```
index.html          Home page: hero, about, portfolio gallery
booking.html         Booking rules, prep list, DM template
aftercare.html        Aftercare guide
css/style.css          All styling
js/gallery-data.js    Edit this to add your own photos and videos
js/main.js             Site behavior (nav, gallery, checklist, copy button)
media/                  Put your image and video files here
```

## Preview it locally in VS Code

1. Install the "Live Server" extension (by Ritwick Dey) from the Extensions tab.
2. Right-click `index.html` in the file explorer.
3. Choose "Open with Live Server."

Alternative without an extension: open a terminal in this folder and run
`python3 -m http.server`, then visit `http://localhost:8000`.

## Adding tattoo photos and videos

1. Drop the file into the `media` folder. Keep file sizes reasonable so
   the site loads fast. For video, an `.mp4` around 10-20 seconds works well.
2. Open `js/gallery-data.js`.
3. Add a line for it:

```js
{ file: "media/your-file-name.jpg", type: "image", alt: "Short description" },
```

Use `type: "video"` for video files. Delete the two example lines once you
have real work in the gallery.

## Adding a hero background photo

Open `css/style.css`, find the `.hero-media` rule, and swap the
placeholder gradient for:

```css
background: url("../media/hero.jpg") center/cover no-repeat;
```

Use a horizontal image for best results. Around 1800px wide is plenty.

## Editing text

- Booking rules, prices, and policies: `booking.html`, inside the
  `<ul class="checklist">` section.
- Aftercare steps: `aftercare.html`.
- About text and Instagram/TikTok handles: `index.html`, in the `.about`
  section, and in the footer of every page.

## Putting it online

Any static host works since there's no backend: GitHub Pages, Netlify,
or Vercel all support dragging this folder in directly. Netlify's
drag-and-drop deploy is the fastest option if you want something live
in a couple of minutes.
