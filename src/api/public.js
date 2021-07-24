import request from "@/utils/request";

export function updateApplication(params){
    return request.get('/version',params,{ login: false })
}