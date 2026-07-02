export const COMPLEXITIES = {
    beginner: { label: "Beginner" },
    easy: { label: "Easy" },
    intermediate: { label: "Intermediate" },
    advanced: { label: "Advanced" }
}

export const SORT_BY = {
    createdAsc: { value: "created_at" },
    createdDesc: { value: "-created_at" },
    nameAsc: { value: "name" },
    nameDesc: { value: "-name" }
}

export const SORT_BY_OPTIONS = Object.values(SORT_BY).map((sortByOption) => sortByOption.value);
