/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import * as observable from "@nativescript/core/data/observable";
import * as pages from "@nativescript/core/ui/page";
import { CryptoVaultModel } from '~/model/main-view-model';

// Event handler for Page 'loaded' event attached in main-page.xml
export function pageLoaded(args: observable.EventData) {
  // Get the event sender
  let page = <pages.Page>args.object;
  page.bindingContext = new CryptoVaultModel();
}