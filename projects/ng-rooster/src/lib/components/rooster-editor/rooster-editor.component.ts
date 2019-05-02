import { Component, OnInit, ViewChild, Input, OnDestroy, AfterViewInit, Output, EventEmitter, ContentChildren, QueryList, Directive, ContentChild, forwardRef } from '@angular/core';
import { EditorDirective } from '../../directives/editor.directive';
import * as RoosterJs from 'roosterjs';
import { Subject, Observable, combineLatest, Subscribable, Subscription } from 'rxjs';
import { Alignment, Editor, Direction, Indentation, FormatState } from 'roosterjs';
import { filter, map, pairwise } from 'rxjs/operators';
import { FormatStateObservable } from '../../plugins/format-state.observable.plugin';
import { isNull } from '../../tools/is-null';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: 'editor-content'
})
export class RoosterEditorContent{}

@Component({
  selector: 'rooster-editor-box',
  templateUrl: './rooster-editor.component.html',
  styleUrls: ['./rooster-editor.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RoosterEditorComponent),
      multi: true
    }
  ]
})
export class RoosterEditorComponent implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor { 
  
  @ViewChild(EditorDirective) editorDirective: EditorDirective; 
  
  private editor: RoosterJs.Editor;

  private onChange: any = () => {};
  private onTouched: any = () => {};

  private editor$ = new Subject<Editor>();
  formatStatePlugin$ = new FormatStateObservable();

  aligment$ = new Subject<Alignment>();
  @Input() set aligment(v: Alignment){ this.aligment$.next(v) }

  backgroundColor$ = new Subject<string>();
  @Input() set backgroundColor(v: string){ this.backgroundColor$.next(v) }
  @Output() backgroundColorChange = new EventEmitter<string>();

  direction$ = new Subject<Direction>();
  @Input() set direction(v: Direction){ this.direction$.next(v) }

  fontName$ = new Subject<string>();
  @Input() set fontName(v: string){ this.fontName$.next(v) }
  @Output() fontNameChange = new EventEmitter<string>();

  fontSize$ = new Subject<string>();
  @Input() set fontSize(v: string){ this.fontSize$.next(v) }
  @Output() fontSizeChange = new EventEmitter<string>();

  indentation$ = new Subject<Indentation>();
  @Input() set indentation(v: Indentation){ this.indentation$.next(v) }  

  textColor$ = new Subject<string>();
  @Input() set textColor(v: string){ this.textColor$.next(v) }
  @Output() textColorChange = new EventEmitter<string>();
  
  toggleBlockQuote$$ = new Subject<Observable< (element: HTMLElement) => void | undefined >>();
  @Input() set toggleBlockQuote$(v: Observable< (element: HTMLElement) => void | undefined >){ this.toggleBlockQuote$$.next(v) }
  @Output() isBlockQuoteChange = new EventEmitter<boolean>();

  toggleBold$$ = new Subject<Observable<void>>();
  @Input() set toggleBold$(v: Observable<void>){ this.toggleBold$$.next(v) }
  @Output() isBoldChange = new EventEmitter<boolean>();

  toggleBullet$$ = new Subject<Observable<void>>();
  @Input() set toggleBullet$(v: Observable<void>){ this.toggleBullet$$.next(v) }
  @Output() isBulletChange = new EventEmitter<boolean>();

  toggleCodeBlock$$ = new Subject<Observable< (element: HTMLElement) => void | undefined >>();
  @Input() set toggleCodeBlock$(v: Observable< (element: HTMLElement) => void | undefined >){ this.toggleCodeBlock$$.next(v) }

  toggleHeader$$ = new Subject<Observable<number>>();
  @Input() set toggleHeader$(v: Observable<number>){ this.toggleHeader$$.next(v) }
  @Output() headerLevelChange = new EventEmitter<number>();

  toggleItalic$$ = new Subject<Observable<void>>();
  @Input() set toggleItalic$(v: Observable<void>){ this.toggleItalic$$.next(v) }
  @Output() isItalicChange = new EventEmitter<boolean>();

