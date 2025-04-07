import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';



@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any = null;
  isLoading: boolean = true;
  error: string | null = null;
  enrichingDescription: boolean = false;
  originalDescription: string = '';
  enrichedDescription: string = '';
  enrichmentOptions = {
    model: 'jina-chat-v1',
    tone: 'professionnel',
    length: 'medium'
  };
  toneOptions = [
    { value: 'professionnel', label: 'Professionnel' },
    { value: 'enthousiaste', label: 'Enthousiaste' },
    { value: 'informatif', label: 'Informatif' },
    { value: 'persuasif', label: 'Persuasif' },
    { value: 'luxe', label: 'Luxe' }
  ];
  lengthOptions = [
    { value: 'short', label: 'Court' },
    { value: 'medium', label: 'Moyen' },
    { value: 'long', label: 'Long' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (!productId) {
      this.error = 'ID de produit non valide';
      this.isLoading = false;
      return;
    }

    this.isLoading = true;
    this.productService.getProductById(productId).subscribe(
      product => {
        this.product = product;
        this.originalDescription = product.description || '';
        this.isLoading = false;
      },
      error => {
        console.error('Erreur lors du chargement du produit:', error);
        this.error = 'Impossible de charger les détails du produit';
        this.isLoading = false;
      }
    );
  }

  enrichDescription(): void {
    if (!this.product || this.enrichingDescription) return;

    this.enrichingDescription = true;
    const productId = this.product.id;

    this.productService.enrichProductDescription(
      productId, 
      this.enrichmentOptions
    ).subscribe(
      response => {
        this.originalDescription = response.original_description || '';
        this.enrichedDescription = response.enriched_description || '';
        this.enrichingDescription = false;
      },
      error => {
        console.error('Erreur lors de l\'enrichissement de la description:', error);
        this.error = 'Erreur lors de l\'enrichissement de la description';
        this.enrichingDescription = false;
      }
    );
  }

  keepEnrichedDescription(): void {
    if (!this.product || !this.enrichedDescription) return;

    const updatedProduct = { ...this.product, description: this.enrichedDescription };
    
    this.productService.updateProduct(this.product.id, updatedProduct).subscribe(
      response => {
        this.product = response;
        this.originalDescription = response.description;
        this.enrichedDescription = '';
      },
      error => {
        console.error('Erreur lors de la mise à jour de la description:', error);
        this.error = 'Erreur lors de la mise à jour de la description';
      }
    );
  }

  rejectEnrichedDescription(): void {
    this.enrichedDescription = '';
  }

  goToEdit(): void {
    if (this.product) {
      this.router.navigate(['/products/edit', this.product.id]);
    }
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }

  

  deleteProduct(): void {
    if (!this.product) return;
    
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      this.productService.deleteProduct(this.product.id).subscribe(
        () => {
          this.router.navigate(['/products']);
        },
        error => {
          console.error('Erreur lors de la suppression du produit:', error);
          this.error = 'Erreur lors de la suppression du produit';
        }
      );
    }
  }
}