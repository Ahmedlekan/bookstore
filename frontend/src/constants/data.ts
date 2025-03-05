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
    subItems: [
      { label: 'Home 1', link: '#' },
      { label: 'Home 2', link: '#' },
      { label: 'Home 3', link: '#' }
    ]
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
          { label: 'About Us', link: '#' },
          { label: 'Contact Us', link: '#' },
          { label: 'Privacy Policy', link: '#' },
          { label: 'Return & Refunds Policy', link: '#' },
          { label: 'Terms & Condition', link: '#' }
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
  {
    label: 'PAGES',
    subItems: [
      { label: 'About Ud', link: '#' },
      { label: 'Author Profile Page', link: '#' },
      { label: 'Publisher Profile Page', link: '#' },
      { label: 'All Authors Page', link: '#' },
      { label: 'All Book Publishers', link: '#' }
    ]
  },
  {
    label: 'BOOK STORE',
    link: '/books-store'
  },
  {
    label: 'CONTACT US',
    link: '#'
  }
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
      "Adipiscing enim eu turpis egestas pretium aenean pharetra magna ac. Eu ultrices vitae auctor eu augue ut lectus arcu bibendum. Elementum.",
  },
  {
    image: blog2,
    author: "Ramamoorthi M",
    date: "April 4, 2020",
    title: "Best writers of 19th century",
    description:
      "Accumsan lacus vel facilisis volutpat. Posuere urna nec tincidunt praesent. Tempus iaculis urna id volutpat sapien nec sagittis.",
  },
  {
    image: blog3,
    author: "Ramamoorthi M",
    date: "April 4, 2020",
    title: "100 Best kids story books",
    description:
      "Felis bibendum ut tristique et egestas quis ipsum suspendisse ultrices. In massa tempor nec feugiat nisl pretium fusce id.",
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