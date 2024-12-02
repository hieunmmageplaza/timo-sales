export const SORT_OPTIONS = [
  {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
  {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'}
];

export const DEFAULT_SETTINGS_CONFIG = {
  allowShow: 'all',
  displayDuration: 1,
  excludedUrls: 'https://example.com',
  firstDelay: 1,
  hideTimeAgo: false,
  id: '',
  includedUrls: 'https://example.com',
  maxPopsDisplay: 1,
  popsInterval: 1,
  position: 'bottom-left',
  shopId: '1',
  truncateProductName: false,
  enable: true
};

export const DEFAULT_DESKTOP_POSITION = [
  {label: 'Bottom left', value: 'bottom-left'},
  {label: 'Bottom right', value: 'bottom-right'},
  {label: 'Top left', value: 'top-left'},
  {label: 'Top right', value: 'top-right'}
];
