import { Injectable } from '@angular/core';

type MessageSource = string | Array<any> | { [key: string]: any };

export interface INotification {
  summary: string;
  detail: string;
}

@Injectable()
export class NotificationsService {

  constructor() {
    this.error = this.error.bind(this);
    this.success = this.success.bind(this);
  }

  public success(message: MessageSource, summary: string = 'Awesome!'): string {
    return this.notify(message, summary);
  }

  public error(message: MessageSource, summary: string = 'Oops!'): string {
    return this.notify(message, summary);
  }

  private notify(message: MessageSource, summary: string): string {
    const detail = this.stringify(message);
    this.show({ summary, detail });
    return detail;
  }

  private show(notification: INotification): void {
    alert(`${notification.summary} ${notification.detail}`);
  }

  private stringify(data: MessageSource, prefix: string = ''): string {
    if (typeof data === 'string') {
      return prefix + data;
    }

    if (Array.isArray(data)) {
      return data
        .filter(item => !!item)
        .map(item => this.stringify(item, prefix)).join('. ');
    }

    if (typeof data === 'object') {
      return Object
        .keys(data)
        .filter(key => !!data[key])
        .map(key => this.stringify(data[key], this.formatKey(key)))
        .join('. ');
    }

    return '';
  }

  private formatKey(key: string): string {
    let result = key.charAt(0).toUpperCase() + key.slice(1);
    result = result.replace(/\_/g, ' ');
    return `${result} `;
  }

}
