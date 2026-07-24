export const GH_CONTAINER_SIZES = ['sm', 'md', 'lg', 'xl', 'wide', 'full'] as const;
export const GH_CONTAINER_GUTTERS = ['none', 'sm', 'md', 'lg'] as const;

export type GhContainerSize = (typeof GH_CONTAINER_SIZES)[number];
export type GhContainerGutters = (typeof GH_CONTAINER_GUTTERS)[number];
