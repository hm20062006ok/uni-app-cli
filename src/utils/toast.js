export function minimalToast(msg){
    uni.showToast({
        title: msg,
        icon: 'none',
        duration: 1500
    });
}
