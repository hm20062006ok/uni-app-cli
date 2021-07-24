
function get(key) {
    if (!key || !_has(key)) {
        return '';
    }
    return uni.getStorageSync(key)
}

function all() {
    return uni.getStorageInfoSync()
}

function set(key, data, time) {
    if (!key) {
        return;
    }
    uni.setStorageSync(key, data)
}

function remove(key) {
    if (!key || !_has(key)) {
        return;
    }
    uni.removeStorageSync(key)
}

function clearAll() {
    const res = uni.getStorageInfoSync();
    res.keys.map((item) => {
        //TODO 替换此处
        // if (item == 'redirect' || item == 'spread') {
        //     return
        // }
        remove(item)
    })
}

function _has(key) {
    if (!key) {
        return
    }
    let value = uni.getStorageSync(key)
    if (value) {
        return true
    }
    return false
}

export default {
    get,
    all,
    set,
    remove,
    clearAll,
    has: _has
};
