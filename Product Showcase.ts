
interface Item {
  type: "book" | "electronics" | "clothing";
  id: string;
  price: number;
}

interface Book extends Item {
  type: "book";
  title: string;
  author: string;
}

interface Electronics extends Item {
  type: "electronics";
  item: string;
  model: string;
  warranty?: number;
}

interface Clothing extends Item {
  type: "clothing";
  item: string;
  brand: string;
  size?: "S" | "M" | "L";
}

type Product = Book | Electronics | Clothing;

class Collection<T> {
  constructor(public items: T[]) {}

  getAll(): T[] {
    return this.items;
  }

  filter(callback: (item: T) => boolean): T[] {
    return this.items.filter(callback);
  }
}

function renderProduct(product: Product): string {
  let productInfo = "";

  switch (product.type) {
    case "book":
      productInfo = `Book: ${product.title} by ${product.author}`;
      break;

    case "electronics":
      productInfo = `Electronics: ${product.item} - ${product.model}`;

      if (product.warranty !== undefined) {
        productInfo += ` - Warranty: ${product.warranty} year(s)`;
      }
      break;

    case "clothing":
      productInfo = `Clothing: ${product.item} by ${product.brand}`;

      if (product.size !== undefined) {
        productInfo += ` - Size ${product.size}`;
      }
      break;

    default:
      throw new Error(
        `Unknown product type: ${JSON.stringify(product)}`
      );
  }

  return `
    <div class="item" id="${product.id}">
      <p class="price">${product.price}</p>
      <p>${productInfo}</p>
    </div>
  `;
}

const products = new Collection<Product>([
  {
    type: "book",
    id: "book-1",
    price: 25,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald"
  },
  {
    type: "book",
    id: "book-2",
    price: 30,
    title: "Atomic Habits",
    author: "James Clear"
  },
  {
    type: "electronics",
    id: "electronics-1",
    price: 799,
    item: "Laptop",
    model: "Dell XPS 15",
    warranty: 2
  },
  {
    type: "electronics",
    id: "electronics-2",
    price: 99,
    item: "Headphones",
    model: "Sony WH-1000XM5"
  },
  {
    type: "clothing",
    id: "clothing-1",
    price: 40,
    item: "T-Shirt",
    brand: "Nike",
    size: "M"
  },
  {
    type: "clothing",
    id: "clothing-2",
    price: 60,
    item: "Jacket",
    brand: "Adidas",
    size: "L"
  }
]);

function showProducts(filter?: Product["type"]): void {
  const output = document.querySelector<HTMLElement>("#output")!;

  const filteredProducts = filter
    ? products.filter(product => product.type === filter)
    : products.getAll();

  output.innerHTML = filteredProducts
    .map(product => renderProduct(product))
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#all")!.addEventListener("click", () => {
    showProducts();
  });

  document.querySelector("#books")!.addEventListener("click", () => {
    showProducts("book");
  });

  document.querySelector("#electronics")!.addEventListener("click", () => {
    showProducts("electronics");
  });

  document.querySelector("#clothing")!.addEventListener("click", () => {
    showProducts("clothing");
  });

  showProducts();
});
