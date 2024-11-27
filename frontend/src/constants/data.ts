import book5 from "../assets/book5.webp";
import book6 from "../assets/book6.webp";
import book7 from "../assets/book7.webp";
import book8 from "../assets/book8.webp";
import book11 from "../assets/book11.webp";
import book12 from "../assets/book12.webp";
import book13 from "../assets/book13.webp"
import book14 from "../assets/book14.webp"
import blog1 from "../assets/blog1.jpg"
import blog2 from "../assets/blog2.jpg"
import blog3 from "../assets/blog3.jpg"


export const books = [
  // Fantasy
  {
    id: 1,
    title: "Girls at the Golden City",
    author: "Claudia Alves",
    publisher: "Golden Books Publishing",
    price: "$19.99",
    description: "Two girls' friendship is put to the test during a road trip gone awry.",
    sku: "FAN12345",
    categories: ["Fantasy"],
    tags: ["adventure", "friendship", "road trip"],
    image: book6,
  },
  {
    id: 2,
    title: "Mystic Lands",
    author: "Harold Tennyson",
    publisher: "Mystic Publishing Co.",
    price: "$22.99",
    description: "A tale of magic and destiny in the mysterious Mystic Lands.",
    sku: "FAN67890",
    categories: ["Fantasy"],
    tags: ["magic", "mystery", "adventure"],
    image: book7,
    trending: true,
    oldPrice: 19.99,
    newPrice: 15.99
  },

  // History
  {
    id: 3,
    title: "Visit in the North",
    author: "Kevin Apostolos",
    publisher: "Historic Horizons",
    price: "$15.49",
    description: "Explore the beauty of the North and its untold stories.",
    sku: "HIS11223",
    categories: ["History"],
    tags: ["northern history", "culture", "exploration"],
    image: book8,
    oldPrice: 20.99,
    newPrice: 17.99
  },
  {
    id: 4,
    title: "Legends of the Past",
    author: "Margaret Willson",
    publisher: "Ancient Tales Press",
    price: "$18.99",
    description: "Uncover the legends that shaped civilizations.",
    sku: "HIS44556",
    categories: ["History"],
    tags: ["legends", "civilizations", "historical tales"],
    image: book5,
    oldPrice: 18.99,
    newPrice: 16.99
  },

  // Cook Book
  {
    id: 5,
    title: "The Stadium by Night",
    author: "A. Aronowitz",
    publisher: "Culinary Nights Publishing",
    price: "$12.99",
    description: "They came, they saw, they partied. A fun-filled cookbook.",
    sku: "CKB77889",
    categories: ["Cook Book"],
    tags: ["recipes", "party food", "culinary"],
    image: book12,
    oldPrice: 19.99,
    newPrice: 18.99
  },
  {
    id: 6,
    title: "Savory Secrets",
    author: "Chef Joanna Hart",
    publisher: "Hart's Kitchen",
    price: "$14.99",
    description: "Delightful recipes to bring joy to your dining table.",
    sku: "CKB99001",
    categories: ["Cook Book"],
    tags: ["recipes", "home cooking", "savory dishes"],
    image: book13,
    oldPrice: 22.99,
    newPrice: 19.99
  },

  // Romance
  {
    id: 7,
    title: "When the Stars Align",
    author: "Anonymous",
    publisher: "Romance Tales Press",
    price: "$9.99",
    description: "A romantic story of perfectly aligned stars.",
    sku: "ROM22334",
    categories: ["Romance"],
    tags: ["romance", "stars", "destiny"],
    image: book11,
    oldPrice: 19.99,
    newPrice: 16.99
  },
  {
    id: 8,
    title: "The Love Chronicles",
    author: "Samantha Rae",
    publisher: "Heartstrings Publications",
    price: "$11.99",
    description: "A collection of heartwarming love stories.",
    sku: "ROM55667",
    categories: ["Romance"],
    tags: ["love stories", "romance", "heartwarming"],
    image: book14,
    oldPrice: 21.99,
    newPrice: 18.99
  },
];

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