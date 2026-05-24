
export function formatDate(dateString: string) {
    // TODO: this should take state of language instead of static value
    return new Date(dateString).toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })
}
