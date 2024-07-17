import { Component, Input } from '@angular/core';
import { HousingLocation } from '../housing-location';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [RouterModule],
  template: `
    <section class="lg:rounded-2xl md:rounded-lg bg-sky-100">
      <img
        [src]="housingLocation.photo"
        alt="Exterior photo of {{ housingLocation.name }}"
        class="w-full lg:h-48 lg:rounded-t-2xl md:h-52 md:rounded-t-lg "
      />

      <h2 class="font-bold text-sky-700 pl-3 pt-1 ">
        {{ housingLocation.name }}
      </h2>
      <p class="pl-2 pb-1 flex text-sm">
        <img src="location-pin.svg" alt="location pin" class="w-4 " />
        {{ housingLocation.city }}, {{ housingLocation.state }}
      </p>
      <a
        [routerLink]="['/details', housingLocation.id]"
        class="flex justify-end pr-3 pb-2"
      >
        Learn more
      </a>
    </section>
  `,
  styleUrl: './housing-location.component.css',
})
export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;
}
