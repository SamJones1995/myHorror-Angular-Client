import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}



platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


  function getArray<T>(items: T[]): T[] {
    return new Array().concat(items)
  }
  
  let numArray = getArray<number>([1, 2, 3, 4])
  let strArray = getArray<string>(['brad', 'John', 'Jill'])
  
  console.log(numArray);