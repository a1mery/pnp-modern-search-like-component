import * as React from 'react';
import { BaseWebComponent } from '@pnp/modern-search-extensibility';
import * as ReactDOM from 'react-dom';
import { ServiceScope } from '@microsoft/sp-core-library';
import { SPHttpClient } from '@microsoft/sp-http';
import { PageContext } from '@microsoft/sp-page-context';
import { SPFx, spfi } from "@pnp/sp";
import { IClientsidePage } from "@pnp/sp/clientside-pages";
import { Icon } from '@fluentui/react/lib/Icon';
import "@pnp/sp/clientside-pages";
import "@pnp/sp/comments/clientside-page";
import "@pnp/sp/webs";
import "@pnp/sp/items"
import "@pnp/sp/lists"
import { ILikedByInformation } from '@pnp/sp/comments/types';
import { Web } from "@pnp/sp/webs";   
import { _Lists } from '@pnp/sp/lists/types';


// export interface IObjectParam {
//     myProperty: string;
// }

export interface ICustomComponentProps {

    //   /**
    //  * A sample string param
    //  */
    //   myStringParam?: string;

    //   /**
    //    * A sample object param
    //    */
    //   myObjectParam?: IObjectParam;
  
    //   /**
    //    * A sample date param
    //    */
    //   myDateParam?: Date;
  
    //   /**
    //    * A sample number param
    //    */
    //   myNumberParam?: number;
  
    //   /**
    //    * A sample boolean param
    //    */
    //   myBooleanParam?: boolean;
    tenanturl?: string;
    pageurl?: string;
    
    context: PageContext;
}

export interface ICustomComponenState {
    isLikedByUser: boolean;
    likeCount: number;
}

export class CustomComponent extends React.Component<ICustomComponentProps, ICustomComponenState> {

    public constructor(props: ICustomComponentProps) {
        super(props);
        this.likeOnClick = this.likeOnClick.bind(this);
        this.state = {
            isLikedByUser: false,
            likeCount: 0
        };
    }
    private sp = spfi().using(SPFx({ pageContext: this.props.context }));
    private web = Web([this.sp.web, "https://01m0b.sharepoint.com/sites/PnP-Demo"]);
        



    public componentDidMount(): void {
        this.checkCurrentLikes();
    }

    private likeOnClick() {

        this.getDocumentTitle();
    }
    
    private async checkCurrentLikes() {
        // const sp = spfi().using(SPFx({ pageContext: this.props.context }));
        
        // const page: IClientsidePage = await this.sp.web.loadClientsidePage("/sites/Searchsample/SitePages/Sample.aspx");
        const page: IClientsidePage = await this.web.loadClientsidePage("/sites/PnP-Demo/SitePages/Page-8.aspx");
        const likedByInfo: ILikedByInformation = await page.getLikedByInformation();
        this.setState({
            isLikedByUser: likedByInfo.isLikedByUser,
            likeCount: likedByInfo.likeCount
        })



    }

    private async getDocumentTitle(): Promise<any> {
        // const sp = spfi().using(SPFx({ pageContext: this.props.context }));
        const page: IClientsidePage = await this.sp.web.loadClientsidePage(this.props.pageurl.split(this.props.tenanturl)[1]);
        const likedByInfo: ILikedByInformation = await page.getLikedByInformation();
        if (this.state.isLikedByUser) {
            await page.unlike();
            this.setState({
                isLikedByUser: false,
                likeCount: likedByInfo.likeCount
            })
        } else {
            await page.like();
            this.setState({
                isLikedByUser: true,
                likeCount: likedByInfo.likeCount
            })
        }
        return "ATH";
    }

    public render() {
        const LikeIcon = () => <Icon iconName="Like" />;
        const LikeSolidIcon = () => <Icon iconName="LikeSolid" />;

        return <div>
            <span onClick={this.likeOnClick}>
                {
                this.state.isLikedByUser &&
                    <LikeSolidIcon></LikeSolidIcon>
                }
                {
                !this.state.isLikedByUser &&

                    <LikeIcon></LikeIcon>
                
                }

                <span>{this.state.likeCount} like this</span>
            </span>
        </div>;

    }
}

export class MyCustomComponentWebComponent extends BaseWebComponent {
    private _spHttpClient: SPHttpClient;
    private _pageContext: PageContext;
    private _currentWebUrl: string;

    public constructor(props: ICustomComponentProps) {
        super();

    }

    public async connectedCallback() {

        let props = this.resolveAttributes();
        let serviceScope: ServiceScope = this._serviceScope;
        let _spHttpClient: SPHttpClient;
        let _pageContext: PageContext;
        serviceScope.whenFinished(() => {
            this._spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);

            this._pageContext = serviceScope.consume(PageContext.serviceKey);
            this._currentWebUrl = this._pageContext.web.absoluteUrl;
        });
        const customComponent = <CustomComponent context={this._pageContext} {...props} />;
        ReactDOM.render(customComponent, this);
    }


    protected onDispose(): void {
        ReactDOM.unmountComponentAtNode(this);
    }
}