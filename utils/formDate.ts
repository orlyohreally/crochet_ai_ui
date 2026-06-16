export function formatDate(dateString: string, lang: string) {
    return new Date(dateString).toLocaleDateString(lang, {
        year: "numeric",
        month: "long",
        day: "numeric",
    })
}
