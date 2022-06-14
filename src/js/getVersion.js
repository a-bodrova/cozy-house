import { widths } from "./constants";

export function getVersion() {
  const version = window.innerWidth < widths.desktop && window.innerWidth >= widths.tablet ? 'tablet'
  : window.innerWidth < widths.tablet ? 'mobile' : 'desktop';

  return version;
}