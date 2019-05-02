import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
   bold$ = new Subject<void>();
   italic$ = new Subject<void>();
   underline$ = new Subject<void>();
   fontSize: number;
   fontName: string;

   content: string;
   

}
