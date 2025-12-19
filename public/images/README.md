# Images Directory

This directory contains images for the personal website.

## Required Images

### Profile Image
- **Path**: `/public/images/profile.jpg`
- **Dimensions**: 800x800px (square, 1:1 aspect ratio)
- **Format**: JPG or PNG
- **Purpose**: Displayed in the hero section with circular crop
- **Guidelines**:
  - Professional headshot or portrait
  - Clear face visibility
  - Neutral or complementary background
  - High resolution (at least 800x800px)
  - Optimized file size (<200KB recommended)

## Current Status

A placeholder SVG file is included for the profile image. Replace it with your actual professional photo:

1. Replace `profile.jpg` with your professional headshot (800x800px)

## Vector Graphics

The website uses inline SVG vector graphics for visual interest:
- **Background section**: Systems thinking network with human figure
- **Contact section**: Two people communicating with animated message flow

These are embedded in the components and don't require separate image files.

## Image Optimization

Before adding your profile photo:
- Use JPG for photos (better compression)
- Compress images using tools like:
  - [TinyPNG](https://tinypng.com/)
  - [Squoosh](https://squoosh.app/)
  - ImageOptim (Mac)
  - Next.js will automatically optimize images at build time

## Adding More Images

To add more images to other sections:
1. Add image URL to the corresponding JSON file in `/src/content/sections/`
2. Update the TypeScript type in `/src/types/content.ts`
3. Update the component in `/src/components/sections/` to display the image
