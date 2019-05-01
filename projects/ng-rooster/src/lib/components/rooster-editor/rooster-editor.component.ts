import { Component, OnInit, ViewChild, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { EditorDirective } from '../../directives/editor.directive';
import * as RoosterJs from 'roosterjs';
import { Subject, Observable, combineLatest, Subscribable, Subscription } from 'rxjs';
import { Alignment, Editor, Direction, Indentation } from 'roosterjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'rooster-editor-box',
  templateUrl: './rooster-editor.component.html',
  styleUrls: ['./rooster-editor.component.css'],
  
})
export class RoosterEditorComponent implements OnInit, AfterViewInit, OnDestroy {
  
  @ViewChild(EditorDirective) editorDirective: EditorDirective; 
  
  private editor: RoosterJs.Editor;
  private editor$ = new Subject<Editor>();

  aligment$ = new Subject<Alignment>();
  @Input() set aligment(v: Alignment){ this.aligment$.next(v) }

  backgroundColor$ = new Subject<string>();
  @Input() set backgroundColor(v: string){ this.backgroundColor$.next(v) }

  direction$ = new Subject<Direction>();
  @Input() set direction(v: Direction){ this.direction$.next(v) }

  fontName$ = new Subject<string>();
  @Input() set fontName(v: string){ this.fontName$.next(v) }

  fontSize$ = new Subject<string>();
  @Input() set fontSize(v: string){ this.fontSize$.next(v) }

  indentation$ = new Subject<Indentation>();
  @Input() set indentation(v: Indentation){ this.indentation$.next(v) }

  textColor$ = new Subject<string>();
  @Input() set textColor(v: string){ this.textColor$.next(v) }
  
  toggleBlockQuote$$ = new Subject<Observable< (element: HTMLElement) => void | undefined >>();
  @Input() set toggleBlockQuote$(v: Observable< (element: HTMLElement) => void | undefined >){ this.toggleBlockQuote$$.next(v) }

  toggleBold$$ = new Subject<Observable<void>>();
  @Input() set toggleBold$(v: Observable<void>){ this.toggleBold$$.next(v) }

  toggleBullet$$ = new Subject<Observable<void>>();
  @Input() set toggleBullet$(v: Observable<void>){ this.toggleBullet$$.next(v) }

  toggleCodeBlock$$ = new Subject<Observable< (element: HTMLElement) => void | undefined >>();
  @Input() set toggleCodeBlock$(v: Observable< (element: HTMLElement) => void | undefined >){ this.toggleCodeBlock$$.next(v) }

  toggleHeader$$ = new Subject<Observable<number>>();
  @Input() set toggleHeader$(v: Observable<number>){ this.toggleHeader$$.next(v) }

  toggleItalic$$ = new Subject<Observable<void>>();
  @Input() set toggleItalic$(v: Observable<void>){ this.toggleItalic$$.next(v) }

  toggleNumbering$$ = new Subject<Observable<void>>();
  @Input() set toggleNumbering$(v: Observable<void>){ this.toggleNumbering$$.next(v) }

  toggleStrikethrough$$ = new Subject<Observable<void>>();
  @Input() set toggleStrikethrough$(v: Observable<void>){ this.toggleStrikethrough$$.next(v) }
  
  toggleSubscript$$ = new Subject<Observable<void>>();
  @Input() set toggleSubscript$(v: Observable<void>){ this.toggleSubscript$$.next(v) }

  toggleSuperscript$$ = new Subject<Observable<void>>();
  @Input() set toggleSuperscript$(v: Observable<void>){ this.toggleSuperscript$$.next(v) }

  toggleUnderline$$ = new Subject<Observable<void>>();
  @Input() set toggleUnderline$(v: Observable<void>){ this.toggleUnderline$$.next(v) }


