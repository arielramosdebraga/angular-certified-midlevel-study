import { TestBed } from "@angular/core/testing";
import { HomeComponent } from "./home.component";
import { provideRouter } from "@angular/router";

describe("HomeComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it("should create", () => {
    const fixture = TestBed.createComponent(HomeComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("should render dashboard title", () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector("h1")?.textContent).toContain("Dashboard");
  });

  it("should render 2 links", () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();

    const links = fixture.nativeElement.querySelectorAll("a");
    expect(links.length).toBe(2);
  });
});
