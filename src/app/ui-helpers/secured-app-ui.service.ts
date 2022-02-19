import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface SecuredAppUiGeneralElements{
  headerTitle?:string
}

export const htDefaultGeneralElements:SecuredAppUiGeneralElements = {
  headerTitle: 'Horror Tactics'
};

@Injectable({
  providedIn: 'root'
})
export class SecuredAppUiService {

  private _generalElementsEvent:EventEmitter<SecuredAppUiGeneralElements> = new EventEmitter<SecuredAppUiGeneralElements>();
  // TODO: is this how it has to be? share the direct reference?
  public get generalElementsEvent():EventEmitter<SecuredAppUiGeneralElements> { return this._generalElementsEvent; }

  private _currentGeneralElementOptions:SecuredAppUiGeneralElements = htDefaultGeneralElements;

  constructor() { }

  public changeGeneralElements(options:SecuredAppUiGeneralElements):void {
    if(options.headerTitle !== undefined){
      this._currentGeneralElementOptions.headerTitle = options.headerTitle;
    }

    this._generalElementsEvent.next(this._currentGeneralElementOptions);
  }
}