  toggleNumbering$$ = new Subject<Observable<void>>();
  @Input() set toggleNumbering$(v: Observable<void>){ this.toggleNumbering$$.next(v) }
  @Output() isNumberingChange = new EventEmitter<boolean>();

  toggleStrikethrough$$ = new Subject<Observable<void>>();
  @Input() set toggleStrikethrough$(v: Observable<void>){ this.toggleStrikethrough$$.next(v) }
  @Output() isStrikeThroughChange = new EventEmitter<boolean>();
  
  toggleSubscript$$ = new Subject<Observable<void>>();
  @Input() set toggleSubscript$(v: Observable<void>){ this.toggleSubscript$$.next(v) }
  @Output() isSubscriptChange = new EventEmitter<boolean>();

  toggleSuperscript$$ = new Subject<Observable<void>>();
  @Input() set toggleSuperscript$(v: Observable<void>){ this.toggleSuperscript$$.next(v) }
  @Output() isSuperscriptChange = new EventEmitter<boolean>();

  toggleUnderline$$ = new Subject<Observable<void>>();
  @Input() set toggleUnderline$(v: Observable<void>){ this.toggleUnderline$$.next(v) }
  @Output() isUnderlineChange = new EventEmitter<boolean>();


  constructor() { 

    combineLatest(this.aligment$, this.editor$).pipe( filter(([value, editor])=> !isNull(editor) && !isNull(value) ) ).subscribe( ([value, editor])=>{
       RoosterJs.setAlignment(editor, value);
    });

    combineLatest(this.backgroundColor$, this.editor$).pipe( filter(([value, editor])=> !isNull(editor) && !isNull(value) ) ).subscribe( ([value, editor])=>{
      RoosterJs.setBackgroundColor(editor, value);
    });

    combineLatest(this.direction$, this.editor$).pipe( filter(([value, editor])=> !isNull(editor) && !isNull(value) ) ).subscribe( ([value, editor])=>{
      RoosterJs.setDirection(editor, value);
    });

    combineLatest(this.fontName$, this.editor$).pipe( filter(([value, editor])=> !isNull(editor) && !isNull(value) ) ).subscribe( ([value, editor])=>{
      RoosterJs.setFontName(editor, value);
    });

    combineLatest(this.fontSize$, this.editor$).pipe( filter(([value, editor])=> !isNull(editor) && !isNull(value) ) ).subscribe( ([value, editor])=>{
      RoosterJs.setFontSize(editor, value);
    });

    combineLatest(this.indentation$, this.editor$).pipe( filter(([value, editor])=> !isNull(editor) && !isNull(value) ) ).subscribe( ([value, editor])=>{
      RoosterJs.setIndentation(editor, value);
    });
    
    combineLatest(this.textColor$, this.editor$).pipe( filter(([value, editor])=> !isNull(editor) && !isNull(value) ) ).subscribe( ([value, editor])=>{
      RoosterJs.setTextColor(editor, value);
    });
    
    let toggleBlockQuoteSubscription: Subscription = null;
    combineLatest(this.toggleBlockQuote$$, this.editor$).pipe( filter(([value, editor])=> !isNull(editor) && !isNull(value) ) ).subscribe( ([value, editor])=>{
      
      if(toggleBlockQuoteSubscription)
        toggleBlockQuoteSubscription.unsubscribe();

      toggleBlockQuoteSubscription = value.subscribe((val)=>{
        RoosterJs.toggleBlockQuote(editor, val);
      });

    }); 

    let toggleBoldSubscription: Subscription = null;
    combineLatest(this.toggleBold$$, this.editor$).pipe( filter(([value, editor])=> !isNull(editor) && !isNull(value) ) ).subscribe( ([value, editor])=>{
      
      if(toggleBoldSubscription)
      toggleBoldSubscription.unsubscribe();

      toggleBoldSubscription = value.subscribe((val)=>{
        RoosterJs.toggleBold(editor);
      });

    });

    
    let toggleBulletSubscription: Subscription = null;
    combineLatest(this.toggleBullet$$, this.editor$).pipe( filter(([value, editor])=> !isNull(editor) && !isNull(value) ) ).subscribe( ([value, editor])=>{
      
      if(toggleBulletSubscription)
      toggleBulletSubscription.unsubscribe();

      toggleBulletSubscription = value.subscribe((val)=>{
        RoosterJs.toggleBullet(editor);
      });

    });

    
    let toggleCodeBlockSubscription: Subscription = null;
    combineLatest(this.toggleCodeBlock$$, this.editor$).pipe( filter(([value, editor])=> !isNull(editor) && !isNull(value) ) ).subscribe( ([value, editor])=>{
      
      if(toggleCodeBlockSubscription)
      toggleCodeBlockSubscription.unsubscribe();

      toggleCodeBlockSubscription = value.subscribe((val)=>{
        RoosterJs.toggleCodeBlock(editor, val);
      });

    }); 

    let toggleHeaderSubscription: Subscription = null;
    combineLatest(this.toggleHeader$$, this.editor$).pipe( filter(([value, editor])=> !isNull(editor) && !isNull(value) ) ).subscribe( ([value, editor])=>{
      
      if(toggleHeaderSubscription)
      toggleHeaderSubscription.unsubscribe();

      toggleHeaderSubscription = value.subscribe((val)=>{
        RoosterJs.toggleHeader(editor, val);
      });

    }); 

    
    let toggleItalicSubscription: Subscription = null;
    combineLatest(this.toggleItalic$$, this.editor$).pipe( filter(([value, editor])=> !isNull(editor) && !isNull(value) ) ).subscribe( ([value, editor])=>{
      
      if(toggleItalicSubscription)
      toggleItalicSubscription.unsubscribe();

      toggleItalicSubscription = value.subscribe((val)=>{
        RoosterJs.toggleItalic(editor);
      });

    });

    let toggleNumberingSubscription: Subscription = null;
    combineLatest(this.toggleNumbering$$, this.editor$).pipe( filter(([value, editor])=> !isNull(editor) && !isNull(value) ) ).subscribe( ([value, editor])=>{
      
      if(toggleNumberingSubscription)
      toggleNumberingSubscription.unsubscribe();

      toggleNumberingSubscription = value.subscribe((val)=>{
        RoosterJs.toggleNumbering(editor);
      });

    });

    let toggleStrikethroughSubscription: Subscription = null;
    combineLatest(this.toggleStrikethrough$$, this.editor$).pipe( filter(([value, editor])=> !isNull(editor) && !isNull(value) ) ).subscribe( ([value, editor])=>{
      
      if(toggleStrikethroughSubscription)
      toggleStrikethroughSubscription.unsubscribe();

      toggleStrikethroughSubscription = value.subscribe((val)=>{
        RoosterJs.toggleStrikethrough(editor);
      });

    });

    let toggleSubscriptSubscription: Subscription = null;
    combineLatest(this.toggleSubscript$$, this.editor$).pipe( filter(([value, editor])=> !isNull(editor) && !isNull(value) ) ).subscribe( ([value, editor])=>{
      
      if(toggleSubscriptSubscription)
      toggleSubscriptSubscription.unsubscribe();

      toggleSubscriptSubscription = value.subscribe((val)=>{
        RoosterJs.toggleSubscript(editor);
      });

    });

    let toggleSuperscriptSubscription: Subscription = null;
    combineLatest(this.toggleSuperscript$$, this.editor$).pipe( filter(([value, editor])=> !isNull(editor) && !isNull(value) ) ).subscribe( ([value, editor])=>{
      
      if(toggleSuperscriptSubscription)
      toggleSuperscriptSubscription.unsubscribe();

      toggleSuperscriptSubscription = value.subscribe((val)=>{
        RoosterJs.toggleSuperscript(editor);
      });

    });

    let toggleUnderlineSubscription: Subscription = null;
    combineLatest(this.toggleUnderline$$, this.editor$).pipe( filter(([value, editor])=> !isNull(editor) && !isNull(value) ) ).subscribe( ([value, editor])=>{
      
      if(toggleUnderlineSubscription)
      toggleUnderlineSubscription.unsubscribe();

      toggleUnderlineSubscription = value.subscribe((val)=>{
        RoosterJs.toggleUnderline(editor);
      });

    });    

  }

