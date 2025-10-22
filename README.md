# The Christmas Heist of My Heart

A cozy romantic mystery interactive story in 7 scenes, created as a heartfelt Christmas gift. Experience a playful detective narrative with beautiful hand-painted illustrations, voiceovers, and interactive elements.

## 🎄 Features

- **7 Interactive Scenes**: Each with unique puzzles and narrative moments
- **Personalized Experience**: Enter your wife's name for a customized story
- **Full Audio Experience**:
  - Background music loop
  - Sound effects for interactions
  - Voiceover narration (male and female voices)
  - Full captions for accessibility
- **Cinematic Mode**: Optional autoplay for a passive viewing experience
- **Beautiful Visuals**: Hand-painted 2.5D illustrations with snowfall effects
- **Exportable Assets**: Download a personalized certificate at the end
- **Fully Accessible**: Keyboard navigation, WCAG AA contrast, captions
- **Mobile Optimized**: Works beautifully on all devices
- **Offline Ready**: Once loaded, works without internet

## 🚀 Local Development

### Prerequisites

- Node.js 18+ installed
- pnpm (or npm/yarn)

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open in browser
# Navigate to http://localhost:3000
```

### Build for Production

```bash
# Create optimized build
pnpm build

# Preview production build
pnpm preview
```

## 📦 Deployment

### Deploy to Netlify

1. **Via Netlify UI**:
   - Connect your GitHub repository
   - Build command: `pnpm build`
   - Publish directory: `client/dist`
   - Deploy!

2. **Via Netlify CLI**:

   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli

   # Build the project
   pnpm build

   # Deploy
   netlify deploy --prod --dir=client/dist
   ```

### Deploy to GitHub Pages

1. Update `vite.config.ts` to set the base path:

   ```typescript
   export default defineConfig({
     base: "/your-repo-name/",
     // ... rest of config
   });
   ```

2. Build and deploy:

   ```bash
   pnpm build

   # Deploy to gh-pages branch
   npx gh-pages -d client/dist
   ```

3. Enable GitHub Pages in repository settings (source: gh-pages branch)

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

## 🎨 Customization

### Replace Voiceovers

All voiceover files are in `client/public/assets/audio/`. To replace with custom recordings:

1. Record your audio files
2. Convert to `.wav` format (44.1kHz, stereo recommended)
3. Replace the files with matching names:
   - `vo_detective_intro.wav` - British female detective intro
   - `vo_husband_scene2.wav` - Cafeteria scene
   - `vo_husband_scene3.wav` - Fleming's scene
   - `vo_husband_scene4.wav` - Beach scene
   - `vo_husband_scene5.wav` - Home scene
   - `vo_husband_scene6.wav` - Snow globe vow (most important!)

### Replace Background Music

Replace `client/public/assets/audio/bg_loop.mp3` with your own:

- Format: MP3
- Duration: 60-90 seconds (will loop)
- Style: Gentle piano with optional sleigh bells
- Volume: Should be subtle (code sets it to 50% of SFX volume)

### Replace Sound Effects

All SFX files are in `client/public/assets/audio/` with `.mp3` extension:

- `paper_rustle_open.mp3`
- `letter_chime.mp3`
- `mug_set_down.mp3`
- `napkin_unfold.mp3`
- `tv_click.mp3`
- `waves_soft.mp3`
- `fire_crackle_loop.mp3`
- `stocking_jingle.mp3`
- `dog_bark_soft.mp3`
- `glass_chime.mp3`
- `snowglobe_soft_shatter.mp3`
- `door_creak.mp3`
- `ui_click.mp3`

Replace any of these with your own recordings (MP3 format, short duration).

### Customize Visuals

Scene backgrounds are in `client/public/assets/img/`:

- `scene1-bg.png` through `scene7-bg.png`
- `envelope.png`, `mug.png`, `snowglobe.png`
- `certificate-template.png`
- `snowflake-icon.png`

Replace these files to customize the visual experience.

## ⚙️ Settings

Users can access settings via the gear icon (top-right):

- **Audio On/Off**: Toggle all audio
- **Cinematic Mode**: Enable autoplay through scenes
- **Text Speed**: Adjust caption timing (slow/normal/fast)
- **Reset Name**: Clear stored name and restart

## 🎁 User Experience

1. **First Launch**: User enters wife's name (stored in localStorage)
2. **Scene 1**: Mysterious letter descends, click to open
3. **Scene 2**: Tap the steaming mug to reveal napkin note
4. **Scene 3**: Choose menu item, tap TV for easter egg
5. **Scene 4**: Solve postcard puzzle (beach scene, no snow)
6. **Scene 5**: Tap both stockings (Rigatoni & Cannoli)
7. **Scene 6**: Tap snow globe to reveal heartfelt vow
8. **Scene 7**: Epilogue with download certificate option

### Easter Egg

After 6 seconds on the epilogue, a snowflake icon appears in the bottom-right. Click it for a sweet surprise message!

## 🔧 Technical Details

### Stack

- **React 19** with TypeScript
- **Tailwind CSS 4** for styling
- **Wouter** for routing
- **shadcn/ui** components
- **Custom fonts**: Alex Brush (script), Crimson Text (body)

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires JavaScript enabled

### Performance

- First interactive: <2.5s on mid-range mobile
- 60fps animations
- Lazy-loaded audio
- Prefetched scene assets

### Accessibility

- Full keyboard navigation
- WCAG AA color contrast
- Visible focus outlines
- Complete captions for all voiceovers
- Screen reader friendly

## 📄 License

This is a personal project created as a Christmas gift. Feel free to use it as inspiration for your own romantic projects!

## ❤️ Credits

Created with love for a special someone. The perfect blend of mystery, romance, and Christmas magic.

---

**Merry Christmas! 🎄**
