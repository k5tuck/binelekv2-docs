// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  internalSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Architecture',
      collapsed: false,
      items: [
        'architecture/system-overview',
        'architecture/data-flow',
      ],
    },
    {
      type: 'category',
      label: 'Business',
      items: [
        'business/product-vision',
        'business/module-specs',
      ],
    },
    {
      type: 'category',
      label: 'Security',
      items: [
        'security/security-model',
      ],
    },
  ],
};

export default sidebars;
