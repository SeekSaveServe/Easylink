// function to force dest to have only keys from source (force copy)
export default function updateHelper(source, dest) {
    for (const [key,val] of Object.entries(source)) {
        dest[key] = val;
    }
  
    // delete keys in original dest that are not in source
    for (const key of Object.keys(dest)) {
        if (!(key in source)) {
            delete dest[key];
        }
    }
  }