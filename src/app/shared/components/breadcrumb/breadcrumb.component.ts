import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Params, RouterLink } from '@angular/router';
import { Breadcrumb } from './model/breadcrumb.model';

@Component({
  selector: 'app-breadcrumb',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent implements OnInit {

  @Input() forOf!: Breadcrumb[];

	@Input() link1!: Breadcrumb;
	@Input() link2!: Breadcrumb;
	@Input() link3!: Breadcrumb;
	@Input() latestParams?: Params = {};

  allLink: Breadcrumb[] = [];
  
  ngOnInit(): void {
    if(this.forOf && this.forOf.length > 0) {
      this.allLink = this.forOf;
    } else {
      this.allLink = this.allLink.concat([
				{ ...this.link1 },
				{ ...this.link2 },
				{ ...this.link3 },
			]);
    }

    this.allLink = this.allLink.filter((data) => data.title)
  }
}
