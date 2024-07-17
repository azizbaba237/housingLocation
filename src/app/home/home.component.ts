import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HousingLocationComponent, CommonModule],
  template: `
    <section>
      <form action="" class="mt-4 mb-7 ">
        <input
          type="text"
          name=""
          id=""
          placeholder="Filter by the city"
          class="border-2 border-black rounded-xl pl-2 py-1 lg:w-96 md:w-72 "
          #filter
        />
        <button
          (click)="filterResults(filter.value)"
          class="bg-sky-600 text-white px-2 py-1 rounded ml-1 text-md hover:bg-sky-800 hover:text-white "
        >
          Search
        </button>
      </form>
    </section>
    <section class="grid lg:grid-cols-4 grid-cols-2 gap-2 md:grid-cols-3">
      <app-housing-location
        *ngFor="let housingLocation of filteredLocationList"
        [housingLocation]="housingLocation"
      ></app-housing-location>
    </section>
  `,
  styleUrl: './home.component.css',
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];

  constructor() {
    //this.housingLocationList = this.housingService.getAllHousingLocation();
    this.housingService
      .getAllHousingLocation()
      .then((housingLocationList: HousingLocation[]) => {
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = housingLocationList;
      });
  }

  filterResults(text: string) {
    if (!text) this.filteredLocationList = this.housingLocationList;

    this.filteredLocationList = this.housingLocationList.filter(
      (housingLocation) =>
        housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}
