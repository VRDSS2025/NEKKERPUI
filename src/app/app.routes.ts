import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login')
        .then(m => m.LoginComponent)
  },

  {
    path: '',
    loadComponent: () =>
      import('./layout/main-layout/main-layout')
        .then(m => m.MainLayoutComponent),

    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./features/home/home')
            .then(m => m.HomeComponent)
      },

      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/products')
            .then(m => m.ProductsComponent)
      },

      {
        path: 'products/group',
        loadComponent: () =>
          import('./features/products/group/group')
            .then(m => m.GroupComponent)
      },
      {
        path: 'products/species',
        loadComponent: () =>
          import('./features/products/species/species')
            .then(m => m.SpeciesComponent)
      },
      {
        path : 'products/product',
        loadComponent: () =>
          import('./features/products/product/product')
            .then(m => m.ProductComponent)
      },
      {
        path: 'products/sub-product-form',
        loadComponent: () =>
          import('./features/products/sub-product-form/sub-product-form')
            .then(m => m.SubProductFormComponent)
      },
      {
        path: 'products/freezing-technology', 
        loadComponent: () =>
          import('./features/products/freezing-technology/freezing-technology')
            .then(m => m.FreezingTechnologyComponent)
      },
      {
      path : 'products/product-preparation',
      loadComponent: () =>
        import('./features/products/product-preparation/product-preparation')
      .then(m => m.ProductPreparationComponent)
      },
      {
        path: 'products/product-master',
        loadComponent: () =>
          import('./features/products/product-master/product-master')
            .then(m => m.ProductMasterComponent)
      },
      {
        path: 'products/grade',
        loadComponent: () =>
          import('./features/products/grade/grade')
            .then(m => m.GradeComponent)
      },
      {
          path: 'products/brand',
          loadComponent: () =>
            import('./features/products/brand/brand')
              .then(m => m.BrandComponent)
      },{
        path: 'products/packing-style',
        loadComponent: () =>
          import('./features/products/packing-style/packing-style')
            .then(m => m.PackingStyleComponent)
      },
      {
        path: 'products/domestic-sales',
        loadComponent: () =>
          import('./features/products/domestic-sales/domestic-sales') 
           .then(m => m.DomesticSalesComponent)
      },

      {
        path: 'consignee',
        loadComponent: () =>
          import('./features/consignee/consignee')
            .then(m => m.ConsigneeComponent)
      },
      {
          path : 'consignee/consigne',
          loadComponent: () =>
            import('./features/consignee/consigne/consigne')
          .then(m => m.ConsigneComponent)
      },
      {
        path: 'consignee/ds-consignee',
        loadComponent: () =>
          import('./features/consignee/ds-consignee/ds-consignee')
        .then(m => m.DsConsigneeComponent)
      },

      {
        path: 'countries',
        loadComponent: () =>
          import('./features/list-of-countries/list-of-countries')
            .then(m => m.ListOfCountriesComponent)
      },
      {
          path :'countries/list',
          loadComponent: () =>
            import('./features/list-of-countries/list-of-countrie/list-of-countrie')
          .then(m => m.ListOfCountriesComponent)
      }
    ]
  },

  {
    path: '**',
    redirectTo: 'login'
  }
];