import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HighlightDirective } from './highlight.directive';

@Component({
  standalone: true,
  imports: [HighlightDirective],
  template: '<div appHighlight></div>',
})
class TestComponent {}

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent], // ✅ AQUI é o fix
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    element = fixture.debugElement.query(By.css('div')).nativeElement;
  });

  it('should create directive', () => {
    const directive = fixture.debugElement.query(By.directive(HighlightDirective));
    expect(directive).toBeTruthy();
  });

  it('should add highlight class on mouseover', () => {
    element.dispatchEvent(new Event('mouseover'));
    fixture.detectChanges();

    expect(element.classList).toContain('highlight');
  });

  it('should remove highlight class on mouseout', () => {
    element.dispatchEvent(new Event('mouseover'));
    fixture.detectChanges();

    element.dispatchEvent(new Event('mouseout'));
    fixture.detectChanges();

    expect(element.classList).not.toContain('highlight');
  });
});
