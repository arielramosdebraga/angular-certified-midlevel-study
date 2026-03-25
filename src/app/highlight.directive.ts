import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @HostBinding('style.backgroundColor') backgroundColor = '';

  @HostBinding('style.transition') transition = 'background-color 150ms ease';

  @HostListener('mouseenter')
  onMouseEnter() {
    this.backgroundColor = 'gold';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.backgroundColor = '';
  }
}