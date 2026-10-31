type Category = 
  | 'Sport'
  | 'Cruiser'
  | 'Touring'
  | 'Dirt'
  | 'Adventure'
  | 'Naked'
  | 'Electric';

interface Motorcycle {
  id: string;
  name: string;
  manufacturer: string;
  category: Category;
  price: number;
  image_url: string;
  description: string;
  year: number;
  created_at: Date;
}


async function fetchMotorcycles():  Promise<Motorcycle[]> {
    const res = await fetch(`https://cdn.freecodecamp.org/curriculum/labs/data/motorcycle-shop/motorcycles.json`);
    const motorcycles = await res.json();
    return [...motorcycles].map((m: Motorcycle) => ({ ...m, created_at: new Date(m.created_at) })).sort((a, b) => 
      b.created_at.getTime() - a.created_at.getTime()
    );
}

function renderMotorcycleCard(motorcycle: Motorcycle): string {
    return `
      <div class="motorcycle-card">
        <div class="motorcycle-card-image-container">
          <img
            src="${motorcycle.image_url}"
            alt="${motorcycle.name}"
            class="motorcycle-card-image"
          />
          <div class="motorcycle-card-year-badge">
            ${motorcycle.year}
          </div>
        </div>
        <div class="motorcycle-card-content">
          <div class="motorcycle-card-header">
            <div>
              <h3 class="motorcycle-card-title">${motorcycle.name}</h3>
              <p class="motorcycle-card-manufacturer">${motorcycle.manufacturer}</p>
            </div>
            <span class="motorcycle-card-category">
              ${motorcycle.category}
            </span>
          </div>
          <p class="motorcycle-card-description">${motorcycle.description}</p>
          <div class="motorcycle-card-footer">
            <div>
              <p class="motorcycle-card-price">
                $${motorcycle.price.toLocaleString()}
              </p>
           
            </div>
            <button class="motorcycle-card-button" data-motorcycle-id="${motorcycle.id}">
              View Details
            </button>
          </div>
        </div>
      </div>
    `;
  }

class MotorcycleGalleryApp {
  private allMotorcycles: Motorcycle[] = [];
  private filterTerm: string = '';
  constructor() {
    this.init();
  }

  async loadData(): Promise<void> {
    await this.loadMotorcycles();
  }

  private async init(): Promise<void> {
    this.setupEventListeners();
  }

  private async loadMotorcycles(): Promise<void> {
    this.showLoading(true);
    try {
      const data = await fetchMotorcycles();
      this.allMotorcycles = [...data];
    } catch (error) {
      console.error('Error loading motorcycles:', error);
    } finally {
      this.showLoading(false);
    }
  }

  private setupEventListeners(): void {
    const nameFilterInput = document.getElementById('name-filter-input') as HTMLInputElement;
    if (nameFilterInput) {
      nameFilterInput.addEventListener('input', (event: Event) => {
        const {value} = event.target as HTMLInputElement;
        this.filterTerm = value;
        this.render();
      });
    }
  }
 
  render(): void {
    this.renderResultsCount();
    this.renderMotorcycles();
  }

  private renderResultsCount(): void {
    const resultsNumber = document.getElementById('results-number');
    if (resultsNumber) {
      resultsNumber.textContent = this.allMotorcycles.filter((m: Motorcycle) => m.name.toLowerCase().includes(this.filterTerm.toLowerCase())).length.toString();
    }
  }

  renderMotorcycles(): void {
    const container = document.getElementById('motorcycle-grid');
    const noResults = document.getElementById('no-results');
    if (!container) return;

    if (noResults) {
      noResults.style.display = 'none';
    }

    const filteredResults = this.allMotorcycles.filter((m: Motorcycle) => m.name.toLowerCase().includes(this.filterTerm.toLowerCase()));

    if (filteredResults.length === 0 && noResults) {
      container.innerHTML = '';
      container.style.display = 'none';
      noResults.style.display = 'block';
      return;
    }

    container.style.display = 'grid';
    container.innerHTML = filteredResults
      .map(renderMotorcycleCard)
      .join('');
  }

  private showLoading(show: boolean): void {
    const loadingContainer = document.getElementById('loading-container');
    const motorcycleGrid = document.getElementById('motorcycle-grid');
    if (loadingContainer) {
      loadingContainer.style.display = show ? 'flex' : 'none';
    }
    if (motorcycleGrid) {
      motorcycleGrid.style.display = show ? 'none' : 'grid';
    }
  }
}

document.addEventListener('DOMContentLoaded',async () => {
   const gallery = new MotorcycleGalleryApp();
   await gallery.loadData();
   gallery.render();
});
