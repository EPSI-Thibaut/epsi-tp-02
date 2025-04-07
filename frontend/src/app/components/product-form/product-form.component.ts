import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  isEditMode = false;
  productId: string | null = null;
  isSubmitting = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    
    // Vérifier si on est en mode édition
    this.productId = this.route.snapshot.paramMap.get('id');
    
    if (this.productId) {
      this.isEditMode = true;
      this.loadProductData(this.productId);
    }
  }

  // Initialiser le formulaire avec validation
  initForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.maxLength(500)],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required]
    });
  }

  // Charger les données du produit pour l'édition
  loadProductData(id: string): void {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.productForm.patchValue({
          name: product.name,
          description: product.description || '',
          price: product.price,
          category: product.category || ''
        });
      },
      error: (err) => {
        console.error('Erreur lors du chargement du produit :', err);
        this.error = 'Erreur lors du chargement des informations du produit.';
      }
    });
  }

  // Soumettre le formulaire
  onSubmit(): void {
    if (this.productForm.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    this.error = null;
    
    const productData = this.productForm.value;
    
    productData.price = parseFloat(productData.price);
    
    if (this.isEditMode && this.productId) {
      this.productService.updateProduct(this.productId, productData).subscribe({
        next: () => {
          this.router.navigate(['/product', this.productId]);
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du produit :', err);
          this.error = 'Erreur lors de la mise à jour du produit.';
          this.isSubmitting = false;
        }
      });
    } else {
      this.productService.createProduct(productData).subscribe({
        next: (newProduct) => {
          this.router.navigate(['/product', newProduct.id]);
        },
        error: (err) => {
          console.error('Erreur lors de la création du produit :', err);
          this.error = 'Erreur lors de la création du produit.';
          this.isSubmitting = false;
        }
      });
    }
  }

  // Vérifier si un champ particulier a des erreurs
  hasError(controlName: string, errorName: string): boolean {
    const control = this.productForm.get(controlName);
    return control !== null && control.touched && control.hasError(errorName);
  }

  // Annuler et retourner à la liste ou au détail
  cancel(): void {
    if (this.isEditMode && this.productId) {
      this.router.navigate(['/product', this.productId]);
    } else {
      this.router.navigate(['/products']);
    }
  }
}