import {Component, Optional, ViewEncapsulation} from '@angular/core';
import { TranslateService} from '@ngx-translate/core';
import { TranslateExtService } from './shared/services/translate-ext.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { map, take, delay, withLatestFrom, finalize, tap } from 'rxjs/operators';

@Component({
  	selector: 'app',
   template:`<router-outlet></router-outlet>`,
   encapsulation: ViewEncapsulation.None
})

export class AppComponent {
   options = {};
   delayedProgress$ = this.loader.progress$.pipe(
      delay(2000),
      withLatestFrom(this.loader.progress$),
      map(v => v[1]),
    );

   constructor(translate: TranslateService, translateExtService: TranslateExtService, public loader: LoadingBarService) {
      const langs = translateExtService.getLanguages().map(x => x.value);
      translate.addLangs(langs);
      if (localStorage.getItem('core.language')) {
         translateExtService.setLocale(localStorage.getItem('core.language'));
       } else {
         translateExtService.setLocale('en');
       }
   }
}
