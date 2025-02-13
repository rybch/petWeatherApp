import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-location-search',
  imports: [
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './location-search.component.html',
})
export class LocationSearchComponent {
  @Input() control!: FormControl;
  @Input() locations: string[] | null = [];
  @Input() favoriteLocations: string[] | null = [];
  @Input() error!: string | null;
  @Output() locationChange = new EventEmitter();
}