  constructor() { 

    combineLatest(this.aligment$, this.editor$).pipe( filter(([value, editor])=>editor ? true : false) ).subscribe( ([value, editor])=>{
       RoosterJs.setAlignment(editor, value);
    });

    combineLatest(this.backgroundColor$, this.editor$).pipe( filter(([value, editor])=>editor ? true : false) ).subscribe( ([value, editor])=>{
      RoosterJs.setBackgroundColor(editor, value);
    });

    combineLatest(this.direction$, this.editor$).pipe( filter(([value, editor])=>editor ? true : false) ).subscribe( ([value, editor])=>{
      RoosterJs.setDirection(editor, value);
    });

    combineLatest(this.fontName$, this.editor$).pipe( filter(([value, editor])=>editor ? true : false) ).subscribe( ([value, editor])=>{
      RoosterJs.setFontName(editor, value);
    });

    combineLatest(this.fontSize$, this.editor$).pipe( filter(([value, editor])=>editor ? true : false) ).subscribe( ([value, editor])=>{
      RoosterJs.setFontSize(editor, value);
    });

    combineLatest(this.indentation$, this.editor$).pipe( filter(([value, editor])=>editor ? true : false) ).subscribe( ([value, editor])=>{
      RoosterJs.setIndentation(editor, value);
    });
    
    combineLatest(this.textColor$, this.editor$).pipe( filter(([value, editor])=>editor ? true : false) ).subscribe( ([value, editor])=>{
      RoosterJs.setTextColor(editor, value);
    });
    
    let toggleBlockQuoteSubscription: Subscription = null;
    combineLatest(this.toggleBlockQuote$$, this.editor$).pipe( filter(([value, editor])=>editor ? true : false) ).subscribe( ([value, editor])=>{
      
      if(toggleBlockQuoteSubscription)
        toggleBlockQuoteSubscription.unsubscribe();

      toggleBlockQuoteSubscription = value.subscribe((val)=>{
        RoosterJs.toggleBlockQuote(editor, val);
      });

    }); 

    let toggleBoldSubscription: Subscription = null;
    combineLatest(this.toggleBold$$, this.editor$).pipe( filter(([value, editor])=>editor ? true : false) ).subscribe( ([value, editor])=>{
      
      if(toggleBoldSubscription)
      toggleBoldSubscription.unsubscribe();

      toggleBoldSubscription = value.subscribe((val)=>{
        RoosterJs.toggleBold(editor);
      });

    });

    
    let toggleBulletSubscription: Subscription = null;
    combineLatest(this.toggleBullet$$, this.editor$).pipe( filter(([value, editor])=>editor ? true : false) ).subscribe( ([value, editor])=>{
      
      if(toggleBulletSubscription)
      toggleBulletSubscription.unsubscribe();

      toggleBulletSubscription = value.subscribe((val)=>{
        RoosterJs.toggleBullet(editor);
      });

    });

    
    let toggleCodeBlockSubscription: Subscription = null;
    combineLatest(this.toggleCodeBlock$$, this.editor$).pipe( filter(([value, editor])=>editor ? true : false) ).subscribe( ([value, editor])=>{
      
      if(toggleCodeBlockSubscription)
      toggleCodeBlockSubscription.unsubscribe();

      toggleCodeBlockSubscription = value.subscribe((val)=>{
        RoosterJs.toggleCodeBlock(editor, val);
      });

    }); 

    let toggleHeaderSubscription: Subscription = null;
    combineLatest(this.toggleHeader$$, this.editor$).pipe( filter(([value, editor])=>editor ? true : false) ).subscribe( ([value, editor])=>{
      
      if(toggleHeaderSubscription)
      toggleHeaderSubscription.unsubscribe();

      toggleHeaderSubscription = value.subscribe((val)=>{
        RoosterJs.toggleHeader(editor, val);
      });

    }); 

    
    let toggleItalicSubscription: Subscription = null;
    combineLatest(this.toggleItalic$$, this.editor$).pipe( filter(([value, editor])=>editor ? true : false) ).subscribe( ([value, editor])=>{
      
      if(toggleItalicSubscription)
      toggleItalicSubscription.unsubscribe();

      toggleItalicSubscription = value.subscribe((val)=>{
        RoosterJs.toggleItalic(editor);
      });

    });

    let toggleNumberingSubscription: Subscription = null;
    combineLatest(this.toggleNumbering$$, this.editor$).pipe( filter(([value, editor])=>editor ? true : false) ).subscribe( ([value, editor])=>{
      
      if(toggleNumberingSubscription)
      toggleNumberingSubscription.unsubscribe();

      toggleNumberingSubscription = value.subscribe((val)=>{
        RoosterJs.toggleNumbering(editor);
      });

    });

    let toggleStrikethroughSubscription: Subscription = null;
    combineLatest(this.toggleStrikethrough$$, this.editor$).pipe( filter(([value, editor])=>editor ? true : false) ).subscribe( ([value, editor])=>{
      
      if(toggleStrikethroughSubscription)
      toggleStrikethroughSubscription.unsubscribe();

      toggleStrikethroughSubscription = value.subscribe((val)=>{
        RoosterJs.toggleStrikethrough(editor);
      });

    });

    let toggleSubscriptSubscription: Subscription = null;
    combineLatest(this.toggleSubscript$$, this.editor$).pipe( filter(([value, editor])=>editor ? true : false) ).subscribe( ([value, editor])=>{
      
      if(toggleSubscriptSubscription)
      toggleSubscriptSubscription.unsubscribe();

      toggleSubscriptSubscription = value.subscribe((val)=>{
        RoosterJs.toggleSubscript(editor);
      });

    });

    let toggleSuperscriptSubscription: Subscription = null;
    combineLatest(this.toggleSuperscript$$, this.editor$).pipe( filter(([value, editor])=>editor ? true : false) ).subscribe( ([value, editor])=>{
      
      if(toggleSuperscriptSubscription)
      toggleSuperscriptSubscription.unsubscribe();

      toggleSuperscriptSubscription = value.subscribe((val)=>{
        RoosterJs.toggleSuperscript(editor);
      });

    });

    let toggleUnderlineSubscription: Subscription = null;
    combineLatest(this.toggleUnderline$$, this.editor$).pipe( filter(([value, editor])=>editor ? true : false) ).subscribe( ([value, editor])=>{
      
      if(toggleUnderlineSubscription)
      toggleUnderlineSubscription.unsubscribe();

      toggleUnderlineSubscription = value.subscribe((val)=>{
        RoosterJs.toggleUnderline(editor);
      });

    });    

  }

  ngOnInit() {
    
  }

  ngAfterViewInit(): void {
    this.editor = this.editorDirective.editor;
    this.editor$.next(this.editor);
    this.editor$.complete();
  }
  

  ngOnDestroy(): void {
     this.aligment$.complete();
     this.backgroundColor$.complete();
     this.direction$.complete();
     this.fontName$.complete();
     this.fontSize$.complete();
     this.indentation$.complete();
     this.textColor$.complete();
     this.toggleBlockQuote$$.complete();
     this.toggleBold$$.complete();
     this.toggleBullet$$.complete();
     this.toggleCodeBlock$$.complete();
     this.toggleHeader$$.complete();
     this.toggleItalic$$.complete();
     this.toggleNumbering$$.complete();
     this.toggleStrikethrough$$.complete();
     this.toggleSubscript$$.complete();
     this.toggleSuperscript$$.complete();
     this.toggleUnderline$$.complete();
     this.editor.dispose();
  }


}
