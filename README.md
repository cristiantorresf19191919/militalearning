This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Firebase Setup (Optional)

This project uses Firebase Firestore to track progress across devices. If you want to enable Firebase:

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database in your Firebase project
3. Copy `.env.local.example` to `.env.local`
4. Get your Firebase config from Project Settings > General > Your apps > Web app
5. Fill in the values in `.env.local`

**Note:** The app will automatically fall back to localStorage if Firebase is not configured, so it works out of the box without Firebase setup.

## Features

- 🎓 Interactive JavaScript lessons with code editor
- 🔥 Firebase integration for progress tracking (with localStorage fallback)
- ✨ Real-time progress sync across devices
- 🎨 Beautiful, fun UI with animations
- 🎯 15 engaging challenges covering JavaScript fundamentals

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load fonts.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
