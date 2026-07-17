export interface GhNavigationItem {
  readonly label: string;
  readonly href: string;
  readonly external?: boolean;
  readonly active?: boolean;
  readonly ariaLabel?: string;
}
