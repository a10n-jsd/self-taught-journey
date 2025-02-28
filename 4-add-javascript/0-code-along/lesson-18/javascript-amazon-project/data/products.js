import { formatCurrency } from "../scripts/utils/money.js";

export function getProduct(productId) {
  let matchingProduct;

    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });

  return matchingProduct;
}
export class Products {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  getStarsUrl() {
    return `${pickRating(this.rating.stars)}`
  }

  getPrice() {
    return `${formatCurrency(this.priceCents)}`
  }

  getExtraInfoHTML() {
    return '';
  }
}

export class Clothing extends Products {
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails);
    // without 'super', can't access 'this'  
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  // This function demonstrate overriding parents method and polymorphism
  getExtraInfoHTML() {
    // If we still need to call the parents method, we can use super 
    // super.getExtraInfoHTML();
    return `
    <a href="${this.sizeChartLink}" target="_blank">
      Size Chart
    </a>
    `
  }
}

export class Appliance extends Products {
  instructionsLink;
  warrantyLink;

  constructor(productDetails) {
    super(productDetails);
    this.instructionsLink = productDetails.instructionsLink;
    this.warrantyLink = productDetails.warrantyLink;
  }

  getExtraInfoHTML() {
    return `
    <a href="${this.instructionsLink}" target="_blank">
      Instructions
    </a>
    <a href="${this.warrantyLink}" target="_blank">
      Warranty
    </a>
    `
  }
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();
  
  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    fun();
  });
  
  xhr.open('GET', 'https://supersimplebackend.dev/cart'); // response: plain text => 'load cart'
  xhr.send();
}

export let products = [];

export function loadProducts(fun) {
  const xhr = new XMLHttpRequest();
  
  xhr.addEventListener('load', () => {
    products = JSON.parse(xhr.response).map((productDetails) => {
      // type in products object is a discriminator property
      if (productDetails.type === 'clothing') {
        return new Clothing(productDetails)
      }
    
      if (productDetails.type === 'appliance') {
        return new Appliance(productDetails)
      }
    
      return new Products(productDetails);
    });;
    
    console.log('load products');

    // callback function
    fun();
  });
  
  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();
}

export function loadProductsFetch() {
  // fetch() uses promises so it works with .then()
  const promise = fetch(
    'https://supersimplebackend.dev/products'
    ).then((response) => {
      // console.log(response);
      return response.json() // is async code 
      // when we return a promise, it will wait until finish
       
  }).then((productData) => {
    // console.log(productData);
      products = productData.map((productDetails) => {
        // type in products object is a discriminator property
        if (productDetails.type === 'clothing') {
          return new Clothing(productDetails)
        }
      
        if (productDetails.type === 'appliance') {
          return new Appliance(productDetails)
        }
      
        return new Products(productDetails);
      });;
      
      console.log('load products');
  })

  return promise; // after return out of the function, promise can add another step with .then()
}

/*
loadProductsFetch().then(() => {
  console.log('next step');
});
*/

// loadProducts();

