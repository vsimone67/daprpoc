import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { ActivatedRoute, NavigationEnd, Router, } from "@angular/router";
import { filter } from "rxjs/operators";
import { isNullOrUndefined } from "util";

@Component({
  selector: "breadcrumb",
  templateUrl: "./breadcrumb.component.html",
  styleUrls: ["./breadcrumb.component.css"],
})
export class BreadcrumbComponent implements OnInit {
  static readonly ROUTE_DATA_BREADCRUMB = "breadcrumb";
  static readonly ROUTE_DATA_BREADCRUMB_PARENT_NAME = "parentName";
  static readonly ROUTE_DATA_BREADCRUMB_PARENT_URL = "parentUrl";
  readonly home = { icon: "pi pi-home", routerLink: '/' };
  menuItems: MenuItem[];
  items: MenuItem[];
  allItems: MenuItem[]
  isHomePage: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(
        () =>
          (this.menuItems = this.createBreadcrumbs(this.activatedRoute.root))
      );
  }
  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = "#",
    breadcrumbs: MenuItem[] = []
  ): MenuItem[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join("/");
      if (routeURL !== "") {
        url += `/${routeURL}`;
      }

      const label =
        child.snapshot.data[BreadcrumbComponent.ROUTE_DATA_BREADCRUMB];

      if (!isNullOrUndefined(label)) {
        const parentName =
          child.snapshot.data[
          BreadcrumbComponent.ROUTE_DATA_BREADCRUMB_PARENT_NAME
          ];

        if (!isNullOrUndefined(parentName)) {
          const parentUrl =
            child.snapshot.data[
            BreadcrumbComponent.ROUTE_DATA_BREADCRUMB_PARENT_URL
            ];

          // all breadcrumbs will be in the format of the class name in the json file to tranlate
          // we will take that label and get its value from the current language tranlaton file

          breadcrumbs.push({ label: parentName, url: parentUrl });
        }
        breadcrumbs.push({ label: label, url });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
  }
}
