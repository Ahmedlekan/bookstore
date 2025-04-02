import blog1 from "../assets/blog1.jpg"
import blog2 from "../assets/blog2.jpg"
import blog3 from "../assets/blog3.jpg"

interface MenuItem {
  label: string;
  link?: string;
  subItems?: SubMenuItem[];
  isMegaMenu?: boolean;
  categories?: MegaMenuCategory[];
}

interface SubMenuItem {
  label: string;
  link: string;
}

interface MegaMenuCategory {
  title: string;
  items: SubMenuItem[];
}

export const menuItems: MenuItem[] = [
  {
    label: 'HOME',
    link: '/'
  },
  {
    label: 'BOOK STORE',
    link: '/books-store'
  },
  {
    label: 'MEGA MENU',
    isMegaMenu: true,
    categories: [
      {
        title: 'TEXT BOOKS',
        items: [
          { label: 'Business', link: '#' },
          { label: 'Encyclodepedias', link: '#' },
          { label: 'Lifestyle', link: '#' },
          { label: 'Foods & Cookery', link: '#' },
          { label: 'Fantasy', link: '#' }
        ]
      },
      {
        title: 'KINDLE BOOKS',
        items: [
          { label: 'Architecture', link: '#' },
          { label: 'Biography', link: '#' },
          { label: 'Music', link: '#' },
          { label: 'Wildlife', link: '#' },
          { label: 'Cooking', link: '#' }
        ]
      },
      {
        title: 'PAGES',
        items: [
          { label: 'About Us', link: '/about-us'},
          { label: 'Contact Us', link: '/contact-us'},
          { label: 'Privacy Policy', link: '#'},
          { label: 'Return & Refunds Policy', link: '#'},
          { label: 'Terms & Condition', link: '#'}
        ]
      }
    ]
  },
  {
    label: 'SHOP',
    subItems: [
      { label: 'Simple product', link: '#' },
      { label: 'Read PDF Book Demo', link: '#' },
      { label: 'External Product', link: '#' },
      { label: 'Free Download Books', link: '#' },
      { label: 'Bundles Books', link: '#' }
    ]
  },
];

export const navigation = [
  {name: "Dashboard", href:"/#"},
  {name: "Orders", href:"/#"},
  {name: "Check Out", href:"/checkout"},
]

export const newsData = [
  {
    image: blog1,
    author: "Ramamoorthi M",
    date: "April 4, 2020",
    title: "Books changed my ideology",
    description:
      "An intimate reflection on how literature shaped personal beliefs and broadened perspectives. Discover the transformative power of reading.",
  },
  {
    image: blog2,
    author: "Ramamoorthi M",
    date: "April 4, 2020",
    title: "Best writers of 19th century",
    description:
      "A journey through the lives and works of legendary 19th-century authors who left a lasting legacy in the world of literature.",
  },
  {
    image: blog3,
    author: "Ramamoorthi M",
    date: "April 4, 2020",
    title: "100 Best kids story books",
    description:
      "Explore a curated list of timeless children's books that spark imagination, nurture creativity, and create lasting memories for young readers.",
  },
];


export const category = {
  label: "Category",
  name: "category",
  componentType: "select",
  options: [
    { id : 1, label : "Fantasy"},
    { id : 2, label : "History"},
    { id : 3, label : "Cook Book"},
    { id : 4, label : "Romance"},
  ],
}