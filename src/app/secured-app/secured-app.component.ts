import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, shareReplay, Subscription, tap } from 'rxjs';
import { htConstants, HtConstants } from '../core/ht-constants';
import { UserSessionService } from '../core/user-session.service';
import { htDefaultGeneralElements, SecuredAppUiGeneralElements, SecuredAppUiService } from '../ui-helpers/secured-app-ui.service';
import { BaseFormComponent } from '../ui-helpers/base-form-component'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-secured-app',
  templateUrl: './secured-app.component.html',
  styleUrls: ['./secured-app.component.scss']
})
export class SecureAppComponent implements OnInit {

  public generalElements:SecuredAppUiGeneralElements = htDefaultGeneralElements;
  public ht:HtConstants = htConstants;
  public version:string = '';
  public helpUrl:string = '';

  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  private subs:Subscription = new Subscription();

  constructor(private breakpointObserver: BreakpointObserver, private appUI:SecuredAppUiService,
    private session:UserSessionService, private router:Router) { 

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    // TODO: I think Observe is better?
    this.subs.add(this.appUI.generalElementsEvent.subscribe(options => {
      this.generalElements = options;
    }));
    this.version = environment.version;
    this.helpUrl = environment.helpUrl;
  }

  public logout():void {
    this.session.logout();
    this.router.navigate(htConstants.pathLogin);
  }

  public onRuterActive(event:any):void{
    if(event instanceof BaseFormComponent){
      // TODO: change this to be direct change instead of event push
      this.appUI.changeGeneralElements(event.initialGeneralElements);
    }
  }
}
