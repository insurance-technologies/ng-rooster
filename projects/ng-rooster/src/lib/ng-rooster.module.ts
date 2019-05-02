import { NgModule } from '@angular/core';
import { NgRoosterComponent } from './ng-rooster.component';
import { EditorDirective } from './directives/editor.directive';
import { RoosterEditorComponent, RoosterEditorContent } from './components/rooster-editor/rooster-editor.component';

@NgModule({
  declarations: [
    NgRoosterComponent, 
    EditorDirective, 
    RoosterEditorComponent,
    RoosterEditorContent
  ],
  imports: [
  ],
  exports: [
    NgRoosterComponent,
    EditorDirective,
    RoosterEditorComponent,
    RoosterEditorContent
  ]
})
export class NgRoosterModule { }
