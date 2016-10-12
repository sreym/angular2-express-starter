import { Directive, ElementRef, Input, Renderer, EventEmitter } from '@angular/core';

@Directive({ 
  selector: '[ace]',
  inputs: ['text'],
  outputs: ['textChanged'], 
})
export class AceDirective {
  textChanged: EventEmitter<string>;
  editor: any;
  oldVal: string;

  set text(value) {
    if(value === this.oldVal) return;
    this.editor.setValue(value);
    this.editor.clearSelection();
    this.editor.focus();
  }

  constructor(el: ElementRef, renderer: Renderer) {
    const ace = window.ace;
    this.editor = ace.edit(el.nativeElement);
    this.textChanged = new EventEmitter();

    this.editor.setTheme("ace/theme/monokai");
    this.editor.getSession().setMode("ace/mode/javascript");

    this.editor.on('change', () => {
      const newVal = this.editor.getValue();
      if(newVal === this.oldVal) return;
      if(typeof this.oldVal !== 'undefined') {
        this.textChanged.next(newVal);
      }
      this.oldVal = newVal;
    });
  }
}