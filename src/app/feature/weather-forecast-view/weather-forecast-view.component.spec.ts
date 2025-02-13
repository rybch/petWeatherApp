import { ComponentFixture, TestBed } from "@angular/core/testing";
import { WeatherForecastViewComponent } from "./weather-forecast-view.component";

describe("WeatherForecastViewComponent", () => {
  let component: WeatherForecastViewComponent;
  let fixture: ComponentFixture<WeatherForecastViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherForecastViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherForecastViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
