import request from "@/utils/request";


export function getProductDetail(id, data) {
    return request.get("/product/detail/" + id, data, {
        login:false
    });
}
