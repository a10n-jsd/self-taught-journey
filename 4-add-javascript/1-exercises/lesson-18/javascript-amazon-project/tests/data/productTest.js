import { Appliance, Clothing, Products } from "../../data/products.js";

describe('test suite: Product class', () => {
  let product;
  beforeEach(() => {
    product = new Products(
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
      }
    );
  });

  it('has the correct properties', () => {
    // Just pick a few to test
    expect(product.id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(product.image).toEqual('https://i.ibb.co.com/0CCmcj4/athletic-cotton-socks-6-pairs.jpg');
    expect(product.name).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
    expect(product.rating).toEqual({
      stars: 4.5,
      count: 87
    });
  });

  it('gets the correct stars rating', () => {
    expect(product.getStarsUrl()).toEqual('https://i.ibb.co.com/5vpNBVh/rating-45.png')
  });

  it('gets the price', () => {
    expect(product.getPrice()).toEqual('10.90')
  });

  it('does not display any extra info', () => {
    expect(product.getExtraInfoHTML()).toEqual('');
  });


});

describe('test suite: Clothing class', () => {
  let clothing;
  beforeEach(() => {
    clothing = new Clothing(
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
      }
    );
  });

  it('has the correct properties', () => {
    expect(clothing.id).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
    expect(clothing.image).toEqual('https://i.ibb.co.com/V3msDdj/adults-plain-cotton-tshirt-2-pack-teal.jpg');
    expect(clothing.name).toEqual('Adults Plain Cotton T-Shirt - 2 Pack');
    expect(clothing.rating).toEqual({
      stars: 4.5,
      count: 56
    });
  });

  it('gets the correct stars rating', () => {
    expect(clothing.getStarsUrl()).toEqual('https://i.ibb.co.com/5vpNBVh/rating-45.png')
  });

  it('gets the price', () => {
    expect(clothing.getPrice()).toEqual('7.99')
  });

  it('displays size chart link in extra info HTML', () => {
    // It's hard to match a multiline string exactly
    // just check if the result contains certain strings.
    expect(clothing.getExtraInfoHTML()).toContain(
    '<a href="https://i.ibb.co.com/dLfrC12/clothing-size-chart.png" target="_blank">'
    );
  });
});

describe('test suite: Appliance class', () => {
  let appliance;
  beforeEach(() => {
    appliance = new Appliance(
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
      }
    );
  });

  it('has the correct properties', () => {
    expect(appliance.id).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add');
    expect(appliance.image).toEqual('https://i.ibb.co.com/KwDJ1Sx/black-2-slot-toaster.jpg');
    expect(appliance.name).toEqual('2 Slot Toaster - Black');
    expect(appliance.rating).toEqual({
      stars: 5,
      count: 2197
    });
  });

  it('gets the correct stars rating', () => {
    expect(appliance.getStarsUrl()).toEqual('https://i.ibb.co.com/4FT2ZGR/rating-50.png')
  });

  it('gets the price', () => {
    expect(appliance.getPrice()).toEqual('18.99')
  });

  it('displays size chart link in extra info HTML', () => {
    // It's hard to match a multiline string exactly
    // just check if the result contains certain strings.
    expect(appliance.getExtraInfoHTML()).toContain(
    '<a href="https://i.ibb.co.com/X8S5R7P/appliance-instructions.png" target="_blank">'
    );
    expect(appliance.getExtraInfoHTML()).toContain('Instructions');
    expect(appliance.getExtraInfoHTML()).toContain(
    '<a href="https://i.ibb.co.com/SxvBJVw/appliance-warranty.png" target="_blank">'
    );
    expect(appliance.getExtraInfoHTML()).toContain('Warranty');
  });
});