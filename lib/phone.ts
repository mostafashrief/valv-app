// Egypt-only for v1 launch — hardcode the +20 country code. Revisit when
// expanding to MENA/global (will need a country picker).
export const EGYPT_COUNTRY_CODE = '+20';

/** Egyptian mobile numbers are 11 digits starting with 0 (e.g. 01012345678),
 * i.e. a 10-digit subscriber number starting with 1 after the leading 0. */
export function isValidEgyptMobile(localNumber: string): boolean {
  const digits = localNumber.replace(/\D/g, '');
  return /^1[0125]\d{8}$/.test(digits);
}

/** Converts a local "01012345678" or "1012345678" input into E.164 "+201012345678". */
export function toE164(localNumber: string): string {
  const digits = localNumber.replace(/\D/g, '').replace(/^0/, '');
  return `${EGYPT_COUNTRY_CODE}${digits}`;
}
