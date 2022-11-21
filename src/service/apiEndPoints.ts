//Auth API ENDPOINTS
export const USER_LOGIN = "admin/login";
export const REFRESH = "admin/refresh";

//sam watch / theme ENDPOINT
export const GET_SAM_SWITCH =
  ":type/switch?os=:os&limit=:limit&page=:page&name_sku=:name_sku";
export const CREATE_SAM_SWITCH = "switch";
export const UPDATE_SAM_SWITCH = "switch/:id";

export const GET_STUDIO = "studio?limit=:limit&page=:page&name=:name";
export const CREATE_SAM_STUDIO = "studio";
export const UPDATE_SAM_STUDIO = "studio/:id";

export const GET_COUPONS =
  "coupon?os=:os&limit=:limit&page=:page&name_sku=:name_sku&expired_date=:date";
export const CREATE_COUPONS = "coupon";

export const REDEEMED = "redeemed?sam_switch_id=:sam_switch_id";
