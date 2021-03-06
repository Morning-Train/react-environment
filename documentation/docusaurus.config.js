module.exports = {
  title: 'React Environment',
  tagline: 'Declarative promises in React',
  url: 'https://github.com/Morning-Train',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Morning-Train', // Usually your GitHub org/user name.
  projectName: 'react-environment', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'React Environment',
      items: [
        {
          href: 'https://morningtrain.dk/en',
          label: 'Morningtrain',
          position: 'right'
        },
        {
          href: 'https://github.com/Morning-Train/react-environment',
          label: 'GitHub',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} Morningtrain ApS.`
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ]
}
