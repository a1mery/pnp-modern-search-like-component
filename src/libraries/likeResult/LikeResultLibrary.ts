import { IAdaptiveCardAction, IComponentDefinition, IDataSourceDefinition, IExtensibilityLibrary, ILayoutDefinition, IQueryModifierDefinition, ISuggestionProviderDefinition } from "@pnp/modern-search-extensibility";
import { MyCustomComponentWebComponent } from "../LikeResult";
import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { SPHttpClient } from "@microsoft/sp-http";
import { PageContext } from "@microsoft/sp-page-context";

export class LikeResultLibrary implements IExtensibilityLibrary {

  public static readonly serviceKey: ServiceKey<LikeResultLibrary> =
  ServiceKey.create<LikeResultLibrary>('SPFx:LikeResultLibrary', LikeResultLibrary);

private _spHttpClient: SPHttpClient;
public _pageContext: PageContext;
private _currentWebUrl: string;

constructor(serviceScope: ServiceScope) {
  serviceScope.whenFinished(() => {
    this._spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);

    this._pageContext = serviceScope.consume(PageContext.serviceKey);
    this._currentWebUrl = this._pageContext.web.absoluteUrl;
  });
}

  getCustomLayouts(): ILayoutDefinition[] {
    return [];
  }
  public getCustomWebComponents(): IComponentDefinition<any>[] {
    return [
      {
        componentName: 'like-result-component',
        componentClass: MyCustomComponentWebComponent
      }
    ];
  }
  getCustomSuggestionProviders(): ISuggestionProviderDefinition[] {
    return [];
  }
  registerHandlebarsCustomizations?(handlebarsNamespace: typeof Handlebars): void {

  }
  invokeCardAction(action: IAdaptiveCardAction): void {

  }
  getCustomQueryModifiers?(): IQueryModifierDefinition[] {
    return [];
  }
  getCustomDataSources?(): IDataSourceDefinition[] {
    return [];
  }

  public name(): string {
    return 'LikeResultLibrary';
  }

}