  ngOnInit() {

    this.formatStatePlugin$.getContentObservable().subscribe(v=>this.onChange(v));

    let formatStateChange$ = this.formatStatePlugin$.pipe( pairwise(), map( ([previous, current]) => {

      let result: FormatState = {};

      let keys = Object.keys(current);
      for(let i = 0; i < keys.length; i++)
      {
        let key = keys[i];
        let previousValue = previous[key];
        let currentValue = current[key];

        if(currentValue != previousValue)
          result[key] = currentValue;
      }

      return result;
    }));

    formatStateChange$.pipe( map(s=>s.fontName), filter(v=>!isNull(v)) ).subscribe(v=>this.fontNameChange.emit(v));

    formatStateChange$.pipe( map(s=>s.fontSize), filter(v=>!isNull(v)) ).subscribe(v=>this.fontSizeChange.emit(v));

    formatStateChange$.pipe( map(s=>s.isBold), filter(v=>!isNull(v)) ).subscribe(v=>this.isBoldChange.emit(v));

    formatStateChange$.pipe( map(s=>s.isItalic), filter(v=>!isNull(v)) ).subscribe(v=>this.isItalicChange.emit(v));

    formatStateChange$.pipe( map(s=>s.isUnderline), filter(v=>!isNull(v)) ).subscribe(v=>this.isUnderlineChange.emit(v));

    formatStateChange$.pipe( map(s=>s.backgroundColor), filter(v=>!isNull(v)) ).subscribe(v=>this.backgroundColorChange.emit(v));

    formatStateChange$.pipe( map(s=>s.textColor), filter(v=>!isNull(v)) ).subscribe(v=>this.textColorChange.emit(v));;

    formatStateChange$.pipe( map(s=>s.isBullet), filter(v=>!isNull(v)) ).subscribe(v=>this.isBulletChange.emit(v));

    formatStateChange$.pipe( map(s=>s.isNumbering), filter(v=>!isNull(v)) ).subscribe(v=>this.isNumberingChange.emit(v));

    formatStateChange$.pipe( map(s=>s.isStrikeThrough), filter(v=>!isNull(v)) ).subscribe(v=>this.isStrikeThroughChange.emit(v));

    formatStateChange$.pipe( map(s=>s.isBlockQuote), filter(v=>!isNull(v)) ).subscribe(v=>this.isBlockQuoteChange.emit(v));

    formatStateChange$.pipe( map(s=>s.isSubscript), filter(v=>!isNull(v)) ).subscribe(v=>this.isSubscriptChange.emit(v));

    formatStateChange$.pipe( map(s=>s.isSuperscript), filter(v=>!isNull(v)) ).subscribe(v=>this.isSuperscriptChange.emit(v));

    // formatStateChange$.pipe( map(s=>s.canUnlink), filter(v=>!isNull(v)) ).subscribe(v=>this.u.emit(v));

    // formatStateChange$.pipe( map(s=>s.canAddImageAltText), filter(v=>!isNull(v)) );

    // formatStateChange$.pipe( map(s=>s.canUndo), filter(v=>!isNull(v)) );

    // formatStateChange$.pipe( map(s=>s.canRedo), filter(v=>!isNull(v)) );

    // formatStateChange$.pipe( map(s=>s.headerLevel), filter(v=>!isNull(v)) );    

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

  writeValue(obj: any): void {

    if(obj)
      this.editor.setContent(obj);

  }

  registerOnChange(fn: any): void {
    
    this.onChange = fn;

  }

  registerOnTouched(fn: any): void {

    this.onTouched = fn;

  }

  setDisabledState?(isDisabled: boolean): void {

    console.log(isDisabled);

  }



}
