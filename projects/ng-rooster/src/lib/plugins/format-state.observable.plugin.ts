import { EditorPlugin, Editor, PluginEvent, FormatState, PluginEventType } from 'roosterjs';
import { Observable, Subject } from 'rxjs';


export class FormatStateObservable extends Observable<FormatState> implements EditorPlugin
{
    private _subject = new Subject<FormatState>();
    private editor: Editor;

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

    }

    onPluginEvent?(event: PluginEvent) : void
    {
        switch(event)
        {
            case PluginEventType.
        }
    }
}