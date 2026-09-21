import "server-only";
import { defaultSiteMedia } from "@/data/media-defaults";
import { getSettings, getMediaFiles } from "@/lib/store";
import type { SiteMedia } from "@/types";

function mergeSiteMedia(partial?: Partial<SiteMedia> | null): SiteMedia {
  return {
    heroBackground: partial?.heroBackground || defaultSiteMedia.heroBackground,
    heroCollage: partial?.heroCollage?.length
      ? partial.heroCollage
      : defaultSiteMedia.heroCollage,
    aboutImage: partial?.aboutImage || defaultSiteMedia.aboutImage,
    ctaBackground: partial?.ctaBackground || defaultSiteMedia.ctaBackground,
    portfolio: partial?.portfolio?.length
      ? partial.portfolio
      : defaultSiteMedia.portfolio,
  };
}

export async function getSiteMedia(): Promise<SiteMedia> {
  const settings = await getSettings();
  return mergeSiteMedia(settings.media);
}

export async function getMediaLibrary(category?: string) {
  const files = await getMediaFiles();
  if (!category) return files;
  return files.filter((file) => file.category === category);
}
