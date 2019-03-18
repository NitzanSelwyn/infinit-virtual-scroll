import { Component, OnInit, ViewChild } from "@angular/core";
import { ProducsService } from "../Service/producs.service";
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
@Component({
  selector: "app-products-list",
  templateUrl: "./products-list.component.html",
  styleUrls: ["./products-list.component.css"]
})
export class ProductsListComponent implements OnInit {
  constructor(private service: ProducsService) {}

  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  theEnd = false;
  index = 0;
  productsList = [];
  offset = new BehaviorSubject(null);
  infinite: Observable<any[]>;
  searchBox: string;
  searchSubject = new Subject<string>();
  sortByName: boolean;

  ngOnInit() {
    this.searchSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.filterProdcuts(value);
      });

    this.service.GetProducts(this.index).subscribe(data => {
      this.productsList = data;
    });
  }

  filterProdcuts(value) {
    this.index = 0;
    this.service.FilterProducts(this.index, value).subscribe(data => {
      console.log(data);
      this.productsList = data;
    });
  }

  onCheckBoxChange() {
    this.service
      .GetProductsByName(this.index, this.searchBox)
      .subscribe(data => {
        this.productsList = data;
      });
  }

  getBatch() {
    const end = this.viewport.getRenderedRange().end;
    const start = this.viewport.getRenderedRange().start;
    const total = this.viewport.getDataLength();

    if (start === 0) {
      if (this.index === 0) {
        return;
      } else {
        return;
        // this.index -= 10;
        // this.getProdIfUp(this.index);
      }
    } else {
      if (end === total) {
        this.index += 10;
        this.getProdIfDown(this.index);
      }
    }
    console.log(this.index);
  }

  getProdIfDown(index) {
    if (this.searchBox !== "") {
      this.service.GetProducts(index).subscribe(data => {
        this.viewport.scrollToIndex(0);
        this.productsList = data;
      });
    } else {
      this.service
        .FilterProducts(this.index, this.searchBox)
        .subscribe(data => {
          console.log(data);
          this.productsList = data;
        });
    }
  }

  getProdIfUp(index) {
    if (this.searchBox !== "") {
      this.service.GetProducts(index).subscribe(data => {
        this.viewport.scrollToIndex(this.viewport.getDataLength() + 2);
        this.productsList = data;
      });
    } else {
      this.service
        .FilterProducts(this.index, this.searchBox)
        .subscribe(data => {
          this.productsList = data;
        });
    }
  }

  trackByIdx(i) {
    return i;
  }
}
