# Our Forever: Premium Romantic Website

A beautifully crafted, premium romantic website celebrating love with interactive sections for memories, messages, music, and special surprises. Built with Next.js, React, Framer Motion, and Zustand for state management.

## Features

### Security & Experience
- **Password Gate**: Enter password to unlock the entire website (default: `udiada`)
- **Star Animations**: Twinkling stars and shooting stars throughout the entire website with parallax effects
- **Loading Screen**: Beautiful animated loading experience with heart and progress indicator
- **Music Manager**: Dynamic page-specific background music that changes as you scroll through sections with play/pause toggle button

### Main Sections
- **Hero**: Stunning animated landing page with couple names and call-to-action
- **Love Letter**: Expandable love letter with heartfelt messages
- **Reasons Jar**: Interactive jar of reasons why you love them with emoji selection
- **Questions & Answers**: Ask questions and display her heartfelt answers - expandable Q&A cards
- **Replies/Messages**: Showcase your love messages to her with carousel navigation between messages
- **Timeline**: Visual timeline of your relationship milestones
- **Gallery**: Photo gallery with emoji-based preview
- **Surprise Boxes**: Interactive flip-animation boxes that reveal special moments with confetti celebration effect
- **Open When Letters**: Messages to open in special moments
- **Music Player**: Playlist with playing controls and track selection
- **Time Capsule**: Messages sealed to reveal on future dates
- **Guestbook**: Guests can leave messages of support
- **Secrets**: Hidden messages that can be revealed by clicking
- **Admin Dashboard**: Full content management system

### Design Features
- Premium, cinematic animations with Framer Motion
- Romantic color palette (pink, rose, white)
- Fully responsive mobile design
- Smooth scroll animations
- Loading screen with engaging animations
- Floating navigation with smooth interactions
- Beautiful footer with quick links

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Animations**: Framer Motion, GSAP
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Typography**: Poppins font family
- **Additional**: Swiper, js-confetti, axios

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd our-forever
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Admin Access

- Navigate to `/admin`
- Enter password: `udiada` (default demo password)
- Manage content, customize theme, and personalize the website

## How to Use

### Accessing the Website
1. Visit the website at [http://localhost:3000](http://localhost:3000)
2. Enter the password: `udiada` to unlock all content
3. Explore all sections with beautiful animations

### Interactive Features
- **Click Surprise Boxes**: Click on the colorful pink boxes to flip and reveal special moments (confetti effect included!)
- **Expand Questions**: Click Q&A cards to expand and see answers
- **Navigate Messages**: Use arrow buttons to scroll through your love messages
- **Toggle Music**: Click the speaker button (🔊) in the bottom right to enable/disable background music
- **Scroll Through Sections**: Each section has unique animations and transitions as you scroll

### Music Integration
- Each page section has its own background music
- Music automatically changes as you scroll to different sections
- Click the music button in the bottom right corner to toggle sound on/off
- Default volume is set to 30% for comfortable listening

### Surprise Boxes Feature
- 4 interactive surprise boxes with flip animations
- Each reveals a special message when clicked
- Confetti celebration effect on reveal
- Progress bar shows how many surprises you've revealed
- Includes boxes for: First Kiss, Special Date, Promise, and Secret Wish

## Customization

### Update Couple Names

In the admin panel under "Couple Names", update:
- First name
- Second name

These names will appear throughout the website.

### Change Theme Colors

In the admin panel under "Customize", choose from presets or create custom colors for:
- Primary Color (main accent)
- Secondary Color (support color)
- Accent Color (highlights)

### Add Content

- **Love Letter**: Edit default text in `components/sections/LoveLetter.tsx`
- **Reasons**: Add via admin panel
- **Timeline Events**: Edit default events in `components/sections/Timeline.tsx`
- **Music Tracks**: Add songs via admin panel
- **Messages**: Visitors can leave messages in the Guestbook

## Directory Structure

```
src/
├── app/
│   ├── page.tsx                 # Main page with all sections
│   ├── admin/
│   │   ├── page.tsx            # Admin dashboard
│   │   └── layout.tsx          # Admin layout
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles with design tokens
├── components/
│   ├── Navigation.tsx          # Top navigation
│   ├── LoadingScreen.tsx       # Loading animation
│   ├── Footer.tsx              # Footer component
│   ├── PasswordGate.tsx        # Password protection modal
│   ├── StarAnimation.tsx       # Twinkling stars and shooting stars
│   ├── MusicManager.tsx        # Page-specific music player
│   ├── sections/               # Page sections
│   │   ├── Hero.tsx
│   │   ├── LoveLetter.tsx
│   │   ├── ReasonsJar.tsx
│   │   ├── Questions.tsx       # Q&A section
│   │   ├── Replies.tsx         # Love messages carousel
│   │   ├── Timeline.tsx
│   │   ├── Gallery.tsx
│   │   ├── SurpriseBoxes.tsx   # Flip animation boxes
│   │   ├── OpenWhen.tsx
│   │   ├── Music.tsx
│   │   ├── TimeCapsule.tsx
│   │   ├── Guestbook.tsx
│   │   └── Secrets.tsx
│   └── admin/                  # Admin components
│       ├── AdminNav.tsx
│       ├── AdminDashboard.tsx
│       ├── ContentEditor.tsx
│       └── ThemeSettings.tsx
├── lib/
│   ├── store.ts               # Zustand store
│   ├── types.ts               # TypeScript types
│   ├── constants.ts           # Constants and presets
│   ├── helpers.ts             # Utility functions
│   └── hooks/
│       └── useScrollAnimation.ts
└── public/                     # Static assets
```

## Key Components

### Store (Zustand)
- `useContentStore`: Memories, reasons, letters, music, guestbook, secrets
- `useUIStore`: Loading state, current section, sound settings
- `useAdminStore`: Authentication state
- `useSettingsStore`: Theme colors, couple names

### Sections
Each section is an independent component with:
- Smooth entrance animations
- Interactive elements
- State management integration
- Mobile responsiveness
- Beautiful gradients and hover effects

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Set environment variables if needed
4. Deploy

The site will be live at your Vercel domain with automatic deployments on git push.

### Deploy Elsewhere

1. Build for production: `pnpm build`
2. Start production server: `pnpm start`
3. Or use the export command for static hosting

## Customization Ideas

1. **Add photos**: Replace emoji placeholders with actual images
2. **Custom music**: Add real song URLs in the Music section
3. **Personalized messages**: Update default text throughout sections
4. **Additional sections**: Add new sections by following the existing component pattern
5. **Email notifications**: Set up admin notifications for guestbook messages
6. **Share page**: Create shareable links to specific sections
7. **Comments**: Add comments to memories
8. **Collaborative editing**: Allow both partners to add content

## Performance

- Next.js App Router for optimized routing
- Image optimization with next/image
- CSS-in-JS for minimal CSS
- Zustand for lightweight state management
- Smooth animations with minimal repaints

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Troubleshooting

### Page not loading?
- Check that all dependencies are installed: `pnpm install`
- Restart dev server: `pnpm dev`
- Clear browser cache

### Admin password not working?
- Default password is: `udiada`
- Change it in `lib/constants.ts` or use environment variables

### Animations stuttering on mobile?
- This is usually browser-dependent
- Try with latest mobile browser
- Reduce animation complexity if needed

## License

This project is personal and meant to celebrate love. Feel free to customize for your own use.

## Support

For questions or issues:
1. Check the admin dashboard help section
2. Review the component source code
3. Check browser console for errors

---

Made with ❤️ for celebrating your unique love story.
