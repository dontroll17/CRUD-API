export const findUser = (arr: string[], id: string) => {
    return arr.find((el: any) => el.id === id);
}