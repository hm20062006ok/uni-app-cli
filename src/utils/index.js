/**
 * 将source中的属性添加到target， target中有，则不覆盖
 * 注意： 只判断了一层
 * @param target
 * @param source
 * @returns target
 */
export function mergeObjWithoutOverwriting(target, source) {
    Object.keys(source).forEach(item => {
        if (Object.keys(target).indexOf(item) < 0)
            target[item] = source[item];
    })
    return target
}


export const handleLoginFailure = () => {

}

/**
 *
 * @param v1
 * @param v2
 * @returns {number} -1 if string1 < string2, 0 if string1 = string2， 1 if string1 > string2;
 */
export function compareVersion(v1, v2) {
    v1 = v1.split('.')
    v2 = v2.split('.')
    const len = Math.max(v1.length, v2.length)

    while (v1.length < len) {
        v1.push('0')
    }
    while (v2.length < len) {
        v2.push('0')
    }

    for (let i = 0; i < len; i++) {
        const num1 = parseInt(v1[i])
        const num2 = parseInt(v2[i])

        if (num1 > num2) {
            return 1
        } else if (num1 < num2) {
            return -1
        }
    }
    return 0
}
