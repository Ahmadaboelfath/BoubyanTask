import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-webpart-base";

import * as strings from "CreateRequestWebPartStrings";
import CreateRequest from "./components/CreateRequest";
import { ICreateRequestProps } from "./components/ICreateRequestProps";
import ContextInjection from "../../ContextInjection";

export interface ICreateRequestWebPartProps {
  description: string;
}

export default class CreateRequestWebPart extends BaseClientSideWebPart<ICreateRequestWebPartProps> {
  public onInit(): Promise<any> {
    return super.onInit().then(() => {
      ContextInjection.getInstance().initializeContext(this.context);
    });
  }

  public render(): void {
    const element: React.ReactElement<ICreateRequestProps> =
      React.createElement(CreateRequest, {
        description: this.properties.description,
      });

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
