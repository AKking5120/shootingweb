import "server-only";
import { defaultSiteContent } from "@/data/content-defaults";
import { getSettings, saveSettings } from "@/lib/store";
import type { SiteContent } from "@/types";

function mergeSiteContent(partial?: Partial<SiteContent> | null): SiteContent {
  return {
    faq: partial?.faq?.length ? partial.faq : defaultSiteContent.faq,
    processSteps: partial?.processSteps?.length
      ? partial.processSteps
      : defaultSiteContent.processSteps,
    processTitle: partial?.processTitle || defaultSiteContent.processTitle,
    processEyebrow: partial?.processEyebrow || defaultSiteContent.processEyebrow,
    popup: {
      ...defaultSiteContent.popup,
      ...partial?.popup,
    },
  };
}

export async function getSiteContent(): Promise<SiteContent> {
  const settings = await getSettings();
  return mergeSiteContent(settings.content);
}

export async function saveSiteContent(content: SiteContent) {
  const settings = await getSettings();
  return saveSettings({ ...settings, content });
}
