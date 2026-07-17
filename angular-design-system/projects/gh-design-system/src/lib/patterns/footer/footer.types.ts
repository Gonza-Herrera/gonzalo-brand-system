export interface GhFooterLink {
  readonly label: string;
  readonly href: string;
  readonly external?: boolean;
  readonly ariaLabel?: string;
}

export interface GhFooterGroup {
  readonly title: string;
  readonly links: readonly GhFooterLink[];
}
