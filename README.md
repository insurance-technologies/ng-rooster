# ng-rooster
ng-rooster is wrapper to roosterjs, an open source library created by Microsoft: https://github.com/Microsoft/roosterjs. 

# Getting Started

## Installation
``` npm i @instechnologies/ng-rooster ```

## How to Use it

The first thing to do after installing the library is to add the module to ypour app.module.ts or other module

```ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgRoosterModule } from '@instechnologies/ng-rooster';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgRoosterModule, //import the NgRoosterModule
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


```

After importing the module you have two ways to create the editor

* Using the rooster-editor directive.
* Using the rooster-editor-box component.

The most high level and most easy to use method is using the rooster-editor-box component:

```html

  <rooster-editor-box></rooster-editor-box>

```

Easy as that, but what about some controls and how do we get the content, well
this component maps the inputs to the roosterjs api, for example if we want to know the text size we can simply do:

```html
   
   <rooster-editor-box [(fontSize)]="fontSize" ></rooster-editor-box>

```

to toggle bold(toggleBold) for example we need to use a different approach but still very easy. We have to use a Subject to notify the editor when to bold:

component:
```ts
   
//--------------------------------------------------------------------

 bold$ = new Subject<void>()

//--------------------------------------------------------------------

```

template:

```html

   <button (click)="bold$.next(0)">Bold</button>
  
   <rooster-editor-box [toggleBold$]="bold$"></rooster-editor-box>

```

finally to retrive the content

```html

  <rooster-editor-box [(ngModel)]="content" ></rooster-editor-box>

```

### And Yessss rooster-editor-box is just a normal input and we can use ngModel as we use it in other kinds of inputs.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.4.
