import * as React from 'react';
import styles from './CreateRequest.module.scss';
import { ICreateRequestProps } from './ICreateRequestProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class CreateRequest extends React.Component < ICreateRequestProps, {} > {
  public render(): React.ReactElement<ICreateRequestProps> {
    return(
      <div className = { styles.createRequest } >
  <div className={styles.container}>
    <div className={styles.row}>
      <div className={styles.column}>
        <span className={styles.title}>Welcome to SharePoint!</span>
        <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
        <p className={styles.description}>{escape(this.props.description)}</p>
        <a href='https://aka.ms/spfx' className={styles.button}>
          <span className={styles.label}>Learn more</span>
        </a>
      </div>
    </div>
  </div>
      </div >
    );
  }
}