/*
export const products = [
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "https://i.ibb.co.com/0CCmcj4/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count: 87
    },
    priceCents: 1090,
    keywords: [
      "socks",
      "sports",
      "apparel"
    ]
  },
  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    image: "https://i.ibb.co.com/mNVWRGC/intermediate-composite-basketball.jpg",
    name: "Intermediate Size Basketball",
    rating: {
      stars: 4,
      count: 127
    },
    priceCents: 2095,
    keywords: [
      "sports",
      "basketballs"
    ]
  },
  {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "https://i.ibb.co.com/V3msDdj/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    rating: {
      stars: 4.5,
      count: 56
    },
    priceCents: 799,
    type: "clothing",
    sizeChartLink: "https://i.ibb.co.com/dLfrC12/clothing-size-chart.png",
    keywords: [
      "tshirts",
      "apparel",
      "mens"
    ]
  },
  {
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "https://i.ibb.co.com/KwDJ1Sx/black-2-slot-toaster.jpg",
    name: "2 Slot Toaster - Black",
    rating: {
      stars: 5,
      count: 2197
    },
    priceCents: 1899,
    type: "appliance",
    instructionsLink: "https://i.ibb.co.com/X8S5R7P/appliance-instructions.png",
    warrantyLink: "https://i.ibb.co.com/SxvBJVw/appliance-warranty.png",
    keywords: [
      "toaster",
      "kitchen",
      "appliances"
    ]
  },
  {
    id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
    image: "https://i.ibb.co.com/gg5k7Kh/6-piece-white-dinner-plate-set.jpg",
    name: "6 Piece White Dinner Plate Set",
    rating: {
      stars: 4,
      count: 37
    },
    priceCents: 2067,
    keywords: [
      "plates",
      "kitchen",
      "dining"
    ]
  },
  {
    id: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
    image: "https://i.ibb.co.com/dcD7MJk/6-piece-non-stick-baking-set.webp",
    name: "6-Piece Nonstick, Carbon Steel Oven Bakeware Baking Set",
    rating: {
      stars: 4.5,
      count: 175
    },
    priceCents: 3499,
    keywords: [
      "kitchen",
      "cookware"
    ]
  },
  {
    id: "dd82ca78-a18b-4e2a-9250-31e67412f98d",
    image: "https://i.ibb.co.com/cJcVBFH/plain-hooded-fleece-sweatshirt-yellow.jpg",
    name: "Plain Hooded Fleece Sweatshirt",
    rating: {
      stars: 4.5,
      count: 317
    },
    priceCents: 2400,
    type: "clothing",
    sizeChartLink: "https://i.ibb.co.com/dLfrC12/clothing-size-chart.png",
    keywords: [
      "hoodies",
      "sweaters",
      "apparel"
    ]
  },
  {
    id: "77919bbe-0e56-475b-adde-4f24dfed3a04",
    image: "https://i.ibb.co.com/FYcCt43/luxury-tower-set-6-piece.jpg",
    name: "Luxury Towel Set - Graphite Gray",
    rating: {
      stars: 4.5,
      count: 144
    },
    priceCents: 3599,
    keywords: [
      "bathroom",
      "washroom",
      "restroom",
      "towels",
      "bath towels"
    ]
  },
  {
    id: "3fdfe8d6-9a15-4979-b459-585b0d0545b9",
    image: "https://i.ibb.co.com/7t4916P/liquid-laundry-detergent-plain.jpg",
    name: "Liquid Laundry Detergent, 110 Loads, 82.5 Fl Oz",
    rating: {
      stars: 4.5,
      count: 305
    },
    priceCents: 2899,
    keywords: [
      "bathroom",
      "cleaning"
    ]
  },
  {
    id: "58b4fc92-e98c-42aa-8c55-b6b79996769a",
    image: "https://i.ibb.co.com/ZW5bmcK/knit-athletic-sneakers-gray.jpg",
    name: "Waterproof Knit Athletic Sneakers - Gray",
    rating: {
      stars: 4,
      count: 89
    },
    priceCents: 3390,
    keywords: [
      "shoes",
      "running shoes",
      "footwear"
    ]
  },
  {
    id: "5968897c-4d27-4872-89f6-5bcb052746d7",
    image: "https://i.ibb.co.com/16NTZ16/women-chiffon-beachwear-coverup-black.jpg)",
    name: "Women's Chiffon Beachwear Cover Up - Black",
    rating: {
      stars: 4.5,
      count: 235
    },
    priceCents: 2070,
    type: "clothing",
    sizeChartLink: "https://i.ibb.co.com/dLfrC12/clothing-size-chart.png",
    keywords: [
      "robe",
      "swimsuit",
      "swimming",
      "bathing",
      "apparel"
    ]
  },
  {
    id: "aad29d11-ea98-41ee-9285-b916638cac4a",
    image: "https://i.ibb.co.com/9Ybd28J/round-sunglasses-black.jpg",
    name: "Round Sunglasses",
    rating: {
      stars: 4.5,
      count: 30
    },
    priceCents: 1560,
    keywords: [
      "accessories",
      "shades"
    ]
  },
  {
    id: "04701903-bc79-49c6-bc11-1af7e3651358",
    image: "https://i.ibb.co.com/tz1Jnns/women-beach-sandals.jpg",
    name: "Women's Two Strap Buckle Sandals - Tan",
    rating: {
      stars: 4.5,
      count: 562
    },
    priceCents: 2499,
    keywords: [
      "footwear",
      "sandals",
      "women",
      "beach",
      "summer"
    ]
  },
  {
    id: "901eb2ca-386d-432e-82f0-6fb1ee7bf969",
    image: "https://i.ibb.co.com/8KrzLKg/blackout-curtain-set-beige.webp",
    name: "Blackout Curtains Set 4-Pack - Beige",
    rating: {
      stars: 4.5,
      count: 232
    },
    priceCents: 4599,
    keywords: [
      "bedroom",
      "curtains",
      "home"
    ]
  },
  {
    id: "82bb68d7-ebc9-476a-989c-c78a40ee5cd9",
    image: "https://i.ibb.co.com/hmXKwJZ/men-slim-fit-summer-shorts-gray.jpg",
    name: "Men's Slim-Fit Summer Shorts",
    rating: {
      stars: 4,
      count: 160
    },
    priceCents: 1699,
    type: "clothing",
    sizeChartLink: "https://i.ibb.co.com/dLfrC12/clothing-size-chart.png",
    keywords: [
      "shorts",
      "apparel",
      "mens"
    ]
  },
  {
    id: "c2a82c5e-aff4-435f-9975-517cfaba2ece",
    image: "https://i.ibb.co.com/Jdc5vTw/electric-glass-and-steel-hot-water-kettle.webp",
    name: "Electric Glass and Steel Hot Tea Water Kettle - 1.7-Liter",
    rating: {
      stars: 5,
      count: 846
    },
    priceCents: 3074,
    type: "appliance",
    instructionsLink: "https://i.ibb.co.com/X8S5R7P/appliance-instructions.png",
    warrantyLink: "https://i.ibb.co.com/SxvBJVw/appliance-warranty.png",
    keywords: [
      "water boiler",
      "appliances",
      "kitchen"
    ]
  },
  {
    id: "6b07d4e7-f540-454e-8a1e-363f25dbae7d",
    image: "https://i.ibb.co.com/QrBzZ14/facial-tissue-2-ply-18-boxes.jpg",
    name: "Ultra Soft Tissue 2-Ply - 18 Box",
    rating: {
      stars: 4,
      count: 99
    },
    priceCents: 2374,
    keywords: [
      "kleenex",
      "tissues",
      "kitchen",
      "tissues box",
      "napkins"
    ]
  },
  {
    id: "a82c6bac-3067-4e68-a5ba-d827ac0be010",
    image: "https://i.ibb.co.com/M64rBQ9/straw-sunhat.webp",
    name: "Straw Lifeguard Sun Hat",
    rating: {
      stars: 4,
      count: 215
    },
    priceCents: 2200,
    keywords: [
      "hats",
      "straw hats",
      "summer",
      "apparel"
    ]
  },
  {
    id: "e4f64a65-1377-42bc-89a5-e572d19252e2",
    image: "https://i.ibb.co.com/9ZV3rhB/sky-flower-stud-earrings.webp",
    name: "Sterling Silver Sky Flower Stud Earrings",
    rating: {
      stars: 4.5,
      count: 52
    },
    priceCents: 1799,
    keywords: [
      "jewelry",
      "accessories",
      "women"
    ]
  },
  {
    id: "b0f17cc5-8b40-4ca5-9142-b61fe3d98c85",
    image: "https://i.ibb.co.com/J54ddfz/women-stretch-popover-hoodie-black.jpg",
    name: "Women's Stretch Popover Hoodie",
    rating: {
      stars: 4.5,
      count: 2465
    },
    priceCents: 1374,
    type: "clothing",
    sizeChartLink: "https://i.ibb.co.com/dLfrC12/clothing-size-chart.png",
    keywords: [
      "hooded",
      "hoodies",
      "sweaters",
      "women",
      "apparel"
    ],
  },
  {
    id: "a93a101d-79ef-4cf3-a6cf-6dbe532a1b4a",
    image: "https://i.ibb.co.com/R06v6sM/bathroom-rug.jpg",
    name: "Bathroom Bath Rug Mat 20 x 31 Inch - Grey",
    rating: {
      stars: 4.5,
      count: 119
    },
    priceCents: 1250,
    keywords: [
      "bathmat",
      "bathroom",
      "home"
    ]
  },
  {
    id: "4f4fbcc2-4e72-45cc-935c-9e13d79cc57f",
    image: "https://i.ibb.co.com/MPWcLJc/women-knit-ballet-flat-black.jpg",
    name: "Women's Knit Ballet Flat",
    rating: {
      stars: 4,
      count: 326
    },
    priceCents: 2640,
    keywords: [
      "shoes",
      "flats",
      "women",
      "footwear"
    ]
  },
  {
    id: "8b5a2ee1-6055-422a-a666-b34ba28b76d4",
    image: "https://i.ibb.co.com/cv7nhfr/men-golf-polo-t-shirt-blue.jpg",
    name: "Men's Regular-Fit Quick-Dry Golf Polo Shirt",
    rating: {
      stars: 4.5,
      count: 2556
    },
    type: "clothing",
    sizeChartLink: "https://i.ibb.co.com/dLfrC12/clothing-size-chart.png",
    priceCents: 1599,
    keywords: [
      "tshirts",
      "shirts",
      "apparel",
      "mens"
    ]
  },
  {
    id: "b86ddc8b-3501-4b17-9889-a3bad6fb585f",
    image: "https://i.ibb.co.com/4sXndZK/trash-can-with-foot-pedal-50-liter.jpg",
    name: "Trash Can with Foot Pedal - Brushed Stainless Steel",
    rating: {
      stars: 4.5,
      count: 2286
    },
    priceCents: 8300,
    keywords: [
      "garbage",
      "bins",
      "cans",
      "kitchen"
    ]
  },
  {
    id: "19c6a64a-5463-4d45-9af8-e41140a4100c",
    image: "https://i.ibb.co.com/zG4GxJ7/duvet-cover-set-blue-twin.jpg",
    name: "Duvet Cover Set with Zipper Closure",
    rating: {
      stars: 4,
      count: 456
    },
    priceCents: 2399,
    keywords: [
      "bedroom",
      "bed sheets",
      "sheets",
      "covers",
      "home"
    ]
  },
  {
    id: "d2785924-743d-49b3-8f03-ec258e640503",
    image: "https://i.ibb.co.com/XsPtLX6/women-chunky-beanie-gray.webp",
    name: "Women's Chunky Cable Beanie - Gray",
    rating: {
      stars: 5,
      count: 83
    },
    priceCents: 1250,
    keywords: [
      "hats",
      "winter hats",
      "beanies",
      "tuques",
      "apparel",
      "women"
    ]
  },
  {
    id: "ee1f7c56-f977-40a4-9642-12ba5072e2b0",
    image: "https://i.ibb.co.com/bLf0x3P/men-chino-pants-beige.jpg",
    name: "Men's Classic-fit Pleated Chino Pants",
    rating: {
      stars: 4.5,
      count: 9017
    },
    priceCents: 2290,
    type: "clothing",
    sizeChartLink: "https://i.ibb.co.com/dLfrC12/clothing-size-chart.png",
    keywords: [
      "pants",
      "apparel",
      "mens"
    ]
  },
  {
    id: "1c079479-8586-494f-ab53-219325432536",
    image: "https://i.ibb.co.com/S7BZ5vw/men-athletic-shoes-green.jpg",
    name: "Men's Athletic Sneaker",
    rating: {
      stars: 4,
      count: 229
    },
    priceCents: 3890,
    keywords: [
      "shoes",
      "running shoes",
      "footwear",
      "mens"
    ]
  },
  {
    id: "4df68c27-fd59-4a6a-bbd1-e754ddb6d53c",
    image: "https://i.ibb.co.com/xfqYyh7/men-navigator-sunglasses-brown.jpg",
    name: "Men's Navigator Sunglasses Pilot",
    rating: {
      stars: 3.5,
      count: 42
    },
    priceCents: 1690,
    keywords: [
      "sunglasses",
      "glasses",
      "accessories",
      "shades"
    ]
  },
  {
    id: "4e37dd03-3b23-4bc6-9ff8-44e112a92c64",
    image: "https://i.ibb.co.com/CKDdqvL/non-stick-cooking-set-15-pieces.webp",
    name: "Non-Stick Cookware Set, Pots, Pans and Utensils - 15 Pieces",
    rating: {
      stars: 4.5,
      count: 511
    },
    priceCents: 6797,
    keywords: [
      "cooking set",
      "kitchen"
    ]
  },
  {
    id: "a434b69f-1bc1-482d-9ce7-cd7f4a66ce8d",
    image: "https://i.ibb.co.com/VjHQNGf/vanity-mirror-silver.jpg",
    name: "Vanity Mirror with Heavy Base - Chrome",
    rating: {
      stars: 4.5,
      count: 130
    },
    priceCents: 1649,
    keywords: [
      "bathroom",
      "washroom",
      "mirrors",
      "home"
    ]
  },
  {
    id: "a45cfa0a-66d6-4dc7-9475-e2b01595f7d7",
    image: "https://i.ibb.co.com/myRR3yQ/women-french-terry-fleece-jogger-camo.jpg",
    name: "Women's Fleece Jogger Sweatpant",
    rating: {
      stars: 4.5,
      count: 248
    },
    priceCents: 2400,
    type: "clothing",
    sizeChartLink: "https://i.ibb.co.com/dLfrC12/clothing-size-chart.png",
    keywords: [
      "pants",
      "sweatpants",
      "jogging",
      "apparel",
      "women"
    ]
  },
  {
    id: "d339adf3-e004-4c20-a120-40e8874c66cb",
    image: "https://i.ibb.co.com/Kznc2kH/double-elongated-twist-french-wire-earrings.webp",
    name: "Double Oval Twist French Wire Earrings - Gold",
    rating: {
      stars: 4.5,
      count: 117
    },
    priceCents: 2400,
    keywords: [
      "accessories",
      "women"
    ]
  },
  {
    id: "d37a651a-d501-483b-aae6-a9659b0757a0",
    image: "https://i.ibb.co.com/vxDmGL0/round-airtight-food-storage-containers.jpg",
    name: "Round Airtight Food Storage Containers - 5 Piece",
    rating: {
      stars: 4,
      count: 126
    },
    priceCents: 2899,
    keywords: [
      "boxes",
      "food containers",
      "kitchen"
    ]
  },
  {
    id: "0d7f9afa-2efe-4fd9-b0fd-ba5663e0a524",
    image: "https://i.ibb.co.com/1MGQwLt/coffeemaker-with-glass-carafe-black.jpg",
    name: "Coffeemaker with Glass Carafe and Reusable Filter - 25 Oz, Black",
    rating: {
      stars: 4.5,
      count: 1211
    },
    priceCents: 2250,
    type: "appliance",
    instructionsLink: "https://i.ibb.co.com/X8S5R7P/appliance-instructions.png",
    warrantyLink: "https://i.ibb.co.com/SxvBJVw/appliance-warranty.png",
    keywords: [
      "coffeemakers",
      "kitchen",
      "appliances"
    ]
  },
  {
    id: "02e3a47e-dd68-467e-9f71-8bf6f723fdae",
    image: "https://i.ibb.co.com/8zZCXrt/blackout-curtains-black.jpg)",
    name: "Blackout Curtains Set 42 x 84-Inch - Black, 2 Panels",
    rating: {
      stars: 4.5,
      count: 363
    },
    priceCents: 3099,
    keywords: [
      "bedroom",
      "home"
    ]
  },
  {
    id: "8a53b080-6d40-4a65-ab26-b24ecf700bce",
    image: "https://i.ibb.co.com/dPgLGkj/cotton-bath-towels-teal.webp",
    name: "100% Cotton Bath Towels - 2 Pack, Light Teal",
    rating: {
      stars: 4.5,
      count: 93
    },
    priceCents: 2110,
    keywords: [
      "bathroom",
      "home",
      "towels"
    ]
  },
  {
    id: "10ed8504-57db-433c-b0a3-fc71a35c88a1",
    image: "https://i.ibb.co.com/b38YyQ2/knit-athletic-sneakers-pink.webp",
    name: "Waterproof Knit Athletic Sneakers - Pink",
    rating: {
      stars: 4,
      count: 89
    },
    priceCents: 3390,
    keywords: [
      "shoes",
      "running shoes",
      "footwear",
      "womens"
    ]
  },
  {
    id: "77a845b1-16ed-4eac-bdf9-5b591882113d",
    image: "https://i.ibb.co.com/fNpQh2c/countertop-blender-64-oz.jpg",
    name: "Countertop Blender - 64oz, 1400 Watts",
    rating: {
      stars: 4,
      count: 3
    },
    priceCents: 10747,
    type: "appliance",
    instructionsLink: "https://i.ibb.co.com/X8S5R7P/appliance-instructions.png",
    warrantyLink: "https://i.ibb.co.com/SxvBJVw/appliance-warranty.png",
    keywords: [
      "food blenders",
      "kitchen",
      "appliances"
    ]
  },
  {
    id: "36c64692-677f-4f58-b5ec-0dc2cf109e27",
    image: "https://i.ibb.co.com/6ZSD1T2/floral-mixing-bowl-set.jpg)",
    name: "10-Piece Mixing Bowl Set with Lids - Floral",
    rating: {
      stars: 5,
      count: 679
    },
    priceCents: 3899,
    keywords: [
      "mixing bowls",
      "baking",
      "cookware",
      "kitchen"
    ]
  },
  {
    id: "aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f",
    image: "https://i.ibb.co.com/fMmq5kK/kitchen-paper-towels-30-pack.jpg",
    name: "2-Ply Kitchen Paper Towels - 30 Pack",
    rating: {
      stars: 4.5,
      count: 1045
    },
    priceCents: 5799,
    keywords: [
      "kitchen",
      "kitchen towels",
      "tissues"
    ]
  },
  {
    id: "bc2847e9-5323-403f-b7cf-57fde044a955",
    image: "https://i.ibb.co.com/YLJq23G/men-cozy-fleece-zip-up-hoodie-red.jpg",
    name: "Men's Full-Zip Hooded Fleece Sweatshirt",
    rating: {
      stars: 4.5,
      count: 3157
    },
    priceCents: 2400,
    type: "clothing",
    sizeChartLink: "https://i.ibb.co.com/dLfrC12/clothing-size-chart.png",
    keywords: [
      "sweaters",
      "hoodies",
      "apparel",
      "mens"
    ]
  },
  {
    id: "id-1",
    image: "https://i.ibb.co.com/HKKw8C4/backpack.jpg",
    name: "Black Backpack",
    rating: {
      stars: 4.0,
      count: 123
    },
    priceCents: 2500
  }
].map((productDetails) => {
  // type in products object is a discriminator property
  if (productDetails.type === 'clothing') {
    return new Clothing(productDetails)
  }

  if (productDetails.type === 'appliance') {
    return new Appliance(productDetails)
  }

  return new Products(productDetails);
});
*/

