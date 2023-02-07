function cleanObject<T>(object: T): T {
    function isArray(arr: any[]) {
        arr.forEach((value, index) => {
            if (typeof value === 'object') {
                if (Array.isArray(value)) {
                    arr[index] = isArray(value);
                } else {
                    let objResult = isObject(value);
                    if (objResult && Object.keys(objResult).length)
                        arr[index] = objResult;
                }
            }
        });
        let result = arr.filter(value => !!value || (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length)) as unknown as T;
        return result;
    }
    function isObject(obj: any) {
        if (Array.isArray(obj)) throw new Error('Only objects can be passed as an argument!');
        Object.keys(obj).forEach(key => {
            if (!obj[key]) delete obj[key];
            if (typeof obj[key] === 'object') {
                if (Array.isArray(obj[key])) {
                    if ((obj[key] as any[]).length) obj[key] = isArray(obj[key]);
                    else delete obj[key];
                } else {
                    if (Object.keys(obj[key]).length) {
                        let objResult = isObject(obj[key]);
                        if (objResult && Object.keys(objResult).length) obj[key] = objResult;
                        else delete obj[key];
                    } else {
                        delete obj[key];
                    }
                }
            }

        });
        return obj as T;
    }

    if (typeof object === 'object') {
        return Array.isArray(object) ? isArray(object) : isObject(object);
    }

    return object;
}


export default cleanObject;