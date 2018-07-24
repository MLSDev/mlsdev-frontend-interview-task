import { PhoneNumberFormat as PNF, PhoneNumberUtil } from 'google-libphonenumber';

const utils = PhoneNumberUtil.getInstance();

export class PhoneUtil {

  public static isValid(phone: string): boolean {
    try {
      return utils.isValidNumber(PhoneUtil.parse(phone));
    } catch (err) {
      return false;
    }
  }

  public static format(phone: string): string {
    try {
      return utils.format(PhoneUtil.parse(phone), PNF.E164);
    } catch (err) {
      return phone;
    }
  }

  private static parse(phone: string): any {
    return utils.parse(phone, 'US');
  }

}
