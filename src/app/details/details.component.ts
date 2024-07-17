import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <article>
      <img
        [src]="housingLocation?.photo"
        alt="Lorem ipsum"
        class="lg:w-96 md:w-72 w-64 rounded-lg mt-1"
      />
      <section>
        <h2 class="text-lg font-bold ">{{ housingLocation?.name }}</h2>
        <p class="text-sm flex font-medium">
          <img src="location-pin.svg" alt="" class="w-4" />
          {{ housingLocation?.city }}, {{ housingLocation?.state }}
        </p>
      </section>
      <section class="my-4">
        <h2 class="text-lg font-bold text-sky-600">About this location</h2>
        <ul class="text-sm">
          <li>Units available: {{ housingLocation?.availableUnits }}</li>
          <li>Does this location have wifi : {{ housingLocation?.wifi }}</li>
          <li>
            Does this location have laundry : {{ housingLocation?.laundry }}
          </li>
        </ul>
      </section>
      <section>
        <h2 class="font-bold text-lg mb-2 text-sky-600">
          Apply now to live here
        </h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()" class="flex flex-col lg:w-96 md:w-72">
          <label for="first-name">First Name :</label>
          <input type="text" name="" id="" formControlName="firstName" class=" bg-slate-200" />

          <label for="last-name" class="lg:mt-4 mt-2">Last Name :</label>
          <input type="text" name="" id="" formControlName="lastName" class=" bg-slate-200" />

          <label for="email" class="lg:mt-4 mt-2">Email :</label>
          <input type="text" name="" id="" formControlName="email" class=" bg-slate-200" />

          <button
            class="bg-sky-500 px-4 py-2 my-4 rounded-lg font-semibold text-white hover:text-white hover:bg-sky-600 "
          >
            Apply
          </button>
        </form>
      </section>
    </article>
  `,
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  //Injection de donnee
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  // Creation des instance du formulaire
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingService
      .getHousingLocationById(housingLocationId)
      .then((housingLocation) => {
        this.housingLocation = housingLocation;
      });
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }
}
