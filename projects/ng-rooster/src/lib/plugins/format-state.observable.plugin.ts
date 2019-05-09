import { EditorPlugin, Editor, PluginEvent, FormatState, PluginEventType, getFormatState, editTable } from 'roosterjs';
import { Observable, Subject } from 'rxjs';

export class FormatStateObservable extends Observable<FormatState> implements EditorPlugin
{
    private _subject = new Subject<FormatState>();
    private _contentChangeSubject = new Subject<string>();
    private editor: Editor;

    public getContentObservable() : Observable<string>
    {
        return this._contentChangeSubject;
    }

    constructor()
    {
        super( (subscriber=>{
            this._subject.subscribe((value)=>subscriber.next(value), error=>subscriber.error(error), ()=>subscriber.complete());
        }) );
    }

    initialize(editor: Editor) : void
    {
       this.editor = editor;
    }

    getName() : string
    {
        return 'FormatStateObservable';
    }   
    
    
    dispose() : void
    {
        this._subject.complete();
        this._contentChangeSubject.complete();
    }

    onPluginEvent?(event: PluginEvent) : void
    {
        //console.log(event);
        switch(event.eventType)
        {
            case PluginEventType.MouseDown:
               this.getFormatState();
            break;
              
            case PluginEventType.KeyDown:
               this.getFormatState();
            break;

            case PluginEventType.ContentChanged:
               this.getFormatState();       
               
            case PluginEventType.Input:
               this.getContent();
            break;
        }
    }

    private getContent(): void
    {
        let content = this.editor.getContent(true);
        this._contentChangeSubject.next(content);
    }

    private getFormatState(): void
    {
        let state = getFormatState(this.editor);
        this._subject.next(state);
    }

}