// .map() return new array, how does the code above works?
/*
  [                               [
    product1,   --> function -->    new Product(product1),
    product2,   --> function -->    new Product(product2),
    product3,   --> function -->    new Product(product3),
    ...                             ...
  ]                               ]
*/

// console.log(products);

// Since I archive JavaScript Amazon project on Github repo,
// Loading the image locally will increase the upload file size.
function pickRating(stars) {
  const starsLink = [
    'https://i.ibb.co.com/7zh8XJW/rating-0.png',
    'https://i.ibb.co.com/DbmyjRf/rating-05.png',
    'https://i.ibb.co.com/2WyNY9x/rating-10.png',
    'https://i.ibb.co.com/XjqYH0r/rating-15.png',
    'https://i.ibb.co.com/s6twLWf/rating-20.png',
    'https://i.ibb.co.com/pjv1fFR/rating-25.png',
    'https://i.ibb.co.com/3S3WXXj/rating-30.png',
    'https://i.ibb.co.com/BjLwNzg/rating-35.png',
    'https://i.ibb.co.com/Npj0thX/rating-40.png',
    'https://i.ibb.co.com/5vpNBVh/rating-45.png',
    'https://i.ibb.co.com/4FT2ZGR/rating-50.png'
  ];

  if (stars === 0) return starsLink[0];
  if (stars === 0.5) return starsLink[1];
  if (stars === 1.0) return starsLink[2];
  if (stars === 1.5) return starsLink[3];
  if (stars === 2.0) return starsLink[4];
  if (stars === 2.5) return starsLink[5];
  if (stars === 3.0) return starsLink[6];
  if (stars === 3.5) return starsLink[7];
  if (stars === 4.0) return starsLink[8];
  if (stars === 4.5) return starsLink[9];
  if (stars === 5.0) return starsLink[10];
  
}