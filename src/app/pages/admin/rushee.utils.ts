export function getFirstName(name: string): string {
  if (name == null) return '';
  const index = name.indexOf(',');
  return name.substring(index + 1);
}

export function getLastName(name: string): string {
  if (name == null) return '';
  const index = name.indexOf(',');
  return name.substring(0, index);
}

export function getCurrentDate(): string {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export function getCheckins(allCheckins: any, key: string): any {
  return allCheckins?.[key] ?? null;
}

export function sortRushees(
  forms: any,
  extractor: (name: string) => string,
): any[] {
  return Object.keys(forms.phone)
    .map((key) => [key, forms.name[key]])
    .sort((a, b) =>
      extractor(a[1])
        .toUpperCase()
        .localeCompare(extractor(b[1]).toUpperCase()),
    );
}
