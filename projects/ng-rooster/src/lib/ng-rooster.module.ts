import { NgModule } from '@angular/core';
import { NgRoosterComponent } from './ng-rooster.component';
import { EditorDirective } from './directives/editor.directive';
import { RoosterEditorComponent } from './components/rooster-editor/rooster-editor.component';

@NgModule({
  declarations: [
    NgRoosterComponent, 
    EditorDirective, 
    RoosterEditorComponent
  ],
  imports: [
  ],
  exports: [
    NgRoosterComponent,
    EditorDirective,
    RoosterEditorComponent
  ]
})
export class NgRoosterModule { }
