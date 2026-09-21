# Website Images (GitHub Storage)

Upload your images here. Each folder is for a different section of the website.

## Folders

| Folder | Use for | Example path |
|--------|---------|--------------|
| `blogs/` | Blog cover images | `/images/blogs/my-post.jpg` |
| `hero/` | Homepage hero | `/images/hero/background.jpg` |
| `portfolio/` | Our Work section | `/images/portfolio/project-1.jpg` |
| `about/` | About section | `/images/about/team.jpg` |
| `cta/` | CTA background | `/images/cta/banner.jpg` |
| `general/` | Other images | `/images/general/logo-bg.jpg` |

## How to add images

1. Put your image file in the correct folder above
2. Commit & push to GitHub:
   ```bash
   git add public/images/
   git commit -m "Add new website images"
   git push
   ```
3. Wait for Vercel to redeploy (~2 min)
4. Open **Admin → Media** and register the image path
5. Select it in **Blogs** or **Website Images**

## Supported formats

JPG, PNG, WebP, GIF (recommended: WebP or JPG under 500KB)
