import { get } from "plugins/requests";

export function generate(focus,amount) {
    const library = focus.lib;
    const category = focus.cat;
    amount = amount || 1;

    return get("/generate",{library,category,amount});
}
