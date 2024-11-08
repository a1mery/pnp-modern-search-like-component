import * as React from 'react';
import { BaseWebComponent } from '@pnp/modern-search-extensibility';
import * as ReactDOM from 'react-dom';
import { ServiceScope } from '@microsoft/sp-core-library';
import { SPHttpClient } from '@microsoft/sp-http';
import { PageContext } from '@microsoft/sp-page-context';
import { SPFx, spfi } from "@pnp/sp";
import { IClientsidePage } from "@pnp/sp/clientside-pages";
import { IIconProps } from '@fluentui/react/lib/Icon';
import { IconButton } from '@fluentui/react/lib/Button';
import "@pnp/sp/clientside-pages";
import "@pnp/sp/comments/clientside-page";
import "@pnp/sp/webs";
import "@pnp/sp/items"
import "@pnp/sp/lists"
import { ILikedByInformation } from '@pnp/sp/comments/types';
import { Web } from "@pnp/sp/webs";
import { _Lists } from '@pnp/sp/lists/types';


export interface ICustomComponentProps {

    tenanturl?: string;
    pageurl?: string;
    pagesourcesite?: string;
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

    public componentDidMount(): void {
        this.checkCurrentLikes();
    }

    private async likeOnClick(currentLikeCount: number) {
        const web = Web([this.sp.web, this.props.pagesourcesite]);
        const page: IClientsidePage = await web.loadClientsidePage(this.props.pageurl.split(this.props.tenanturl)[1]);
        if (this.state.isLikedByUser) {
            await page.unlike();
            this.setState({
                isLikedByUser: false,
                likeCount: currentLikeCount -1
            })
        } else {
            await page.like();
            this.setState({
                isLikedByUser: true,
                likeCount: currentLikeCount + 1
            })
        }
    }

    private async checkCurrentLikes() {

        const web = Web([this.sp.web, this.props.pagesourcesite]);
        const page: IClientsidePage = await web.loadClientsidePage(this.props.pageurl.split(this.props.tenanturl)[1]);
        const likedByInfo: ILikedByInformation = await page.getLikedByInformation();
        this.setState({
            isLikedByUser: likedByInfo.isLikedByUser,
            likeCount: likedByInfo.likeCount
        })
    }

    public render() {


        const LikeSolidIcon: IIconProps = { iconName: 'LikeSolid' };
        const LikeIcon: IIconProps = { iconName: 'Like' };
        const personString: String = (this.state.likeCount > 2 && this.state.isLikedByUser) || (this.state.likeCount > 1 && !this.state.isLikedByUser) ? "persons" : "person"

        return <div>
            <span>
                {
                    <IconButton
                        iconProps={this.state.isLikedByUser ? LikeSolidIcon : LikeIcon}
                        title="LikeIcon"
                        ariaLabel="LikeIcon"
                        disabled={false}
                        checked={false}
                        onClick={() =>this.likeOnClick (this.state.likeCount)} />               
                }
            </span>
            {
                (this.state.isLikedByUser && this.state.likeCount > 1) &&
                <span>You and {this.state.likeCount - 1} {personString} liked this</span>
            }
            {
                (this.state.isLikedByUser && this.state.likeCount == 1) &&
                <span>You liked this</span>
            }
            {
                (!this.state.isLikedByUser && this.state.likeCount > 0) &&
                <span>{this.state.likeCount} {personString} liked this</span>
            }
            {
                (!this.state.isLikedByUser && this.state.likeCount == 0) &&
                <span>Like</span>
            }
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