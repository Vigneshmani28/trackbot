import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.createBreadcrumbs();
      });
  }

  private createBreadcrumbs(): Breadcrumb[] {
    let breadcrumbs: Breadcrumb[] = [];
    let urlSegments: string[] = [];
  
    let route = this.activatedRoute.root;
  
    while (route.firstChild) {
      route = route.firstChild;
      const routeConfig = route.routeConfig;
  
      if (routeConfig?.path && routeConfig.data?.['breadcrumb']) {
        urlSegments.push(routeConfig.path);
        const fullPath = `/${urlSegments.join('/')}`;
        
        breadcrumbs.push({ 
          label: routeConfig.data['breadcrumb'], 
          url: fullPath 
        });
      }
    }
  
     return breadcrumbs.length > 1 ? breadcrumbs : [];
  }
  
}
