import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-country-menu',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './country-menu.component.html',
  styleUrls: ['./country-menu.component.css']
})
export class CountryMenuComponent implements OnInit {
  countries: string[] = [];
  filteredCountries: string[] = [];
  states: string[] = [];
  airports: any[] = [];
  airportMessage: string = '';

  selectedCountry: string | null = null;
  selectedState: string | null = null;
  selectedAirport: string | null = null;

  isStateView = false;
  isAirportView = false;
  isWeatherView = false;

  searchText = '';

  // Weather data for the selected airport
  weatherData: any = null;

  // Loading indicators
  loadingCountries = false;
  loadingStates = false;
  loadingAirports = false;
  loadingWeather = false;

  @Output() airportSelected = new EventEmitter<{ lat: number; lng: number; name: string }>();
  @Output() resetMap = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCountries();
  }

  fetchCountries(): void {
    this.loadingCountries = true;
    this.http.get<any>('https://countriesnow.space/api/v0.1/countries/states')
      .subscribe({
        next: res => {
          this.countries = res.data.map((c: any) => c.name);
          this.filteredCountries = [...this.countries];
          this.loadingCountries = false;
        },
        error: () => {
          this.loadingCountries = false;
        }
      });
  }

  filterCountries(query: string) {
    this.filteredCountries = this.countries.filter(country =>
      country.toLowerCase().includes(query.toLowerCase())
    );
  }

  onSelectCountry(country: string) {
    this.selectedCountry = country;
    this.isStateView = true;
    this.loadingStates = true;
    this.http.post<any>('https://countriesnow.space/api/v0.1/countries/states', {
      country: country
    }).subscribe({
      next: res => {
        this.states = res.data.states.map((s: any) => s.name);
        this.loadingStates = false;
      },
      error: () => {
        this.loadingStates = false;
      }
    });
  }

  onSelectState(state: string) {
    this.selectedState = state;
    this.isAirportView = true;
    this.airports = [];
    this.airportMessage = '';
    this.loadingAirports = true;
  
    const encodedState = encodeURIComponent(state);
  
    this.http.get<any>(`https://aerokey-api.vercel.app/v1/airports/state/${encodedState}`)
      .pipe(
        catchError(err => {
          console.log('error', err);
          this.airportMessage = 'No airports found in this state';
          this.airports = [];
          this.loadingAirports = false;
          return of([]);
        })
      )
      .subscribe(res => {
        this.loadingAirports = false;
        if (res.length === 0) {
          this.airportMessage = 'No airports found in this state.';
        } else {
          this.airports = res;
          console.log('naa', this.airports)
        }
      });
  }

  onSelectAirport(airport: any) {
    this.selectedAirport = airport.airport_name;
    const iataCode = airport.airport_code; // like "MAA"
  
    this.http.get<any>(`https://airportgap.com/api/airports/${iataCode}`).subscribe(res => {
      const attr = res.data.attributes;
      const lat = parseFloat(attr.latitude);
      const lng = parseFloat(attr.longitude);
      const name = attr.name;

      this.airportSelected.emit({ lat, lng, name });

      this.getAirportWeather(lat, lng);
    });
  }

  // Fetch weather data for the selected airport
  getAirportWeather(lat: number, lng:number) {
    this.isAirportView = false;
    this.isWeatherView = true;
    this.loadingWeather = true;
  
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`;
  
    this.http.get<any[]>(url).subscribe({
      next: res => {
        console.log('response', res)
        this.weatherData = res;
        this.loadingWeather = false;
      },
      error: err => {
        console.error('Weather API Error:', err);
        this.weatherData = null;
        this.loadingWeather = false;
      }
    });
  }
  
  getWeatherDescription(code: number): string {
    const weatherCodes: { [key: number]: string } = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Fog',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      80: 'Rain showers',
    };
    return weatherCodes[code] || 'Unknown';
  }
  
  // Back navigation
  backToCountries() {
    this.isStateView = false;
    this.selectedCountry = null;
    this.states = [];
  }

  backToStates() {
    this.isAirportView = false;
    this.selectedState = null;
    this.airports = [];
    this.airportMessage = '';
  }

  backToAirports() {
    this.isWeatherView = false;
    this.isAirportView = true;
    this.weatherData = null;

    this.resetMap.emit();
  }
}
