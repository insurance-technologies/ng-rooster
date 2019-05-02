import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import * as RoosterJs from 'roosterjs';


@Directive({
  selector: '[rooster-editor]'
})
export class EditorDirective implements OnInit {
  
  @Input() plugins?: RoosterJs.EditorPlugin[];
  @Input() defaultFormat?: RoosterJs.DefaultFormat;
  @Input() initialContent?: string;
  @Input() disableRestoreSelectionOnFocus?: boolean;
  @Input() omitContentEditableAttributeChanges?: boolean;  

  private _editor: RoosterJs.Editor;
  get editor() : RoosterJs.Editor
  {
    return this._editor;
  }

  constructor(private el: ElementRef) {   

  }

  ngOnInit(): void {    
    let nativeElement = this.el.nativeElement;
    this._editor = new RoosterJs.Editor(nativeElement, {
        plugins: this.plugins,
        defaultFormat: this.defaultFormat,
        initialContent: this.initialContent,
        disableRestoreSelectionOnFocus: this.disableRestoreSelectionOnFocus,
        omitContentEditableAttributeChanges: this.omitContentEditableAttributeChanges
    });
  }
}
