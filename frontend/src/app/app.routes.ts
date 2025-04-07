import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

export const routes: Routes = [
  // Redirection de la route racine vers 'home'
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  
  // Route home qui affiche la liste des produits
  { path: 'home', component: ProductListComponent },
  
  // Route alternative pour la liste des produits
  { path: 'products', component: ProductListComponent },
  
  // Route pour les détails d'un produit
  { path: 'product/:id', component: ProductDetailComponent },

  // Route pour la modification d'un produit
  { path: 'products/edit/:id', component: ProductDetailComponent }
];