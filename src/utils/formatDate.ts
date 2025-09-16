export function formatDate(dateString:string) {
    const options = { month: 'long', day: 'numeric', year: 'numeric' } as  Intl.DateTimeFormatOptions;
    return new Date(dateString).toLocaleDateString('en-US', options);
}