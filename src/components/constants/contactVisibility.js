// info: user / project obj
// linkinSlice: undefined or link object if user / project corresponding to info is in viewing user's links
export default function contactVisibility(info, linkinSlice) {
    const showEmail = Boolean(info.email) && (info.email_visibility == "everyone" || linkinSlice?.established);
    const showTele = Boolean(info.telegram) && (info.telegram_visibility == "everyone" || linkinSlice?.established);
    
    return {
        showEmail,
        showTele
    }
}