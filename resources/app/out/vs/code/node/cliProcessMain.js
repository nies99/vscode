/*!--------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
(function() {
var __m = ["require","exports","vs/base/common/lifecycle","vs/base/common/path","vs/platform/instantiation/common/instantiation","vs/nls!vs/code/node/cliProcessMain","vs/nls","vs/platform/log/common/log","vs/base/common/types","vs/base/common/network","vs/base/node/pfs","vs/base/common/event","vs/base/common/async","vs/base/common/uri","vs/base/common/platform","vs/base/common/buffer","vs/base/common/strings","vs/base/common/objects","vs/base/common/arrays","vs/platform/environment/common/environment","vs/base/common/errors","vs/base/common/resources","vs/platform/registry/common/platform","fs","vs/platform/extensionManagement/common/extensionManagement","vs/platform/extensionManagement/common/extensionManagementUtil","vs/platform/files/common/files","vs/platform/configuration/common/configuration","vs/base/common/cancellation","vs/platform/configuration/common/configurationRegistry","vs/base/common/stream","vs/base/parts/ipc/common/ipc","vs/base/common/errorMessage","child_process","vs/platform/extensions/common/extensions","vs/base/common/uuid","vs/platform/product/common/productService","vs/platform/telemetry/common/telemetry","vs/base/node/zip","vs/base/common/labels","vs/base/node/decoder","util","vs/base/parts/ipc/node/ipc.cp","vs/platform/extensions/common/extensionValidator","vs/platform/instantiation/common/descriptors","vs/platform/files/common/io","vs/platform/files/node/watcher/watcher","vs/platform/instantiation/common/serviceCollection","semver-umd","vs/platform/product/common/product","vs/platform/request/common/request","vs/platform/telemetry/common/telemetryUtils","vs/platform/extensionManagement/node/extensionManagementUtil","vs/base/common/assert","vs/base/common/decorators","vs/base/common/json","vs/base/common/console","vs/base/common/marshalling","vs/base/node/paths","vs/base/node/extpath","vs/base/node/watcher","vs/nls!vs/base/common/date","vs/base/common/date","vs/nls!vs/base/common/errorMessage","vs/nls!vs/base/node/processes","vs/base/node/processes","vs/base/common/extpath","vs/nls!vs/base/node/zip","vs/nls!vs/platform/configuration/common/configurationRegistry","vs/nls!vs/platform/extensionManagement/common/extensionManagement","vs/nls!vs/platform/extensionManagement/node/extensionManagementService","vs/nls!vs/platform/extensionManagement/node/extensionManagementUtil","vs/nls!vs/platform/extensionManagement/node/extensionsScanner","vs/nls!vs/platform/extensions/common/extensionValidator","vs/nls!vs/platform/files/common/fileService","vs/nls!vs/platform/files/common/io","vs/nls!vs/platform/files/node/diskFileSystemProvider","vs/nls!vs/platform/request/common/request","vs/nls!vs/platform/telemetry/common/telemetryService","vs/platform/extensionManagement/common/extensionNls","vs/platform/files/node/watcher/nsfw/watcherService","vs/platform/files/node/watcher/unix/watcherService","vs/platform/files/node/watcher/win32/csharpWatcherService","vs/platform/files/node/watcher/win32/watcherService","vs/platform/instantiation/common/graph","vs/platform/download/common/download","vs/platform/extensionManagement/node/extensionsManifestCache","vs/platform/files/node/watcher/nodejs/watcherService","vs/platform/instantiation/common/instantiationService","vs/platform/localizations/common/localizations","vs/platform/extensionManagement/node/extensionDownloader","vs/platform/extensionManagement/node/extensionLifecycle","vs/platform/files/common/fileService","vs/base/common/map","vs/platform/files/node/diskFileSystemProvider","vs/platform/localizations/node/localizations","crypto","vs/platform/log/node/spdlogService","vs/platform/environment/node/environmentService","os","vs/platform/jsonschemas/common/jsonContributionRegistry","vs/platform/configuration/common/configurationModels","vs/platform/configuration/common/configurationService","vs/platform/request/node/proxy","url","vs/platform/serviceMachineId/common/serviceMachineId","vs/platform/state/node/state","vs/platform/state/node/stateService","vs/platform/storage/common/storage","vs/platform/extensionManagement/common/extensionGalleryService","vs/platform/telemetry/common/telemetryService","vs/platform/telemetry/node/appInsightsAppender","vs/platform/telemetry/node/commonProperties","vs/platform/telemetry/node/telemetry","vs/platform/extensionManagement/node/extensionsScanner","vs/platform/extensionManagement/node/extensionManagementService","vs/platform/request/node/requestService","string_decoder","vs/base/common/normalization","vs/base/common/glob","vs/base/common/iterator","applicationinsights","yauzl","yazl","zlib","vs/code/node/cliProcessMain"];
var __M = function(deps) {
  var result = [];
  for (var i = 0, len = deps.length; i < len; i++) {
    result[i] = __m[deps[i]];
  }
  return result;
};
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[53/*vs/base/common/assert*/], __M([0/*require*/,1/*exports*/]), function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ok = void 0;
    /**
     * Throws an error with the provided message if the provided value does not evaluate to a true Javascript value.
     */
    function ok(value, message) {
        if (!value) {
            throw new Error(message ? `Assertion failed (${message})` : 'Assertion Failed');
        }
    }
    exports.ok = ok;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[54/*vs/base/common/decorators*/], __M([0/*require*/,1/*exports*/]), function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.throttle = exports.debounce = exports.memoize = exports.createMemoizer = exports.createDecorator = void 0;
    function createDecorator(mapFn) {
        return (target, key, descriptor) => {
            let fnKey = null;
            let fn = null;
            if (typeof descriptor.value === 'function') {
                fnKey = 'value';
                fn = descriptor.value;
            }
            else if (typeof descriptor.get === 'function') {
                fnKey = 'get';
                fn = descriptor.get;
            }
            if (!fn) {
                throw new Error('not supported');
            }
            descriptor[fnKey] = mapFn(fn, key);
        };
    }
    exports.createDecorator = createDecorator;
    let memoizeId = 0;
    function createMemoizer() {
        const memoizeKeyPrefix = `$memoize${memoizeId++}`;
        let self = undefined;
        const result = function memoize(target, key, descriptor) {
            let fnKey = null;
            let fn = null;
            if (typeof descriptor.value === 'function') {
                fnKey = 'value';
                fn = descriptor.value;
                if (fn.length !== 0) {
                    console.warn('Memoize should only be used in functions with zero parameters');
                }
            }
            else if (typeof descriptor.get === 'function') {
                fnKey = 'get';
                fn = descriptor.get;
            }
            if (!fn) {
                throw new Error('not supported');
            }
            const memoizeKey = `${memoizeKeyPrefix}:${key}`;
            descriptor[fnKey] = function (...args) {
                self = this;
                if (!this.hasOwnProperty(memoizeKey)) {
                    Object.defineProperty(this, memoizeKey, {
                        configurable: true,
                        enumerable: false,
                        writable: true,
                        value: fn.apply(this, args)
                    });
                }
                return this[memoizeKey];
            };
        };
        result.clear = () => {
            if (typeof self === 'undefined') {
                return;
            }
            Object.getOwnPropertyNames(self).forEach(property => {
                if (property.indexOf(memoizeKeyPrefix) === 0) {
                    delete self[property];
                }
            });
        };
        return result;
    }
    exports.createMemoizer = createMemoizer;
    function memoize(target, key, descriptor) {
        return createMemoizer()(target, key, descriptor);
    }
    exports.memoize = memoize;
    function debounce(delay, reducer, initialValueProvider) {
        return createDecorator((fn, key) => {
            const timerKey = `$debounce$${key}`;
            const resultKey = `$debounce$result$${key}`;
            return function (...args) {
                if (!this[resultKey]) {
                    this[resultKey] = initialValueProvider ? initialValueProvider() : undefined;
                }
                clearTimeout(this[timerKey]);
                if (reducer) {
                    this[resultKey] = reducer(this[resultKey], ...args);
                    args = [this[resultKey]];
                }
                this[timerKey] = setTimeout(() => {
                    fn.apply(this, args);
                    this[resultKey] = initialValueProvider ? initialValueProvider() : undefined;
                }, delay);
            };
        });
    }
    exports.debounce = debounce;
    function throttle(delay, reducer, initialValueProvider) {
        return createDecorator((fn, key) => {
            const timerKey = `$throttle$timer$${key}`;
            const resultKey = `$throttle$result$${key}`;
            const lastRunKey = `$throttle$lastRun$${key}`;
            const pendingKey = `$throttle$pending$${key}`;
            return function (...args) {
                if (!this[resultKey]) {
                    this[resultKey] = initialValueProvider ? initialValueProvider() : undefined;
                }
                if (this[lastRunKey] === null || this[lastRunKey] === undefined) {
                    this[lastRunKey] = -Number.MAX_VALUE;
                }
                if (reducer) {
                    this[resultKey] = reducer(this[resultKey], ...args);
                }
                if (this[pendingKey]) {
                    return;
                }
                const nextTime = this[lastRunKey] + delay;
                if (nextTime <= Date.now()) {
                    this[lastRunKey] = Date.now();
                    fn.apply(this, [this[resultKey]]);
                    this[resultKey] = initialValueProvider ? initialValueProvider() : undefined;
                }
                else {
                    this[pendingKey] = true;
                    this[timerKey] = setTimeout(() => {
                        this[pendingKey] = false;
                        this[lastRunKey] = Date.now();
                        fn.apply(this, [this[resultKey]]);
                        this[resultKey] = initialValueProvider ? initialValueProvider() : undefined;
                    }, nextTime - Date.now());
                }
            };
        });
    }
    exports.throttle = throttle;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[18/*vs/base/common/arrays*/], __M([0/*require*/,1/*exports*/,20/*vs/base/common/errors*/]), function (require, exports, errors_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getRandomElement = exports.asArray = exports.mapArrayOrNot = exports.pushToEnd = exports.pushToStart = exports.shuffle = exports.arrayInsert = exports.remove = exports.insert = exports.index = exports.range = exports.flatten = exports.commonPrefixLength = exports.firstOrDefault = exports.lastIndex = exports.uniqueFilter = exports.distinctES6 = exports.distinct = exports.isNonEmptyArray = exports.isFalsyOrEmpty = exports.move = exports.coalesceInPlace = exports.coalesce = exports.topAsync = exports.top = exports.delta = exports.sortedDiff = exports.groupBy = exports.mergeSort = exports.findFirstInSorted = exports.binarySearch = exports.equals = exports.tail2 = exports.tail = void 0;
    /**
     * Returns the last element of an array.
     * @param array The array.
     * @param n Which element from the end (default is zero).
     */
    function tail(array, n = 0) {
        return array[array.length - (1 + n)];
    }
    exports.tail = tail;
    function tail2(arr) {
        if (arr.length === 0) {
            throw new Error('Invalid tail call');
        }
        return [arr.slice(0, arr.length - 1), arr[arr.length - 1]];
    }
    exports.tail2 = tail2;
    function equals(one, other, itemEquals = (a, b) => a === b) {
        if (one === other) {
            return true;
        }
        if (!one || !other) {
            return false;
        }
        if (one.length !== other.length) {
            return false;
        }
        for (let i = 0, len = one.length; i < len; i++) {
            if (!itemEquals(one[i], other[i])) {
                return false;
            }
        }
        return true;
    }
    exports.equals = equals;
    function binarySearch(array, key, comparator) {
        let low = 0, high = array.length - 1;
        while (low <= high) {
            const mid = ((low + high) / 2) | 0;
            const comp = comparator(array[mid], key);
            if (comp < 0) {
                low = mid + 1;
            }
            else if (comp > 0) {
                high = mid - 1;
            }
            else {
                return mid;
            }
        }
        return -(low + 1);
    }
    exports.binarySearch = binarySearch;
    /**
     * Takes a sorted array and a function p. The array is sorted in such a way that all elements where p(x) is false
     * are located before all elements where p(x) is true.
     * @returns the least x for which p(x) is true or array.length if no element fullfills the given function.
     */
    function findFirstInSorted(array, p) {
        let low = 0, high = array.length;
        if (high === 0) {
            return 0; // no children
        }
        while (low < high) {
            const mid = Math.floor((low + high) / 2);
            if (p(array[mid])) {
                high = mid;
            }
            else {
                low = mid + 1;
            }
        }
        return low;
    }
    exports.findFirstInSorted = findFirstInSorted;
    /**
     * Like `Array#sort` but always stable. Usually runs a little slower `than Array#sort`
     * so only use this when actually needing stable sort.
     */
    function mergeSort(data, compare) {
        _sort(data, compare, 0, data.length - 1, []);
        return data;
    }
    exports.mergeSort = mergeSort;
    function _merge(a, compare, lo, mid, hi, aux) {
        let leftIdx = lo, rightIdx = mid + 1;
        for (let i = lo; i <= hi; i++) {
            aux[i] = a[i];
        }
        for (let i = lo; i <= hi; i++) {
            if (leftIdx > mid) {
                // left side consumed
                a[i] = aux[rightIdx++];
            }
            else if (rightIdx > hi) {
                // right side consumed
                a[i] = aux[leftIdx++];
            }
            else if (compare(aux[rightIdx], aux[leftIdx]) < 0) {
                // right element is less -> comes first
                a[i] = aux[rightIdx++];
            }
            else {
                // left element comes first (less or equal)
                a[i] = aux[leftIdx++];
            }
        }
    }
    function _sort(a, compare, lo, hi, aux) {
        if (hi <= lo) {
            return;
        }
        const mid = lo + ((hi - lo) / 2) | 0;
        _sort(a, compare, lo, mid, aux);
        _sort(a, compare, mid + 1, hi, aux);
        if (compare(a[mid], a[mid + 1]) <= 0) {
            // left and right are sorted and if the last-left element is less
            // or equals than the first-right element there is nothing else
            // to do
            return;
        }
        _merge(a, compare, lo, mid, hi, aux);
    }
    function groupBy(data, compare) {
        const result = [];
        let currentGroup = undefined;
        for (const element of mergeSort(data.slice(0), compare)) {
            if (!currentGroup || compare(currentGroup[0], element) !== 0) {
                currentGroup = [element];
                result.push(currentGroup);
            }
            else {
                currentGroup.push(element);
            }
        }
        return result;
    }
    exports.groupBy = groupBy;
    /**
     * Diffs two *sorted* arrays and computes the splices which apply the diff.
     */
    function sortedDiff(before, after, compare) {
        const result = [];
        function pushSplice(start, deleteCount, toInsert) {
            if (deleteCount === 0 && toInsert.length === 0) {
                return;
            }
            const latest = result[result.length - 1];
            if (latest && latest.start + latest.deleteCount === start) {
                latest.deleteCount += deleteCount;
                latest.toInsert.push(...toInsert);
            }
            else {
                result.push({ start, deleteCount, toInsert });
            }
        }
        let beforeIdx = 0;
        let afterIdx = 0;
        while (true) {
            if (beforeIdx === before.length) {
                pushSplice(beforeIdx, 0, after.slice(afterIdx));
                break;
            }
            if (afterIdx === after.length) {
                pushSplice(beforeIdx, before.length - beforeIdx, []);
                break;
            }
            const beforeElement = before[beforeIdx];
            const afterElement = after[afterIdx];
            const n = compare(beforeElement, afterElement);
            if (n === 0) {
                // equal
                beforeIdx += 1;
                afterIdx += 1;
            }
            else if (n < 0) {
                // beforeElement is smaller -> before element removed
                pushSplice(beforeIdx, 1, []);
                beforeIdx += 1;
            }
            else if (n > 0) {
                // beforeElement is greater -> after element added
                pushSplice(beforeIdx, 0, [afterElement]);
                afterIdx += 1;
            }
        }
        return result;
    }
    exports.sortedDiff = sortedDiff;
    /**
     * Takes two *sorted* arrays and computes their delta (removed, added elements).
     * Finishes in `Math.min(before.length, after.length)` steps.
     */
    function delta(before, after, compare) {
        const splices = sortedDiff(before, after, compare);
        const removed = [];
        const added = [];
        for (const splice of splices) {
            removed.push(...before.slice(splice.start, splice.start + splice.deleteCount));
            added.push(...splice.toInsert);
        }
        return { removed, added };
    }
    exports.delta = delta;
    /**
     * Returns the top N elements from the array.
     *
     * Faster than sorting the entire array when the array is a lot larger than N.
     *
     * @param array The unsorted array.
     * @param compare A sort function for the elements.
     * @param n The number of elements to return.
     * @return The first n elemnts from array when sorted with compare.
     */
    function top(array, compare, n) {
        if (n === 0) {
            return [];
        }
        const result = array.slice(0, n).sort(compare);
        topStep(array, compare, result, n, array.length);
        return result;
    }
    exports.top = top;
    /**
     * Asynchronous variant of `top()` allowing for splitting up work in batches between which the event loop can run.
     *
     * Returns the top N elements from the array.
     *
     * Faster than sorting the entire array when the array is a lot larger than N.
     *
     * @param array The unsorted array.
     * @param compare A sort function for the elements.
     * @param n The number of elements to return.
     * @param batch The number of elements to examine before yielding to the event loop.
     * @return The first n elemnts from array when sorted with compare.
     */
    function topAsync(array, compare, n, batch, token) {
        if (n === 0) {
            return Promise.resolve([]);
        }
        return new Promise((resolve, reject) => {
            (async () => {
                const o = array.length;
                const result = array.slice(0, n).sort(compare);
                for (let i = n, m = Math.min(n + batch, o); i < o; i = m, m = Math.min(m + batch, o)) {
                    if (i > n) {
                        await new Promise(resolve => setTimeout(resolve)); // nextTick() would starve I/O.
                    }
                    if (token && token.isCancellationRequested) {
                        throw errors_1.canceled();
                    }
                    topStep(array, compare, result, i, m);
                }
                return result;
            })()
                .then(resolve, reject);
        });
    }
    exports.topAsync = topAsync;
    function topStep(array, compare, result, i, m) {
        for (const n = result.length; i < m; i++) {
            const element = array[i];
            if (compare(element, result[n - 1]) < 0) {
                result.pop();
                const j = findFirstInSorted(result, e => compare(element, e) < 0);
                result.splice(j, 0, element);
            }
        }
    }
    /**
     * @returns New array with all falsy values removed. The original array IS NOT modified.
     */
    function coalesce(array) {
        return array.filter(e => !!e);
    }
    exports.coalesce = coalesce;
    /**
     * Remove all falsey values from `array`. The original array IS modified.
     */
    function coalesceInPlace(array) {
        let to = 0;
        for (let i = 0; i < array.length; i++) {
            if (!!array[i]) {
                array[to] = array[i];
                to += 1;
            }
        }
        array.length = to;
    }
    exports.coalesceInPlace = coalesceInPlace;
    /**
     * Moves the element in the array for the provided positions.
     */
    function move(array, from, to) {
        array.splice(to, 0, array.splice(from, 1)[0]);
    }
    exports.move = move;
    /**
     * @returns false if the provided object is an array and not empty.
     */
    function isFalsyOrEmpty(obj) {
        return !Array.isArray(obj) || obj.length === 0;
    }
    exports.isFalsyOrEmpty = isFalsyOrEmpty;
    function isNonEmptyArray(obj) {
        return Array.isArray(obj) && obj.length > 0;
    }
    exports.isNonEmptyArray = isNonEmptyArray;
    /**
     * Removes duplicates from the given array. The optional keyFn allows to specify
     * how elements are checked for equalness by returning a unique string for each.
     */
    function distinct(array, keyFn) {
        if (!keyFn) {
            return array.filter((element, position) => {
                return array.indexOf(element) === position;
            });
        }
        const seen = Object.create(null);
        return array.filter((elem) => {
            const key = keyFn(elem);
            if (seen[key]) {
                return false;
            }
            seen[key] = true;
            return true;
        });
    }
    exports.distinct = distinct;
    function distinctES6(array) {
        const seen = new Set();
        return array.filter(element => {
            if (seen.has(element)) {
                return false;
            }
            seen.add(element);
            return true;
        });
    }
    exports.distinctES6 = distinctES6;
    function uniqueFilter(keyFn) {
        const seen = Object.create(null);
        return element => {
            const key = keyFn(element);
            if (seen[key]) {
                return false;
            }
            seen[key] = true;
            return true;
        };
    }
    exports.uniqueFilter = uniqueFilter;
    function lastIndex(array, fn) {
        for (let i = array.length - 1; i >= 0; i--) {
            const element = array[i];
            if (fn(element)) {
                return i;
            }
        }
        return -1;
    }
    exports.lastIndex = lastIndex;
    function firstOrDefault(array, notFoundValue) {
        return array.length > 0 ? array[0] : notFoundValue;
    }
    exports.firstOrDefault = firstOrDefault;
    function commonPrefixLength(one, other, equals = (a, b) => a === b) {
        let result = 0;
        for (let i = 0, len = Math.min(one.length, other.length); i < len && equals(one[i], other[i]); i++) {
            result++;
        }
        return result;
    }
    exports.commonPrefixLength = commonPrefixLength;
    function flatten(arr) {
        return [].concat(...arr);
    }
    exports.flatten = flatten;
    function range(arg, to) {
        let from = typeof to === 'number' ? arg : 0;
        if (typeof to === 'number') {
            from = arg;
        }
        else {
            from = 0;
            to = arg;
        }
        const result = [];
        if (from <= to) {
            for (let i = from; i < to; i++) {
                result.push(i);
            }
        }
        else {
            for (let i = from; i > to; i--) {
                result.push(i);
            }
        }
        return result;
    }
    exports.range = range;
    function index(array, indexer, mapper) {
        return array.reduce((r, t) => {
            r[indexer(t)] = mapper ? mapper(t) : t;
            return r;
        }, Object.create(null));
    }
    exports.index = index;
    /**
     * Inserts an element into an array. Returns a function which, when
     * called, will remove that element from the array.
     */
    function insert(array, element) {
        array.push(element);
        return () => remove(array, element);
    }
    exports.insert = insert;
    /**
     * Removes an element from an array if it can be found.
     */
    function remove(array, element) {
        const index = array.indexOf(element);
        if (index > -1) {
            array.splice(index, 1);
            return element;
        }
        return undefined;
    }
    exports.remove = remove;
    /**
     * Insert `insertArr` inside `target` at `insertIndex`.
     * Please don't touch unless you understand https://jsperf.com/inserting-an-array-within-an-array
     */
    function arrayInsert(target, insertIndex, insertArr) {
        const before = target.slice(0, insertIndex);
        const after = target.slice(insertIndex);
        return before.concat(insertArr, after);
    }
    exports.arrayInsert = arrayInsert;
    /**
     * Uses Fisher-Yates shuffle to shuffle the given array
     */
    function shuffle(array, _seed) {
        let rand;
        if (typeof _seed === 'number') {
            let seed = _seed;
            // Seeded random number generator in JS. Modified from:
            // https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
            rand = () => {
                const x = Math.sin(seed++) * 179426549; // throw away most significant digits and reduce any potential bias
                return x - Math.floor(x);
            };
        }
        else {
            rand = Math.random;
        }
        for (let i = array.length - 1; i > 0; i -= 1) {
            const j = Math.floor(rand() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
    exports.shuffle = shuffle;
    /**
     * Pushes an element to the start of the array, if found.
     */
    function pushToStart(arr, value) {
        const index = arr.indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
            arr.unshift(value);
        }
    }
    exports.pushToStart = pushToStart;
    /**
     * Pushes an element to the end of the array, if found.
     */
    function pushToEnd(arr, value) {
        const index = arr.indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
            arr.push(value);
        }
    }
    exports.pushToEnd = pushToEnd;
    function mapArrayOrNot(items, fn) {
        return Array.isArray(items) ?
            items.map(fn) :
            fn(items);
    }
    exports.mapArrayOrNot = mapArrayOrNot;
    function asArray(x) {
        return Array.isArray(x) ? x : [x];
    }
    exports.asArray = asArray;
    function getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    exports.getRandomElement = getRandomElement;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[55/*vs/base/common/json*/], __M([0/*require*/,1/*exports*/]), function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getNodeType = exports.stripComments = exports.visit = exports.findNodeAtOffset = exports.contains = exports.getNodeValue = exports.getNodePath = exports.findNodeAtLocation = exports.parseTree = exports.parse = exports.getLocation = exports.createScanner = exports.ParseOptions = exports.ParseErrorCode = exports.SyntaxKind = exports.ScanError = void 0;
    var ScanError;
    (function (ScanError) {
        ScanError[ScanError["None"] = 0] = "None";
        ScanError[ScanError["UnexpectedEndOfComment"] = 1] = "UnexpectedEndOfComment";
        ScanError[ScanError["UnexpectedEndOfString"] = 2] = "UnexpectedEndOfString";
        ScanError[ScanError["UnexpectedEndOfNumber"] = 3] = "UnexpectedEndOfNumber";
        ScanError[ScanError["InvalidUnicode"] = 4] = "InvalidUnicode";
        ScanError[ScanError["InvalidEscapeCharacter"] = 5] = "InvalidEscapeCharacter";
        ScanError[ScanError["InvalidCharacter"] = 6] = "InvalidCharacter";
    })(ScanError = exports.ScanError || (exports.ScanError = {}));
    var SyntaxKind;
    (function (SyntaxKind) {
        SyntaxKind[SyntaxKind["OpenBraceToken"] = 1] = "OpenBraceToken";
        SyntaxKind[SyntaxKind["CloseBraceToken"] = 2] = "CloseBraceToken";
        SyntaxKind[SyntaxKind["OpenBracketToken"] = 3] = "OpenBracketToken";
        SyntaxKind[SyntaxKind["CloseBracketToken"] = 4] = "CloseBracketToken";
        SyntaxKind[SyntaxKind["CommaToken"] = 5] = "CommaToken";
        SyntaxKind[SyntaxKind["ColonToken"] = 6] = "ColonToken";
        SyntaxKind[SyntaxKind["NullKeyword"] = 7] = "NullKeyword";
        SyntaxKind[SyntaxKind["TrueKeyword"] = 8] = "TrueKeyword";
        SyntaxKind[SyntaxKind["FalseKeyword"] = 9] = "FalseKeyword";
        SyntaxKind[SyntaxKind["StringLiteral"] = 10] = "StringLiteral";
        SyntaxKind[SyntaxKind["NumericLiteral"] = 11] = "NumericLiteral";
        SyntaxKind[SyntaxKind["LineCommentTrivia"] = 12] = "LineCommentTrivia";
        SyntaxKind[SyntaxKind["BlockCommentTrivia"] = 13] = "BlockCommentTrivia";
        SyntaxKind[SyntaxKind["LineBreakTrivia"] = 14] = "LineBreakTrivia";
        SyntaxKind[SyntaxKind["Trivia"] = 15] = "Trivia";
        SyntaxKind[SyntaxKind["Unknown"] = 16] = "Unknown";
        SyntaxKind[SyntaxKind["EOF"] = 17] = "EOF";
    })(SyntaxKind = exports.SyntaxKind || (exports.SyntaxKind = {}));
    var ParseErrorCode;
    (function (ParseErrorCode) {
        ParseErrorCode[ParseErrorCode["InvalidSymbol"] = 1] = "InvalidSymbol";
        ParseErrorCode[ParseErrorCode["InvalidNumberFormat"] = 2] = "InvalidNumberFormat";
        ParseErrorCode[ParseErrorCode["PropertyNameExpected"] = 3] = "PropertyNameExpected";
        ParseErrorCode[ParseErrorCode["ValueExpected"] = 4] = "ValueExpected";
        ParseErrorCode[ParseErrorCode["ColonExpected"] = 5] = "ColonExpected";
        ParseErrorCode[ParseErrorCode["CommaExpected"] = 6] = "CommaExpected";
        ParseErrorCode[ParseErrorCode["CloseBraceExpected"] = 7] = "CloseBraceExpected";
        ParseErrorCode[ParseErrorCode["CloseBracketExpected"] = 8] = "CloseBracketExpected";
        ParseErrorCode[ParseErrorCode["EndOfFileExpected"] = 9] = "EndOfFileExpected";
        ParseErrorCode[ParseErrorCode["InvalidCommentToken"] = 10] = "InvalidCommentToken";
        ParseErrorCode[ParseErrorCode["UnexpectedEndOfComment"] = 11] = "UnexpectedEndOfComment";
        ParseErrorCode[ParseErrorCode["UnexpectedEndOfString"] = 12] = "UnexpectedEndOfString";
        ParseErrorCode[ParseErrorCode["UnexpectedEndOfNumber"] = 13] = "UnexpectedEndOfNumber";
        ParseErrorCode[ParseErrorCode["InvalidUnicode"] = 14] = "InvalidUnicode";
        ParseErrorCode[ParseErrorCode["InvalidEscapeCharacter"] = 15] = "InvalidEscapeCharacter";
        ParseErrorCode[ParseErrorCode["InvalidCharacter"] = 16] = "InvalidCharacter";
    })(ParseErrorCode = exports.ParseErrorCode || (exports.ParseErrorCode = {}));
    var ParseOptions;
    (function (ParseOptions) {
        ParseOptions.DEFAULT = {
            allowTrailingComma: true
        };
    })(ParseOptions = exports.ParseOptions || (exports.ParseOptions = {}));
    /**
     * Creates a JSON scanner on the given text.
     * If ignoreTrivia is set, whitespaces or comments are ignored.
     */
    function createScanner(text, ignoreTrivia = false) {
        let pos = 0, len = text.length, value = '', tokenOffset = 0, token = 16 /* Unknown */, scanError = 0 /* None */;
        function scanHexDigits(count) {
            let digits = 0;
            let hexValue = 0;
            while (digits < count) {
                const ch = text.charCodeAt(pos);
                if (ch >= 48 /* _0 */ && ch <= 57 /* _9 */) {
                    hexValue = hexValue * 16 + ch - 48 /* _0 */;
                }
                else if (ch >= 65 /* A */ && ch <= 70 /* F */) {
                    hexValue = hexValue * 16 + ch - 65 /* A */ + 10;
                }
                else if (ch >= 97 /* a */ && ch <= 102 /* f */) {
                    hexValue = hexValue * 16 + ch - 97 /* a */ + 10;
                }
                else {
                    break;
                }
                pos++;
                digits++;
            }
            if (digits < count) {
                hexValue = -1;
            }
            return hexValue;
        }
        function setPosition(newPosition) {
            pos = newPosition;
            value = '';
            tokenOffset = 0;
            token = 16 /* Unknown */;
            scanError = 0 /* None */;
        }
        function scanNumber() {
            const start = pos;
            if (text.charCodeAt(pos) === 48 /* _0 */) {
                pos++;
            }
            else {
                pos++;
                while (pos < text.length && isDigit(text.charCodeAt(pos))) {
                    pos++;
                }
            }
            if (pos < text.length && text.charCodeAt(pos) === 46 /* dot */) {
                pos++;
                if (pos < text.length && isDigit(text.charCodeAt(pos))) {
                    pos++;
                    while (pos < text.length && isDigit(text.charCodeAt(pos))) {
                        pos++;
                    }
                }
                else {
                    scanError = 3 /* UnexpectedEndOfNumber */;
                    return text.substring(start, pos);
                }
            }
            let end = pos;
            if (pos < text.length && (text.charCodeAt(pos) === 69 /* E */ || text.charCodeAt(pos) === 101 /* e */)) {
                pos++;
                if (pos < text.length && text.charCodeAt(pos) === 43 /* plus */ || text.charCodeAt(pos) === 45 /* minus */) {
                    pos++;
                }
                if (pos < text.length && isDigit(text.charCodeAt(pos))) {
                    pos++;
                    while (pos < text.length && isDigit(text.charCodeAt(pos))) {
                        pos++;
                    }
                    end = pos;
                }
                else {
                    scanError = 3 /* UnexpectedEndOfNumber */;
                }
            }
            return text.substring(start, end);
        }
        function scanString() {
            let result = '', start = pos;
            while (true) {
                if (pos >= len) {
                    result += text.substring(start, pos);
                    scanError = 2 /* UnexpectedEndOfString */;
                    break;
                }
                const ch = text.charCodeAt(pos);
                if (ch === 34 /* doubleQuote */) {
                    result += text.substring(start, pos);
                    pos++;
                    break;
                }
                if (ch === 92 /* backslash */) {
                    result += text.substring(start, pos);
                    pos++;
                    if (pos >= len) {
                        scanError = 2 /* UnexpectedEndOfString */;
                        break;
                    }
                    const ch2 = text.charCodeAt(pos++);
                    switch (ch2) {
                        case 34 /* doubleQuote */:
                            result += '\"';
                            break;
                        case 92 /* backslash */:
                            result += '\\';
                            break;
                        case 47 /* slash */:
                            result += '/';
                            break;
                        case 98 /* b */:
                            result += '\b';
                            break;
                        case 102 /* f */:
                            result += '\f';
                            break;
                        case 110 /* n */:
                            result += '\n';
                            break;
                        case 114 /* r */:
                            result += '\r';
                            break;
                        case 116 /* t */:
                            result += '\t';
                            break;
                        case 117 /* u */:
                            const ch3 = scanHexDigits(4);
                            if (ch3 >= 0) {
                                result += String.fromCharCode(ch3);
                            }
                            else {
                                scanError = 4 /* InvalidUnicode */;
                            }
                            break;
                        default:
                            scanError = 5 /* InvalidEscapeCharacter */;
                    }
                    start = pos;
                    continue;
                }
                if (ch >= 0 && ch <= 0x1F) {
                    if (isLineBreak(ch)) {
                        result += text.substring(start, pos);
                        scanError = 2 /* UnexpectedEndOfString */;
                        break;
                    }
                    else {
                        scanError = 6 /* InvalidCharacter */;
                        // mark as error but continue with string
                    }
                }
                pos++;
            }
            return result;
        }
        function scanNext() {
            value = '';
            scanError = 0 /* None */;
            tokenOffset = pos;
            if (pos >= len) {
                // at the end
                tokenOffset = len;
                return token = 17 /* EOF */;
            }
            let code = text.charCodeAt(pos);
            // trivia: whitespace
            if (isWhitespace(code)) {
                do {
                    pos++;
                    value += String.fromCharCode(code);
                    code = text.charCodeAt(pos);
                } while (isWhitespace(code));
                return token = 15 /* Trivia */;
            }
            // trivia: newlines
            if (isLineBreak(code)) {
                pos++;
                value += String.fromCharCode(code);
                if (code === 13 /* carriageReturn */ && text.charCodeAt(pos) === 10 /* lineFeed */) {
                    pos++;
                    value += '\n';
                }
                return token = 14 /* LineBreakTrivia */;
            }
            switch (code) {
                // tokens: []{}:,
                case 123 /* openBrace */:
                    pos++;
                    return token = 1 /* OpenBraceToken */;
                case 125 /* closeBrace */:
                    pos++;
                    return token = 2 /* CloseBraceToken */;
                case 91 /* openBracket */:
                    pos++;
                    return token = 3 /* OpenBracketToken */;
                case 93 /* closeBracket */:
                    pos++;
                    return token = 4 /* CloseBracketToken */;
                case 58 /* colon */:
                    pos++;
                    return token = 6 /* ColonToken */;
                case 44 /* comma */:
                    pos++;
                    return token = 5 /* CommaToken */;
                // strings
                case 34 /* doubleQuote */:
                    pos++;
                    value = scanString();
                    return token = 10 /* StringLiteral */;
                // comments
                case 47 /* slash */:
                    const start = pos - 1;
                    // Single-line comment
                    if (text.charCodeAt(pos + 1) === 47 /* slash */) {
                        pos += 2;
                        while (pos < len) {
                            if (isLineBreak(text.charCodeAt(pos))) {
                                break;
                            }
                            pos++;
                        }
                        value = text.substring(start, pos);
                        return token = 12 /* LineCommentTrivia */;
                    }
                    // Multi-line comment
                    if (text.charCodeAt(pos + 1) === 42 /* asterisk */) {
                        pos += 2;
                        const safeLength = len - 1; // For lookahead.
                        let commentClosed = false;
                        while (pos < safeLength) {
                            const ch = text.charCodeAt(pos);
                            if (ch === 42 /* asterisk */ && text.charCodeAt(pos + 1) === 47 /* slash */) {
                                pos += 2;
                                commentClosed = true;
                                break;
                            }
                            pos++;
                        }
                        if (!commentClosed) {
                            pos++;
                            scanError = 1 /* UnexpectedEndOfComment */;
                        }
                        value = text.substring(start, pos);
                        return token = 13 /* BlockCommentTrivia */;
                    }
                    // just a single slash
                    value += String.fromCharCode(code);
                    pos++;
                    return token = 16 /* Unknown */;
                // numbers
                case 45 /* minus */:
                    value += String.fromCharCode(code);
                    pos++;
                    if (pos === len || !isDigit(text.charCodeAt(pos))) {
                        return token = 16 /* Unknown */;
                    }
                // found a minus, followed by a number so
                // we fall through to proceed with scanning
                // numbers
                case 48 /* _0 */:
                case 49 /* _1 */:
                case 50 /* _2 */:
                case 51 /* _3 */:
                case 52 /* _4 */:
                case 53 /* _5 */:
                case 54 /* _6 */:
                case 55 /* _7 */:
                case 56 /* _8 */:
                case 57 /* _9 */:
                    value += scanNumber();
                    return token = 11 /* NumericLiteral */;
                // literals and unknown symbols
                default:
                    // is a literal? Read the full word.
                    while (pos < len && isUnknownContentCharacter(code)) {
                        pos++;
                        code = text.charCodeAt(pos);
                    }
                    if (tokenOffset !== pos) {
                        value = text.substring(tokenOffset, pos);
                        // keywords: true, false, null
                        switch (value) {
                            case 'true': return token = 8 /* TrueKeyword */;
                            case 'false': return token = 9 /* FalseKeyword */;
                            case 'null': return token = 7 /* NullKeyword */;
                        }
                        return token = 16 /* Unknown */;
                    }
                    // some
                    value += String.fromCharCode(code);
                    pos++;
                    return token = 16 /* Unknown */;
            }
        }
        function isUnknownContentCharacter(code) {
            if (isWhitespace(code) || isLineBreak(code)) {
                return false;
            }
            switch (code) {
                case 125 /* closeBrace */:
                case 93 /* closeBracket */:
                case 123 /* openBrace */:
                case 91 /* openBracket */:
                case 34 /* doubleQuote */:
                case 58 /* colon */:
                case 44 /* comma */:
                case 47 /* slash */:
                    return false;
            }
            return true;
        }
        function scanNextNonTrivia() {
            let result;
            do {
                result = scanNext();
            } while (result >= 12 /* LineCommentTrivia */ && result <= 15 /* Trivia */);
            return result;
        }
        return {
            setPosition: setPosition,
            getPosition: () => pos,
            scan: ignoreTrivia ? scanNextNonTrivia : scanNext,
            getToken: () => token,
            getTokenValue: () => value,
            getTokenOffset: () => tokenOffset,
            getTokenLength: () => pos - tokenOffset,
            getTokenError: () => scanError
        };
    }
    exports.createScanner = createScanner;
    function isWhitespace(ch) {
        return ch === 32 /* space */ || ch === 9 /* tab */ || ch === 11 /* verticalTab */ || ch === 12 /* formFeed */ ||
            ch === 160 /* nonBreakingSpace */ || ch === 5760 /* ogham */ || ch >= 8192 /* enQuad */ && ch <= 8203 /* zeroWidthSpace */ ||
            ch === 8239 /* narrowNoBreakSpace */ || ch === 8287 /* mathematicalSpace */ || ch === 12288 /* ideographicSpace */ || ch === 65279 /* byteOrderMark */;
    }
    function isLineBreak(ch) {
        return ch === 10 /* lineFeed */ || ch === 13 /* carriageReturn */ || ch === 8232 /* lineSeparator */ || ch === 8233 /* paragraphSeparator */;
    }
    function isDigit(ch) {
        return ch >= 48 /* _0 */ && ch <= 57 /* _9 */;
    }
    var CharacterCodes;
    (function (CharacterCodes) {
        CharacterCodes[CharacterCodes["nullCharacter"] = 0] = "nullCharacter";
        CharacterCodes[CharacterCodes["maxAsciiCharacter"] = 127] = "maxAsciiCharacter";
        CharacterCodes[CharacterCodes["lineFeed"] = 10] = "lineFeed";
        CharacterCodes[CharacterCodes["carriageReturn"] = 13] = "carriageReturn";
        CharacterCodes[CharacterCodes["lineSeparator"] = 8232] = "lineSeparator";
        CharacterCodes[CharacterCodes["paragraphSeparator"] = 8233] = "paragraphSeparator";
        // REVIEW: do we need to support this?  The scanner doesn't, but our IText does.  This seems
        // like an odd disparity?  (Or maybe it's completely fine for them to be different).
        CharacterCodes[CharacterCodes["nextLine"] = 133] = "nextLine";
        // Unicode 3.0 space characters
        CharacterCodes[CharacterCodes["space"] = 32] = "space";
        CharacterCodes[CharacterCodes["nonBreakingSpace"] = 160] = "nonBreakingSpace";
        CharacterCodes[CharacterCodes["enQuad"] = 8192] = "enQuad";
        CharacterCodes[CharacterCodes["emQuad"] = 8193] = "emQuad";
        CharacterCodes[CharacterCodes["enSpace"] = 8194] = "enSpace";
        CharacterCodes[CharacterCodes["emSpace"] = 8195] = "emSpace";
        CharacterCodes[CharacterCodes["threePerEmSpace"] = 8196] = "threePerEmSpace";
        CharacterCodes[CharacterCodes["fourPerEmSpace"] = 8197] = "fourPerEmSpace";
        CharacterCodes[CharacterCodes["sixPerEmSpace"] = 8198] = "sixPerEmSpace";
        CharacterCodes[CharacterCodes["figureSpace"] = 8199] = "figureSpace";
        CharacterCodes[CharacterCodes["punctuationSpace"] = 8200] = "punctuationSpace";
        CharacterCodes[CharacterCodes["thinSpace"] = 8201] = "thinSpace";
        CharacterCodes[CharacterCodes["hairSpace"] = 8202] = "hairSpace";
        CharacterCodes[CharacterCodes["zeroWidthSpace"] = 8203] = "zeroWidthSpace";
        CharacterCodes[CharacterCodes["narrowNoBreakSpace"] = 8239] = "narrowNoBreakSpace";
        CharacterCodes[CharacterCodes["ideographicSpace"] = 12288] = "ideographicSpace";
        CharacterCodes[CharacterCodes["mathematicalSpace"] = 8287] = "mathematicalSpace";
        CharacterCodes[CharacterCodes["ogham"] = 5760] = "ogham";
        CharacterCodes[CharacterCodes["_"] = 95] = "_";
        CharacterCodes[CharacterCodes["$"] = 36] = "$";
        CharacterCodes[CharacterCodes["_0"] = 48] = "_0";
        CharacterCodes[CharacterCodes["_1"] = 49] = "_1";
        CharacterCodes[CharacterCodes["_2"] = 50] = "_2";
        CharacterCodes[CharacterCodes["_3"] = 51] = "_3";
        CharacterCodes[CharacterCodes["_4"] = 52] = "_4";
        CharacterCodes[CharacterCodes["_5"] = 53] = "_5";
        CharacterCodes[CharacterCodes["_6"] = 54] = "_6";
        CharacterCodes[CharacterCodes["_7"] = 55] = "_7";
        CharacterCodes[CharacterCodes["_8"] = 56] = "_8";
        CharacterCodes[CharacterCodes["_9"] = 57] = "_9";
        CharacterCodes[CharacterCodes["a"] = 97] = "a";
        CharacterCodes[CharacterCodes["b"] = 98] = "b";
        CharacterCodes[CharacterCodes["c"] = 99] = "c";
        CharacterCodes[CharacterCodes["d"] = 100] = "d";
        CharacterCodes[CharacterCodes["e"] = 101] = "e";
        CharacterCodes[CharacterCodes["f"] = 102] = "f";
        CharacterCodes[CharacterCodes["g"] = 103] = "g";
        CharacterCodes[CharacterCodes["h"] = 104] = "h";
        CharacterCodes[CharacterCodes["i"] = 105] = "i";
        CharacterCodes[CharacterCodes["j"] = 106] = "j";
        CharacterCodes[CharacterCodes["k"] = 107] = "k";
        CharacterCodes[CharacterCodes["l"] = 108] = "l";
        CharacterCodes[CharacterCodes["m"] = 109] = "m";
        CharacterCodes[CharacterCodes["n"] = 110] = "n";
        CharacterCodes[CharacterCodes["o"] = 111] = "o";
        CharacterCodes[CharacterCodes["p"] = 112] = "p";
        CharacterCodes[CharacterCodes["q"] = 113] = "q";
        CharacterCodes[CharacterCodes["r"] = 114] = "r";
        CharacterCodes[CharacterCodes["s"] = 115] = "s";
        CharacterCodes[CharacterCodes["t"] = 116] = "t";
        CharacterCodes[CharacterCodes["u"] = 117] = "u";
        CharacterCodes[CharacterCodes["v"] = 118] = "v";
        CharacterCodes[CharacterCodes["w"] = 119] = "w";
        CharacterCodes[CharacterCodes["x"] = 120] = "x";
        CharacterCodes[CharacterCodes["y"] = 121] = "y";
        CharacterCodes[CharacterCodes["z"] = 122] = "z";
        CharacterCodes[CharacterCodes["A"] = 65] = "A";
        CharacterCodes[CharacterCodes["B"] = 66] = "B";
        CharacterCodes[CharacterCodes["C"] = 67] = "C";
        CharacterCodes[CharacterCodes["D"] = 68] = "D";
        CharacterCodes[CharacterCodes["E"] = 69] = "E";
        CharacterCodes[CharacterCodes["F"] = 70] = "F";
        CharacterCodes[CharacterCodes["G"] = 71] = "G";
        CharacterCodes[CharacterCodes["H"] = 72] = "H";
        CharacterCodes[CharacterCodes["I"] = 73] = "I";
        CharacterCodes[CharacterCodes["J"] = 74] = "J";
        CharacterCodes[CharacterCodes["K"] = 75] = "K";
        CharacterCodes[CharacterCodes["L"] = 76] = "L";
        CharacterCodes[CharacterCodes["M"] = 77] = "M";
        CharacterCodes[CharacterCodes["N"] = 78] = "N";
        CharacterCodes[CharacterCodes["O"] = 79] = "O";
        CharacterCodes[CharacterCodes["P"] = 80] = "P";
        CharacterCodes[CharacterCodes["Q"] = 81] = "Q";
        CharacterCodes[CharacterCodes["R"] = 82] = "R";
        CharacterCodes[CharacterCodes["S"] = 83] = "S";
        CharacterCodes[CharacterCodes["T"] = 84] = "T";
        CharacterCodes[CharacterCodes["U"] = 85] = "U";
        CharacterCodes[CharacterCodes["V"] = 86] = "V";
        CharacterCodes[CharacterCodes["W"] = 87] = "W";
        CharacterCodes[CharacterCodes["X"] = 88] = "X";
        CharacterCodes[CharacterCodes["Y"] = 89] = "Y";
        CharacterCodes[CharacterCodes["Z"] = 90] = "Z";
        CharacterCodes[CharacterCodes["ampersand"] = 38] = "ampersand";
        CharacterCodes[CharacterCodes["asterisk"] = 42] = "asterisk";
        CharacterCodes[CharacterCodes["at"] = 64] = "at";
        CharacterCodes[CharacterCodes["backslash"] = 92] = "backslash";
        CharacterCodes[CharacterCodes["bar"] = 124] = "bar";
        CharacterCodes[CharacterCodes["caret"] = 94] = "caret";
        CharacterCodes[CharacterCodes["closeBrace"] = 125] = "closeBrace";
        CharacterCodes[CharacterCodes["closeBracket"] = 93] = "closeBracket";
        CharacterCodes[CharacterCodes["closeParen"] = 41] = "closeParen";
        CharacterCodes[CharacterCodes["colon"] = 58] = "colon";
        CharacterCodes[CharacterCodes["comma"] = 44] = "comma";
        CharacterCodes[CharacterCodes["dot"] = 46] = "dot";
        CharacterCodes[CharacterCodes["doubleQuote"] = 34] = "doubleQuote";
        CharacterCodes[CharacterCodes["equals"] = 61] = "equals";
        CharacterCodes[CharacterCodes["exclamation"] = 33] = "exclamation";
        CharacterCodes[CharacterCodes["greaterThan"] = 62] = "greaterThan";
        CharacterCodes[CharacterCodes["lessThan"] = 60] = "lessThan";
        CharacterCodes[CharacterCodes["minus"] = 45] = "minus";
        CharacterCodes[CharacterCodes["openBrace"] = 123] = "openBrace";
        CharacterCodes[CharacterCodes["openBracket"] = 91] = "openBracket";
        CharacterCodes[CharacterCodes["openParen"] = 40] = "openParen";
        CharacterCodes[CharacterCodes["percent"] = 37] = "percent";
        CharacterCodes[CharacterCodes["plus"] = 43] = "plus";
        CharacterCodes[CharacterCodes["question"] = 63] = "question";
        CharacterCodes[CharacterCodes["semicolon"] = 59] = "semicolon";
        CharacterCodes[CharacterCodes["singleQuote"] = 39] = "singleQuote";
        CharacterCodes[CharacterCodes["slash"] = 47] = "slash";
        CharacterCodes[CharacterCodes["tilde"] = 126] = "tilde";
        CharacterCodes[CharacterCodes["backspace"] = 8] = "backspace";
        CharacterCodes[CharacterCodes["formFeed"] = 12] = "formFeed";
        CharacterCodes[CharacterCodes["byteOrderMark"] = 65279] = "byteOrderMark";
        CharacterCodes[CharacterCodes["tab"] = 9] = "tab";
        CharacterCodes[CharacterCodes["verticalTab"] = 11] = "verticalTab";
    })(CharacterCodes || (CharacterCodes = {}));
    /**
     * For a given offset, evaluate the location in the JSON document. Each segment in the location path is either a property name or an array index.
     */
    function getLocation(text, position) {
        const segments = []; // strings or numbers
        const earlyReturnException = new Object();
        let previousNode = undefined;
        const previousNodeInst = {
            value: {},
            offset: 0,
            length: 0,
            type: 'object',
            parent: undefined
        };
        let isAtPropertyKey = false;
        function setPreviousNode(value, offset, length, type) {
            previousNodeInst.value = value;
            previousNodeInst.offset = offset;
            previousNodeInst.length = length;
            previousNodeInst.type = type;
            previousNodeInst.colonOffset = undefined;
            previousNode = previousNodeInst;
        }
        try {
            visit(text, {
                onObjectBegin: (offset, length) => {
                    if (position <= offset) {
                        throw earlyReturnException;
                    }
                    previousNode = undefined;
                    isAtPropertyKey = position > offset;
                    segments.push(''); // push a placeholder (will be replaced)
                },
                onObjectProperty: (name, offset, length) => {
                    if (position < offset) {
                        throw earlyReturnException;
                    }
                    setPreviousNode(name, offset, length, 'property');
                    segments[segments.length - 1] = name;
                    if (position <= offset + length) {
                        throw earlyReturnException;
                    }
                },
                onObjectEnd: (offset, length) => {
                    if (position <= offset) {
                        throw earlyReturnException;
                    }
                    previousNode = undefined;
                    segments.pop();
                },
                onArrayBegin: (offset, length) => {
                    if (position <= offset) {
                        throw earlyReturnException;
                    }
                    previousNode = undefined;
                    segments.push(0);
                },
                onArrayEnd: (offset, length) => {
                    if (position <= offset) {
                        throw earlyReturnException;
                    }
                    previousNode = undefined;
                    segments.pop();
                },
                onLiteralValue: (value, offset, length) => {
                    if (position < offset) {
                        throw earlyReturnException;
                    }
                    setPreviousNode(value, offset, length, getNodeType(value));
                    if (position <= offset + length) {
                        throw earlyReturnException;
                    }
                },
                onSeparator: (sep, offset, length) => {
                    if (position <= offset) {
                        throw earlyReturnException;
                    }
                    if (sep === ':' && previousNode && previousNode.type === 'property') {
                        previousNode.colonOffset = offset;
                        isAtPropertyKey = false;
                        previousNode = undefined;
                    }
                    else if (sep === ',') {
                        const last = segments[segments.length - 1];
                        if (typeof last === 'number') {
                            segments[segments.length - 1] = last + 1;
                        }
                        else {
                            isAtPropertyKey = true;
                            segments[segments.length - 1] = '';
                        }
                        previousNode = undefined;
                    }
                }
            });
        }
        catch (e) {
            if (e !== earlyReturnException) {
                throw e;
            }
        }
        return {
            path: segments,
            previousNode,
            isAtPropertyKey,
            matches: (pattern) => {
                let k = 0;
                for (let i = 0; k < pattern.length && i < segments.length; i++) {
                    if (pattern[k] === segments[i] || pattern[k] === '*') {
                        k++;
                    }
                    else if (pattern[k] !== '**') {
                        return false;
                    }
                }
                return k === pattern.length;
            }
        };
    }
    exports.getLocation = getLocation;
    /**
     * Parses the given text and returns the object the JSON content represents. On invalid input, the parser tries to be as fault tolerant as possible, but still return a result.
     * Therefore always check the errors list to find out if the input was valid.
     */
    function parse(text, errors = [], options = ParseOptions.DEFAULT) {
        let currentProperty = null;
        let currentParent = [];
        const previousParents = [];
        function onValue(value) {
            if (Array.isArray(currentParent)) {
                currentParent.push(value);
            }
            else if (currentProperty !== null) {
                currentParent[currentProperty] = value;
            }
        }
        const visitor = {
            onObjectBegin: () => {
                const object = {};
                onValue(object);
                previousParents.push(currentParent);
                currentParent = object;
                currentProperty = null;
            },
            onObjectProperty: (name) => {
                currentProperty = name;
            },
            onObjectEnd: () => {
                currentParent = previousParents.pop();
            },
            onArrayBegin: () => {
                const array = [];
                onValue(array);
                previousParents.push(currentParent);
                currentParent = array;
                currentProperty = null;
            },
            onArrayEnd: () => {
                currentParent = previousParents.pop();
            },
            onLiteralValue: onValue,
            onError: (error, offset, length) => {
                errors.push({ error, offset, length });
            }
        };
        visit(text, visitor, options);
        return currentParent[0];
    }
    exports.parse = parse;
    /**
     * Parses the given text and returns a tree representation the JSON content. On invalid input, the parser tries to be as fault tolerant as possible, but still return a result.
     */
    function parseTree(text, errors = [], options = ParseOptions.DEFAULT) {
        let currentParent = { type: 'array', offset: -1, length: -1, children: [], parent: undefined }; // artificial root
        function ensurePropertyComplete(endOffset) {
            if (currentParent.type === 'property') {
                currentParent.length = endOffset - currentParent.offset;
                currentParent = currentParent.parent;
            }
        }
        function onValue(valueNode) {
            currentParent.children.push(valueNode);
            return valueNode;
        }
        const visitor = {
            onObjectBegin: (offset) => {
                currentParent = onValue({ type: 'object', offset, length: -1, parent: currentParent, children: [] });
            },
            onObjectProperty: (name, offset, length) => {
                currentParent = onValue({ type: 'property', offset, length: -1, parent: currentParent, children: [] });
                currentParent.children.push({ type: 'string', value: name, offset, length, parent: currentParent });
            },
            onObjectEnd: (offset, length) => {
                currentParent.length = offset + length - currentParent.offset;
                currentParent = currentParent.parent;
                ensurePropertyComplete(offset + length);
            },
            onArrayBegin: (offset, length) => {
                currentParent = onValue({ type: 'array', offset, length: -1, parent: currentParent, children: [] });
            },
            onArrayEnd: (offset, length) => {
                currentParent.length = offset + length - currentParent.offset;
                currentParent = currentParent.parent;
                ensurePropertyComplete(offset + length);
            },
            onLiteralValue: (value, offset, length) => {
                onValue({ type: getNodeType(value), offset, length, parent: currentParent, value });
                ensurePropertyComplete(offset + length);
            },
            onSeparator: (sep, offset, length) => {
                if (currentParent.type === 'property') {
                    if (sep === ':') {
                        currentParent.colonOffset = offset;
                    }
                    else if (sep === ',') {
                        ensurePropertyComplete(offset);
                    }
                }
            },
            onError: (error, offset, length) => {
                errors.push({ error, offset, length });
            }
        };
        visit(text, visitor, options);
        const result = currentParent.children[0];
        if (result) {
            delete result.parent;
        }
        return result;
    }
    exports.parseTree = parseTree;
    /**
     * Finds the node at the given path in a JSON DOM.
     */
    function findNodeAtLocation(root, path) {
        if (!root) {
            return undefined;
        }
        let node = root;
        for (let segment of path) {
            if (typeof segment === 'string') {
                if (node.type !== 'object' || !Array.isArray(node.children)) {
                    return undefined;
                }
                let found = false;
                for (const propertyNode of node.children) {
                    if (Array.isArray(propertyNode.children) && propertyNode.children[0].value === segment) {
                        node = propertyNode.children[1];
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    return undefined;
                }
            }
            else {
                const index = segment;
                if (node.type !== 'array' || index < 0 || !Array.isArray(node.children) || index >= node.children.length) {
                    return undefined;
                }
                node = node.children[index];
            }
        }
        return node;
    }
    exports.findNodeAtLocation = findNodeAtLocation;
    /**
     * Gets the JSON path of the given JSON DOM node
     */
    function getNodePath(node) {
        if (!node.parent || !node.parent.children) {
            return [];
        }
        const path = getNodePath(node.parent);
        if (node.parent.type === 'property') {
            const key = node.parent.children[0].value;
            path.push(key);
        }
        else if (node.parent.type === 'array') {
            const index = node.parent.children.indexOf(node);
            if (index !== -1) {
                path.push(index);
            }
        }
        return path;
    }
    exports.getNodePath = getNodePath;
    /**
     * Evaluates the JavaScript object of the given JSON DOM node
     */
    function getNodeValue(node) {
        switch (node.type) {
            case 'array':
                return node.children.map(getNodeValue);
            case 'object':
                const obj = Object.create(null);
                for (let prop of node.children) {
                    const valueNode = prop.children[1];
                    if (valueNode) {
                        obj[prop.children[0].value] = getNodeValue(valueNode);
                    }
                }
                return obj;
            case 'null':
            case 'string':
            case 'number':
            case 'boolean':
                return node.value;
            default:
                return undefined;
        }
    }
    exports.getNodeValue = getNodeValue;
    function contains(node, offset, includeRightBound = false) {
        return (offset >= node.offset && offset < (node.offset + node.length)) || includeRightBound && (offset === (node.offset + node.length));
    }
    exports.contains = contains;
    /**
     * Finds the most inner node at the given offset. If includeRightBound is set, also finds nodes that end at the given offset.
     */
    function findNodeAtOffset(node, offset, includeRightBound = false) {
        if (contains(node, offset, includeRightBound)) {
            const children = node.children;
            if (Array.isArray(children)) {
                for (let i = 0; i < children.length && children[i].offset <= offset; i++) {
                    const item = findNodeAtOffset(children[i], offset, includeRightBound);
                    if (item) {
                        return item;
                    }
                }
            }
            return node;
        }
        return undefined;
    }
    exports.findNodeAtOffset = findNodeAtOffset;
    /**
     * Parses the given text and invokes the visitor functions for each object, array and literal reached.
     */
    function visit(text, visitor, options = ParseOptions.DEFAULT) {
        const _scanner = createScanner(text, false);
        function toNoArgVisit(visitFunction) {
            return visitFunction ? () => visitFunction(_scanner.getTokenOffset(), _scanner.getTokenLength()) : () => true;
        }
        function toOneArgVisit(visitFunction) {
            return visitFunction ? (arg) => visitFunction(arg, _scanner.getTokenOffset(), _scanner.getTokenLength()) : () => true;
        }
        const onObjectBegin = toNoArgVisit(visitor.onObjectBegin), onObjectProperty = toOneArgVisit(visitor.onObjectProperty), onObjectEnd = toNoArgVisit(visitor.onObjectEnd), onArrayBegin = toNoArgVisit(visitor.onArrayBegin), onArrayEnd = toNoArgVisit(visitor.onArrayEnd), onLiteralValue = toOneArgVisit(visitor.onLiteralValue), onSeparator = toOneArgVisit(visitor.onSeparator), onComment = toNoArgVisit(visitor.onComment), onError = toOneArgVisit(visitor.onError);
        const disallowComments = options && options.disallowComments;
        const allowTrailingComma = options && options.allowTrailingComma;
        function scanNext() {
            while (true) {
                const token = _scanner.scan();
                switch (_scanner.getTokenError()) {
                    case 4 /* InvalidUnicode */:
                        handleError(14 /* InvalidUnicode */);
                        break;
                    case 5 /* InvalidEscapeCharacter */:
                        handleError(15 /* InvalidEscapeCharacter */);
                        break;
                    case 3 /* UnexpectedEndOfNumber */:
                        handleError(13 /* UnexpectedEndOfNumber */);
                        break;
                    case 1 /* UnexpectedEndOfComment */:
                        if (!disallowComments) {
                            handleError(11 /* UnexpectedEndOfComment */);
                        }
                        break;
                    case 2 /* UnexpectedEndOfString */:
                        handleError(12 /* UnexpectedEndOfString */);
                        break;
                    case 6 /* InvalidCharacter */:
                        handleError(16 /* InvalidCharacter */);
                        break;
                }
                switch (token) {
                    case 12 /* LineCommentTrivia */:
                    case 13 /* BlockCommentTrivia */:
                        if (disallowComments) {
                            handleError(10 /* InvalidCommentToken */);
                        }
                        else {
                            onComment();
                        }
                        break;
                    case 16 /* Unknown */:
                        handleError(1 /* InvalidSymbol */);
                        break;
                    case 15 /* Trivia */:
                    case 14 /* LineBreakTrivia */:
                        break;
                    default:
                        return token;
                }
            }
        }
        function handleError(error, skipUntilAfter = [], skipUntil = []) {
            onError(error);
            if (skipUntilAfter.length + skipUntil.length > 0) {
                let token = _scanner.getToken();
                while (token !== 17 /* EOF */) {
                    if (skipUntilAfter.indexOf(token) !== -1) {
                        scanNext();
                        break;
                    }
                    else if (skipUntil.indexOf(token) !== -1) {
                        break;
                    }
                    token = scanNext();
                }
            }
        }
        function parseString(isValue) {
            const value = _scanner.getTokenValue();
            if (isValue) {
                onLiteralValue(value);
            }
            else {
                onObjectProperty(value);
            }
            scanNext();
            return true;
        }
        function parseLiteral() {
            switch (_scanner.getToken()) {
                case 11 /* NumericLiteral */:
                    let value = 0;
                    try {
                        value = JSON.parse(_scanner.getTokenValue());
                        if (typeof value !== 'number') {
                            handleError(2 /* InvalidNumberFormat */);
                            value = 0;
                        }
                    }
                    catch (e) {
                        handleError(2 /* InvalidNumberFormat */);
                    }
                    onLiteralValue(value);
                    break;
                case 7 /* NullKeyword */:
                    onLiteralValue(null);
                    break;
                case 8 /* TrueKeyword */:
                    onLiteralValue(true);
                    break;
                case 9 /* FalseKeyword */:
                    onLiteralValue(false);
                    break;
                default:
                    return false;
            }
            scanNext();
            return true;
        }
        function parseProperty() {
            if (_scanner.getToken() !== 10 /* StringLiteral */) {
                handleError(3 /* PropertyNameExpected */, [], [2 /* CloseBraceToken */, 5 /* CommaToken */]);
                return false;
            }
            parseString(false);
            if (_scanner.getToken() === 6 /* ColonToken */) {
                onSeparator(':');
                scanNext(); // consume colon
                if (!parseValue()) {
                    handleError(4 /* ValueExpected */, [], [2 /* CloseBraceToken */, 5 /* CommaToken */]);
                }
            }
            else {
                handleError(5 /* ColonExpected */, [], [2 /* CloseBraceToken */, 5 /* CommaToken */]);
            }
            return true;
        }
        function parseObject() {
            onObjectBegin();
            scanNext(); // consume open brace
            let needsComma = false;
            while (_scanner.getToken() !== 2 /* CloseBraceToken */ && _scanner.getToken() !== 17 /* EOF */) {
                if (_scanner.getToken() === 5 /* CommaToken */) {
                    if (!needsComma) {
                        handleError(4 /* ValueExpected */, [], []);
                    }
                    onSeparator(',');
                    scanNext(); // consume comma
                    if (_scanner.getToken() === 2 /* CloseBraceToken */ && allowTrailingComma) {
                        break;
                    }
                }
                else if (needsComma) {
                    handleError(6 /* CommaExpected */, [], []);
                }
                if (!parseProperty()) {
                    handleError(4 /* ValueExpected */, [], [2 /* CloseBraceToken */, 5 /* CommaToken */]);
                }
                needsComma = true;
            }
            onObjectEnd();
            if (_scanner.getToken() !== 2 /* CloseBraceToken */) {
                handleError(7 /* CloseBraceExpected */, [2 /* CloseBraceToken */], []);
            }
            else {
                scanNext(); // consume close brace
            }
            return true;
        }
        function parseArray() {
            onArrayBegin();
            scanNext(); // consume open bracket
            let needsComma = false;
            while (_scanner.getToken() !== 4 /* CloseBracketToken */ && _scanner.getToken() !== 17 /* EOF */) {
                if (_scanner.getToken() === 5 /* CommaToken */) {
                    if (!needsComma) {
                        handleError(4 /* ValueExpected */, [], []);
                    }
                    onSeparator(',');
                    scanNext(); // consume comma
                    if (_scanner.getToken() === 4 /* CloseBracketToken */ && allowTrailingComma) {
                        break;
                    }
                }
                else if (needsComma) {
                    handleError(6 /* CommaExpected */, [], []);
                }
                if (!parseValue()) {
                    handleError(4 /* ValueExpected */, [], [4 /* CloseBracketToken */, 5 /* CommaToken */]);
                }
                needsComma = true;
            }
            onArrayEnd();
            if (_scanner.getToken() !== 4 /* CloseBracketToken */) {
                handleError(8 /* CloseBracketExpected */, [4 /* CloseBracketToken */], []);
            }
            else {
                scanNext(); // consume close bracket
            }
            return true;
        }
        function parseValue() {
            switch (_scanner.getToken()) {
                case 3 /* OpenBracketToken */:
                    return parseArray();
                case 1 /* OpenBraceToken */:
                    return parseObject();
                case 10 /* StringLiteral */:
                    return parseString(true);
                default:
                    return parseLiteral();
            }
        }
        scanNext();
        if (_scanner.getToken() === 17 /* EOF */) {
            if (options.allowEmptyContent) {
                return true;
            }
            handleError(4 /* ValueExpected */, [], []);
            return false;
        }
        if (!parseValue()) {
            handleError(4 /* ValueExpected */, [], []);
            return false;
        }
        if (_scanner.getToken() !== 17 /* EOF */) {
            handleError(9 /* EndOfFileExpected */, [], []);
        }
        return true;
    }
    exports.visit = visit;
    /**
     * Takes JSON with JavaScript-style comments and remove
     * them. Optionally replaces every none-newline character
     * of comments with a replaceCharacter
     */
    function stripComments(text, replaceCh) {
        let _scanner = createScanner(text), parts = [], kind, offset = 0, pos;
        do {
            pos = _scanner.getPosition();
            kind = _scanner.scan();
            switch (kind) {
                case 12 /* LineCommentTrivia */:
                case 13 /* BlockCommentTrivia */:
                case 17 /* EOF */:
                    if (offset !== pos) {
                        parts.push(text.substring(offset, pos));
                    }
                    if (replaceCh !== undefined) {
                        parts.push(_scanner.getTokenValue().replace(/[^\r\n]/g, replaceCh));
                    }
                    offset = _scanner.getPosition();
                    break;
            }
        } while (kind !== 17 /* EOF */);
        return parts.join('');
    }
    exports.stripComments = stripComments;
    function getNodeType(value) {
        switch (typeof value) {
            case 'boolean': return 'boolean';
            case 'number': return 'number';
            case 'string': return 'string';
            case 'object': {
                if (!value) {
                    return 'null';
                }
                else if (Array.isArray(value)) {
                    return 'array';
                }
                return 'object';
            }
            default: return 'null';
        }
    }
    exports.getNodeType = getNodeType;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[30/*vs/base/common/stream*/], __M([0/*require*/,1/*exports*/,2/*vs/base/common/lifecycle*/]), function (require, exports, lifecycle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.transform = exports.toReadable = exports.toStream = exports.peekStream = exports.consumeStream = exports.peekReadable = exports.consumeReadable = exports.newWriteableStream = exports.isReadableBufferedStream = exports.isReadableStream = void 0;
    function isReadableStream(obj) {
        const candidate = obj;
        return candidate && [candidate.on, candidate.pause, candidate.resume, candidate.destroy].every(fn => typeof fn === 'function');
    }
    exports.isReadableStream = isReadableStream;
    function isReadableBufferedStream(obj) {
        const candidate = obj;
        return candidate && isReadableStream(candidate.stream) && Array.isArray(candidate.buffer) && typeof candidate.ended === 'boolean';
    }
    exports.isReadableBufferedStream = isReadableBufferedStream;
    function newWriteableStream(reducer, options) {
        return new WriteableStreamImpl(reducer, options);
    }
    exports.newWriteableStream = newWriteableStream;
    class WriteableStreamImpl {
        constructor(reducer, options) {
            this.reducer = reducer;
            this.options = options;
            this.state = {
                flowing: false,
                ended: false,
                destroyed: false
            };
            this.buffer = {
                data: [],
                error: []
            };
            this.listeners = {
                data: [],
                error: [],
                end: []
            };
            this.pendingWritePromises = [];
        }
        pause() {
            if (this.state.destroyed) {
                return;
            }
            this.state.flowing = false;
        }
        resume() {
            if (this.state.destroyed) {
                return;
            }
            if (!this.state.flowing) {
                this.state.flowing = true;
                // emit buffered events
                this.flowData();
                this.flowErrors();
                this.flowEnd();
            }
        }
        write(data) {
            var _a;
            if (this.state.destroyed) {
                return;
            }
            // flowing: directly send the data to listeners
            if (this.state.flowing) {
                this.listeners.data.forEach(listener => listener(data));
            }
            // not yet flowing: buffer data until flowing
            else {
                this.buffer.data.push(data);
                // highWaterMark: if configured, signal back when buffer reached limits
                if (typeof ((_a = this.options) === null || _a === void 0 ? void 0 : _a.highWaterMark) === 'number' && this.buffer.data.length > this.options.highWaterMark) {
                    return new Promise(resolve => this.pendingWritePromises.push(resolve));
                }
            }
        }
        error(error) {
            if (this.state.destroyed) {
                return;
            }
            // flowing: directly send the error to listeners
            if (this.state.flowing) {
                this.listeners.error.forEach(listener => listener(error));
            }
            // not yet flowing: buffer errors until flowing
            else {
                this.buffer.error.push(error);
            }
        }
        end(result) {
            if (this.state.destroyed) {
                return;
            }
            // end with data or error if provided
            if (result instanceof Error) {
                this.error(result);
            }
            else if (result) {
                this.write(result);
            }
            // flowing: send end event to listeners
            if (this.state.flowing) {
                this.listeners.end.forEach(listener => listener());
                this.destroy();
            }
            // not yet flowing: remember state
            else {
                this.state.ended = true;
            }
        }
        on(event, callback) {
            if (this.state.destroyed) {
                return;
            }
            switch (event) {
                case 'data':
                    this.listeners.data.push(callback);
                    // switch into flowing mode as soon as the first 'data'
                    // listener is added and we are not yet in flowing mode
                    this.resume();
                    break;
                case 'end':
                    this.listeners.end.push(callback);
                    // emit 'end' event directly if we are flowing
                    // and the end has already been reached
                    //
                    // finish() when it went through
                    if (this.state.flowing && this.flowEnd()) {
                        this.destroy();
                    }
                    break;
                case 'error':
                    this.listeners.error.push(callback);
                    // emit buffered 'error' events unless done already
                    // now that we know that we have at least one listener
                    if (this.state.flowing) {
                        this.flowErrors();
                    }
                    break;
            }
        }
        removeListener(event, callback) {
            if (this.state.destroyed) {
                return;
            }
            let listeners = undefined;
            switch (event) {
                case 'data':
                    listeners = this.listeners.data;
                    break;
                case 'end':
                    listeners = this.listeners.end;
                    break;
                case 'error':
                    listeners = this.listeners.error;
                    break;
            }
            if (listeners) {
                const index = listeners.indexOf(callback);
                if (index >= 0) {
                    listeners.splice(index, 1);
                }
            }
        }
        flowData() {
            if (this.buffer.data.length > 0) {
                const fullDataBuffer = this.reducer(this.buffer.data);
                this.listeners.data.forEach(listener => listener(fullDataBuffer));
                this.buffer.data.length = 0;
                // When the buffer is empty, resolve all pending writers
                const pendingWritePromises = [...this.pendingWritePromises];
                this.pendingWritePromises.length = 0;
                pendingWritePromises.forEach(pendingWritePromise => pendingWritePromise());
            }
        }
        flowErrors() {
            if (this.listeners.error.length > 0) {
                for (const error of this.buffer.error) {
                    this.listeners.error.forEach(listener => listener(error));
                }
                this.buffer.error.length = 0;
            }
        }
        flowEnd() {
            if (this.state.ended) {
                this.listeners.end.forEach(listener => listener());
                return this.listeners.end.length > 0;
            }
            return false;
        }
        destroy() {
            if (!this.state.destroyed) {
                this.state.destroyed = true;
                this.state.ended = true;
                this.buffer.data.length = 0;
                this.buffer.error.length = 0;
                this.listeners.data.length = 0;
                this.listeners.error.length = 0;
                this.listeners.end.length = 0;
                this.pendingWritePromises.length = 0;
            }
        }
    }
    /**
     * Helper to fully read a T readable into a T.
     */
    function consumeReadable(readable, reducer) {
        const chunks = [];
        let chunk;
        while ((chunk = readable.read()) !== null) {
            chunks.push(chunk);
        }
        return reducer(chunks);
    }
    exports.consumeReadable = consumeReadable;
    /**
     * Helper to read a T readable up to a maximum of chunks. If the limit is
     * reached, will return a readable instead to ensure all data can still
     * be read.
     */
    function peekReadable(readable, reducer, maxChunks) {
        const chunks = [];
        let chunk = undefined;
        while ((chunk = readable.read()) !== null && chunks.length < maxChunks) {
            chunks.push(chunk);
        }
        // If the last chunk is null, it means we reached the end of
        // the readable and return all the data at once
        if (chunk === null && chunks.length > 0) {
            return reducer(chunks);
        }
        // Otherwise, we still have a chunk, it means we reached the maxChunks
        // value and as such we return a new Readable that first returns
        // the existing read chunks and then continues with reading from
        // the underlying readable.
        return {
            read: () => {
                // First consume chunks from our array
                if (chunks.length > 0) {
                    return chunks.shift();
                }
                // Then ensure to return our last read chunk
                if (typeof chunk !== 'undefined') {
                    const lastReadChunk = chunk;
                    // explicitly use undefined here to indicate that we consumed
                    // the chunk, which could have either been null or valued.
                    chunk = undefined;
                    return lastReadChunk;
                }
                // Finally delegate back to the Readable
                return readable.read();
            }
        };
    }
    exports.peekReadable = peekReadable;
    /**
     * Helper to fully read a T stream into a T.
     */
    function consumeStream(stream, reducer) {
        return new Promise((resolve, reject) => {
            const chunks = [];
            stream.on('data', data => chunks.push(data));
            stream.on('error', error => reject(error));
            stream.on('end', () => resolve(reducer(chunks)));
        });
    }
    exports.consumeStream = consumeStream;
    /**
     * Helper to peek up to `maxChunks` into a stream. The return type signals if
     * the stream has ended or not. If not, caller needs to add a `data` listener
     * to continue reading.
     */
    function peekStream(stream, maxChunks) {
        return new Promise((resolve, reject) => {
            const streamListeners = new lifecycle_1.DisposableStore();
            // Data Listener
            const buffer = [];
            const dataListener = (chunk) => {
                // Add to buffer
                buffer.push(chunk);
                // We reached maxChunks and thus need to return
                if (buffer.length > maxChunks) {
                    // Dispose any listeners and ensure to pause the
                    // stream so that it can be consumed again by caller
                    streamListeners.dispose();
                    stream.pause();
                    return resolve({ stream, buffer, ended: false });
                }
            };
            streamListeners.add(lifecycle_1.toDisposable(() => stream.removeListener('data', dataListener)));
            stream.on('data', dataListener);
            // Error Listener
            const errorListener = (error) => {
                return reject(error);
            };
            streamListeners.add(lifecycle_1.toDisposable(() => stream.removeListener('error', errorListener)));
            stream.on('error', errorListener);
            const endListener = () => {
                return resolve({ stream, buffer, ended: true });
            };
            streamListeners.add(lifecycle_1.toDisposable(() => stream.removeListener('end', endListener)));
            stream.on('end', endListener);
        });
    }
    exports.peekStream = peekStream;
    /**
     * Helper to create a readable stream from an existing T.
     */
    function toStream(t, reducer) {
        const stream = newWriteableStream(reducer);
        stream.end(t);
        return stream;
    }
    exports.toStream = toStream;
    /**
     * Helper to convert a T into a Readable<T>.
     */
    function toReadable(t) {
        let consumed = false;
        return {
            read: () => {
                if (consumed) {
                    return null;
                }
                consumed = true;
                return t;
            }
        };
    }
    exports.toReadable = toReadable;
    /**
     * Helper to transform a readable stream into another stream.
     */
    function transform(stream, transformer, reducer) {
        const target = newWriteableStream(reducer);
        stream.on('data', data => target.write(transformer.data(data)));
        stream.on('end', () => target.end());
        stream.on('error', error => target.error(transformer.error ? transformer.error(error) : error));
        return target;
    }
    exports.transform = transform;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[15/*vs/base/common/buffer*/], __M([0/*require*/,1/*exports*/,16/*vs/base/common/strings*/,30/*vs/base/common/stream*/]), function (require, exports, strings, streams) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.newWriteableBufferStream = exports.streamToBufferReadableStream = exports.bufferToStream = exports.bufferedStreamToBuffer = exports.streamToBuffer = exports.bufferToReadable = exports.readableToBuffer = exports.writeUInt8 = exports.readUInt8 = exports.writeUInt32LE = exports.readUInt32LE = exports.writeUInt32BE = exports.readUInt32BE = exports.writeUInt16LE = exports.readUInt16LE = exports.VSBuffer = void 0;
    const hasBuffer = (typeof Buffer !== 'undefined');
    const hasTextEncoder = (typeof TextEncoder !== 'undefined');
    const hasTextDecoder = (typeof TextDecoder !== 'undefined');
    let textEncoder;
    let textDecoder;
    class VSBuffer {
        constructor(buffer) {
            this.buffer = buffer;
            this.byteLength = this.buffer.byteLength;
        }
        static alloc(byteLength) {
            if (hasBuffer) {
                return new VSBuffer(Buffer.allocUnsafe(byteLength));
            }
            else {
                return new VSBuffer(new Uint8Array(byteLength));
            }
        }
        static wrap(actual) {
            if (hasBuffer && !(Buffer.isBuffer(actual))) {
                // https://nodejs.org/dist/latest-v10.x/docs/api/buffer.html#buffer_class_method_buffer_from_arraybuffer_byteoffset_length
                // Create a zero-copy Buffer wrapper around the ArrayBuffer pointed to by the Uint8Array
                actual = Buffer.from(actual.buffer, actual.byteOffset, actual.byteLength);
            }
            return new VSBuffer(actual);
        }
        static fromString(source) {
            if (hasBuffer) {
                return new VSBuffer(Buffer.from(source));
            }
            else if (hasTextEncoder) {
                if (!textEncoder) {
                    textEncoder = new TextEncoder();
                }
                return new VSBuffer(textEncoder.encode(source));
            }
            else {
                return new VSBuffer(strings.encodeUTF8(source));
            }
        }
        static concat(buffers, totalLength) {
            if (typeof totalLength === 'undefined') {
                totalLength = 0;
                for (let i = 0, len = buffers.length; i < len; i++) {
                    totalLength += buffers[i].byteLength;
                }
            }
            const ret = VSBuffer.alloc(totalLength);
            let offset = 0;
            for (let i = 0, len = buffers.length; i < len; i++) {
                const element = buffers[i];
                ret.set(element, offset);
                offset += element.byteLength;
            }
            return ret;
        }
        toString() {
            if (hasBuffer) {
                return this.buffer.toString();
            }
            else if (hasTextDecoder) {
                if (!textDecoder) {
                    textDecoder = new TextDecoder();
                }
                return textDecoder.decode(this.buffer);
            }
            else {
                return strings.decodeUTF8(this.buffer);
            }
        }
        slice(start, end) {
            // IMPORTANT: use subarray instead of slice because TypedArray#slice
            // creates shallow copy and NodeBuffer#slice doesn't. The use of subarray
            // ensures the same, performant, behaviour.
            return new VSBuffer(this.buffer.subarray(start /*bad lib.d.ts*/, end));
        }
        set(array, offset) {
            if (array instanceof VSBuffer) {
                this.buffer.set(array.buffer, offset);
            }
            else {
                this.buffer.set(array, offset);
            }
        }
        readUInt32BE(offset) {
            return readUInt32BE(this.buffer, offset);
        }
        writeUInt32BE(value, offset) {
            writeUInt32BE(this.buffer, value, offset);
        }
        readUInt32LE(offset) {
            return readUInt32LE(this.buffer, offset);
        }
        writeUInt32LE(value, offset) {
            writeUInt32LE(this.buffer, value, offset);
        }
        readUInt8(offset) {
            return readUInt8(this.buffer, offset);
        }
        writeUInt8(value, offset) {
            writeUInt8(this.buffer, value, offset);
        }
    }
    exports.VSBuffer = VSBuffer;
    function readUInt16LE(source, offset) {
        return (((source[offset + 0] << 0) >>> 0) |
            ((source[offset + 1] << 8) >>> 0));
    }
    exports.readUInt16LE = readUInt16LE;
    function writeUInt16LE(destination, value, offset) {
        destination[offset + 0] = (value & 0b11111111);
        value = value >>> 8;
        destination[offset + 1] = (value & 0b11111111);
    }
    exports.writeUInt16LE = writeUInt16LE;
    function readUInt32BE(source, offset) {
        return (source[offset] * 2 ** 24
            + source[offset + 1] * 2 ** 16
            + source[offset + 2] * 2 ** 8
            + source[offset + 3]);
    }
    exports.readUInt32BE = readUInt32BE;
    function writeUInt32BE(destination, value, offset) {
        destination[offset + 3] = value;
        value = value >>> 8;
        destination[offset + 2] = value;
        value = value >>> 8;
        destination[offset + 1] = value;
        value = value >>> 8;
        destination[offset] = value;
    }
    exports.writeUInt32BE = writeUInt32BE;
    function readUInt32LE(source, offset) {
        return (((source[offset + 0] << 0) >>> 0) |
            ((source[offset + 1] << 8) >>> 0) |
            ((source[offset + 2] << 16) >>> 0) |
            ((source[offset + 3] << 24) >>> 0));
    }
    exports.readUInt32LE = readUInt32LE;
    function writeUInt32LE(destination, value, offset) {
        destination[offset + 0] = (value & 0b11111111);
        value = value >>> 8;
        destination[offset + 1] = (value & 0b11111111);
        value = value >>> 8;
        destination[offset + 2] = (value & 0b11111111);
        value = value >>> 8;
        destination[offset + 3] = (value & 0b11111111);
    }
    exports.writeUInt32LE = writeUInt32LE;
    function readUInt8(source, offset) {
        return source[offset];
    }
    exports.readUInt8 = readUInt8;
    function writeUInt8(destination, value, offset) {
        destination[offset] = value;
    }
    exports.writeUInt8 = writeUInt8;
    function readableToBuffer(readable) {
        return streams.consumeReadable(readable, chunks => VSBuffer.concat(chunks));
    }
    exports.readableToBuffer = readableToBuffer;
    function bufferToReadable(buffer) {
        return streams.toReadable(buffer);
    }
    exports.bufferToReadable = bufferToReadable;
    function streamToBuffer(stream) {
        return streams.consumeStream(stream, chunks => VSBuffer.concat(chunks));
    }
    exports.streamToBuffer = streamToBuffer;
    async function bufferedStreamToBuffer(bufferedStream) {
        if (bufferedStream.ended) {
            return VSBuffer.concat(bufferedStream.buffer);
        }
        return VSBuffer.concat([
            // Include already read chunks...
            ...bufferedStream.buffer,
            // ...and all additional chunks
            await streamToBuffer(bufferedStream.stream)
        ]);
    }
    exports.bufferedStreamToBuffer = bufferedStreamToBuffer;
    function bufferToStream(buffer) {
        return streams.toStream(buffer, chunks => VSBuffer.concat(chunks));
    }
    exports.bufferToStream = bufferToStream;
    function streamToBufferReadableStream(stream) {
        return streams.transform(stream, { data: data => typeof data === 'string' ? VSBuffer.fromString(data) : VSBuffer.wrap(data) }, chunks => VSBuffer.concat(chunks));
    }
    exports.streamToBufferReadableStream = streamToBufferReadableStream;
    function newWriteableBufferStream(options) {
        return streams.newWriteableStream(chunks => VSBuffer.concat(chunks), options);
    }
    exports.newWriteableBufferStream = newWriteableBufferStream;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[17/*vs/base/common/objects*/], __M([0/*require*/,1/*exports*/,8/*vs/base/common/types*/]), function (require, exports, types_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.distinct = exports.getOrDefault = exports.safeStringify = exports.equals = exports.mixin = exports.cloneAndChange = exports.deepFreeze = exports.deepClone = void 0;
    function deepClone(obj) {
        if (!obj || typeof obj !== 'object') {
            return obj;
        }
        if (obj instanceof RegExp) {
            // See https://github.com/microsoft/TypeScript/issues/10990
            return obj;
        }
        const result = Array.isArray(obj) ? [] : {};
        Object.keys(obj).forEach((key) => {
            if (obj[key] && typeof obj[key] === 'object') {
                result[key] = deepClone(obj[key]);
            }
            else {
                result[key] = obj[key];
            }
        });
        return result;
    }
    exports.deepClone = deepClone;
    function deepFreeze(obj) {
        if (!obj || typeof obj !== 'object') {
            return obj;
        }
        const stack = [obj];
        while (stack.length > 0) {
            const obj = stack.shift();
            Object.freeze(obj);
            for (const key in obj) {
                if (_hasOwnProperty.call(obj, key)) {
                    const prop = obj[key];
                    if (typeof prop === 'object' && !Object.isFrozen(prop)) {
                        stack.push(prop);
                    }
                }
            }
        }
        return obj;
    }
    exports.deepFreeze = deepFreeze;
    const _hasOwnProperty = Object.prototype.hasOwnProperty;
    function cloneAndChange(obj, changer) {
        return _cloneAndChange(obj, changer, new Set());
    }
    exports.cloneAndChange = cloneAndChange;
    function _cloneAndChange(obj, changer, seen) {
        if (types_1.isUndefinedOrNull(obj)) {
            return obj;
        }
        const changed = changer(obj);
        if (typeof changed !== 'undefined') {
            return changed;
        }
        if (types_1.isArray(obj)) {
            const r1 = [];
            for (const e of obj) {
                r1.push(_cloneAndChange(e, changer, seen));
            }
            return r1;
        }
        if (types_1.isObject(obj)) {
            if (seen.has(obj)) {
                throw new Error('Cannot clone recursive data-structure');
            }
            seen.add(obj);
            const r2 = {};
            for (let i2 in obj) {
                if (_hasOwnProperty.call(obj, i2)) {
                    r2[i2] = _cloneAndChange(obj[i2], changer, seen);
                }
            }
            seen.delete(obj);
            return r2;
        }
        return obj;
    }
    /**
     * Copies all properties of source into destination. The optional parameter "overwrite" allows to control
     * if existing properties on the destination should be overwritten or not. Defaults to true (overwrite).
     */
    function mixin(destination, source, overwrite = true) {
        if (!types_1.isObject(destination)) {
            return source;
        }
        if (types_1.isObject(source)) {
            Object.keys(source).forEach(key => {
                if (key in destination) {
                    if (overwrite) {
                        if (types_1.isObject(destination[key]) && types_1.isObject(source[key])) {
                            mixin(destination[key], source[key], overwrite);
                        }
                        else {
                            destination[key] = source[key];
                        }
                    }
                }
                else {
                    destination[key] = source[key];
                }
            });
        }
        return destination;
    }
    exports.mixin = mixin;
    function equals(one, other) {
        if (one === other) {
            return true;
        }
        if (one === null || one === undefined || other === null || other === undefined) {
            return false;
        }
        if (typeof one !== typeof other) {
            return false;
        }
        if (typeof one !== 'object') {
            return false;
        }
        if ((Array.isArray(one)) !== (Array.isArray(other))) {
            return false;
        }
        let i;
        let key;
        if (Array.isArray(one)) {
            if (one.length !== other.length) {
                return false;
            }
            for (i = 0; i < one.length; i++) {
                if (!equals(one[i], other[i])) {
                    return false;
                }
            }
        }
        else {
            const oneKeys = [];
            for (key in one) {
                oneKeys.push(key);
            }
            oneKeys.sort();
            const otherKeys = [];
            for (key in other) {
                otherKeys.push(key);
            }
            otherKeys.sort();
            if (!equals(oneKeys, otherKeys)) {
                return false;
            }
            for (i = 0; i < oneKeys.length; i++) {
                if (!equals(one[oneKeys[i]], other[oneKeys[i]])) {
                    return false;
                }
            }
        }
        return true;
    }
    exports.equals = equals;
    /**
     * Calls `JSON.Stringify` with a replacer to break apart any circular references.
     * This prevents `JSON`.stringify` from throwing the exception
     *  "Uncaught TypeError: Converting circular structure to JSON"
     */
    function safeStringify(obj) {
        const seen = new Set();
        return JSON.stringify(obj, (key, value) => {
            if (types_1.isObject(value) || Array.isArray(value)) {
                if (seen.has(value)) {
                    return '[Circular]';
                }
                else {
                    seen.add(value);
                }
            }
            return value;
        });
    }
    exports.safeStringify = safeStringify;
    function getOrDefault(obj, fn, defaultValue) {
        const result = fn(obj);
        return typeof result === 'undefined' ? defaultValue : result;
    }
    exports.getOrDefault = getOrDefault;
    /**
     * Returns an object that has keys for each value that is different in the base object. Keys
     * that do not exist in the target but in the base object are not considered.
     *
     * Note: This is not a deep-diffing method, so the values are strictly taken into the resulting
     * object if they differ.
     *
     * @param base the object to diff against
     * @param obj the object to use for diffing
     */
    function distinct(base, target) {
        const result = Object.create(null);
        if (!base || !target) {
            return result;
        }
        const targetKeys = Object.keys(target);
        targetKeys.forEach(k => {
            const baseValue = base[k];
            const targetValue = target[k];
            if (!equals(baseValue, targetValue)) {
                result[k] = targetValue;
            }
        });
        return result;
    }
    exports.distinct = distinct;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[56/*vs/base/common/console*/], __M([0/*require*/,1/*exports*/,13/*vs/base/common/uri*/]), function (require, exports, uri_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.log = exports.getFirstFrame = exports.parse = exports.isRemoteConsoleLog = void 0;
    function isRemoteConsoleLog(obj) {
        const entry = obj;
        return entry && typeof entry.type === 'string' && typeof entry.severity === 'string';
    }
    exports.isRemoteConsoleLog = isRemoteConsoleLog;
    function parse(entry) {
        const args = [];
        let stack;
        // Parse Entry
        try {
            const parsedArguments = JSON.parse(entry.arguments);
            // Check for special stack entry as last entry
            const stackArgument = parsedArguments[parsedArguments.length - 1];
            if (stackArgument && stackArgument.__$stack) {
                parsedArguments.pop(); // stack is handled specially
                stack = stackArgument.__$stack;
            }
            args.push(...parsedArguments);
        }
        catch (error) {
            args.push('Unable to log remote console arguments', entry.arguments);
        }
        return { args, stack };
    }
    exports.parse = parse;
    function getFirstFrame(arg0) {
        if (typeof arg0 !== 'string') {
            return getFirstFrame(parse(arg0).stack);
        }
        // Parse a source information out of the stack if we have one. Format can be:
        // at vscode.commands.registerCommand (/Users/someone/Desktop/test-ts/out/src/extension.js:18:17)
        // or
        // at /Users/someone/Desktop/test-ts/out/src/extension.js:18:17
        // or
        // at c:\Users\someone\Desktop\end-js\extension.js:19:17
        // or
        // at e.$executeContributedCommand(c:\Users\someone\Desktop\end-js\extension.js:19:17)
        const stack = arg0;
        if (stack) {
            const topFrame = findFirstFrame(stack);
            // at [^\/]* => line starts with "at" followed by any character except '/' (to not capture unix paths too late)
            // (?:(?:[a-zA-Z]+:)|(?:[\/])|(?:\\\\) => windows drive letter OR unix root OR unc root
            // (?:.+) => simple pattern for the path, only works because of the line/col pattern after
            // :(?:\d+):(?:\d+) => :line:column data
            const matches = /at [^\/]*((?:(?:[a-zA-Z]+:)|(?:[\/])|(?:\\\\))(?:.+)):(\d+):(\d+)/.exec(topFrame || '');
            if (matches && matches.length === 4) {
                return {
                    uri: uri_1.URI.file(matches[1]),
                    line: Number(matches[2]),
                    column: Number(matches[3])
                };
            }
        }
        return undefined;
    }
    exports.getFirstFrame = getFirstFrame;
    function findFirstFrame(stack) {
        if (!stack) {
            return stack;
        }
        const newlineIndex = stack.indexOf('\n');
        if (newlineIndex === -1) {
            return stack;
        }
        return stack.substring(0, newlineIndex);
    }
    function log(entry, label) {
        const { args, stack } = parse(entry);
        const isOneStringArg = typeof args[0] === 'string' && args.length === 1;
        let topFrame = findFirstFrame(stack);
        if (topFrame) {
            topFrame = `(${topFrame.trim()})`;
        }
        let consoleArgs = [];
        // First arg is a string
        if (typeof args[0] === 'string') {
            if (topFrame && isOneStringArg) {
                consoleArgs = [`%c[${label}] %c${args[0]} %c${topFrame}`, color('blue'), color(''), color('grey')];
            }
            else {
                consoleArgs = [`%c[${label}] %c${args[0]}`, color('blue'), color(''), ...args.slice(1)];
            }
        }
        // First arg is something else, just apply all
        else {
            consoleArgs = [`%c[${label}]%`, color('blue'), ...args];
        }
        // Stack: add to args unless already aded
        if (topFrame && !isOneStringArg) {
            consoleArgs.push(topFrame);
        }
        // Log it
        if (typeof console[entry.severity] !== 'function') {
            throw new Error('Unknown console method');
        }
        console[entry.severity].apply(console, consoleArgs);
    }
    exports.log = log;
    function color(color) {
        return `color: ${color}`;
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[57/*vs/base/common/marshalling*/], __M([0/*require*/,1/*exports*/,15/*vs/base/common/buffer*/,16/*vs/base/common/strings*/,13/*vs/base/common/uri*/]), function (require, exports, buffer_1, strings_1, uri_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.revive = exports.parse = exports.stringify = void 0;
    function stringify(obj) {
        return JSON.stringify(obj, replacer);
    }
    exports.stringify = stringify;
    function parse(text) {
        let data = JSON.parse(text);
        data = revive(data);
        return data;
    }
    exports.parse = parse;
    function replacer(key, value) {
        // URI is done via toJSON-member
        if (value instanceof RegExp) {
            return {
                $mid: 2,
                source: value.source,
                flags: strings_1.regExpFlags(value),
            };
        }
        return value;
    }
    function revive(obj, depth = 0) {
        if (!obj || depth > 200) {
            return obj;
        }
        if (typeof obj === 'object') {
            switch (obj.$mid) {
                case 1: return uri_1.URI.revive(obj);
                case 2: return new RegExp(obj.source, obj.flags);
            }
            if (obj instanceof buffer_1.VSBuffer
                || obj instanceof Uint8Array) {
                return obj;
            }
            if (Array.isArray(obj)) {
                for (let i = 0; i < obj.length; ++i) {
                    obj[i] = revive(obj[i], depth + 1);
                }
            }
            else {
                // walk object
                for (const key in obj) {
                    if (Object.hasOwnProperty.call(obj, key)) {
                        obj[key] = revive(obj[key], depth + 1);
                    }
                }
            }
        }
        return obj;
    }
    exports.revive = revive;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[39/*vs/base/common/labels*/], __M([0/*require*/,1/*exports*/,13/*vs/base/common/uri*/,3/*vs/base/common/path*/,16/*vs/base/common/strings*/,9/*vs/base/common/network*/,14/*vs/base/common/platform*/,21/*vs/base/common/resources*/]), function (require, exports, uri_1, path_1, strings_1, network_1, platform_1, resources_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.splitName = exports.unmnemonicLabel = exports.mnemonicButtonLabel = exports.mnemonicMenuLabel = exports.template = exports.shorten = exports.untildify = exports.tildify = exports.normalizeDriveLetter = exports.getBaseLabel = exports.getPathLabel = void 0;
    /**
     * @deprecated use LabelService instead
     */
    function getPathLabel(resource, userHomeProvider, rootProvider) {
        if (typeof resource === 'string') {
            resource = uri_1.URI.file(resource);
        }
        // return early if we can resolve a relative path label from the root
        if (rootProvider) {
            const baseResource = rootProvider.getWorkspaceFolder(resource);
            if (baseResource) {
                const hasMultipleRoots = rootProvider.getWorkspace().folders.length > 1;
                let pathLabel;
                if (resources_1.isEqual(baseResource.uri, resource)) {
                    pathLabel = ''; // no label if paths are identical
                }
                else {
                    pathLabel = resources_1.relativePath(baseResource.uri, resource);
                }
                if (hasMultipleRoots) {
                    const rootName = baseResource.name ? baseResource.name : resources_1.basename(baseResource.uri);
                    pathLabel = pathLabel ? (rootName + ' • ' + pathLabel) : rootName; // always show root basename if there are multiple
                }
                return pathLabel;
            }
        }
        // return if the resource is neither file:// nor untitled:// and no baseResource was provided
        if (resource.scheme !== network_1.Schemas.file && resource.scheme !== network_1.Schemas.untitled) {
            return resource.with({ query: null, fragment: null }).toString(true);
        }
        // convert c:\something => C:\something
        if (hasDriveLetter(resource.fsPath)) {
            return path_1.normalize(normalizeDriveLetter(resource.fsPath));
        }
        // normalize and tildify (macOS, Linux only)
        let res = path_1.normalize(resource.fsPath);
        if (!platform_1.isWindows && (userHomeProvider === null || userHomeProvider === void 0 ? void 0 : userHomeProvider.userHome)) {
            res = tildify(res, userHomeProvider.userHome.fsPath);
        }
        return res;
    }
    exports.getPathLabel = getPathLabel;
    function getBaseLabel(resource) {
        if (!resource) {
            return undefined;
        }
        if (typeof resource === 'string') {
            resource = uri_1.URI.file(resource);
        }
        const base = resources_1.basename(resource) || (resource.scheme === network_1.Schemas.file ? resource.fsPath : resource.path) /* can be empty string if '/' is passed in */;
        // convert c: => C:
        if (hasDriveLetter(base)) {
            return normalizeDriveLetter(base);
        }
        return base;
    }
    exports.getBaseLabel = getBaseLabel;
    function hasDriveLetter(path) {
        return !!(platform_1.isWindows && path && path[1] === ':');
    }
    function normalizeDriveLetter(path) {
        if (hasDriveLetter(path)) {
            return path.charAt(0).toUpperCase() + path.slice(1);
        }
        return path;
    }
    exports.normalizeDriveLetter = normalizeDriveLetter;
    let normalizedUserHomeCached = Object.create(null);
    function tildify(path, userHome) {
        if (platform_1.isWindows || !path || !userHome) {
            return path; // unsupported
        }
        // Keep a normalized user home path as cache to prevent accumulated string creation
        let normalizedUserHome = normalizedUserHomeCached.original === userHome ? normalizedUserHomeCached.normalized : undefined;
        if (!normalizedUserHome) {
            normalizedUserHome = `${strings_1.rtrim(userHome, path_1.posix.sep)}${path_1.posix.sep}`;
            normalizedUserHomeCached = { original: userHome, normalized: normalizedUserHome };
        }
        // Linux: case sensitive, macOS: case insensitive
        if (platform_1.isLinux ? path.startsWith(normalizedUserHome) : strings_1.startsWithIgnoreCase(path, normalizedUserHome)) {
            path = `~/${path.substr(normalizedUserHome.length)}`;
        }
        return path;
    }
    exports.tildify = tildify;
    function untildify(path, userHome) {
        return path.replace(/^~($|\/|\\)/, `${userHome}$1`);
    }
    exports.untildify = untildify;
    /**
     * Shortens the paths but keeps them easy to distinguish.
     * Replaces not important parts with ellipsis.
     * Every shorten path matches only one original path and vice versa.
     *
     * Algorithm for shortening paths is as follows:
     * 1. For every path in list, find unique substring of that path.
     * 2. Unique substring along with ellipsis is shortened path of that path.
     * 3. To find unique substring of path, consider every segment of length from 1 to path.length of path from end of string
     *    and if present segment is not substring to any other paths then present segment is unique path,
     *    else check if it is not present as suffix of any other path and present segment is suffix of path itself,
     *    if it is true take present segment as unique path.
     * 4. Apply ellipsis to unique segment according to whether segment is present at start/in-between/end of path.
     *
     * Example 1
     * 1. consider 2 paths i.e. ['a\\b\\c\\d', 'a\\f\\b\\c\\d']
     * 2. find unique path of first path,
     * 	a. 'd' is present in path2 and is suffix of path2, hence not unique of present path.
     * 	b. 'c' is present in path2 and 'c' is not suffix of present path, similarly for 'b' and 'a' also.
     * 	c. 'd\\c' is suffix of path2.
     *  d. 'b\\c' is not suffix of present path.
     *  e. 'a\\b' is not present in path2, hence unique path is 'a\\b...'.
     * 3. for path2, 'f' is not present in path1 hence unique is '...\\f\\...'.
     *
     * Example 2
     * 1. consider 2 paths i.e. ['a\\b', 'a\\b\\c'].
     * 	a. Even if 'b' is present in path2, as 'b' is suffix of path1 and is not suffix of path2, unique path will be '...\\b'.
     * 2. for path2, 'c' is not present in path1 hence unique path is '..\\c'.
     */
    const ellipsis = '\u2026';
    const unc = '\\\\';
    const home = '~';
    function shorten(paths, pathSeparator = path_1.sep) {
        const shortenedPaths = new Array(paths.length);
        // for every path
        let match = false;
        for (let pathIndex = 0; pathIndex < paths.length; pathIndex++) {
            let path = paths[pathIndex];
            if (path === '') {
                shortenedPaths[pathIndex] = `.${pathSeparator}`;
                continue;
            }
            if (!path) {
                shortenedPaths[pathIndex] = path;
                continue;
            }
            match = true;
            // trim for now and concatenate unc path (e.g. \\network) or root path (/etc, ~/etc) later
            let prefix = '';
            if (path.indexOf(unc) === 0) {
                prefix = path.substr(0, path.indexOf(unc) + unc.length);
                path = path.substr(path.indexOf(unc) + unc.length);
            }
            else if (path.indexOf(pathSeparator) === 0) {
                prefix = path.substr(0, path.indexOf(pathSeparator) + pathSeparator.length);
                path = path.substr(path.indexOf(pathSeparator) + pathSeparator.length);
            }
            else if (path.indexOf(home) === 0) {
                prefix = path.substr(0, path.indexOf(home) + home.length);
                path = path.substr(path.indexOf(home) + home.length);
            }
            // pick the first shortest subpath found
            const segments = path.split(pathSeparator);
            for (let subpathLength = 1; match && subpathLength <= segments.length; subpathLength++) {
                for (let start = segments.length - subpathLength; match && start >= 0; start--) {
                    match = false;
                    let subpath = segments.slice(start, start + subpathLength).join(pathSeparator);
                    // that is unique to any other path
                    for (let otherPathIndex = 0; !match && otherPathIndex < paths.length; otherPathIndex++) {
                        // suffix subpath treated specially as we consider no match 'x' and 'x/...'
                        if (otherPathIndex !== pathIndex && paths[otherPathIndex] && paths[otherPathIndex].indexOf(subpath) > -1) {
                            const isSubpathEnding = (start + subpathLength === segments.length);
                            // Adding separator as prefix for subpath, such that 'endsWith(src, trgt)' considers subpath as directory name instead of plain string.
                            // prefix is not added when either subpath is root directory or path[otherPathIndex] does not have multiple directories.
                            const subpathWithSep = (start > 0 && paths[otherPathIndex].indexOf(pathSeparator) > -1) ? pathSeparator + subpath : subpath;
                            const isOtherPathEnding = paths[otherPathIndex].endsWith(subpathWithSep);
                            match = !isSubpathEnding || isOtherPathEnding;
                        }
                    }
                    // found unique subpath
                    if (!match) {
                        let result = '';
                        // preserve disk drive or root prefix
                        if (segments[0].endsWith(':') || prefix !== '') {
                            if (start === 1) {
                                // extend subpath to include disk drive prefix
                                start = 0;
                                subpathLength++;
                                subpath = segments[0] + pathSeparator + subpath;
                            }
                            if (start > 0) {
                                result = segments[0] + pathSeparator;
                            }
                            result = prefix + result;
                        }
                        // add ellipsis at the beginning if neeeded
                        if (start > 0) {
                            result = result + ellipsis + pathSeparator;
                        }
                        result = result + subpath;
                        // add ellipsis at the end if needed
                        if (start + subpathLength < segments.length) {
                            result = result + pathSeparator + ellipsis;
                        }
                        shortenedPaths[pathIndex] = result;
                    }
                }
            }
            if (match) {
                shortenedPaths[pathIndex] = path; // use full path if no unique subpaths found
            }
        }
        return shortenedPaths;
    }
    exports.shorten = shorten;
    var Type;
    (function (Type) {
        Type[Type["TEXT"] = 0] = "TEXT";
        Type[Type["VARIABLE"] = 1] = "VARIABLE";
        Type[Type["SEPARATOR"] = 2] = "SEPARATOR";
    })(Type || (Type = {}));
    /**
     * Helper to insert values for specific template variables into the string. E.g. "this $(is) a $(template)" can be
     * passed to this function together with an object that maps "is" and "template" to strings to have them replaced.
     * @param value string to which templating is applied
     * @param values the values of the templates to use
     */
    function template(template, values = Object.create(null)) {
        const segments = [];
        let inVariable = false;
        let curVal = '';
        for (const char of template) {
            // Beginning of variable
            if (char === '$' || (inVariable && char === '{')) {
                if (curVal) {
                    segments.push({ value: curVal, type: Type.TEXT });
                }
                curVal = '';
                inVariable = true;
            }
            // End of variable
            else if (char === '}' && inVariable) {
                const resolved = values[curVal];
                // Variable
                if (typeof resolved === 'string') {
                    if (resolved.length) {
                        segments.push({ value: resolved, type: Type.VARIABLE });
                    }
                }
                // Separator
                else if (resolved) {
                    const prevSegment = segments[segments.length - 1];
                    if (!prevSegment || prevSegment.type !== Type.SEPARATOR) {
                        segments.push({ value: resolved.label, type: Type.SEPARATOR }); // prevent duplicate separators
                    }
                }
                curVal = '';
                inVariable = false;
            }
            // Text or Variable Name
            else {
                curVal += char;
            }
        }
        // Tail
        if (curVal && !inVariable) {
            segments.push({ value: curVal, type: Type.TEXT });
        }
        return segments.filter((segment, index) => {
            // Only keep separator if we have values to the left and right
            if (segment.type === Type.SEPARATOR) {
                const left = segments[index - 1];
                const right = segments[index + 1];
                return [left, right].every(segment => segment && (segment.type === Type.VARIABLE || segment.type === Type.TEXT) && segment.value.length > 0);
            }
            // accept any TEXT and VARIABLE
            return true;
        }).map(segment => segment.value).join('');
    }
    exports.template = template;
    /**
     * Handles mnemonics for menu items. Depending on OS:
     * - Windows: Supported via & character (replace && with &)
     * -   Linux: Supported via & character (replace && with &)
     * -   macOS: Unsupported (replace && with empty string)
     */
    function mnemonicMenuLabel(label, forceDisableMnemonics) {
        if (platform_1.isMacintosh || forceDisableMnemonics) {
            return label.replace(/\(&&\w\)|&&/g, '').replace(/&/g, platform_1.isMacintosh ? '&' : '&&');
        }
        return label.replace(/&&|&/g, m => m === '&' ? '&&' : '&');
    }
    exports.mnemonicMenuLabel = mnemonicMenuLabel;
    /**
     * Handles mnemonics for buttons. Depending on OS:
     * - Windows: Supported via & character (replace && with & and & with && for escaping)
     * -   Linux: Supported via _ character (replace && with _)
     * -   macOS: Unsupported (replace && with empty string)
     */
    function mnemonicButtonLabel(label, forceDisableMnemonics) {
        if (platform_1.isMacintosh || forceDisableMnemonics) {
            return label.replace(/\(&&\w\)|&&/g, '');
        }
        if (platform_1.isWindows) {
            return label.replace(/&&|&/g, m => m === '&' ? '&&' : '&');
        }
        return label.replace(/&&/g, '_');
    }
    exports.mnemonicButtonLabel = mnemonicButtonLabel;
    function unmnemonicLabel(label) {
        return label.replace(/&/g, '&&');
    }
    exports.unmnemonicLabel = unmnemonicLabel;
    /**
     * Splits a path in name and parent path, supporting both '/' and '\'
     */
    function splitName(fullPath) {
        const p = fullPath.indexOf('/') !== -1 ? path_1.posix : path_1.win32;
        const name = p.basename(fullPath);
        const parentPath = p.dirname(fullPath);
        if (name.length) {
            return { name, parentPath };
        }
        // only the root segment
        return { name: parentPath, parentPath: '' };
    }
    exports.splitName = splitName;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[40/*vs/base/node/decoder*/], __M([0/*require*/,1/*exports*/,117/*string_decoder*/]), function (require, exports, sd) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LineDecoder = void 0;
    /**
     * Convenient way to iterate over output line by line. This helper accommodates for the fact that
     * a buffer might not end with new lines all the way.
     *
     * To use:
     * - call the write method
     * - forEach() over the result to get the lines
     */
    class LineDecoder {
        constructor(encoding = 'utf8') {
            this.stringDecoder = new sd.StringDecoder(encoding);
            this.remaining = null;
        }
        write(buffer) {
            const result = [];
            const value = this.remaining
                ? this.remaining + this.stringDecoder.write(buffer)
                : this.stringDecoder.write(buffer);
            if (value.length < 1) {
                return result;
            }
            let start = 0;
            let ch;
            let idx = start;
            while (idx < value.length) {
                ch = value.charCodeAt(idx);
                if (ch === 13 /* CarriageReturn */ || ch === 10 /* LineFeed */) {
                    result.push(value.substring(start, idx));
                    idx++;
                    if (idx < value.length) {
                        const lastChar = ch;
                        ch = value.charCodeAt(idx);
                        if ((lastChar === 13 /* CarriageReturn */ && ch === 10 /* LineFeed */) || (lastChar === 10 /* LineFeed */ && ch === 13 /* CarriageReturn */)) {
                            idx++;
                        }
                    }
                    start = idx;
                }
                else {
                    idx++;
                }
            }
            this.remaining = start < value.length ? value.substr(start) : null;
            return result;
        }
        end() {
            return this.remaining;
        }
    }
    exports.LineDecoder = LineDecoder;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[58/*vs/base/node/paths*/], __M([0/*require*/,1/*exports*/,9/*vs/base/common/network*/]), function (require, exports, network_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getDefaultUserDataPath = exports.getAppDataPath = void 0;
    const pathsPath = network_1.FileAccess.asFileUri('paths', require).fsPath;
    const paths = require.__$__nodeRequire(pathsPath);
    exports.getAppDataPath = paths.getAppDataPath;
    exports.getDefaultUserDataPath = paths.getDefaultUserDataPath;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[59/*vs/base/node/extpath*/], __M([0/*require*/,1/*exports*/,23/*fs*/,16/*vs/base/common/strings*/,3/*vs/base/common/path*/,10/*vs/base/node/pfs*/,41/*util*/]), function (require, exports, fs, strings_1, path_1, pfs_1, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.realpathSync = exports.realpath = exports.realcaseSync = void 0;
    /**
     * Copied from: https://github.com/microsoft/vscode-node-debug/blob/master/src/node/pathUtilities.ts#L83
     *
     * Given an absolute, normalized, and existing file path 'realcase' returns the exact path that the file has on disk.
     * On a case insensitive file system, the returned path might differ from the original path by character casing.
     * On a case sensitive file system, the returned path will always be identical to the original path.
     * In case of errors, null is returned. But you cannot use this function to verify that a path exists.
     * realcaseSync does not handle '..' or '.' path segments and it does not take the locale into account.
     */
    function realcaseSync(path) {
        const dir = path_1.dirname(path);
        if (path === dir) { // end recursion
            return path;
        }
        const name = (path_1.basename(path) /* can be '' for windows drive letters */ || path).toLowerCase();
        try {
            const entries = pfs_1.readdirSync(dir);
            const found = entries.filter(e => e.toLowerCase() === name); // use a case insensitive search
            if (found.length === 1) {
                // on a case sensitive filesystem we cannot determine here, whether the file exists or not, hence we need the 'file exists' precondition
                const prefix = realcaseSync(dir); // recurse
                if (prefix) {
                    return path_1.join(prefix, found[0]);
                }
            }
            else if (found.length > 1) {
                // must be a case sensitive $filesystem
                const ix = found.indexOf(name);
                if (ix >= 0) { // case sensitive
                    const prefix = realcaseSync(dir); // recurse
                    if (prefix) {
                        return path_1.join(prefix, found[ix]);
                    }
                }
            }
        }
        catch (error) {
            // silently ignore error
        }
        return null;
    }
    exports.realcaseSync = realcaseSync;
    async function realpath(path) {
        try {
            return await util_1.promisify(fs.realpath)(path);
        }
        catch (error) {
            // We hit an error calling fs.realpath(). Since fs.realpath() is doing some path normalization
            // we now do a similar normalization and then try again if we can access the path with read
            // permissions at least. If that succeeds, we return that path.
            // fs.realpath() is resolving symlinks and that can fail in certain cases. The workaround is
            // to not resolve links but to simply see if the path is read accessible or not.
            const normalizedPath = normalizePath(path);
            await util_1.promisify(fs.access)(normalizedPath, fs.constants.R_OK);
            return normalizedPath;
        }
    }
    exports.realpath = realpath;
    function realpathSync(path) {
        try {
            return fs.realpathSync(path);
        }
        catch (error) {
            // We hit an error calling fs.realpathSync(). Since fs.realpathSync() is doing some path normalization
            // we now do a similar normalization and then try again if we can access the path with read
            // permissions at least. If that succeeds, we return that path.
            // fs.realpath() is resolving symlinks and that can fail in certain cases. The workaround is
            // to not resolve links but to simply see if the path is read accessible or not.
            const normalizedPath = normalizePath(path);
            fs.accessSync(normalizedPath, fs.constants.R_OK); // throws in case of an error
            return normalizedPath;
        }
    }
    exports.realpathSync = realpathSync;
    function normalizePath(path) {
        return strings_1.rtrim(path_1.normalize(path), path_1.sep);
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[60/*vs/base/node/watcher*/], __M([0/*require*/,1/*exports*/,3/*vs/base/common/path*/,23/*fs*/,14/*vs/base/common/platform*/,118/*vs/base/common/normalization*/,2/*vs/base/common/lifecycle*/,10/*vs/base/node/pfs*/]), function (require, exports, path_1, fs_1, platform_1, normalization_1, lifecycle_1, pfs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CHANGE_BUFFER_DELAY = exports.watchFolder = exports.watchFile = void 0;
    function watchFile(path, onChange, onError) {
        return doWatchNonRecursive({ path, isDirectory: false }, onChange, onError);
    }
    exports.watchFile = watchFile;
    function watchFolder(path, onChange, onError) {
        return doWatchNonRecursive({ path, isDirectory: true }, onChange, onError);
    }
    exports.watchFolder = watchFolder;
    exports.CHANGE_BUFFER_DELAY = 100;
    function doWatchNonRecursive(file, onChange, onError) {
        const originalFileName = path_1.basename(file.path);
        const mapPathToStatDisposable = new Map();
        let disposed = false;
        let watcherDisposables = [lifecycle_1.toDisposable(() => {
                mapPathToStatDisposable.forEach(disposable => lifecycle_1.dispose(disposable));
                mapPathToStatDisposable.clear();
            })];
        try {
            // Creating watcher can fail with an exception
            const watcher = fs_1.watch(file.path);
            watcherDisposables.push(lifecycle_1.toDisposable(() => {
                watcher.removeAllListeners();
                watcher.close();
            }));
            // Folder: resolve children to emit proper events
            const folderChildren = new Set();
            if (file.isDirectory) {
                pfs_1.readdir(file.path).then(children => children.forEach(child => folderChildren.add(child)));
            }
            watcher.on('error', (code, signal) => {
                if (!disposed) {
                    onError(`Failed to watch ${file.path} for changes using fs.watch() (${code}, ${signal})`);
                }
            });
            watcher.on('change', (type, raw) => {
                if (disposed) {
                    return; // ignore if already disposed
                }
                // Normalize file name
                let changedFileName = '';
                if (raw) { // https://github.com/microsoft/vscode/issues/38191
                    changedFileName = raw.toString();
                    if (platform_1.isMacintosh) {
                        // Mac: uses NFD unicode form on disk, but we want NFC
                        // See also https://github.com/nodejs/node/issues/2165
                        changedFileName = normalization_1.normalizeNFC(changedFileName);
                    }
                }
                if (!changedFileName || (type !== 'change' && type !== 'rename')) {
                    return; // ignore unexpected events
                }
                // File path: use path directly for files and join with changed file name otherwise
                const changedFilePath = file.isDirectory ? path_1.join(file.path, changedFileName) : file.path;
                // File
                if (!file.isDirectory) {
                    if (type === 'rename' || changedFileName !== originalFileName) {
                        // The file was either deleted or renamed. Many tools apply changes to files in an
                        // atomic way ("Atomic Save") by first renaming the file to a temporary name and then
                        // renaming it back to the original name. Our watcher will detect this as a rename
                        // and then stops to work on Mac and Linux because the watcher is applied to the
                        // inode and not the name. The fix is to detect this case and trying to watch the file
                        // again after a certain delay.
                        // In addition, we send out a delete event if after a timeout we detect that the file
                        // does indeed not exist anymore.
                        const timeoutHandle = setTimeout(async () => {
                            const fileExists = await pfs_1.exists(changedFilePath);
                            if (disposed) {
                                return; // ignore if disposed by now
                            }
                            // File still exists, so emit as change event and reapply the watcher
                            if (fileExists) {
                                onChange('changed', changedFilePath);
                                watcherDisposables = [doWatchNonRecursive(file, onChange, onError)];
                            }
                            // File seems to be really gone, so emit a deleted event
                            else {
                                onChange('deleted', changedFilePath);
                            }
                        }, exports.CHANGE_BUFFER_DELAY);
                        // Very important to dispose the watcher which now points to a stale inode
                        // and wire in a new disposable that tracks our timeout that is installed
                        lifecycle_1.dispose(watcherDisposables);
                        watcherDisposables = [lifecycle_1.toDisposable(() => clearTimeout(timeoutHandle))];
                    }
                    else {
                        onChange('changed', changedFilePath);
                    }
                }
                // Folder
                else {
                    // Children add/delete
                    if (type === 'rename') {
                        // Cancel any previous stats for this file path if existing
                        const statDisposable = mapPathToStatDisposable.get(changedFilePath);
                        if (statDisposable) {
                            lifecycle_1.dispose(statDisposable);
                        }
                        // Wait a bit and try see if the file still exists on disk to decide on the resulting event
                        const timeoutHandle = setTimeout(async () => {
                            mapPathToStatDisposable.delete(changedFilePath);
                            const fileExists = await pfs_1.exists(changedFilePath);
                            if (disposed) {
                                return; // ignore if disposed by now
                            }
                            // Figure out the correct event type:
                            // File Exists: either 'added' or 'changed' if known before
                            // File Does not Exist: always 'deleted'
                            let type;
                            if (fileExists) {
                                if (folderChildren.has(changedFileName)) {
                                    type = 'changed';
                                }
                                else {
                                    type = 'added';
                                    folderChildren.add(changedFileName);
                                }
                            }
                            else {
                                folderChildren.delete(changedFileName);
                                type = 'deleted';
                            }
                            onChange(type, changedFilePath);
                        }, exports.CHANGE_BUFFER_DELAY);
                        mapPathToStatDisposable.set(changedFilePath, lifecycle_1.toDisposable(() => clearTimeout(timeoutHandle)));
                    }
                    // Other events
                    else {
                        // Figure out the correct event type: if this is the
                        // first time we see this child, it can only be added
                        let type;
                        if (folderChildren.has(changedFileName)) {
                            type = 'changed';
                        }
                        else {
                            type = 'added';
                            folderChildren.add(changedFileName);
                        }
                        onChange(type, changedFilePath);
                    }
                }
            });
        }
        catch (error) {
            pfs_1.exists(file.path).then(exists => {
                if (exists && !disposed) {
                    onError(`Failed to watch ${file.path} for changes using fs.watch() (${error.toString()})`);
                }
            });
        }
        return lifecycle_1.toDisposable(() => {
            disposed = true;
            watcherDisposables = lifecycle_1.dispose(watcherDisposables);
        });
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[31/*vs/base/parts/ipc/common/ipc*/], __M([0/*require*/,1/*exports*/,11/*vs/base/common/event*/,2/*vs/base/common/lifecycle*/,12/*vs/base/common/async*/,28/*vs/base/common/cancellation*/,20/*vs/base/common/errors*/,15/*vs/base/common/buffer*/,18/*vs/base/common/arrays*/,8/*vs/base/common/types*/,57/*vs/base/common/marshalling*/,16/*vs/base/common/strings*/]), function (require, exports, event_1, lifecycle_1, async_1, cancellation_1, errors, buffer_1, arrays_1, types_1, marshalling_1, strings) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IPCLogger = exports.logWithColors = exports.createChannelSender = exports.createChannelReceiver = exports.StaticRouter = exports.getNextTickChannel = exports.getDelayedChannel = exports.IPCClient = exports.IPCServer = exports.ChannelClient = exports.RequestInitiator = exports.ChannelServer = exports.ResponseType = exports.RequestType = void 0;
    var RequestType;
    (function (RequestType) {
        RequestType[RequestType["Promise"] = 100] = "Promise";
        RequestType[RequestType["PromiseCancel"] = 101] = "PromiseCancel";
        RequestType[RequestType["EventListen"] = 102] = "EventListen";
        RequestType[RequestType["EventDispose"] = 103] = "EventDispose";
    })(RequestType = exports.RequestType || (exports.RequestType = {}));
    function requestTypeToStr(type) {
        switch (type) {
            case 100 /* Promise */:
                return 'req';
            case 101 /* PromiseCancel */:
                return 'cancel';
            case 102 /* EventListen */:
                return 'subscribe';
            case 103 /* EventDispose */:
                return 'unsubscribe';
        }
    }
    var ResponseType;
    (function (ResponseType) {
        ResponseType[ResponseType["Initialize"] = 200] = "Initialize";
        ResponseType[ResponseType["PromiseSuccess"] = 201] = "PromiseSuccess";
        ResponseType[ResponseType["PromiseError"] = 202] = "PromiseError";
        ResponseType[ResponseType["PromiseErrorObj"] = 203] = "PromiseErrorObj";
        ResponseType[ResponseType["EventFire"] = 204] = "EventFire";
    })(ResponseType = exports.ResponseType || (exports.ResponseType = {}));
    function responseTypeToStr(type) {
        switch (type) {
            case 200 /* Initialize */:
                return `init`;
            case 201 /* PromiseSuccess */:
                return `reply:`;
            case 202 /* PromiseError */:
            case 203 /* PromiseErrorObj */:
                return `replyErr:`;
            case 204 /* EventFire */:
                return `event:`;
        }
    }
    var State;
    (function (State) {
        State[State["Uninitialized"] = 0] = "Uninitialized";
        State[State["Idle"] = 1] = "Idle";
    })(State || (State = {}));
    class BufferReader {
        constructor(buffer) {
            this.buffer = buffer;
            this.pos = 0;
        }
        read(bytes) {
            const result = this.buffer.slice(this.pos, this.pos + bytes);
            this.pos += result.byteLength;
            return result;
        }
    }
    class BufferWriter {
        constructor() {
            this.buffers = [];
        }
        get buffer() {
            return buffer_1.VSBuffer.concat(this.buffers);
        }
        write(buffer) {
            this.buffers.push(buffer);
        }
    }
    var DataType;
    (function (DataType) {
        DataType[DataType["Undefined"] = 0] = "Undefined";
        DataType[DataType["String"] = 1] = "String";
        DataType[DataType["Buffer"] = 2] = "Buffer";
        DataType[DataType["VSBuffer"] = 3] = "VSBuffer";
        DataType[DataType["Array"] = 4] = "Array";
        DataType[DataType["Object"] = 5] = "Object";
    })(DataType || (DataType = {}));
    function createSizeBuffer(size) {
        const result = buffer_1.VSBuffer.alloc(4);
        result.writeUInt32BE(size, 0);
        return result;
    }
    function readSizeBuffer(reader) {
        return reader.read(4).readUInt32BE(0);
    }
    function createOneByteBuffer(value) {
        const result = buffer_1.VSBuffer.alloc(1);
        result.writeUInt8(value, 0);
        return result;
    }
    const BufferPresets = {
        Undefined: createOneByteBuffer(DataType.Undefined),
        String: createOneByteBuffer(DataType.String),
        Buffer: createOneByteBuffer(DataType.Buffer),
        VSBuffer: createOneByteBuffer(DataType.VSBuffer),
        Array: createOneByteBuffer(DataType.Array),
        Object: createOneByteBuffer(DataType.Object),
    };
    const hasBuffer = (typeof Buffer !== 'undefined');
    function serialize(writer, data) {
        if (typeof data === 'undefined') {
            writer.write(BufferPresets.Undefined);
        }
        else if (typeof data === 'string') {
            const buffer = buffer_1.VSBuffer.fromString(data);
            writer.write(BufferPresets.String);
            writer.write(createSizeBuffer(buffer.byteLength));
            writer.write(buffer);
        }
        else if (hasBuffer && Buffer.isBuffer(data)) {
            const buffer = buffer_1.VSBuffer.wrap(data);
            writer.write(BufferPresets.Buffer);
            writer.write(createSizeBuffer(buffer.byteLength));
            writer.write(buffer);
        }
        else if (data instanceof buffer_1.VSBuffer) {
            writer.write(BufferPresets.VSBuffer);
            writer.write(createSizeBuffer(data.byteLength));
            writer.write(data);
        }
        else if (Array.isArray(data)) {
            writer.write(BufferPresets.Array);
            writer.write(createSizeBuffer(data.length));
            for (const el of data) {
                serialize(writer, el);
            }
        }
        else {
            const buffer = buffer_1.VSBuffer.fromString(JSON.stringify(data));
            writer.write(BufferPresets.Object);
            writer.write(createSizeBuffer(buffer.byteLength));
            writer.write(buffer);
        }
    }
    function deserialize(reader) {
        const type = reader.read(1).readUInt8(0);
        switch (type) {
            case DataType.Undefined: return undefined;
            case DataType.String: return reader.read(readSizeBuffer(reader)).toString();
            case DataType.Buffer: return reader.read(readSizeBuffer(reader)).buffer;
            case DataType.VSBuffer: return reader.read(readSizeBuffer(reader));
            case DataType.Array: {
                const length = readSizeBuffer(reader);
                const result = [];
                for (let i = 0; i < length; i++) {
                    result.push(deserialize(reader));
                }
                return result;
            }
            case DataType.Object: return JSON.parse(reader.read(readSizeBuffer(reader)).toString());
        }
    }
    class ChannelServer {
        constructor(protocol, ctx, logger = null, timeoutDelay = 1000) {
            this.protocol = protocol;
            this.ctx = ctx;
            this.logger = logger;
            this.timeoutDelay = timeoutDelay;
            this.channels = new Map();
            this.activeRequests = new Map();
            // Requests might come in for channels which are not yet registered.
            // They will timeout after `timeoutDelay`.
            this.pendingRequests = new Map();
            this.protocolListener = this.protocol.onMessage(msg => this.onRawMessage(msg));
            this.sendResponse({ type: 200 /* Initialize */ });
        }
        registerChannel(channelName, channel) {
            this.channels.set(channelName, channel);
            // https://github.com/microsoft/vscode/issues/72531
            setTimeout(() => this.flushPendingRequests(channelName), 0);
        }
        sendResponse(response) {
            switch (response.type) {
                case 200 /* Initialize */: {
                    const msgLength = this.send([response.type]);
                    if (this.logger) {
                        this.logger.logOutgoing(msgLength, 0, 1 /* OtherSide */, responseTypeToStr(response.type));
                    }
                    return;
                }
                case 201 /* PromiseSuccess */:
                case 202 /* PromiseError */:
                case 204 /* EventFire */:
                case 203 /* PromiseErrorObj */: {
                    const msgLength = this.send([response.type, response.id], response.data);
                    if (this.logger) {
                        this.logger.logOutgoing(msgLength, response.id, 1 /* OtherSide */, responseTypeToStr(response.type), response.data);
                    }
                    return;
                }
            }
        }
        send(header, body = undefined) {
            const writer = new BufferWriter();
            serialize(writer, header);
            serialize(writer, body);
            return this.sendBuffer(writer.buffer);
        }
        sendBuffer(message) {
            try {
                this.protocol.send(message);
                return message.byteLength;
            }
            catch (err) {
                // noop
                return 0;
            }
        }
        onRawMessage(message) {
            const reader = new BufferReader(message);
            const header = deserialize(reader);
            const body = deserialize(reader);
            const type = header[0];
            switch (type) {
                case 100 /* Promise */:
                    if (this.logger) {
                        this.logger.logIncoming(message.byteLength, header[1], 1 /* OtherSide */, `${requestTypeToStr(type)}: ${header[2]}.${header[3]}`, body);
                    }
                    return this.onPromise({ type, id: header[1], channelName: header[2], name: header[3], arg: body });
                case 102 /* EventListen */:
                    if (this.logger) {
                        this.logger.logIncoming(message.byteLength, header[1], 1 /* OtherSide */, `${requestTypeToStr(type)}: ${header[2]}.${header[3]}`, body);
                    }
                    return this.onEventListen({ type, id: header[1], channelName: header[2], name: header[3], arg: body });
                case 101 /* PromiseCancel */:
                    if (this.logger) {
                        this.logger.logIncoming(message.byteLength, header[1], 1 /* OtherSide */, `${requestTypeToStr(type)}`);
                    }
                    return this.disposeActiveRequest({ type, id: header[1] });
                case 103 /* EventDispose */:
                    if (this.logger) {
                        this.logger.logIncoming(message.byteLength, header[1], 1 /* OtherSide */, `${requestTypeToStr(type)}`);
                    }
                    return this.disposeActiveRequest({ type, id: header[1] });
            }
        }
        onPromise(request) {
            const channel = this.channels.get(request.channelName);
            if (!channel) {
                this.collectPendingRequest(request);
                return;
            }
            const cancellationTokenSource = new cancellation_1.CancellationTokenSource();
            let promise;
            try {
                promise = channel.call(this.ctx, request.name, request.arg, cancellationTokenSource.token);
            }
            catch (err) {
                promise = Promise.reject(err);
            }
            const id = request.id;
            promise.then(data => {
                this.sendResponse({ id, data, type: 201 /* PromiseSuccess */ });
                this.activeRequests.delete(request.id);
            }, err => {
                if (err instanceof Error) {
                    this.sendResponse({
                        id, data: {
                            message: err.message,
                            name: err.name,
                            stack: err.stack ? (err.stack.split ? err.stack.split('\n') : err.stack) : undefined
                        }, type: 202 /* PromiseError */
                    });
                }
                else {
                    this.sendResponse({ id, data: err, type: 203 /* PromiseErrorObj */ });
                }
                this.activeRequests.delete(request.id);
            });
            const disposable = lifecycle_1.toDisposable(() => cancellationTokenSource.cancel());
            this.activeRequests.set(request.id, disposable);
        }
        onEventListen(request) {
            const channel = this.channels.get(request.channelName);
            if (!channel) {
                this.collectPendingRequest(request);
                return;
            }
            const id = request.id;
            const event = channel.listen(this.ctx, request.name, request.arg);
            const disposable = event(data => this.sendResponse({ id, data, type: 204 /* EventFire */ }));
            this.activeRequests.set(request.id, disposable);
        }
        disposeActiveRequest(request) {
            const disposable = this.activeRequests.get(request.id);
            if (disposable) {
                disposable.dispose();
                this.activeRequests.delete(request.id);
            }
        }
        collectPendingRequest(request) {
            let pendingRequests = this.pendingRequests.get(request.channelName);
            if (!pendingRequests) {
                pendingRequests = [];
                this.pendingRequests.set(request.channelName, pendingRequests);
            }
            const timer = setTimeout(() => {
                console.error(`Unknown channel: ${request.channelName}`);
                if (request.type === 100 /* Promise */) {
                    this.sendResponse({
                        id: request.id,
                        data: { name: 'Unknown channel', message: `Channel name '${request.channelName}' timed out after ${this.timeoutDelay}ms`, stack: undefined },
                        type: 202 /* PromiseError */
                    });
                }
            }, this.timeoutDelay);
            pendingRequests.push({ request, timeoutTimer: timer });
        }
        flushPendingRequests(channelName) {
            const requests = this.pendingRequests.get(channelName);
            if (requests) {
                for (const request of requests) {
                    clearTimeout(request.timeoutTimer);
                    switch (request.request.type) {
                        case 100 /* Promise */:
                            this.onPromise(request.request);
                            break;
                        case 102 /* EventListen */:
                            this.onEventListen(request.request);
                            break;
                    }
                }
                this.pendingRequests.delete(channelName);
            }
        }
        dispose() {
            if (this.protocolListener) {
                this.protocolListener.dispose();
                this.protocolListener = null;
            }
            this.activeRequests.forEach(d => d.dispose());
            this.activeRequests.clear();
        }
    }
    exports.ChannelServer = ChannelServer;
    var RequestInitiator;
    (function (RequestInitiator) {
        RequestInitiator[RequestInitiator["LocalSide"] = 0] = "LocalSide";
        RequestInitiator[RequestInitiator["OtherSide"] = 1] = "OtherSide";
    })(RequestInitiator = exports.RequestInitiator || (exports.RequestInitiator = {}));
    class ChannelClient {
        constructor(protocol, logger = null) {
            this.protocol = protocol;
            this.state = State.Uninitialized;
            this.activeRequests = new Set();
            this.handlers = new Map();
            this.lastRequestId = 0;
            this._onDidInitialize = new event_1.Emitter();
            this.onDidInitialize = this._onDidInitialize.event;
            this.protocolListener = this.protocol.onMessage(msg => this.onBuffer(msg));
            this.logger = logger;
        }
        getChannel(channelName) {
            const that = this;
            return {
                call(command, arg, cancellationToken) {
                    return that.requestPromise(channelName, command, arg, cancellationToken);
                },
                listen(event, arg) {
                    return that.requestEvent(channelName, event, arg);
                }
            };
        }
        requestPromise(channelName, name, arg, cancellationToken = cancellation_1.CancellationToken.None) {
            const id = this.lastRequestId++;
            const type = 100 /* Promise */;
            const request = { id, type, channelName, name, arg };
            if (cancellationToken.isCancellationRequested) {
                return Promise.reject(errors.canceled());
            }
            let disposable;
            const result = new Promise((c, e) => {
                if (cancellationToken.isCancellationRequested) {
                    return e(errors.canceled());
                }
                const doRequest = () => {
                    const handler = response => {
                        switch (response.type) {
                            case 201 /* PromiseSuccess */:
                                this.handlers.delete(id);
                                c(response.data);
                                break;
                            case 202 /* PromiseError */:
                                this.handlers.delete(id);
                                const error = new Error(response.data.message);
                                error.stack = response.data.stack;
                                error.name = response.data.name;
                                e(error);
                                break;
                            case 203 /* PromiseErrorObj */:
                                this.handlers.delete(id);
                                e(response.data);
                                break;
                        }
                    };
                    this.handlers.set(id, handler);
                    this.sendRequest(request);
                };
                let uninitializedPromise = null;
                if (this.state === State.Idle) {
                    doRequest();
                }
                else {
                    uninitializedPromise = async_1.createCancelablePromise(_ => this.whenInitialized());
                    uninitializedPromise.then(() => {
                        uninitializedPromise = null;
                        doRequest();
                    });
                }
                const cancel = () => {
                    if (uninitializedPromise) {
                        uninitializedPromise.cancel();
                        uninitializedPromise = null;
                    }
                    else {
                        this.sendRequest({ id, type: 101 /* PromiseCancel */ });
                    }
                    e(errors.canceled());
                };
                const cancellationTokenListener = cancellationToken.onCancellationRequested(cancel);
                disposable = lifecycle_1.combinedDisposable(lifecycle_1.toDisposable(cancel), cancellationTokenListener);
                this.activeRequests.add(disposable);
            });
            return result.finally(() => { this.activeRequests.delete(disposable); });
        }
        requestEvent(channelName, name, arg) {
            const id = this.lastRequestId++;
            const type = 102 /* EventListen */;
            const request = { id, type, channelName, name, arg };
            let uninitializedPromise = null;
            const emitter = new event_1.Emitter({
                onFirstListenerAdd: () => {
                    uninitializedPromise = async_1.createCancelablePromise(_ => this.whenInitialized());
                    uninitializedPromise.then(() => {
                        uninitializedPromise = null;
                        this.activeRequests.add(emitter);
                        this.sendRequest(request);
                    });
                },
                onLastListenerRemove: () => {
                    if (uninitializedPromise) {
                        uninitializedPromise.cancel();
                        uninitializedPromise = null;
                    }
                    else {
                        this.activeRequests.delete(emitter);
                        this.sendRequest({ id, type: 103 /* EventDispose */ });
                    }
                }
            });
            const handler = (res) => emitter.fire(res.data);
            this.handlers.set(id, handler);
            return emitter.event;
        }
        sendRequest(request) {
            switch (request.type) {
                case 100 /* Promise */:
                case 102 /* EventListen */: {
                    const msgLength = this.send([request.type, request.id, request.channelName, request.name], request.arg);
                    if (this.logger) {
                        this.logger.logOutgoing(msgLength, request.id, 0 /* LocalSide */, `${requestTypeToStr(request.type)}: ${request.channelName}.${request.name}`, request.arg);
                    }
                    return;
                }
                case 101 /* PromiseCancel */:
                case 103 /* EventDispose */: {
                    const msgLength = this.send([request.type, request.id]);
                    if (this.logger) {
                        this.logger.logOutgoing(msgLength, request.id, 0 /* LocalSide */, requestTypeToStr(request.type));
                    }
                    return;
                }
            }
        }
        send(header, body = undefined) {
            const writer = new BufferWriter();
            serialize(writer, header);
            serialize(writer, body);
            return this.sendBuffer(writer.buffer);
        }
        sendBuffer(message) {
            try {
                this.protocol.send(message);
                return message.byteLength;
            }
            catch (err) {
                // noop
                return 0;
            }
        }
        onBuffer(message) {
            const reader = new BufferReader(message);
            const header = deserialize(reader);
            const body = deserialize(reader);
            const type = header[0];
            switch (type) {
                case 200 /* Initialize */:
                    if (this.logger) {
                        this.logger.logIncoming(message.byteLength, 0, 0 /* LocalSide */, responseTypeToStr(type));
                    }
                    return this.onResponse({ type: header[0] });
                case 201 /* PromiseSuccess */:
                case 202 /* PromiseError */:
                case 204 /* EventFire */:
                case 203 /* PromiseErrorObj */:
                    if (this.logger) {
                        this.logger.logIncoming(message.byteLength, header[1], 0 /* LocalSide */, responseTypeToStr(type), body);
                    }
                    return this.onResponse({ type: header[0], id: header[1], data: body });
            }
        }
        onResponse(response) {
            if (response.type === 200 /* Initialize */) {
                this.state = State.Idle;
                this._onDidInitialize.fire();
                return;
            }
            const handler = this.handlers.get(response.id);
            if (handler) {
                handler(response);
            }
        }
        whenInitialized() {
            if (this.state === State.Idle) {
                return Promise.resolve();
            }
            else {
                return event_1.Event.toPromise(this.onDidInitialize);
            }
        }
        dispose() {
            if (this.protocolListener) {
                this.protocolListener.dispose();
                this.protocolListener = null;
            }
            this.activeRequests.forEach(p => p.dispose());
            this.activeRequests.clear();
        }
    }
    exports.ChannelClient = ChannelClient;
    /**
     * An `IPCServer` is both a channel server and a routing channel
     * client.
     *
     * As the owner of a protocol, you should extend both this
     * and the `IPCClient` classes to get IPC implementations
     * for your protocol.
     */
    class IPCServer {
        constructor(onDidClientConnect) {
            this.channels = new Map();
            this._connections = new Set();
            this._onDidAddConnection = new event_1.Emitter();
            this.onDidAddConnection = this._onDidAddConnection.event;
            this._onDidRemoveConnection = new event_1.Emitter();
            this.onDidRemoveConnection = this._onDidRemoveConnection.event;
            onDidClientConnect(({ protocol, onDidClientDisconnect }) => {
                const onFirstMessage = event_1.Event.once(protocol.onMessage);
                onFirstMessage(msg => {
                    const reader = new BufferReader(msg);
                    const ctx = deserialize(reader);
                    const channelServer = new ChannelServer(protocol, ctx);
                    const channelClient = new ChannelClient(protocol);
                    this.channels.forEach((channel, name) => channelServer.registerChannel(name, channel));
                    const connection = { channelServer, channelClient, ctx };
                    this._connections.add(connection);
                    this._onDidAddConnection.fire(connection);
                    onDidClientDisconnect(() => {
                        channelServer.dispose();
                        channelClient.dispose();
                        this._connections.delete(connection);
                        this._onDidRemoveConnection.fire(connection);
                    });
                });
            });
        }
        get connections() {
            const result = [];
            this._connections.forEach(ctx => result.push(ctx));
            return result;
        }
        getChannel(channelName, routerOrClientFilter) {
            const that = this;
            return {
                call(command, arg, cancellationToken) {
                    let connectionPromise;
                    if (types_1.isFunction(routerOrClientFilter)) {
                        // when no router is provided, we go random client picking
                        let connection = arrays_1.getRandomElement(that.connections.filter(routerOrClientFilter));
                        connectionPromise = connection
                            // if we found a client, let's call on it
                            ? Promise.resolve(connection)
                            // else, let's wait for a client to come along
                            : event_1.Event.toPromise(event_1.Event.filter(that.onDidAddConnection, routerOrClientFilter));
                    }
                    else {
                        connectionPromise = routerOrClientFilter.routeCall(that, command, arg);
                    }
                    const channelPromise = connectionPromise
                        .then(connection => connection.channelClient.getChannel(channelName));
                    return getDelayedChannel(channelPromise)
                        .call(command, arg, cancellationToken);
                },
                listen(event, arg) {
                    if (types_1.isFunction(routerOrClientFilter)) {
                        return that.getMulticastEvent(channelName, routerOrClientFilter, event, arg);
                    }
                    const channelPromise = routerOrClientFilter.routeEvent(that, event, arg)
                        .then(connection => connection.channelClient.getChannel(channelName));
                    return getDelayedChannel(channelPromise)
                        .listen(event, arg);
                }
            };
        }
        getMulticastEvent(channelName, clientFilter, eventName, arg) {
            const that = this;
            let disposables = new lifecycle_1.DisposableStore();
            // Create an emitter which hooks up to all clients
            // as soon as first listener is added. It also
            // disconnects from all clients as soon as the last listener
            // is removed.
            const emitter = new event_1.Emitter({
                onFirstListenerAdd: () => {
                    disposables = new lifecycle_1.DisposableStore();
                    // The event multiplexer is useful since the active
                    // client list is dynamic. We need to hook up and disconnection
                    // to/from clients as they come and go.
                    const eventMultiplexer = new event_1.EventMultiplexer();
                    const map = new Map();
                    const onDidAddConnection = (connection) => {
                        const channel = connection.channelClient.getChannel(channelName);
                        const event = channel.listen(eventName, arg);
                        const disposable = eventMultiplexer.add(event);
                        map.set(connection, disposable);
                    };
                    const onDidRemoveConnection = (connection) => {
                        const disposable = map.get(connection);
                        if (!disposable) {
                            return;
                        }
                        disposable.dispose();
                        map.delete(connection);
                    };
                    that.connections.filter(clientFilter).forEach(onDidAddConnection);
                    event_1.Event.filter(that.onDidAddConnection, clientFilter)(onDidAddConnection, undefined, disposables);
                    that.onDidRemoveConnection(onDidRemoveConnection, undefined, disposables);
                    eventMultiplexer.event(emitter.fire, emitter, disposables);
                    disposables.add(eventMultiplexer);
                },
                onLastListenerRemove: () => {
                    disposables.dispose();
                }
            });
            return emitter.event;
        }
        registerChannel(channelName, channel) {
            this.channels.set(channelName, channel);
            this._connections.forEach(connection => {
                connection.channelServer.registerChannel(channelName, channel);
            });
        }
        dispose() {
            this.channels.clear();
            this._connections.clear();
            this._onDidAddConnection.dispose();
            this._onDidRemoveConnection.dispose();
        }
    }
    exports.IPCServer = IPCServer;
    /**
     * An `IPCClient` is both a channel client and a channel server.
     *
     * As the owner of a protocol, you should extend both this
     * and the `IPCClient` classes to get IPC implementations
     * for your protocol.
     */
    class IPCClient {
        constructor(protocol, ctx, ipcLogger = null) {
            const writer = new BufferWriter();
            serialize(writer, ctx);
            protocol.send(writer.buffer);
            this.channelClient = new ChannelClient(protocol, ipcLogger);
            this.channelServer = new ChannelServer(protocol, ctx, ipcLogger);
        }
        getChannel(channelName) {
            return this.channelClient.getChannel(channelName);
        }
        registerChannel(channelName, channel) {
            this.channelServer.registerChannel(channelName, channel);
        }
        dispose() {
            this.channelClient.dispose();
            this.channelServer.dispose();
        }
    }
    exports.IPCClient = IPCClient;
    function getDelayedChannel(promise) {
        return {
            call(command, arg, cancellationToken) {
                return promise.then(c => c.call(command, arg, cancellationToken));
            },
            listen(event, arg) {
                const relay = new event_1.Relay();
                promise.then(c => relay.input = c.listen(event, arg));
                return relay.event;
            }
        };
    }
    exports.getDelayedChannel = getDelayedChannel;
    function getNextTickChannel(channel) {
        let didTick = false;
        return {
            call(command, arg, cancellationToken) {
                if (didTick) {
                    return channel.call(command, arg, cancellationToken);
                }
                return async_1.timeout(0)
                    .then(() => didTick = true)
                    .then(() => channel.call(command, arg, cancellationToken));
            },
            listen(event, arg) {
                if (didTick) {
                    return channel.listen(event, arg);
                }
                const relay = new event_1.Relay();
                async_1.timeout(0)
                    .then(() => didTick = true)
                    .then(() => relay.input = channel.listen(event, arg));
                return relay.event;
            }
        };
    }
    exports.getNextTickChannel = getNextTickChannel;
    class StaticRouter {
        constructor(fn) {
            this.fn = fn;
        }
        routeCall(hub) {
            return this.route(hub);
        }
        routeEvent(hub) {
            return this.route(hub);
        }
        async route(hub) {
            for (const connection of hub.connections) {
                if (await Promise.resolve(this.fn(connection.ctx))) {
                    return Promise.resolve(connection);
                }
            }
            await event_1.Event.toPromise(hub.onDidAddConnection);
            return await this.route(hub);
        }
    }
    exports.StaticRouter = StaticRouter;
    function createChannelReceiver(service, options) {
        const handler = service;
        const disableMarshalling = options && options.disableMarshalling;
        // Buffer any event that should be supported by
        // iterating over all property keys and finding them
        const mapEventNameToEvent = new Map();
        for (const key in handler) {
            if (propertyIsEvent(key)) {
                mapEventNameToEvent.set(key, event_1.Event.buffer(handler[key], true));
            }
        }
        return new class {
            listen(_, event) {
                const eventImpl = mapEventNameToEvent.get(event);
                if (eventImpl) {
                    return eventImpl;
                }
                throw new Error(`Event not found: ${event}`);
            }
            call(_, command, args) {
                const target = handler[command];
                if (typeof target === 'function') {
                    // Revive unless marshalling disabled
                    if (!disableMarshalling && Array.isArray(args)) {
                        for (let i = 0; i < args.length; i++) {
                            args[i] = marshalling_1.revive(args[i]);
                        }
                    }
                    return target.apply(handler, args);
                }
                throw new Error(`Method not found: ${command}`);
            }
        };
    }
    exports.createChannelReceiver = createChannelReceiver;
    function createChannelSender(channel, options) {
        const disableMarshalling = options && options.disableMarshalling;
        return new Proxy({}, {
            get(_target, propKey) {
                var _a;
                if (typeof propKey === 'string') {
                    // Check for predefined values
                    if ((_a = options === null || options === void 0 ? void 0 : options.properties) === null || _a === void 0 ? void 0 : _a.has(propKey)) {
                        return options.properties.get(propKey);
                    }
                    // Event
                    if (propertyIsEvent(propKey)) {
                        return channel.listen(propKey);
                    }
                    // Function
                    return async function (...args) {
                        // Add context if any
                        let methodArgs;
                        if (options && !types_1.isUndefinedOrNull(options.context)) {
                            methodArgs = [options.context, ...args];
                        }
                        else {
                            methodArgs = args;
                        }
                        const result = await channel.call(propKey, methodArgs);
                        // Revive unless marshalling disabled
                        if (!disableMarshalling) {
                            return marshalling_1.revive(result);
                        }
                        return result;
                    };
                }
                throw new Error(`Property not found: ${String(propKey)}`);
            }
        });
    }
    exports.createChannelSender = createChannelSender;
    function propertyIsEvent(name) {
        // Assume a property is an event if it has a form of "onSomething"
        return name[0] === 'o' && name[1] === 'n' && strings.isUpperAsciiLetter(name.charCodeAt(2));
    }
    //#endregion
    const colorTables = [
        ['#2977B1', '#FC802D', '#34A13A', '#D3282F', '#9366BA'],
        ['#8B564C', '#E177C0', '#7F7F7F', '#BBBE3D', '#2EBECD']
    ];
    function prettyWithoutArrays(data) {
        if (Array.isArray(data)) {
            return data;
        }
        if (data && typeof data === 'object' && typeof data.toString === 'function') {
            let result = data.toString();
            if (result !== '[object Object]') {
                return result;
            }
        }
        return data;
    }
    function pretty(data) {
        if (Array.isArray(data)) {
            return data.map(prettyWithoutArrays);
        }
        return prettyWithoutArrays(data);
    }
    function logWithColors(direction, totalLength, msgLength, req, initiator, str, data) {
        data = pretty(data);
        const colorTable = colorTables[initiator];
        const color = colorTable[req % colorTable.length];
        let args = [`%c[${direction}]%c[${String(totalLength).padStart(7, ' ')}]%c[len: ${String(msgLength).padStart(5, ' ')}]%c${String(req).padStart(5, ' ')} - ${str}`, 'color: darkgreen', 'color: grey', 'color: grey', `color: ${color}`];
        if (/\($/.test(str)) {
            args = args.concat(data);
            args.push(')');
        }
        else {
            args.push(data);
        }
        console.log.apply(console, args);
    }
    exports.logWithColors = logWithColors;
    class IPCLogger {
        constructor(_outgoingPrefix, _incomingPrefix) {
            this._outgoingPrefix = _outgoingPrefix;
            this._incomingPrefix = _incomingPrefix;
            this._totalIncoming = 0;
            this._totalOutgoing = 0;
        }
        logOutgoing(msgLength, requestId, initiator, str, data) {
            this._totalOutgoing += msgLength;
            logWithColors(this._outgoingPrefix, this._totalOutgoing, msgLength, requestId, initiator, str, data);
        }
        logIncoming(msgLength, requestId, initiator, str, data) {
            this._totalIncoming += msgLength;
            logWithColors(this._incomingPrefix, this._totalIncoming, msgLength, requestId, initiator, str, data);
        }
    }
    exports.IPCLogger = IPCLogger;
});

define(__m[61/*vs/nls!vs/base/common/date*/], __M([6/*vs/nls*/,5/*vs/nls!vs/code/node/cliProcessMain*/]), function(nls, data) { return nls.create("vs/base/common/date", data); });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[62/*vs/base/common/date*/], __M([0/*require*/,1/*exports*/,16/*vs/base/common/strings*/,61/*vs/nls!vs/base/common/date*/]), function (require, exports, strings_1, nls_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toLocalISOString = exports.fromNow = void 0;
    const minute = 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30;
    const year = day * 365;
    function fromNow(date, appendAgoLabel) {
        if (typeof date !== 'number') {
            date = date.getTime();
        }
        const seconds = Math.round((new Date().getTime() - date) / 1000);
        if (seconds < -30) {
            return nls_1.localize(0, null, fromNow(new Date().getTime() + seconds * 1000, false));
        }
        if (seconds < 30) {
            return nls_1.localize(1, null);
        }
        let value;
        if (seconds < minute) {
            value = seconds;
            if (appendAgoLabel) {
                return value === 1
                    ? nls_1.localize(2, null, value)
                    : nls_1.localize(3, null, value);
            }
            else {
                return value === 1
                    ? nls_1.localize(4, null, value)
                    : nls_1.localize(5, null, value);
            }
        }
        if (seconds < hour) {
            value = Math.floor(seconds / minute);
            if (appendAgoLabel) {
                return value === 1
                    ? nls_1.localize(6, null, value)
                    : nls_1.localize(7, null, value);
            }
            else {
                return value === 1
                    ? nls_1.localize(8, null, value)
                    : nls_1.localize(9, null, value);
            }
        }
        if (seconds < day) {
            value = Math.floor(seconds / hour);
            if (appendAgoLabel) {
                return value === 1
                    ? nls_1.localize(10, null, value)
                    : nls_1.localize(11, null, value);
            }
            else {
                return value === 1
                    ? nls_1.localize(12, null, value)
                    : nls_1.localize(13, null, value);
            }
        }
        if (seconds < week) {
            value = Math.floor(seconds / day);
            if (appendAgoLabel) {
                return value === 1
                    ? nls_1.localize(14, null, value)
                    : nls_1.localize(15, null, value);
            }
            else {
                return value === 1
                    ? nls_1.localize(16, null, value)
                    : nls_1.localize(17, null, value);
            }
        }
        if (seconds < month) {
            value = Math.floor(seconds / week);
            if (appendAgoLabel) {
                return value === 1
                    ? nls_1.localize(18, null, value)
                    : nls_1.localize(19, null, value);
            }
            else {
                return value === 1
                    ? nls_1.localize(20, null, value)
                    : nls_1.localize(21, null, value);
            }
        }
        if (seconds < year) {
            value = Math.floor(seconds / month);
            if (appendAgoLabel) {
                return value === 1
                    ? nls_1.localize(22, null, value)
                    : nls_1.localize(23, null, value);
            }
            else {
                return value === 1
                    ? nls_1.localize(24, null, value)
                    : nls_1.localize(25, null, value);
            }
        }
        value = Math.floor(seconds / year);
        if (appendAgoLabel) {
            return value === 1
                ? nls_1.localize(26, null, value)
                : nls_1.localize(27, null, value);
        }
        else {
            return value === 1
                ? nls_1.localize(28, null, value)
                : nls_1.localize(29, null, value);
        }
    }
    exports.fromNow = fromNow;
    function toLocalISOString(date) {
        return date.getFullYear() +
            '-' + strings_1.pad(date.getMonth() + 1, 2) +
            '-' + strings_1.pad(date.getDate(), 2) +
            'T' + strings_1.pad(date.getHours(), 2) +
            ':' + strings_1.pad(date.getMinutes(), 2) +
            ':' + strings_1.pad(date.getSeconds(), 2) +
            '.' + (date.getMilliseconds() / 1000).toFixed(3).slice(2, 5) +
            'Z';
    }
    exports.toLocalISOString = toLocalISOString;
});

define(__m[63/*vs/nls!vs/base/common/errorMessage*/], __M([6/*vs/nls*/,5/*vs/nls!vs/code/node/cliProcessMain*/]), function(nls, data) { return nls.create("vs/base/common/errorMessage", data); });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[32/*vs/base/common/errorMessage*/], __M([0/*require*/,1/*exports*/,63/*vs/nls!vs/base/common/errorMessage*/,8/*vs/base/common/types*/,18/*vs/base/common/arrays*/]), function (require, exports, nls, types, arrays) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toErrorMessage = void 0;
    function exceptionToErrorMessage(exception, verbose) {
        if (verbose && (exception.stack || exception.stacktrace)) {
            return nls.localize(0, null, detectSystemErrorMessage(exception), stackToString(exception.stack) || stackToString(exception.stacktrace));
        }
        return detectSystemErrorMessage(exception);
    }
    function stackToString(stack) {
        if (Array.isArray(stack)) {
            return stack.join('\n');
        }
        return stack;
    }
    function detectSystemErrorMessage(exception) {
        // See https://nodejs.org/api/errors.html#errors_class_system_error
        if (typeof exception.code === 'string' && typeof exception.errno === 'number' && typeof exception.syscall === 'string') {
            return nls.localize(1, null, exception.message);
        }
        return exception.message || nls.localize(2, null);
    }
    /**
     * Tries to generate a human readable error message out of the error. If the verbose parameter
     * is set to true, the error message will include stacktrace details if provided.
     *
     * @returns A string containing the error message.
     */
    function toErrorMessage(error = null, verbose = false) {
        if (!error) {
            return nls.localize(3, null);
        }
        if (Array.isArray(error)) {
            const errors = arrays.coalesce(error);
            const msg = toErrorMessage(errors[0], verbose);
            if (errors.length > 1) {
                return nls.localize(4, null, msg, errors.length);
            }
            return msg;
        }
        if (types.isString(error)) {
            return error;
        }
        if (error.detail) {
            const detail = error.detail;
            if (detail.error) {
                return exceptionToErrorMessage(detail.error, verbose);
            }
            if (detail.exception) {
                return exceptionToErrorMessage(detail.exception, verbose);
            }
        }
        if (error.stack) {
            return exceptionToErrorMessage(error, verbose);
        }
        if (error.message) {
            return error.message;
        }
        return nls.localize(5, null);
    }
    exports.toErrorMessage = toErrorMessage;
});

define(__m[64/*vs/nls!vs/base/node/processes*/], __M([6/*vs/nls*/,5/*vs/nls!vs/code/node/cliProcessMain*/]), function(nls, data) { return nls.create("vs/base/node/processes", data); });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[65/*vs/base/node/processes*/], __M([0/*require*/,1/*exports*/,3/*vs/base/common/path*/,23/*fs*/,41/*util*/,33/*child_process*/,64/*vs/nls!vs/base/node/processes*/,8/*vs/base/common/types*/,17/*vs/base/common/objects*/,66/*vs/base/common/extpath*/,14/*vs/base/common/platform*/,40/*vs/base/node/decoder*/,9/*vs/base/common/network*/]), function (require, exports, path, fs, util_1, cp, nls, Types, Objects, extpath, Platform, decoder_1, network_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.win32 = exports.createQueuedSender = exports.LineProcess = exports.AbstractProcess = exports.getWindowsShell = exports.TerminateResponseCode = exports.Source = void 0;
    function getWindowsCode(status) {
        switch (status) {
            case 0:
                return 0 /* Success */;
            case 1:
                return 2 /* AccessDenied */;
            case 128:
                return 3 /* ProcessNotFound */;
            default:
                return 1 /* Unknown */;
        }
    }
    function terminateProcess(process, cwd) {
        if (Platform.isWindows) {
            try {
                const options = {
                    stdio: ['pipe', 'pipe', 'ignore']
                };
                if (cwd) {
                    options.cwd = cwd;
                }
                const killProcess = cp.execFile('taskkill', ['/T', '/F', '/PID', process.pid.toString()], options);
                return new Promise((resolve, reject) => {
                    killProcess.once('error', (err) => {
                        resolve({ success: false, error: err });
                    });
                    killProcess.once('exit', (code, signal) => {
                        if (code === 0) {
                            resolve({ success: true });
                        }
                        else {
                            resolve({ success: false, code: code !== null ? code : 1 /* Unknown */ });
                        }
                    });
                });
            }
            catch (err) {
                return Promise.resolve({ success: false, error: err, code: err.status ? getWindowsCode(err.status) : 1 /* Unknown */ });
            }
        }
        else if (Platform.isLinux || Platform.isMacintosh) {
            try {
                const cmd = network_1.FileAccess.asFileUri('vs/base/node/terminateProcess.sh', require).fsPath;
                return new Promise((resolve, reject) => {
                    cp.execFile(cmd, [process.pid.toString()], { encoding: 'utf8', shell: true }, (err, stdout, stderr) => {
                        if (err) {
                            resolve({ success: false, error: err });
                        }
                        else {
                            resolve({ success: true });
                        }
                    });
                });
            }
            catch (err) {
                return Promise.resolve({ success: false, error: err });
            }
        }
        else {
            process.kill('SIGKILL');
        }
        return Promise.resolve({ success: true });
    }
    function getWindowsShell() {
        return process.env['comspec'] || 'cmd.exe';
    }
    exports.getWindowsShell = getWindowsShell;
    class AbstractProcess {
        constructor(arg1, arg2, arg3, arg4) {
            if (arg2 !== undefined && arg3 !== undefined && arg4 !== undefined) {
                this.cmd = arg1;
                this.args = arg2;
                this.shell = arg3;
                this.options = arg4;
            }
            else {
                const executable = arg1;
                this.cmd = executable.command;
                this.shell = executable.isShellCommand;
                this.args = executable.args.slice(0);
                this.options = executable.options || {};
            }
            this.childProcess = null;
            this.childProcessPromise = null;
            this.terminateRequested = false;
            if (this.options.env) {
                const newEnv = Object.create(null);
                Object.keys(process.env).forEach((key) => {
                    newEnv[key] = process.env[key];
                });
                Object.keys(this.options.env).forEach((key) => {
                    newEnv[key] = this.options.env[key];
                });
                this.options.env = newEnv;
            }
        }
        getSanitizedCommand() {
            let result = this.cmd.toLowerCase();
            const index = result.lastIndexOf(path.sep);
            if (index !== -1) {
                result = result.substring(index + 1);
            }
            if (AbstractProcess.WellKnowCommands[result]) {
                return result;
            }
            return 'other';
        }
        start(pp) {
            if (Platform.isWindows && ((this.options && this.options.cwd && extpath.isUNC(this.options.cwd)) || !this.options && extpath.isUNC(process.cwd()))) {
                return Promise.reject(new Error(nls.localize(0, null)));
            }
            return this.useExec().then((useExec) => {
                let cc;
                let ee;
                const result = new Promise((c, e) => {
                    cc = c;
                    ee = e;
                });
                if (useExec) {
                    let cmd = this.cmd;
                    if (this.args) {
                        cmd = cmd + ' ' + this.args.join(' ');
                    }
                    this.childProcess = cp.exec(cmd, this.options, (error, stdout, stderr) => {
                        this.childProcess = null;
                        const err = error;
                        // This is tricky since executing a command shell reports error back in case the executed command return an
                        // error or the command didn't exist at all. So we can't blindly treat an error as a failed command. So we
                        // always parse the output and report success unless the job got killed.
                        if (err && err.killed) {
                            ee({ killed: this.terminateRequested, stdout: stdout.toString(), stderr: stderr.toString() });
                        }
                        else {
                            this.handleExec(cc, pp, error, stdout, stderr);
                        }
                    });
                }
                else {
                    let childProcess = null;
                    const closeHandler = (data) => {
                        this.childProcess = null;
                        this.childProcessPromise = null;
                        this.handleClose(data, cc, pp, ee);
                        const result = {
                            terminated: this.terminateRequested
                        };
                        if (Types.isNumber(data)) {
                            result.cmdCode = data;
                        }
                        cc(result);
                    };
                    if (this.shell && Platform.isWindows) {
                        const options = Objects.deepClone(this.options);
                        options.windowsVerbatimArguments = true;
                        options.detached = false;
                        let quotedCommand = false;
                        let quotedArg = false;
                        const commandLine = [];
                        let quoted = this.ensureQuotes(this.cmd);
                        commandLine.push(quoted.value);
                        quotedCommand = quoted.quoted;
                        if (this.args) {
                            this.args.forEach((elem) => {
                                quoted = this.ensureQuotes(elem);
                                commandLine.push(quoted.value);
                                quotedArg = quotedArg && quoted.quoted;
                            });
                        }
                        const args = [
                            '/s',
                            '/c',
                        ];
                        if (quotedCommand) {
                            if (quotedArg) {
                                args.push('"' + commandLine.join(' ') + '"');
                            }
                            else if (commandLine.length > 1) {
                                args.push('"' + commandLine[0] + '"' + ' ' + commandLine.slice(1).join(' '));
                            }
                            else {
                                args.push('"' + commandLine[0] + '"');
                            }
                        }
                        else {
                            args.push(commandLine.join(' '));
                        }
                        childProcess = cp.spawn(getWindowsShell(), args, options);
                    }
                    else {
                        if (this.cmd) {
                            childProcess = cp.spawn(this.cmd, this.args, this.options);
                        }
                    }
                    if (childProcess) {
                        this.childProcess = childProcess;
                        this.childProcessPromise = Promise.resolve(childProcess);
                        if (this.pidResolve) {
                            this.pidResolve(Types.isNumber(childProcess.pid) ? childProcess.pid : -1);
                            this.pidResolve = undefined;
                        }
                        childProcess.on('error', (error) => {
                            this.childProcess = null;
                            ee({ terminated: this.terminateRequested, error: error });
                        });
                        if (childProcess.pid) {
                            this.childProcess.on('close', closeHandler);
                            this.handleSpawn(childProcess, cc, pp, ee, true);
                        }
                    }
                }
                return result;
            });
        }
        handleClose(data, cc, pp, ee) {
            // Default is to do nothing.
        }
        ensureQuotes(value) {
            if (AbstractProcess.regexp.test(value)) {
                return {
                    value: '"' + value + '"',
                    quoted: true
                };
            }
            else {
                return {
                    value: value,
                    quoted: value.length > 0 && value[0] === '"' && value[value.length - 1] === '"'
                };
            }
        }
        get pid() {
            if (this.childProcessPromise) {
                return this.childProcessPromise.then(childProcess => childProcess.pid, err => -1);
            }
            else {
                return new Promise((resolve) => {
                    this.pidResolve = resolve;
                });
            }
        }
        terminate() {
            if (!this.childProcessPromise) {
                return Promise.resolve({ success: true });
            }
            return this.childProcessPromise.then((childProcess) => {
                this.terminateRequested = true;
                return terminateProcess(childProcess, this.options.cwd).then(response => {
                    if (response.success) {
                        this.childProcess = null;
                    }
                    return response;
                });
            }, (err) => {
                return { success: true };
            });
        }
        useExec() {
            return new Promise((c, e) => {
                if (!this.shell || !Platform.isWindows) {
                    return c(false);
                }
                const cmdShell = cp.spawn(getWindowsShell(), ['/s', '/c']);
                cmdShell.on('error', (error) => {
                    return c(true);
                });
                cmdShell.on('exit', (data) => {
                    return c(false);
                });
            });
        }
    }
    exports.AbstractProcess = AbstractProcess;
    AbstractProcess.WellKnowCommands = {
        'ant': true,
        'cmake': true,
        'eslint': true,
        'gradle': true,
        'grunt': true,
        'gulp': true,
        'jake': true,
        'jenkins': true,
        'jshint': true,
        'make': true,
        'maven': true,
        'msbuild': true,
        'msc': true,
        'nmake': true,
        'npm': true,
        'rake': true,
        'tsc': true,
        'xbuild': true
    };
    AbstractProcess.regexp = /^[^"].* .*[^"]/;
    class LineProcess extends AbstractProcess {
        constructor(arg1, arg2, arg3, arg4) {
            super(arg1, arg2, arg3, arg4);
            this.stdoutLineDecoder = null;
            this.stderrLineDecoder = null;
        }
        handleExec(cc, pp, error, stdout, stderr) {
            [stdout, stderr].forEach((buffer, index) => {
                const lineDecoder = new decoder_1.LineDecoder();
                const lines = lineDecoder.write(buffer);
                lines.forEach((line) => {
                    pp({ line: line, source: index === 0 ? 0 /* stdout */ : 1 /* stderr */ });
                });
                const line = lineDecoder.end();
                if (line) {
                    pp({ line: line, source: index === 0 ? 0 /* stdout */ : 1 /* stderr */ });
                }
            });
            cc({ terminated: this.terminateRequested, error: error });
        }
        handleSpawn(childProcess, cc, pp, ee, sync) {
            const stdoutLineDecoder = new decoder_1.LineDecoder();
            const stderrLineDecoder = new decoder_1.LineDecoder();
            childProcess.stdout.on('data', (data) => {
                const lines = stdoutLineDecoder.write(data);
                lines.forEach(line => pp({ line: line, source: 0 /* stdout */ }));
            });
            childProcess.stderr.on('data', (data) => {
                const lines = stderrLineDecoder.write(data);
                lines.forEach(line => pp({ line: line, source: 1 /* stderr */ }));
            });
            this.stdoutLineDecoder = stdoutLineDecoder;
            this.stderrLineDecoder = stderrLineDecoder;
        }
        handleClose(data, cc, pp, ee) {
            const stdoutLine = this.stdoutLineDecoder ? this.stdoutLineDecoder.end() : null;
            if (stdoutLine) {
                pp({ line: stdoutLine, source: 0 /* stdout */ });
            }
            const stderrLine = this.stderrLineDecoder ? this.stderrLineDecoder.end() : null;
            if (stderrLine) {
                pp({ line: stderrLine, source: 1 /* stderr */ });
            }
        }
    }
    exports.LineProcess = LineProcess;
    // Wrapper around process.send() that will queue any messages if the internal node.js
    // queue is filled with messages and only continue sending messages when the internal
    // queue is free again to consume messages.
    // On Windows we always wait for the send() method to return before sending the next message
    // to workaround https://github.com/nodejs/node/issues/7657 (IPC can freeze process)
    function createQueuedSender(childProcess) {
        let msgQueue = [];
        let useQueue = false;
        const send = function (msg) {
            if (useQueue) {
                msgQueue.push(msg); // add to the queue if the process cannot handle more messages
                return;
            }
            const result = childProcess.send(msg, (error) => {
                if (error) {
                    console.error(error); // unlikely to happen, best we can do is log this error
                }
                useQueue = false; // we are good again to send directly without queue
                // now send all the messages that we have in our queue and did not send yet
                if (msgQueue.length > 0) {
                    const msgQueueCopy = msgQueue.slice(0);
                    msgQueue = [];
                    msgQueueCopy.forEach(entry => send(entry));
                }
            });
            if (!result || Platform.isWindows /* workaround https://github.com/nodejs/node/issues/7657 */) {
                useQueue = true;
            }
        };
        return { send };
    }
    exports.createQueuedSender = createQueuedSender;
    var win32;
    (function (win32) {
        async function findExecutable(command, cwd, paths) {
            // If we have an absolute path then we take it.
            if (path.isAbsolute(command)) {
                return command;
            }
            if (cwd === undefined) {
                cwd = process.cwd();
            }
            const dir = path.dirname(command);
            if (dir !== '.') {
                // We have a directory and the directory is relative (see above). Make the path absolute
                // to the current working directory.
                return path.join(cwd, command);
            }
            if (paths === undefined && Types.isString(process.env.PATH)) {
                paths = process.env.PATH.split(path.delimiter);
            }
            // No PATH environment. Make path absolute to the cwd.
            if (paths === undefined || paths.length === 0) {
                return path.join(cwd, command);
            }
            async function fileExists(path) {
                if (await util_1.promisify(fs.exists)(path)) {
                    return !((await util_1.promisify(fs.stat)(path)).isDirectory());
                }
                return false;
            }
            // We have a simple file name. We get the path variable from the env
            // and try to find the executable on the path.
            for (let pathEntry of paths) {
                // The path entry is absolute.
                let fullPath;
                if (path.isAbsolute(pathEntry)) {
                    fullPath = path.join(pathEntry, command);
                }
                else {
                    fullPath = path.join(cwd, pathEntry, command);
                }
                if (await fileExists(fullPath)) {
                    return fullPath;
                }
                let withExtension = fullPath + '.com';
                if (await fileExists(withExtension)) {
                    return withExtension;
                }
                withExtension = fullPath + '.exe';
                if (await fileExists(withExtension)) {
                    return withExtension;
                }
            }
            return path.join(cwd, command);
        }
        win32.findExecutable = findExecutable;
    })(win32 = exports.win32 || (exports.win32 = {}));
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[42/*vs/base/parts/ipc/node/ipc.cp*/], __M([0/*require*/,1/*exports*/,33/*child_process*/,2/*vs/base/common/lifecycle*/,12/*vs/base/common/async*/,17/*vs/base/common/objects*/,11/*vs/base/common/event*/,65/*vs/base/node/processes*/,31/*vs/base/parts/ipc/common/ipc*/,56/*vs/base/common/console*/,28/*vs/base/common/cancellation*/,20/*vs/base/common/errors*/,15/*vs/base/common/buffer*/,14/*vs/base/common/platform*/]), function (require, exports, child_process_1, lifecycle_1, async_1, objects_1, event_1, processes_1, ipc_1, console_1, cancellation_1, errors, buffer_1, platform_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Client = exports.Server = void 0;
    /**
     * This implementation doesn't perform well since it uses base64 encoding for buffers.
     * We should move all implementations to use named ipc.net, so we stop depending on cp.fork.
     */
    class Server extends ipc_1.ChannelServer {
        constructor(ctx) {
            super({
                send: r => {
                    try {
                        if (process.send) {
                            process.send(r.buffer.toString('base64'));
                        }
                    }
                    catch (e) { /* not much to do */ }
                },
                onMessage: event_1.Event.fromNodeEventEmitter(process, 'message', msg => buffer_1.VSBuffer.wrap(Buffer.from(msg, 'base64')))
            }, ctx);
            process.once('disconnect', () => this.dispose());
        }
    }
    exports.Server = Server;
    class Client {
        constructor(modulePath, options) {
            this.modulePath = modulePath;
            this.options = options;
            this.activeRequests = new Set();
            this.channels = new Map();
            this._onDidProcessExit = new event_1.Emitter();
            this.onDidProcessExit = this._onDidProcessExit.event;
            const timeout = options && options.timeout ? options.timeout : 60000;
            this.disposeDelayer = new async_1.Delayer(timeout);
            this.child = null;
            this._client = null;
        }
        getChannel(channelName) {
            const that = this;
            return {
                call(command, arg, cancellationToken) {
                    return that.requestPromise(channelName, command, arg, cancellationToken);
                },
                listen(event, arg) {
                    return that.requestEvent(channelName, event, arg);
                }
            };
        }
        requestPromise(channelName, name, arg, cancellationToken = cancellation_1.CancellationToken.None) {
            if (!this.disposeDelayer) {
                return Promise.reject(new Error('disposed'));
            }
            if (cancellationToken.isCancellationRequested) {
                return Promise.reject(errors.canceled());
            }
            this.disposeDelayer.cancel();
            const channel = this.getCachedChannel(channelName);
            const result = async_1.createCancelablePromise(token => channel.call(name, arg, token));
            const cancellationTokenListener = cancellationToken.onCancellationRequested(() => result.cancel());
            const disposable = lifecycle_1.toDisposable(() => result.cancel());
            this.activeRequests.add(disposable);
            result.finally(() => {
                cancellationTokenListener.dispose();
                this.activeRequests.delete(disposable);
                if (this.activeRequests.size === 0 && this.disposeDelayer) {
                    this.disposeDelayer.trigger(() => this.disposeClient());
                }
            });
            return result;
        }
        requestEvent(channelName, name, arg) {
            if (!this.disposeDelayer) {
                return event_1.Event.None;
            }
            this.disposeDelayer.cancel();
            let listener;
            const emitter = new event_1.Emitter({
                onFirstListenerAdd: () => {
                    const channel = this.getCachedChannel(channelName);
                    const event = channel.listen(name, arg);
                    listener = event(emitter.fire, emitter);
                    this.activeRequests.add(listener);
                },
                onLastListenerRemove: () => {
                    this.activeRequests.delete(listener);
                    listener.dispose();
                    if (this.activeRequests.size === 0 && this.disposeDelayer) {
                        this.disposeDelayer.trigger(() => this.disposeClient());
                    }
                }
            });
            return emitter.event;
        }
        get client() {
            if (!this._client) {
                const args = this.options && this.options.args ? this.options.args : [];
                const forkOpts = Object.create(null);
                forkOpts.env = Object.assign(Object.assign({}, objects_1.deepClone(process.env)), { 'VSCODE_PARENT_PID': String(process.pid) });
                if (this.options && this.options.env) {
                    forkOpts.env = Object.assign(Object.assign({}, forkOpts.env), this.options.env);
                }
                if (this.options && this.options.freshExecArgv) {
                    forkOpts.execArgv = [];
                }
                if (this.options && typeof this.options.debug === 'number') {
                    forkOpts.execArgv = ['--nolazy', '--inspect=' + this.options.debug];
                }
                if (this.options && typeof this.options.debugBrk === 'number') {
                    forkOpts.execArgv = ['--nolazy', '--inspect-brk=' + this.options.debugBrk];
                }
                if (platform_1.isMacintosh && forkOpts.env) {
                    // Unset `DYLD_LIBRARY_PATH`, as it leads to process crashes
                    // See https://github.com/microsoft/vscode/issues/105848
                    delete forkOpts.env['DYLD_LIBRARY_PATH'];
                }
                this.child = child_process_1.fork(this.modulePath, args, forkOpts);
                const onMessageEmitter = new event_1.Emitter();
                const onRawMessage = event_1.Event.fromNodeEventEmitter(this.child, 'message', msg => msg);
                onRawMessage(msg => {
                    // Handle remote console logs specially
                    if (console_1.isRemoteConsoleLog(msg)) {
                        console_1.log(msg, `IPC Library: ${this.options.serverName}`);
                        return;
                    }
                    // Anything else goes to the outside
                    onMessageEmitter.fire(buffer_1.VSBuffer.wrap(Buffer.from(msg, 'base64')));
                });
                const sender = this.options.useQueue ? processes_1.createQueuedSender(this.child) : this.child;
                const send = (r) => this.child && this.child.connected && sender.send(r.buffer.toString('base64'));
                const onMessage = onMessageEmitter.event;
                const protocol = { send, onMessage };
                this._client = new ipc_1.ChannelClient(protocol);
                const onExit = () => this.disposeClient();
                process.once('exit', onExit);
                this.child.on('error', err => console.warn('IPC "' + this.options.serverName + '" errored with ' + err));
                this.child.on('exit', (code, signal) => {
                    process.removeListener('exit', onExit); // https://github.com/electron/electron/issues/21475
                    this.activeRequests.forEach(r => lifecycle_1.dispose(r));
                    this.activeRequests.clear();
                    if (code !== 0 && signal !== 'SIGTERM') {
                        console.warn('IPC "' + this.options.serverName + '" crashed with exit code ' + code + ' and signal ' + signal);
                    }
                    if (this.disposeDelayer) {
                        this.disposeDelayer.cancel();
                    }
                    this.disposeClient();
                    this._onDidProcessExit.fire({ code, signal });
                });
            }
            return this._client;
        }
        getCachedChannel(name) {
            let channel = this.channels.get(name);
            if (!channel) {
                channel = this.client.getChannel(name);
                this.channels.set(name, channel);
            }
            return channel;
        }
        disposeClient() {
            if (this._client) {
                if (this.child) {
                    this.child.kill();
                    this.child = null;
                }
                this._client = null;
                this.channels.clear();
            }
        }
        dispose() {
            this._onDidProcessExit.dispose();
            if (this.disposeDelayer) {
                this.disposeDelayer.cancel();
                this.disposeDelayer = undefined;
            }
            this.disposeClient();
            this.activeRequests.clear();
        }
    }
    exports.Client = Client;
});

define(__m[67/*vs/nls!vs/base/node/zip*/], __M([6/*vs/nls*/,5/*vs/nls!vs/code/node/cliProcessMain*/]), function(nls, data) { return nls.create("vs/base/node/zip", data); });

define(__m[68/*vs/nls!vs/platform/configuration/common/configurationRegistry*/], __M([6/*vs/nls*/,5/*vs/nls!vs/code/node/cliProcessMain*/]), function(nls, data) { return nls.create("vs/platform/configuration/common/configurationRegistry", data); });
define(__m[69/*vs/nls!vs/platform/extensionManagement/common/extensionManagement*/], __M([6/*vs/nls*/,5/*vs/nls!vs/code/node/cliProcessMain*/]), function(nls, data) { return nls.create("vs/platform/extensionManagement/common/extensionManagement", data); });
define(__m[70/*vs/nls!vs/platform/extensionManagement/node/extensionManagementService*/], __M([6/*vs/nls*/,5/*vs/nls!vs/code/node/cliProcessMain*/]), function(nls, data) { return nls.create("vs/platform/extensionManagement/node/extensionManagementService", data); });
define(__m[71/*vs/nls!vs/platform/extensionManagement/node/extensionManagementUtil*/], __M([6/*vs/nls*/,5/*vs/nls!vs/code/node/cliProcessMain*/]), function(nls, data) { return nls.create("vs/platform/extensionManagement/node/extensionManagementUtil", data); });
define(__m[72/*vs/nls!vs/platform/extensionManagement/node/extensionsScanner*/], __M([6/*vs/nls*/,5/*vs/nls!vs/code/node/cliProcessMain*/]), function(nls, data) { return nls.create("vs/platform/extensionManagement/node/extensionsScanner", data); });
define(__m[73/*vs/nls!vs/platform/extensions/common/extensionValidator*/], __M([6/*vs/nls*/,5/*vs/nls!vs/code/node/cliProcessMain*/]), function(nls, data) { return nls.create("vs/platform/extensions/common/extensionValidator", data); });
define(__m[74/*vs/nls!vs/platform/files/common/fileService*/], __M([6/*vs/nls*/,5/*vs/nls!vs/code/node/cliProcessMain*/]), function(nls, data) { return nls.create("vs/platform/files/common/fileService", data); });
define(__m[75/*vs/nls!vs/platform/files/common/io*/], __M([6/*vs/nls*/,5/*vs/nls!vs/code/node/cliProcessMain*/]), function(nls, data) { return nls.create("vs/platform/files/common/io", data); });
define(__m[76/*vs/nls!vs/platform/files/node/diskFileSystemProvider*/], __M([6/*vs/nls*/,5/*vs/nls!vs/code/node/cliProcessMain*/]), function(nls, data) { return nls.create("vs/platform/files/node/diskFileSystemProvider", data); });
define(__m[77/*vs/nls!vs/platform/request/common/request*/], __M([6/*vs/nls*/,5/*vs/nls!vs/code/node/cliProcessMain*/]), function(nls, data) { return nls.create("vs/platform/request/common/request", data); });
define(__m[78/*vs/nls!vs/platform/telemetry/common/telemetryService*/], __M([6/*vs/nls*/,5/*vs/nls!vs/code/node/cliProcessMain*/]), function(nls, data) { return nls.create("vs/platform/telemetry/common/telemetryService", data); });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[79/*vs/platform/extensionManagement/common/extensionNls*/], __M([0/*require*/,1/*exports*/,17/*vs/base/common/objects*/]), function (require, exports, objects_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.localizeManifest = void 0;
    const nlsRegex = /^%([\w\d.-]+)%$/i;
    function localizeManifest(manifest, translations) {
        const patcher = (value) => {
            if (typeof value !== 'string') {
                return undefined;
            }
            const match = nlsRegex.exec(value);
            if (!match) {
                return undefined;
            }
            return translations[match[1]] || value;
        };
        return objects_1.cloneAndChange(manifest, patcher);
    }
    exports.localizeManifest = localizeManifest;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[43/*vs/platform/extensions/common/extensionValidator*/], __M([0/*require*/,1/*exports*/,73/*vs/nls!vs/platform/extensions/common/extensionValidator*/]), function (require, exports, nls) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isVersionValid = exports.isEngineValid = exports.isValidExtensionVersion = exports.isValidVersion = exports.normalizeVersion = exports.parseVersion = exports.isValidVersionStr = void 0;
    const VERSION_REGEXP = /^(\^|>=)?((\d+)|x)\.((\d+)|x)\.((\d+)|x)(\-.*)?$/;
    function isValidVersionStr(version) {
        version = version.trim();
        return (version === '*' || VERSION_REGEXP.test(version));
    }
    exports.isValidVersionStr = isValidVersionStr;
    function parseVersion(version) {
        if (!isValidVersionStr(version)) {
            return null;
        }
        version = version.trim();
        if (version === '*') {
            return {
                hasCaret: false,
                hasGreaterEquals: false,
                majorBase: 0,
                majorMustEqual: false,
                minorBase: 0,
                minorMustEqual: false,
                patchBase: 0,
                patchMustEqual: false,
                preRelease: null
            };
        }
        let m = version.match(VERSION_REGEXP);
        if (!m) {
            return null;
        }
        return {
            hasCaret: m[1] === '^',
            hasGreaterEquals: m[1] === '>=',
            majorBase: m[2] === 'x' ? 0 : parseInt(m[2], 10),
            majorMustEqual: (m[2] === 'x' ? false : true),
            minorBase: m[4] === 'x' ? 0 : parseInt(m[4], 10),
            minorMustEqual: (m[4] === 'x' ? false : true),
            patchBase: m[6] === 'x' ? 0 : parseInt(m[6], 10),
            patchMustEqual: (m[6] === 'x' ? false : true),
            preRelease: m[8] || null
        };
    }
    exports.parseVersion = parseVersion;
    function normalizeVersion(version) {
        if (!version) {
            return null;
        }
        let majorBase = version.majorBase, majorMustEqual = version.majorMustEqual, minorBase = version.minorBase, minorMustEqual = version.minorMustEqual, patchBase = version.patchBase, patchMustEqual = version.patchMustEqual;
        if (version.hasCaret) {
            if (majorBase === 0) {
                patchMustEqual = false;
            }
            else {
                minorMustEqual = false;
                patchMustEqual = false;
            }
        }
        return {
            majorBase: majorBase,
            majorMustEqual: majorMustEqual,
            minorBase: minorBase,
            minorMustEqual: minorMustEqual,
            patchBase: patchBase,
            patchMustEqual: patchMustEqual,
            isMinimum: version.hasGreaterEquals
        };
    }
    exports.normalizeVersion = normalizeVersion;
    function isValidVersion(_version, _desiredVersion) {
        let version;
        if (typeof _version === 'string') {
            version = normalizeVersion(parseVersion(_version));
        }
        else {
            version = _version;
        }
        let desiredVersion;
        if (typeof _desiredVersion === 'string') {
            desiredVersion = normalizeVersion(parseVersion(_desiredVersion));
        }
        else {
            desiredVersion = _desiredVersion;
        }
        if (!version || !desiredVersion) {
            return false;
        }
        let majorBase = version.majorBase;
        let minorBase = version.minorBase;
        let patchBase = version.patchBase;
        let desiredMajorBase = desiredVersion.majorBase;
        let desiredMinorBase = desiredVersion.minorBase;
        let desiredPatchBase = desiredVersion.patchBase;
        let majorMustEqual = desiredVersion.majorMustEqual;
        let minorMustEqual = desiredVersion.minorMustEqual;
        let patchMustEqual = desiredVersion.patchMustEqual;
        if (desiredVersion.isMinimum) {
            if (majorBase > desiredMajorBase) {
                return true;
            }
            if (majorBase < desiredMajorBase) {
                return false;
            }
            if (minorBase > desiredMinorBase) {
                return true;
            }
            if (minorBase < desiredMinorBase) {
                return false;
            }
            return patchBase >= desiredPatchBase;
        }
        // Anything < 1.0.0 is compatible with >= 1.0.0, except exact matches
        if (majorBase === 1 && desiredMajorBase === 0 && (!majorMustEqual || !minorMustEqual || !patchMustEqual)) {
            desiredMajorBase = 1;
            desiredMinorBase = 0;
            desiredPatchBase = 0;
            majorMustEqual = true;
            minorMustEqual = false;
            patchMustEqual = false;
        }
        if (majorBase < desiredMajorBase) {
            // smaller major version
            return false;
        }
        if (majorBase > desiredMajorBase) {
            // higher major version
            return (!majorMustEqual);
        }
        // at this point, majorBase are equal
        if (minorBase < desiredMinorBase) {
            // smaller minor version
            return false;
        }
        if (minorBase > desiredMinorBase) {
            // higher minor version
            return (!minorMustEqual);
        }
        // at this point, minorBase are equal
        if (patchBase < desiredPatchBase) {
            // smaller patch version
            return false;
        }
        if (patchBase > desiredPatchBase) {
            // higher patch version
            return (!patchMustEqual);
        }
        // at this point, patchBase are equal
        return true;
    }
    exports.isValidVersion = isValidVersion;
    function isValidExtensionVersion(version, extensionDesc, notices) {
        if (extensionDesc.isBuiltin || typeof extensionDesc.main === 'undefined') {
            // No version check for builtin or declarative extensions
            return true;
        }
        return isVersionValid(version, extensionDesc.engines.vscode, notices);
    }
    exports.isValidExtensionVersion = isValidExtensionVersion;
    function isEngineValid(engine, version) {
        // TODO@joao: discuss with alex '*' doesn't seem to be a valid engine version
        return engine === '*' || isVersionValid(version, engine);
    }
    exports.isEngineValid = isEngineValid;
    function isVersionValid(currentVersion, requestedVersion, notices = []) {
        let desiredVersion = normalizeVersion(parseVersion(requestedVersion));
        if (!desiredVersion) {
            notices.push(nls.localize(0, null, requestedVersion));
            return false;
        }
        // enforce that a breaking API version is specified.
        // for 0.X.Y, that means up to 0.X must be specified
        // otherwise for Z.X.Y, that means Z must be specified
        if (desiredVersion.majorBase === 0) {
            // force that major and minor must be specific
            if (!desiredVersion.majorMustEqual || !desiredVersion.minorMustEqual) {
                notices.push(nls.localize(1, null, requestedVersion));
                return false;
            }
        }
        else {
            // force that major must be specific
            if (!desiredVersion.majorMustEqual) {
                notices.push(nls.localize(2, null, requestedVersion));
                return false;
            }
        }
        if (!isValidVersion(currentVersion, desiredVersion)) {
            notices.push(nls.localize(3, null, currentVersion, requestedVersion));
            return false;
        }
        return true;
    }
    exports.isVersionValid = isVersionValid;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[80/*vs/platform/files/node/watcher/nsfw/watcherService*/], __M([0/*require*/,1/*exports*/,31/*vs/base/parts/ipc/common/ipc*/,42/*vs/base/parts/ipc/node/ipc.cp*/,2/*vs/base/common/lifecycle*/,9/*vs/base/common/network*/]), function (require, exports, ipc_1, ipc_cp_1, lifecycle_1, network_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FileWatcher = void 0;
    class FileWatcher extends lifecycle_1.Disposable {
        constructor(folders, onDidFilesChange, onLogMessage, verboseLogging) {
            super();
            this.folders = folders;
            this.onDidFilesChange = onDidFilesChange;
            this.onLogMessage = onLogMessage;
            this.verboseLogging = verboseLogging;
            this.isDisposed = false;
            this.restartCounter = 0;
            this.startWatching();
        }
        startWatching() {
            const client = this._register(new ipc_cp_1.Client(network_1.FileAccess.asFileUri('bootstrap-fork', require).fsPath, {
                serverName: 'File Watcher (nsfw)',
                args: ['--type=watcherService'],
                env: {
                    AMD_ENTRYPOINT: 'vs/platform/files/node/watcher/nsfw/watcherApp',
                    PIPE_LOGGING: 'true',
                    VERBOSE_LOGGING: 'true' // transmit console logs from server to client
                }
            }));
            this._register(client.onDidProcessExit(() => {
                // our watcher app should never be completed because it keeps on watching. being in here indicates
                // that the watcher process died and we want to restart it here. we only do it a max number of times
                if (!this.isDisposed) {
                    if (this.restartCounter <= FileWatcher.MAX_RESTARTS) {
                        this.error('terminated unexpectedly and is restarted again...');
                        this.restartCounter++;
                        this.startWatching();
                    }
                    else {
                        this.error('failed to start after retrying for some time, giving up. Please report this as a bug report!');
                    }
                }
            }));
            // Initialize watcher
            this.service = ipc_1.createChannelSender(ipc_1.getNextTickChannel(client.getChannel('watcher')));
            this.service.setVerboseLogging(this.verboseLogging);
            this._register(this.service.onDidChangeFile(e => !this.isDisposed && this.onDidFilesChange(e)));
            this._register(this.service.onDidLogMessage(m => this.onLogMessage(m)));
            // Start watching
            this.setFolders(this.folders);
        }
        setVerboseLogging(verboseLogging) {
            this.verboseLogging = verboseLogging;
            if (!this.isDisposed && this.service) {
                this.service.setVerboseLogging(verboseLogging);
            }
        }
        error(message) {
            this.onLogMessage({ type: 'error', message: `[File Watcher (nsfw)] ${message}` });
        }
        setFolders(folders) {
            this.folders = folders;
            if (this.service) {
                this.service.setRoots(folders);
            }
        }
        dispose() {
            this.isDisposed = true;
            super.dispose();
        }
    }
    exports.FileWatcher = FileWatcher;
    FileWatcher.MAX_RESTARTS = 5;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[81/*vs/platform/files/node/watcher/unix/watcherService*/], __M([0/*require*/,1/*exports*/,31/*vs/base/parts/ipc/common/ipc*/,42/*vs/base/parts/ipc/node/ipc.cp*/,2/*vs/base/common/lifecycle*/,9/*vs/base/common/network*/]), function (require, exports, ipc_1, ipc_cp_1, lifecycle_1, network_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FileWatcher = void 0;
    class FileWatcher extends lifecycle_1.Disposable {
        constructor(folders, onDidFilesChange, onLogMessage, verboseLogging, watcherOptions = {}) {
            super();
            this.folders = folders;
            this.onDidFilesChange = onDidFilesChange;
            this.onLogMessage = onLogMessage;
            this.verboseLogging = verboseLogging;
            this.watcherOptions = watcherOptions;
            this.isDisposed = false;
            this.restartCounter = 0;
            this.startWatching();
        }
        startWatching() {
            const client = this._register(new ipc_cp_1.Client(network_1.FileAccess.asFileUri('bootstrap-fork', require).fsPath, {
                serverName: 'File Watcher (chokidar)',
                args: ['--type=watcherService'],
                env: {
                    AMD_ENTRYPOINT: 'vs/platform/files/node/watcher/unix/watcherApp',
                    PIPE_LOGGING: 'true',
                    VERBOSE_LOGGING: 'true' // transmit console logs from server to client
                }
            }));
            this._register(client.onDidProcessExit(() => {
                // our watcher app should never be completed because it keeps on watching. being in here indicates
                // that the watcher process died and we want to restart it here. we only do it a max number of times
                if (!this.isDisposed) {
                    if (this.restartCounter <= FileWatcher.MAX_RESTARTS) {
                        this.error('terminated unexpectedly and is restarted again...');
                        this.restartCounter++;
                        this.startWatching();
                    }
                    else {
                        this.error('failed to start after retrying for some time, giving up. Please report this as a bug report!');
                    }
                }
            }));
            // Initialize watcher
            this.service = ipc_1.createChannelSender(ipc_1.getNextTickChannel(client.getChannel('watcher')));
            this.service.init(Object.assign(Object.assign({}, this.watcherOptions), { verboseLogging: this.verboseLogging }));
            this._register(this.service.onDidChangeFile(e => !this.isDisposed && this.onDidFilesChange(e)));
            this._register(this.service.onDidLogMessage(m => this.onLogMessage(m)));
            // Start watching
            this.service.setRoots(this.folders);
        }
        error(message) {
            this.onLogMessage({ type: 'error', message: `[File Watcher (chokidar)] ${message}` });
        }
        setVerboseLogging(verboseLogging) {
            this.verboseLogging = verboseLogging;
            if (this.service) {
                this.service.setVerboseLogging(verboseLogging);
            }
        }
        setFolders(folders) {
            this.folders = folders;
            if (this.service) {
                this.service.setRoots(folders);
            }
        }
        dispose() {
            this.isDisposed = true;
            super.dispose();
        }
    }
    exports.FileWatcher = FileWatcher;
    FileWatcher.MAX_RESTARTS = 5;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[82/*vs/platform/files/node/watcher/win32/csharpWatcherService*/], __M([0/*require*/,1/*exports*/,33/*child_process*/,40/*vs/base/node/decoder*/,119/*vs/base/common/glob*/,9/*vs/base/common/network*/]), function (require, exports, cp, decoder, glob, network_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OutOfProcessWin32FolderWatcher = void 0;
    class OutOfProcessWin32FolderWatcher {
        constructor(watchedFolder, ignored, eventCallback, logCallback, verboseLogging) {
            this.watchedFolder = watchedFolder;
            this.eventCallback = eventCallback;
            this.logCallback = logCallback;
            this.verboseLogging = verboseLogging;
            this.restartCounter = 0;
            if (Array.isArray(ignored)) {
                this.ignored = ignored.map(i => glob.parse(i));
            }
            else {
                this.ignored = [];
            }
            // Logging
            if (this.verboseLogging) {
                this.log(`Start watching: ${watchedFolder}`);
            }
            this.startWatcher();
        }
        startWatcher() {
            const args = [this.watchedFolder];
            if (this.verboseLogging) {
                args.push('-verbose');
            }
            this.handle = cp.spawn(network_1.FileAccess.asFileUri('vs/platform/files/node/watcher/win32/CodeHelper.exe', require).fsPath, args);
            const stdoutLineDecoder = new decoder.LineDecoder();
            // Events over stdout
            this.handle.stdout.on('data', (data) => {
                // Collect raw events from output
                const rawEvents = [];
                stdoutLineDecoder.write(data).forEach((line) => {
                    const eventParts = line.split('|');
                    if (eventParts.length === 2) {
                        const changeType = Number(eventParts[0]);
                        const absolutePath = eventParts[1];
                        // File Change Event (0 Changed, 1 Created, 2 Deleted)
                        if (changeType >= 0 && changeType < 3) {
                            // Support ignores
                            if (this.ignored && this.ignored.some(ignore => ignore(absolutePath))) {
                                if (this.verboseLogging) {
                                    this.log(absolutePath);
                                }
                                return;
                            }
                            // Otherwise record as event
                            rawEvents.push({
                                type: OutOfProcessWin32FolderWatcher.changeTypeMap[changeType],
                                path: absolutePath
                            });
                        }
                        // 3 Logging
                        else {
                            this.log(eventParts[1]);
                        }
                    }
                });
                // Trigger processing of events through the delayer to batch them up properly
                if (rawEvents.length > 0) {
                    this.eventCallback(rawEvents);
                }
            });
            // Errors
            this.handle.on('error', (error) => this.onError(error));
            this.handle.stderr.on('data', (data) => this.onError(data));
            // Exit
            this.handle.on('exit', (code, signal) => this.onExit(code, signal));
        }
        onError(error) {
            this.error('process error: ' + error.toString());
        }
        onExit(code, signal) {
            if (this.handle) { // exit while not yet being disposed is unexpected!
                this.error(`terminated unexpectedly (code: ${code}, signal: ${signal})`);
                if (this.restartCounter <= OutOfProcessWin32FolderWatcher.MAX_RESTARTS) {
                    this.error('is restarted again...');
                    this.restartCounter++;
                    this.startWatcher(); // restart
                }
                else {
                    this.error('Watcher failed to start after retrying for some time, giving up. Please report this as a bug report!');
                }
            }
        }
        error(message) {
            this.logCallback({ type: 'error', message: `[File Watcher (C#)] ${message}` });
        }
        log(message) {
            this.logCallback({ type: 'trace', message: `[File Watcher (C#)] ${message}` });
        }
        dispose() {
            if (this.handle) {
                this.handle.kill();
                this.handle = undefined;
            }
        }
    }
    exports.OutOfProcessWin32FolderWatcher = OutOfProcessWin32FolderWatcher;
    OutOfProcessWin32FolderWatcher.MAX_RESTARTS = 5;
    OutOfProcessWin32FolderWatcher.changeTypeMap = [0 /* UPDATED */, 1 /* ADDED */, 2 /* DELETED */];
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[83/*vs/platform/files/node/watcher/win32/watcherService*/], __M([0/*require*/,1/*exports*/,82/*vs/platform/files/node/watcher/win32/csharpWatcherService*/,3/*vs/base/common/path*/,16/*vs/base/common/strings*/]), function (require, exports, csharpWatcherService_1, path_1, strings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FileWatcher = void 0;
    class FileWatcher {
        constructor(folders, onDidFilesChange, onLogMessage, verboseLogging) {
            this.onDidFilesChange = onDidFilesChange;
            this.onLogMessage = onLogMessage;
            this.verboseLogging = verboseLogging;
            this.service = undefined;
            this.folder = folders[0];
            if (this.folder.path.indexOf('\\\\') === 0 && this.folder.path.endsWith(path_1.posix.sep)) {
                // for some weird reason, node adds a trailing slash to UNC paths
                // we never ever want trailing slashes as our base path unless
                // someone opens root ("/").
                // See also https://github.com/nodejs/io.js/issues/1765
                this.folder.path = strings_1.rtrim(this.folder.path, path_1.posix.sep);
            }
            this.service = this.startWatching();
        }
        get isDisposed() {
            return !this.service;
        }
        startWatching() {
            return new csharpWatcherService_1.OutOfProcessWin32FolderWatcher(this.folder.path, this.folder.excludes, events => this.onFileEvents(events), message => this.onLogMessage(message), this.verboseLogging);
        }
        setVerboseLogging(verboseLogging) {
            this.verboseLogging = verboseLogging;
            if (this.service) {
                this.service.dispose();
                this.service = this.startWatching();
            }
        }
        onFileEvents(events) {
            if (this.isDisposed) {
                return;
            }
            // Emit through event emitter
            if (events.length > 0) {
                this.onDidFilesChange(events);
            }
        }
        dispose() {
            if (this.service) {
                this.service.dispose();
                this.service = undefined;
            }
        }
    }
    exports.FileWatcher = FileWatcher;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[44/*vs/platform/instantiation/common/descriptors*/], __M([0/*require*/,1/*exports*/]), function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createSyncDescriptor = exports.SyncDescriptor = void 0;
    class SyncDescriptor {
        constructor(ctor, staticArguments = [], supportsDelayedInstantiation = false) {
            this.ctor = ctor;
            this.staticArguments = staticArguments;
            this.supportsDelayedInstantiation = supportsDelayedInstantiation;
        }
    }
    exports.SyncDescriptor = SyncDescriptor;
    const createSyncDescriptor = (ctor, ...staticArguments) => {
        return new SyncDescriptor(ctor, staticArguments);
    };
    exports.createSyncDescriptor = createSyncDescriptor;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[84/*vs/platform/instantiation/common/graph*/], __M([0/*require*/,1/*exports*/]), function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Graph = exports.Node = void 0;
    class Node {
        constructor(data) {
            this.incoming = new Map();
            this.outgoing = new Map();
            this.data = data;
        }
    }
    exports.Node = Node;
    class Graph {
        constructor(_hashFn) {
            this._hashFn = _hashFn;
            this._nodes = new Map();
            // empty
        }
        roots() {
            const ret = [];
            for (let node of this._nodes.values()) {
                if (node.outgoing.size === 0) {
                    ret.push(node);
                }
            }
            return ret;
        }
        insertEdge(from, to) {
            const fromNode = this.lookupOrInsertNode(from);
            const toNode = this.lookupOrInsertNode(to);
            fromNode.outgoing.set(this._hashFn(to), toNode);
            toNode.incoming.set(this._hashFn(from), fromNode);
        }
        removeNode(data) {
            const key = this._hashFn(data);
            this._nodes.delete(key);
            for (let node of this._nodes.values()) {
                node.outgoing.delete(key);
                node.incoming.delete(key);
            }
        }
        lookupOrInsertNode(data) {
            const key = this._hashFn(data);
            let node = this._nodes.get(key);
            if (!node) {
                node = new Node(data);
                this._nodes.set(key, node);
            }
            return node;
        }
        lookup(data) {
            return this._nodes.get(this._hashFn(data));
        }
        isEmpty() {
            return this._nodes.size === 0;
        }
        toString() {
            let data = [];
            for (let [key, value] of this._nodes) {
                data.push(`${key}, (incoming)[${[...value.incoming.keys()].join(', ')}], (outgoing)[${[...value.outgoing.keys()].join(',')}]`);
            }
            return data.join('\n');
        }
    }
    exports.Graph = Graph;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[85/*vs/platform/download/common/download*/], __M([0/*require*/,1/*exports*/,4/*vs/platform/instantiation/common/instantiation*/]), function (require, exports, instantiation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IDownloadService = void 0;
    exports.IDownloadService = instantiation_1.createDecorator('downloadService');
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[19/*vs/platform/environment/common/environment*/], __M([0/*require*/,1/*exports*/,4/*vs/platform/instantiation/common/instantiation*/]), function (require, exports, instantiation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.INativeEnvironmentService = exports.IEnvironmentService = void 0;
    exports.IEnvironmentService = instantiation_1.createDecorator('environmentService');
    exports.INativeEnvironmentService = instantiation_1.createDecorator('nativeEnvironmentService');
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[24/*vs/platform/extensionManagement/common/extensionManagement*/], __M([0/*require*/,1/*exports*/,69/*vs/nls!vs/platform/extensionManagement/common/extensionManagement*/,4/*vs/platform/instantiation/common/instantiation*/,9/*vs/base/common/network*/]), function (require, exports, nls_1, instantiation_1, network_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PreferencesLocalizedLabel = exports.PreferencesLabel = exports.ExtensionsChannelId = exports.ExtensionsLocalizedLabel = exports.ExtensionsLabel = exports.DefaultIconPath = exports.IExtensionTipsService = exports.IGlobalExtensionEnablementService = exports.ENABLED_EXTENSIONS_STORAGE_PATH = exports.DISABLED_EXTENSIONS_STORAGE_PATH = exports.IExtensionManagementService = exports.ExtensionManagementError = exports.INSTALL_ERROR_INCOMPATIBLE = exports.INSTALL_ERROR_MALICIOUS = exports.INSTALL_ERROR_NOT_SUPPORTED = exports.IExtensionGalleryService = exports.InstallOperation = exports.StatisticType = exports.SortOrder = exports.SortBy = exports.isIExtensionIdentifier = exports.EXTENSION_IDENTIFIER_REGEX = exports.EXTENSION_IDENTIFIER_PATTERN = void 0;
    exports.EXTENSION_IDENTIFIER_PATTERN = '^([a-z0-9A-Z][a-z0-9-A-Z]*)\\.([a-z0-9A-Z][a-z0-9-A-Z]*)$';
    exports.EXTENSION_IDENTIFIER_REGEX = new RegExp(exports.EXTENSION_IDENTIFIER_PATTERN);
    function isIExtensionIdentifier(thing) {
        return thing
            && typeof thing === 'object'
            && typeof thing.id === 'string'
            && (!thing.uuid || typeof thing.uuid === 'string');
    }
    exports.isIExtensionIdentifier = isIExtensionIdentifier;
    var SortBy;
    (function (SortBy) {
        SortBy[SortBy["NoneOrRelevance"] = 0] = "NoneOrRelevance";
        SortBy[SortBy["LastUpdatedDate"] = 1] = "LastUpdatedDate";
        SortBy[SortBy["Title"] = 2] = "Title";
        SortBy[SortBy["PublisherName"] = 3] = "PublisherName";
        SortBy[SortBy["InstallCount"] = 4] = "InstallCount";
        SortBy[SortBy["PublishedDate"] = 5] = "PublishedDate";
        SortBy[SortBy["AverageRating"] = 6] = "AverageRating";
        SortBy[SortBy["WeightedRating"] = 12] = "WeightedRating";
    })(SortBy = exports.SortBy || (exports.SortBy = {}));
    var SortOrder;
    (function (SortOrder) {
        SortOrder[SortOrder["Default"] = 0] = "Default";
        SortOrder[SortOrder["Ascending"] = 1] = "Ascending";
        SortOrder[SortOrder["Descending"] = 2] = "Descending";
    })(SortOrder = exports.SortOrder || (exports.SortOrder = {}));
    var StatisticType;
    (function (StatisticType) {
        StatisticType["Uninstall"] = "uninstall";
    })(StatisticType = exports.StatisticType || (exports.StatisticType = {}));
    var InstallOperation;
    (function (InstallOperation) {
        InstallOperation[InstallOperation["None"] = 0] = "None";
        InstallOperation[InstallOperation["Install"] = 1] = "Install";
        InstallOperation[InstallOperation["Update"] = 2] = "Update";
    })(InstallOperation = exports.InstallOperation || (exports.InstallOperation = {}));
    exports.IExtensionGalleryService = instantiation_1.createDecorator('extensionGalleryService');
    exports.INSTALL_ERROR_NOT_SUPPORTED = 'notsupported';
    exports.INSTALL_ERROR_MALICIOUS = 'malicious';
    exports.INSTALL_ERROR_INCOMPATIBLE = 'incompatible';
    class ExtensionManagementError extends Error {
        constructor(message, code) {
            super(message);
            this.code = code;
        }
    }
    exports.ExtensionManagementError = ExtensionManagementError;
    exports.IExtensionManagementService = instantiation_1.createDecorator('extensionManagementService');
    exports.DISABLED_EXTENSIONS_STORAGE_PATH = 'extensionsIdentifiers/disabled';
    exports.ENABLED_EXTENSIONS_STORAGE_PATH = 'extensionsIdentifiers/enabled';
    exports.IGlobalExtensionEnablementService = instantiation_1.createDecorator('IGlobalExtensionEnablementService');
    exports.IExtensionTipsService = instantiation_1.createDecorator('IExtensionTipsService');
    exports.DefaultIconPath = network_1.FileAccess.asBrowserUri('./media/defaultIcon.png', require).toString(true);
    exports.ExtensionsLabel = nls_1.localize(0, null);
    exports.ExtensionsLocalizedLabel = { value: exports.ExtensionsLabel, original: 'Extensions' };
    exports.ExtensionsChannelId = 'extensions';
    exports.PreferencesLabel = nls_1.localize(1, null);
    exports.PreferencesLocalizedLabel = { value: exports.PreferencesLabel, original: 'Preferences' };
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[34/*vs/platform/extensions/common/extensions*/], __M([0/*require*/,1/*exports*/,16/*vs/base/common/strings*/,4/*vs/platform/instantiation/common/instantiation*/]), function (require, exports, strings, instantiation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IBuiltinExtensionsScannerService = exports.isAuthenticaionProviderExtension = exports.isLanguagePackExtension = exports.ExtensionIdentifier = exports.ExtensionType = exports.EXTENSION_CATEGORIES = exports.isIExtensionIdentifier = exports.BUILTIN_MANIFEST_CACHE_FILE = exports.USER_MANIFEST_CACHE_FILE = exports.MANIFEST_CACHE_FOLDER = void 0;
    exports.MANIFEST_CACHE_FOLDER = 'CachedExtensions';
    exports.USER_MANIFEST_CACHE_FILE = 'user';
    exports.BUILTIN_MANIFEST_CACHE_FILE = 'builtin';
    function isIExtensionIdentifier(thing) {
        return thing
            && typeof thing === 'object'
            && typeof thing.id === 'string'
            && (!thing.uuid || typeof thing.uuid === 'string');
    }
    exports.isIExtensionIdentifier = isIExtensionIdentifier;
    exports.EXTENSION_CATEGORIES = [
        'Azure',
        'Data Science',
        'Debuggers',
        'Extension Packs',
        'Formatters',
        'Keymaps',
        'Language Packs',
        'Linters',
        'Machine Learning',
        'Notebooks',
        'Programming Languages',
        'SCM Providers',
        'Snippets',
        'Themes',
        'Testing',
        'Visualization',
        'Other',
    ];
    var ExtensionType;
    (function (ExtensionType) {
        ExtensionType[ExtensionType["System"] = 0] = "System";
        ExtensionType[ExtensionType["User"] = 1] = "User";
    })(ExtensionType = exports.ExtensionType || (exports.ExtensionType = {}));
    /**
     * **!Do not construct directly!**
     *
     * **!Only static methods because it gets serialized!**
     *
     * This represents the "canonical" version for an extension identifier. Extension ids
     * have to be case-insensitive (due to the marketplace), but we must ensure case
     * preservation because the extension API is already public at this time.
     *
     * For example, given an extension with the publisher `"Hello"` and the name `"World"`,
     * its canonical extension identifier is `"Hello.World"`. This extension could be
     * referenced in some other extension's dependencies using the string `"hello.world"`.
     *
     * To make matters more complicated, an extension can optionally have an UUID. When two
     * extensions have the same UUID, they are considered equal even if their identifier is different.
     */
    class ExtensionIdentifier {
        constructor(value) {
            this.value = value;
            this._lower = value.toLowerCase();
        }
        static equals(a, b) {
            if (typeof a === 'undefined' || a === null) {
                return (typeof b === 'undefined' || b === null);
            }
            if (typeof b === 'undefined' || b === null) {
                return false;
            }
            if (typeof a === 'string' || typeof b === 'string') {
                // At least one of the arguments is an extension id in string form,
                // so we have to use the string comparison which ignores case.
                let aValue = (typeof a === 'string' ? a : a.value);
                let bValue = (typeof b === 'string' ? b : b.value);
                return strings.equalsIgnoreCase(aValue, bValue);
            }
            // Now we know both arguments are ExtensionIdentifier
            return (a._lower === b._lower);
        }
        /**
         * Gives the value by which to index (for equality).
         */
        static toKey(id) {
            if (typeof id === 'string') {
                return id.toLowerCase();
            }
            return id._lower;
        }
    }
    exports.ExtensionIdentifier = ExtensionIdentifier;
    function isLanguagePackExtension(manifest) {
        return manifest.contributes && manifest.contributes.localizations ? manifest.contributes.localizations.length > 0 : false;
    }
    exports.isLanguagePackExtension = isLanguagePackExtension;
    function isAuthenticaionProviderExtension(manifest) {
        return manifest.contributes && manifest.contributes.authentication ? manifest.contributes.authentication.length > 0 : false;
    }
    exports.isAuthenticaionProviderExtension = isAuthenticaionProviderExtension;
    exports.IBuiltinExtensionsScannerService = instantiation_1.createDecorator('IBuiltinExtensionsScannerService');
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[25/*vs/platform/extensionManagement/common/extensionManagementUtil*/], __M([0/*require*/,1/*exports*/,16/*vs/base/common/strings*/,34/*vs/platform/extensions/common/extensions*/]), function (require, exports, strings_1, extensions_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getMaliciousExtensionsSet = exports.BetterMergeId = exports.getGalleryExtensionTelemetryData = exports.getLocalExtensionTelemetryData = exports.groupByExtension = exports.getGalleryExtensionId = exports.adoptToGalleryExtensionId = exports.ExtensionIdentifierWithVersion = exports.areSameExtensions = void 0;
    function areSameExtensions(a, b) {
        if (a.uuid && b.uuid) {
            return a.uuid === b.uuid;
        }
        if (a.id === b.id) {
            return true;
        }
        return strings_1.compareIgnoreCase(a.id, b.id) === 0;
    }
    exports.areSameExtensions = areSameExtensions;
    class ExtensionIdentifierWithVersion {
        constructor(identifier, version) {
            this.identifier = identifier;
            this.version = version;
        }
        key() {
            return `${this.identifier.id}-${this.version}`;
        }
        equals(o) {
            if (!(o instanceof ExtensionIdentifierWithVersion)) {
                return false;
            }
            return areSameExtensions(this.identifier, o.identifier) && this.version === o.version;
        }
    }
    exports.ExtensionIdentifierWithVersion = ExtensionIdentifierWithVersion;
    function adoptToGalleryExtensionId(id) {
        return id.toLocaleLowerCase();
    }
    exports.adoptToGalleryExtensionId = adoptToGalleryExtensionId;
    function getGalleryExtensionId(publisher, name) {
        return `${publisher.toLocaleLowerCase()}.${name.toLocaleLowerCase()}`;
    }
    exports.getGalleryExtensionId = getGalleryExtensionId;
    function groupByExtension(extensions, getExtensionIdentifier) {
        const byExtension = [];
        const findGroup = (extension) => {
            for (const group of byExtension) {
                if (group.some(e => areSameExtensions(getExtensionIdentifier(e), getExtensionIdentifier(extension)))) {
                    return group;
                }
            }
            return null;
        };
        for (const extension of extensions) {
            const group = findGroup(extension);
            if (group) {
                group.push(extension);
            }
            else {
                byExtension.push([extension]);
            }
        }
        return byExtension;
    }
    exports.groupByExtension = groupByExtension;
    function getLocalExtensionTelemetryData(extension) {
        return {
            id: extension.identifier.id,
            name: extension.manifest.name,
            galleryId: null,
            publisherId: extension.publisherId,
            publisherName: extension.manifest.publisher,
            publisherDisplayName: extension.publisherDisplayName,
            dependencies: extension.manifest.extensionDependencies && extension.manifest.extensionDependencies.length > 0
        };
    }
    exports.getLocalExtensionTelemetryData = getLocalExtensionTelemetryData;
    /* __GDPR__FRAGMENT__
        "GalleryExtensionTelemetryData" : {
            "id" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" },
            "name": { "classification": "SystemMetaData", "purpose": "FeatureInsight" },
            "galleryId": { "classification": "SystemMetaData", "purpose": "FeatureInsight" },
            "publisherId": { "classification": "SystemMetaData", "purpose": "FeatureInsight" },
            "publisherName": { "classification": "SystemMetaData", "purpose": "FeatureInsight" },
            "publisherDisplayName": { "classification": "SystemMetaData", "purpose": "FeatureInsight" },
            "dependencies": { "classification": "SystemMetaData", "purpose": "FeatureInsight", "isMeasurement": true },
            "${include}": [
                "${GalleryExtensionTelemetryData2}"
            ]
        }
    */
    function getGalleryExtensionTelemetryData(extension) {
        return Object.assign({ id: extension.identifier.id, name: extension.name, galleryId: extension.identifier.uuid, publisherId: extension.publisherId, publisherName: extension.publisher, publisherDisplayName: extension.publisherDisplayName, dependencies: !!(extension.properties.dependencies && extension.properties.dependencies.length > 0) }, extension.telemetryData);
    }
    exports.getGalleryExtensionTelemetryData = getGalleryExtensionTelemetryData;
    exports.BetterMergeId = new extensions_1.ExtensionIdentifier('pprice.better-merge');
    function getMaliciousExtensionsSet(report) {
        const result = new Set();
        for (const extension of report) {
            if (extension.malicious) {
                result.add(extension.id.id);
            }
        }
        return result;
    }
    exports.getMaliciousExtensionsSet = getMaliciousExtensionsSet;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[86/*vs/platform/extensionManagement/node/extensionsManifestCache*/], __M([0/*require*/,1/*exports*/,2/*vs/base/common/lifecycle*/,3/*vs/base/common/path*/,34/*vs/platform/extensions/common/extensions*/,10/*vs/base/node/pfs*/]), function (require, exports, lifecycle_1, path_1, extensions_1, pfs) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExtensionsManifestCache = void 0;
    class ExtensionsManifestCache extends lifecycle_1.Disposable {
        constructor(environmentService, extensionsManagementService) {
            super();
            this.environmentService = environmentService;
            this.extensionsManifestCache = path_1.join(this.environmentService.userDataPath, extensions_1.MANIFEST_CACHE_FOLDER, extensions_1.USER_MANIFEST_CACHE_FILE);
            this._register(extensionsManagementService.onDidInstallExtension(e => this.onDidInstallExtension(e)));
            this._register(extensionsManagementService.onDidUninstallExtension(e => this.onDidUnInstallExtension(e)));
        }
        onDidInstallExtension(e) {
            if (!e.error) {
                this.invalidate();
            }
        }
        onDidUnInstallExtension(e) {
            if (!e.error) {
                this.invalidate();
            }
        }
        invalidate() {
            pfs.rimraf(this.extensionsManifestCache, pfs.RimRafMode.MOVE).then(() => { }, () => { });
        }
    }
    exports.ExtensionsManifestCache = ExtensionsManifestCache;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[45/*vs/platform/files/common/io*/], __M([0/*require*/,1/*exports*/,75/*vs/nls!vs/platform/files/common/io*/,15/*vs/base/common/buffer*/,26/*vs/platform/files/common/files*/,20/*vs/base/common/errors*/]), function (require, exports, nls_1, buffer_1, files_1, errors_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.readFileIntoStream = void 0;
    /**
     * A helper to read a file from a provider with open/read/close capability into a stream.
     */
    async function readFileIntoStream(provider, resource, target, transformer, options, token) {
        let error = undefined;
        try {
            await doReadFileIntoStream(provider, resource, target, transformer, options, token);
        }
        catch (err) {
            error = err;
        }
        finally {
            if (error && options.errorTransformer) {
                error = options.errorTransformer(error);
            }
            target.end(error);
        }
    }
    exports.readFileIntoStream = readFileIntoStream;
    async function doReadFileIntoStream(provider, resource, target, transformer, options, token) {
        // Check for cancellation
        throwIfCancelled(token);
        // open handle through provider
        const handle = await provider.open(resource, { create: false });
        // Check for cancellation
        throwIfCancelled(token);
        try {
            let totalBytesRead = 0;
            let bytesRead = 0;
            let allowedRemainingBytes = (options && typeof options.length === 'number') ? options.length : undefined;
            let buffer = buffer_1.VSBuffer.alloc(Math.min(options.bufferSize, typeof allowedRemainingBytes === 'number' ? allowedRemainingBytes : options.bufferSize));
            let posInFile = options && typeof options.position === 'number' ? options.position : 0;
            let posInBuffer = 0;
            do {
                // read from source (handle) at current position (pos) into buffer (buffer) at
                // buffer position (posInBuffer) up to the size of the buffer (buffer.byteLength).
                bytesRead = await provider.read(handle, posInFile, buffer.buffer, posInBuffer, buffer.byteLength - posInBuffer);
                posInFile += bytesRead;
                posInBuffer += bytesRead;
                totalBytesRead += bytesRead;
                if (typeof allowedRemainingBytes === 'number') {
                    allowedRemainingBytes -= bytesRead;
                }
                // when buffer full, create a new one and emit it through stream
                if (posInBuffer === buffer.byteLength) {
                    await target.write(transformer(buffer));
                    buffer = buffer_1.VSBuffer.alloc(Math.min(options.bufferSize, typeof allowedRemainingBytes === 'number' ? allowedRemainingBytes : options.bufferSize));
                    posInBuffer = 0;
                }
            } while (bytesRead > 0 && (typeof allowedRemainingBytes !== 'number' || allowedRemainingBytes > 0) && throwIfCancelled(token) && throwIfTooLarge(totalBytesRead, options));
            // wrap up with last buffer (also respect maxBytes if provided)
            if (posInBuffer > 0) {
                let lastChunkLength = posInBuffer;
                if (typeof allowedRemainingBytes === 'number') {
                    lastChunkLength = Math.min(posInBuffer, allowedRemainingBytes);
                }
                target.write(transformer(buffer.slice(0, lastChunkLength)));
            }
        }
        catch (error) {
            throw files_1.ensureFileSystemProviderError(error);
        }
        finally {
            await provider.close(handle);
        }
    }
    function throwIfCancelled(token) {
        if (token.isCancellationRequested) {
            throw errors_1.canceled();
        }
        return true;
    }
    function throwIfTooLarge(totalBytesRead, options) {
        // Return early if file is too large to load and we have configured limits
        if (options === null || options === void 0 ? void 0 : options.limits) {
            if (typeof options.limits.memory === 'number' && totalBytesRead > options.limits.memory) {
                throw files_1.createFileSystemProviderError(nls_1.localize(0, null), files_1.FileSystemProviderErrorCode.FileExceedsMemoryLimit);
            }
            if (typeof options.limits.size === 'number' && totalBytesRead > options.limits.size) {
                throw files_1.createFileSystemProviderError(nls_1.localize(1, null), files_1.FileSystemProviderErrorCode.FileTooLarge);
            }
        }
        return true;
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[46/*vs/platform/files/node/watcher/watcher*/], __M([0/*require*/,1/*exports*/,13/*vs/base/common/uri*/,26/*vs/platform/files/common/files*/,14/*vs/base/common/platform*/]), function (require, exports, uri_1, files_1, platform_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.normalizeFileChanges = exports.toFileChanges = void 0;
    function toFileChanges(changes) {
        return changes.map(change => ({
            type: change.type,
            resource: uri_1.URI.file(change.path)
        }));
    }
    exports.toFileChanges = toFileChanges;
    function normalizeFileChanges(changes) {
        // Build deltas
        const normalizer = new EventNormalizer();
        for (const event of changes) {
            normalizer.processEvent(event);
        }
        return normalizer.normalize();
    }
    exports.normalizeFileChanges = normalizeFileChanges;
    class EventNormalizer {
        constructor() {
            this.normalized = [];
            this.mapPathToChange = new Map();
        }
        processEvent(event) {
            const existingEvent = this.mapPathToChange.get(event.path);
            // Event path already exists
            if (existingEvent) {
                const currentChangeType = existingEvent.type;
                const newChangeType = event.type;
                // ignore CREATE followed by DELETE in one go
                if (currentChangeType === 1 /* ADDED */ && newChangeType === 2 /* DELETED */) {
                    this.mapPathToChange.delete(event.path);
                    this.normalized.splice(this.normalized.indexOf(existingEvent), 1);
                }
                // flatten DELETE followed by CREATE into CHANGE
                else if (currentChangeType === 2 /* DELETED */ && newChangeType === 1 /* ADDED */) {
                    existingEvent.type = 0 /* UPDATED */;
                }
                // Do nothing. Keep the created event
                else if (currentChangeType === 1 /* ADDED */ && newChangeType === 0 /* UPDATED */) { }
                // Otherwise apply change type
                else {
                    existingEvent.type = newChangeType;
                }
            }
            // Otherwise store new
            else {
                this.normalized.push(event);
                this.mapPathToChange.set(event.path, event);
            }
        }
        normalize() {
            const addedChangeEvents = [];
            const deletedPaths = [];
            // This algorithm will remove all DELETE events up to the root folder
            // that got deleted if any. This ensures that we are not producing
            // DELETE events for each file inside a folder that gets deleted.
            //
            // 1.) split ADD/CHANGE and DELETED events
            // 2.) sort short deleted paths to the top
            // 3.) for each DELETE, check if there is a deleted parent and ignore the event in that case
            return this.normalized.filter(e => {
                if (e.type !== 2 /* DELETED */) {
                    addedChangeEvents.push(e);
                    return false; // remove ADD / CHANGE
                }
                return true; // keep DELETE
            }).sort((e1, e2) => {
                return e1.path.length - e2.path.length; // shortest path first
            }).filter(e => {
                if (deletedPaths.some(d => files_1.isParent(e.path, d, !platform_1.isLinux /* ignorecase */))) {
                    return false; // DELETE is ignored if parent is deleted already
                }
                // otherwise mark as deleted
                deletedPaths.push(e.path);
                return true;
            }).concat(addedChangeEvents);
        }
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[87/*vs/platform/files/node/watcher/nodejs/watcherService*/], __M([0/*require*/,1/*exports*/,46/*vs/platform/files/node/watcher/watcher*/,2/*vs/base/common/lifecycle*/,10/*vs/base/node/pfs*/,59/*vs/base/node/extpath*/,60/*vs/base/node/watcher*/,12/*vs/base/common/async*/,3/*vs/base/common/path*/]), function (require, exports, watcher_1, lifecycle_1, pfs_1, extpath_1, watcher_2, async_1, path_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FileWatcher = void 0;
    class FileWatcher extends lifecycle_1.Disposable {
        constructor(path, onDidFilesChange, onLogMessage, verboseLogging) {
            super();
            this.path = path;
            this.onDidFilesChange = onDidFilesChange;
            this.onLogMessage = onLogMessage;
            this.verboseLogging = verboseLogging;
            this.fileChangesDelayer = this._register(new async_1.ThrottledDelayer(watcher_2.CHANGE_BUFFER_DELAY * 2 /* sync on delay from underlying library */));
            this.fileChangesBuffer = [];
            this.startWatching();
        }
        setVerboseLogging(verboseLogging) {
            this.verboseLogging = verboseLogging;
        }
        async startWatching() {
            try {
                const { stat, symbolicLink } = await pfs_1.statLink(this.path);
                if (this.isDisposed) {
                    return;
                }
                let pathToWatch = this.path;
                if (symbolicLink) {
                    try {
                        pathToWatch = await extpath_1.realpath(pathToWatch);
                    }
                    catch (error) {
                        this.onError(error);
                    }
                }
                // Watch Folder
                if (stat.isDirectory()) {
                    this._register(watcher_2.watchFolder(pathToWatch, (eventType, path) => {
                        this.onFileChange({
                            type: eventType === 'changed' ? 0 /* UPDATED */ : eventType === 'added' ? 1 /* ADDED */ : 2 /* DELETED */,
                            path: path_1.join(this.path, path_1.basename(path)) // ensure path is identical with what was passed in
                        });
                    }, error => this.onError(error)));
                }
                // Watch File
                else {
                    this._register(watcher_2.watchFile(pathToWatch, eventType => {
                        this.onFileChange({
                            type: eventType === 'changed' ? 0 /* UPDATED */ : 2 /* DELETED */,
                            path: this.path // ensure path is identical with what was passed in
                        });
                    }, error => this.onError(error)));
                }
            }
            catch (error) {
                this.onError(error);
            }
        }
        onFileChange(event) {
            // Add to buffer
            this.fileChangesBuffer.push(event);
            // Logging
            if (this.verboseLogging) {
                this.onVerbose(`${event.type === 1 /* ADDED */ ? '[ADDED]' : event.type === 2 /* DELETED */ ? '[DELETED]' : '[CHANGED]'} ${event.path}`);
            }
            // Handle emit through delayer to accommodate for bulk changes and thus reduce spam
            this.fileChangesDelayer.trigger(async () => {
                const fileChanges = this.fileChangesBuffer;
                this.fileChangesBuffer = [];
                // Event normalization
                const normalizedFileChanges = watcher_1.normalizeFileChanges(fileChanges);
                // Logging
                if (this.verboseLogging) {
                    normalizedFileChanges.forEach(event => {
                        this.onVerbose(`>> normalized ${event.type === 1 /* ADDED */ ? '[ADDED]' : event.type === 2 /* DELETED */ ? '[DELETED]' : '[CHANGED]'} ${event.path}`);
                    });
                }
                // Fire
                if (normalizedFileChanges.length > 0) {
                    this.onDidFilesChange(normalizedFileChanges);
                }
            });
        }
        onError(error) {
            if (!this.isDisposed) {
                this.onLogMessage({ type: 'error', message: `[File Watcher (node.js)] ${error}` });
            }
        }
        onVerbose(message) {
            if (!this.isDisposed) {
                this.onLogMessage({ type: 'trace', message: `[File Watcher (node.js)] ${message}` });
            }
        }
        dispose() {
            this.isDisposed = true;
            super.dispose();
        }
    }
    exports.FileWatcher = FileWatcher;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[47/*vs/platform/instantiation/common/serviceCollection*/], __M([0/*require*/,1/*exports*/]), function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ServiceCollection = void 0;
    class ServiceCollection {
        constructor(...entries) {
            this._entries = new Map();
            for (let [id, service] of entries) {
                this.set(id, service);
            }
        }
        set(id, instanceOrDescriptor) {
            const result = this._entries.get(id);
            this._entries.set(id, instanceOrDescriptor);
            return result;
        }
        has(id) {
            return this._entries.has(id);
        }
        get(id) {
            return this._entries.get(id);
        }
    }
    exports.ServiceCollection = ServiceCollection;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[88/*vs/platform/instantiation/common/instantiationService*/], __M([0/*require*/,1/*exports*/,20/*vs/base/common/errors*/,84/*vs/platform/instantiation/common/graph*/,44/*vs/platform/instantiation/common/descriptors*/,4/*vs/platform/instantiation/common/instantiation*/,47/*vs/platform/instantiation/common/serviceCollection*/,12/*vs/base/common/async*/]), function (require, exports, errors_1, graph_1, descriptors_1, instantiation_1, serviceCollection_1, async_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InstantiationService = void 0;
    // TRACING
    const _enableTracing = false;
    class CyclicDependencyError extends Error {
        constructor(graph) {
            super('cyclic dependency between services');
            this.message = graph.toString();
        }
    }
    class InstantiationService {
        constructor(services = new serviceCollection_1.ServiceCollection(), strict = false, parent) {
            this._services = services;
            this._strict = strict;
            this._parent = parent;
            this._services.set(instantiation_1.IInstantiationService, this);
        }
        createChild(services) {
            return new InstantiationService(services, this._strict, this);
        }
        invokeFunction(fn, ...args) {
            let _trace = Trace.traceInvocation(fn);
            let _done = false;
            try {
                const accessor = {
                    get: (id, isOptional) => {
                        if (_done) {
                            throw errors_1.illegalState('service accessor is only valid during the invocation of its target method');
                        }
                        const result = this._getOrCreateServiceInstance(id, _trace);
                        if (!result && isOptional !== instantiation_1.optional) {
                            throw new Error(`[invokeFunction] unknown service '${id}'`);
                        }
                        return result;
                    }
                };
                return fn(accessor, ...args);
            }
            finally {
                _done = true;
                _trace.stop();
            }
        }
        createInstance(ctorOrDescriptor, ...rest) {
            let _trace;
            let result;
            if (ctorOrDescriptor instanceof descriptors_1.SyncDescriptor) {
                _trace = Trace.traceCreation(ctorOrDescriptor.ctor);
                result = this._createInstance(ctorOrDescriptor.ctor, ctorOrDescriptor.staticArguments.concat(rest), _trace);
            }
            else {
                _trace = Trace.traceCreation(ctorOrDescriptor);
                result = this._createInstance(ctorOrDescriptor, rest, _trace);
            }
            _trace.stop();
            return result;
        }
        _createInstance(ctor, args = [], _trace) {
            // arguments defined by service decorators
            let serviceDependencies = instantiation_1._util.getServiceDependencies(ctor).sort((a, b) => a.index - b.index);
            let serviceArgs = [];
            for (const dependency of serviceDependencies) {
                let service = this._getOrCreateServiceInstance(dependency.id, _trace);
                if (!service && this._strict && !dependency.optional) {
                    throw new Error(`[createInstance] ${ctor.name} depends on UNKNOWN service ${dependency.id}.`);
                }
                serviceArgs.push(service);
            }
            let firstServiceArgPos = serviceDependencies.length > 0 ? serviceDependencies[0].index : args.length;
            // check for argument mismatches, adjust static args if needed
            if (args.length !== firstServiceArgPos) {
                console.warn(`[createInstance] First service dependency of ${ctor.name} at position ${firstServiceArgPos + 1} conflicts with ${args.length} static arguments`);
                let delta = firstServiceArgPos - args.length;
                if (delta > 0) {
                    args = args.concat(new Array(delta));
                }
                else {
                    args = args.slice(0, firstServiceArgPos);
                }
            }
            // now create the instance
            return new ctor(...[...args, ...serviceArgs]);
        }
        _setServiceInstance(id, instance) {
            if (this._services.get(id) instanceof descriptors_1.SyncDescriptor) {
                this._services.set(id, instance);
            }
            else if (this._parent) {
                this._parent._setServiceInstance(id, instance);
            }
            else {
                throw new Error('illegalState - setting UNKNOWN service instance');
            }
        }
        _getServiceInstanceOrDescriptor(id) {
            let instanceOrDesc = this._services.get(id);
            if (!instanceOrDesc && this._parent) {
                return this._parent._getServiceInstanceOrDescriptor(id);
            }
            else {
                return instanceOrDesc;
            }
        }
        _getOrCreateServiceInstance(id, _trace) {
            let thing = this._getServiceInstanceOrDescriptor(id);
            if (thing instanceof descriptors_1.SyncDescriptor) {
                return this._createAndCacheServiceInstance(id, thing, _trace.branch(id, true));
            }
            else {
                _trace.branch(id, false);
                return thing;
            }
        }
        _createAndCacheServiceInstance(id, desc, _trace) {
            const graph = new graph_1.Graph(data => data.id.toString());
            let cycleCount = 0;
            const stack = [{ id, desc, _trace }];
            while (stack.length) {
                const item = stack.pop();
                graph.lookupOrInsertNode(item);
                // a weak but working heuristic for cycle checks
                if (cycleCount++ > 1000) {
                    throw new CyclicDependencyError(graph);
                }
                // check all dependencies for existence and if they need to be created first
                for (let dependency of instantiation_1._util.getServiceDependencies(item.desc.ctor)) {
                    let instanceOrDesc = this._getServiceInstanceOrDescriptor(dependency.id);
                    if (!instanceOrDesc && !dependency.optional) {
                        console.warn(`[createInstance] ${id} depends on ${dependency.id} which is NOT registered.`);
                    }
                    if (instanceOrDesc instanceof descriptors_1.SyncDescriptor) {
                        const d = { id: dependency.id, desc: instanceOrDesc, _trace: item._trace.branch(dependency.id, true) };
                        graph.insertEdge(item, d);
                        stack.push(d);
                    }
                }
            }
            while (true) {
                const roots = graph.roots();
                // if there is no more roots but still
                // nodes in the graph we have a cycle
                if (roots.length === 0) {
                    if (!graph.isEmpty()) {
                        throw new CyclicDependencyError(graph);
                    }
                    break;
                }
                for (const { data } of roots) {
                    // Repeat the check for this still being a service sync descriptor. That's because
                    // instantiating a dependency might have side-effect and recursively trigger instantiation
                    // so that some dependencies are now fullfilled already.
                    const instanceOrDesc = this._getServiceInstanceOrDescriptor(data.id);
                    if (instanceOrDesc instanceof descriptors_1.SyncDescriptor) {
                        // create instance and overwrite the service collections
                        const instance = this._createServiceInstanceWithOwner(data.id, data.desc.ctor, data.desc.staticArguments, data.desc.supportsDelayedInstantiation, data._trace);
                        this._setServiceInstance(data.id, instance);
                    }
                    graph.removeNode(data);
                }
            }
            return this._getServiceInstanceOrDescriptor(id);
        }
        _createServiceInstanceWithOwner(id, ctor, args = [], supportsDelayedInstantiation, _trace) {
            if (this._services.get(id) instanceof descriptors_1.SyncDescriptor) {
                return this._createServiceInstance(ctor, args, supportsDelayedInstantiation, _trace);
            }
            else if (this._parent) {
                return this._parent._createServiceInstanceWithOwner(id, ctor, args, supportsDelayedInstantiation, _trace);
            }
            else {
                throw new Error(`illegalState - creating UNKNOWN service instance ${ctor.name}`);
            }
        }
        _createServiceInstance(ctor, args = [], _supportsDelayedInstantiation, _trace) {
            if (!_supportsDelayedInstantiation) {
                // eager instantiation
                return this._createInstance(ctor, args, _trace);
            }
            else {
                // Return a proxy object that's backed by an idle value. That
                // strategy is to instantiate services in our idle time or when actually
                // needed but not when injected into a consumer
                const idle = new async_1.IdleValue(() => this._createInstance(ctor, args, _trace));
                return new Proxy(Object.create(null), {
                    get(target, key) {
                        if (key in target) {
                            return target[key];
                        }
                        let obj = idle.value;
                        let prop = obj[key];
                        if (typeof prop !== 'function') {
                            return prop;
                        }
                        prop = prop.bind(obj);
                        target[key] = prop;
                        return prop;
                    },
                    set(_target, p, value) {
                        idle.value[p] = value;
                        return true;
                    }
                });
            }
        }
    }
    exports.InstantiationService = InstantiationService;
    //#region -- tracing ---
    var TraceType;
    (function (TraceType) {
        TraceType[TraceType["Creation"] = 0] = "Creation";
        TraceType[TraceType["Invocation"] = 1] = "Invocation";
        TraceType[TraceType["Branch"] = 2] = "Branch";
    })(TraceType || (TraceType = {}));
    class Trace {
        constructor(type, name) {
            this.type = type;
            this.name = name;
            this._start = Date.now();
            this._dep = [];
        }
        static traceInvocation(ctor) {
            return !_enableTracing ? Trace._None : new Trace(1 /* Invocation */, ctor.name || ctor.toString().substring(0, 42).replace(/\n/g, ''));
        }
        static traceCreation(ctor) {
            return !_enableTracing ? Trace._None : new Trace(0 /* Creation */, ctor.name);
        }
        branch(id, first) {
            let child = new Trace(2 /* Branch */, id.toString());
            this._dep.push([id, first, child]);
            return child;
        }
        stop() {
            let dur = Date.now() - this._start;
            Trace._totals += dur;
            let causedCreation = false;
            function printChild(n, trace) {
                let res = [];
                let prefix = new Array(n + 1).join('\t');
                for (const [id, first, child] of trace._dep) {
                    if (first && child) {
                        causedCreation = true;
                        res.push(`${prefix}CREATES -> ${id}`);
                        let nested = printChild(n + 1, child);
                        if (nested) {
                            res.push(nested);
                        }
                    }
                    else {
                        res.push(`${prefix}uses -> ${id}`);
                    }
                }
                return res.join('\n');
            }
            let lines = [
                `${this.type === 0 /* Creation */ ? 'CREATE' : 'CALL'} ${this.name}`,
                `${printChild(1, this)}`,
                `DONE, took ${dur.toFixed(2)}ms (grand total ${Trace._totals.toFixed(2)}ms)`
            ];
            if (dur > 2 || causedCreation) {
                console.log(lines.join('\n'));
            }
        }
    }
    Trace._None = new class extends Trace {
        constructor() { super(-1, null); }
        stop() { }
        branch() { return this; }
    };
    Trace._totals = 0;
});
//#endregion

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[89/*vs/platform/localizations/common/localizations*/], __M([0/*require*/,1/*exports*/,4/*vs/platform/instantiation/common/instantiation*/]), function (require, exports, instantiation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isValidLocalization = exports.ILocalizationsService = void 0;
    exports.ILocalizationsService = instantiation_1.createDecorator('localizationsService');
    function isValidLocalization(localization) {
        if (typeof localization.languageId !== 'string') {
            return false;
        }
        if (!Array.isArray(localization.translations) || localization.translations.length === 0) {
            return false;
        }
        for (const translation of localization.translations) {
            if (typeof translation.id !== 'string') {
                return false;
            }
            if (typeof translation.path !== 'string') {
                return false;
            }
        }
        if (localization.languageName && typeof localization.languageName !== 'string') {
            return false;
        }
        if (localization.localizedLanguageName && typeof localization.localizedLanguageName !== 'string') {
            return false;
        }
        return true;
    }
    exports.isValidLocalization = isValidLocalization;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[7/*vs/platform/log/common/log*/], __M([0/*require*/,1/*exports*/,4/*vs/platform/instantiation/common/instantiation*/,2/*vs/base/common/lifecycle*/,14/*vs/base/common/platform*/,11/*vs/base/common/event*/,32/*vs/base/common/errorMessage*/]), function (require, exports, instantiation_1, lifecycle_1, platform_1, event_1, errorMessage_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getLogLevel = exports.NullLogService = exports.DelegatedLogService = exports.MultiplexLogService = exports.ConsoleLogInMainService = exports.LogServiceAdapter = exports.ConsoleLogService = exports.ConsoleLogMainService = exports.AbstractLogService = exports.DEFAULT_LOG_LEVEL = exports.LogLevel = exports.ILoggerService = exports.ILogService = void 0;
    exports.ILogService = instantiation_1.createDecorator('logService');
    exports.ILoggerService = instantiation_1.createDecorator('loggerService');
    function now() {
        return new Date().toISOString();
    }
    var LogLevel;
    (function (LogLevel) {
        LogLevel[LogLevel["Trace"] = 0] = "Trace";
        LogLevel[LogLevel["Debug"] = 1] = "Debug";
        LogLevel[LogLevel["Info"] = 2] = "Info";
        LogLevel[LogLevel["Warning"] = 3] = "Warning";
        LogLevel[LogLevel["Error"] = 4] = "Error";
        LogLevel[LogLevel["Critical"] = 5] = "Critical";
        LogLevel[LogLevel["Off"] = 6] = "Off";
    })(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
    exports.DEFAULT_LOG_LEVEL = LogLevel.Info;
    class AbstractLogService extends lifecycle_1.Disposable {
        constructor() {
            super(...arguments);
            this.level = exports.DEFAULT_LOG_LEVEL;
            this._onDidChangeLogLevel = this._register(new event_1.Emitter());
            this.onDidChangeLogLevel = this._onDidChangeLogLevel.event;
        }
        setLevel(level) {
            if (this.level !== level) {
                this.level = level;
                this._onDidChangeLogLevel.fire(this.level);
            }
        }
        getLevel() {
            return this.level;
        }
    }
    exports.AbstractLogService = AbstractLogService;
    class ConsoleLogMainService extends AbstractLogService {
        constructor(logLevel = exports.DEFAULT_LOG_LEVEL) {
            super();
            this.setLevel(logLevel);
            this.useColors = !platform_1.isWindows;
        }
        trace(message, ...args) {
            if (this.getLevel() <= LogLevel.Trace) {
                if (this.useColors) {
                    console.log(`\x1b[90m[main ${now()}]\x1b[0m`, message, ...args);
                }
                else {
                    console.log(`[main ${now()}]`, message, ...args);
                }
            }
        }
        debug(message, ...args) {
            if (this.getLevel() <= LogLevel.Debug) {
                if (this.useColors) {
                    console.log(`\x1b[90m[main ${now()}]\x1b[0m`, message, ...args);
                }
                else {
                    console.log(`[main ${now()}]`, message, ...args);
                }
            }
        }
        info(message, ...args) {
            if (this.getLevel() <= LogLevel.Info) {
                if (this.useColors) {
                    console.log(`\x1b[90m[main ${now()}]\x1b[0m`, message, ...args);
                }
                else {
                    console.log(`[main ${now()}]`, message, ...args);
                }
            }
        }
        warn(message, ...args) {
            if (this.getLevel() <= LogLevel.Warning) {
                if (this.useColors) {
                    console.warn(`\x1b[93m[main ${now()}]\x1b[0m`, message, ...args);
                }
                else {
                    console.warn(`[main ${now()}]`, message, ...args);
                }
            }
        }
        error(message, ...args) {
            if (this.getLevel() <= LogLevel.Error) {
                if (this.useColors) {
                    console.error(`\x1b[91m[main ${now()}]\x1b[0m`, message, ...args);
                }
                else {
                    console.error(`[main ${now()}]`, message, ...args);
                }
            }
        }
        critical(message, ...args) {
            if (this.getLevel() <= LogLevel.Critical) {
                if (this.useColors) {
                    console.error(`\x1b[90m[main ${now()}]\x1b[0m`, message, ...args);
                }
                else {
                    console.error(`[main ${now()}]`, message, ...args);
                }
            }
        }
        dispose() {
            // noop
        }
        flush() {
            // noop
        }
    }
    exports.ConsoleLogMainService = ConsoleLogMainService;
    class ConsoleLogService extends AbstractLogService {
        constructor(logLevel = exports.DEFAULT_LOG_LEVEL) {
            super();
            this.setLevel(logLevel);
        }
        trace(message, ...args) {
            if (this.getLevel() <= LogLevel.Trace) {
                console.log('%cTRACE', 'color: #888', message, ...args);
            }
        }
        debug(message, ...args) {
            if (this.getLevel() <= LogLevel.Debug) {
                console.log('%cDEBUG', 'background: #eee; color: #888', message, ...args);
            }
        }
        info(message, ...args) {
            if (this.getLevel() <= LogLevel.Info) {
                console.log('%c INFO', 'color: #33f', message, ...args);
            }
        }
        warn(message, ...args) {
            if (this.getLevel() <= LogLevel.Warning) {
                console.log('%c WARN', 'color: #993', message, ...args);
            }
        }
        error(message, ...args) {
            if (this.getLevel() <= LogLevel.Error) {
                console.log('%c  ERR', 'color: #f33', message, ...args);
            }
        }
        critical(message, ...args) {
            if (this.getLevel() <= LogLevel.Critical) {
                console.log('%cCRITI', 'background: #f33; color: white', message, ...args);
            }
        }
        dispose() {
            // noop
        }
        flush() {
            // noop
        }
    }
    exports.ConsoleLogService = ConsoleLogService;
    class LogServiceAdapter extends AbstractLogService {
        constructor(adapter, logLevel = exports.DEFAULT_LOG_LEVEL) {
            super();
            this.adapter = adapter;
            this.setLevel(logLevel);
        }
        trace(message, ...args) {
            if (this.getLevel() <= LogLevel.Trace) {
                this.adapter.consoleLog('trace', [this.extractMessage(message), ...args]);
            }
        }
        debug(message, ...args) {
            if (this.getLevel() <= LogLevel.Debug) {
                this.adapter.consoleLog('debug', [this.extractMessage(message), ...args]);
            }
        }
        info(message, ...args) {
            if (this.getLevel() <= LogLevel.Info) {
                this.adapter.consoleLog('info', [this.extractMessage(message), ...args]);
            }
        }
        warn(message, ...args) {
            if (this.getLevel() <= LogLevel.Warning) {
                this.adapter.consoleLog('warn', [this.extractMessage(message), ...args]);
            }
        }
        error(message, ...args) {
            if (this.getLevel() <= LogLevel.Error) {
                this.adapter.consoleLog('error', [this.extractMessage(message), ...args]);
            }
        }
        critical(message, ...args) {
            if (this.getLevel() <= LogLevel.Critical) {
                this.adapter.consoleLog('critical', [this.extractMessage(message), ...args]);
            }
        }
        extractMessage(msg) {
            if (typeof msg === 'string') {
                return msg;
            }
            return errorMessage_1.toErrorMessage(msg, this.getLevel() <= LogLevel.Trace);
        }
        dispose() {
            // noop
        }
        flush() {
            // noop
        }
    }
    exports.LogServiceAdapter = LogServiceAdapter;
    class ConsoleLogInMainService extends LogServiceAdapter {
        constructor(client, logLevel = exports.DEFAULT_LOG_LEVEL) {
            super({ consoleLog: (type, args) => client.consoleLog(type, args) }, logLevel);
        }
    }
    exports.ConsoleLogInMainService = ConsoleLogInMainService;
    class MultiplexLogService extends AbstractLogService {
        constructor(logServices) {
            super();
            this.logServices = logServices;
            if (logServices.length) {
                this.setLevel(logServices[0].getLevel());
            }
        }
        setLevel(level) {
            for (const logService of this.logServices) {
                logService.setLevel(level);
            }
            super.setLevel(level);
        }
        trace(message, ...args) {
            for (const logService of this.logServices) {
                logService.trace(message, ...args);
            }
        }
        debug(message, ...args) {
            for (const logService of this.logServices) {
                logService.debug(message, ...args);
            }
        }
        info(message, ...args) {
            for (const logService of this.logServices) {
                logService.info(message, ...args);
            }
        }
        warn(message, ...args) {
            for (const logService of this.logServices) {
                logService.warn(message, ...args);
            }
        }
        error(message, ...args) {
            for (const logService of this.logServices) {
                logService.error(message, ...args);
            }
        }
        critical(message, ...args) {
            for (const logService of this.logServices) {
                logService.critical(message, ...args);
            }
        }
        flush() {
            for (const logService of this.logServices) {
                logService.flush();
            }
        }
        dispose() {
            for (const logService of this.logServices) {
                logService.dispose();
            }
        }
    }
    exports.MultiplexLogService = MultiplexLogService;
    class DelegatedLogService extends lifecycle_1.Disposable {
        constructor(logService) {
            super();
            this.logService = logService;
            this._register(logService);
        }
        get onDidChangeLogLevel() {
            return this.logService.onDidChangeLogLevel;
        }
        setLevel(level) {
            this.logService.setLevel(level);
        }
        getLevel() {
            return this.logService.getLevel();
        }
        trace(message, ...args) {
            this.logService.trace(message, ...args);
        }
        debug(message, ...args) {
            this.logService.debug(message, ...args);
        }
        info(message, ...args) {
            this.logService.info(message, ...args);
        }
        warn(message, ...args) {
            this.logService.warn(message, ...args);
        }
        error(message, ...args) {
            this.logService.error(message, ...args);
        }
        critical(message, ...args) {
            this.logService.critical(message, ...args);
        }
        flush() {
            this.logService.flush();
        }
    }
    exports.DelegatedLogService = DelegatedLogService;
    class NullLogService {
        constructor() {
            this.onDidChangeLogLevel = new event_1.Emitter().event;
        }
        setLevel(level) { }
        getLevel() { return LogLevel.Info; }
        trace(message, ...args) { }
        debug(message, ...args) { }
        info(message, ...args) { }
        warn(message, ...args) { }
        error(message, ...args) { }
        critical(message, ...args) { }
        dispose() { }
        flush() { }
    }
    exports.NullLogService = NullLogService;
    function getLogLevel(environmentService) {
        if (environmentService.verbose) {
            return LogLevel.Trace;
        }
        if (typeof environmentService.logLevel === 'string') {
            const logLevel = environmentService.logLevel.toLowerCase();
            switch (logLevel) {
                case 'trace':
                    return LogLevel.Trace;
                case 'debug':
                    return LogLevel.Debug;
                case 'info':
                    return LogLevel.Info;
                case 'warn':
                    return LogLevel.Warning;
                case 'error':
                    return LogLevel.Error;
                case 'critical':
                    return LogLevel.Critical;
                case 'off':
                    return LogLevel.Off;
            }
        }
        return exports.DEFAULT_LOG_LEVEL;
    }
    exports.getLogLevel = getLogLevel;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define(__m[90/*vs/platform/extensionManagement/node/extensionDownloader*/], __M([0/*require*/,1/*exports*/,2/*vs/base/common/lifecycle*/,26/*vs/platform/files/common/files*/,24/*vs/platform/extensionManagement/common/extensionManagement*/,19/*vs/platform/environment/common/environment*/,13/*vs/base/common/uri*/,21/*vs/base/common/resources*/,25/*vs/platform/extensionManagement/common/extensionManagementUtil*/,7/*vs/platform/log/common/log*/,35/*vs/base/common/uuid*/,48/*semver-umd*/]), function (require, exports, lifecycle_1, files_1, extensionManagement_1, environment_1, uri_1, resources_1, extensionManagementUtil_1, log_1, uuid_1, semver) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExtensionsDownloader = void 0;
    const ExtensionIdVersionRegex = /^([^.]+\..+)-(\d+\.\d+\.\d+)$/;
    let ExtensionsDownloader = class ExtensionsDownloader extends lifecycle_1.Disposable {
        constructor(environmentService, fileService, extensionGalleryService, logService) {
            super();
            this.fileService = fileService;
            this.extensionGalleryService = extensionGalleryService;
            this.logService = logService;
            this.extensionsDownloadDir = uri_1.URI.file(environmentService.extensionsDownloadPath);
            this.cache = 20; // Cache 20 downloads
            this.cleanUpPromise = this.cleanUp();
        }
        async downloadExtension(extension, operation) {
            await this.cleanUpPromise;
            const location = resources_1.joinPath(this.extensionsDownloadDir, this.getName(extension));
            await this.download(extension, location, operation);
            return location;
        }
        async delete(location) {
            // noop as caching is enabled always
        }
        async download(extension, location, operation) {
            if (!await this.fileService.exists(location)) {
                await this.extensionGalleryService.download(extension, location, operation);
            }
        }
        async cleanUp() {
            try {
                if (!(await this.fileService.exists(this.extensionsDownloadDir))) {
                    this.logService.trace('Extension VSIX downlads cache dir does not exist');
                    return;
                }
                const folderStat = await this.fileService.resolve(this.extensionsDownloadDir, { resolveMetadata: true });
                if (folderStat.children) {
                    const toDelete = [];
                    const all = [];
                    for (const stat of folderStat.children) {
                        const extension = this.parse(stat.name);
                        if (extension) {
                            all.push([extension, stat]);
                        }
                    }
                    const byExtension = extensionManagementUtil_1.groupByExtension(all, ([extension]) => extension.identifier);
                    const distinct = [];
                    for (const p of byExtension) {
                        p.sort((a, b) => semver.rcompare(a[0].version, b[0].version));
                        toDelete.push(...p.slice(1).map(e => e[1].resource)); // Delete outdated extensions
                        distinct.push(p[0][1]);
                    }
                    distinct.sort((a, b) => a.mtime - b.mtime); // sort by modified time
                    toDelete.push(...distinct.slice(0, Math.max(0, distinct.length - this.cache)).map(s => s.resource)); // Retain minimum cacheSize and delete the rest
                    await Promise.all(toDelete.map(resource => {
                        this.logService.trace('Deleting vsix from cache', resource.path);
                        return this.fileService.del(resource);
                    }));
                }
            }
            catch (e) {
                this.logService.error(e);
            }
        }
        getName(extension) {
            return this.cache ? new extensionManagementUtil_1.ExtensionIdentifierWithVersion(extension.identifier, extension.version).key().toLowerCase() : uuid_1.generateUuid();
        }
        parse(name) {
            const matches = ExtensionIdVersionRegex.exec(name);
            return matches && matches[1] && matches[2] ? new extensionManagementUtil_1.ExtensionIdentifierWithVersion({ id: matches[1] }, matches[2]) : null;
        }
    };
    ExtensionsDownloader = __decorate([
        __param(0, environment_1.INativeEnvironmentService),
        __param(1, files_1.IFileService),
        __param(2, extensionManagement_1.IExtensionGalleryService),
        __param(3, log_1.ILogService)
    ], ExtensionsDownloader);
    exports.ExtensionsDownloader = ExtensionsDownloader;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/









define(__m[91/*vs/platform/extensionManagement/node/extensionLifecycle*/], __M([0/*require*/,1/*exports*/,2/*vs/base/common/lifecycle*/,7/*vs/platform/log/common/log*/,33/*child_process*/,32/*vs/base/common/errorMessage*/,3/*vs/base/common/path*/,12/*vs/base/common/async*/,11/*vs/base/common/event*/,9/*vs/base/common/network*/,10/*vs/base/node/pfs*/,19/*vs/platform/environment/common/environment*/]), function (require, exports, lifecycle_1, log_1, child_process_1, errorMessage_1, path_1, async_1, event_1, network_1, pfs_1, environment_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExtensionsLifecycle = void 0;
    let ExtensionsLifecycle = class ExtensionsLifecycle extends lifecycle_1.Disposable {
        constructor(environmentService, logService) {
            super();
            this.environmentService = environmentService;
            this.logService = logService;
            this.processesLimiter = new async_1.Limiter(5); // Run max 5 processes in parallel
        }
        async postUninstall(extension) {
            const script = this.parseScript(extension, 'uninstall');
            if (script) {
                this.logService.info(extension.identifier.id, extension.manifest.version, `Running post uninstall script`);
                await this.processesLimiter.queue(() => this.runLifecycleHook(script.script, 'uninstall', script.args, true, extension)
                    .then(() => this.logService.info(extension.identifier.id, extension.manifest.version, `Finished running post uninstall script`), err => this.logService.error(extension.identifier.id, extension.manifest.version, `Failed to run post uninstall script: ${err}`)));
            }
            return pfs_1.rimraf(this.getExtensionStoragePath(extension)).then(undefined, e => this.logService.error('Error while removing extension storage path', e));
        }
        parseScript(extension, type) {
            const scriptKey = `vscode:${type}`;
            if (extension.location.scheme === network_1.Schemas.file && extension.manifest && extension.manifest['scripts'] && typeof extension.manifest['scripts'][scriptKey] === 'string') {
                const script = extension.manifest['scripts'][scriptKey].split(' ');
                if (script.length < 2 || script[0] !== 'node' || !script[1]) {
                    this.logService.warn(extension.identifier.id, extension.manifest.version, `${scriptKey} should be a node script`);
                    return null;
                }
                return { script: path_1.join(extension.location.fsPath, script[1]), args: script.slice(2) || [] };
            }
            return null;
        }
        runLifecycleHook(lifecycleHook, lifecycleType, args, timeout, extension) {
            return new Promise((c, e) => {
                const extensionLifecycleProcess = this.start(lifecycleHook, lifecycleType, args, extension);
                let timeoutHandler;
                const onexit = (error) => {
                    if (timeoutHandler) {
                        clearTimeout(timeoutHandler);
                        timeoutHandler = null;
                    }
                    if (error) {
                        e(error);
                    }
                    else {
                        c(undefined);
                    }
                };
                // on error
                extensionLifecycleProcess.on('error', (err) => {
                    onexit(errorMessage_1.toErrorMessage(err) || 'Unknown');
                });
                // on exit
                extensionLifecycleProcess.on('exit', (code, signal) => {
                    onexit(code ? `post-${lifecycleType} process exited with code ${code}` : undefined);
                });
                if (timeout) {
                    // timeout: kill process after waiting for 5s
                    timeoutHandler = setTimeout(() => {
                        timeoutHandler = null;
                        extensionLifecycleProcess.kill();
                        e('timed out');
                    }, 5000);
                }
            });
        }
        start(uninstallHook, lifecycleType, args, extension) {
            const opts = {
                silent: true,
                execArgv: undefined
            };
            const extensionUninstallProcess = child_process_1.fork(uninstallHook, [`--type=extension-post-${lifecycleType}`, ...args], opts);
            extensionUninstallProcess.stdout.setEncoding('utf8');
            extensionUninstallProcess.stderr.setEncoding('utf8');
            const onStdout = event_1.Event.fromNodeEventEmitter(extensionUninstallProcess.stdout, 'data');
            const onStderr = event_1.Event.fromNodeEventEmitter(extensionUninstallProcess.stderr, 'data');
            // Log output
            onStdout(data => this.logService.info(extension.identifier.id, extension.manifest.version, `post-${lifecycleType}`, data));
            onStderr(data => this.logService.error(extension.identifier.id, extension.manifest.version, `post-${lifecycleType}`, data));
            const onOutput = event_1.Event.any(event_1.Event.map(onStdout, o => ({ data: `%c${o}`, format: [''] })), event_1.Event.map(onStderr, o => ({ data: `%c${o}`, format: ['color: red'] })));
            // Debounce all output, so we can render it in the Chrome console as a group
            const onDebouncedOutput = event_1.Event.debounce(onOutput, (r, o) => {
                return r
                    ? { data: r.data + o.data, format: [...r.format, ...o.format] }
                    : { data: o.data, format: o.format };
            }, 100);
            // Print out output
            onDebouncedOutput(data => {
                console.group(extension.identifier.id);
                console.log(data.data, ...data.format);
                console.groupEnd();
            });
            return extensionUninstallProcess;
        }
        getExtensionStoragePath(extension) {
            return path_1.join(this.environmentService.globalStorageHome.fsPath, extension.identifier.id.toLowerCase());
        }
    };
    ExtensionsLifecycle = __decorate([
        __param(0, environment_1.IEnvironmentService),
        __param(1, log_1.ILogService)
    ], ExtensionsLifecycle);
    exports.ExtensionsLifecycle = ExtensionsLifecycle;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/









define(__m[92/*vs/platform/files/common/fileService*/], __M([0/*require*/,1/*exports*/,2/*vs/base/common/lifecycle*/,26/*vs/platform/files/common/files*/,11/*vs/base/common/event*/,21/*vs/base/common/resources*/,74/*vs/nls!vs/platform/files/common/fileService*/,93/*vs/base/common/map*/,18/*vs/base/common/arrays*/,39/*vs/base/common/labels*/,7/*vs/platform/log/common/log*/,15/*vs/base/common/buffer*/,30/*vs/base/common/stream*/,12/*vs/base/common/async*/,28/*vs/base/common/cancellation*/,9/*vs/base/common/network*/,45/*vs/platform/files/common/io*/,120/*vs/base/common/iterator*/]), function (require, exports, lifecycle_1, files_1, event_1, resources_1, nls_1, map_1, arrays_1, labels_1, log_1, buffer_1, stream_1, async_1, cancellation_1, network_1, io_1, iterator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FileService = void 0;
    let FileService = class FileService extends lifecycle_1.Disposable {
        constructor(logService) {
            super();
            this.logService = logService;
            this.BUFFER_SIZE = 64 * 1024;
            //#region File System Provider
            this._onDidChangeFileSystemProviderRegistrations = this._register(new event_1.Emitter());
            this.onDidChangeFileSystemProviderRegistrations = this._onDidChangeFileSystemProviderRegistrations.event;
            this._onWillActivateFileSystemProvider = this._register(new event_1.Emitter());
            this.onWillActivateFileSystemProvider = this._onWillActivateFileSystemProvider.event;
            this._onDidChangeFileSystemProviderCapabilities = this._register(new event_1.Emitter());
            this.onDidChangeFileSystemProviderCapabilities = this._onDidChangeFileSystemProviderCapabilities.event;
            this.provider = new Map();
            //#endregion
            this._onDidRunOperation = this._register(new event_1.Emitter());
            this.onDidRunOperation = this._onDidRunOperation.event;
            this._onError = this._register(new event_1.Emitter());
            this.onError = this._onError.event;
            //#endregion
            //#region File Watching
            this._onDidFilesChange = this._register(new event_1.Emitter());
            this.onDidFilesChange = this._onDidFilesChange.event;
            this.activeWatchers = new Map();
            //#endregion
            //#region Helpers
            this.writeQueues = new Map();
        }
        registerProvider(scheme, provider) {
            if (this.provider.has(scheme)) {
                throw new Error(`A filesystem provider for the scheme '${scheme}' is already registered.`);
            }
            // Add provider with event
            this.provider.set(scheme, provider);
            this._onDidChangeFileSystemProviderRegistrations.fire({ added: true, scheme, provider });
            // Forward events from provider
            const providerDisposables = new lifecycle_1.DisposableStore();
            providerDisposables.add(provider.onDidChangeFile(changes => this._onDidFilesChange.fire(new files_1.FileChangesEvent(changes, this.getExtUri(provider).extUri))));
            providerDisposables.add(provider.onDidChangeCapabilities(() => this._onDidChangeFileSystemProviderCapabilities.fire({ provider, scheme })));
            if (typeof provider.onDidErrorOccur === 'function') {
                providerDisposables.add(provider.onDidErrorOccur(error => this._onError.fire(new Error(error))));
            }
            return lifecycle_1.toDisposable(() => {
                this._onDidChangeFileSystemProviderRegistrations.fire({ added: false, scheme, provider });
                this.provider.delete(scheme);
                lifecycle_1.dispose(providerDisposables);
            });
        }
        async activateProvider(scheme) {
            // Emit an event that we are about to activate a provider with the given scheme.
            // Listeners can participate in the activation by registering a provider for it.
            const joiners = [];
            this._onWillActivateFileSystemProvider.fire({
                scheme,
                join(promise) {
                    if (promise) {
                        joiners.push(promise);
                    }
                },
            });
            if (this.provider.has(scheme)) {
                return; // provider is already here so we can return directly
            }
            // If the provider is not yet there, make sure to join on the listeners assuming
            // that it takes a bit longer to register the file system provider.
            await Promise.all(joiners);
        }
        canHandleResource(resource) {
            return this.provider.has(resource.scheme);
        }
        hasCapability(resource, capability) {
            const provider = this.provider.get(resource.scheme);
            return !!(provider && (provider.capabilities & capability));
        }
        listCapabilities() {
            return iterator_1.Iterable.map(this.provider, ([scheme, provider]) => ({ scheme, capabilities: provider.capabilities }));
        }
        async withProvider(resource) {
            // Assert path is absolute
            if (!resources_1.isAbsolutePath(resource)) {
                throw new files_1.FileOperationError(nls_1.localize(0, null, this.resourceForError(resource)), 8 /* FILE_INVALID_PATH */);
            }
            // Activate provider
            await this.activateProvider(resource.scheme);
            // Assert provider
            const provider = this.provider.get(resource.scheme);
            if (!provider) {
                const error = new Error();
                error.name = 'ENOPRO';
                error.message = nls_1.localize(1, null, resource.toString());
                throw error;
            }
            return provider;
        }
        async withReadProvider(resource) {
            const provider = await this.withProvider(resource);
            if (files_1.hasOpenReadWriteCloseCapability(provider) || files_1.hasReadWriteCapability(provider) || files_1.hasFileReadStreamCapability(provider)) {
                return provider;
            }
            throw new Error(`Filesystem provider for scheme '${resource.scheme}' neither has FileReadWrite, FileReadStream nor FileOpenReadWriteClose capability which is needed for the read operation.`);
        }
        async withWriteProvider(resource) {
            const provider = await this.withProvider(resource);
            if (files_1.hasOpenReadWriteCloseCapability(provider) || files_1.hasReadWriteCapability(provider)) {
                return provider;
            }
            throw new Error(`Filesystem provider for scheme '${resource.scheme}' neither has FileReadWrite nor FileOpenReadWriteClose capability which is needed for the write operation.`);
        }
        async resolve(resource, options) {
            try {
                return await this.doResolveFile(resource, options);
            }
            catch (error) {
                // Specially handle file not found case as file operation result
                if (files_1.toFileSystemProviderErrorCode(error) === files_1.FileSystemProviderErrorCode.FileNotFound) {
                    throw new files_1.FileOperationError(nls_1.localize(2, null, this.resourceForError(resource)), 1 /* FILE_NOT_FOUND */);
                }
                // Bubble up any other error as is
                throw files_1.ensureFileSystemProviderError(error);
            }
        }
        async doResolveFile(resource, options) {
            const provider = await this.withProvider(resource);
            const resolveTo = options === null || options === void 0 ? void 0 : options.resolveTo;
            const resolveSingleChildDescendants = options === null || options === void 0 ? void 0 : options.resolveSingleChildDescendants;
            const resolveMetadata = options === null || options === void 0 ? void 0 : options.resolveMetadata;
            const stat = await provider.stat(resource);
            let trie;
            return this.toFileStat(provider, resource, stat, undefined, !!resolveMetadata, (stat, siblings) => {
                // lazy trie to check for recursive resolving
                if (!trie) {
                    trie = map_1.TernarySearchTree.forUris();
                    trie.set(resource, true);
                    if (arrays_1.isNonEmptyArray(resolveTo)) {
                        resolveTo.forEach(uri => trie.set(uri, true));
                    }
                }
                // check for recursive resolving
                if (Boolean(trie.findSuperstr(stat.resource) || trie.get(stat.resource))) {
                    return true;
                }
                // check for resolving single child folders
                if (stat.isDirectory && resolveSingleChildDescendants) {
                    return siblings === 1;
                }
                return false;
            });
        }
        async toFileStat(provider, resource, stat, siblings, resolveMetadata, recurse) {
            // convert to file stat
            const fileStat = {
                resource,
                name: labels_1.getBaseLabel(resource),
                isFile: (stat.type & files_1.FileType.File) !== 0,
                isDirectory: (stat.type & files_1.FileType.Directory) !== 0,
                isSymbolicLink: (stat.type & files_1.FileType.SymbolicLink) !== 0,
                mtime: stat.mtime,
                ctime: stat.ctime,
                size: stat.size,
                etag: files_1.etag({ mtime: stat.mtime, size: stat.size })
            };
            // check to recurse for directories
            if (fileStat.isDirectory && recurse(fileStat, siblings)) {
                try {
                    const entries = await provider.readdir(resource);
                    const resolvedEntries = await Promise.all(entries.map(async ([name, type]) => {
                        try {
                            const childResource = resources_1.joinPath(resource, name);
                            const childStat = resolveMetadata ? await provider.stat(childResource) : { type };
                            return await this.toFileStat(provider, childResource, childStat, entries.length, resolveMetadata, recurse);
                        }
                        catch (error) {
                            this.logService.trace(error);
                            return null; // can happen e.g. due to permission errors
                        }
                    }));
                    // make sure to get rid of null values that signal a failure to resolve a particular entry
                    fileStat.children = arrays_1.coalesce(resolvedEntries);
                }
                catch (error) {
                    this.logService.trace(error);
                    fileStat.children = []; // gracefully handle errors, we may not have permissions to read
                }
                return fileStat;
            }
            return fileStat;
        }
        async resolveAll(toResolve) {
            return Promise.all(toResolve.map(async (entry) => {
                try {
                    return { stat: await this.doResolveFile(entry.resource, entry.options), success: true };
                }
                catch (error) {
                    this.logService.trace(error);
                    return { stat: undefined, success: false };
                }
            }));
        }
        async exists(resource) {
            const provider = await this.withProvider(resource);
            try {
                const stat = await provider.stat(resource);
                return !!stat;
            }
            catch (error) {
                return false;
            }
        }
        //#endregion
        //#region File Reading/Writing
        async canCreateFile(resource, options) {
            try {
                await this.doValidateCreateFile(resource, options);
            }
            catch (error) {
                return error;
            }
            return true;
        }
        async doValidateCreateFile(resource, options) {
            // validate overwrite
            if (!(options === null || options === void 0 ? void 0 : options.overwrite) && await this.exists(resource)) {
                throw new files_1.FileOperationError(nls_1.localize(3, null, this.resourceForError(resource)), 3 /* FILE_MODIFIED_SINCE */, options);
            }
        }
        async createFile(resource, bufferOrReadableOrStream = buffer_1.VSBuffer.fromString(''), options) {
            // validate
            await this.doValidateCreateFile(resource, options);
            // do write into file (this will create it too)
            const fileStat = await this.writeFile(resource, bufferOrReadableOrStream);
            // events
            this._onDidRunOperation.fire(new files_1.FileOperationEvent(resource, 0 /* CREATE */, fileStat));
            return fileStat;
        }
        async writeFile(resource, bufferOrReadableOrStream, options) {
            const provider = this.throwIfFileSystemIsReadonly(await this.withWriteProvider(resource), resource);
            try {
                // validate write
                const stat = await this.validateWriteFile(provider, resource, options);
                // mkdir recursively as needed
                if (!stat) {
                    await this.mkdirp(provider, resources_1.dirname(resource));
                }
                // optimization: if the provider has unbuffered write capability and the data
                // to write is a Readable, we consume up to 3 chunks and try to write the data
                // unbuffered to reduce the overhead. If the Readable has more data to provide
                // we continue to write buffered.
                let bufferOrReadableOrStreamOrBufferedStream;
                if (files_1.hasReadWriteCapability(provider) && !(bufferOrReadableOrStream instanceof buffer_1.VSBuffer)) {
                    if (stream_1.isReadableStream(bufferOrReadableOrStream)) {
                        const bufferedStream = await stream_1.peekStream(bufferOrReadableOrStream, 3);
                        if (bufferedStream.ended) {
                            bufferOrReadableOrStreamOrBufferedStream = buffer_1.VSBuffer.concat(bufferedStream.buffer);
                        }
                        else {
                            bufferOrReadableOrStreamOrBufferedStream = bufferedStream;
                        }
                    }
                    else {
                        bufferOrReadableOrStreamOrBufferedStream = stream_1.peekReadable(bufferOrReadableOrStream, data => buffer_1.VSBuffer.concat(data), 3);
                    }
                }
                else {
                    bufferOrReadableOrStreamOrBufferedStream = bufferOrReadableOrStream;
                }
                // write file: unbuffered (only if data to write is a buffer, or the provider has no buffered write capability)
                if (!files_1.hasOpenReadWriteCloseCapability(provider) || (files_1.hasReadWriteCapability(provider) && bufferOrReadableOrStreamOrBufferedStream instanceof buffer_1.VSBuffer)) {
                    await this.doWriteUnbuffered(provider, resource, bufferOrReadableOrStreamOrBufferedStream);
                }
                // write file: buffered
                else {
                    await this.doWriteBuffered(provider, resource, bufferOrReadableOrStreamOrBufferedStream instanceof buffer_1.VSBuffer ? buffer_1.bufferToReadable(bufferOrReadableOrStreamOrBufferedStream) : bufferOrReadableOrStreamOrBufferedStream);
                }
            }
            catch (error) {
                throw new files_1.FileOperationError(nls_1.localize(4, null, this.resourceForError(resource), files_1.ensureFileSystemProviderError(error).toString()), files_1.toFileOperationResult(error), options);
            }
            return this.resolve(resource, { resolveMetadata: true });
        }
        async validateWriteFile(provider, resource, options) {
            let stat = undefined;
            try {
                stat = await provider.stat(resource);
            }
            catch (error) {
                return undefined; // file might not exist
            }
            // file cannot be directory
            if ((stat.type & files_1.FileType.Directory) !== 0) {
                throw new files_1.FileOperationError(nls_1.localize(5, null, this.resourceForError(resource)), 0 /* FILE_IS_DIRECTORY */, options);
            }
            // Dirty write prevention: if the file on disk has been changed and does not match our expected
            // mtime and etag, we bail out to prevent dirty writing.
            //
            // First, we check for a mtime that is in the future before we do more checks. The assumption is
            // that only the mtime is an indicator for a file that has changed on disk.
            //
            // Second, if the mtime has advanced, we compare the size of the file on disk with our previous
            // one using the etag() function. Relying only on the mtime check has prooven to produce false
            // positives due to file system weirdness (especially around remote file systems). As such, the
            // check for size is a weaker check because it can return a false negative if the file has changed
            // but to the same length. This is a compromise we take to avoid having to produce checksums of
            // the file content for comparison which would be much slower to compute.
            if (options && typeof options.mtime === 'number' && typeof options.etag === 'string' && options.etag !== files_1.ETAG_DISABLED &&
                typeof stat.mtime === 'number' && typeof stat.size === 'number' &&
                options.mtime < stat.mtime && options.etag !== files_1.etag({ mtime: options.mtime /* not using stat.mtime for a reason, see above */, size: stat.size })) {
                throw new files_1.FileOperationError(nls_1.localize(6, null), 3 /* FILE_MODIFIED_SINCE */, options);
            }
            return stat;
        }
        async readFile(resource, options) {
            const provider = await this.withReadProvider(resource);
            const stream = await this.doReadAsFileStream(provider, resource, Object.assign(Object.assign({}, options), { 
                // optimization: since we know that the caller does not
                // care about buffering, we indicate this to the reader.
                // this reduces all the overhead the buffered reading
                // has (open, read, close) if the provider supports
                // unbuffered reading.
                preferUnbuffered: true }));
            return Object.assign(Object.assign({}, stream), { value: await buffer_1.streamToBuffer(stream.value) });
        }
        async readFileStream(resource, options) {
            const provider = await this.withReadProvider(resource);
            return this.doReadAsFileStream(provider, resource, options);
        }
        async doReadAsFileStream(provider, resource, options) {
            // install a cancellation token that gets cancelled
            // when any error occurs. this allows us to resolve
            // the content of the file while resolving metadata
            // but still cancel the operation in certain cases.
            const cancellableSource = new cancellation_1.CancellationTokenSource();
            // validate read operation
            const statPromise = this.validateReadFile(resource, options).then(stat => stat, error => {
                cancellableSource.cancel();
                throw error;
            });
            try {
                // if the etag is provided, we await the result of the validation
                // due to the likelyhood of hitting a NOT_MODIFIED_SINCE result.
                // otherwise, we let it run in parallel to the file reading for
                // optimal startup performance.
                if (options && typeof options.etag === 'string' && options.etag !== files_1.ETAG_DISABLED) {
                    await statPromise;
                }
                let fileStreamPromise;
                // read unbuffered (only if either preferred, or the provider has no buffered read capability)
                if (!(files_1.hasOpenReadWriteCloseCapability(provider) || files_1.hasFileReadStreamCapability(provider)) || (files_1.hasReadWriteCapability(provider) && (options === null || options === void 0 ? void 0 : options.preferUnbuffered))) {
                    fileStreamPromise = this.readFileUnbuffered(provider, resource, options);
                }
                // read streamed (always prefer over primitive buffered read)
                else if (files_1.hasFileReadStreamCapability(provider)) {
                    fileStreamPromise = Promise.resolve(this.readFileStreamed(provider, resource, cancellableSource.token, options));
                }
                // read buffered
                else {
                    fileStreamPromise = Promise.resolve(this.readFileBuffered(provider, resource, cancellableSource.token, options));
                }
                const [fileStat, fileStream] = await Promise.all([statPromise, fileStreamPromise]);
                return Object.assign(Object.assign({}, fileStat), { value: fileStream });
            }
            catch (error) {
                throw new files_1.FileOperationError(nls_1.localize(7, null, this.resourceForError(resource), files_1.ensureFileSystemProviderError(error).toString()), files_1.toFileOperationResult(error), options);
            }
        }
        readFileStreamed(provider, resource, token, options = Object.create(null)) {
            const fileStream = provider.readFileStream(resource, options, token);
            return stream_1.transform(fileStream, {
                data: data => data instanceof buffer_1.VSBuffer ? data : buffer_1.VSBuffer.wrap(data),
                error: error => new files_1.FileOperationError(nls_1.localize(8, null, this.resourceForError(resource), files_1.ensureFileSystemProviderError(error).toString()), files_1.toFileOperationResult(error), options)
            }, data => buffer_1.VSBuffer.concat(data));
        }
        readFileBuffered(provider, resource, token, options = Object.create(null)) {
            const stream = buffer_1.newWriteableBufferStream();
            io_1.readFileIntoStream(provider, resource, stream, data => data, Object.assign(Object.assign({}, options), { bufferSize: this.BUFFER_SIZE, errorTransformer: error => new files_1.FileOperationError(nls_1.localize(9, null, this.resourceForError(resource), files_1.ensureFileSystemProviderError(error).toString()), files_1.toFileOperationResult(error), options) }), token);
            return stream;
        }
        async readFileUnbuffered(provider, resource, options) {
            let buffer = await provider.readFile(resource);
            // respect position option
            if (options && typeof options.position === 'number') {
                buffer = buffer.slice(options.position);
            }
            // respect length option
            if (options && typeof options.length === 'number') {
                buffer = buffer.slice(0, options.length);
            }
            // Throw if file is too large to load
            this.validateReadFileLimits(resource, buffer.byteLength, options);
            return buffer_1.bufferToStream(buffer_1.VSBuffer.wrap(buffer));
        }
        async validateReadFile(resource, options) {
            const stat = await this.resolve(resource, { resolveMetadata: true });
            // Throw if resource is a directory
            if (stat.isDirectory) {
                throw new files_1.FileOperationError(nls_1.localize(10, null, this.resourceForError(resource)), 0 /* FILE_IS_DIRECTORY */, options);
            }
            // Throw if file not modified since (unless disabled)
            if (options && typeof options.etag === 'string' && options.etag !== files_1.ETAG_DISABLED && options.etag === stat.etag) {
                throw new files_1.FileOperationError(nls_1.localize(11, null), 2 /* FILE_NOT_MODIFIED_SINCE */, options);
            }
            // Throw if file is too large to load
            this.validateReadFileLimits(resource, stat.size, options);
            return stat;
        }
        validateReadFileLimits(resource, size, options) {
            if (options === null || options === void 0 ? void 0 : options.limits) {
                let tooLargeErrorResult = undefined;
                if (typeof options.limits.memory === 'number' && size > options.limits.memory) {
                    tooLargeErrorResult = 9 /* FILE_EXCEEDS_MEMORY_LIMIT */;
                }
                if (typeof options.limits.size === 'number' && size > options.limits.size) {
                    tooLargeErrorResult = 7 /* FILE_TOO_LARGE */;
                }
                if (typeof tooLargeErrorResult === 'number') {
                    throw new files_1.FileOperationError(nls_1.localize(12, null, this.resourceForError(resource)), tooLargeErrorResult);
                }
            }
        }
        //#endregion
        //#region Move/Copy/Delete/Create Folder
        async canMove(source, target, overwrite) {
            return this.doCanMoveCopy(source, target, 'move', overwrite);
        }
        async canCopy(source, target, overwrite) {
            return this.doCanMoveCopy(source, target, 'copy', overwrite);
        }
        async doCanMoveCopy(source, target, mode, overwrite) {
            if (source.toString() !== target.toString()) {
                try {
                    const sourceProvider = mode === 'move' ? this.throwIfFileSystemIsReadonly(await this.withWriteProvider(source), source) : await this.withReadProvider(source);
                    const targetProvider = this.throwIfFileSystemIsReadonly(await this.withWriteProvider(target), target);
                    await this.doValidateMoveCopy(sourceProvider, source, targetProvider, target, mode, overwrite);
                }
                catch (error) {
                    return error;
                }
            }
            return true;
        }
        async move(source, target, overwrite) {
            const sourceProvider = this.throwIfFileSystemIsReadonly(await this.withWriteProvider(source), source);
            const targetProvider = this.throwIfFileSystemIsReadonly(await this.withWriteProvider(target), target);
            // move
            const mode = await this.doMoveCopy(sourceProvider, source, targetProvider, target, 'move', !!overwrite);
            // resolve and send events
            const fileStat = await this.resolve(target, { resolveMetadata: true });
            this._onDidRunOperation.fire(new files_1.FileOperationEvent(source, mode === 'move' ? 2 /* MOVE */ : 3 /* COPY */, fileStat));
            return fileStat;
        }
        async copy(source, target, overwrite) {
            const sourceProvider = await this.withReadProvider(source);
            const targetProvider = this.throwIfFileSystemIsReadonly(await this.withWriteProvider(target), target);
            // copy
            const mode = await this.doMoveCopy(sourceProvider, source, targetProvider, target, 'copy', !!overwrite);
            // resolve and send events
            const fileStat = await this.resolve(target, { resolveMetadata: true });
            this._onDidRunOperation.fire(new files_1.FileOperationEvent(source, mode === 'copy' ? 3 /* COPY */ : 2 /* MOVE */, fileStat));
            return fileStat;
        }
        async doMoveCopy(sourceProvider, source, targetProvider, target, mode, overwrite) {
            if (source.toString() === target.toString()) {
                return mode; // simulate node.js behaviour here and do a no-op if paths match
            }
            // validation
            const { exists, isSameResourceWithDifferentPathCase } = await this.doValidateMoveCopy(sourceProvider, source, targetProvider, target, mode, overwrite);
            // delete as needed (unless target is same resurce with different path case)
            if (exists && !isSameResourceWithDifferentPathCase && overwrite) {
                await this.del(target, { recursive: true });
            }
            // create parent folders
            await this.mkdirp(targetProvider, resources_1.dirname(target));
            // copy source => target
            if (mode === 'copy') {
                // same provider with fast copy: leverage copy() functionality
                if (sourceProvider === targetProvider && files_1.hasFileFolderCopyCapability(sourceProvider)) {
                    await sourceProvider.copy(source, target, { overwrite });
                }
                // when copying via buffer/unbuffered, we have to manually
                // traverse the source if it is a folder and not a file
                else {
                    const sourceFile = await this.resolve(source);
                    if (sourceFile.isDirectory) {
                        await this.doCopyFolder(sourceProvider, sourceFile, targetProvider, target);
                    }
                    else {
                        await this.doCopyFile(sourceProvider, source, targetProvider, target);
                    }
                }
                return mode;
            }
            // move source => target
            else {
                // same provider: leverage rename() functionality
                if (sourceProvider === targetProvider) {
                    await sourceProvider.rename(source, target, { overwrite });
                    return mode;
                }
                // across providers: copy to target & delete at source
                else {
                    await this.doMoveCopy(sourceProvider, source, targetProvider, target, 'copy', overwrite);
                    await this.del(source, { recursive: true });
                    return 'copy';
                }
            }
        }
        async doCopyFile(sourceProvider, source, targetProvider, target) {
            // copy: source (buffered) => target (buffered)
            if (files_1.hasOpenReadWriteCloseCapability(sourceProvider) && files_1.hasOpenReadWriteCloseCapability(targetProvider)) {
                return this.doPipeBuffered(sourceProvider, source, targetProvider, target);
            }
            // copy: source (buffered) => target (unbuffered)
            if (files_1.hasOpenReadWriteCloseCapability(sourceProvider) && files_1.hasReadWriteCapability(targetProvider)) {
                return this.doPipeBufferedToUnbuffered(sourceProvider, source, targetProvider, target);
            }
            // copy: source (unbuffered) => target (buffered)
            if (files_1.hasReadWriteCapability(sourceProvider) && files_1.hasOpenReadWriteCloseCapability(targetProvider)) {
                return this.doPipeUnbufferedToBuffered(sourceProvider, source, targetProvider, target);
            }
            // copy: source (unbuffered) => target (unbuffered)
            if (files_1.hasReadWriteCapability(sourceProvider) && files_1.hasReadWriteCapability(targetProvider)) {
                return this.doPipeUnbuffered(sourceProvider, source, targetProvider, target);
            }
        }
        async doCopyFolder(sourceProvider, sourceFolder, targetProvider, targetFolder) {
            // create folder in target
            await targetProvider.mkdir(targetFolder);
            // create children in target
            if (Array.isArray(sourceFolder.children)) {
                await Promise.all(sourceFolder.children.map(async (sourceChild) => {
                    const targetChild = resources_1.joinPath(targetFolder, sourceChild.name);
                    if (sourceChild.isDirectory) {
                        return this.doCopyFolder(sourceProvider, await this.resolve(sourceChild.resource), targetProvider, targetChild);
                    }
                    else {
                        return this.doCopyFile(sourceProvider, sourceChild.resource, targetProvider, targetChild);
                    }
                }));
            }
        }
        async doValidateMoveCopy(sourceProvider, source, targetProvider, target, mode, overwrite) {
            let isSameResourceWithDifferentPathCase = false;
            // Check if source is equal or parent to target (requires providers to be the same)
            if (sourceProvider === targetProvider) {
                const { extUri, isPathCaseSensitive } = this.getExtUri(sourceProvider);
                if (!isPathCaseSensitive) {
                    isSameResourceWithDifferentPathCase = extUri.isEqual(source, target);
                }
                if (isSameResourceWithDifferentPathCase && mode === 'copy') {
                    throw new Error(nls_1.localize(13, null, this.resourceForError(source), this.resourceForError(target)));
                }
                if (!isSameResourceWithDifferentPathCase && extUri.isEqualOrParent(target, source)) {
                    throw new Error(nls_1.localize(14, null, this.resourceForError(source), this.resourceForError(target)));
                }
            }
            // Extra checks if target exists and this is not a rename
            const exists = await this.exists(target);
            if (exists && !isSameResourceWithDifferentPathCase) {
                // Bail out if target exists and we are not about to overwrite
                if (!overwrite) {
                    throw new files_1.FileOperationError(nls_1.localize(15, null, this.resourceForError(source), this.resourceForError(target)), 4 /* FILE_MOVE_CONFLICT */);
                }
                // Special case: if the target is a parent of the source, we cannot delete
                // it as it would delete the source as well. In this case we have to throw
                if (sourceProvider === targetProvider) {
                    const { extUri } = this.getExtUri(sourceProvider);
                    if (extUri.isEqualOrParent(source, target)) {
                        throw new Error(nls_1.localize(16, null, this.resourceForError(source), this.resourceForError(target)));
                    }
                }
            }
            return { exists, isSameResourceWithDifferentPathCase };
        }
        getExtUri(provider) {
            const isPathCaseSensitive = !!(provider.capabilities & 1024 /* PathCaseSensitive */);
            return {
                extUri: isPathCaseSensitive ? resources_1.extUri : resources_1.extUriIgnorePathCase,
                isPathCaseSensitive
            };
        }
        async createFolder(resource) {
            const provider = this.throwIfFileSystemIsReadonly(await this.withProvider(resource), resource);
            // mkdir recursively
            await this.mkdirp(provider, resource);
            // events
            const fileStat = await this.resolve(resource, { resolveMetadata: true });
            this._onDidRunOperation.fire(new files_1.FileOperationEvent(resource, 0 /* CREATE */, fileStat));
            return fileStat;
        }
        async mkdirp(provider, directory) {
            const directoriesToCreate = [];
            // mkdir until we reach root
            const { extUri } = this.getExtUri(provider);
            while (!extUri.isEqual(directory, resources_1.dirname(directory))) {
                try {
                    const stat = await provider.stat(directory);
                    if ((stat.type & files_1.FileType.Directory) === 0) {
                        throw new Error(nls_1.localize(17, null, this.resourceForError(directory)));
                    }
                    break; // we have hit a directory that exists -> good
                }
                catch (error) {
                    // Bubble up any other error that is not file not found
                    if (files_1.toFileSystemProviderErrorCode(error) !== files_1.FileSystemProviderErrorCode.FileNotFound) {
                        throw error;
                    }
                    // Upon error, remember directories that need to be created
                    directoriesToCreate.push(resources_1.basename(directory));
                    // Continue up
                    directory = resources_1.dirname(directory);
                }
            }
            // Create directories as needed
            for (let i = directoriesToCreate.length - 1; i >= 0; i--) {
                directory = resources_1.joinPath(directory, directoriesToCreate[i]);
                try {
                    await provider.mkdir(directory);
                }
                catch (error) {
                    if (files_1.toFileSystemProviderErrorCode(error) !== files_1.FileSystemProviderErrorCode.FileExists) {
                        // For mkdirp() we tolerate that the mkdir() call fails
                        // in case the folder already exists. This follows node.js
                        // own implementation of fs.mkdir({ recursive: true }) and
                        // reduces the chances of race conditions leading to errors
                        // if multiple calls try to create the same folders
                        // As such, we only throw an error here if it is other than
                        // the fact that the file already exists.
                        // (see also https://github.com/microsoft/vscode/issues/89834)
                        throw error;
                    }
                }
            }
        }
        async canDelete(resource, options) {
            try {
                await this.doValidateDelete(resource, options);
            }
            catch (error) {
                return error;
            }
            return true;
        }
        async doValidateDelete(resource, options) {
            const provider = this.throwIfFileSystemIsReadonly(await this.withProvider(resource), resource);
            // Validate trash support
            const useTrash = !!(options === null || options === void 0 ? void 0 : options.useTrash);
            if (useTrash && !(provider.capabilities & 4096 /* Trash */)) {
                throw new Error(nls_1.localize(18, null, this.resourceForError(resource)));
            }
            // Validate delete
            const exists = await this.exists(resource);
            if (!exists) {
                throw new files_1.FileOperationError(nls_1.localize(19, null, this.resourceForError(resource)), 1 /* FILE_NOT_FOUND */);
            }
            // Validate recursive
            const recursive = !!(options === null || options === void 0 ? void 0 : options.recursive);
            if (!recursive && exists) {
                const stat = await this.resolve(resource);
                if (stat.isDirectory && Array.isArray(stat.children) && stat.children.length > 0) {
                    throw new Error(nls_1.localize(20, null, this.resourceForError(resource)));
                }
            }
            return provider;
        }
        async del(resource, options) {
            const provider = await this.doValidateDelete(resource, options);
            const useTrash = !!(options === null || options === void 0 ? void 0 : options.useTrash);
            const recursive = !!(options === null || options === void 0 ? void 0 : options.recursive);
            // Delete through provider
            await provider.delete(resource, { recursive, useTrash });
            // Events
            this._onDidRunOperation.fire(new files_1.FileOperationEvent(resource, 1 /* DELETE */));
        }
        watch(resource, options = { recursive: false, excludes: [] }) {
            let watchDisposed = false;
            let watchDisposable = lifecycle_1.toDisposable(() => watchDisposed = true);
            // Watch and wire in disposable which is async but
            // check if we got disposed meanwhile and forward
            this.doWatch(resource, options).then(disposable => {
                if (watchDisposed) {
                    lifecycle_1.dispose(disposable);
                }
                else {
                    watchDisposable = disposable;
                }
            }, error => this.logService.error(error));
            return lifecycle_1.toDisposable(() => lifecycle_1.dispose(watchDisposable));
        }
        async doWatch(resource, options) {
            const provider = await this.withProvider(resource);
            const key = this.toWatchKey(provider, resource, options);
            // Only start watching if we are the first for the given key
            const watcher = this.activeWatchers.get(key) || { count: 0, disposable: provider.watch(resource, options) };
            if (!this.activeWatchers.has(key)) {
                this.activeWatchers.set(key, watcher);
            }
            // Increment usage counter
            watcher.count += 1;
            return lifecycle_1.toDisposable(() => {
                // Unref
                watcher.count--;
                // Dispose only when last user is reached
                if (watcher.count === 0) {
                    lifecycle_1.dispose(watcher.disposable);
                    this.activeWatchers.delete(key);
                }
            });
        }
        toWatchKey(provider, resource, options) {
            const { extUri } = this.getExtUri(provider);
            return [
                extUri.getComparisonKey(resource),
                String(options.recursive),
                options.excludes.join() // use excludes as part of the key
            ].join();
        }
        dispose() {
            super.dispose();
            this.activeWatchers.forEach(watcher => lifecycle_1.dispose(watcher.disposable));
            this.activeWatchers.clear();
        }
        ensureWriteQueue(provider, resource) {
            const { extUri } = this.getExtUri(provider);
            const queueKey = extUri.getComparisonKey(resource);
            // ensure to never write to the same resource without finishing
            // the one write. this ensures a write finishes consistently
            // (even with error) before another write is done.
            let writeQueue = this.writeQueues.get(queueKey);
            if (!writeQueue) {
                writeQueue = new async_1.Queue();
                this.writeQueues.set(queueKey, writeQueue);
                const onFinish = event_1.Event.once(writeQueue.onFinished);
                onFinish(() => {
                    this.writeQueues.delete(queueKey);
                    lifecycle_1.dispose(writeQueue);
                });
            }
            return writeQueue;
        }
        async doWriteBuffered(provider, resource, readableOrStreamOrBufferedStream) {
            return this.ensureWriteQueue(provider, resource).queue(async () => {
                // open handle
                const handle = await provider.open(resource, { create: true });
                // write into handle until all bytes from buffer have been written
                try {
                    if (stream_1.isReadableStream(readableOrStreamOrBufferedStream) || stream_1.isReadableBufferedStream(readableOrStreamOrBufferedStream)) {
                        await this.doWriteStreamBufferedQueued(provider, handle, readableOrStreamOrBufferedStream);
                    }
                    else {
                        await this.doWriteReadableBufferedQueued(provider, handle, readableOrStreamOrBufferedStream);
                    }
                }
                catch (error) {
                    throw files_1.ensureFileSystemProviderError(error);
                }
                finally {
                    // close handle always
                    await provider.close(handle);
                }
            });
        }
        async doWriteStreamBufferedQueued(provider, handle, streamOrBufferedStream) {
            let posInFile = 0;
            let stream;
            // Buffered stream: consume the buffer first by writing
            // it to the target before reading from the stream.
            if (stream_1.isReadableBufferedStream(streamOrBufferedStream)) {
                if (streamOrBufferedStream.buffer.length > 0) {
                    const chunk = buffer_1.VSBuffer.concat(streamOrBufferedStream.buffer);
                    await this.doWriteBuffer(provider, handle, chunk, chunk.byteLength, posInFile, 0);
                    posInFile += chunk.byteLength;
                }
                // If the stream has been consumed, return early
                if (streamOrBufferedStream.ended) {
                    return;
                }
                stream = streamOrBufferedStream.stream;
            }
            // Unbuffered stream - just take as is
            else {
                stream = streamOrBufferedStream;
            }
            return new Promise(async (resolve, reject) => {
                stream.on('data', async (chunk) => {
                    // pause stream to perform async write operation
                    stream.pause();
                    try {
                        await this.doWriteBuffer(provider, handle, chunk, chunk.byteLength, posInFile, 0);
                    }
                    catch (error) {
                        return reject(error);
                    }
                    posInFile += chunk.byteLength;
                    // resume stream now that we have successfully written
                    // run this on the next tick to prevent increasing the
                    // execution stack because resume() may call the event
                    // handler again before finishing.
                    setTimeout(() => stream.resume());
                });
                stream.on('error', error => reject(error));
                stream.on('end', () => resolve());
            });
        }
        async doWriteReadableBufferedQueued(provider, handle, readable) {
            let posInFile = 0;
            let chunk;
            while ((chunk = readable.read()) !== null) {
                await this.doWriteBuffer(provider, handle, chunk, chunk.byteLength, posInFile, 0);
                posInFile += chunk.byteLength;
            }
        }
        async doWriteBuffer(provider, handle, buffer, length, posInFile, posInBuffer) {
            let totalBytesWritten = 0;
            while (totalBytesWritten < length) {
                // Write through the provider
                const bytesWritten = await provider.write(handle, posInFile + totalBytesWritten, buffer.buffer, posInBuffer + totalBytesWritten, length - totalBytesWritten);
                totalBytesWritten += bytesWritten;
            }
        }
        async doWriteUnbuffered(provider, resource, bufferOrReadableOrStreamOrBufferedStream) {
            return this.ensureWriteQueue(provider, resource).queue(() => this.doWriteUnbufferedQueued(provider, resource, bufferOrReadableOrStreamOrBufferedStream));
        }
        async doWriteUnbufferedQueued(provider, resource, bufferOrReadableOrStreamOrBufferedStream) {
            let buffer;
            if (bufferOrReadableOrStreamOrBufferedStream instanceof buffer_1.VSBuffer) {
                buffer = bufferOrReadableOrStreamOrBufferedStream;
            }
            else if (stream_1.isReadableStream(bufferOrReadableOrStreamOrBufferedStream)) {
                buffer = await buffer_1.streamToBuffer(bufferOrReadableOrStreamOrBufferedStream);
            }
            else if (stream_1.isReadableBufferedStream(bufferOrReadableOrStreamOrBufferedStream)) {
                buffer = await buffer_1.bufferedStreamToBuffer(bufferOrReadableOrStreamOrBufferedStream);
            }
            else {
                buffer = buffer_1.readableToBuffer(bufferOrReadableOrStreamOrBufferedStream);
            }
            // Write through the provider
            await provider.writeFile(resource, buffer.buffer, { create: true, overwrite: true });
        }
        async doPipeBuffered(sourceProvider, source, targetProvider, target) {
            return this.ensureWriteQueue(targetProvider, target).queue(() => this.doPipeBufferedQueued(sourceProvider, source, targetProvider, target));
        }
        async doPipeBufferedQueued(sourceProvider, source, targetProvider, target) {
            let sourceHandle = undefined;
            let targetHandle = undefined;
            try {
                // Open handles
                sourceHandle = await sourceProvider.open(source, { create: false });
                targetHandle = await targetProvider.open(target, { create: true });
                const buffer = buffer_1.VSBuffer.alloc(this.BUFFER_SIZE);
                let posInFile = 0;
                let posInBuffer = 0;
                let bytesRead = 0;
                do {
                    // read from source (sourceHandle) at current position (posInFile) into buffer (buffer) at
                    // buffer position (posInBuffer) up to the size of the buffer (buffer.byteLength).
                    bytesRead = await sourceProvider.read(sourceHandle, posInFile, buffer.buffer, posInBuffer, buffer.byteLength - posInBuffer);
                    // write into target (targetHandle) at current position (posInFile) from buffer (buffer) at
                    // buffer position (posInBuffer) all bytes we read (bytesRead).
                    await this.doWriteBuffer(targetProvider, targetHandle, buffer, bytesRead, posInFile, posInBuffer);
                    posInFile += bytesRead;
                    posInBuffer += bytesRead;
                    // when buffer full, fill it again from the beginning
                    if (posInBuffer === buffer.byteLength) {
                        posInBuffer = 0;
                    }
                } while (bytesRead > 0);
            }
            catch (error) {
                throw files_1.ensureFileSystemProviderError(error);
            }
            finally {
                await Promise.all([
                    typeof sourceHandle === 'number' ? sourceProvider.close(sourceHandle) : Promise.resolve(),
                    typeof targetHandle === 'number' ? targetProvider.close(targetHandle) : Promise.resolve(),
                ]);
            }
        }
        async doPipeUnbuffered(sourceProvider, source, targetProvider, target) {
            return this.ensureWriteQueue(targetProvider, target).queue(() => this.doPipeUnbufferedQueued(sourceProvider, source, targetProvider, target));
        }
        async doPipeUnbufferedQueued(sourceProvider, source, targetProvider, target) {
            return targetProvider.writeFile(target, await sourceProvider.readFile(source), { create: true, overwrite: true });
        }
        async doPipeUnbufferedToBuffered(sourceProvider, source, targetProvider, target) {
            return this.ensureWriteQueue(targetProvider, target).queue(() => this.doPipeUnbufferedToBufferedQueued(sourceProvider, source, targetProvider, target));
        }
        async doPipeUnbufferedToBufferedQueued(sourceProvider, source, targetProvider, target) {
            // Open handle
            const targetHandle = await targetProvider.open(target, { create: true });
            // Read entire buffer from source and write buffered
            try {
                const buffer = await sourceProvider.readFile(source);
                await this.doWriteBuffer(targetProvider, targetHandle, buffer_1.VSBuffer.wrap(buffer), buffer.byteLength, 0, 0);
            }
            catch (error) {
                throw files_1.ensureFileSystemProviderError(error);
            }
            finally {
                await targetProvider.close(targetHandle);
            }
        }
        async doPipeBufferedToUnbuffered(sourceProvider, source, targetProvider, target) {
            // Read buffer via stream buffered
            const buffer = await buffer_1.streamToBuffer(this.readFileBuffered(sourceProvider, source, cancellation_1.CancellationToken.None));
            // Write buffer into target at once
            await this.doWriteUnbuffered(targetProvider, target, buffer);
        }
        throwIfFileSystemIsReadonly(provider, resource) {
            if (provider.capabilities & 2048 /* Readonly */) {
                throw new files_1.FileOperationError(nls_1.localize(21, null, this.resourceForError(resource)), 6 /* FILE_PERMISSION_DENIED */);
            }
            return provider;
        }
        resourceForError(resource) {
            if (resource.scheme === network_1.Schemas.file) {
                return resource.fsPath;
            }
            return resource.toString(true);
        }
    };
    FileService = __decorate([
        __param(0, log_1.ILogService)
    ], FileService);
    exports.FileService = FileService;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[94/*vs/platform/files/node/diskFileSystemProvider*/], __M([0/*require*/,1/*exports*/,23/*fs*/,41/*util*/,2/*vs/base/common/lifecycle*/,26/*vs/platform/files/common/files*/,11/*vs/base/common/event*/,14/*vs/base/common/platform*/,10/*vs/base/node/pfs*/,3/*vs/base/common/path*/,21/*vs/base/common/resources*/,66/*vs/base/common/extpath*/,12/*vs/base/common/async*/,7/*vs/platform/log/common/log*/,76/*vs/nls!vs/platform/files/node/diskFileSystemProvider*/,46/*vs/platform/files/node/watcher/watcher*/,81/*vs/platform/files/node/watcher/unix/watcherService*/,83/*vs/platform/files/node/watcher/win32/watcherService*/,80/*vs/platform/files/node/watcher/nsfw/watcherService*/,87/*vs/platform/files/node/watcher/nodejs/watcherService*/,30/*vs/base/common/stream*/,45/*vs/platform/files/common/io*/,18/*vs/base/common/arrays*/,15/*vs/base/common/buffer*/]), function (require, exports, fs_1, util_1, lifecycle_1, files_1, event_1, platform_1, pfs_1, path_1, resources_1, extpath_1, async_1, log_1, nls_1, watcher_1, watcherService_1, watcherService_2, watcherService_3, watcherService_4, stream_1, io_1, arrays_1, buffer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DiskFileSystemProvider = void 0;
    class DiskFileSystemProvider extends lifecycle_1.Disposable {
        constructor(logService, options) {
            var _a;
            super();
            this.logService = logService;
            this.options = options;
            this.BUFFER_SIZE = ((_a = this.options) === null || _a === void 0 ? void 0 : _a.bufferSize) || 64 * 1024;
            //#region File Capabilities
            this.onDidChangeCapabilities = event_1.Event.None;
            this.mapHandleToPos = new Map();
            this.writeHandles = new Set();
            this.canFlush = true;
            //#endregion
            //#region File Watching
            this._onDidWatchErrorOccur = this._register(new event_1.Emitter());
            this.onDidErrorOccur = this._onDidWatchErrorOccur.event;
            this._onDidChangeFile = this._register(new event_1.Emitter());
            this.onDidChangeFile = this._onDidChangeFile.event;
            this.recursiveFoldersToWatch = [];
            this.recursiveWatchRequestDelayer = this._register(new async_1.ThrottledDelayer(0));
        }
        get capabilities() {
            if (!this._capabilities) {
                this._capabilities =
                    2 /* FileReadWrite */ |
                        4 /* FileOpenReadWriteClose */ |
                        16 /* FileReadStream */ |
                        8 /* FileFolderCopy */;
                if (platform_1.isLinux) {
                    this._capabilities |= 1024 /* PathCaseSensitive */;
                }
            }
            return this._capabilities;
        }
        //#endregion
        //#region File Metadata Resolving
        async stat(resource) {
            try {
                const { stat, symbolicLink } = await pfs_1.statLink(this.toFilePath(resource)); // cannot use fs.stat() here to support links properly
                return {
                    type: this.toType(stat, symbolicLink),
                    ctime: stat.birthtime.getTime(),
                    mtime: stat.mtime.getTime(),
                    size: stat.size
                };
            }
            catch (error) {
                throw this.toFileSystemProviderError(error);
            }
        }
        async readdir(resource) {
            try {
                const children = await pfs_1.readdirWithFileTypes(this.toFilePath(resource));
                const result = [];
                await Promise.all(children.map(async (child) => {
                    try {
                        let type;
                        if (child.isSymbolicLink()) {
                            type = (await this.stat(resources_1.joinPath(resource, child.name))).type; // always resolve target the link points to if any
                        }
                        else {
                            type = this.toType(child);
                        }
                        result.push([child.name, type]);
                    }
                    catch (error) {
                        this.logService.trace(error); // ignore errors for individual entries that can arise from permission denied
                    }
                }));
                return result;
            }
            catch (error) {
                throw this.toFileSystemProviderError(error);
            }
        }
        toType(entry, symbolicLink) {
            // Signal file type by checking for file / directory, except:
            // - symbolic links pointing to non-existing files are FileType.Unknown
            // - files that are neither file nor directory are FileType.Unknown
            let type;
            if (symbolicLink === null || symbolicLink === void 0 ? void 0 : symbolicLink.dangling) {
                type = files_1.FileType.Unknown;
            }
            else if (entry.isFile()) {
                type = files_1.FileType.File;
            }
            else if (entry.isDirectory()) {
                type = files_1.FileType.Directory;
            }
            else {
                type = files_1.FileType.Unknown;
            }
            // Always signal symbolic link as file type additionally
            if (symbolicLink) {
                type |= files_1.FileType.SymbolicLink;
            }
            return type;
        }
        //#endregion
        //#region File Reading/Writing
        async readFile(resource) {
            try {
                const filePath = this.toFilePath(resource);
                return await pfs_1.readFile(filePath);
            }
            catch (error) {
                throw this.toFileSystemProviderError(error);
            }
        }
        readFileStream(resource, opts, token) {
            const stream = stream_1.newWriteableStream(data => buffer_1.VSBuffer.concat(data.map(data => buffer_1.VSBuffer.wrap(data))).buffer);
            io_1.readFileIntoStream(this, resource, stream, data => data.buffer, Object.assign(Object.assign({}, opts), { bufferSize: this.BUFFER_SIZE }), token);
            return stream;
        }
        async writeFile(resource, content, opts) {
            let handle = undefined;
            try {
                const filePath = this.toFilePath(resource);
                // Validate target unless { create: true, overwrite: true }
                if (!opts.create || !opts.overwrite) {
                    const fileExists = await pfs_1.exists(filePath);
                    if (fileExists) {
                        if (!opts.overwrite) {
                            throw files_1.createFileSystemProviderError(nls_1.localize(0, null), files_1.FileSystemProviderErrorCode.FileExists);
                        }
                    }
                    else {
                        if (!opts.create) {
                            throw files_1.createFileSystemProviderError(nls_1.localize(1, null), files_1.FileSystemProviderErrorCode.FileNotFound);
                        }
                    }
                }
                // Open
                handle = await this.open(resource, { create: true });
                // Write content at once
                await this.write(handle, 0, content, 0, content.byteLength);
            }
            catch (error) {
                throw this.toFileSystemProviderError(error);
            }
            finally {
                if (typeof handle === 'number') {
                    await this.close(handle);
                }
            }
        }
        async open(resource, opts) {
            try {
                const filePath = this.toFilePath(resource);
                let flags = undefined;
                if (opts.create) {
                    if (platform_1.isWindows && await pfs_1.exists(filePath)) {
                        try {
                            // On Windows and if the file exists, we use a different strategy of saving the file
                            // by first truncating the file and then writing with r+ flag. This helps to save hidden files on Windows
                            // (see https://github.com/microsoft/vscode/issues/931) and prevent removing alternate data streams
                            // (see https://github.com/microsoft/vscode/issues/6363)
                            await pfs_1.truncate(filePath, 0);
                            // After a successful truncate() the flag can be set to 'r+' which will not truncate.
                            flags = 'r+';
                        }
                        catch (error) {
                            this.logService.trace(error);
                        }
                    }
                    // we take opts.create as a hint that the file is opened for writing
                    // as such we use 'w' to truncate an existing or create the
                    // file otherwise. we do not allow reading.
                    if (!flags) {
                        flags = 'w';
                    }
                }
                else {
                    // otherwise we assume the file is opened for reading
                    // as such we use 'r' to neither truncate, nor create
                    // the file.
                    flags = 'r';
                }
                const handle = await util_1.promisify(fs_1.open)(filePath, flags);
                // remember this handle to track file position of the handle
                // we init the position to 0 since the file descriptor was
                // just created and the position was not moved so far (see
                // also http://man7.org/linux/man-pages/man2/open.2.html -
                // "The file offset is set to the beginning of the file.")
                this.mapHandleToPos.set(handle, 0);
                // remember that this handle was used for writing
                if (opts.create) {
                    this.writeHandles.add(handle);
                }
                return handle;
            }
            catch (error) {
                throw this.toFileSystemProviderError(error);
            }
        }
        async close(fd) {
            try {
                // remove this handle from map of positions
                this.mapHandleToPos.delete(fd);
                // if a handle is closed that was used for writing, ensure
                // to flush the contents to disk if possible.
                if (this.writeHandles.delete(fd) && this.canFlush) {
                    try {
                        await util_1.promisify(fs_1.fdatasync)(fd);
                    }
                    catch (error) {
                        // In some exotic setups it is well possible that node fails to sync
                        // In that case we disable flushing and log the error to our logger
                        this.canFlush = false;
                        this.logService.error(error);
                    }
                }
                return await util_1.promisify(fs_1.close)(fd);
            }
            catch (error) {
                throw this.toFileSystemProviderError(error);
            }
        }
        async read(fd, pos, data, offset, length) {
            const normalizedPos = this.normalizePos(fd, pos);
            let bytesRead = null;
            try {
                const result = await util_1.promisify(fs_1.read)(fd, data, offset, length, normalizedPos);
                if (typeof result === 'number') {
                    bytesRead = result; // node.d.ts fail
                }
                else {
                    bytesRead = result.bytesRead;
                }
                return bytesRead;
            }
            catch (error) {
                throw this.toFileSystemProviderError(error);
            }
            finally {
                this.updatePos(fd, normalizedPos, bytesRead);
            }
        }
        normalizePos(fd, pos) {
            // when calling fs.read/write we try to avoid passing in the "pos" argument and
            // rather prefer to pass in "null" because this avoids an extra seek(pos)
            // call that in some cases can even fail (e.g. when opening a file over FTP -
            // see https://github.com/microsoft/vscode/issues/73884).
            //
            // as such, we compare the passed in position argument with our last known
            // position for the file descriptor and use "null" if they match.
            if (pos === this.mapHandleToPos.get(fd)) {
                return null;
            }
            return pos;
        }
        updatePos(fd, pos, bytesLength) {
            const lastKnownPos = this.mapHandleToPos.get(fd);
            if (typeof lastKnownPos === 'number') {
                // pos !== null signals that previously a position was used that is
                // not null. node.js documentation explains, that in this case
                // the internal file pointer is not moving and as such we do not move
                // our position pointer.
                //
                // Docs: "If position is null, data will be read from the current file position,
                // and the file position will be updated. If position is an integer, the file position
                // will remain unchanged."
                if (typeof pos === 'number') {
                    // do not modify the position
                }
                // bytesLength = number is a signal that the read/write operation was
                // successful and as such we need to advance the position in the Map
                //
                // Docs (http://man7.org/linux/man-pages/man2/read.2.html):
                // "On files that support seeking, the read operation commences at the
                // file offset, and the file offset is incremented by the number of
                // bytes read."
                //
                // Docs (http://man7.org/linux/man-pages/man2/write.2.html):
                // "For a seekable file (i.e., one to which lseek(2) may be applied, for
                // example, a regular file) writing takes place at the file offset, and
                // the file offset is incremented by the number of bytes actually
                // written."
                else if (typeof bytesLength === 'number') {
                    this.mapHandleToPos.set(fd, lastKnownPos + bytesLength);
                }
                // bytesLength = null signals an error in the read/write operation
                // and as such we drop the handle from the Map because the position
                // is unspecificed at this point.
                else {
                    this.mapHandleToPos.delete(fd);
                }
            }
        }
        async write(fd, pos, data, offset, length) {
            // we know at this point that the file to write to is truncated and thus empty
            // if the write now fails, the file remains empty. as such we really try hard
            // to ensure the write succeeds by retrying up to three times.
            return async_1.retry(() => this.doWrite(fd, pos, data, offset, length), 100 /* ms delay */, 3 /* retries */);
        }
        async doWrite(fd, pos, data, offset, length) {
            const normalizedPos = this.normalizePos(fd, pos);
            let bytesWritten = null;
            try {
                const result = await util_1.promisify(fs_1.write)(fd, data, offset, length, normalizedPos);
                if (typeof result === 'number') {
                    bytesWritten = result; // node.d.ts fail
                }
                else {
                    bytesWritten = result.bytesWritten;
                }
                return bytesWritten;
            }
            catch (error) {
                throw this.toFileSystemProviderError(error);
            }
            finally {
                this.updatePos(fd, normalizedPos, bytesWritten);
            }
        }
        //#endregion
        //#region Move/Copy/Delete/Create Folder
        async mkdir(resource) {
            try {
                await util_1.promisify(fs_1.mkdir)(this.toFilePath(resource));
            }
            catch (error) {
                throw this.toFileSystemProviderError(error);
            }
        }
        async delete(resource, opts) {
            try {
                const filePath = this.toFilePath(resource);
                await this.doDelete(filePath, opts);
            }
            catch (error) {
                throw this.toFileSystemProviderError(error);
            }
        }
        async doDelete(filePath, opts) {
            if (opts.recursive) {
                await pfs_1.rimraf(filePath, pfs_1.RimRafMode.MOVE);
            }
            else {
                await pfs_1.unlink(filePath);
            }
        }
        async rename(from, to, opts) {
            const fromFilePath = this.toFilePath(from);
            const toFilePath = this.toFilePath(to);
            if (fromFilePath === toFilePath) {
                return; // simulate node.js behaviour here and do a no-op if paths match
            }
            try {
                // Ensure target does not exist
                await this.validateTargetDeleted(from, to, 'move', opts.overwrite);
                // Move
                await pfs_1.move(fromFilePath, toFilePath);
            }
            catch (error) {
                // rewrite some typical errors that can happen especially around symlinks
                // to something the user can better understand
                if (error.code === 'EINVAL' || error.code === 'EBUSY' || error.code === 'ENAMETOOLONG') {
                    error = new Error(nls_1.localize(2, null, path_1.basename(fromFilePath), path_1.basename(path_1.dirname(toFilePath)), error.toString()));
                }
                throw this.toFileSystemProviderError(error);
            }
        }
        async copy(from, to, opts) {
            const fromFilePath = this.toFilePath(from);
            const toFilePath = this.toFilePath(to);
            if (fromFilePath === toFilePath) {
                return; // simulate node.js behaviour here and do a no-op if paths match
            }
            try {
                // Ensure target does not exist
                await this.validateTargetDeleted(from, to, 'copy', opts.overwrite);
                // Copy
                await pfs_1.copy(fromFilePath, toFilePath);
            }
            catch (error) {
                // rewrite some typical errors that can happen especially around symlinks
                // to something the user can better understand
                if (error.code === 'EINVAL' || error.code === 'EBUSY' || error.code === 'ENAMETOOLONG') {
                    error = new Error(nls_1.localize(3, null, path_1.basename(fromFilePath), path_1.basename(path_1.dirname(toFilePath)), error.toString()));
                }
                throw this.toFileSystemProviderError(error);
            }
        }
        async validateTargetDeleted(from, to, mode, overwrite) {
            const fromFilePath = this.toFilePath(from);
            const toFilePath = this.toFilePath(to);
            let isSameResourceWithDifferentPathCase = false;
            const isPathCaseSensitive = !!(this.capabilities & 1024 /* PathCaseSensitive */);
            if (!isPathCaseSensitive) {
                isSameResourceWithDifferentPathCase = extpath_1.isEqual(fromFilePath, toFilePath, true /* ignore case */);
            }
            if (isSameResourceWithDifferentPathCase && mode === 'copy') {
                throw files_1.createFileSystemProviderError(nls_1.localize(4, null), files_1.FileSystemProviderErrorCode.FileExists);
            }
            // handle existing target (unless this is a case change)
            if (!isSameResourceWithDifferentPathCase && await pfs_1.exists(toFilePath)) {
                if (!overwrite) {
                    throw files_1.createFileSystemProviderError(nls_1.localize(5, null), files_1.FileSystemProviderErrorCode.FileExists);
                }
                // Delete target
                await this.delete(to, { recursive: true, useTrash: false });
            }
        }
        watch(resource, opts) {
            if (opts.recursive) {
                return this.watchRecursive(resource, opts.excludes);
            }
            return this.watchNonRecursive(resource); // TODO@ben ideally the same watcher can be used in both cases
        }
        watchRecursive(resource, excludes) {
            // Add to list of folders to watch recursively
            const folderToWatch = { path: this.toFilePath(resource), excludes };
            const remove = arrays_1.insert(this.recursiveFoldersToWatch, folderToWatch);
            // Trigger update
            this.refreshRecursiveWatchers();
            return lifecycle_1.toDisposable(() => {
                // Remove from list of folders to watch recursively
                remove();
                // Trigger update
                this.refreshRecursiveWatchers();
            });
        }
        refreshRecursiveWatchers() {
            // Buffer requests for recursive watching to decide on right watcher
            // that supports potentially watching more than one folder at once
            this.recursiveWatchRequestDelayer.trigger(async () => {
                this.doRefreshRecursiveWatchers();
            });
        }
        doRefreshRecursiveWatchers() {
            var _a, _b, _c;
            // Reuse existing
            if (this.recursiveWatcher instanceof watcherService_3.FileWatcher) {
                this.recursiveWatcher.setFolders(this.recursiveFoldersToWatch);
            }
            // Create new
            else {
                // Dispose old
                lifecycle_1.dispose(this.recursiveWatcher);
                this.recursiveWatcher = undefined;
                // Create new if we actually have folders to watch
                if (this.recursiveFoldersToWatch.length > 0) {
                    let watcherImpl;
                    let watcherOptions = undefined;
                    // requires a polling watcher
                    if ((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.watcher) === null || _b === void 0 ? void 0 : _b.usePolling) {
                        watcherImpl = watcherService_1.FileWatcher;
                        watcherOptions = (_c = this.options) === null || _c === void 0 ? void 0 : _c.watcher;
                    }
                    // Single Folder Watcher
                    else {
                        if (this.recursiveFoldersToWatch.length === 1) {
                            if (platform_1.isWindows) {
                                watcherImpl = watcherService_2.FileWatcher;
                            }
                            else {
                                watcherImpl = watcherService_1.FileWatcher;
                            }
                        }
                        // Multi Folder Watcher
                        else {
                            watcherImpl = watcherService_3.FileWatcher;
                        }
                    }
                    // Create and start watching
                    this.recursiveWatcher = new watcherImpl(this.recursiveFoldersToWatch, event => this._onDidChangeFile.fire(watcher_1.toFileChanges(event)), msg => {
                        if (msg.type === 'error') {
                            this._onDidWatchErrorOccur.fire(msg.message);
                        }
                        this.logService[msg.type](msg.message);
                    }, this.logService.getLevel() === log_1.LogLevel.Trace, watcherOptions);
                    if (!this.recursiveWatcherLogLevelListener) {
                        this.recursiveWatcherLogLevelListener = this.logService.onDidChangeLogLevel(() => {
                            if (this.recursiveWatcher) {
                                this.recursiveWatcher.setVerboseLogging(this.logService.getLevel() === log_1.LogLevel.Trace);
                            }
                        });
                    }
                }
            }
        }
        watchNonRecursive(resource) {
            const watcherService = new watcherService_4.FileWatcher(this.toFilePath(resource), changes => this._onDidChangeFile.fire(watcher_1.toFileChanges(changes)), msg => {
                if (msg.type === 'error') {
                    this._onDidWatchErrorOccur.fire(msg.message);
                }
                this.logService[msg.type](msg.message);
            }, this.logService.getLevel() === log_1.LogLevel.Trace);
            const logLevelListener = this.logService.onDidChangeLogLevel(() => {
                watcherService.setVerboseLogging(this.logService.getLevel() === log_1.LogLevel.Trace);
            });
            return lifecycle_1.combinedDisposable(watcherService, logLevelListener);
        }
        //#endregion
        //#region Helpers
        toFilePath(resource) {
            return path_1.normalize(resource.fsPath);
        }
        toFileSystemProviderError(error) {
            if (error instanceof files_1.FileSystemProviderError) {
                return error; // avoid double conversion
            }
            let code;
            switch (error.code) {
                case 'ENOENT':
                    code = files_1.FileSystemProviderErrorCode.FileNotFound;
                    break;
                case 'EISDIR':
                    code = files_1.FileSystemProviderErrorCode.FileIsADirectory;
                    break;
                case 'ENOTDIR':
                    code = files_1.FileSystemProviderErrorCode.FileNotADirectory;
                    break;
                case 'EEXIST':
                    code = files_1.FileSystemProviderErrorCode.FileExists;
                    break;
                case 'EPERM':
                case 'EACCES':
                    code = files_1.FileSystemProviderErrorCode.NoPermissions;
                    break;
                default:
                    code = files_1.FileSystemProviderErrorCode.Unknown;
            }
            return files_1.createFileSystemProviderError(error, code);
        }
        //#endregion
        dispose() {
            super.dispose();
            lifecycle_1.dispose(this.recursiveWatcher);
            this.recursiveWatcher = undefined;
            lifecycle_1.dispose(this.recursiveWatcherLogLevelListener);
            this.recursiveWatcherLogLevelListener = undefined;
        }
    }
    exports.DiskFileSystemProvider = DiskFileSystemProvider;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/









define(__m[95/*vs/platform/localizations/node/localizations*/], __M([0/*require*/,1/*exports*/,10/*vs/base/node/pfs*/,96/*crypto*/,24/*vs/platform/extensionManagement/common/extensionManagement*/,2/*vs/base/common/lifecycle*/,19/*vs/platform/environment/common/environment*/,12/*vs/base/common/async*/,25/*vs/platform/extensionManagement/common/extensionManagementUtil*/,7/*vs/platform/log/common/log*/,89/*vs/platform/localizations/common/localizations*/,18/*vs/base/common/arrays*/,11/*vs/base/common/event*/,9/*vs/base/common/network*/,3/*vs/base/common/path*/]), function (require, exports, pfs, crypto_1, extensionManagement_1, lifecycle_1, environment_1, async_1, extensionManagementUtil_1, log_1, localizations_1, arrays_1, event_1, network_1, path_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LocalizationsService = void 0;
    let LocalizationsService = class LocalizationsService extends lifecycle_1.Disposable {
        constructor(extensionManagementService, environmentService, logService) {
            super();
            this.extensionManagementService = extensionManagementService;
            this.logService = logService;
            this._onDidLanguagesChange = this._register(new event_1.Emitter());
            this.onDidLanguagesChange = this._onDidLanguagesChange.event;
            this.cache = this._register(new LanguagePacksCache(environmentService, logService));
            this._register(extensionManagementService.onDidInstallExtension(({ local }) => this.onDidInstallExtension(local)));
            this._register(extensionManagementService.onDidUninstallExtension(({ identifier }) => this.onDidUninstallExtension(identifier)));
        }
        getLanguageIds() {
            return this.cache.getLanguagePacks()
                .then(languagePacks => {
                // Contributed languages are those installed via extension packs, so does not include English
                const languages = ['en', ...Object.keys(languagePacks)];
                return arrays_1.distinct(languages);
            });
        }
        onDidInstallExtension(extension) {
            if (extension && extension.manifest && extension.manifest.contributes && extension.manifest.contributes.localizations && extension.manifest.contributes.localizations.length) {
                this.logService.debug('Adding language packs from the extension', extension.identifier.id);
                this.update().then(changed => { if (changed) {
                    this._onDidLanguagesChange.fire();
                } });
            }
        }
        onDidUninstallExtension(identifier) {
            this.cache.getLanguagePacks()
                .then(languagePacks => {
                if (Object.keys(languagePacks).some(language => languagePacks[language] && languagePacks[language].extensions.some(e => extensionManagementUtil_1.areSameExtensions(e.extensionIdentifier, identifier)))) {
                    this.logService.debug('Removing language packs from the extension', identifier.id);
                    this.update().then(changed => { if (changed) {
                        this._onDidLanguagesChange.fire();
                    } });
                }
            });
        }
        update() {
            return Promise.all([this.cache.getLanguagePacks(), this.extensionManagementService.getInstalled()])
                .then(([current, installed]) => this.cache.update(installed)
                .then(updated => !arrays_1.equals(Object.keys(current), Object.keys(updated))));
        }
    };
    LocalizationsService = __decorate([
        __param(0, extensionManagement_1.IExtensionManagementService),
        __param(1, environment_1.INativeEnvironmentService),
        __param(2, log_1.ILogService)
    ], LocalizationsService);
    exports.LocalizationsService = LocalizationsService;
    let LanguagePacksCache = class LanguagePacksCache extends lifecycle_1.Disposable {
        constructor(environmentService, logService) {
            super();
            this.logService = logService;
            this.languagePacks = {};
            this.languagePacksFilePath = path_1.join(environmentService.userDataPath, 'languagepacks.json');
            this.languagePacksFileLimiter = new async_1.Queue();
        }
        getLanguagePacks() {
            // if queue is not empty, fetch from disk
            if (this.languagePacksFileLimiter.size || !this.initializedCache) {
                return this.withLanguagePacks()
                    .then(() => this.languagePacks);
            }
            return Promise.resolve(this.languagePacks);
        }
        update(extensions) {
            return this.withLanguagePacks(languagePacks => {
                Object.keys(languagePacks).forEach(language => delete languagePacks[language]);
                this.createLanguagePacksFromExtensions(languagePacks, ...extensions);
            }).then(() => this.languagePacks);
        }
        createLanguagePacksFromExtensions(languagePacks, ...extensions) {
            for (const extension of extensions) {
                if (extension && extension.manifest && extension.manifest.contributes && extension.manifest.contributes.localizations && extension.manifest.contributes.localizations.length) {
                    this.createLanguagePacksFromExtension(languagePacks, extension);
                }
            }
            Object.keys(languagePacks).forEach(languageId => this.updateHash(languagePacks[languageId]));
        }
        createLanguagePacksFromExtension(languagePacks, extension) {
            const extensionIdentifier = extension.identifier;
            const localizations = extension.manifest.contributes && extension.manifest.contributes.localizations ? extension.manifest.contributes.localizations : [];
            for (const localizationContribution of localizations) {
                if (extension.location.scheme === network_1.Schemas.file && localizations_1.isValidLocalization(localizationContribution)) {
                    let languagePack = languagePacks[localizationContribution.languageId];
                    if (!languagePack) {
                        languagePack = { hash: '', extensions: [], translations: {} };
                        languagePacks[localizationContribution.languageId] = languagePack;
                    }
                    let extensionInLanguagePack = languagePack.extensions.filter(e => extensionManagementUtil_1.areSameExtensions(e.extensionIdentifier, extensionIdentifier))[0];
                    if (extensionInLanguagePack) {
                        extensionInLanguagePack.version = extension.manifest.version;
                    }
                    else {
                        languagePack.extensions.push({ extensionIdentifier, version: extension.manifest.version });
                    }
                    for (const translation of localizationContribution.translations) {
                        languagePack.translations[translation.id] = path_1.join(extension.location.fsPath, translation.path);
                    }
                }
            }
        }
        updateHash(languagePack) {
            if (languagePack) {
                const md5 = crypto_1.createHash('md5');
                for (const extension of languagePack.extensions) {
                    md5.update(extension.extensionIdentifier.uuid || extension.extensionIdentifier.id).update(extension.version);
                }
                languagePack.hash = md5.digest('hex');
            }
        }
        withLanguagePacks(fn = () => null) {
            return this.languagePacksFileLimiter.queue(() => {
                let result = null;
                return pfs.readFile(this.languagePacksFilePath, 'utf8')
                    .then(undefined, err => err.code === 'ENOENT' ? Promise.resolve('{}') : Promise.reject(err))
                    .then(raw => { try {
                    return JSON.parse(raw);
                }
                catch (e) {
                    return {};
                } })
                    .then(languagePacks => { result = fn(languagePacks); return languagePacks; })
                    .then(languagePacks => {
                    for (const language of Object.keys(languagePacks)) {
                        if (!languagePacks[language]) {
                            delete languagePacks[language];
                        }
                    }
                    this.languagePacks = languagePacks;
                    this.initializedCache = true;
                    const raw = JSON.stringify(this.languagePacks);
                    this.logService.debug('Writing language packs', raw);
                    return pfs.writeFile(this.languagePacksFilePath, raw);
                })
                    .then(() => result, error => this.logService.error(error));
            });
        }
    };
    LanguagePacksCache = __decorate([
        __param(0, environment_1.INativeEnvironmentService),
        __param(1, log_1.ILogService)
    ], LanguagePacksCache);
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[97/*vs/platform/log/node/spdlogService*/], __M([0/*require*/,1/*exports*/,3/*vs/base/common/path*/,7/*vs/platform/log/common/log*/]), function (require, exports, path, log_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SpdLogService = exports.createRotatingLogger = void 0;
    async function createSpdLogLogger(processName, logsFolder) {
        // Do not crash if spdlog cannot be loaded
        try {
            const _spdlog = await new Promise((resolve_1, reject_1) => { require(['spdlog'], resolve_1, reject_1); });
            _spdlog.setAsyncMode(8192, 500);
            const logfilePath = path.join(logsFolder, `${processName}.log`);
            return _spdlog.createRotatingLoggerAsync(processName, logfilePath, 1024 * 1024 * 5, 6);
        }
        catch (e) {
            console.error(e);
        }
        return null;
    }
    function createRotatingLogger(name, filename, filesize, filecount) {
        const _spdlog = require.__$__nodeRequire('spdlog');
        return _spdlog.createRotatingLogger(name, filename, filesize, filecount);
    }
    exports.createRotatingLogger = createRotatingLogger;
    function log(logger, level, message) {
        switch (level) {
            case log_1.LogLevel.Trace:
                logger.trace(message);
                break;
            case log_1.LogLevel.Debug:
                logger.debug(message);
                break;
            case log_1.LogLevel.Info:
                logger.info(message);
                break;
            case log_1.LogLevel.Warning:
                logger.warn(message);
                break;
            case log_1.LogLevel.Error:
                logger.error(message);
                break;
            case log_1.LogLevel.Critical:
                logger.critical(message);
                break;
            default: throw new Error('Invalid log level');
        }
    }
    class SpdLogService extends log_1.AbstractLogService {
        constructor(name, logsFolder, level) {
            super();
            this.name = name;
            this.logsFolder = logsFolder;
            this.buffer = [];
            this._loggerCreationPromise = undefined;
            this.setLevel(level);
            this._createSpdLogLogger();
            this._register(this.onDidChangeLogLevel(level => {
                if (this._logger) {
                    this._logger.setLevel(level);
                }
            }));
        }
        _createSpdLogLogger() {
            if (!this._loggerCreationPromise) {
                this._loggerCreationPromise = createSpdLogLogger(this.name, this.logsFolder)
                    .then(logger => {
                    if (logger) {
                        this._logger = logger;
                        this._logger.setLevel(this.getLevel());
                        for (const { level, message } of this.buffer) {
                            log(this._logger, level, message);
                        }
                        this.buffer = [];
                    }
                });
            }
            return this._loggerCreationPromise;
        }
        _log(level, message) {
            if (this._logger) {
                log(this._logger, level, message);
            }
            else if (this.getLevel() <= level) {
                this.buffer.push({ level, message });
            }
        }
        trace(message, ...args) {
            if (this.getLevel() <= log_1.LogLevel.Trace) {
                this._log(log_1.LogLevel.Trace, this.format([message, ...args]));
            }
        }
        debug(message, ...args) {
            if (this.getLevel() <= log_1.LogLevel.Debug) {
                this._log(log_1.LogLevel.Debug, this.format([message, ...args]));
            }
        }
        info(message, ...args) {
            if (this.getLevel() <= log_1.LogLevel.Info) {
                this._log(log_1.LogLevel.Info, this.format([message, ...args]));
            }
        }
        warn(message, ...args) {
            if (this.getLevel() <= log_1.LogLevel.Warning) {
                this._log(log_1.LogLevel.Warning, this.format([message, ...args]));
            }
        }
        error(message, ...args) {
            if (this.getLevel() <= log_1.LogLevel.Error) {
                if (message instanceof Error) {
                    const array = Array.prototype.slice.call(arguments);
                    array[0] = message.stack;
                    this._log(log_1.LogLevel.Error, this.format(array));
                }
                else {
                    this._log(log_1.LogLevel.Error, this.format([message, ...args]));
                }
            }
        }
        critical(message, ...args) {
            if (this.getLevel() <= log_1.LogLevel.Critical) {
                this._log(log_1.LogLevel.Critical, this.format([message, ...args]));
            }
        }
        flush() {
            if (this._logger) {
                this._logger.flush();
            }
            else if (this._loggerCreationPromise) {
                this._loggerCreationPromise.then(() => this.flush());
            }
        }
        dispose() {
            if (this._logger) {
                this.disposeLogger();
            }
            else if (this._loggerCreationPromise) {
                this._loggerCreationPromise.then(() => this.disposeLogger());
            }
            this._loggerCreationPromise = undefined;
        }
        disposeLogger() {
            if (this._logger) {
                this._logger.drop();
                this._logger = undefined;
            }
        }
        format(args) {
            let result = '';
            for (let i = 0; i < args.length; i++) {
                let a = args[i];
                if (typeof a === 'object') {
                    try {
                        a = JSON.stringify(a);
                    }
                    catch (e) { }
                }
                result += (i > 0 ? ' ' : '') + a;
            }
            return result;
        }
    }
    exports.SpdLogService = SpdLogService;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/






define(__m[98/*vs/platform/environment/node/environmentService*/], __M([0/*require*/,1/*exports*/,96/*crypto*/,58/*vs/base/node/paths*/,99/*os*/,3/*vs/base/common/path*/,21/*vs/base/common/resources*/,54/*vs/base/common/decorators*/,49/*vs/platform/product/common/product*/,62/*vs/base/common/date*/,14/*vs/base/common/platform*/,9/*vs/base/common/network*/,13/*vs/base/common/uri*/]), function (require, exports, crypto, paths, os, path, resources, decorators_1, product_1, date_1, platform_1, network_1, uri_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseUserDataDir = exports.parsePathArg = exports.parseSearchPort = exports.parseExtensionHostPort = exports.xdgRuntimeDir = exports.NativeEnvironmentService = void 0;
    class NativeEnvironmentService {
        constructor(_args) {
            this._args = _args;
            if (!process.env['VSCODE_LOGS']) {
                const key = date_1.toLocalISOString(new Date()).replace(/-|:|\.\d+Z$/g, '');
                process.env['VSCODE_LOGS'] = path.join(this.userDataPath, 'logs', key);
            }
            this.logsPath = process.env['VSCODE_LOGS'];
        }
        get args() { return this._args; }
        get appRoot() { return path.dirname(network_1.FileAccess.asFileUri('', require).fsPath); }
        get userHome() { return uri_1.URI.file(os.homedir()); }
        get userDataPath() {
            const vscodePortable = process.env['VSCODE_PORTABLE'];
            if (vscodePortable) {
                return path.join(vscodePortable, 'user-data');
            }
            return parseUserDataDir(this._args, process);
        }
        get appSettingsHome() { return uri_1.URI.file(path.join(this.userDataPath, 'User')); }
        get tmpDir() { return uri_1.URI.file(os.tmpdir()); }
        get userRoamingDataHome() { return this.appSettingsHome; }
        get settingsResource() { return resources.joinPath(this.userRoamingDataHome, 'settings.json'); }
        get userDataSyncHome() { return resources.joinPath(this.userRoamingDataHome, 'sync'); }
        get userDataSyncLogResource() { return uri_1.URI.file(path.join(this.logsPath, 'userDataSync.log')); }
        get sync() { return this.args.sync; }
        get machineSettingsResource() { return resources.joinPath(uri_1.URI.file(path.join(this.userDataPath, 'Machine')), 'settings.json'); }
        get globalStorageHome() { return uri_1.URI.joinPath(this.appSettingsHome, 'globalStorage'); }
        get workspaceStorageHome() { return uri_1.URI.joinPath(this.appSettingsHome, 'workspaceStorage'); }
        get keybindingsResource() { return resources.joinPath(this.userRoamingDataHome, 'keybindings.json'); }
        get keyboardLayoutResource() { return resources.joinPath(this.userRoamingDataHome, 'keyboardLayout.json'); }
        get argvResource() {
            const vscodePortable = process.env['VSCODE_PORTABLE'];
            if (vscodePortable) {
                return uri_1.URI.file(path.join(vscodePortable, 'argv.json'));
            }
            return resources.joinPath(this.userHome, product_1.default.dataFolderName, 'argv.json');
        }
        get snippetsHome() { return resources.joinPath(this.userRoamingDataHome, 'snippets'); }
        get isExtensionDevelopment() { return !!this._args.extensionDevelopmentPath; }
        get backupHome() { return path.join(this.userDataPath, 'Backups'); }
        get backupWorkspacesPath() { return path.join(this.backupHome, 'workspaces.json'); }
        get untitledWorkspacesHome() { return uri_1.URI.file(path.join(this.userDataPath, 'Workspaces')); }
        get installSourcePath() { return path.join(this.userDataPath, 'installSource'); }
        get builtinExtensionsPath() {
            const fromArgs = parsePathArg(this._args['builtin-extensions-dir'], process);
            if (fromArgs) {
                return fromArgs;
            }
            else {
                return path.normalize(path.join(network_1.FileAccess.asFileUri('', require).fsPath, '..', 'extensions'));
            }
        }
        get extensionsDownloadPath() {
            const fromArgs = parsePathArg(this._args['extensions-download-dir'], process);
            if (fromArgs) {
                return fromArgs;
            }
            else {
                return path.join(this.userDataPath, 'CachedExtensionVSIXs');
            }
        }
        get extensionsPath() {
            const fromArgs = parsePathArg(this._args['extensions-dir'], process);
            if (fromArgs) {
                return fromArgs;
            }
            const vscodeExtensions = process.env['VSCODE_EXTENSIONS'];
            if (vscodeExtensions) {
                return vscodeExtensions;
            }
            const vscodePortable = process.env['VSCODE_PORTABLE'];
            if (vscodePortable) {
                return path.join(vscodePortable, 'extensions');
            }
            return resources.joinPath(this.userHome, product_1.default.dataFolderName, 'extensions').fsPath;
        }
        get extensionDevelopmentLocationURI() {
            const s = this._args.extensionDevelopmentPath;
            if (Array.isArray(s)) {
                return s.map(p => {
                    if (/^[^:/?#]+?:\/\//.test(p)) {
                        return uri_1.URI.parse(p);
                    }
                    return uri_1.URI.file(path.normalize(p));
                });
            }
            return undefined;
        }
        get extensionTestsLocationURI() {
            const s = this._args.extensionTestsPath;
            if (s) {
                if (/^[^:/?#]+?:\/\//.test(s)) {
                    return uri_1.URI.parse(s);
                }
                return uri_1.URI.file(path.normalize(s));
            }
            return undefined;
        }
        get disableExtensions() {
            if (this._args['disable-extensions']) {
                return true;
            }
            const disableExtensions = this._args['disable-extension'];
            if (disableExtensions) {
                if (typeof disableExtensions === 'string') {
                    return [disableExtensions];
                }
                if (Array.isArray(disableExtensions) && disableExtensions.length > 0) {
                    return disableExtensions;
                }
            }
            return false;
        }
        get debugExtensionHost() { return parseExtensionHostPort(this._args, this.isBuilt); }
        get isBuilt() { return !process.env['VSCODE_DEV']; }
        get verbose() { return !!this._args.verbose; }
        get logLevel() { return this._args.log; }
        get mainIPCHandle() { return getIPCHandle(this.userDataPath, 'main'); }
        get sharedIPCHandle() { return getIPCHandle(this.userDataPath, 'shared'); }
        get nodeCachedDataDir() { return process.env['VSCODE_NODE_CACHED_DATA_DIR'] || undefined; }
        get serviceMachineIdResource() { return resources.joinPath(uri_1.URI.file(this.userDataPath), 'machineid'); }
        get disableUpdates() { return !!this._args['disable-updates']; }
        get crashReporterId() { return this._args['crash-reporter-id']; }
        get crashReporterDirectory() { return this._args['crash-reporter-directory']; }
        get driverHandle() { return this._args['driver']; }
        get driverVerbose() { return !!this._args['driver-verbose']; }
        get disableTelemetry() { return !!this._args['disable-telemetry']; }
        get sandbox() { return !!this._args['__sandbox']; }
    }
    __decorate([
        decorators_1.memoize
    ], NativeEnvironmentService.prototype, "appRoot", null);
    __decorate([
        decorators_1.memoize
    ], NativeEnvironmentService.prototype, "userHome", null);
    __decorate([
        decorators_1.memoize
    ], NativeEnvironmentService.prototype, "userDataPath", null);
    __decorate([
        decorators_1.memoize
    ], NativeEnvironmentService.prototype, "appSettingsHome", null);
    __decorate([
        decorators_1.memoize
    ], NativeEnvironmentService.prototype, "tmpDir", null);
    __decorate([
        decorators_1.memoize
    ], NativeEnvironmentService.prototype, "userRoamingDataHome", null);
    __decorate([
        decorators_1.memoize
    ], NativeEnvironmentService.prototype, "settingsResource", null);
    __decorate([
        decorators_1.memoize
    ], NativeEnvironmentService.prototype, "userDataSyncHome", null);
    __decorate([
        decorators_1.memoize
    ], NativeEnvironmentService.prototype, "userDataSyncLogResource", null);
    __decorate([
        decorators_1.memoize
    ], NativeEnvironmentService.prototype, "sync", null);
    __decorate([
        decorators_1.memoize
    ], NativeEnvironmentService.prototype, "machineSettingsResource", null);
    __decorate([
        decorators_1.memoize
    ], NativeEnvironmentService.prototype, "globalStorageHome", null);
    __decorate([
        decorators_1.memoize
    ], NativeEnvironmentService.prototype, "workspaceStorageHome", null);
    __decorate([
        decorators_1.memoize
    ], NativeEnvironmentService.prototype, "keybindingsResource", null);
    __decorate([
        decorators_1.memoize
    ], NativeEnvironmentService.prototype, "keyboardLayoutResource", null);
    __decorate([
        decorators_1.memoize
    ], NativeEnvironmentService.prototype, "argvResource", null);
    __decorate([
        decorators_1.memoize
    ], NativeEnvironmentService.prototype, "snippetsHome", null);
    __decorate([
        decorators_1.memoize
    ], NativeEnvironmentService.prototype, "isExtensionDevelopment", null);
    __decorate([
        decorators_1.memoize
    ], NativeEnvironmentService.prototype, "backupHome", null);
    __decorate([
        decorators_1.memoize
    ], NativeEnvironmentService.prototype, "backupWorkspacesPath", null);
    __decorate([
        decorators_1.memoize
    ], NativeEnvironmentService.prototype, "untitledWorkspacesHome", null);
    __decorate([
        decorators_1.memoize
    ], NativeEnvironmentService.prototype, "installSourcePath", null);
    __decorate([
        decorators_1.memoize
    ], NativeEnvironmentService.prototype, "builtinExtensionsPath", null);
    __decorate([
        decorators_1.memoize
    ], NativeEnvironmentService.prototype, "extensionsPath", null);
    __decorate([
        decorators_1.memoize
    ], NativeEnvironmentService.prototype, "extensionDevelopmentLocationURI", null);
    __decorate([
        decorators_1.memoize
    ], NativeEnvironmentService.prototype, "extensionTestsLocationURI", null);
    __decorate([
        decorators_1.memoize
    ], NativeEnvironmentService.prototype, "debugExtensionHost", null);
    __decorate([
        decorators_1.memoize
    ], NativeEnvironmentService.prototype, "mainIPCHandle", null);
    __decorate([
        decorators_1.memoize
    ], NativeEnvironmentService.prototype, "sharedIPCHandle", null);
    __decorate([
        decorators_1.memoize
    ], NativeEnvironmentService.prototype, "nodeCachedDataDir", null);
    __decorate([
        decorators_1.memoize
    ], NativeEnvironmentService.prototype, "serviceMachineIdResource", null);
    exports.NativeEnvironmentService = NativeEnvironmentService;
    // Read this before there's any chance it is overwritten
    // Related to https://github.com/microsoft/vscode/issues/30624
    exports.xdgRuntimeDir = process.env['XDG_RUNTIME_DIR'];
    const safeIpcPathLengths = {
        [2 /* Linux */]: 107,
        [1 /* Mac */]: 103
    };
    function getNixIPCHandle(userDataPath, type) {
        const vscodePortable = process.env['VSCODE_PORTABLE'];
        let result;
        if (exports.xdgRuntimeDir && !vscodePortable) {
            const scope = crypto.createHash('md5').update(userDataPath).digest('hex').substr(0, 8);
            result = path.join(exports.xdgRuntimeDir, `vscode-${scope}-${product_1.default.version}-${type}.sock`);
        }
        else {
            result = path.join(userDataPath, `${product_1.default.version}-${type}.sock`);
        }
        const limit = safeIpcPathLengths[platform_1.platform];
        if (typeof limit === 'number') {
            if (result.length >= limit) {
                // https://nodejs.org/api/net.html#net_identifying_paths_for_ipc_connections
                console.warn(`WARNING: IPC handle "${result}" is longer than ${limit} chars, try a shorter --user-data-dir`);
            }
        }
        return result;
    }
    function getWin32IPCHandle(userDataPath, type) {
        const scope = crypto.createHash('md5').update(userDataPath).digest('hex');
        return `\\\\.\\pipe\\${scope}-${product_1.default.version}-${type}-sock`;
    }
    function getIPCHandle(userDataPath, type) {
        if (platform_1.isWindows) {
            return getWin32IPCHandle(userDataPath, type);
        }
        return getNixIPCHandle(userDataPath, type);
    }
    function parseExtensionHostPort(args, isBuild) {
        return parseDebugPort(args['inspect-extensions'], args['inspect-brk-extensions'], 5870, isBuild, args.debugId);
    }
    exports.parseExtensionHostPort = parseExtensionHostPort;
    function parseSearchPort(args, isBuild) {
        return parseDebugPort(args['inspect-search'], args['inspect-brk-search'], 5876, isBuild);
    }
    exports.parseSearchPort = parseSearchPort;
    function parseDebugPort(debugArg, debugBrkArg, defaultBuildPort, isBuild, debugId) {
        const portStr = debugBrkArg || debugArg;
        const port = Number(portStr) || (!isBuild ? defaultBuildPort : null);
        const brk = port ? Boolean(!!debugBrkArg) : false;
        return { port, break: brk, debugId };
    }
    function parsePathArg(arg, process) {
        if (!arg) {
            return undefined;
        }
        // Determine if the arg is relative or absolute, if relative use the original CWD
        // (VSCODE_CWD), not the potentially overridden one (process.cwd()).
        const resolved = path.resolve(arg);
        if (path.normalize(arg) === resolved) {
            return resolved;
        }
        return path.resolve(process.env['VSCODE_CWD'] || process.cwd(), arg);
    }
    exports.parsePathArg = parsePathArg;
    function parseUserDataDir(args, process) {
        return parsePathArg(args['user-data-dir'], process) || path.resolve(paths.getDefaultUserDataPath(process.platform));
    }
    exports.parseUserDataDir = parseUserDataDir;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[36/*vs/platform/product/common/productService*/], __M([0/*require*/,1/*exports*/,4/*vs/platform/instantiation/common/instantiation*/]), function (require, exports, instantiation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IProductService = void 0;
    exports.IProductService = instantiation_1.createDecorator('productService');
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[22/*vs/platform/registry/common/platform*/], __M([0/*require*/,1/*exports*/,8/*vs/base/common/types*/,53/*vs/base/common/assert*/]), function (require, exports, Types, Assert) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Registry = void 0;
    class RegistryImpl {
        constructor() {
            this.data = new Map();
        }
        add(id, data) {
            Assert.ok(Types.isString(id));
            Assert.ok(Types.isObject(data));
            Assert.ok(!this.data.has(id), 'There is already an extension with this id');
            this.data.set(id, data);
        }
        knows(id) {
            return this.data.has(id);
        }
        as(id) {
            return this.data.get(id) || null;
        }
    }
    exports.Registry = new RegistryImpl();
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[100/*vs/platform/jsonschemas/common/jsonContributionRegistry*/], __M([0/*require*/,1/*exports*/,22/*vs/platform/registry/common/platform*/,11/*vs/base/common/event*/]), function (require, exports, platform, event_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Extensions = void 0;
    exports.Extensions = {
        JSONContribution: 'base.contributions.json'
    };
    function normalizeId(id) {
        if (id.length > 0 && id.charAt(id.length - 1) === '#') {
            return id.substring(0, id.length - 1);
        }
        return id;
    }
    class JSONContributionRegistry {
        constructor() {
            this._onDidChangeSchema = new event_1.Emitter();
            this.onDidChangeSchema = this._onDidChangeSchema.event;
            this.schemasById = {};
        }
        registerSchema(uri, unresolvedSchemaContent) {
            this.schemasById[normalizeId(uri)] = unresolvedSchemaContent;
            this._onDidChangeSchema.fire(uri);
        }
        notifySchemaChanged(uri) {
            this._onDidChangeSchema.fire(uri);
        }
        getSchemaContributions() {
            return {
                schemas: this.schemasById,
            };
        }
    }
    const jsonContributionRegistry = new JSONContributionRegistry();
    platform.Registry.add(exports.Extensions.JSONContribution, jsonContributionRegistry);
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[29/*vs/platform/configuration/common/configurationRegistry*/], __M([0/*require*/,1/*exports*/,68/*vs/nls!vs/platform/configuration/common/configurationRegistry*/,11/*vs/base/common/event*/,22/*vs/platform/registry/common/platform*/,8/*vs/base/common/types*/,100/*vs/platform/jsonschemas/common/jsonContributionRegistry*/]), function (require, exports, nls, event_1, platform_1, types, jsonContributionRegistry_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getScopes = exports.validateProperty = exports.getDefaultValue = exports.overrideIdentifierFromKey = exports.OVERRIDE_PROPERTY_PATTERN = exports.resourceLanguageSettingsSchemaId = exports.resourceSettings = exports.windowSettings = exports.machineOverridableSettings = exports.machineSettings = exports.applicationSettings = exports.allSettings = exports.ConfigurationScope = exports.Extensions = void 0;
    exports.Extensions = {
        Configuration: 'base.contributions.configuration'
    };
    var ConfigurationScope;
    (function (ConfigurationScope) {
        /**
         * Application specific configuration, which can be configured only in local user settings.
         */
        ConfigurationScope[ConfigurationScope["APPLICATION"] = 1] = "APPLICATION";
        /**
         * Machine specific configuration, which can be configured only in local and remote user settings.
         */
        ConfigurationScope[ConfigurationScope["MACHINE"] = 2] = "MACHINE";
        /**
         * Window specific configuration, which can be configured in the user or workspace settings.
         */
        ConfigurationScope[ConfigurationScope["WINDOW"] = 3] = "WINDOW";
        /**
         * Resource specific configuration, which can be configured in the user, workspace or folder settings.
         */
        ConfigurationScope[ConfigurationScope["RESOURCE"] = 4] = "RESOURCE";
        /**
         * Resource specific configuration that can be configured in language specific settings
         */
        ConfigurationScope[ConfigurationScope["LANGUAGE_OVERRIDABLE"] = 5] = "LANGUAGE_OVERRIDABLE";
        /**
         * Machine specific configuration that can also be configured in workspace or folder settings.
         */
        ConfigurationScope[ConfigurationScope["MACHINE_OVERRIDABLE"] = 6] = "MACHINE_OVERRIDABLE";
    })(ConfigurationScope = exports.ConfigurationScope || (exports.ConfigurationScope = {}));
    exports.allSettings = { properties: {}, patternProperties: {} };
    exports.applicationSettings = { properties: {}, patternProperties: {} };
    exports.machineSettings = { properties: {}, patternProperties: {} };
    exports.machineOverridableSettings = { properties: {}, patternProperties: {} };
    exports.windowSettings = { properties: {}, patternProperties: {} };
    exports.resourceSettings = { properties: {}, patternProperties: {} };
    exports.resourceLanguageSettingsSchemaId = 'vscode://schemas/settings/resourceLanguage';
    const contributionRegistry = platform_1.Registry.as(jsonContributionRegistry_1.Extensions.JSONContribution);
    class ConfigurationRegistry {
        constructor() {
            this.overrideIdentifiers = new Set();
            this._onDidSchemaChange = new event_1.Emitter();
            this.onDidSchemaChange = this._onDidSchemaChange.event;
            this._onDidUpdateConfiguration = new event_1.Emitter();
            this.onDidUpdateConfiguration = this._onDidUpdateConfiguration.event;
            this.defaultValues = {};
            this.defaultLanguageConfigurationOverridesNode = {
                id: 'defaultOverrides',
                title: nls.localize(0, null),
                properties: {}
            };
            this.configurationContributors = [this.defaultLanguageConfigurationOverridesNode];
            this.resourceLanguageSettingsSchema = { properties: {}, patternProperties: {}, additionalProperties: false, errorMessage: 'Unknown editor configuration setting', allowTrailingCommas: true, allowComments: true };
            this.configurationProperties = {};
            this.excludedConfigurationProperties = {};
            contributionRegistry.registerSchema(exports.resourceLanguageSettingsSchemaId, this.resourceLanguageSettingsSchema);
        }
        registerConfiguration(configuration, validate = true) {
            this.registerConfigurations([configuration], validate);
        }
        registerConfigurations(configurations, validate = true) {
            const properties = [];
            configurations.forEach(configuration => {
                properties.push(...this.validateAndRegisterProperties(configuration, validate)); // fills in defaults
                this.configurationContributors.push(configuration);
                this.registerJSONConfiguration(configuration);
            });
            contributionRegistry.registerSchema(exports.resourceLanguageSettingsSchemaId, this.resourceLanguageSettingsSchema);
            this._onDidSchemaChange.fire();
            this._onDidUpdateConfiguration.fire(properties);
        }
        deregisterConfigurations(configurations) {
            const properties = [];
            const deregisterConfiguration = (configuration) => {
                if (configuration.properties) {
                    for (const key in configuration.properties) {
                        properties.push(key);
                        delete this.configurationProperties[key];
                        this.removeFromSchema(key, configuration.properties[key]);
                    }
                }
                if (configuration.allOf) {
                    configuration.allOf.forEach(node => deregisterConfiguration(node));
                }
            };
            for (const configuration of configurations) {
                deregisterConfiguration(configuration);
                const index = this.configurationContributors.indexOf(configuration);
                if (index !== -1) {
                    this.configurationContributors.splice(index, 1);
                }
            }
            contributionRegistry.registerSchema(exports.resourceLanguageSettingsSchemaId, this.resourceLanguageSettingsSchema);
            this._onDidSchemaChange.fire();
            this._onDidUpdateConfiguration.fire(properties);
        }
        registerDefaultConfigurations(defaultConfigurations) {
            const properties = [];
            const overrideIdentifiers = [];
            for (const defaultConfiguration of defaultConfigurations) {
                for (const key in defaultConfiguration) {
                    properties.push(key);
                    this.defaultValues[key] = defaultConfiguration[key];
                    if (exports.OVERRIDE_PROPERTY_PATTERN.test(key)) {
                        const property = {
                            type: 'object',
                            default: this.defaultValues[key],
                            description: nls.localize(1, null, key),
                            $ref: exports.resourceLanguageSettingsSchemaId
                        };
                        overrideIdentifiers.push(overrideIdentifierFromKey(key));
                        this.configurationProperties[key] = property;
                        this.defaultLanguageConfigurationOverridesNode.properties[key] = property;
                    }
                    else {
                        const property = this.configurationProperties[key];
                        if (property) {
                            this.updatePropertyDefaultValue(key, property);
                            this.updateSchema(key, property);
                        }
                    }
                }
            }
            this.registerOverrideIdentifiers(overrideIdentifiers);
            this._onDidSchemaChange.fire();
            this._onDidUpdateConfiguration.fire(properties);
        }
        deregisterDefaultConfigurations(defaultConfigurations) {
            const properties = [];
            for (const defaultConfiguration of defaultConfigurations) {
                for (const key in defaultConfiguration) {
                    properties.push(key);
                    delete this.defaultValues[key];
                    if (exports.OVERRIDE_PROPERTY_PATTERN.test(key)) {
                        delete this.configurationProperties[key];
                        delete this.defaultLanguageConfigurationOverridesNode.properties[key];
                    }
                    else {
                        const property = this.configurationProperties[key];
                        if (property) {
                            this.updatePropertyDefaultValue(key, property);
                            this.updateSchema(key, property);
                        }
                    }
                }
            }
            this.updateOverridePropertyPatternKey();
            this._onDidSchemaChange.fire();
            this._onDidUpdateConfiguration.fire(properties);
        }
        notifyConfigurationSchemaUpdated(...configurations) {
            this._onDidSchemaChange.fire();
        }
        registerOverrideIdentifiers(overrideIdentifiers) {
            for (const overrideIdentifier of overrideIdentifiers) {
                this.overrideIdentifiers.add(overrideIdentifier);
            }
            this.updateOverridePropertyPatternKey();
        }
        validateAndRegisterProperties(configuration, validate = true, scope = 3 /* WINDOW */) {
            scope = types.isUndefinedOrNull(configuration.scope) ? scope : configuration.scope;
            let propertyKeys = [];
            let properties = configuration.properties;
            if (properties) {
                for (let key in properties) {
                    if (validate && validateProperty(key)) {
                        delete properties[key];
                        continue;
                    }
                    const property = properties[key];
                    // update default value
                    this.updatePropertyDefaultValue(key, property);
                    // update scope
                    if (exports.OVERRIDE_PROPERTY_PATTERN.test(key)) {
                        property.scope = undefined; // No scope for overridable properties `[${identifier}]`
                    }
                    else {
                        property.scope = types.isUndefinedOrNull(property.scope) ? scope : property.scope;
                    }
                    // Add to properties maps
                    // Property is included by default if 'included' is unspecified
                    if (properties[key].hasOwnProperty('included') && !properties[key].included) {
                        this.excludedConfigurationProperties[key] = properties[key];
                        delete properties[key];
                        continue;
                    }
                    else {
                        this.configurationProperties[key] = properties[key];
                    }
                    if (!properties[key].deprecationMessage && properties[key].markdownDeprecationMessage) {
                        // If not set, default deprecationMessage to the markdown source
                        properties[key].deprecationMessage = properties[key].markdownDeprecationMessage;
                    }
                    propertyKeys.push(key);
                }
            }
            let subNodes = configuration.allOf;
            if (subNodes) {
                for (let node of subNodes) {
                    propertyKeys.push(...this.validateAndRegisterProperties(node, validate, scope));
                }
            }
            return propertyKeys;
        }
        getConfigurations() {
            return this.configurationContributors;
        }
        getConfigurationProperties() {
            return this.configurationProperties;
        }
        getExcludedConfigurationProperties() {
            return this.excludedConfigurationProperties;
        }
        registerJSONConfiguration(configuration) {
            const register = (configuration) => {
                let properties = configuration.properties;
                if (properties) {
                    for (const key in properties) {
                        this.updateSchema(key, properties[key]);
                    }
                }
                let subNodes = configuration.allOf;
                if (subNodes) {
                    subNodes.forEach(register);
                }
            };
            register(configuration);
        }
        updateSchema(key, property) {
            exports.allSettings.properties[key] = property;
            switch (property.scope) {
                case 1 /* APPLICATION */:
                    exports.applicationSettings.properties[key] = property;
                    break;
                case 2 /* MACHINE */:
                    exports.machineSettings.properties[key] = property;
                    break;
                case 6 /* MACHINE_OVERRIDABLE */:
                    exports.machineOverridableSettings.properties[key] = property;
                    break;
                case 3 /* WINDOW */:
                    exports.windowSettings.properties[key] = property;
                    break;
                case 4 /* RESOURCE */:
                    exports.resourceSettings.properties[key] = property;
                    break;
                case 5 /* LANGUAGE_OVERRIDABLE */:
                    exports.resourceSettings.properties[key] = property;
                    this.resourceLanguageSettingsSchema.properties[key] = property;
                    break;
            }
        }
        removeFromSchema(key, property) {
            delete exports.allSettings.properties[key];
            switch (property.scope) {
                case 1 /* APPLICATION */:
                    delete exports.applicationSettings.properties[key];
                    break;
                case 2 /* MACHINE */:
                    delete exports.machineSettings.properties[key];
                    break;
                case 6 /* MACHINE_OVERRIDABLE */:
                    delete exports.machineOverridableSettings.properties[key];
                    break;
                case 3 /* WINDOW */:
                    delete exports.windowSettings.properties[key];
                    break;
                case 4 /* RESOURCE */:
                case 5 /* LANGUAGE_OVERRIDABLE */:
                    delete exports.resourceSettings.properties[key];
                    break;
            }
        }
        updateOverridePropertyPatternKey() {
            for (const overrideIdentifier of this.overrideIdentifiers.values()) {
                const overrideIdentifierProperty = `[${overrideIdentifier}]`;
                const resourceLanguagePropertiesSchema = {
                    type: 'object',
                    description: nls.localize(2, null),
                    errorMessage: nls.localize(3, null),
                    $ref: exports.resourceLanguageSettingsSchemaId,
                };
                this.updatePropertyDefaultValue(overrideIdentifierProperty, resourceLanguagePropertiesSchema);
                exports.allSettings.properties[overrideIdentifierProperty] = resourceLanguagePropertiesSchema;
                exports.applicationSettings.properties[overrideIdentifierProperty] = resourceLanguagePropertiesSchema;
                exports.machineSettings.properties[overrideIdentifierProperty] = resourceLanguagePropertiesSchema;
                exports.machineOverridableSettings.properties[overrideIdentifierProperty] = resourceLanguagePropertiesSchema;
                exports.windowSettings.properties[overrideIdentifierProperty] = resourceLanguagePropertiesSchema;
                exports.resourceSettings.properties[overrideIdentifierProperty] = resourceLanguagePropertiesSchema;
            }
            this._onDidSchemaChange.fire();
        }
        updatePropertyDefaultValue(key, property) {
            let defaultValue = this.defaultValues[key];
            if (types.isUndefined(defaultValue)) {
                defaultValue = property.default;
            }
            if (types.isUndefined(defaultValue)) {
                defaultValue = getDefaultValue(property.type);
            }
            property.default = defaultValue;
        }
    }
    const OVERRIDE_PROPERTY = '\\[.*\\]$';
    exports.OVERRIDE_PROPERTY_PATTERN = new RegExp(OVERRIDE_PROPERTY);
    function overrideIdentifierFromKey(key) {
        return key.substring(1, key.length - 1);
    }
    exports.overrideIdentifierFromKey = overrideIdentifierFromKey;
    function getDefaultValue(type) {
        const t = Array.isArray(type) ? type[0] : type;
        switch (t) {
            case 'boolean':
                return false;
            case 'integer':
            case 'number':
                return 0;
            case 'string':
                return '';
            case 'array':
                return [];
            case 'object':
                return {};
            default:
                return null;
        }
    }
    exports.getDefaultValue = getDefaultValue;
    const configurationRegistry = new ConfigurationRegistry();
    platform_1.Registry.add(exports.Extensions.Configuration, configurationRegistry);
    function validateProperty(property) {
        if (exports.OVERRIDE_PROPERTY_PATTERN.test(property)) {
            return nls.localize(4, null, property);
        }
        if (configurationRegistry.getConfigurationProperties()[property] !== undefined) {
            return nls.localize(5, null, property);
        }
        return null;
    }
    exports.validateProperty = validateProperty;
    function getScopes() {
        const scopes = [];
        const configurationProperties = configurationRegistry.getConfigurationProperties();
        for (const key of Object.keys(configurationProperties)) {
            scopes.push([key, configurationProperties[key].scope]);
        }
        scopes.push(['launch', 4 /* RESOURCE */]);
        scopes.push(['task', 4 /* RESOURCE */]);
        return scopes;
    }
    exports.getScopes = getScopes;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[27/*vs/platform/configuration/common/configuration*/], __M([0/*require*/,1/*exports*/,17/*vs/base/common/objects*/,8/*vs/base/common/types*/,13/*vs/base/common/uri*/,22/*vs/platform/registry/common/platform*/,4/*vs/platform/instantiation/common/instantiation*/,29/*vs/platform/configuration/common/configurationRegistry*/]), function (require, exports, objects, types, uri_1, platform_1, instantiation_1, configurationRegistry_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getMigratedSettingValue = exports.keyFromOverrideIdentifier = exports.getDefaultValues = exports.getConfigurationKeys = exports.merge = exports.getConfigurationValue = exports.removeFromValueTree = exports.addToValueTree = exports.toValuesTree = exports.toOverrides = exports.compare = exports.ConfigurationTargetToString = exports.ConfigurationTarget = exports.isConfigurationOverrides = exports.IConfigurationService = void 0;
    exports.IConfigurationService = instantiation_1.createDecorator('configurationService');
    function isConfigurationOverrides(thing) {
        return thing
            && typeof thing === 'object'
            && (!thing.overrideIdentifier || typeof thing.overrideIdentifier === 'string')
            && (!thing.resource || thing.resource instanceof uri_1.URI);
    }
    exports.isConfigurationOverrides = isConfigurationOverrides;
    var ConfigurationTarget;
    (function (ConfigurationTarget) {
        ConfigurationTarget[ConfigurationTarget["USER"] = 1] = "USER";
        ConfigurationTarget[ConfigurationTarget["USER_LOCAL"] = 2] = "USER_LOCAL";
        ConfigurationTarget[ConfigurationTarget["USER_REMOTE"] = 3] = "USER_REMOTE";
        ConfigurationTarget[ConfigurationTarget["WORKSPACE"] = 4] = "WORKSPACE";
        ConfigurationTarget[ConfigurationTarget["WORKSPACE_FOLDER"] = 5] = "WORKSPACE_FOLDER";
        ConfigurationTarget[ConfigurationTarget["DEFAULT"] = 6] = "DEFAULT";
        ConfigurationTarget[ConfigurationTarget["MEMORY"] = 7] = "MEMORY";
    })(ConfigurationTarget = exports.ConfigurationTarget || (exports.ConfigurationTarget = {}));
    function ConfigurationTargetToString(configurationTarget) {
        switch (configurationTarget) {
            case 1 /* USER */: return 'USER';
            case 2 /* USER_LOCAL */: return 'USER_LOCAL';
            case 3 /* USER_REMOTE */: return 'USER_REMOTE';
            case 4 /* WORKSPACE */: return 'WORKSPACE';
            case 5 /* WORKSPACE_FOLDER */: return 'WORKSPACE_FOLDER';
            case 6 /* DEFAULT */: return 'DEFAULT';
            case 7 /* MEMORY */: return 'MEMORY';
        }
    }
    exports.ConfigurationTargetToString = ConfigurationTargetToString;
    function compare(from, to) {
        const added = to
            ? from ? to.keys.filter(key => from.keys.indexOf(key) === -1) : [...to.keys]
            : [];
        const removed = from
            ? to ? from.keys.filter(key => to.keys.indexOf(key) === -1) : [...from.keys]
            : [];
        const updated = [];
        if (to && from) {
            for (const key of from.keys) {
                if (to.keys.indexOf(key) !== -1) {
                    const value1 = getConfigurationValue(from.contents, key);
                    const value2 = getConfigurationValue(to.contents, key);
                    if (!objects.equals(value1, value2)) {
                        updated.push(key);
                    }
                }
            }
        }
        const overrides = [];
        const byOverrideIdentifier = (overrides) => {
            const result = {};
            for (const override of overrides) {
                for (const identifier of override.identifiers) {
                    result[keyFromOverrideIdentifier(identifier)] = override;
                }
            }
            return result;
        };
        const toOverridesByIdentifier = to ? byOverrideIdentifier(to.overrides) : {};
        const fromOverridesByIdentifier = from ? byOverrideIdentifier(from.overrides) : {};
        if (Object.keys(toOverridesByIdentifier).length) {
            for (const key of added) {
                const override = toOverridesByIdentifier[key];
                if (override) {
                    overrides.push([configurationRegistry_1.overrideIdentifierFromKey(key), override.keys]);
                }
            }
        }
        if (Object.keys(fromOverridesByIdentifier).length) {
            for (const key of removed) {
                const override = fromOverridesByIdentifier[key];
                if (override) {
                    overrides.push([configurationRegistry_1.overrideIdentifierFromKey(key), override.keys]);
                }
            }
        }
        if (Object.keys(toOverridesByIdentifier).length && Object.keys(fromOverridesByIdentifier).length) {
            for (const key of updated) {
                const fromOverride = fromOverridesByIdentifier[key];
                const toOverride = toOverridesByIdentifier[key];
                if (fromOverride && toOverride) {
                    const result = compare({ contents: fromOverride.contents, keys: fromOverride.keys, overrides: [] }, { contents: toOverride.contents, keys: toOverride.keys, overrides: [] });
                    overrides.push([configurationRegistry_1.overrideIdentifierFromKey(key), [...result.added, ...result.removed, ...result.updated]]);
                }
            }
        }
        return { added, removed, updated, overrides };
    }
    exports.compare = compare;
    function toOverrides(raw, conflictReporter) {
        const overrides = [];
        for (const key of Object.keys(raw)) {
            if (configurationRegistry_1.OVERRIDE_PROPERTY_PATTERN.test(key)) {
                const overrideRaw = {};
                for (const keyInOverrideRaw in raw[key]) {
                    overrideRaw[keyInOverrideRaw] = raw[key][keyInOverrideRaw];
                }
                overrides.push({
                    identifiers: [configurationRegistry_1.overrideIdentifierFromKey(key).trim()],
                    keys: Object.keys(overrideRaw),
                    contents: toValuesTree(overrideRaw, conflictReporter)
                });
            }
        }
        return overrides;
    }
    exports.toOverrides = toOverrides;
    function toValuesTree(properties, conflictReporter) {
        const root = Object.create(null);
        for (let key in properties) {
            addToValueTree(root, key, properties[key], conflictReporter);
        }
        return root;
    }
    exports.toValuesTree = toValuesTree;
    function addToValueTree(settingsTreeRoot, key, value, conflictReporter) {
        const segments = key.split('.');
        const last = segments.pop();
        let curr = settingsTreeRoot;
        for (let i = 0; i < segments.length; i++) {
            let s = segments[i];
            let obj = curr[s];
            switch (typeof obj) {
                case 'undefined':
                    obj = curr[s] = Object.create(null);
                    break;
                case 'object':
                    break;
                default:
                    conflictReporter(`Ignoring ${key} as ${segments.slice(0, i + 1).join('.')} is ${JSON.stringify(obj)}`);
                    return;
            }
            curr = obj;
        }
        if (typeof curr === 'object' && curr !== null) {
            try {
                curr[last] = value; // workaround https://github.com/microsoft/vscode/issues/13606
            }
            catch (e) {
                conflictReporter(`Ignoring ${key} as ${segments.join('.')} is ${JSON.stringify(curr)}`);
            }
        }
        else {
            conflictReporter(`Ignoring ${key} as ${segments.join('.')} is ${JSON.stringify(curr)}`);
        }
    }
    exports.addToValueTree = addToValueTree;
    function removeFromValueTree(valueTree, key) {
        const segments = key.split('.');
        doRemoveFromValueTree(valueTree, segments);
    }
    exports.removeFromValueTree = removeFromValueTree;
    function doRemoveFromValueTree(valueTree, segments) {
        const first = segments.shift();
        if (segments.length === 0) {
            // Reached last segment
            delete valueTree[first];
            return;
        }
        if (Object.keys(valueTree).indexOf(first) !== -1) {
            const value = valueTree[first];
            if (typeof value === 'object' && !Array.isArray(value)) {
                doRemoveFromValueTree(value, segments);
                if (Object.keys(value).length === 0) {
                    delete valueTree[first];
                }
            }
        }
    }
    /**
     * A helper function to get the configuration value with a specific settings path (e.g. config.some.setting)
     */
    function getConfigurationValue(config, settingPath, defaultValue) {
        function accessSetting(config, path) {
            let current = config;
            for (const component of path) {
                if (typeof current !== 'object' || current === null) {
                    return undefined;
                }
                current = current[component];
            }
            return current;
        }
        const path = settingPath.split('.');
        const result = accessSetting(config, path);
        return typeof result === 'undefined' ? defaultValue : result;
    }
    exports.getConfigurationValue = getConfigurationValue;
    function merge(base, add, overwrite) {
        Object.keys(add).forEach(key => {
            if (key !== '__proto__') {
                if (key in base) {
                    if (types.isObject(base[key]) && types.isObject(add[key])) {
                        merge(base[key], add[key], overwrite);
                    }
                    else if (overwrite) {
                        base[key] = add[key];
                    }
                }
                else {
                    base[key] = add[key];
                }
            }
        });
    }
    exports.merge = merge;
    function getConfigurationKeys() {
        const properties = platform_1.Registry.as(configurationRegistry_1.Extensions.Configuration).getConfigurationProperties();
        return Object.keys(properties);
    }
    exports.getConfigurationKeys = getConfigurationKeys;
    function getDefaultValues() {
        const valueTreeRoot = Object.create(null);
        const properties = platform_1.Registry.as(configurationRegistry_1.Extensions.Configuration).getConfigurationProperties();
        for (let key in properties) {
            let value = properties[key].default;
            addToValueTree(valueTreeRoot, key, value, message => console.error(`Conflict in default settings: ${message}`));
        }
        return valueTreeRoot;
    }
    exports.getDefaultValues = getDefaultValues;
    function keyFromOverrideIdentifier(overrideIdentifier) {
        return `[${overrideIdentifier}]`;
    }
    exports.keyFromOverrideIdentifier = keyFromOverrideIdentifier;
    function getMigratedSettingValue(configurationService, currentSettingName, legacySettingName) {
        const setting = configurationService.inspect(currentSettingName);
        const legacySetting = configurationService.inspect(legacySettingName);
        if (typeof setting.userValue !== 'undefined' || typeof setting.workspaceValue !== 'undefined' || typeof setting.workspaceFolderValue !== 'undefined') {
            return setting.value;
        }
        else if (typeof legacySetting.userValue !== 'undefined' || typeof legacySetting.workspaceValue !== 'undefined' || typeof legacySetting.workspaceFolderValue !== 'undefined') {
            return legacySetting.value;
        }
        else {
            return setting.defaultValue;
        }
    }
    exports.getMigratedSettingValue = getMigratedSettingValue;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[101/*vs/platform/configuration/common/configurationModels*/], __M([0/*require*/,1/*exports*/,55/*vs/base/common/json*/,93/*vs/base/common/map*/,18/*vs/base/common/arrays*/,8/*vs/base/common/types*/,17/*vs/base/common/objects*/,13/*vs/base/common/uri*/,29/*vs/platform/configuration/common/configurationRegistry*/,27/*vs/platform/configuration/common/configuration*/,22/*vs/platform/registry/common/platform*/,2/*vs/base/common/lifecycle*/,11/*vs/base/common/event*/,21/*vs/base/common/resources*/]), function (require, exports, json, map_1, arrays, types, objects, uri_1, configurationRegistry_1, configuration_1, platform_1, lifecycle_1, event_1, resources_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AllKeysConfigurationChangeEvent = exports.ConfigurationChangeEvent = exports.mergeChanges = exports.Configuration = exports.UserSettings = exports.ConfigurationModelParser = exports.DefaultConfigurationModel = exports.ConfigurationModel = void 0;
    class ConfigurationModel {
        constructor(_contents = {}, _keys = [], _overrides = []) {
            this._contents = _contents;
            this._keys = _keys;
            this._overrides = _overrides;
            this.isFrozen = false;
        }
        get contents() {
            return this.checkAndFreeze(this._contents);
        }
        get overrides() {
            return this.checkAndFreeze(this._overrides);
        }
        get keys() {
            return this.checkAndFreeze(this._keys);
        }
        isEmpty() {
            return this._keys.length === 0 && Object.keys(this._contents).length === 0 && this._overrides.length === 0;
        }
        getValue(section) {
            return section ? configuration_1.getConfigurationValue(this.contents, section) : this.contents;
        }
        getOverrideValue(section, overrideIdentifier) {
            const overrideContents = this.getContentsForOverrideIdentifer(overrideIdentifier);
            return overrideContents
                ? section ? configuration_1.getConfigurationValue(overrideContents, section) : overrideContents
                : undefined;
        }
        getKeysForOverrideIdentifier(identifier) {
            for (const override of this.overrides) {
                if (override.identifiers.indexOf(identifier) !== -1) {
                    return override.keys;
                }
            }
            return [];
        }
        override(identifier) {
            const overrideContents = this.getContentsForOverrideIdentifer(identifier);
            if (!overrideContents || typeof overrideContents !== 'object' || !Object.keys(overrideContents).length) {
                // If there are no valid overrides, return self
                return this;
            }
            let contents = {};
            for (const key of arrays.distinct([...Object.keys(this.contents), ...Object.keys(overrideContents)])) {
                let contentsForKey = this.contents[key];
                let overrideContentsForKey = overrideContents[key];
                // If there are override contents for the key, clone and merge otherwise use base contents
                if (overrideContentsForKey) {
                    // Clone and merge only if base contents and override contents are of type object otherwise just override
                    if (typeof contentsForKey === 'object' && typeof overrideContentsForKey === 'object') {
                        contentsForKey = objects.deepClone(contentsForKey);
                        this.mergeContents(contentsForKey, overrideContentsForKey);
                    }
                    else {
                        contentsForKey = overrideContentsForKey;
                    }
                }
                contents[key] = contentsForKey;
            }
            return new ConfigurationModel(contents, this.keys, this.overrides);
        }
        merge(...others) {
            const contents = objects.deepClone(this.contents);
            const overrides = objects.deepClone(this.overrides);
            const keys = [...this.keys];
            for (const other of others) {
                this.mergeContents(contents, other.contents);
                for (const otherOverride of other.overrides) {
                    const [override] = overrides.filter(o => arrays.equals(o.identifiers, otherOverride.identifiers));
                    if (override) {
                        this.mergeContents(override.contents, otherOverride.contents);
                    }
                    else {
                        overrides.push(objects.deepClone(otherOverride));
                    }
                }
                for (const key of other.keys) {
                    if (keys.indexOf(key) === -1) {
                        keys.push(key);
                    }
                }
            }
            return new ConfigurationModel(contents, keys, overrides);
        }
        freeze() {
            this.isFrozen = true;
            return this;
        }
        mergeContents(source, target) {
            for (const key of Object.keys(target)) {
                if (key in source) {
                    if (types.isObject(source[key]) && types.isObject(target[key])) {
                        this.mergeContents(source[key], target[key]);
                        continue;
                    }
                }
                source[key] = objects.deepClone(target[key]);
            }
        }
        checkAndFreeze(data) {
            if (this.isFrozen && !Object.isFrozen(data)) {
                return objects.deepFreeze(data);
            }
            return data;
        }
        getContentsForOverrideIdentifer(identifier) {
            for (const override of this.overrides) {
                if (override.identifiers.indexOf(identifier) !== -1) {
                    return override.contents;
                }
            }
            return null;
        }
        toJSON() {
            return {
                contents: this.contents,
                overrides: this.overrides,
                keys: this.keys
            };
        }
        // Update methods
        setValue(key, value) {
            this.addKey(key);
            configuration_1.addToValueTree(this.contents, key, value, e => { throw new Error(e); });
        }
        removeValue(key) {
            if (this.removeKey(key)) {
                configuration_1.removeFromValueTree(this.contents, key);
            }
        }
        addKey(key) {
            let index = this.keys.length;
            for (let i = 0; i < index; i++) {
                if (key.indexOf(this.keys[i]) === 0) {
                    index = i;
                }
            }
            this.keys.splice(index, 1, key);
        }
        removeKey(key) {
            let index = this.keys.indexOf(key);
            if (index !== -1) {
                this.keys.splice(index, 1);
                return true;
            }
            return false;
        }
    }
    exports.ConfigurationModel = ConfigurationModel;
    class DefaultConfigurationModel extends ConfigurationModel {
        constructor() {
            const contents = configuration_1.getDefaultValues();
            const keys = configuration_1.getConfigurationKeys();
            const overrides = [];
            for (const key of Object.keys(contents)) {
                if (configurationRegistry_1.OVERRIDE_PROPERTY_PATTERN.test(key)) {
                    overrides.push({
                        identifiers: [configurationRegistry_1.overrideIdentifierFromKey(key).trim()],
                        keys: Object.keys(contents[key]),
                        contents: configuration_1.toValuesTree(contents[key], message => console.error(`Conflict in default settings file: ${message}`)),
                    });
                }
            }
            super(contents, keys, overrides);
        }
    }
    exports.DefaultConfigurationModel = DefaultConfigurationModel;
    class ConfigurationModelParser {
        constructor(_name, _scopes) {
            this._name = _name;
            this._scopes = _scopes;
            this._raw = null;
            this._configurationModel = null;
            this._parseErrors = [];
        }
        get configurationModel() {
            return this._configurationModel || new ConfigurationModel();
        }
        get errors() {
            return this._parseErrors;
        }
        parseContent(content) {
            if (!types.isUndefinedOrNull(content)) {
                const raw = this.doParseContent(content);
                this.parseRaw(raw);
            }
        }
        parseRaw(raw) {
            this._raw = raw;
            const configurationModel = this.doParseRaw(raw);
            this._configurationModel = new ConfigurationModel(configurationModel.contents, configurationModel.keys, configurationModel.overrides);
        }
        parse() {
            if (this._raw) {
                this.parseRaw(this._raw);
            }
        }
        doParseContent(content) {
            let raw = {};
            let currentProperty = null;
            let currentParent = [];
            let previousParents = [];
            let parseErrors = [];
            function onValue(value) {
                if (Array.isArray(currentParent)) {
                    currentParent.push(value);
                }
                else if (currentProperty) {
                    currentParent[currentProperty] = value;
                }
            }
            let visitor = {
                onObjectBegin: () => {
                    let object = {};
                    onValue(object);
                    previousParents.push(currentParent);
                    currentParent = object;
                    currentProperty = null;
                },
                onObjectProperty: (name) => {
                    currentProperty = name;
                },
                onObjectEnd: () => {
                    currentParent = previousParents.pop();
                },
                onArrayBegin: () => {
                    let array = [];
                    onValue(array);
                    previousParents.push(currentParent);
                    currentParent = array;
                    currentProperty = null;
                },
                onArrayEnd: () => {
                    currentParent = previousParents.pop();
                },
                onLiteralValue: onValue,
                onError: (error, offset, length) => {
                    parseErrors.push({ error, offset, length });
                }
            };
            if (content) {
                try {
                    json.visit(content, visitor);
                    raw = currentParent[0] || {};
                }
                catch (e) {
                    console.error(`Error while parsing settings file ${this._name}: ${e}`);
                    this._parseErrors = [e];
                }
            }
            return raw;
        }
        doParseRaw(raw) {
            if (this._scopes) {
                const configurationProperties = platform_1.Registry.as(configurationRegistry_1.Extensions.Configuration).getConfigurationProperties();
                raw = this.filterByScope(raw, configurationProperties, true, this._scopes);
            }
            const contents = configuration_1.toValuesTree(raw, message => console.error(`Conflict in settings file ${this._name}: ${message}`));
            const keys = Object.keys(raw);
            const overrides = configuration_1.toOverrides(raw, message => console.error(`Conflict in settings file ${this._name}: ${message}`));
            return { contents, keys, overrides };
        }
        filterByScope(properties, configurationProperties, filterOverriddenProperties, scopes) {
            const result = {};
            for (let key in properties) {
                if (configurationRegistry_1.OVERRIDE_PROPERTY_PATTERN.test(key) && filterOverriddenProperties) {
                    result[key] = this.filterByScope(properties[key], configurationProperties, false, scopes);
                }
                else {
                    const scope = this.getScope(key, configurationProperties);
                    // Load unregistered configurations always.
                    if (scope === undefined || scopes.indexOf(scope) !== -1) {
                        result[key] = properties[key];
                    }
                }
            }
            return result;
        }
        getScope(key, configurationProperties) {
            const propertySchema = configurationProperties[key];
            return propertySchema ? typeof propertySchema.scope !== 'undefined' ? propertySchema.scope : 3 /* WINDOW */ : undefined;
        }
    }
    exports.ConfigurationModelParser = ConfigurationModelParser;
    class UserSettings extends lifecycle_1.Disposable {
        constructor(userSettingsResource, scopes, fileService) {
            super();
            this.userSettingsResource = userSettingsResource;
            this.scopes = scopes;
            this.fileService = fileService;
            this._onDidChange = this._register(new event_1.Emitter());
            this.onDidChange = this._onDidChange.event;
            this.parser = new ConfigurationModelParser(this.userSettingsResource.toString(), this.scopes);
            this._register(this.fileService.watch(resources_1.dirname(this.userSettingsResource)));
            this._register(event_1.Event.filter(this.fileService.onDidFilesChange, e => e.contains(this.userSettingsResource))(() => this._onDidChange.fire()));
        }
        async loadConfiguration() {
            try {
                const content = await this.fileService.readFile(this.userSettingsResource);
                this.parser.parseContent(content.value.toString() || '{}');
                return this.parser.configurationModel;
            }
            catch (e) {
                return new ConfigurationModel();
            }
        }
        reprocess() {
            this.parser.parse();
            return this.parser.configurationModel;
        }
    }
    exports.UserSettings = UserSettings;
    class Configuration {
        constructor(_defaultConfiguration, _localUserConfiguration, _remoteUserConfiguration = new ConfigurationModel(), _workspaceConfiguration = new ConfigurationModel(), _folderConfigurations = new map_1.ResourceMap(), _memoryConfiguration = new ConfigurationModel(), _memoryConfigurationByResource = new map_1.ResourceMap(), _freeze = true) {
            this._defaultConfiguration = _defaultConfiguration;
            this._localUserConfiguration = _localUserConfiguration;
            this._remoteUserConfiguration = _remoteUserConfiguration;
            this._workspaceConfiguration = _workspaceConfiguration;
            this._folderConfigurations = _folderConfigurations;
            this._memoryConfiguration = _memoryConfiguration;
            this._memoryConfigurationByResource = _memoryConfigurationByResource;
            this._freeze = _freeze;
            this._workspaceConsolidatedConfiguration = null;
            this._foldersConsolidatedConfigurations = new map_1.ResourceMap();
            this._userConfiguration = null;
        }
        getValue(section, overrides, workspace) {
            const consolidateConfigurationModel = this.getConsolidateConfigurationModel(overrides, workspace);
            return consolidateConfigurationModel.getValue(section);
        }
        updateValue(key, value, overrides = {}) {
            let memoryConfiguration;
            if (overrides.resource) {
                memoryConfiguration = this._memoryConfigurationByResource.get(overrides.resource);
                if (!memoryConfiguration) {
                    memoryConfiguration = new ConfigurationModel();
                    this._memoryConfigurationByResource.set(overrides.resource, memoryConfiguration);
                }
            }
            else {
                memoryConfiguration = this._memoryConfiguration;
            }
            if (value === undefined) {
                memoryConfiguration.removeValue(key);
            }
            else {
                memoryConfiguration.setValue(key, value);
            }
            if (!overrides.resource) {
                this._workspaceConsolidatedConfiguration = null;
            }
        }
        inspect(key, overrides, workspace) {
            const consolidateConfigurationModel = this.getConsolidateConfigurationModel(overrides, workspace);
            const folderConfigurationModel = this.getFolderConfigurationModelForResource(overrides.resource, workspace);
            const memoryConfigurationModel = overrides.resource ? this._memoryConfigurationByResource.get(overrides.resource) || this._memoryConfiguration : this._memoryConfiguration;
            const defaultValue = overrides.overrideIdentifier ? this._defaultConfiguration.freeze().override(overrides.overrideIdentifier).getValue(key) : this._defaultConfiguration.freeze().getValue(key);
            const userValue = overrides.overrideIdentifier ? this.userConfiguration.freeze().override(overrides.overrideIdentifier).getValue(key) : this.userConfiguration.freeze().getValue(key);
            const userLocalValue = overrides.overrideIdentifier ? this.localUserConfiguration.freeze().override(overrides.overrideIdentifier).getValue(key) : this.localUserConfiguration.freeze().getValue(key);
            const userRemoteValue = overrides.overrideIdentifier ? this.remoteUserConfiguration.freeze().override(overrides.overrideIdentifier).getValue(key) : this.remoteUserConfiguration.freeze().getValue(key);
            const workspaceValue = workspace ? overrides.overrideIdentifier ? this._workspaceConfiguration.freeze().override(overrides.overrideIdentifier).getValue(key) : this._workspaceConfiguration.freeze().getValue(key) : undefined; //Check on workspace exists or not because _workspaceConfiguration is never null
            const workspaceFolderValue = folderConfigurationModel ? overrides.overrideIdentifier ? folderConfigurationModel.freeze().override(overrides.overrideIdentifier).getValue(key) : folderConfigurationModel.freeze().getValue(key) : undefined;
            const memoryValue = overrides.overrideIdentifier ? memoryConfigurationModel.override(overrides.overrideIdentifier).getValue(key) : memoryConfigurationModel.getValue(key);
            const value = consolidateConfigurationModel.getValue(key);
            const overrideIdentifiers = arrays.distinct(arrays.flatten(consolidateConfigurationModel.overrides.map(override => override.identifiers))).filter(overrideIdentifier => consolidateConfigurationModel.getOverrideValue(key, overrideIdentifier) !== undefined);
            return {
                defaultValue: defaultValue,
                userValue: userValue,
                userLocalValue: userLocalValue,
                userRemoteValue: userRemoteValue,
                workspaceValue: workspaceValue,
                workspaceFolderValue: workspaceFolderValue,
                memoryValue: memoryValue,
                value,
                default: defaultValue !== undefined ? { value: this._defaultConfiguration.freeze().getValue(key), override: overrides.overrideIdentifier ? this._defaultConfiguration.freeze().getOverrideValue(key, overrides.overrideIdentifier) : undefined } : undefined,
                user: userValue !== undefined ? { value: this.userConfiguration.freeze().getValue(key), override: overrides.overrideIdentifier ? this.userConfiguration.freeze().getOverrideValue(key, overrides.overrideIdentifier) : undefined } : undefined,
                userLocal: userLocalValue !== undefined ? { value: this.localUserConfiguration.freeze().getValue(key), override: overrides.overrideIdentifier ? this.localUserConfiguration.freeze().getOverrideValue(key, overrides.overrideIdentifier) : undefined } : undefined,
                userRemote: userRemoteValue !== undefined ? { value: this.remoteUserConfiguration.freeze().getValue(key), override: overrides.overrideIdentifier ? this.remoteUserConfiguration.freeze().getOverrideValue(key, overrides.overrideIdentifier) : undefined } : undefined,
                workspace: workspaceValue !== undefined ? { value: this._workspaceConfiguration.freeze().getValue(key), override: overrides.overrideIdentifier ? this._workspaceConfiguration.freeze().getOverrideValue(key, overrides.overrideIdentifier) : undefined } : undefined,
                workspaceFolder: workspaceFolderValue !== undefined ? { value: folderConfigurationModel === null || folderConfigurationModel === void 0 ? void 0 : folderConfigurationModel.freeze().getValue(key), override: overrides.overrideIdentifier ? folderConfigurationModel === null || folderConfigurationModel === void 0 ? void 0 : folderConfigurationModel.freeze().getOverrideValue(key, overrides.overrideIdentifier) : undefined } : undefined,
                memory: memoryValue !== undefined ? { value: memoryConfigurationModel.getValue(key), override: overrides.overrideIdentifier ? memoryConfigurationModel.getOverrideValue(key, overrides.overrideIdentifier) : undefined } : undefined,
                overrideIdentifiers: overrideIdentifiers.length ? overrideIdentifiers : undefined
            };
        }
        keys(workspace) {
            const folderConfigurationModel = this.getFolderConfigurationModelForResource(undefined, workspace);
            return {
                default: this._defaultConfiguration.freeze().keys,
                user: this.userConfiguration.freeze().keys,
                workspace: this._workspaceConfiguration.freeze().keys,
                workspaceFolder: folderConfigurationModel ? folderConfigurationModel.freeze().keys : []
            };
        }
        updateDefaultConfiguration(defaultConfiguration) {
            this._defaultConfiguration = defaultConfiguration;
            this._workspaceConsolidatedConfiguration = null;
            this._foldersConsolidatedConfigurations.clear();
        }
        updateLocalUserConfiguration(localUserConfiguration) {
            this._localUserConfiguration = localUserConfiguration;
            this._userConfiguration = null;
            this._workspaceConsolidatedConfiguration = null;
            this._foldersConsolidatedConfigurations.clear();
        }
        updateRemoteUserConfiguration(remoteUserConfiguration) {
            this._remoteUserConfiguration = remoteUserConfiguration;
            this._userConfiguration = null;
            this._workspaceConsolidatedConfiguration = null;
            this._foldersConsolidatedConfigurations.clear();
        }
        updateWorkspaceConfiguration(workspaceConfiguration) {
            this._workspaceConfiguration = workspaceConfiguration;
            this._workspaceConsolidatedConfiguration = null;
            this._foldersConsolidatedConfigurations.clear();
        }
        updateFolderConfiguration(resource, configuration) {
            this._folderConfigurations.set(resource, configuration);
            this._foldersConsolidatedConfigurations.delete(resource);
        }
        deleteFolderConfiguration(resource) {
            this.folderConfigurations.delete(resource);
            this._foldersConsolidatedConfigurations.delete(resource);
        }
        compareAndUpdateDefaultConfiguration(defaults, keys) {
            const overrides = keys
                .filter(key => configurationRegistry_1.OVERRIDE_PROPERTY_PATTERN.test(key))
                .map(key => {
                const overrideIdentifier = configurationRegistry_1.overrideIdentifierFromKey(key);
                const fromKeys = this._defaultConfiguration.getKeysForOverrideIdentifier(overrideIdentifier);
                const toKeys = defaults.getKeysForOverrideIdentifier(overrideIdentifier);
                const keys = [
                    ...toKeys.filter(key => fromKeys.indexOf(key) === -1),
                    ...fromKeys.filter(key => toKeys.indexOf(key) === -1),
                    ...fromKeys.filter(key => !objects.equals(this._defaultConfiguration.override(overrideIdentifier).getValue(key), defaults.override(overrideIdentifier).getValue(key)))
                ];
                return [overrideIdentifier, keys];
            });
            this.updateDefaultConfiguration(defaults);
            return { keys, overrides };
        }
        compareAndUpdateLocalUserConfiguration(user) {
            const { added, updated, removed, overrides } = configuration_1.compare(this.localUserConfiguration, user);
            const keys = [...added, ...updated, ...removed];
            if (keys.length) {
                this.updateLocalUserConfiguration(user);
            }
            return { keys, overrides };
        }
        compareAndUpdateRemoteUserConfiguration(user) {
            const { added, updated, removed, overrides } = configuration_1.compare(this.remoteUserConfiguration, user);
            let keys = [...added, ...updated, ...removed];
            if (keys.length) {
                this.updateRemoteUserConfiguration(user);
            }
            return { keys, overrides };
        }
        compareAndUpdateWorkspaceConfiguration(workspaceConfiguration) {
            const { added, updated, removed, overrides } = configuration_1.compare(this.workspaceConfiguration, workspaceConfiguration);
            let keys = [...added, ...updated, ...removed];
            if (keys.length) {
                this.updateWorkspaceConfiguration(workspaceConfiguration);
            }
            return { keys, overrides };
        }
        compareAndUpdateFolderConfiguration(resource, folderConfiguration) {
            const currentFolderConfiguration = this.folderConfigurations.get(resource);
            const { added, updated, removed, overrides } = configuration_1.compare(currentFolderConfiguration, folderConfiguration);
            let keys = [...added, ...updated, ...removed];
            if (keys.length || !currentFolderConfiguration) {
                this.updateFolderConfiguration(resource, folderConfiguration);
            }
            return { keys, overrides };
        }
        compareAndDeleteFolderConfiguration(folder) {
            const folderConfig = this.folderConfigurations.get(folder);
            if (!folderConfig) {
                throw new Error('Unknown folder');
            }
            this.deleteFolderConfiguration(folder);
            const { added, updated, removed, overrides } = configuration_1.compare(folderConfig, undefined);
            return { keys: [...added, ...updated, ...removed], overrides };
        }
        get defaults() {
            return this._defaultConfiguration;
        }
        get userConfiguration() {
            if (!this._userConfiguration) {
                this._userConfiguration = this._remoteUserConfiguration.isEmpty() ? this._localUserConfiguration : this._localUserConfiguration.merge(this._remoteUserConfiguration);
                if (this._freeze) {
                    this._userConfiguration.freeze();
                }
            }
            return this._userConfiguration;
        }
        get localUserConfiguration() {
            return this._localUserConfiguration;
        }
        get remoteUserConfiguration() {
            return this._remoteUserConfiguration;
        }
        get workspaceConfiguration() {
            return this._workspaceConfiguration;
        }
        get folderConfigurations() {
            return this._folderConfigurations;
        }
        getConsolidateConfigurationModel(overrides, workspace) {
            let configurationModel = this.getConsolidatedConfigurationModelForResource(overrides, workspace);
            return overrides.overrideIdentifier ? configurationModel.override(overrides.overrideIdentifier) : configurationModel;
        }
        getConsolidatedConfigurationModelForResource({ resource }, workspace) {
            let consolidateConfiguration = this.getWorkspaceConsolidatedConfiguration();
            if (workspace && resource) {
                const root = workspace.getFolder(resource);
                if (root) {
                    consolidateConfiguration = this.getFolderConsolidatedConfiguration(root.uri) || consolidateConfiguration;
                }
                const memoryConfigurationForResource = this._memoryConfigurationByResource.get(resource);
                if (memoryConfigurationForResource) {
                    consolidateConfiguration = consolidateConfiguration.merge(memoryConfigurationForResource);
                }
            }
            return consolidateConfiguration;
        }
        getWorkspaceConsolidatedConfiguration() {
            if (!this._workspaceConsolidatedConfiguration) {
                this._workspaceConsolidatedConfiguration = this._defaultConfiguration.merge(this.userConfiguration, this._workspaceConfiguration, this._memoryConfiguration);
                if (this._freeze) {
                    this._workspaceConfiguration = this._workspaceConfiguration.freeze();
                }
            }
            return this._workspaceConsolidatedConfiguration;
        }
        getFolderConsolidatedConfiguration(folder) {
            let folderConsolidatedConfiguration = this._foldersConsolidatedConfigurations.get(folder);
            if (!folderConsolidatedConfiguration) {
                const workspaceConsolidateConfiguration = this.getWorkspaceConsolidatedConfiguration();
                const folderConfiguration = this._folderConfigurations.get(folder);
                if (folderConfiguration) {
                    folderConsolidatedConfiguration = workspaceConsolidateConfiguration.merge(folderConfiguration);
                    if (this._freeze) {
                        folderConsolidatedConfiguration = folderConsolidatedConfiguration.freeze();
                    }
                    this._foldersConsolidatedConfigurations.set(folder, folderConsolidatedConfiguration);
                }
                else {
                    folderConsolidatedConfiguration = workspaceConsolidateConfiguration;
                }
            }
            return folderConsolidatedConfiguration;
        }
        getFolderConfigurationModelForResource(resource, workspace) {
            if (workspace && resource) {
                const root = workspace.getFolder(resource);
                if (root) {
                    return this._folderConfigurations.get(root.uri);
                }
            }
            return undefined;
        }
        toData() {
            return {
                defaults: {
                    contents: this._defaultConfiguration.contents,
                    overrides: this._defaultConfiguration.overrides,
                    keys: this._defaultConfiguration.keys
                },
                user: {
                    contents: this.userConfiguration.contents,
                    overrides: this.userConfiguration.overrides,
                    keys: this.userConfiguration.keys
                },
                workspace: {
                    contents: this._workspaceConfiguration.contents,
                    overrides: this._workspaceConfiguration.overrides,
                    keys: this._workspaceConfiguration.keys
                },
                folders: [...this._folderConfigurations.keys()].reduce((result, folder) => {
                    const { contents, overrides, keys } = this._folderConfigurations.get(folder);
                    result.push([folder, { contents, overrides, keys }]);
                    return result;
                }, [])
            };
        }
        allKeys() {
            const keys = new Set();
            this._defaultConfiguration.freeze().keys.forEach(key => keys.add(key));
            this.userConfiguration.freeze().keys.forEach(key => keys.add(key));
            this._workspaceConfiguration.freeze().keys.forEach(key => keys.add(key));
            this._folderConfigurations.forEach(folderConfiguraiton => folderConfiguraiton.freeze().keys.forEach(key => keys.add(key)));
            return [...keys.values()];
        }
        getAllKeysForOverrideIdentifier(overrideIdentifier) {
            const keys = new Set();
            this._defaultConfiguration.getKeysForOverrideIdentifier(overrideIdentifier).forEach(key => keys.add(key));
            this.userConfiguration.getKeysForOverrideIdentifier(overrideIdentifier).forEach(key => keys.add(key));
            this._workspaceConfiguration.getKeysForOverrideIdentifier(overrideIdentifier).forEach(key => keys.add(key));
            this._folderConfigurations.forEach(folderConfiguraiton => folderConfiguraiton.getKeysForOverrideIdentifier(overrideIdentifier).forEach(key => keys.add(key)));
            return [...keys.values()];
        }
        static parse(data) {
            const defaultConfiguration = this.parseConfigurationModel(data.defaults);
            const userConfiguration = this.parseConfigurationModel(data.user);
            const workspaceConfiguration = this.parseConfigurationModel(data.workspace);
            const folders = data.folders.reduce((result, value) => {
                result.set(uri_1.URI.revive(value[0]), this.parseConfigurationModel(value[1]));
                return result;
            }, new map_1.ResourceMap());
            return new Configuration(defaultConfiguration, userConfiguration, new ConfigurationModel(), workspaceConfiguration, folders, new ConfigurationModel(), new map_1.ResourceMap(), false);
        }
        static parseConfigurationModel(model) {
            return new ConfigurationModel(model.contents, model.keys, model.overrides).freeze();
        }
    }
    exports.Configuration = Configuration;
    function mergeChanges(...changes) {
        if (changes.length === 0) {
            return { keys: [], overrides: [] };
        }
        if (changes.length === 1) {
            return changes[0];
        }
        const keysSet = new Set();
        const overridesMap = new Map();
        for (const change of changes) {
            change.keys.forEach(key => keysSet.add(key));
            change.overrides.forEach(([identifier, keys]) => {
                const result = map_1.getOrSet(overridesMap, identifier, new Set());
                keys.forEach(key => result.add(key));
            });
        }
        const overrides = [];
        overridesMap.forEach((keys, identifier) => overrides.push([identifier, [...keys.values()]]));
        return { keys: [...keysSet.values()], overrides };
    }
    exports.mergeChanges = mergeChanges;
    class ConfigurationChangeEvent {
        constructor(change, previous, currentConfiguraiton, currentWorkspace) {
            this.change = change;
            this.previous = previous;
            this.currentConfiguraiton = currentConfiguraiton;
            this.currentWorkspace = currentWorkspace;
            this._previousConfiguration = undefined;
            const keysSet = new Set();
            change.keys.forEach(key => keysSet.add(key));
            change.overrides.forEach(([, keys]) => keys.forEach(key => keysSet.add(key)));
            this.affectedKeys = [...keysSet.values()];
            const configurationModel = new ConfigurationModel();
            this.affectedKeys.forEach(key => configurationModel.setValue(key, {}));
            this.affectedKeysTree = configurationModel.contents;
        }
        get previousConfiguration() {
            if (!this._previousConfiguration && this.previous) {
                this._previousConfiguration = Configuration.parse(this.previous.data);
            }
            return this._previousConfiguration;
        }
        affectsConfiguration(section, overrides) {
            var _a;
            if (this.doesAffectedKeysTreeContains(this.affectedKeysTree, section)) {
                if (overrides) {
                    const value1 = this.previousConfiguration ? this.previousConfiguration.getValue(section, overrides, (_a = this.previous) === null || _a === void 0 ? void 0 : _a.workspace) : undefined;
                    const value2 = this.currentConfiguraiton.getValue(section, overrides, this.currentWorkspace);
                    return !objects.equals(value1, value2);
                }
                return true;
            }
            return false;
        }
        doesAffectedKeysTreeContains(affectedKeysTree, section) {
            let requestedTree = configuration_1.toValuesTree({ [section]: true }, () => { });
            let key;
            while (typeof requestedTree === 'object' && (key = Object.keys(requestedTree)[0])) { // Only one key should present, since we added only one property
                affectedKeysTree = affectedKeysTree[key];
                if (!affectedKeysTree) {
                    return false; // Requested tree is not found
                }
                requestedTree = requestedTree[key];
            }
            return true;
        }
    }
    exports.ConfigurationChangeEvent = ConfigurationChangeEvent;
    class AllKeysConfigurationChangeEvent extends ConfigurationChangeEvent {
        constructor(configuration, workspace, source, sourceConfig) {
            super({ keys: configuration.allKeys(), overrides: [] }, undefined, configuration, workspace);
            this.source = source;
            this.sourceConfig = sourceConfig;
        }
    }
    exports.AllKeysConfigurationChangeEvent = AllKeysConfigurationChangeEvent;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[102/*vs/platform/configuration/common/configurationService*/], __M([0/*require*/,1/*exports*/,22/*vs/platform/registry/common/platform*/,29/*vs/platform/configuration/common/configurationRegistry*/,2/*vs/base/common/lifecycle*/,27/*vs/platform/configuration/common/configuration*/,101/*vs/platform/configuration/common/configurationModels*/,11/*vs/base/common/event*/,12/*vs/base/common/async*/]), function (require, exports, platform_1, configurationRegistry_1, lifecycle_1, configuration_1, configurationModels_1, event_1, async_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConfigurationService = void 0;
    class ConfigurationService extends lifecycle_1.Disposable {
        constructor(settingsResource, fileService) {
            super();
            this.settingsResource = settingsResource;
            this._onDidChangeConfiguration = this._register(new event_1.Emitter());
            this.onDidChangeConfiguration = this._onDidChangeConfiguration.event;
            this.userConfiguration = this._register(new configurationModels_1.UserSettings(this.settingsResource, undefined, fileService));
            this.configuration = new configurationModels_1.Configuration(new configurationModels_1.DefaultConfigurationModel(), new configurationModels_1.ConfigurationModel());
            this.reloadConfigurationScheduler = this._register(new async_1.RunOnceScheduler(() => this.reloadConfiguration(), 50));
            this._register(platform_1.Registry.as(configurationRegistry_1.Extensions.Configuration).onDidUpdateConfiguration(configurationProperties => this.onDidDefaultConfigurationChange(configurationProperties)));
            this._register(this.userConfiguration.onDidChange(() => this.reloadConfigurationScheduler.schedule()));
        }
        async initialize() {
            const userConfiguration = await this.userConfiguration.loadConfiguration();
            this.configuration = new configurationModels_1.Configuration(new configurationModels_1.DefaultConfigurationModel(), userConfiguration);
        }
        getConfigurationData() {
            return this.configuration.toData();
        }
        getValue(arg1, arg2) {
            const section = typeof arg1 === 'string' ? arg1 : undefined;
            const overrides = configuration_1.isConfigurationOverrides(arg1) ? arg1 : configuration_1.isConfigurationOverrides(arg2) ? arg2 : {};
            return this.configuration.getValue(section, overrides, undefined);
        }
        updateValue(key, value, arg3, arg4) {
            return Promise.reject(new Error('not supported'));
        }
        inspect(key) {
            return this.configuration.inspect(key, {}, undefined);
        }
        keys() {
            return this.configuration.keys(undefined);
        }
        async reloadConfiguration() {
            const configurationModel = await this.userConfiguration.loadConfiguration();
            this.onDidChangeUserConfiguration(configurationModel);
        }
        onDidChangeUserConfiguration(userConfigurationModel) {
            const previous = this.configuration.toData();
            const change = this.configuration.compareAndUpdateLocalUserConfiguration(userConfigurationModel);
            this.trigger(change, previous, 1 /* USER */);
        }
        onDidDefaultConfigurationChange(keys) {
            const previous = this.configuration.toData();
            const change = this.configuration.compareAndUpdateDefaultConfiguration(new configurationModels_1.DefaultConfigurationModel(), keys);
            this.trigger(change, previous, 6 /* DEFAULT */);
        }
        trigger(configurationChange, previous, source) {
            const event = new configurationModels_1.ConfigurationChangeEvent(configurationChange, { data: previous }, this.configuration);
            event.source = source;
            event.sourceConfig = this.getTargetConfiguration(source);
            this._onDidChangeConfiguration.fire(event);
        }
        getTargetConfiguration(target) {
            switch (target) {
                case 6 /* DEFAULT */:
                    return this.configuration.defaults.contents;
                case 1 /* USER */:
                    return this.configuration.localUserConfiguration.contents;
            }
            return {};
        }
    }
    exports.ConfigurationService = ConfigurationService;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[50/*vs/platform/request/common/request*/], __M([0/*require*/,1/*exports*/,77/*vs/nls!vs/platform/request/common/request*/,4/*vs/platform/instantiation/common/instantiation*/,29/*vs/platform/configuration/common/configurationRegistry*/,22/*vs/platform/registry/common/platform*/,15/*vs/base/common/buffer*/]), function (require, exports, nls_1, instantiation_1, configurationRegistry_1, platform_1, buffer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.asJson = exports.asText = exports.isSuccess = exports.IRequestService = void 0;
    exports.IRequestService = instantiation_1.createDecorator('requestService');
    function isSuccess(context) {
        return (context.res.statusCode && context.res.statusCode >= 200 && context.res.statusCode < 300) || context.res.statusCode === 1223;
    }
    exports.isSuccess = isSuccess;
    function hasNoContent(context) {
        return context.res.statusCode === 204;
    }
    async function asText(context) {
        if (!isSuccess(context)) {
            throw new Error('Server returned ' + context.res.statusCode);
        }
        if (hasNoContent(context)) {
            return null;
        }
        const buffer = await buffer_1.streamToBuffer(context.stream);
        return buffer.toString();
    }
    exports.asText = asText;
    async function asJson(context) {
        if (!isSuccess(context)) {
            throw new Error('Server returned ' + context.res.statusCode);
        }
        if (hasNoContent(context)) {
            return null;
        }
        const buffer = await buffer_1.streamToBuffer(context.stream);
        const str = buffer.toString();
        try {
            return JSON.parse(str);
        }
        catch (err) {
            err.message += ':\n' + str;
            throw err;
        }
    }
    exports.asJson = asJson;
    platform_1.Registry.as(configurationRegistry_1.Extensions.Configuration)
        .registerConfiguration({
        id: 'http',
        order: 15,
        title: nls_1.localize(0, null),
        type: 'object',
        properties: {
            'http.proxy': {
                type: 'string',
                pattern: '^https?://([^:]*(:[^@]*)?@)?([^:]+|\\[[:0-9a-fA-F]+\\])(:\\d+)?/?$|^$',
                markdownDescription: nls_1.localize(1, null)
            },
            'http.proxyStrictSSL': {
                type: 'boolean',
                default: true,
                description: nls_1.localize(2, null)
            },
            'http.proxyAuthorization': {
                type: ['null', 'string'],
                default: null,
                markdownDescription: nls_1.localize(3, null)
            },
            'http.proxySupport': {
                type: 'string',
                enum: ['off', 'on', 'override'],
                enumDescriptions: [
                    nls_1.localize(4, null),
                    nls_1.localize(5, null),
                    nls_1.localize(6, null),
                ],
                default: 'override',
                description: nls_1.localize(7, null)
            },
            'http.systemCertificates': {
                type: 'boolean',
                default: true,
                description: nls_1.localize(8, null)
            }
        }
    });
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[103/*vs/platform/request/node/proxy*/], __M([0/*require*/,1/*exports*/,104/*url*/,8/*vs/base/common/types*/]), function (require, exports, url_1, types_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getProxyAgent = void 0;
    function getSystemProxyURI(requestURL) {
        if (requestURL.protocol === 'http:') {
            return process.env.HTTP_PROXY || process.env.http_proxy || null;
        }
        else if (requestURL.protocol === 'https:') {
            return process.env.HTTPS_PROXY || process.env.https_proxy || process.env.HTTP_PROXY || process.env.http_proxy || null;
        }
        return null;
    }
    async function getProxyAgent(rawRequestURL, options = {}) {
        const requestURL = url_1.parse(rawRequestURL);
        const proxyURL = options.proxyUrl || getSystemProxyURI(requestURL);
        if (!proxyURL) {
            return null;
        }
        const proxyEndpoint = url_1.parse(proxyURL);
        if (!/^https?:$/.test(proxyEndpoint.protocol || '')) {
            return null;
        }
        const opts = {
            host: proxyEndpoint.hostname || '',
            port: proxyEndpoint.port || (proxyEndpoint.protocol === 'https' ? '443' : '80'),
            auth: proxyEndpoint.auth,
            rejectUnauthorized: types_1.isBoolean(options.strictSSL) ? options.strictSSL : true,
        };
        return requestURL.protocol === 'http:'
            ? new (await new Promise((resolve_1, reject_1) => { require(['http-proxy-agent'], resolve_1, reject_1); }))(opts)
            : new (await new Promise((resolve_2, reject_2) => { require(['https-proxy-agent'], resolve_2, reject_2); }))(opts);
    }
    exports.getProxyAgent = getProxyAgent;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[105/*vs/platform/serviceMachineId/common/serviceMachineId*/], __M([0/*require*/,1/*exports*/,35/*vs/base/common/uuid*/,15/*vs/base/common/buffer*/]), function (require, exports, uuid_1, buffer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getServiceMachineId = void 0;
    async function getServiceMachineId(environmentService, fileService, storageService) {
        let uuid = storageService ? storageService.get('storage.serviceMachineId', 0 /* GLOBAL */) || null : null;
        if (uuid) {
            return uuid;
        }
        try {
            const contents = await fileService.readFile(environmentService.serviceMachineIdResource);
            const value = contents.value.toString();
            uuid = uuid_1.isUUID(value) ? value : null;
        }
        catch (e) {
            uuid = null;
        }
        if (!uuid) {
            uuid = uuid_1.generateUuid();
            try {
                await fileService.writeFile(environmentService.serviceMachineIdResource, buffer_1.VSBuffer.fromString(uuid));
            }
            catch (error) {
                //noop
            }
        }
        if (storageService) {
            storageService.store('storage.serviceMachineId', uuid, 0 /* GLOBAL */);
        }
        return uuid;
    }
    exports.getServiceMachineId = getServiceMachineId;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[106/*vs/platform/state/node/state*/], __M([0/*require*/,1/*exports*/,4/*vs/platform/instantiation/common/instantiation*/]), function (require, exports, instantiation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IStateService = void 0;
    exports.IStateService = instantiation_1.createDecorator('stateService');
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/









define(__m[107/*vs/platform/state/node/stateService*/], __M([0/*require*/,1/*exports*/,3/*vs/base/common/path*/,23/*fs*/,19/*vs/platform/environment/common/environment*/,10/*vs/base/node/pfs*/,8/*vs/base/common/types*/,7/*vs/platform/log/common/log*/]), function (require, exports, path, fs, environment_1, pfs_1, types_1, log_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StateService = exports.FileStorage = void 0;
    class FileStorage {
        constructor(dbPath, onError) {
            this.dbPath = dbPath;
            this.onError = onError;
            this._database = null;
            this.lastFlushedSerializedDatabase = null;
        }
        get database() {
            if (!this._database) {
                this._database = this.loadSync();
            }
            return this._database;
        }
        async init() {
            if (this._database) {
                return; // return if database was already loaded
            }
            const database = await this.loadAsync();
            if (this._database) {
                return; // return if database was already loaded
            }
            this._database = database;
        }
        loadSync() {
            try {
                this.lastFlushedSerializedDatabase = fs.readFileSync(this.dbPath).toString();
                return JSON.parse(this.lastFlushedSerializedDatabase);
            }
            catch (error) {
                if (error.code !== 'ENOENT') {
                    this.onError(error);
                }
                return {};
            }
        }
        async loadAsync() {
            try {
                this.lastFlushedSerializedDatabase = (await pfs_1.readFile(this.dbPath)).toString();
                return JSON.parse(this.lastFlushedSerializedDatabase);
            }
            catch (error) {
                if (error.code !== 'ENOENT') {
                    this.onError(error);
                }
                return {};
            }
        }
        getItem(key, defaultValue) {
            const res = this.database[key];
            if (types_1.isUndefinedOrNull(res)) {
                return defaultValue;
            }
            return res;
        }
        setItem(key, data) {
            // Remove an item when it is undefined or null
            if (types_1.isUndefinedOrNull(data)) {
                return this.removeItem(key);
            }
            // Shortcut for primitives that did not change
            if (typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean') {
                if (this.database[key] === data) {
                    return;
                }
            }
            this.database[key] = data;
            this.saveSync();
        }
        removeItem(key) {
            // Only update if the key is actually present (not undefined)
            if (!types_1.isUndefined(this.database[key])) {
                this.database[key] = undefined;
                this.saveSync();
            }
        }
        saveSync() {
            const serializedDatabase = JSON.stringify(this.database, null, 4);
            if (serializedDatabase === this.lastFlushedSerializedDatabase) {
                return; // return early if the database has not changed
            }
            try {
                pfs_1.writeFileSync(this.dbPath, serializedDatabase); // permission issue can happen here
                this.lastFlushedSerializedDatabase = serializedDatabase;
            }
            catch (error) {
                this.onError(error);
            }
        }
    }
    exports.FileStorage = FileStorage;
    let StateService = class StateService {
        constructor(environmentService, logService) {
            this.fileStorage = new FileStorage(path.join(environmentService.userDataPath, StateService.STATE_FILE), error => logService.error(error));
        }
        init() {
            return this.fileStorage.init();
        }
        getItem(key, defaultValue) {
            return this.fileStorage.getItem(key, defaultValue);
        }
        setItem(key, data) {
            this.fileStorage.setItem(key, data);
        }
        removeItem(key) {
            this.fileStorage.removeItem(key);
        }
    };
    StateService.STATE_FILE = 'storage.json';
    StateService = __decorate([
        __param(0, environment_1.INativeEnvironmentService),
        __param(1, log_1.ILogService)
    ], StateService);
    exports.StateService = StateService;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[108/*vs/platform/storage/common/storage*/], __M([0/*require*/,1/*exports*/,4/*vs/platform/instantiation/common/instantiation*/,11/*vs/base/common/event*/,2/*vs/base/common/lifecycle*/,8/*vs/base/common/types*/]), function (require, exports, instantiation_1, event_1, lifecycle_1, types_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.logStorage = exports.InMemoryStorageService = exports.StorageScope = exports.WillSaveStateReason = exports.IStorageService = exports.IS_NEW_KEY = void 0;
    exports.IS_NEW_KEY = '__$__isNewStorageMarker';
    exports.IStorageService = instantiation_1.createDecorator('storageService');
    var WillSaveStateReason;
    (function (WillSaveStateReason) {
        WillSaveStateReason[WillSaveStateReason["NONE"] = 0] = "NONE";
        WillSaveStateReason[WillSaveStateReason["SHUTDOWN"] = 1] = "SHUTDOWN";
    })(WillSaveStateReason = exports.WillSaveStateReason || (exports.WillSaveStateReason = {}));
    var StorageScope;
    (function (StorageScope) {
        /**
         * The stored data will be scoped to all workspaces.
         */
        StorageScope[StorageScope["GLOBAL"] = 0] = "GLOBAL";
        /**
         * The stored data will be scoped to the current workspace.
         */
        StorageScope[StorageScope["WORKSPACE"] = 1] = "WORKSPACE";
    })(StorageScope = exports.StorageScope || (exports.StorageScope = {}));
    class InMemoryStorageService extends lifecycle_1.Disposable {
        constructor() {
            super(...arguments);
            this._onDidChangeStorage = this._register(new event_1.Emitter());
            this.onDidChangeStorage = this._onDidChangeStorage.event;
            this._onWillSaveState = this._register(new event_1.Emitter());
            this.onWillSaveState = this._onWillSaveState.event;
            this.globalCache = new Map();
            this.workspaceCache = new Map();
        }
        getCache(scope) {
            return scope === 0 /* GLOBAL */ ? this.globalCache : this.workspaceCache;
        }
        get(key, scope, fallbackValue) {
            const value = this.getCache(scope).get(key);
            if (types_1.isUndefinedOrNull(value)) {
                return fallbackValue;
            }
            return value;
        }
        getBoolean(key, scope, fallbackValue) {
            const value = this.getCache(scope).get(key);
            if (types_1.isUndefinedOrNull(value)) {
                return fallbackValue;
            }
            return value === 'true';
        }
        getNumber(key, scope, fallbackValue) {
            const value = this.getCache(scope).get(key);
            if (types_1.isUndefinedOrNull(value)) {
                return fallbackValue;
            }
            return parseInt(value, 10);
        }
        store(key, value, scope) {
            // We remove the key for undefined/null values
            if (types_1.isUndefinedOrNull(value)) {
                return this.remove(key, scope);
            }
            // Otherwise, convert to String and store
            const valueStr = String(value);
            // Return early if value already set
            const currentValue = this.getCache(scope).get(key);
            if (currentValue === valueStr) {
                return Promise.resolve();
            }
            // Update in cache
            this.getCache(scope).set(key, valueStr);
            // Events
            this._onDidChangeStorage.fire({ scope, key });
            return Promise.resolve();
        }
        remove(key, scope) {
            const wasDeleted = this.getCache(scope).delete(key);
            if (!wasDeleted) {
                return Promise.resolve(); // Return early if value already deleted
            }
            // Events
            this._onDidChangeStorage.fire({ scope, key });
            return Promise.resolve();
        }
        logStorage() {
            logStorage(this.globalCache, this.workspaceCache, 'inMemory', 'inMemory');
        }
        async migrate(toWorkspace) {
            // not supported
        }
        flush() {
            this._onWillSaveState.fire({ reason: WillSaveStateReason.NONE });
        }
        isNew() {
            return true; // always new when in-memory
        }
        async close() { }
    }
    exports.InMemoryStorageService = InMemoryStorageService;
    async function logStorage(global, workspace, globalPath, workspacePath) {
        const safeParse = (value) => {
            try {
                return JSON.parse(value);
            }
            catch (error) {
                return value;
            }
        };
        const globalItems = new Map();
        const globalItemsParsed = new Map();
        global.forEach((value, key) => {
            globalItems.set(key, value);
            globalItemsParsed.set(key, safeParse(value));
        });
        const workspaceItems = new Map();
        const workspaceItemsParsed = new Map();
        workspace.forEach((value, key) => {
            workspaceItems.set(key, value);
            workspaceItemsParsed.set(key, safeParse(value));
        });
        console.group(`Storage: Global (path: ${globalPath})`);
        let globalValues = [];
        globalItems.forEach((value, key) => {
            globalValues.push({ key, value });
        });
        console.table(globalValues);
        console.groupEnd();
        console.log(globalItemsParsed);
        console.group(`Storage: Workspace (path: ${workspacePath})`);
        let workspaceValues = [];
        workspaceItems.forEach((value, key) => {
            workspaceValues.push({ key, value });
        });
        console.table(workspaceValues);
        console.groupEnd();
        console.log(workspaceItemsParsed);
    }
    exports.logStorage = logStorage;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[37/*vs/platform/telemetry/common/telemetry*/], __M([0/*require*/,1/*exports*/,4/*vs/platform/instantiation/common/instantiation*/]), function (require, exports, instantiation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.machineIdKey = exports.lastSessionDateStorageKey = exports.firstSessionDateStorageKey = exports.currentSessionDateStorageKey = exports.instanceStorageKey = exports.ITelemetryService = void 0;
    exports.ITelemetryService = instantiation_1.createDecorator('telemetryService');
    // Keys
    exports.instanceStorageKey = 'telemetry.instanceId';
    exports.currentSessionDateStorageKey = 'telemetry.currentSessionDate';
    exports.firstSessionDateStorageKey = 'telemetry.firstSessionDate';
    exports.lastSessionDateStorageKey = 'telemetry.lastSessionDate';
    exports.machineIdKey = 'telemetry.machineId';
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/









define(__m[109/*vs/platform/extensionManagement/common/extensionGalleryService*/], __M([0/*require*/,1/*exports*/,20/*vs/base/common/errors*/,24/*vs/platform/extensionManagement/common/extensionManagement*/,25/*vs/platform/extensionManagement/common/extensionManagementUtil*/,17/*vs/base/common/objects*/,37/*vs/platform/telemetry/common/telemetry*/,50/*vs/platform/request/common/request*/,43/*vs/platform/extensions/common/extensionValidator*/,19/*vs/platform/environment/common/environment*/,28/*vs/base/common/cancellation*/,7/*vs/platform/log/common/log*/,26/*vs/platform/files/common/files*/,13/*vs/base/common/uri*/,36/*vs/platform/product/common/productService*/,108/*vs/platform/storage/common/storage*/,105/*vs/platform/serviceMachineId/common/serviceMachineId*/,4/*vs/platform/instantiation/common/instantiation*/,21/*vs/base/common/resources*/]), function (require, exports, errors_1, extensionManagement_1, extensionManagementUtil_1, objects_1, telemetry_1, request_1, extensionValidator_1, environment_1, cancellation_1, log_1, files_1, uri_1, productService_1, storage_1, serviceMachineId_1, instantiation_1, resources_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.resolveMarketplaceHeaders = exports.ExtensionGalleryService = void 0;
    var Flags;
    (function (Flags) {
        Flags[Flags["None"] = 0] = "None";
        Flags[Flags["IncludeVersions"] = 1] = "IncludeVersions";
        Flags[Flags["IncludeFiles"] = 2] = "IncludeFiles";
        Flags[Flags["IncludeCategoryAndTags"] = 4] = "IncludeCategoryAndTags";
        Flags[Flags["IncludeSharedAccounts"] = 8] = "IncludeSharedAccounts";
        Flags[Flags["IncludeVersionProperties"] = 16] = "IncludeVersionProperties";
        Flags[Flags["ExcludeNonValidated"] = 32] = "ExcludeNonValidated";
        Flags[Flags["IncludeInstallationTargets"] = 64] = "IncludeInstallationTargets";
        Flags[Flags["IncludeAssetUri"] = 128] = "IncludeAssetUri";
        Flags[Flags["IncludeStatistics"] = 256] = "IncludeStatistics";
        Flags[Flags["IncludeLatestVersionOnly"] = 512] = "IncludeLatestVersionOnly";
        Flags[Flags["Unpublished"] = 4096] = "Unpublished";
    })(Flags || (Flags = {}));
    function flagsToString(...flags) {
        return String(flags.reduce((r, f) => r | f, 0));
    }
    var FilterType;
    (function (FilterType) {
        FilterType[FilterType["Tag"] = 1] = "Tag";
        FilterType[FilterType["ExtensionId"] = 4] = "ExtensionId";
        FilterType[FilterType["Category"] = 5] = "Category";
        FilterType[FilterType["ExtensionName"] = 7] = "ExtensionName";
        FilterType[FilterType["Target"] = 8] = "Target";
        FilterType[FilterType["Featured"] = 9] = "Featured";
        FilterType[FilterType["SearchText"] = 10] = "SearchText";
        FilterType[FilterType["ExcludeWithFlags"] = 12] = "ExcludeWithFlags";
    })(FilterType || (FilterType = {}));
    const AssetType = {
        Icon: 'Microsoft.VisualStudio.Services.Icons.Default',
        Details: 'Microsoft.VisualStudio.Services.Content.Details',
        Changelog: 'Microsoft.VisualStudio.Services.Content.Changelog',
        Manifest: 'Microsoft.VisualStudio.Code.Manifest',
        VSIX: 'Microsoft.VisualStudio.Services.VSIXPackage',
        License: 'Microsoft.VisualStudio.Services.Content.License',
        Repository: 'Microsoft.VisualStudio.Services.Links.Source'
    };
    const PropertyType = {
        Dependency: 'Microsoft.VisualStudio.Code.ExtensionDependencies',
        ExtensionPack: 'Microsoft.VisualStudio.Code.ExtensionPack',
        Engine: 'Microsoft.VisualStudio.Code.Engine',
        LocalizedLanguages: 'Microsoft.VisualStudio.Code.LocalizedLanguages',
        WebExtension: 'Microsoft.VisualStudio.Code.WebExtension'
    };
    const DefaultPageSize = 10;
    const DefaultQueryState = {
        pageNumber: 1,
        pageSize: DefaultPageSize,
        sortBy: 0 /* NoneOrRelevance */,
        sortOrder: 0 /* Default */,
        flags: Flags.None,
        criteria: [],
        assetTypes: []
    };
    class Query {
        constructor(state = DefaultQueryState) {
            this.state = state;
        }
        get pageNumber() { return this.state.pageNumber; }
        get pageSize() { return this.state.pageSize; }
        get sortBy() { return this.state.sortBy; }
        get sortOrder() { return this.state.sortOrder; }
        get flags() { return this.state.flags; }
        withPage(pageNumber, pageSize = this.state.pageSize) {
            return new Query(Object.assign(Object.assign({}, this.state), { pageNumber, pageSize }));
        }
        withFilter(filterType, ...values) {
            const criteria = [
                ...this.state.criteria,
                ...values.length ? values.map(value => ({ filterType, value })) : [{ filterType }]
            ];
            return new Query(Object.assign(Object.assign({}, this.state), { criteria }));
        }
        withSortBy(sortBy) {
            return new Query(Object.assign(Object.assign({}, this.state), { sortBy }));
        }
        withSortOrder(sortOrder) {
            return new Query(Object.assign(Object.assign({}, this.state), { sortOrder }));
        }
        withFlags(...flags) {
            return new Query(Object.assign(Object.assign({}, this.state), { flags: flags.reduce((r, f) => r | f, 0) }));
        }
        withAssetTypes(...assetTypes) {
            return new Query(Object.assign(Object.assign({}, this.state), { assetTypes }));
        }
        get raw() {
            const { criteria, pageNumber, pageSize, sortBy, sortOrder, flags, assetTypes } = this.state;
            const filters = [{ criteria, pageNumber, pageSize, sortBy, sortOrder }];
            return { filters, assetTypes, flags };
        }
        get searchText() {
            const criterium = this.state.criteria.filter(criterium => criterium.filterType === FilterType.SearchText)[0];
            return criterium && criterium.value ? criterium.value : '';
        }
    }
    function getStatistic(statistics, name) {
        const result = (statistics || []).filter(s => s.statisticName === name)[0];
        return result ? result.value : 0;
    }
    function getCoreTranslationAssets(version) {
        const coreTranslationAssetPrefix = 'Microsoft.VisualStudio.Code.Translation.';
        const result = version.files.filter(f => f.assetType.indexOf(coreTranslationAssetPrefix) === 0);
        return result.reduce((result, file) => {
            const asset = getVersionAsset(version, file.assetType);
            if (asset) {
                result.push([file.assetType.substring(coreTranslationAssetPrefix.length), asset]);
            }
            return result;
        }, []);
    }
    function getRepositoryAsset(version) {
        if (version.properties) {
            const results = version.properties.filter(p => p.key === AssetType.Repository);
            const gitRegExp = new RegExp('((git|ssh|http(s)?)|(git@[\w.]+))(:(//)?)([\w.@\:/\-~]+)(.git)(/)?');
            const uri = results.filter(r => gitRegExp.test(r.value))[0];
            return uri ? { uri: uri.value, fallbackUri: uri.value } : null;
        }
        return getVersionAsset(version, AssetType.Repository);
    }
    function getDownloadAsset(version) {
        return {
            uri: `${version.fallbackAssetUri}/${AssetType.VSIX}?redirect=true`,
            fallbackUri: `${version.fallbackAssetUri}/${AssetType.VSIX}`
        };
    }
    function getIconAsset(version) {
        const asset = getVersionAsset(version, AssetType.Icon);
        if (asset) {
            return asset;
        }
        const uri = extensionManagement_1.DefaultIconPath;
        return { uri, fallbackUri: uri };
    }
    function getVersionAsset(version, type) {
        const result = version.files.filter(f => f.assetType === type)[0];
        return result ? { uri: `${version.assetUri}/${type}`, fallbackUri: `${version.fallbackAssetUri}/${type}` } : null;
    }
    function getExtensions(version, property) {
        const values = version.properties ? version.properties.filter(p => p.key === property) : [];
        const value = values.length > 0 && values[0].value;
        return value ? value.split(',').map(v => extensionManagementUtil_1.adoptToGalleryExtensionId(v)) : [];
    }
    function getEngine(version) {
        const values = version.properties ? version.properties.filter(p => p.key === PropertyType.Engine) : [];
        return (values.length > 0 && values[0].value) || '';
    }
    function getLocalizedLanguages(version) {
        const values = version.properties ? version.properties.filter(p => p.key === PropertyType.LocalizedLanguages) : [];
        const value = (values.length > 0 && values[0].value) || '';
        return value ? value.split(',') : [];
    }
    function getIsPreview(flags) {
        return flags.indexOf('preview') !== -1;
    }
    function getIsWebExtension(version) {
        const webExtensionProperty = version.properties ? version.properties.find(p => p.key === PropertyType.WebExtension) : undefined;
        return !!webExtensionProperty && webExtensionProperty.value === 'true';
    }
    function getWebResource(version) {
        return version.files.some(f => f.assetType.startsWith('Microsoft.VisualStudio.Code.WebResources'))
            ? resources_1.joinPath(uri_1.URI.parse(version.assetUri), 'Microsoft.VisualStudio.Code.WebResources', 'extension')
            : undefined;
    }
    function toExtension(galleryExtension, version, index, query, querySource) {
        const assets = {
            manifest: getVersionAsset(version, AssetType.Manifest),
            readme: getVersionAsset(version, AssetType.Details),
            changelog: getVersionAsset(version, AssetType.Changelog),
            license: getVersionAsset(version, AssetType.License),
            repository: getRepositoryAsset(version),
            download: getDownloadAsset(version),
            icon: getIconAsset(version),
            coreTranslations: getCoreTranslationAssets(version)
        };
        return {
            identifier: {
                id: extensionManagementUtil_1.getGalleryExtensionId(galleryExtension.publisher.publisherName, galleryExtension.extensionName),
                uuid: galleryExtension.extensionId
            },
            name: galleryExtension.extensionName,
            version: version.version,
            date: version.lastUpdated,
            displayName: galleryExtension.displayName,
            publisherId: galleryExtension.publisher.publisherId,
            publisher: galleryExtension.publisher.publisherName,
            publisherDisplayName: galleryExtension.publisher.displayName,
            description: galleryExtension.shortDescription || '',
            installCount: getStatistic(galleryExtension.statistics, 'install'),
            rating: getStatistic(galleryExtension.statistics, 'averagerating'),
            ratingCount: getStatistic(galleryExtension.statistics, 'ratingcount'),
            assetUri: uri_1.URI.parse(version.assetUri),
            webResource: getWebResource(version),
            assetTypes: version.files.map(({ assetType }) => assetType),
            assets,
            properties: {
                dependencies: getExtensions(version, PropertyType.Dependency),
                extensionPack: getExtensions(version, PropertyType.ExtensionPack),
                engine: getEngine(version),
                localizedLanguages: getLocalizedLanguages(version),
                webExtension: getIsWebExtension(version)
            },
            /* __GDPR__FRAGMENT__
                "GalleryExtensionTelemetryData2" : {
                    "index" : { "classification": "SystemMetaData", "purpose": "FeatureInsight", "isMeasurement": true },
                    "searchText": { "classification": "CustomerContent", "purpose": "FeatureInsight" },
                    "querySource": { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
                }
            */
            telemetryData: {
                index: ((query.pageNumber - 1) * query.pageSize) + index,
                searchText: query.searchText,
                querySource
            },
            preview: getIsPreview(galleryExtension.flags)
        };
    }
    let ExtensionGalleryService = class ExtensionGalleryService {
        constructor(requestService, logService, environmentService, telemetryService, fileService, productService, storageService) {
            this.requestService = requestService;
            this.logService = logService;
            this.environmentService = environmentService;
            this.telemetryService = telemetryService;
            this.fileService = fileService;
            this.productService = productService;
            const config = productService.extensionsGallery;
            this.extensionsGalleryUrl = config && config.serviceUrl;
            this.extensionsControlUrl = config && config.controlUrl;
            this.commonHeadersPromise = resolveMarketplaceHeaders(productService.version, this.environmentService, this.fileService, storageService);
        }
        api(path = '') {
            return `${this.extensionsGalleryUrl}${path}`;
        }
        isEnabled() {
            return !!this.extensionsGalleryUrl;
        }
        async getCompatibleExtension(arg1, version) {
            const extension = await this.getCompatibleExtensionByEngine(arg1, version);
            if (extension === null || extension === void 0 ? void 0 : extension.properties.webExtension) {
                return extension.webResource ? extension : null;
            }
            else {
                return extension;
            }
        }
        async getCompatibleExtensionByEngine(arg1, version) {
            const extension = extensionManagement_1.isIExtensionIdentifier(arg1) ? null : arg1;
            if (extension && extension.properties.engine && extensionValidator_1.isEngineValid(extension.properties.engine, this.productService.version)) {
                return extension;
            }
            const { id, uuid } = extension ? extension.identifier : arg1;
            let query = new Query()
                .withFlags(Flags.IncludeAssetUri, Flags.IncludeStatistics, Flags.IncludeFiles, Flags.IncludeVersionProperties)
                .withPage(1, 1)
                .withFilter(FilterType.Target, 'Microsoft.VisualStudio.Code');
            if (uuid) {
                query = query.withFilter(FilterType.ExtensionId, uuid);
            }
            else {
                query = query.withFilter(FilterType.ExtensionName, id);
            }
            const { galleryExtensions } = await this.queryGallery(query, cancellation_1.CancellationToken.None);
            const [rawExtension] = galleryExtensions;
            if (!rawExtension || !rawExtension.versions.length) {
                return null;
            }
            if (version) {
                const versionAsset = rawExtension.versions.filter(v => v.version === version)[0];
                if (versionAsset) {
                    const extension = toExtension(rawExtension, versionAsset, 0, query);
                    if (extension.properties.engine && extensionValidator_1.isEngineValid(extension.properties.engine, this.productService.version)) {
                        return extension;
                    }
                }
                return null;
            }
            const rawVersion = await this.getLastValidExtensionVersion(rawExtension, rawExtension.versions);
            if (rawVersion) {
                return toExtension(rawExtension, rawVersion, 0, query);
            }
            return null;
        }
        async query(arg1, arg2) {
            const options = cancellation_1.CancellationToken.isCancellationToken(arg1) ? {} : arg1;
            const token = cancellation_1.CancellationToken.isCancellationToken(arg1) ? arg1 : arg2;
            if (!this.isEnabled()) {
                throw new Error('No extension gallery service configured.');
            }
            const type = options.names ? 'ids' : (options.text ? 'text' : 'all');
            let text = options.text || '';
            const pageSize = objects_1.getOrDefault(options, o => o.pageSize, 50);
            this.telemetryService.publicLog2('galleryService:query', { type, text });
            let query = new Query()
                .withFlags(Flags.IncludeLatestVersionOnly, Flags.IncludeAssetUri, Flags.IncludeStatistics, Flags.IncludeFiles, Flags.IncludeVersionProperties)
                .withPage(1, pageSize)
                .withFilter(FilterType.Target, 'Microsoft.VisualStudio.Code');
            if (text) {
                // Use category filter instead of "category:themes"
                text = text.replace(/\bcategory:("([^"]*)"|([^"]\S*))(\s+|\b|$)/g, (_, quotedCategory, category) => {
                    query = query.withFilter(FilterType.Category, category || quotedCategory);
                    return '';
                });
                // Use tag filter instead of "tag:debuggers"
                text = text.replace(/\btag:("([^"]*)"|([^"]\S*))(\s+|\b|$)/g, (_, quotedTag, tag) => {
                    query = query.withFilter(FilterType.Tag, tag || quotedTag);
                    return '';
                });
                // Use featured filter
                text = text.replace(/\bfeatured(\s+|\b|$)/g, () => {
                    query = query.withFilter(FilterType.Featured);
                    return '';
                });
                text = text.trim();
                if (text) {
                    text = text.length < 200 ? text : text.substring(0, 200);
                    query = query.withFilter(FilterType.SearchText, text);
                }
                query = query.withSortBy(0 /* NoneOrRelevance */);
            }
            else if (options.ids) {
                query = query.withFilter(FilterType.ExtensionId, ...options.ids);
            }
            else if (options.names) {
                query = query.withFilter(FilterType.ExtensionName, ...options.names);
            }
            else {
                query = query.withSortBy(4 /* InstallCount */);
            }
            if (typeof options.sortBy === 'number') {
                query = query.withSortBy(options.sortBy);
            }
            if (typeof options.sortOrder === 'number') {
                query = query.withSortOrder(options.sortOrder);
            }
            const { galleryExtensions, total } = await this.queryGallery(query, token);
            const extensions = galleryExtensions.map((e, index) => toExtension(e, e.versions[0], index, query, options.source));
            const getPage = async (pageIndex, ct) => {
                if (ct.isCancellationRequested) {
                    throw errors_1.canceled();
                }
                const nextPageQuery = query.withPage(pageIndex + 1);
                const { galleryExtensions } = await this.queryGallery(nextPageQuery, ct);
                return galleryExtensions.map((e, index) => toExtension(e, e.versions[0], index, nextPageQuery, options.source));
            };
            return { firstPage: extensions, total, pageSize: query.pageSize, getPage };
        }
        async queryGallery(query, token) {
            if (!this.isEnabled()) {
                throw new Error('No extension gallery service configured.');
            }
            // Always exclude non validated and unpublished extensions
            query = query
                .withFlags(query.flags, Flags.ExcludeNonValidated)
                .withFilter(FilterType.ExcludeWithFlags, flagsToString(Flags.Unpublished));
            const commonHeaders = await this.commonHeadersPromise;
            const data = JSON.stringify(query.raw);
            const headers = Object.assign(Object.assign({}, commonHeaders), { 'Content-Type': 'application/json', 'Accept': 'application/json;api-version=3.0-preview.1', 'Accept-Encoding': 'gzip', 'Content-Length': String(data.length) });
            const context = await this.requestService.request({
                type: 'POST',
                url: this.api('/extensionquery'),
                data,
                headers
            }, token);
            if (context.res.statusCode && context.res.statusCode >= 400 && context.res.statusCode < 500) {
                return { galleryExtensions: [], total: 0 };
            }
            const result = await request_1.asJson(context);
            if (result) {
                const r = result.results[0];
                const galleryExtensions = r.extensions;
                const resultCount = r.resultMetadata && r.resultMetadata.filter(m => m.metadataType === 'ResultCount')[0];
                const total = resultCount && resultCount.metadataItems.filter(i => i.name === 'TotalCount')[0].count || 0;
                return { galleryExtensions, total };
            }
            return { galleryExtensions: [], total: 0 };
        }
        async reportStatistic(publisher, name, version, type) {
            if (!this.isEnabled()) {
                return undefined;
            }
            const commonHeaders = await this.commonHeadersPromise;
            const headers = Object.assign(Object.assign({}, commonHeaders), { Accept: '*/*;api-version=4.0-preview.1' });
            try {
                await this.requestService.request({
                    type: 'POST',
                    url: this.api(`/publishers/${publisher}/extensions/${name}/${version}/stats?statType=${type}`),
                    headers
                }, cancellation_1.CancellationToken.None);
            }
            catch (error) { /* Ignore */ }
        }
        async download(extension, location, operation) {
            this.logService.trace('ExtensionGalleryService#download', extension.identifier.id);
            const data = extensionManagementUtil_1.getGalleryExtensionTelemetryData(extension);
            const startTime = new Date().getTime();
            /* __GDPR__
                "galleryService:downloadVSIX" : {
                    "duration": { "classification": "SystemMetaData", "purpose": "PerformanceAndHealth", "isMeasurement": true },
                    "${include}": [
                        "${GalleryExtensionTelemetryData}"
                    ]
                }
            */
            const log = (duration) => this.telemetryService.publicLog('galleryService:downloadVSIX', Object.assign(Object.assign({}, data), { duration }));
            const operationParam = operation === 1 /* Install */ ? 'install' : operation === 2 /* Update */ ? 'update' : '';
            const downloadAsset = operationParam ? {
                uri: `${extension.assets.download.uri}&${operationParam}=true`,
                fallbackUri: `${extension.assets.download.fallbackUri}?${operationParam}=true`
            } : extension.assets.download;
            const context = await this.getAsset(downloadAsset);
            await this.fileService.writeFile(location, context.stream);
            log(new Date().getTime() - startTime);
        }
        async getReadme(extension, token) {
            if (extension.assets.readme) {
                const context = await this.getAsset(extension.assets.readme, {}, token);
                const content = await request_1.asText(context);
                return content || '';
            }
            return '';
        }
        async getManifest(extension, token) {
            if (extension.assets.manifest) {
                const context = await this.getAsset(extension.assets.manifest, {}, token);
                const text = await request_1.asText(context);
                return text ? JSON.parse(text) : null;
            }
            return null;
        }
        async getCoreTranslation(extension, languageId) {
            const asset = extension.assets.coreTranslations.filter(t => t[0] === languageId.toUpperCase())[0];
            if (asset) {
                const context = await this.getAsset(asset[1]);
                const text = await request_1.asText(context);
                return text ? JSON.parse(text) : null;
            }
            return null;
        }
        async getChangelog(extension, token) {
            if (extension.assets.changelog) {
                const context = await this.getAsset(extension.assets.changelog, {}, token);
                const content = await request_1.asText(context);
                return content || '';
            }
            return '';
        }
        async getAllVersions(extension, compatible) {
            let query = new Query()
                .withFlags(Flags.IncludeVersions, Flags.IncludeFiles, Flags.IncludeVersionProperties)
                .withPage(1, 1)
                .withFilter(FilterType.Target, 'Microsoft.VisualStudio.Code');
            if (extension.identifier.uuid) {
                query = query.withFilter(FilterType.ExtensionId, extension.identifier.uuid);
            }
            else {
                query = query.withFilter(FilterType.ExtensionName, extension.identifier.id);
            }
            const result = [];
            const { galleryExtensions } = await this.queryGallery(query, cancellation_1.CancellationToken.None);
            if (galleryExtensions.length) {
                if (compatible) {
                    await Promise.all(galleryExtensions[0].versions.map(async (v) => {
                        let engine;
                        try {
                            engine = await this.getEngine(v);
                        }
                        catch (error) { /* Ignore error and skip version */ }
                        if (engine && extensionValidator_1.isEngineValid(engine, this.productService.version)) {
                            result.push({ version: v.version, date: v.lastUpdated });
                        }
                    }));
                }
                else {
                    result.push(...galleryExtensions[0].versions.map(v => ({ version: v.version, date: v.lastUpdated })));
                }
            }
            return result;
        }
        async getAsset(asset, options = {}, token = cancellation_1.CancellationToken.None) {
            const commonHeaders = await this.commonHeadersPromise;
            const baseOptions = { type: 'GET' };
            const headers = Object.assign(Object.assign({}, commonHeaders), (options.headers || {}));
            options = Object.assign(Object.assign(Object.assign({}, options), baseOptions), { headers });
            const url = asset.uri;
            const fallbackUrl = asset.fallbackUri;
            const firstOptions = Object.assign(Object.assign({}, options), { url });
            try {
                const context = await this.requestService.request(firstOptions, token);
                if (context.res.statusCode === 200) {
                    return context;
                }
                const message = await request_1.asText(context);
                throw new Error(`Expected 200, got back ${context.res.statusCode} instead.\n\n${message}`);
            }
            catch (err) {
                if (errors_1.isPromiseCanceledError(err)) {
                    throw err;
                }
                const message = errors_1.getErrorMessage(err);
                this.telemetryService.publicLog2('galleryService:cdnFallback', { url, message });
                const fallbackOptions = Object.assign(Object.assign({}, options), { url: fallbackUrl });
                return this.requestService.request(fallbackOptions, token);
            }
        }
        async getLastValidExtensionVersion(extension, versions) {
            const version = this.getLastValidExtensionVersionFromProperties(extension, versions);
            if (version) {
                return version;
            }
            return this.getLastValidExtensionVersionRecursively(extension, versions);
        }
        getLastValidExtensionVersionFromProperties(extension, versions) {
            for (const version of versions) {
                const engine = getEngine(version);
                if (!engine) {
                    return null;
                }
                if (extensionValidator_1.isEngineValid(engine, this.productService.version)) {
                    return version;
                }
            }
            return null;
        }
        async getEngine(version) {
            const engine = getEngine(version);
            if (engine) {
                return engine;
            }
            const manifestAsset = getVersionAsset(version, AssetType.Manifest);
            if (!manifestAsset) {
                throw new Error('Manifest was not found');
            }
            const headers = { 'Accept-Encoding': 'gzip' };
            const context = await this.getAsset(manifestAsset, { headers });
            const manifest = await request_1.asJson(context);
            if (manifest) {
                return manifest.engines.vscode;
            }
            throw new Error('Error while reading manifest');
        }
        async getLastValidExtensionVersionRecursively(extension, versions) {
            if (!versions.length) {
                return null;
            }
            const version = versions[0];
            const engine = await this.getEngine(version);
            if (!extensionValidator_1.isEngineValid(engine, this.productService.version)) {
                return this.getLastValidExtensionVersionRecursively(extension, versions.slice(1));
            }
            version.properties = version.properties || [];
            version.properties.push({ key: PropertyType.Engine, value: engine });
            return version;
        }
        async getExtensionsReport() {
            if (!this.isEnabled()) {
                throw new Error('No extension gallery service configured.');
            }
            if (!this.extensionsControlUrl) {
                return [];
            }
            const context = await this.requestService.request({ type: 'GET', url: this.extensionsControlUrl }, cancellation_1.CancellationToken.None);
            if (context.res.statusCode !== 200) {
                throw new Error('Could not get extensions report.');
            }
            const result = await request_1.asJson(context);
            const map = new Map();
            if (result) {
                for (const id of result.malicious) {
                    const ext = map.get(id) || { id: { id }, malicious: true, slow: false };
                    ext.malicious = true;
                    map.set(id, ext);
                }
            }
            return [...map.values()];
        }
    };
    ExtensionGalleryService = __decorate([
        __param(0, request_1.IRequestService),
        __param(1, log_1.ILogService),
        __param(2, environment_1.IEnvironmentService),
        __param(3, telemetry_1.ITelemetryService),
        __param(4, files_1.IFileService),
        __param(5, productService_1.IProductService),
        __param(6, instantiation_1.optional(storage_1.IStorageService))
    ], ExtensionGalleryService);
    exports.ExtensionGalleryService = ExtensionGalleryService;
    async function resolveMarketplaceHeaders(version, environmentService, fileService, storageService) {
        const headers = {
            'X-Market-Client-Id': `VSCode ${version}`,
            'User-Agent': `VSCode ${version}`
        };
        const uuid = await serviceMachineId_1.getServiceMachineId(environmentService, fileService, storageService);
        headers['X-Market-User-Id'] = uuid;
        return headers;
    }
    exports.resolveMarketplaceHeaders = resolveMarketplaceHeaders;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/









define(__m[110/*vs/platform/telemetry/common/telemetryService*/], __M([0/*require*/,1/*exports*/,78/*vs/nls!vs/platform/telemetry/common/telemetryService*/,16/*vs/base/common/strings*/,4/*vs/platform/instantiation/common/instantiation*/,27/*vs/platform/configuration/common/configuration*/,29/*vs/platform/configuration/common/configurationRegistry*/,2/*vs/base/common/lifecycle*/,17/*vs/base/common/objects*/,22/*vs/platform/registry/common/platform*/]), function (require, exports, nls_1, strings_1, instantiation_1, configuration_1, configurationRegistry_1, lifecycle_1, objects_1, platform_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TelemetryService = void 0;
    let TelemetryService = class TelemetryService {
        constructor(config, _configurationService) {
            this._configurationService = _configurationService;
            this._experimentProperties = {};
            this._disposables = new lifecycle_1.DisposableStore();
            this._cleanupPatterns = [];
            this._appender = config.appender;
            this._commonProperties = config.commonProperties || Promise.resolve({});
            this._piiPaths = config.piiPaths || [];
            this._userOptIn = true;
            this._enabled = true;
            this.sendErrorTelemetry = !!config.sendErrorTelemetry;
            // static cleanup pattern for: `file:///DANGEROUS/PATH/resources/app/Useful/Information`
            this._cleanupPatterns = [/file:\/\/\/.*?\/resources\/app\//gi];
            for (let piiPath of this._piiPaths) {
                this._cleanupPatterns.push(new RegExp(strings_1.escapeRegExpCharacters(piiPath), 'gi'));
            }
            if (this._configurationService) {
                this._updateUserOptIn();
                this._configurationService.onDidChangeConfiguration(this._updateUserOptIn, this, this._disposables);
                this.publicLog2('optInStatus', { optIn: this._userOptIn });
                this._commonProperties.then(values => {
                    const isHashedId = /^[a-f0-9]+$/i.test(values['common.machineId']);
                    this.publicLog2('machineIdFallback', { usingFallbackGuid: !isHashedId });
                });
            }
        }
        setExperimentProperty(name, value) {
            this._experimentProperties[name] = value;
        }
        setEnabled(value) {
            this._enabled = value;
        }
        _updateUserOptIn() {
            var _a;
            const config = (_a = this._configurationService) === null || _a === void 0 ? void 0 : _a.getValue(TELEMETRY_SECTION_ID);
            this._userOptIn = config ? config.enableTelemetry : this._userOptIn;
        }
        get isOptedIn() {
            return this._userOptIn && this._enabled;
        }
        async getTelemetryInfo() {
            const values = await this._commonProperties;
            // well known properties
            let sessionId = values['sessionID'];
            let instanceId = values['common.instanceId'];
            let machineId = values['common.machineId'];
            let msftInternal = values['common.msftInternal'];
            return { sessionId, instanceId, machineId, msftInternal };
        }
        dispose() {
            this._disposables.dispose();
        }
        publicLog(eventName, data, anonymizeFilePaths) {
            // don't send events when the user is optout
            if (!this.isOptedIn) {
                return Promise.resolve(undefined);
            }
            return this._commonProperties.then(values => {
                // (first) add common properties
                data = objects_1.mixin(data, values);
                // (next) add experiment properties
                data = objects_1.mixin(data, this._experimentProperties);
                // (last) remove all PII from data
                data = objects_1.cloneAndChange(data, value => {
                    if (typeof value === 'string') {
                        return this._cleanupInfo(value, anonymizeFilePaths);
                    }
                    return undefined;
                });
                this._appender.log(eventName, data);
            }, err => {
                // unsure what to do now...
                console.error(err);
            });
        }
        publicLog2(eventName, data, anonymizeFilePaths) {
            return this.publicLog(eventName, data, anonymizeFilePaths);
        }
        publicLogError(errorEventName, data) {
            if (!this.sendErrorTelemetry) {
                return Promise.resolve(undefined);
            }
            // Send error event and anonymize paths
            return this.publicLog(errorEventName, data, true);
        }
        publicLogError2(eventName, data) {
            return this.publicLogError(eventName, data);
        }
        _cleanupInfo(stack, anonymizeFilePaths) {
            let updatedStack = stack;
            if (anonymizeFilePaths) {
                const cleanUpIndexes = [];
                for (let regexp of this._cleanupPatterns) {
                    while (true) {
                        const result = regexp.exec(stack);
                        if (!result) {
                            break;
                        }
                        cleanUpIndexes.push([result.index, regexp.lastIndex]);
                    }
                }
                const nodeModulesRegex = /^[\\\/]?(node_modules|node_modules\.asar)[\\\/]/;
                const fileRegex = /(file:\/\/)?([a-zA-Z]:(\\\\|\\|\/)|(\\\\|\\|\/))?([\w-\._]+(\\\\|\\|\/))+[\w-\._]*/g;
                let lastIndex = 0;
                updatedStack = '';
                while (true) {
                    const result = fileRegex.exec(stack);
                    if (!result) {
                        break;
                    }
                    // Anoynimize user file paths that do not need to be retained or cleaned up.
                    if (!nodeModulesRegex.test(result[0]) && cleanUpIndexes.every(([x, y]) => result.index < x || result.index >= y)) {
                        updatedStack += stack.substring(lastIndex, result.index) + '<REDACTED: user-file-path>';
                        lastIndex = fileRegex.lastIndex;
                    }
                }
                if (lastIndex < stack.length) {
                    updatedStack += stack.substr(lastIndex);
                }
            }
            // sanitize with configured cleanup patterns
            for (let regexp of this._cleanupPatterns) {
                updatedStack = updatedStack.replace(regexp, '');
            }
            return updatedStack;
        }
    };
    TelemetryService.IDLE_START_EVENT_NAME = 'UserIdleStart';
    TelemetryService.IDLE_STOP_EVENT_NAME = 'UserIdleStop';
    TelemetryService = __decorate([
        __param(1, instantiation_1.optional(configuration_1.IConfigurationService))
    ], TelemetryService);
    exports.TelemetryService = TelemetryService;
    const TELEMETRY_SECTION_ID = 'telemetry';
    platform_1.Registry.as(configurationRegistry_1.Extensions.Configuration).registerConfiguration({
        'id': TELEMETRY_SECTION_ID,
        'order': 110,
        'type': 'object',
        'title': nls_1.localize(0, null),
        'properties': {
            'telemetry.enableTelemetry': {
                'type': 'boolean',
                'description': nls_1.localize(1, null),
                'default': true,
                'tags': ['usesOnlineServices']
            }
        }
    });
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/









define(__m[51/*vs/platform/telemetry/common/telemetryUtils*/], __M([0/*require*/,1/*exports*/,27/*vs/platform/configuration/common/configuration*/,7/*vs/platform/log/common/log*/,17/*vs/base/common/objects*/,8/*vs/base/common/types*/]), function (require, exports, configuration_1, log_1, objects_1, types_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.cleanRemoteAuthority = exports.validateTelemetryData = exports.configurationTelemetry = exports.LogAppender = exports.NullAppender = exports.combinedAppender = exports.NullTelemetryService = void 0;
    exports.NullTelemetryService = new class {
        constructor() {
            this.sendErrorTelemetry = false;
            this.isOptedIn = true;
        }
        publicLog(eventName, data) {
            return Promise.resolve(undefined);
        }
        publicLog2(eventName, data) {
            return this.publicLog(eventName, data);
        }
        publicLogError(eventName, data) {
            return Promise.resolve(undefined);
        }
        publicLogError2(eventName, data) {
            return this.publicLogError(eventName, data);
        }
        setExperimentProperty() { }
        setEnabled() { }
        getTelemetryInfo() {
            return Promise.resolve({
                instanceId: 'someValue.instanceId',
                sessionId: 'someValue.sessionId',
                machineId: 'someValue.machineId'
            });
        }
    };
    function combinedAppender(...appenders) {
        return {
            log: (e, d) => appenders.forEach(a => a.log(e, d)),
            flush: () => Promise.all(appenders.map(a => a.flush()))
        };
    }
    exports.combinedAppender = combinedAppender;
    exports.NullAppender = { log: () => null, flush: () => Promise.resolve(null) };
    let LogAppender = class LogAppender {
        constructor(_logService) {
            this._logService = _logService;
            this.commonPropertiesRegex = /^sessionID$|^version$|^timestamp$|^commitHash$|^common\./;
        }
        flush() {
            return Promise.resolve(undefined);
        }
        log(eventName, data) {
            const strippedData = {};
            Object.keys(data).forEach(key => {
                if (!this.commonPropertiesRegex.test(key)) {
                    strippedData[key] = data[key];
                }
            });
            this._logService.trace(`telemetry/${eventName}`, strippedData);
        }
    };
    LogAppender = __decorate([
        __param(0, log_1.ILogService)
    ], LogAppender);
    exports.LogAppender = LogAppender;
    function configurationTelemetry(telemetryService, configurationService) {
        return configurationService.onDidChangeConfiguration(event => {
            if (event.source !== 6 /* DEFAULT */) {
                telemetryService.publicLog2('updateConfiguration', {
                    configurationSource: configuration_1.ConfigurationTargetToString(event.source),
                    configurationKeys: flattenKeys(event.sourceConfig)
                });
            }
        });
    }
    exports.configurationTelemetry = configurationTelemetry;
    function validateTelemetryData(data) {
        const properties = Object.create(null);
        const measurements = Object.create(null);
        const flat = Object.create(null);
        flatten(data, flat);
        for (let prop in flat) {
            // enforce property names less than 150 char, take the last 150 char
            prop = prop.length > 150 ? prop.substr(prop.length - 149) : prop;
            const value = flat[prop];
            if (typeof value === 'number') {
                measurements[prop] = value;
            }
            else if (typeof value === 'boolean') {
                measurements[prop] = value ? 1 : 0;
            }
            else if (typeof value === 'string') {
                //enforce property value to be less than 1024 char, take the first 1024 char
                properties[prop] = value.substring(0, 1023);
            }
            else if (typeof value !== 'undefined' && value !== null) {
                properties[prop] = value;
            }
        }
        return {
            properties,
            measurements
        };
    }
    exports.validateTelemetryData = validateTelemetryData;
    function cleanRemoteAuthority(remoteAuthority) {
        if (!remoteAuthority) {
            return 'none';
        }
        let ret = 'other';
        const allowedAuthorities = ['ssh-remote', 'dev-container', 'attached-container', 'wsl'];
        allowedAuthorities.forEach((res) => {
            if (remoteAuthority.indexOf(`${res}+`) === 0) {
                ret = res;
            }
        });
        return ret;
    }
    exports.cleanRemoteAuthority = cleanRemoteAuthority;
    function flatten(obj, result, order = 0, prefix) {
        if (!obj) {
            return;
        }
        for (let item of Object.getOwnPropertyNames(obj)) {
            const value = obj[item];
            const index = prefix ? prefix + item : item;
            if (Array.isArray(value)) {
                result[index] = objects_1.safeStringify(value);
            }
            else if (value instanceof Date) {
                // TODO unsure why this is here and not in _getData
                result[index] = value.toISOString();
            }
            else if (types_1.isObject(value)) {
                if (order < 2) {
                    flatten(value, result, order + 1, index + '.');
                }
                else {
                    result[index] = objects_1.safeStringify(value);
                }
            }
            else {
                result[index] = value;
            }
        }
    }
    function flattenKeys(value) {
        if (!value) {
            return [];
        }
        const result = [];
        flatKeys(result, '', value);
        return result;
    }
    function flatKeys(result, prefix, value) {
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            Object.keys(value)
                .forEach(key => flatKeys(result, prefix ? `${prefix}.${key}` : key, value[key]));
        }
        else {
            result.push(prefix);
        }
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/









define(__m[111/*vs/platform/telemetry/node/appInsightsAppender*/], __M([0/*require*/,1/*exports*/,121/*applicationinsights*/,17/*vs/base/common/objects*/,51/*vs/platform/telemetry/common/telemetryUtils*/,7/*vs/platform/log/common/log*/]), function (require, exports, appInsights, objects_1, telemetryUtils_1, log_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AppInsightsAppender = void 0;
    function getClient(aiKey) {
        let client;
        if (appInsights.defaultClient) {
            client = new appInsights.TelemetryClient(aiKey);
            client.channel.setUseDiskRetryCaching(true);
        }
        else {
            appInsights.setup(aiKey)
                .setAutoCollectRequests(false)
                .setAutoCollectPerformance(false)
                .setAutoCollectExceptions(false)
                .setAutoCollectDependencies(false)
                .setAutoDependencyCorrelation(false)
                .setAutoCollectConsole(false)
                .setInternalLogging(false, false)
                .setUseDiskRetryCaching(true)
                .start();
            client = appInsights.defaultClient;
        }
        if (aiKey.indexOf('AIF-') === 0) {
            client.config.endpointUrl = 'https://vortex.data.microsoft.com/collect/v1';
        }
        return client;
    }
    let AppInsightsAppender = class AppInsightsAppender {
        constructor(_eventPrefix, _defaultData, aiKeyOrClientFactory, // allow factory function for testing
        _logService) {
            this._eventPrefix = _eventPrefix;
            this._defaultData = _defaultData;
            this._logService = _logService;
            if (!this._defaultData) {
                this._defaultData = Object.create(null);
            }
            if (typeof aiKeyOrClientFactory === 'string') {
                this._aiClient = getClient(aiKeyOrClientFactory);
            }
            else if (typeof aiKeyOrClientFactory === 'function') {
                this._aiClient = aiKeyOrClientFactory();
            }
        }
        log(eventName, data) {
            if (!this._aiClient) {
                return;
            }
            data = objects_1.mixin(data, this._defaultData);
            data = telemetryUtils_1.validateTelemetryData(data);
            if (this._logService) {
                this._logService.trace(`telemetry/${eventName}`, data);
            }
            this._aiClient.trackEvent({
                name: this._eventPrefix + '/' + eventName,
                properties: data.properties,
                measurements: data.measurements
            });
        }
        flush() {
            if (this._aiClient) {
                return new Promise(resolve => {
                    this._aiClient.flush({
                        callback: () => {
                            // all data flushed
                            this._aiClient = undefined;
                            resolve(undefined);
                        }
                    });
                });
            }
            return Promise.resolve(undefined);
        }
    };
    AppInsightsAppender = __decorate([
        __param(3, log_1.ILogService)
    ], AppInsightsAppender);
    exports.AppInsightsAppender = AppInsightsAppender;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[112/*vs/platform/telemetry/node/commonProperties*/], __M([0/*require*/,1/*exports*/,14/*vs/base/common/platform*/,99/*os*/,35/*vs/base/common/uuid*/,10/*vs/base/node/pfs*/]), function (require, exports, Platform, os, uuid, pfs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.resolveCommonProperties = void 0;
    async function resolveCommonProperties(commit, version, machineId, msftInternalDomains, installSourcePath, product) {
        const result = Object.create(null);
        // __GDPR__COMMON__ "common.machineId" : { "endPoint": "MacAddressHash", "classification": "EndUserPseudonymizedInformation", "purpose": "FeatureInsight" }
        result['common.machineId'] = machineId;
        // __GDPR__COMMON__ "sessionID" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
        result['sessionID'] = uuid.generateUuid() + Date.now();
        // __GDPR__COMMON__ "commitHash" : { "classification": "SystemMetaData", "purpose": "PerformanceAndHealth" }
        result['commitHash'] = commit;
        // __GDPR__COMMON__ "version" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
        result['version'] = version;
        // __GDPR__COMMON__ "common.platformVersion" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
        result['common.platformVersion'] = (os.release() || '').replace(/^(\d+)(\.\d+)?(\.\d+)?(.*)/, '$1$2$3');
        // __GDPR__COMMON__ "common.platform" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
        result['common.platform'] = Platform.PlatformToString(Platform.platform);
        // __GDPR__COMMON__ "common.nodePlatform" : { "classification": "SystemMetaData", "purpose": "PerformanceAndHealth" }
        result['common.nodePlatform'] = process.platform;
        // __GDPR__COMMON__ "common.nodeArch" : { "classification": "SystemMetaData", "purpose": "PerformanceAndHealth" }
        result['common.nodeArch'] = process.arch;
        // __GDPR__COMMON__ "common.product" : { "classification": "SystemMetaData", "purpose": "PerformanceAndHealth" }
        result['common.product'] = product || 'desktop';
        const msftInternal = verifyMicrosoftInternalDomain(msftInternalDomains || []);
        if (msftInternal) {
            // __GDPR__COMMON__ "common.msftInternal" : { "classification": "SystemMetaData", "purpose": "FeatureInsight", "isMeasurement": true }
            result['common.msftInternal'] = msftInternal;
        }
        // dynamic properties which value differs on each call
        let seq = 0;
        const startTime = Date.now();
        Object.defineProperties(result, {
            // __GDPR__COMMON__ "timestamp" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
            'timestamp': {
                get: () => new Date(),
                enumerable: true
            },
            // __GDPR__COMMON__ "common.timesincesessionstart" : { "classification": "SystemMetaData", "purpose": "FeatureInsight", "isMeasurement": true }
            'common.timesincesessionstart': {
                get: () => Date.now() - startTime,
                enumerable: true
            },
            // __GDPR__COMMON__ "common.sequence" : { "classification": "SystemMetaData", "purpose": "FeatureInsight", "isMeasurement": true }
            'common.sequence': {
                get: () => seq++,
                enumerable: true
            }
        });
        if (process.platform === 'linux' && process.env.SNAP && process.env.SNAP_REVISION) {
            // __GDPR__COMMON__ "common.snap" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
            result['common.snap'] = 'true';
        }
        try {
            const contents = await pfs_1.readFile(installSourcePath, 'utf8');
            // __GDPR__COMMON__ "common.source" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
            result['common.source'] = contents.slice(0, 30);
        }
        catch (error) {
            // ignore error
        }
        return result;
    }
    exports.resolveCommonProperties = resolveCommonProperties;
    function verifyMicrosoftInternalDomain(domainList) {
        if (!process || !process.env || !process.env['USERDNSDOMAIN']) {
            return false;
        }
        const domain = process.env['USERDNSDOMAIN'].toLowerCase();
        return domainList.some(msftDomain => domain === msftDomain);
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[113/*vs/platform/telemetry/node/telemetry*/], __M([0/*require*/,1/*exports*/,10/*vs/base/node/pfs*/,23/*fs*/,3/*vs/base/common/path*/]), function (require, exports, pfs_1, fs_1, path_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.buildTelemetryMessage = void 0;
    function buildTelemetryMessage(appRoot, extensionsPath) {
        const mergedTelemetry = Object.create(null);
        // Simple function to merge the telemetry into one json object
        const mergeTelemetry = (contents, dirName) => {
            const telemetryData = JSON.parse(contents);
            mergedTelemetry[dirName] = telemetryData;
        };
        if (extensionsPath) {
            // Gets all the directories inside the extension directory
            const dirs = pfs_1.readdirSync(extensionsPath).filter(files => {
                // This handles case where broken symbolic links can cause statSync to throw and error
                try {
                    return fs_1.statSync(path_1.join(extensionsPath, files)).isDirectory();
                }
                catch (_a) {
                    return false;
                }
            });
            const telemetryJsonFolders = [];
            dirs.forEach((dir) => {
                const files = pfs_1.readdirSync(path_1.join(extensionsPath, dir)).filter(file => file === 'telemetry.json');
                // We know it contains a telemetry.json file so we add it to the list of folders which have one
                if (files.length === 1) {
                    telemetryJsonFolders.push(dir);
                }
            });
            telemetryJsonFolders.forEach((folder) => {
                const contents = fs_1.readFileSync(path_1.join(extensionsPath, folder, 'telemetry.json')).toString();
                mergeTelemetry(contents, folder);
            });
        }
        let contents = fs_1.readFileSync(path_1.join(appRoot, 'telemetry-core.json')).toString();
        mergeTelemetry(contents, 'vscode-core');
        contents = fs_1.readFileSync(path_1.join(appRoot, 'telemetry-extensions.json')).toString();
        mergeTelemetry(contents, 'vscode-extensions');
        return JSON.stringify(mergedTelemetry, null, 4);
    }
    exports.buildTelemetryMessage = buildTelemetryMessage;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[38/*vs/base/node/zip*/], __M([0/*require*/,1/*exports*/,67/*vs/nls!vs/base/node/zip*/,3/*vs/base/common/path*/,23/*fs*/,12/*vs/base/common/async*/,10/*vs/base/node/pfs*/,122/*yauzl*/,123/*yazl*/,8/*vs/base/common/types*/]), function (require, exports, nls, path, fs_1, async_1, pfs_1, yauzl_1, yazl, types_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.buffer = exports.extract = exports.zip = exports.ExtractError = void 0;
    class ExtractError extends Error {
        constructor(type, cause) {
            let message = cause.message;
            switch (type) {
                case 'CorruptZip':
                    message = `Corrupt ZIP: ${message}`;
                    break;
            }
            super(message);
            this.type = type;
            this.cause = cause;
        }
    }
    exports.ExtractError = ExtractError;
    function modeFromEntry(entry) {
        const attr = entry.externalFileAttributes >> 16 || 33188;
        return [448 /* S_IRWXU */, 56 /* S_IRWXG */, 7 /* S_IRWXO */]
            .map(mask => attr & mask)
            .reduce((a, b) => a + b, attr & 61440 /* S_IFMT */);
    }
    function toExtractError(err) {
        if (err instanceof ExtractError) {
            return err;
        }
        let type = undefined;
        if (/end of central directory record signature not found/.test(err.message)) {
            type = 'CorruptZip';
        }
        return new ExtractError(type, err);
    }
    function extractEntry(stream, fileName, mode, targetPath, options, token) {
        const dirName = path.dirname(fileName);
        const targetDirName = path.join(targetPath, dirName);
        if (targetDirName.indexOf(targetPath) !== 0) {
            return Promise.reject(new Error(nls.localize(0, null, fileName)));
        }
        const targetFileName = path.join(targetPath, fileName);
        let istream;
        token.onCancellationRequested(() => {
            if (istream) {
                istream.destroy();
            }
        });
        return Promise.resolve(pfs_1.mkdirp(targetDirName)).then(() => new Promise((c, e) => {
            if (token.isCancellationRequested) {
                return;
            }
            try {
                istream = fs_1.createWriteStream(targetFileName, { mode });
                istream.once('close', () => c());
                istream.once('error', e);
                stream.once('error', e);
                stream.pipe(istream);
            }
            catch (error) {
                e(error);
            }
        }));
    }
    function extractZip(zipfile, targetPath, options, token) {
        let last = async_1.createCancelablePromise(() => Promise.resolve());
        let extractedEntriesCount = 0;
        token.onCancellationRequested(() => {
            last.cancel();
            zipfile.close();
        });
        return new Promise((c, e) => {
            const throttler = new async_1.Sequencer();
            const readNextEntry = (token) => {
                if (token.isCancellationRequested) {
                    return;
                }
                extractedEntriesCount++;
                zipfile.readEntry();
            };
            zipfile.once('error', e);
            zipfile.once('close', () => last.then(() => {
                if (token.isCancellationRequested || zipfile.entryCount === extractedEntriesCount) {
                    c();
                }
                else {
                    e(new ExtractError('Incomplete', new Error(nls.localize(1, null, extractedEntriesCount, zipfile.entryCount))));
                }
            }, e));
            zipfile.readEntry();
            zipfile.on('entry', (entry) => {
                if (token.isCancellationRequested) {
                    return;
                }
                if (!options.sourcePathRegex.test(entry.fileName)) {
                    readNextEntry(token);
                    return;
                }
                const fileName = entry.fileName.replace(options.sourcePathRegex, '');
                // directory file names end with '/'
                if (/\/$/.test(fileName)) {
                    const targetFileName = path.join(targetPath, fileName);
                    last = async_1.createCancelablePromise(token => pfs_1.mkdirp(targetFileName).then(() => readNextEntry(token)).then(undefined, e));
                    return;
                }
                const stream = openZipStream(zipfile, entry);
                const mode = modeFromEntry(entry);
                last = async_1.createCancelablePromise(token => throttler.queue(() => stream.then(stream => extractEntry(stream, fileName, mode, targetPath, options, token).then(() => readNextEntry(token)))).then(null, e));
            });
        });
    }
    function openZip(zipFile, lazy = false) {
        return new Promise((resolve, reject) => {
            yauzl_1.open(zipFile, lazy ? { lazyEntries: true } : undefined, (error, zipfile) => {
                if (error) {
                    reject(toExtractError(error));
                }
                else {
                    resolve(types_1.assertIsDefined(zipfile));
                }
            });
        });
    }
    function openZipStream(zipFile, entry) {
        return new Promise((resolve, reject) => {
            zipFile.openReadStream(entry, (error, stream) => {
                if (error) {
                    reject(toExtractError(error));
                }
                else {
                    resolve(types_1.assertIsDefined(stream));
                }
            });
        });
    }
    function zip(zipPath, files) {
        return new Promise((c, e) => {
            const zip = new yazl.ZipFile();
            files.forEach(f => {
                if (f.contents) {
                    zip.addBuffer(typeof f.contents === 'string' ? Buffer.from(f.contents, 'utf8') : f.contents, f.path);
                }
                else if (f.localPath) {
                    zip.addFile(f.localPath, f.path);
                }
            });
            zip.end();
            const zipStream = fs_1.createWriteStream(zipPath);
            zip.outputStream.pipe(zipStream);
            zip.outputStream.once('error', e);
            zipStream.once('error', e);
            zipStream.once('finish', () => c(zipPath));
        });
    }
    exports.zip = zip;
    function extract(zipPath, targetPath, options = {}, token) {
        const sourcePathRegex = new RegExp(options.sourcePath ? `^${options.sourcePath}` : '');
        let promise = openZip(zipPath, true);
        if (options.overwrite) {
            promise = promise.then(zipfile => pfs_1.rimraf(targetPath).then(() => zipfile));
        }
        return promise.then(zipfile => extractZip(zipfile, targetPath, { sourcePathRegex }, token));
    }
    exports.extract = extract;
    function read(zipPath, filePath) {
        return openZip(zipPath).then(zipfile => {
            return new Promise((c, e) => {
                zipfile.on('entry', (entry) => {
                    if (entry.fileName === filePath) {
                        openZipStream(zipfile, entry).then(stream => c(stream), err => e(err));
                    }
                });
                zipfile.once('close', () => e(new Error(nls.localize(2, null, filePath))));
            });
        });
    }
    function buffer(zipPath, filePath) {
        return read(zipPath, filePath).then(stream => {
            return new Promise((c, e) => {
                const buffers = [];
                stream.once('error', e);
                stream.on('data', (b) => buffers.push(b));
                stream.on('end', () => c(Buffer.concat(buffers)));
            });
        });
    }
    exports.buffer = buffer;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[52/*vs/platform/extensionManagement/node/extensionManagementUtil*/], __M([0/*require*/,1/*exports*/,38/*vs/base/node/zip*/,71/*vs/nls!vs/platform/extensionManagement/node/extensionManagementUtil*/]), function (require, exports, zip_1, nls_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getManifest = void 0;
    function getManifest(vsix) {
        return zip_1.buffer(vsix, 'extension/package.json')
            .then(buffer => {
            try {
                return JSON.parse(buffer.toString('utf8'));
            }
            catch (err) {
                throw new Error(nls_1.localize(0, null));
            }
        });
    }
    exports.getManifest = getManifest;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/









define(__m[114/*vs/platform/extensionManagement/node/extensionsScanner*/], __M([0/*require*/,1/*exports*/,48/*semver-umd*/,2/*vs/base/common/lifecycle*/,10/*vs/base/node/pfs*/,3/*vs/base/common/path*/,7/*vs/platform/log/common/log*/,24/*vs/platform/extensionManagement/common/extensionManagement*/,25/*vs/platform/extensionManagement/common/extensionManagementUtil*/,12/*vs/base/common/async*/,13/*vs/base/common/uri*/,19/*vs/platform/environment/common/environment*/,79/*vs/platform/extensionManagement/common/extensionNls*/,72/*vs/nls!vs/platform/extensionManagement/node/extensionsScanner*/,36/*vs/platform/product/common/productService*/,38/*vs/base/node/zip*/,14/*vs/base/common/platform*/,18/*vs/base/common/arrays*/,9/*vs/base/common/network*/]), function (require, exports, semver, lifecycle_1, pfs, path, log_1, extensionManagement_1, extensionManagementUtil_1, async_1, uri_1, environment_1, extensionNls_1, nls_1, productService_1, zip_1, platform_1, arrays_1, network_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExtensionsScanner = void 0;
    const ERROR_SCANNING_SYS_EXTENSIONS = 'scanningSystem';
    const ERROR_SCANNING_USER_EXTENSIONS = 'scanningUser';
    const INSTALL_ERROR_EXTRACTING = 'extracting';
    const INSTALL_ERROR_DELETING = 'deleting';
    const INSTALL_ERROR_RENAMING = 'renaming';
    let ExtensionsScanner = class ExtensionsScanner extends lifecycle_1.Disposable {
        constructor(beforeRemovingExtension, logService, environmentService, productService) {
            super();
            this.beforeRemovingExtension = beforeRemovingExtension;
            this.logService = logService;
            this.environmentService = environmentService;
            this.productService = productService;
            this._devSystemExtensionsPath = null;
            this.systemExtensionsPath = environmentService.builtinExtensionsPath;
            this.extensionsPath = environmentService.extensionsPath;
            this.uninstalledPath = path.join(this.extensionsPath, '.obsolete');
            this.uninstalledFileLimiter = new async_1.Queue();
        }
        async cleanUp() {
            await this.removeUninstalledExtensions();
            await this.removeOutdatedExtensions();
        }
        async scanExtensions(type) {
            const promises = [];
            if (type === null || type === 0 /* System */) {
                promises.push(this.scanSystemExtensions().then(null, e => Promise.reject(new extensionManagement_1.ExtensionManagementError(this.joinErrors(e).message, ERROR_SCANNING_SYS_EXTENSIONS))));
            }
            if (type === null || type === 1 /* User */) {
                promises.push(this.scanUserExtensions(true).then(null, e => Promise.reject(new extensionManagement_1.ExtensionManagementError(this.joinErrors(e).message, ERROR_SCANNING_USER_EXTENSIONS))));
            }
            try {
                const result = await Promise.all(promises);
                return arrays_1.flatten(result);
            }
            catch (error) {
                throw this.joinErrors(error);
            }
        }
        async scanUserExtensions(excludeOutdated) {
            this.logService.trace('Started scanning user extensions');
            let [uninstalled, extensions] = await Promise.all([this.getUninstalledExtensions(), this.scanAllUserExtensions()]);
            extensions = extensions.filter(e => !uninstalled[new extensionManagementUtil_1.ExtensionIdentifierWithVersion(e.identifier, e.manifest.version).key()]);
            if (excludeOutdated) {
                const byExtension = extensionManagementUtil_1.groupByExtension(extensions, e => e.identifier);
                extensions = byExtension.map(p => p.sort((a, b) => semver.rcompare(a.manifest.version, b.manifest.version))[0]);
            }
            this.logService.trace('Scanned user extensions:', extensions.length);
            return extensions;
        }
        async scanAllUserExtensions() {
            return this.scanExtensionsInDir(this.extensionsPath, 1 /* User */);
        }
        async extractUserExtension(identifierWithVersion, zipPath, token) {
            const { identifier } = identifierWithVersion;
            const folderName = identifierWithVersion.key();
            const tempPath = path.join(this.extensionsPath, `.${folderName}`);
            const extensionPath = path.join(this.extensionsPath, folderName);
            try {
                await pfs.rimraf(extensionPath);
            }
            catch (error) {
                try {
                    await pfs.rimraf(extensionPath);
                }
                catch (e) { /* ignore */ }
                throw new extensionManagement_1.ExtensionManagementError(nls_1.localize(0, null, extensionPath, identifier.id), INSTALL_ERROR_DELETING);
            }
            await this.extractAtLocation(identifier, zipPath, tempPath, token);
            try {
                await this.rename(identifier, tempPath, extensionPath, Date.now() + (2 * 60 * 1000) /* Retry for 2 minutes */);
                this.logService.info('Renamed to', extensionPath);
            }
            catch (error) {
                this.logService.info('Rename failed. Deleting from extracted location', tempPath);
                try {
                    pfs.rimraf(tempPath);
                }
                catch (e) { /* ignore */ }
                throw error;
            }
            let local = null;
            try {
                local = await this.scanExtension(folderName, this.extensionsPath, 1 /* User */);
            }
            catch (e) { /*ignore */ }
            if (local) {
                return local;
            }
            throw new Error(nls_1.localize(1, null, this.extensionsPath));
        }
        async saveMetadataForLocalExtension(local, metadata) {
            this.setMetadata(local, metadata);
            // unset if false
            metadata.isMachineScoped = metadata.isMachineScoped || undefined;
            const manifestPath = path.join(local.location.fsPath, 'package.json');
            const raw = await pfs.readFile(manifestPath, 'utf8');
            const { manifest } = await this.parseManifest(raw);
            manifest.__metadata = metadata;
            await pfs.writeFile(manifestPath, JSON.stringify(manifest, null, '\t'));
            return local;
        }
        getUninstalledExtensions() {
            return this.withUninstalledExtensions(uninstalled => uninstalled);
        }
        async withUninstalledExtensions(fn) {
            return this.uninstalledFileLimiter.queue(async () => {
                let raw;
                try {
                    raw = await pfs.readFile(this.uninstalledPath, 'utf8');
                }
                catch (err) {
                    if (err.code !== 'ENOENT') {
                        throw err;
                    }
                }
                let uninstalled = {};
                if (raw) {
                    try {
                        uninstalled = JSON.parse(raw);
                    }
                    catch (e) { /* ignore */ }
                }
                const result = fn(uninstalled);
                if (Object.keys(uninstalled).length) {
                    await pfs.writeFile(this.uninstalledPath, JSON.stringify(uninstalled));
                }
                else {
                    await pfs.rimraf(this.uninstalledPath);
                }
                return result;
            });
        }
        async removeExtension(extension, type) {
            this.logService.trace(`Deleting ${type} extension from disk`, extension.identifier.id, extension.location.fsPath);
            await pfs.rimraf(extension.location.fsPath);
            this.logService.info('Deleted from disk', extension.identifier.id, extension.location.fsPath);
        }
        async removeUninstalledExtension(extension) {
            await this.removeExtension(extension, 'uninstalled');
            await this.withUninstalledExtensions(uninstalled => delete uninstalled[new extensionManagementUtil_1.ExtensionIdentifierWithVersion(extension.identifier, extension.manifest.version).key()]);
        }
        async extractAtLocation(identifier, zipPath, location, token) {
            this.logService.trace(`Started extracting the extension from ${zipPath} to ${location}`);
            // Clean the location
            try {
                await pfs.rimraf(location);
            }
            catch (e) {
                throw new extensionManagement_1.ExtensionManagementError(this.joinErrors(e).message, INSTALL_ERROR_DELETING);
            }
            try {
                await zip_1.extract(zipPath, location, { sourcePath: 'extension', overwrite: true }, token);
                this.logService.info(`Extracted extension to ${location}:`, identifier.id);
            }
            catch (e) {
                try {
                    await pfs.rimraf(location);
                }
                catch (e) { /* Ignore */ }
                throw new extensionManagement_1.ExtensionManagementError(e.message, e instanceof zip_1.ExtractError && e.type ? e.type : INSTALL_ERROR_EXTRACTING);
            }
        }
        async rename(identifier, extractPath, renamePath, retryUntil) {
            try {
                await pfs.rename(extractPath, renamePath);
            }
            catch (error) {
                if (platform_1.isWindows && error && error.code === 'EPERM' && Date.now() < retryUntil) {
                    this.logService.info(`Failed renaming ${extractPath} to ${renamePath} with 'EPERM' error. Trying again...`, identifier.id);
                    return this.rename(identifier, extractPath, renamePath, retryUntil);
                }
                throw new extensionManagement_1.ExtensionManagementError(error.message || nls_1.localize(2, null, extractPath, renamePath), error.code || INSTALL_ERROR_RENAMING);
            }
        }
        async scanSystemExtensions() {
            this.logService.trace('Started scanning system extensions');
            const systemExtensionsPromise = this.scanDefaultSystemExtensions();
            if (this.environmentService.isBuilt) {
                return systemExtensionsPromise;
            }
            // Scan other system extensions during development
            const devSystemExtensionsPromise = this.scanDevSystemExtensions();
            const [systemExtensions, devSystemExtensions] = await Promise.all([systemExtensionsPromise, devSystemExtensionsPromise]);
            return [...systemExtensions, ...devSystemExtensions];
        }
        async scanExtensionsInDir(dir, type) {
            const limiter = new async_1.Limiter(10);
            const extensionsFolders = await pfs.readdir(dir);
            const extensions = await Promise.all(extensionsFolders.map(extensionFolder => limiter.queue(() => this.scanExtension(extensionFolder, dir, type))));
            return extensions.filter(e => e && e.identifier);
        }
        async scanExtension(folderName, root, type) {
            if (type === 1 /* User */ && folderName.indexOf('.') === 0) { // Do not consider user extension folder starting with `.`
                return null;
            }
            const extensionPath = path.join(root, folderName);
            try {
                const children = await pfs.readdir(extensionPath);
                const { manifest, metadata } = await this.readManifest(extensionPath);
                const readme = children.filter(child => /^readme(\.txt|\.md|)$/i.test(child))[0];
                const readmeUrl = readme ? uri_1.URI.file(path.join(extensionPath, readme)) : undefined;
                const changelog = children.filter(child => /^changelog(\.txt|\.md|)$/i.test(child))[0];
                const changelogUrl = changelog ? uri_1.URI.file(path.join(extensionPath, changelog)) : undefined;
                const identifier = { id: extensionManagementUtil_1.getGalleryExtensionId(manifest.publisher, manifest.name) };
                const local = { type, identifier, manifest, location: uri_1.URI.file(extensionPath), readmeUrl, changelogUrl, publisherDisplayName: null, publisherId: null, isMachineScoped: false };
                if (metadata) {
                    this.setMetadata(local, metadata);
                }
                return local;
            }
            catch (e) {
                this.logService.trace(e);
                return null;
            }
        }
        async scanDefaultSystemExtensions() {
            const result = await this.scanExtensionsInDir(this.systemExtensionsPath, 0 /* System */);
            this.logService.trace('Scanned system extensions:', result.length);
            return result;
        }
        async scanDevSystemExtensions() {
            const devSystemExtensionsList = this.getDevSystemExtensionsList();
            if (devSystemExtensionsList.length) {
                const result = await this.scanExtensionsInDir(this.devSystemExtensionsPath, 0 /* System */);
                this.logService.trace('Scanned dev system extensions:', result.length);
                return result.filter(r => devSystemExtensionsList.some(id => extensionManagementUtil_1.areSameExtensions(r.identifier, { id })));
            }
            else {
                return [];
            }
        }
        setMetadata(local, metadata) {
            local.publisherDisplayName = metadata.publisherDisplayName || null;
            local.publisherId = metadata.publisherId || null;
            local.identifier.uuid = metadata.id;
            local.isMachineScoped = !!metadata.isMachineScoped;
        }
        async removeUninstalledExtensions() {
            const uninstalled = await this.getUninstalledExtensions();
            const extensions = await this.scanAllUserExtensions(); // All user extensions
            const installed = new Set();
            for (const e of extensions) {
                if (!uninstalled[new extensionManagementUtil_1.ExtensionIdentifierWithVersion(e.identifier, e.manifest.version).key()]) {
                    installed.add(e.identifier.id.toLowerCase());
                }
            }
            const byExtension = extensionManagementUtil_1.groupByExtension(extensions, e => e.identifier);
            await Promise.all(byExtension.map(async (e) => {
                const latest = e.sort((a, b) => semver.rcompare(a.manifest.version, b.manifest.version))[0];
                if (!installed.has(latest.identifier.id.toLowerCase())) {
                    await this.beforeRemovingExtension(latest);
                }
            }));
            const toRemove = extensions.filter(e => uninstalled[new extensionManagementUtil_1.ExtensionIdentifierWithVersion(e.identifier, e.manifest.version).key()]);
            await Promise.all(toRemove.map(e => this.removeUninstalledExtension(e)));
        }
        async removeOutdatedExtensions() {
            const extensions = await this.scanAllUserExtensions();
            const toRemove = [];
            // Outdated extensions
            const byExtension = extensionManagementUtil_1.groupByExtension(extensions, e => e.identifier);
            toRemove.push(...arrays_1.flatten(byExtension.map(p => p.sort((a, b) => semver.rcompare(a.manifest.version, b.manifest.version)).slice(1))));
            await Promise.all(toRemove.map(extension => this.removeExtension(extension, 'outdated')));
        }
        getDevSystemExtensionsList() {
            return (this.productService.builtInExtensions || []).map(e => e.name);
        }
        joinErrors(errorOrErrors) {
            const errors = Array.isArray(errorOrErrors) ? errorOrErrors : [errorOrErrors];
            if (errors.length === 1) {
                return errors[0] instanceof Error ? errors[0] : new Error(errors[0]);
            }
            return errors.reduce((previousValue, currentValue) => {
                return new Error(`${previousValue.message}${previousValue.message ? ',' : ''}${currentValue instanceof Error ? currentValue.message : currentValue}`);
            }, new Error(''));
        }
        get devSystemExtensionsPath() {
            if (!this._devSystemExtensionsPath) {
                this._devSystemExtensionsPath = path.normalize(path.join(network_1.FileAccess.asFileUri('', require).fsPath, '..', '.build', 'builtInExtensions'));
            }
            return this._devSystemExtensionsPath;
        }
        async readManifest(extensionPath) {
            const promises = [
                pfs.readFile(path.join(extensionPath, 'package.json'), 'utf8')
                    .then(raw => this.parseManifest(raw)),
                pfs.readFile(path.join(extensionPath, 'package.nls.json'), 'utf8')
                    .then(undefined, err => err.code !== 'ENOENT' ? Promise.reject(err) : '{}')
                    .then(raw => JSON.parse(raw))
            ];
            const [{ manifest, metadata }, translations] = await Promise.all(promises);
            return {
                manifest: extensionNls_1.localizeManifest(manifest, translations),
                metadata
            };
        }
        parseManifest(raw) {
            return new Promise((c, e) => {
                try {
                    const manifest = JSON.parse(raw);
                    const metadata = manifest.__metadata || null;
                    delete manifest.__metadata;
                    c({ manifest, metadata });
                }
                catch (err) {
                    e(new Error(nls_1.localize(3, null)));
                }
            });
        }
    };
    ExtensionsScanner = __decorate([
        __param(1, log_1.ILogService),
        __param(2, environment_1.INativeEnvironmentService),
        __param(3, productService_1.IProductService)
    ], ExtensionsScanner);
    exports.ExtensionsScanner = ExtensionsScanner;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/









define(__m[115/*vs/platform/extensionManagement/node/extensionManagementService*/], __M([0/*require*/,1/*exports*/,70/*vs/nls!vs/platform/extensionManagement/node/extensionManagementService*/,3/*vs/base/common/path*/,10/*vs/base/node/pfs*/,2/*vs/base/common/lifecycle*/,18/*vs/base/common/arrays*/,38/*vs/base/node/zip*/,24/*vs/platform/extensionManagement/common/extensionManagement*/,25/*vs/platform/extensionManagement/common/extensionManagementUtil*/,19/*vs/platform/environment/common/environment*/,12/*vs/base/common/async*/,11/*vs/base/common/event*/,48/*semver-umd*/,13/*vs/base/common/uri*/,49/*vs/platform/product/common/product*/,14/*vs/base/common/platform*/,7/*vs/platform/log/common/log*/,86/*vs/platform/extensionManagement/node/extensionsManifestCache*/,32/*vs/base/common/errorMessage*/,37/*vs/platform/telemetry/common/telemetry*/,43/*vs/platform/extensions/common/extensionValidator*/,21/*vs/base/common/resources*/,35/*vs/base/common/uuid*/,85/*vs/platform/download/common/download*/,4/*vs/platform/instantiation/common/instantiation*/,9/*vs/base/common/network*/,28/*vs/base/common/cancellation*/,52/*vs/platform/extensionManagement/node/extensionManagementUtil*/,90/*vs/platform/extensionManagement/node/extensionDownloader*/,114/*vs/platform/extensionManagement/node/extensionsScanner*/,91/*vs/platform/extensionManagement/node/extensionLifecycle*/]), function (require, exports, nls, path, pfs, lifecycle_1, arrays_1, zip_1, extensionManagement_1, extensionManagementUtil_1, environment_1, async_1, event_1, semver, uri_1, product_1, platform_1, log_1, extensionsManifestCache_1, errorMessage_1, telemetry_1, extensionValidator_1, resources_1, uuid_1, download_1, instantiation_1, network_1, cancellation_1, extensionManagementUtil_2, extensionDownloader_1, extensionsScanner_1, extensionLifecycle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExtensionManagementService = void 0;
    const INSTALL_ERROR_UNSET_UNINSTALLED = 'unsetUninstalled';
    const INSTALL_ERROR_DOWNLOADING = 'downloading';
    const INSTALL_ERROR_VALIDATING = 'validating';
    const INSTALL_ERROR_LOCAL = 'local';
    const ERROR_UNKNOWN = 'unknown';
    let ExtensionManagementService = class ExtensionManagementService extends lifecycle_1.Disposable {
        constructor(environmentService, galleryService, logService, downloadService, telemetryService, instantiationService) {
            super();
            this.environmentService = environmentService;
            this.galleryService = galleryService;
            this.logService = logService;
            this.downloadService = downloadService;
            this.telemetryService = telemetryService;
            this.lastReportTimestamp = 0;
            this.installingExtensions = new Map();
            this.uninstallingExtensions = new Map();
            this._onInstallExtension = this._register(new event_1.Emitter());
            this.onInstallExtension = this._onInstallExtension.event;
            this._onDidInstallExtension = this._register(new event_1.Emitter());
            this.onDidInstallExtension = this._onDidInstallExtension.event;
            this._onUninstallExtension = this._register(new event_1.Emitter());
            this.onUninstallExtension = this._onUninstallExtension.event;
            this._onDidUninstallExtension = this._register(new event_1.Emitter());
            this.onDidUninstallExtension = this._onDidUninstallExtension.event;
            const extensionLifecycle = this._register(instantiationService.createInstance(extensionLifecycle_1.ExtensionsLifecycle));
            this.extensionsScanner = this._register(instantiationService.createInstance(extensionsScanner_1.ExtensionsScanner, extension => extensionLifecycle.postUninstall(extension)));
            this.manifestCache = this._register(new extensionsManifestCache_1.ExtensionsManifestCache(environmentService, this));
            this.extensionsDownloader = this._register(instantiationService.createInstance(extensionDownloader_1.ExtensionsDownloader));
            this._register(lifecycle_1.toDisposable(() => {
                this.installingExtensions.forEach(promise => promise.cancel());
                this.uninstallingExtensions.forEach(promise => promise.cancel());
                this.installingExtensions.clear();
                this.uninstallingExtensions.clear();
            }));
        }
        async zip(extension) {
            this.logService.trace('ExtensionManagementService#zip', extension.identifier.id);
            const files = await this.collectFiles(extension);
            const location = await zip_1.zip(resources_1.joinPath(this.environmentService.tmpDir, uuid_1.generateUuid()).fsPath, files);
            return uri_1.URI.file(location);
        }
        async unzip(zipLocation) {
            this.logService.trace('ExtensionManagementService#unzip', zipLocation.toString());
            const local = await this.install(zipLocation);
            return local.identifier;
        }
        async getManifest(vsix) {
            const downloadLocation = await this.downloadVsix(vsix);
            const zipPath = path.resolve(downloadLocation.fsPath);
            return extensionManagementUtil_2.getManifest(zipPath);
        }
        async collectFiles(extension) {
            const collectFilesFromDirectory = async (dir) => {
                let entries = await pfs.readdir(dir);
                entries = entries.map(e => path.join(dir, e));
                const stats = await Promise.all(entries.map(e => pfs.stat(e)));
                let promise = Promise.resolve([]);
                stats.forEach((stat, index) => {
                    const entry = entries[index];
                    if (stat.isFile()) {
                        promise = promise.then(result => ([...result, entry]));
                    }
                    if (stat.isDirectory()) {
                        promise = promise
                            .then(result => collectFilesFromDirectory(entry)
                            .then(files => ([...result, ...files])));
                    }
                });
                return promise;
            };
            const files = await collectFilesFromDirectory(extension.location.fsPath);
            return files.map(f => ({ path: `extension/${path.relative(extension.location.fsPath, f)}`, localPath: f }));
        }
        async install(vsix, isMachineScoped) {
            this.logService.trace('ExtensionManagementService#install', vsix.toString());
            return async_1.createCancelablePromise(async (token) => {
                const downloadLocation = await this.downloadVsix(vsix);
                const zipPath = path.resolve(downloadLocation.fsPath);
                const manifest = await extensionManagementUtil_2.getManifest(zipPath);
                const identifier = { id: extensionManagementUtil_1.getGalleryExtensionId(manifest.publisher, manifest.name) };
                let operation = 1 /* Install */;
                if (manifest.engines && manifest.engines.vscode && !extensionValidator_1.isEngineValid(manifest.engines.vscode, product_1.default.version)) {
                    throw new Error(nls.localize(0, null, identifier.id, product_1.default.version));
                }
                const identifierWithVersion = new extensionManagementUtil_1.ExtensionIdentifierWithVersion(identifier, manifest.version);
                const installedExtensions = await this.getInstalled(1 /* User */);
                const existing = installedExtensions.find(i => extensionManagementUtil_1.areSameExtensions(identifier, i.identifier));
                if (existing) {
                    isMachineScoped = isMachineScoped || existing.isMachineScoped;
                    operation = 2 /* Update */;
                    if (identifierWithVersion.equals(new extensionManagementUtil_1.ExtensionIdentifierWithVersion(existing.identifier, existing.manifest.version))) {
                        try {
                            await this.extensionsScanner.removeExtension(existing, 'existing');
                        }
                        catch (e) {
                            throw new Error(nls.localize(1, null, manifest.displayName || manifest.name));
                        }
                    }
                    else if (semver.gt(existing.manifest.version, manifest.version)) {
                        await this.uninstallExtension(existing);
                    }
                }
                else {
                    // Remove the extension with same version if it is already uninstalled.
                    // Installing a VSIX extension shall replace the existing extension always.
                    const existing = await this.unsetUninstalledAndGetLocal(identifierWithVersion);
                    if (existing) {
                        try {
                            await this.extensionsScanner.removeExtension(existing, 'existing');
                        }
                        catch (e) {
                            throw new Error(nls.localize(2, null, manifest.displayName || manifest.name));
                        }
                    }
                }
                this.logService.info('Installing the extension:', identifier.id);
                this._onInstallExtension.fire({ identifier, zipPath });
                let metadata;
                try {
                    metadata = await this.getGalleryMetadata(extensionManagementUtil_1.getGalleryExtensionId(manifest.publisher, manifest.name));
                }
                catch (e) { /* Ignore */ }
                try {
                    const local = await this.installFromZipPath(identifierWithVersion, zipPath, isMachineScoped ? Object.assign(Object.assign({}, (metadata || {})), { isMachineScoped }) : metadata, operation, token);
                    this.logService.info('Successfully installed the extension:', identifier.id);
                    return local;
                }
                catch (e) {
                    this.logService.error('Failed to install the extension:', identifier.id, e.message);
                    throw e;
                }
            });
        }
        async downloadVsix(vsix) {
            if (vsix.scheme === network_1.Schemas.file) {
                return vsix;
            }
            if (!this.downloadService) {
                throw new Error('Download service is not available');
            }
            const downloadedLocation = resources_1.joinPath(this.environmentService.tmpDir, uuid_1.generateUuid());
            await this.downloadService.download(vsix, downloadedLocation);
            return downloadedLocation;
        }
        async installFromZipPath(identifierWithVersion, zipPath, metadata, operation, token) {
            try {
                const local = await this.installExtension({ zipPath, identifierWithVersion, metadata }, token);
                try {
                    await this.installDependenciesAndPackExtensions(local, undefined);
                }
                catch (error) {
                    if (arrays_1.isNonEmptyArray(local.manifest.extensionDependencies)) {
                        this.logService.warn(`Cannot install dependencies of extension:`, local.identifier.id, error.message);
                    }
                    if (arrays_1.isNonEmptyArray(local.manifest.extensionPack)) {
                        this.logService.warn(`Cannot install packed extensions of extension:`, local.identifier.id, error.message);
                    }
                }
                this._onDidInstallExtension.fire({ identifier: identifierWithVersion.identifier, zipPath, local, operation });
                return local;
            }
            catch (error) {
                this._onDidInstallExtension.fire({ identifier: identifierWithVersion.identifier, zipPath, operation, error });
                throw error;
            }
        }
        async canInstall(extension) {
            return true;
        }
        async installFromGallery(extension, isMachineScoped) {
            if (!this.galleryService.isEnabled()) {
                throw new Error(nls.localize(3, null));
            }
            try {
                extension = await this.checkAndGetCompatibleVersion(extension);
            }
            catch (error) {
                const errorCode = error && error.code ? error.code : ERROR_UNKNOWN;
                this.logService.error(`Failed to install extension:`, extension.identifier.id, error ? error.message : errorCode);
                this.reportTelemetry(this.getTelemetryEvent(1 /* Install */), extensionManagementUtil_1.getGalleryExtensionTelemetryData(extension), undefined, error);
                if (error instanceof Error) {
                    error.name = errorCode;
                }
                throw error;
            }
            const key = new extensionManagementUtil_1.ExtensionIdentifierWithVersion(extension.identifier, extension.version).key();
            let cancellablePromise = this.installingExtensions.get(key);
            if (!cancellablePromise) {
                cancellablePromise = async_1.createCancelablePromise(token => this.doInstallFromGallery(extension, !!isMachineScoped, token));
                this.installingExtensions.set(key, cancellablePromise);
                cancellablePromise.finally(() => this.installingExtensions.delete(key));
            }
            return cancellablePromise;
        }
        async doInstallFromGallery(extension, isMachineScoped, token) {
            const startTime = new Date().getTime();
            let operation = 1 /* Install */;
            this.logService.info('Installing extension:', extension.identifier.id);
            this._onInstallExtension.fire({ identifier: extension.identifier, gallery: extension });
            try {
                const installed = await this.getInstalled(1 /* User */);
                const existingExtension = installed.find(i => extensionManagementUtil_1.areSameExtensions(i.identifier, extension.identifier));
                if (existingExtension) {
                    operation = 2 /* Update */;
                }
                const installableExtension = await this.downloadInstallableExtension(extension, operation);
                installableExtension.metadata.isMachineScoped = isMachineScoped || (existingExtension === null || existingExtension === void 0 ? void 0 : existingExtension.isMachineScoped);
                const local = await this.installExtension(installableExtension, token);
                try {
                    await this.extensionsDownloader.delete(uri_1.URI.file(installableExtension.zipPath));
                }
                catch (error) { /* Ignore */ }
                try {
                    await this.installDependenciesAndPackExtensions(local, existingExtension);
                }
                catch (error) {
                    try {
                        await this.uninstall(local);
                    }
                    catch (error) { /* Ignore */ }
                    throw error;
                }
                if (existingExtension && semver.neq(existingExtension.manifest.version, extension.version)) {
                    await this.setUninstalled(existingExtension);
                }
                this.logService.info(`Extensions installed successfully:`, extension.identifier.id);
                this._onDidInstallExtension.fire({ identifier: extension.identifier, gallery: extension, local, operation });
                this.reportTelemetry(this.getTelemetryEvent(operation), extensionManagementUtil_1.getGalleryExtensionTelemetryData(extension), new Date().getTime() - startTime, undefined);
                return local;
            }
            catch (error) {
                const errorCode = error && error.code ? error.code : ERROR_UNKNOWN;
                this.logService.error(`Failed to install extension:`, extension.identifier.id, error ? error.message : errorCode);
                this._onDidInstallExtension.fire({ identifier: extension.identifier, gallery: extension, operation, error: errorCode });
                this.reportTelemetry(this.getTelemetryEvent(operation), extensionManagementUtil_1.getGalleryExtensionTelemetryData(extension), new Date().getTime() - startTime, error);
                if (error instanceof Error) {
                    error.name = errorCode;
                }
                throw error;
            }
        }
        async checkAndGetCompatibleVersion(extension) {
            if (await this.isMalicious(extension)) {
                throw new extensionManagement_1.ExtensionManagementError(nls.localize(4, null), extensionManagement_1.INSTALL_ERROR_MALICIOUS);
            }
            const compatibleExtension = await this.galleryService.getCompatibleExtension(extension);
            if (!compatibleExtension) {
                throw new extensionManagement_1.ExtensionManagementError(nls.localize(5, null, extension.identifier.id, product_1.default.version), extensionManagement_1.INSTALL_ERROR_INCOMPATIBLE);
            }
            return compatibleExtension;
        }
        async reinstallFromGallery(extension) {
            this.logService.trace('ExtensionManagementService#reinstallFromGallery', extension.identifier.id);
            if (!this.galleryService.isEnabled()) {
                throw new Error(nls.localize(6, null));
            }
            const galleryExtension = await this.findGalleryExtension(extension);
            if (!galleryExtension) {
                throw new Error(nls.localize(7, null));
            }
            await this.setUninstalled(extension);
            try {
                await this.extensionsScanner.removeUninstalledExtension(extension);
            }
            catch (e) {
                throw new Error(nls.localize(8, null, errorMessage_1.toErrorMessage(e)));
            }
            await this.installFromGallery(galleryExtension);
        }
        getTelemetryEvent(operation) {
            return operation === 2 /* Update */ ? 'extensionGallery:update' : 'extensionGallery:install';
        }
        async isMalicious(extension) {
            const report = await this.getExtensionsReport();
            return extensionManagementUtil_1.getMaliciousExtensionsSet(report).has(extension.identifier.id);
        }
        async downloadInstallableExtension(extension, operation) {
            const metadata = {
                id: extension.identifier.uuid,
                publisherId: extension.publisherId,
                publisherDisplayName: extension.publisherDisplayName,
            };
            let zipPath;
            try {
                this.logService.trace('Started downloading extension:', extension.identifier.id);
                const zip = await this.extensionsDownloader.downloadExtension(extension, operation);
                this.logService.info('Downloaded extension:', extension.identifier.id, zipPath);
                zipPath = zip.fsPath;
            }
            catch (error) {
                throw new extensionManagement_1.ExtensionManagementError(this.joinErrors(error).message, INSTALL_ERROR_DOWNLOADING);
            }
            try {
                const manifest = await extensionManagementUtil_2.getManifest(zipPath);
                return { zipPath, identifierWithVersion: new extensionManagementUtil_1.ExtensionIdentifierWithVersion(extension.identifier, manifest.version), metadata };
            }
            catch (error) {
                throw new extensionManagement_1.ExtensionManagementError(this.joinErrors(error).message, INSTALL_ERROR_VALIDATING);
            }
        }
        async installExtension(installableExtension, token) {
            try {
                const local = await this.unsetUninstalledAndGetLocal(installableExtension.identifierWithVersion);
                if (local) {
                    return local;
                }
            }
            catch (e) {
                if (platform_1.isMacintosh) {
                    throw new extensionManagement_1.ExtensionManagementError(nls.localize(9, null), INSTALL_ERROR_UNSET_UNINSTALLED);
                }
                else {
                    throw new extensionManagement_1.ExtensionManagementError(nls.localize(10, null), INSTALL_ERROR_UNSET_UNINSTALLED);
                }
            }
            return this.extractAndInstall(installableExtension, token);
        }
        async unsetUninstalledAndGetLocal(identifierWithVersion) {
            const isUninstalled = await this.isUninstalled(identifierWithVersion);
            if (!isUninstalled) {
                return null;
            }
            this.logService.trace('Removing the extension from uninstalled list:', identifierWithVersion.identifier.id);
            // If the same version of extension is marked as uninstalled, remove it from there and return the local.
            await this.unsetUninstalled(identifierWithVersion);
            this.logService.info('Removed the extension from uninstalled list:', identifierWithVersion.identifier.id);
            const installed = await this.getInstalled(1 /* User */);
            return installed.find(i => new extensionManagementUtil_1.ExtensionIdentifierWithVersion(i.identifier, i.manifest.version).equals(identifierWithVersion)) || null;
        }
        async extractAndInstall({ zipPath, identifierWithVersion, metadata }, token) {
            const { identifier } = identifierWithVersion;
            let local = await this.extensionsScanner.extractUserExtension(identifierWithVersion, zipPath, token);
            this.logService.info('Installation completed.', identifier.id);
            if (metadata) {
                local = await this.extensionsScanner.saveMetadataForLocalExtension(local, metadata);
            }
            return local;
        }
        async installDependenciesAndPackExtensions(installed, existing) {
            if (!this.galleryService.isEnabled()) {
                return;
            }
            const dependenciesAndPackExtensions = installed.manifest.extensionDependencies || [];
            if (installed.manifest.extensionPack) {
                for (const extension of installed.manifest.extensionPack) {
                    // add only those extensions which are new in currently installed extension
                    if (!(existing && existing.manifest.extensionPack && existing.manifest.extensionPack.some(old => extensionManagementUtil_1.areSameExtensions({ id: old }, { id: extension })))) {
                        if (dependenciesAndPackExtensions.every(e => !extensionManagementUtil_1.areSameExtensions({ id: e }, { id: extension }))) {
                            dependenciesAndPackExtensions.push(extension);
                        }
                    }
                }
            }
            if (dependenciesAndPackExtensions.length) {
                const installed = await this.getInstalled();
                // filter out installed extensions
                const names = dependenciesAndPackExtensions.filter(id => installed.every(({ identifier: galleryIdentifier }) => !extensionManagementUtil_1.areSameExtensions(galleryIdentifier, { id })));
                if (names.length) {
                    const galleryResult = await this.galleryService.query({ names, pageSize: dependenciesAndPackExtensions.length }, cancellation_1.CancellationToken.None);
                    const extensionsToInstall = galleryResult.firstPage;
                    try {
                        await Promise.all(extensionsToInstall.map(e => this.installFromGallery(e)));
                    }
                    catch (error) {
                        try {
                            await this.rollback(extensionsToInstall);
                        }
                        catch (e) { /* ignore */ }
                        throw error;
                    }
                }
            }
        }
        async rollback(extensions) {
            const installed = await this.getInstalled(1 /* User */);
            const extensionsToUninstall = installed.filter(local => extensions.some(galleryExtension => new extensionManagementUtil_1.ExtensionIdentifierWithVersion(local.identifier, local.manifest.version).equals(new extensionManagementUtil_1.ExtensionIdentifierWithVersion(galleryExtension.identifier, galleryExtension.version)))); // Check with version because we want to rollback the exact version
            await Promise.all(extensionsToUninstall.map(local => this.uninstall(local)));
        }
        async uninstall(extension) {
            this.logService.trace('ExtensionManagementService#uninstall', extension.identifier.id);
            const installed = await this.getInstalled(1 /* User */);
            const extensionToUninstall = installed.find(e => extensionManagementUtil_1.areSameExtensions(e.identifier, extension.identifier));
            if (!extensionToUninstall) {
                throw new Error(nls.localize(11, null, extension.manifest.displayName || extension.manifest.name));
            }
            try {
                await this.checkForDependenciesAndUninstall(extensionToUninstall, installed);
            }
            catch (error) {
                throw this.joinErrors(error);
            }
        }
        async updateMetadata(local, metadata) {
            this.logService.trace('ExtensionManagementService#updateMetadata', local.identifier.id);
            local = await this.extensionsScanner.saveMetadataForLocalExtension(local, Object.assign(Object.assign({}, metadata), { isMachineScoped: local.isMachineScoped }));
            this.manifestCache.invalidate();
            return local;
        }
        async getGalleryMetadata(extensionName) {
            const galleryExtension = await this.findGalleryExtensionByName(extensionName);
            return galleryExtension ? { id: galleryExtension.identifier.uuid, publisherDisplayName: galleryExtension.publisherDisplayName, publisherId: galleryExtension.publisherId } : undefined;
        }
        async findGalleryExtension(local) {
            if (local.identifier.uuid) {
                const galleryExtension = await this.findGalleryExtensionById(local.identifier.uuid);
                return galleryExtension ? galleryExtension : this.findGalleryExtensionByName(local.identifier.id);
            }
            return this.findGalleryExtensionByName(local.identifier.id);
        }
        async findGalleryExtensionById(uuid) {
            const galleryResult = await this.galleryService.query({ ids: [uuid], pageSize: 1 }, cancellation_1.CancellationToken.None);
            return galleryResult.firstPage[0];
        }
        async findGalleryExtensionByName(name) {
            const galleryResult = await this.galleryService.query({ names: [name], pageSize: 1 }, cancellation_1.CancellationToken.None);
            return galleryResult.firstPage[0];
        }
        joinErrors(errorOrErrors) {
            const errors = Array.isArray(errorOrErrors) ? errorOrErrors : [errorOrErrors];
            if (errors.length === 1) {
                return errors[0] instanceof Error ? errors[0] : new Error(errors[0]);
            }
            return errors.reduce((previousValue, currentValue) => {
                return new Error(`${previousValue.message}${previousValue.message ? ',' : ''}${currentValue instanceof Error ? currentValue.message : currentValue}`);
            }, new Error(''));
        }
        async checkForDependenciesAndUninstall(extension, installed) {
            try {
                await this.preUninstallExtension(extension);
                const packedExtensions = this.getAllPackExtensionsToUninstall(extension, installed);
                if (packedExtensions.length) {
                    await this.uninstallExtensions(extension, packedExtensions, installed);
                }
                else {
                    await this.uninstallExtensions(extension, [], installed);
                }
            }
            catch (error) {
                await this.postUninstallExtension(extension, new extensionManagement_1.ExtensionManagementError(error instanceof Error ? error.message : error, INSTALL_ERROR_LOCAL));
                throw error;
            }
            await this.postUninstallExtension(extension);
        }
        async uninstallExtensions(extension, otherExtensionsToUninstall, installed) {
            const extensionsToUninstall = [extension, ...otherExtensionsToUninstall];
            for (const e of extensionsToUninstall) {
                this.checkForDependents(e, extensionsToUninstall, installed, extension);
            }
            await Promise.all([this.uninstallExtension(extension), ...otherExtensionsToUninstall.map(d => this.doUninstall(d))]);
        }
        checkForDependents(extension, extensionsToUninstall, installed, extensionToUninstall) {
            const dependents = this.getDependents(extension, installed);
            if (dependents.length) {
                const remainingDependents = dependents.filter(dependent => extensionsToUninstall.indexOf(dependent) === -1);
                if (remainingDependents.length) {
                    throw new Error(this.getDependentsErrorMessage(extension, remainingDependents, extensionToUninstall));
                }
            }
        }
        getDependentsErrorMessage(dependingExtension, dependents, extensionToUninstall) {
            if (extensionToUninstall === dependingExtension) {
                if (dependents.length === 1) {
                    return nls.localize(12, null, extensionToUninstall.manifest.displayName || extensionToUninstall.manifest.name, dependents[0].manifest.displayName || dependents[0].manifest.name);
                }
                if (dependents.length === 2) {
                    return nls.localize(13, null, extensionToUninstall.manifest.displayName || extensionToUninstall.manifest.name, dependents[0].manifest.displayName || dependents[0].manifest.name, dependents[1].manifest.displayName || dependents[1].manifest.name);
                }
                return nls.localize(14, null, extensionToUninstall.manifest.displayName || extensionToUninstall.manifest.name, dependents[0].manifest.displayName || dependents[0].manifest.name, dependents[1].manifest.displayName || dependents[1].manifest.name);
            }
            if (dependents.length === 1) {
                return nls.localize(15, null, extensionToUninstall.manifest.displayName || extensionToUninstall.manifest.name, dependingExtension.manifest.displayName
                    || dependingExtension.manifest.name, dependents[0].manifest.displayName || dependents[0].manifest.name);
            }
            if (dependents.length === 2) {
                return nls.localize(16, null, extensionToUninstall.manifest.displayName || extensionToUninstall.manifest.name, dependingExtension.manifest.displayName
                    || dependingExtension.manifest.name, dependents[0].manifest.displayName || dependents[0].manifest.name, dependents[1].manifest.displayName || dependents[1].manifest.name);
            }
            return nls.localize(17, null, extensionToUninstall.manifest.displayName || extensionToUninstall.manifest.name, dependingExtension.manifest.displayName
                || dependingExtension.manifest.name, dependents[0].manifest.displayName || dependents[0].manifest.name, dependents[1].manifest.displayName || dependents[1].manifest.name);
        }
        getAllPackExtensionsToUninstall(extension, installed, checked = []) {
            if (checked.indexOf(extension) !== -1) {
                return [];
            }
            checked.push(extension);
            const extensionsPack = extension.manifest.extensionPack ? extension.manifest.extensionPack : [];
            if (extensionsPack.length) {
                const packedExtensions = installed.filter(i => extensionsPack.some(id => extensionManagementUtil_1.areSameExtensions({ id }, i.identifier)));
                const packOfPackedExtensions = [];
                for (const packedExtension of packedExtensions) {
                    packOfPackedExtensions.push(...this.getAllPackExtensionsToUninstall(packedExtension, installed, checked));
                }
                return [...packedExtensions, ...packOfPackedExtensions];
            }
            return [];
        }
        getDependents(extension, installed) {
            return installed.filter(e => e.manifest.extensionDependencies && e.manifest.extensionDependencies.some(id => extensionManagementUtil_1.areSameExtensions({ id }, extension.identifier)));
        }
        async doUninstall(extension) {
            try {
                await this.preUninstallExtension(extension);
                await this.uninstallExtension(extension);
            }
            catch (error) {
                await this.postUninstallExtension(extension, new extensionManagement_1.ExtensionManagementError(error instanceof Error ? error.message : error, INSTALL_ERROR_LOCAL));
                throw error;
            }
            await this.postUninstallExtension(extension);
        }
        async preUninstallExtension(extension) {
            const exists = await pfs.exists(extension.location.fsPath);
            if (!exists) {
                throw new Error(nls.localize(18, null));
            }
            this.logService.info('Uninstalling extension:', extension.identifier.id);
            this._onUninstallExtension.fire(extension.identifier);
        }
        async uninstallExtension(local) {
            let promise = this.uninstallingExtensions.get(local.identifier.id);
            if (!promise) {
                // Set all versions of the extension as uninstalled
                promise = async_1.createCancelablePromise(async () => {
                    const userExtensions = await this.extensionsScanner.scanUserExtensions(false);
                    await this.setUninstalled(...userExtensions.filter(u => extensionManagementUtil_1.areSameExtensions(u.identifier, local.identifier)));
                });
                this.uninstallingExtensions.set(local.identifier.id, promise);
                promise.finally(() => this.uninstallingExtensions.delete(local.identifier.id));
            }
            return promise;
        }
        async postUninstallExtension(extension, error) {
            if (error) {
                this.logService.error('Failed to uninstall extension:', extension.identifier.id, error.message);
            }
            else {
                this.logService.info('Successfully uninstalled extension:', extension.identifier.id);
                // only report if extension has a mapped gallery extension. UUID identifies the gallery extension.
                if (extension.identifier.uuid) {
                    try {
                        await this.galleryService.reportStatistic(extension.manifest.publisher, extension.manifest.name, extension.manifest.version, "uninstall" /* Uninstall */);
                    }
                    catch (error) { /* ignore */ }
                }
            }
            this.reportTelemetry('extensionGallery:uninstall', extensionManagementUtil_1.getLocalExtensionTelemetryData(extension), undefined, error);
            const errorcode = error ? error instanceof extensionManagement_1.ExtensionManagementError ? error.code : ERROR_UNKNOWN : undefined;
            this._onDidUninstallExtension.fire({ identifier: extension.identifier, error: errorcode });
        }
        getInstalled(type = null) {
            return this.extensionsScanner.scanExtensions(type);
        }
        removeDeprecatedExtensions() {
            return this.extensionsScanner.cleanUp();
        }
        async isUninstalled(identifier) {
            const uninstalled = await this.filterUninstalled(identifier);
            return uninstalled.length === 1;
        }
        filterUninstalled(...identifiers) {
            return this.extensionsScanner.withUninstalledExtensions(allUninstalled => {
                const uninstalled = [];
                for (const identifier of identifiers) {
                    if (!!allUninstalled[identifier.key()]) {
                        uninstalled.push(identifier.key());
                    }
                }
                return uninstalled;
            });
        }
        setUninstalled(...extensions) {
            const ids = extensions.map(e => new extensionManagementUtil_1.ExtensionIdentifierWithVersion(e.identifier, e.manifest.version));
            return this.extensionsScanner.withUninstalledExtensions(uninstalled => {
                ids.forEach(id => uninstalled[id.key()] = true);
                return uninstalled;
            });
        }
        unsetUninstalled(extensionIdentifier) {
            return this.extensionsScanner.withUninstalledExtensions(uninstalled => delete uninstalled[extensionIdentifier.key()]);
        }
        getExtensionsReport() {
            const now = new Date().getTime();
            if (!this.reportedExtensions || now - this.lastReportTimestamp > 1000 * 60 * 5) { // 5 minute cache freshness
                this.reportedExtensions = this.updateReportCache();
                this.lastReportTimestamp = now;
            }
            return this.reportedExtensions;
        }
        async updateReportCache() {
            try {
                this.logService.trace('ExtensionManagementService.refreshReportedCache');
                const result = await this.galleryService.getExtensionsReport();
                this.logService.trace(`ExtensionManagementService.refreshReportedCache - got ${result.length} reported extensions from service`);
                return result;
            }
            catch (err) {
                this.logService.trace('ExtensionManagementService.refreshReportedCache - failed to get extension report');
                return [];
            }
        }
        reportTelemetry(eventName, extensionData, duration, error) {
            const errorcode = error ? error instanceof extensionManagement_1.ExtensionManagementError ? error.code : ERROR_UNKNOWN : undefined;
            /* __GDPR__
                "extensionGallery:install" : {
                    "success": { "classification": "SystemMetaData", "purpose": "PerformanceAndHealth", "isMeasurement": true },
                    "duration" : { "classification": "SystemMetaData", "purpose": "PerformanceAndHealth", "isMeasurement": true },
                    "errorcode": { "classification": "CallstackOrException", "purpose": "PerformanceAndHealth" },
                    "recommendationReason": { "retiredFromVersion": "1.23.0", "classification": "SystemMetaData", "purpose": "FeatureInsight", "isMeasurement": true },
                    "${include}": [
                        "${GalleryExtensionTelemetryData}"
                    ]
                }
            */
            /* __GDPR__
                "extensionGallery:uninstall" : {
                    "success": { "classification": "SystemMetaData", "purpose": "PerformanceAndHealth", "isMeasurement": true },
                    "duration" : { "classification": "SystemMetaData", "purpose": "PerformanceAndHealth", "isMeasurement": true },
                    "errorcode": { "classification": "CallstackOrException", "purpose": "PerformanceAndHealth" },
                    "${include}": [
                        "${GalleryExtensionTelemetryData}"
                    ]
                }
            */
            /* __GDPR__
                "extensionGallery:update" : {
                    "success": { "classification": "SystemMetaData", "purpose": "PerformanceAndHealth", "isMeasurement": true },
                    "duration" : { "classification": "SystemMetaData", "purpose": "PerformanceAndHealth", "isMeasurement": true },
                    "errorcode": { "classification": "CallstackOrException", "purpose": "PerformanceAndHealth" },
                    "${include}": [
                        "${GalleryExtensionTelemetryData}"
                    ]
                }
            */
            this.telemetryService.publicLogError(eventName, Object.assign(Object.assign({}, extensionData), { success: !error, duration, errorcode }));
        }
    };
    ExtensionManagementService = __decorate([
        __param(0, environment_1.INativeEnvironmentService),
        __param(1, extensionManagement_1.IExtensionGalleryService),
        __param(2, log_1.ILogService),
        __param(3, instantiation_1.optional(download_1.IDownloadService)),
        __param(4, telemetry_1.ITelemetryService),
        __param(5, instantiation_1.IInstantiationService)
    ], ExtensionManagementService);
    exports.ExtensionManagementService = ExtensionManagementService;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/









define(__m[116/*vs/platform/request/node/requestService*/], __M([0/*require*/,1/*exports*/,124/*zlib*/,104/*url*/,2/*vs/base/common/lifecycle*/,8/*vs/base/common/types*/,20/*vs/base/common/errors*/,103/*vs/platform/request/node/proxy*/,27/*vs/platform/configuration/common/configuration*/,7/*vs/platform/log/common/log*/,15/*vs/base/common/buffer*/]), function (require, exports, zlib_1, url_1, lifecycle_1, types_1, errors_1, proxy_1, configuration_1, log_1, buffer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RequestService = void 0;
    /**
     * This service exposes the `request` API, while using the global
     * or configured proxy settings.
     */
    let RequestService = class RequestService extends lifecycle_1.Disposable {
        constructor(configurationService, logService) {
            super();
            this.logService = logService;
            this.configure(configurationService.getValue());
            this._register(configurationService.onDidChangeConfiguration(() => this.configure(configurationService.getValue()), this));
        }
        configure(config) {
            this.proxyUrl = config.http && config.http.proxy;
            this.strictSSL = !!(config.http && config.http.proxyStrictSSL);
            this.authorization = config.http && config.http.proxyAuthorization;
        }
        async request(options, token) {
            this.logService.trace('RequestService#request', options.url);
            const { proxyUrl, strictSSL } = this;
            const agent = options.agent ? options.agent : await proxy_1.getProxyAgent(options.url || '', { proxyUrl, strictSSL });
            options.agent = agent;
            options.strictSSL = strictSSL;
            if (this.authorization) {
                options.headers = Object.assign(Object.assign({}, (options.headers || {})), { 'Proxy-Authorization': this.authorization });
            }
            return this._request(options, token);
        }
        async getNodeRequest(options) {
            const endpoint = url_1.parse(options.url);
            const module = endpoint.protocol === 'https:' ? await new Promise((resolve_1, reject_1) => { require(['https'], resolve_1, reject_1); }) : await new Promise((resolve_2, reject_2) => { require(['http'], resolve_2, reject_2); });
            return module.request;
        }
        _request(options, token) {
            return new Promise(async (c, e) => {
                let req;
                const endpoint = url_1.parse(options.url);
                const rawRequest = options.getRawRequest
                    ? options.getRawRequest(options)
                    : await this.getNodeRequest(options);
                const opts = {
                    hostname: endpoint.hostname,
                    port: endpoint.port ? parseInt(endpoint.port) : (endpoint.protocol === 'https:' ? 443 : 80),
                    protocol: endpoint.protocol,
                    path: endpoint.path,
                    method: options.type || 'GET',
                    headers: options.headers,
                    agent: options.agent,
                    rejectUnauthorized: types_1.isBoolean(options.strictSSL) ? options.strictSSL : true
                };
                if (options.user && options.password) {
                    opts.auth = options.user + ':' + options.password;
                }
                req = rawRequest(opts, (res) => {
                    const followRedirects = types_1.isNumber(options.followRedirects) ? options.followRedirects : 3;
                    if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && followRedirects > 0 && res.headers['location']) {
                        this._request(Object.assign(Object.assign({}, options), { url: res.headers['location'], followRedirects: followRedirects - 1 }), token).then(c, e);
                    }
                    else {
                        let stream = res;
                        if (res.headers['content-encoding'] === 'gzip') {
                            stream = res.pipe(zlib_1.createGunzip());
                        }
                        c({ res, stream: buffer_1.streamToBufferReadableStream(stream) });
                    }
                });
                req.on('error', e);
                if (options.timeout) {
                    req.setTimeout(options.timeout);
                }
                if (options.data) {
                    if (typeof options.data === 'string') {
                        req.write(options.data);
                    }
                }
                req.end();
                token.onCancellationRequested(() => {
                    req.abort();
                    e(errors_1.canceled());
                });
            });
        }
        async resolveProxy(url) {
            return undefined; // currently not implemented in node
        }
    };
    RequestService = __decorate([
        __param(0, configuration_1.IConfigurationService),
        __param(1, log_1.ILogService)
    ], RequestService);
    exports.RequestService = RequestService;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/









define(__m[125/*vs/code/node/cliProcessMain*/], __M([0/*require*/,1/*exports*/,5/*vs/nls!vs/code/node/cliProcessMain*/,12/*vs/base/common/async*/,49/*vs/platform/product/common/product*/,3/*vs/base/common/path*/,47/*vs/platform/instantiation/common/serviceCollection*/,44/*vs/platform/instantiation/common/descriptors*/,4/*vs/platform/instantiation/common/instantiation*/,88/*vs/platform/instantiation/common/instantiationService*/,19/*vs/platform/environment/common/environment*/,98/*vs/platform/environment/node/environmentService*/,24/*vs/platform/extensionManagement/common/extensionManagement*/,115/*vs/platform/extensionManagement/node/extensionManagementService*/,109/*vs/platform/extensionManagement/common/extensionGalleryService*/,37/*vs/platform/telemetry/common/telemetry*/,51/*vs/platform/telemetry/common/telemetryUtils*/,110/*vs/platform/telemetry/common/telemetryService*/,112/*vs/platform/telemetry/node/commonProperties*/,50/*vs/platform/request/common/request*/,116/*vs/platform/request/node/requestService*/,27/*vs/platform/configuration/common/configuration*/,102/*vs/platform/configuration/common/configurationService*/,111/*vs/platform/telemetry/node/appInsightsAppender*/,10/*vs/base/node/pfs*/,39/*vs/base/common/labels*/,106/*vs/platform/state/node/state*/,107/*vs/platform/state/node/stateService*/,7/*vs/platform/log/common/log*/,20/*vs/base/common/errors*/,25/*vs/platform/extensionManagement/common/extensionManagementUtil*/,13/*vs/base/common/uri*/,52/*vs/platform/extensionManagement/node/extensionManagementUtil*/,34/*vs/platform/extensions/common/extensions*/,28/*vs/base/common/cancellation*/,95/*vs/platform/localizations/node/localizations*/,9/*vs/base/common/network*/,97/*vs/platform/log/node/spdlogService*/,113/*vs/platform/telemetry/node/telemetry*/,92/*vs/platform/files/common/fileService*/,26/*vs/platform/files/common/files*/,94/*vs/platform/files/node/diskFileSystemProvider*/,2/*vs/base/common/lifecycle*/,36/*vs/platform/product/common/productService*/]), function (require, exports, nls_1, async_1, product_1, path, serviceCollection_1, descriptors_1, instantiation_1, instantiationService_1, environment_1, environmentService_1, extensionManagement_1, extensionManagementService_1, extensionGalleryService_1, telemetry_1, telemetryUtils_1, telemetryService_1, commonProperties_1, request_1, requestService_1, configuration_1, configurationService_1, appInsightsAppender_1, pfs_1, labels_1, state_1, stateService_1, log_1, errors_1, extensionManagementUtil_1, uri_1, extensionManagementUtil_2, extensions_1, cancellation_1, localizations_1, network_1, spdlogService_1, telemetry_2, fileService_1, files_1, diskFileSystemProvider_1, lifecycle_1, productService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.main = exports.Main = exports.getIdAndVersion = void 0;
    const notFound = (id) => nls_1.localize(0, null, id);
    const notInstalled = (id) => nls_1.localize(1, null, id);
    const useId = nls_1.localize(2, null, 'ms-dotnettools.csharp');
    function getId(manifest, withVersion) {
        if (withVersion) {
            return `${manifest.publisher}.${manifest.name}@${manifest.version}`;
        }
        else {
            return `${manifest.publisher}.${manifest.name}`;
        }
    }
    const EXTENSION_ID_REGEX = /^([^.]+\..+)@(\d+\.\d+\.\d+(-.*)?)$/;
    function getIdAndVersion(id) {
        const matches = EXTENSION_ID_REGEX.exec(id);
        if (matches && matches[1]) {
            return [extensionManagementUtil_1.adoptToGalleryExtensionId(matches[1]), matches[2]];
        }
        return [extensionManagementUtil_1.adoptToGalleryExtensionId(id), undefined];
    }
    exports.getIdAndVersion = getIdAndVersion;
    let Main = class Main {
        constructor(instantiationService, environmentService, extensionManagementService, extensionGalleryService) {
            this.instantiationService = instantiationService;
            this.environmentService = environmentService;
            this.extensionManagementService = extensionManagementService;
            this.extensionGalleryService = extensionGalleryService;
        }
        async run(argv) {
            if (argv['install-source']) {
                await this.setInstallSource(argv['install-source']);
            }
            else if (argv['list-extensions']) {
                await this.listExtensions(!!argv['show-versions'], argv['category']);
            }
            else if (argv['install-extension']) {
                await this.installExtensions(argv['install-extension'], !!argv['force']);
            }
            else if (argv['uninstall-extension']) {
                await this.uninstallExtension(argv['uninstall-extension']);
            }
            else if (argv['locate-extension']) {
                await this.locateExtension(argv['locate-extension']);
            }
            else if (argv['telemetry']) {
                console.log(telemetry_2.buildTelemetryMessage(this.environmentService.appRoot, this.environmentService.extensionsPath ? this.environmentService.extensionsPath : undefined));
            }
        }
        setInstallSource(installSource) {
            return pfs_1.writeFile(this.environmentService.installSourcePath, installSource.slice(0, 30));
        }
        async listExtensions(showVersions, category) {
            let extensions = await this.extensionManagementService.getInstalled(1 /* User */);
            const categories = extensions_1.EXTENSION_CATEGORIES.map(c => c.toLowerCase());
            if (category && category !== '') {
                if (categories.indexOf(category.toLowerCase()) < 0) {
                    console.log('Invalid category please enter a valid category. To list valid categories run --category without a category specified');
                    return;
                }
                extensions = extensions.filter(e => {
                    if (e.manifest.categories) {
                        const lowerCaseCategories = e.manifest.categories.map(c => c.toLowerCase());
                        return lowerCaseCategories.indexOf(category.toLowerCase()) > -1;
                    }
                    return false;
                });
            }
            else if (category === '') {
                console.log('Possible Categories: ');
                categories.forEach(category => {
                    console.log(category);
                });
                return;
            }
            extensions.forEach(e => console.log(getId(e.manifest, showVersions)));
        }
        async installExtensions(extensions, force) {
            const failed = [];
            const installedExtensionsManifests = [];
            if (extensions.length) {
                console.log(nls_1.localize(3, null));
            }
            for (const extension of extensions) {
                try {
                    const manifest = await this.installExtension(extension, force);
                    if (manifest) {
                        installedExtensionsManifests.push(manifest);
                    }
                }
                catch (err) {
                    console.error(err.message || err.stack || err);
                    failed.push(extension);
                }
            }
            if (installedExtensionsManifests.some(manifest => extensions_1.isLanguagePackExtension(manifest))) {
                await this.updateLocalizationsCache();
            }
            return failed.length ? Promise.reject(nls_1.localize(4, null, failed.join(', '))) : Promise.resolve();
        }
        async installExtension(extension, force) {
            if (/\.vsix$/i.test(extension)) {
                extension = path.isAbsolute(extension) ? extension : path.join(process.cwd(), extension);
                const manifest = await extensionManagementUtil_2.getManifest(extension);
                const valid = await this.validate(manifest, force);
                if (valid) {
                    return this.extensionManagementService.install(uri_1.URI.file(extension)).then(id => {
                        console.log(nls_1.localize(5, null, labels_1.getBaseLabel(extension)));
                        return manifest;
                    }, error => {
                        if (errors_1.isPromiseCanceledError(error)) {
                            console.log(nls_1.localize(6, null, labels_1.getBaseLabel(extension)));
                            return null;
                        }
                        else {
                            return Promise.reject(error);
                        }
                    });
                }
                return null;
            }
            const [id, version] = getIdAndVersion(extension);
            return this.extensionManagementService.getInstalled(1 /* User */)
                .then(installed => this.extensionGalleryService.getCompatibleExtension({ id }, version)
                .then(null, err => {
                if (err.responseText) {
                    try {
                        const response = JSON.parse(err.responseText);
                        return Promise.reject(response.message);
                    }
                    catch (e) {
                        // noop
                    }
                }
                return Promise.reject(err);
            })
                .then(async (extension) => {
                if (!extension) {
                    return Promise.reject(new Error(`${notFound(version ? `${id}@${version}` : id)}\n${useId}`));
                }
                const manifest = await this.extensionGalleryService.getManifest(extension, cancellation_1.CancellationToken.None);
                const [installedExtension] = installed.filter(e => extensionManagementUtil_1.areSameExtensions(e.identifier, { id }));
                if (installedExtension) {
                    if (extension.version === installedExtension.manifest.version) {
                        console.log(nls_1.localize(7, null, version ? `${id}@${version}` : id));
                        return Promise.resolve(null);
                    }
                    if (!version && !force) {
                        console.log(nls_1.localize(8, null, id, installedExtension.manifest.version, extension.version));
                        return Promise.resolve(null);
                    }
                    console.log(nls_1.localize(9, null, id, extension.version));
                }
                await this.installFromGallery(id, extension);
                return manifest;
            }));
        }
        async validate(manifest, force) {
            if (!manifest) {
                throw new Error('Invalid vsix');
            }
            const semver = await new Promise((resolve_1, reject_1) => { require(['semver-umd'], resolve_1, reject_1); });
            const extensionIdentifier = { id: extensionManagementUtil_1.getGalleryExtensionId(manifest.publisher, manifest.name) };
            const installedExtensions = await this.extensionManagementService.getInstalled(1 /* User */);
            const newer = installedExtensions.find(local => extensionManagementUtil_1.areSameExtensions(extensionIdentifier, local.identifier) && semver.gt(local.manifest.version, manifest.version));
            if (newer && !force) {
                console.log(nls_1.localize(10, null, newer.identifier.id, newer.manifest.version, manifest.version));
                return false;
            }
            return true;
        }
        async installFromGallery(id, extension) {
            console.log(nls_1.localize(11, null, id, extension.version));
            try {
                await this.extensionManagementService.installFromGallery(extension);
                console.log(nls_1.localize(12, null, id, extension.version));
            }
            catch (error) {
                if (errors_1.isPromiseCanceledError(error)) {
                    console.log(nls_1.localize(13, null, id));
                }
                else {
                    throw error;
                }
            }
        }
        async uninstallExtension(extensions) {
            async function getExtensionId(extensionDescription) {
                if (!/\.vsix$/i.test(extensionDescription)) {
                    return extensionDescription;
                }
                const zipPath = path.isAbsolute(extensionDescription) ? extensionDescription : path.join(process.cwd(), extensionDescription);
                const manifest = await extensionManagementUtil_2.getManifest(zipPath);
                return getId(manifest);
            }
            const uninstalledExtensions = [];
            for (const extension of extensions) {
                const id = await getExtensionId(extension);
                const installed = await this.extensionManagementService.getInstalled(1 /* User */);
                const [extensionToUninstall] = installed.filter(e => extensionManagementUtil_1.areSameExtensions(e.identifier, { id }));
                if (!extensionToUninstall) {
                    return Promise.reject(new Error(`${notInstalled(id)}\n${useId}`));
                }
                console.log(nls_1.localize(14, null, id));
                await this.extensionManagementService.uninstall(extensionToUninstall, true);
                uninstalledExtensions.push(extensionToUninstall);
                console.log(nls_1.localize(15, null, id));
            }
            if (uninstalledExtensions.some(e => extensions_1.isLanguagePackExtension(e.manifest))) {
                await this.updateLocalizationsCache();
            }
        }
        async locateExtension(extensions) {
            const installed = await this.extensionManagementService.getInstalled();
            extensions.forEach(e => {
                installed.forEach(i => {
                    if (i.identifier.id === e) {
                        if (i.location.scheme === network_1.Schemas.file) {
                            console.log(i.location.fsPath);
                            return;
                        }
                    }
                });
            });
        }
        async updateLocalizationsCache() {
            const localizationService = this.instantiationService.createInstance(localizations_1.LocalizationsService);
            await localizationService.update();
            localizationService.dispose();
        }
    };
    Main = __decorate([
        __param(0, instantiation_1.IInstantiationService),
        __param(1, environment_1.INativeEnvironmentService),
        __param(2, extensionManagement_1.IExtensionManagementService),
        __param(3, extensionManagement_1.IExtensionGalleryService)
    ], Main);
    exports.Main = Main;
    const eventPrefix = 'monacoworkbench';
    async function main(argv) {
        const services = new serviceCollection_1.ServiceCollection();
        const disposables = new lifecycle_1.DisposableStore();
        const environmentService = new environmentService_1.NativeEnvironmentService(argv);
        const logService = new spdlogService_1.SpdLogService('cli', environmentService.logsPath, log_1.getLogLevel(environmentService));
        process.once('exit', () => logService.dispose());
        logService.info('main', argv);
        await Promise.all([environmentService.appSettingsHome.fsPath, environmentService.extensionsPath]
            .map((path) => path ? pfs_1.mkdirp(path) : undefined));
        // Files
        const fileService = new fileService_1.FileService(logService);
        disposables.add(fileService);
        services.set(files_1.IFileService, fileService);
        const diskFileSystemProvider = new diskFileSystemProvider_1.DiskFileSystemProvider(logService);
        disposables.add(diskFileSystemProvider);
        fileService.registerProvider(network_1.Schemas.file, diskFileSystemProvider);
        const configurationService = new configurationService_1.ConfigurationService(environmentService.settingsResource, fileService);
        disposables.add(configurationService);
        await configurationService.initialize();
        services.set(environment_1.IEnvironmentService, environmentService);
        services.set(environment_1.INativeEnvironmentService, environmentService);
        services.set(log_1.ILogService, logService);
        services.set(configuration_1.IConfigurationService, configurationService);
        services.set(state_1.IStateService, new descriptors_1.SyncDescriptor(stateService_1.StateService));
        services.set(productService_1.IProductService, Object.assign({ _serviceBrand: undefined }, product_1.default));
        const instantiationService = new instantiationService_1.InstantiationService(services);
        return instantiationService.invokeFunction(async (accessor) => {
            const stateService = accessor.get(state_1.IStateService);
            const { appRoot, extensionsPath, extensionDevelopmentLocationURI, isBuilt, installSourcePath } = environmentService;
            const services = new serviceCollection_1.ServiceCollection();
            services.set(request_1.IRequestService, new descriptors_1.SyncDescriptor(requestService_1.RequestService));
            services.set(extensionManagement_1.IExtensionManagementService, new descriptors_1.SyncDescriptor(extensionManagementService_1.ExtensionManagementService));
            services.set(extensionManagement_1.IExtensionGalleryService, new descriptors_1.SyncDescriptor(extensionGalleryService_1.ExtensionGalleryService));
            const appenders = [];
            if (isBuilt && !extensionDevelopmentLocationURI && !environmentService.disableTelemetry && product_1.default.enableTelemetry) {
                if (product_1.default.aiConfig && product_1.default.aiConfig.asimovKey) {
                    appenders.push(new appInsightsAppender_1.AppInsightsAppender(eventPrefix, null, product_1.default.aiConfig.asimovKey, logService));
                }
                const config = {
                    appender: telemetryUtils_1.combinedAppender(...appenders),
                    sendErrorTelemetry: false,
                    commonProperties: commonProperties_1.resolveCommonProperties(product_1.default.commit, product_1.default.version, stateService.getItem('telemetry.machineId'), product_1.default.msftInternalDomains, installSourcePath),
                    piiPaths: extensionsPath ? [appRoot, extensionsPath] : [appRoot]
                };
                services.set(telemetry_1.ITelemetryService, new descriptors_1.SyncDescriptor(telemetryService_1.TelemetryService, [config]));
            }
            else {
                services.set(telemetry_1.ITelemetryService, telemetryUtils_1.NullTelemetryService);
            }
            const instantiationService2 = instantiationService.createChild(services);
            const main = instantiationService2.createInstance(Main);
            try {
                await main.run(argv);
                // Flush the remaining data in AI adapter.
                // If it does not complete in 1 second, exit the process.
                await async_1.raceTimeout(telemetryUtils_1.combinedAppender(...appenders).flush(), 1000);
            }
            finally {
                disposables.dispose();
            }
        });
    }
    exports.main = main;
});

}).call(this);
//# sourceMappingURL=cliProcessMain.js.map
