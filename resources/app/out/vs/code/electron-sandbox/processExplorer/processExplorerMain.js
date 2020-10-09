/*!--------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
(function() {
var __m = ["require","exports","vs/base/common/platform","vs/base/common/event","vs/base/common/lifecycle","vs/base/common/errors","vs/base/common/strings","vs/base/browser/browser","vs/base/common/uri","vs/base/parts/sandbox/electron-sandbox/globals","vs/base/common/buffer","vs/base/browser/dom","vs/css!vs/code/electron-sandbox/processExplorer/processExplorerMain","vs/base/common/functional","vs/base/common/cancellation","vs/base/common/async","vs/base/common/network","vs/base/parts/ipc/common/ipc","vs/platform/ipc/electron-sandbox/mainProcessService","vs/base/browser/iframe","vs/base/common/arrays","vs/base/common/iterator","vs/base/common/keyCodes","vs/base/common/linkedList","vs/base/browser/event","vs/base/browser/canIUse","vs/base/browser/keyboardEvent","vs/base/browser/mouseEvent","vs/base/common/process","vs/base/common/path","vs/base/common/stream","vs/base/common/types","vs/base/common/marshalling","vs/base/browser/codicons","vs/base/browser/ui/codicons/codiconLabel","vs/base/common/map","vs/base/common/filters","vs/base/common/codicon","vs/base/common/codicons","vs/base/parts/contextmenu/common/contextmenu","vs/base/parts/ipc/common/ipc.electron","vs/base/parts/contextmenu/electron-sandbox/contextmenu","vs/base/parts/ipc/electron-sandbox/ipc.electron-sandbox","vs/css!vs/base/browser/ui/codicons/codicon/codicon","vs/css!vs/base/browser/ui/codicons/codicon/codicon-animations","vs/css!vs/base/browser/ui/codicons/codicon/codicon-modifications","vs/base/browser/ui/codicons/codiconStyles","vs/css!vs/code/electron-sandbox/processExplorer/media/processExplorer","vs/platform/diagnostics/common/diagnostics","vs/platform/instantiation/common/instantiation","vs/platform/native/electron-sandbox/nativeHostService","vs/platform/windows/common/windows","vs/platform/windows/electron-sandbox/window","vs/code/electron-sandbox/processExplorer/processExplorerMain","vs/nls!vs/code/electron-sandbox/processExplorer/processExplorerMain"];
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
define(__m[19/*vs/base/browser/iframe*/], __M([0/*require*/,1/*exports*/]), function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IframeUtils = void 0;
    let hasDifferentOriginAncestorFlag = false;
    let sameOriginWindowChainCache = null;
    function getParentWindowIfSameOrigin(w) {
        if (!w.parent || w.parent === w) {
            return null;
        }
        // Cannot really tell if we have access to the parent window unless we try to access something in it
        try {
            let location = w.location;
            let parentLocation = w.parent.location;
            if (location.origin !== 'null' && parentLocation.origin !== 'null') {
                if (location.protocol !== parentLocation.protocol || location.hostname !== parentLocation.hostname || location.port !== parentLocation.port) {
                    hasDifferentOriginAncestorFlag = true;
                    return null;
                }
            }
        }
        catch (e) {
            hasDifferentOriginAncestorFlag = true;
            return null;
        }
        return w.parent;
    }
    class IframeUtils {
        /**
         * Returns a chain of embedded windows with the same origin (which can be accessed programmatically).
         * Having a chain of length 1 might mean that the current execution environment is running outside of an iframe or inside an iframe embedded in a window with a different origin.
         * To distinguish if at one point the current execution environment is running inside a window with a different origin, see hasDifferentOriginAncestor()
         */
        static getSameOriginWindowChain() {
            if (!sameOriginWindowChainCache) {
                sameOriginWindowChainCache = [];
                let w = window;
                let parent;
                do {
                    parent = getParentWindowIfSameOrigin(w);
                    if (parent) {
                        sameOriginWindowChainCache.push({
                            window: w,
                            iframeElement: w.frameElement || null
                        });
                    }
                    else {
                        sameOriginWindowChainCache.push({
                            window: w,
                            iframeElement: null
                        });
                    }
                    w = parent;
                } while (w);
            }
            return sameOriginWindowChainCache.slice(0);
        }
        /**
         * Returns true if the current execution environment is chained in a list of iframes which at one point ends in a window with a different origin.
         * Returns false if the current execution environment is not running inside an iframe or if the entire chain of iframes have the same origin.
         */
        static hasDifferentOriginAncestor() {
            if (!sameOriginWindowChainCache) {
                this.getSameOriginWindowChain();
            }
            return hasDifferentOriginAncestorFlag;
        }
        /**
         * Returns the position of `childWindow` relative to `ancestorWindow`
         */
        static getPositionOfChildWindowRelativeToAncestorWindow(childWindow, ancestorWindow) {
            if (!ancestorWindow || childWindow === ancestorWindow) {
                return {
                    top: 0,
                    left: 0
                };
            }
            let top = 0, left = 0;
            let windowChain = this.getSameOriginWindowChain();
            for (const windowChainEl of windowChain) {
                top += windowChainEl.window.scrollY;
                left += windowChainEl.window.scrollX;
                if (windowChainEl.window === ancestorWindow) {
                    break;
                }
                if (!windowChainEl.iframeElement) {
                    break;
                }
                let boundingRect = windowChainEl.iframeElement.getBoundingClientRect();
                top += boundingRect.top;
                left += boundingRect.left;
            }
            return {
                top: top,
                left: left
            };
        }
    }
    exports.IframeUtils = IframeUtils;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[5/*vs/base/common/errors*/], __M([0/*require*/,1/*exports*/]), function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NotSupportedError = exports.NotImplementedError = exports.getErrorMessage = exports.disposed = exports.readonly = exports.illegalState = exports.illegalArgument = exports.canceled = exports.isPromiseCanceledError = exports.transformErrorForSerialization = exports.onUnexpectedExternalError = exports.onUnexpectedError = exports.setUnexpectedErrorHandler = exports.errorHandler = exports.ErrorHandler = void 0;
    // Avoid circular dependency on EventEmitter by implementing a subset of the interface.
    class ErrorHandler {
        constructor() {
            this.listeners = [];
            this.unexpectedErrorHandler = function (e) {
                setTimeout(() => {
                    if (e.stack) {
                        throw new Error(e.message + '\n\n' + e.stack);
                    }
                    throw e;
                }, 0);
            };
        }
        addListener(listener) {
            this.listeners.push(listener);
            return () => {
                this._removeListener(listener);
            };
        }
        emit(e) {
            this.listeners.forEach((listener) => {
                listener(e);
            });
        }
        _removeListener(listener) {
            this.listeners.splice(this.listeners.indexOf(listener), 1);
        }
        setUnexpectedErrorHandler(newUnexpectedErrorHandler) {
            this.unexpectedErrorHandler = newUnexpectedErrorHandler;
        }
        getUnexpectedErrorHandler() {
            return this.unexpectedErrorHandler;
        }
        onUnexpectedError(e) {
            this.unexpectedErrorHandler(e);
            this.emit(e);
        }
        // For external errors, we don't want the listeners to be called
        onUnexpectedExternalError(e) {
            this.unexpectedErrorHandler(e);
        }
    }
    exports.ErrorHandler = ErrorHandler;
    exports.errorHandler = new ErrorHandler();
    function setUnexpectedErrorHandler(newUnexpectedErrorHandler) {
        exports.errorHandler.setUnexpectedErrorHandler(newUnexpectedErrorHandler);
    }
    exports.setUnexpectedErrorHandler = setUnexpectedErrorHandler;
    function onUnexpectedError(e) {
        // ignore errors from cancelled promises
        if (!isPromiseCanceledError(e)) {
            exports.errorHandler.onUnexpectedError(e);
        }
        return undefined;
    }
    exports.onUnexpectedError = onUnexpectedError;
    function onUnexpectedExternalError(e) {
        // ignore errors from cancelled promises
        if (!isPromiseCanceledError(e)) {
            exports.errorHandler.onUnexpectedExternalError(e);
        }
        return undefined;
    }
    exports.onUnexpectedExternalError = onUnexpectedExternalError;
    function transformErrorForSerialization(error) {
        if (error instanceof Error) {
            let { name, message } = error;
            const stack = error.stacktrace || error.stack;
            return {
                $isError: true,
                name,
                message,
                stack
            };
        }
        // return as is
        return error;
    }
    exports.transformErrorForSerialization = transformErrorForSerialization;
    const canceledName = 'Canceled';
    /**
     * Checks if the given error is a promise in canceled state
     */
    function isPromiseCanceledError(error) {
        return error instanceof Error && error.name === canceledName && error.message === canceledName;
    }
    exports.isPromiseCanceledError = isPromiseCanceledError;
    /**
     * Returns an error that signals cancellation.
     */
    function canceled() {
        const error = new Error(canceledName);
        error.name = error.message;
        return error;
    }
    exports.canceled = canceled;
    function illegalArgument(name) {
        if (name) {
            return new Error(`Illegal argument: ${name}`);
        }
        else {
            return new Error('Illegal argument');
        }
    }
    exports.illegalArgument = illegalArgument;
    function illegalState(name) {
        if (name) {
            return new Error(`Illegal state: ${name}`);
        }
        else {
            return new Error('Illegal state');
        }
    }
    exports.illegalState = illegalState;
    function readonly(name) {
        return name
            ? new Error(`readonly property '${name} cannot be changed'`)
            : new Error('readonly property cannot be changed');
    }
    exports.readonly = readonly;
    function disposed(what) {
        const result = new Error(`${what} has been disposed`);
        result.name = 'DISPOSED';
        return result;
    }
    exports.disposed = disposed;
    function getErrorMessage(err) {
        if (!err) {
            return 'Error';
        }
        if (err.message) {
            return err.message;
        }
        if (err.stack) {
            return err.stack.split('\n')[0];
        }
        return String(err);
    }
    exports.getErrorMessage = getErrorMessage;
    class NotImplementedError extends Error {
        constructor(message) {
            super('NotImplemented');
            if (message) {
                this.message = message;
            }
        }
    }
    exports.NotImplementedError = NotImplementedError;
    class NotSupportedError extends Error {
        constructor(message) {
            super('NotSupported');
            if (message) {
                this.message = message;
            }
        }
    }
    exports.NotSupportedError = NotSupportedError;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[20/*vs/base/common/arrays*/], __M([0/*require*/,1/*exports*/,5/*vs/base/common/errors*/]), function (require, exports, errors_1) {
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
define(__m[13/*vs/base/common/functional*/], __M([0/*require*/,1/*exports*/]), function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.once = void 0;
    function once(fn) {
        const _this = this;
        let didCall = false;
        let result;
        return function () {
            if (didCall) {
                return result;
            }
            didCall = true;
            result = fn.apply(_this, arguments);
            return result;
        };
    }
    exports.once = once;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[21/*vs/base/common/iterator*/], __M([0/*require*/,1/*exports*/]), function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Iterable = void 0;
    var Iterable;
    (function (Iterable) {
        function is(thing) {
            return thing && typeof thing === 'object' && typeof thing[Symbol.iterator] === 'function';
        }
        Iterable.is = is;
        const _empty = Object.freeze([]);
        function empty() {
            return _empty;
        }
        Iterable.empty = empty;
        function* single(element) {
            yield element;
        }
        Iterable.single = single;
        function from(iterable) {
            return iterable || _empty;
        }
        Iterable.from = from;
        function first(iterable) {
            return iterable[Symbol.iterator]().next().value;
        }
        Iterable.first = first;
        function some(iterable, predicate) {
            for (const element of iterable) {
                if (predicate(element)) {
                    return true;
                }
            }
            return false;
        }
        Iterable.some = some;
        function* filter(iterable, predicate) {
            for (const element of iterable) {
                if (predicate(element)) {
                    yield element;
                }
            }
        }
        Iterable.filter = filter;
        function* map(iterable, fn) {
            for (const element of iterable) {
                yield fn(element);
            }
        }
        Iterable.map = map;
        function* concat(...iterables) {
            for (const iterable of iterables) {
                for (const element of iterable) {
                    yield element;
                }
            }
        }
        Iterable.concat = concat;
        /**
         * Consumes `atMost` elements from iterable and returns the consumed elements,
         * and an iterable for the rest of the elements.
         */
        function consume(iterable, atMost = Number.POSITIVE_INFINITY) {
            const consumed = [];
            if (atMost === 0) {
                return [consumed, iterable];
            }
            const iterator = iterable[Symbol.iterator]();
            for (let i = 0; i < atMost; i++) {
                const next = iterator.next();
                if (next.done) {
                    return [consumed, Iterable.empty()];
                }
                consumed.push(next.value);
            }
            return [consumed, { [Symbol.iterator]() { return iterator; } }];
        }
        Iterable.consume = consume;
    })(Iterable = exports.Iterable || (exports.Iterable = {}));
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[22/*vs/base/common/keyCodes*/], __M([0/*require*/,1/*exports*/,5/*vs/base/common/errors*/]), function (require, exports, errors_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ResolvedKeybinding = exports.ResolvedKeybindingPart = exports.ChordKeybinding = exports.SimpleKeybinding = exports.createSimpleKeybinding = exports.createKeybinding = exports.KeyChord = exports.KeyMod = exports.KeyCodeUtils = exports.KeyCode = void 0;
    /**
     * Virtual Key Codes, the value does not hold any inherent meaning.
     * Inspired somewhat from https://msdn.microsoft.com/en-us/library/windows/desktop/dd375731(v=vs.85).aspx
     * But these are "more general", as they should work across browsers & OS`s.
     */
    var KeyCode;
    (function (KeyCode) {
        /**
         * Placed first to cover the 0 value of the enum.
         */
        KeyCode[KeyCode["Unknown"] = 0] = "Unknown";
        KeyCode[KeyCode["Backspace"] = 1] = "Backspace";
        KeyCode[KeyCode["Tab"] = 2] = "Tab";
        KeyCode[KeyCode["Enter"] = 3] = "Enter";
        KeyCode[KeyCode["Shift"] = 4] = "Shift";
        KeyCode[KeyCode["Ctrl"] = 5] = "Ctrl";
        KeyCode[KeyCode["Alt"] = 6] = "Alt";
        KeyCode[KeyCode["PauseBreak"] = 7] = "PauseBreak";
        KeyCode[KeyCode["CapsLock"] = 8] = "CapsLock";
        KeyCode[KeyCode["Escape"] = 9] = "Escape";
        KeyCode[KeyCode["Space"] = 10] = "Space";
        KeyCode[KeyCode["PageUp"] = 11] = "PageUp";
        KeyCode[KeyCode["PageDown"] = 12] = "PageDown";
        KeyCode[KeyCode["End"] = 13] = "End";
        KeyCode[KeyCode["Home"] = 14] = "Home";
        KeyCode[KeyCode["LeftArrow"] = 15] = "LeftArrow";
        KeyCode[KeyCode["UpArrow"] = 16] = "UpArrow";
        KeyCode[KeyCode["RightArrow"] = 17] = "RightArrow";
        KeyCode[KeyCode["DownArrow"] = 18] = "DownArrow";
        KeyCode[KeyCode["Insert"] = 19] = "Insert";
        KeyCode[KeyCode["Delete"] = 20] = "Delete";
        KeyCode[KeyCode["KEY_0"] = 21] = "KEY_0";
        KeyCode[KeyCode["KEY_1"] = 22] = "KEY_1";
        KeyCode[KeyCode["KEY_2"] = 23] = "KEY_2";
        KeyCode[KeyCode["KEY_3"] = 24] = "KEY_3";
        KeyCode[KeyCode["KEY_4"] = 25] = "KEY_4";
        KeyCode[KeyCode["KEY_5"] = 26] = "KEY_5";
        KeyCode[KeyCode["KEY_6"] = 27] = "KEY_6";
        KeyCode[KeyCode["KEY_7"] = 28] = "KEY_7";
        KeyCode[KeyCode["KEY_8"] = 29] = "KEY_8";
        KeyCode[KeyCode["KEY_9"] = 30] = "KEY_9";
        KeyCode[KeyCode["KEY_A"] = 31] = "KEY_A";
        KeyCode[KeyCode["KEY_B"] = 32] = "KEY_B";
        KeyCode[KeyCode["KEY_C"] = 33] = "KEY_C";
        KeyCode[KeyCode["KEY_D"] = 34] = "KEY_D";
        KeyCode[KeyCode["KEY_E"] = 35] = "KEY_E";
        KeyCode[KeyCode["KEY_F"] = 36] = "KEY_F";
        KeyCode[KeyCode["KEY_G"] = 37] = "KEY_G";
        KeyCode[KeyCode["KEY_H"] = 38] = "KEY_H";
        KeyCode[KeyCode["KEY_I"] = 39] = "KEY_I";
        KeyCode[KeyCode["KEY_J"] = 40] = "KEY_J";
        KeyCode[KeyCode["KEY_K"] = 41] = "KEY_K";
        KeyCode[KeyCode["KEY_L"] = 42] = "KEY_L";
        KeyCode[KeyCode["KEY_M"] = 43] = "KEY_M";
        KeyCode[KeyCode["KEY_N"] = 44] = "KEY_N";
        KeyCode[KeyCode["KEY_O"] = 45] = "KEY_O";
        KeyCode[KeyCode["KEY_P"] = 46] = "KEY_P";
        KeyCode[KeyCode["KEY_Q"] = 47] = "KEY_Q";
        KeyCode[KeyCode["KEY_R"] = 48] = "KEY_R";
        KeyCode[KeyCode["KEY_S"] = 49] = "KEY_S";
        KeyCode[KeyCode["KEY_T"] = 50] = "KEY_T";
        KeyCode[KeyCode["KEY_U"] = 51] = "KEY_U";
        KeyCode[KeyCode["KEY_V"] = 52] = "KEY_V";
        KeyCode[KeyCode["KEY_W"] = 53] = "KEY_W";
        KeyCode[KeyCode["KEY_X"] = 54] = "KEY_X";
        KeyCode[KeyCode["KEY_Y"] = 55] = "KEY_Y";
        KeyCode[KeyCode["KEY_Z"] = 56] = "KEY_Z";
        KeyCode[KeyCode["Meta"] = 57] = "Meta";
        KeyCode[KeyCode["ContextMenu"] = 58] = "ContextMenu";
        KeyCode[KeyCode["F1"] = 59] = "F1";
        KeyCode[KeyCode["F2"] = 60] = "F2";
        KeyCode[KeyCode["F3"] = 61] = "F3";
        KeyCode[KeyCode["F4"] = 62] = "F4";
        KeyCode[KeyCode["F5"] = 63] = "F5";
        KeyCode[KeyCode["F6"] = 64] = "F6";
        KeyCode[KeyCode["F7"] = 65] = "F7";
        KeyCode[KeyCode["F8"] = 66] = "F8";
        KeyCode[KeyCode["F9"] = 67] = "F9";
        KeyCode[KeyCode["F10"] = 68] = "F10";
        KeyCode[KeyCode["F11"] = 69] = "F11";
        KeyCode[KeyCode["F12"] = 70] = "F12";
        KeyCode[KeyCode["F13"] = 71] = "F13";
        KeyCode[KeyCode["F14"] = 72] = "F14";
        KeyCode[KeyCode["F15"] = 73] = "F15";
        KeyCode[KeyCode["F16"] = 74] = "F16";
        KeyCode[KeyCode["F17"] = 75] = "F17";
        KeyCode[KeyCode["F18"] = 76] = "F18";
        KeyCode[KeyCode["F19"] = 77] = "F19";
        KeyCode[KeyCode["NumLock"] = 78] = "NumLock";
        KeyCode[KeyCode["ScrollLock"] = 79] = "ScrollLock";
        /**
         * Used for miscellaneous characters; it can vary by keyboard.
         * For the US standard keyboard, the ';:' key
         */
        KeyCode[KeyCode["US_SEMICOLON"] = 80] = "US_SEMICOLON";
        /**
         * For any country/region, the '+' key
         * For the US standard keyboard, the '=+' key
         */
        KeyCode[KeyCode["US_EQUAL"] = 81] = "US_EQUAL";
        /**
         * For any country/region, the ',' key
         * For the US standard keyboard, the ',<' key
         */
        KeyCode[KeyCode["US_COMMA"] = 82] = "US_COMMA";
        /**
         * For any country/region, the '-' key
         * For the US standard keyboard, the '-_' key
         */
        KeyCode[KeyCode["US_MINUS"] = 83] = "US_MINUS";
        /**
         * For any country/region, the '.' key
         * For the US standard keyboard, the '.>' key
         */
        KeyCode[KeyCode["US_DOT"] = 84] = "US_DOT";
        /**
         * Used for miscellaneous characters; it can vary by keyboard.
         * For the US standard keyboard, the '/?' key
         */
        KeyCode[KeyCode["US_SLASH"] = 85] = "US_SLASH";
        /**
         * Used for miscellaneous characters; it can vary by keyboard.
         * For the US standard keyboard, the '`~' key
         */
        KeyCode[KeyCode["US_BACKTICK"] = 86] = "US_BACKTICK";
        /**
         * Used for miscellaneous characters; it can vary by keyboard.
         * For the US standard keyboard, the '[{' key
         */
        KeyCode[KeyCode["US_OPEN_SQUARE_BRACKET"] = 87] = "US_OPEN_SQUARE_BRACKET";
        /**
         * Used for miscellaneous characters; it can vary by keyboard.
         * For the US standard keyboard, the '\|' key
         */
        KeyCode[KeyCode["US_BACKSLASH"] = 88] = "US_BACKSLASH";
        /**
         * Used for miscellaneous characters; it can vary by keyboard.
         * For the US standard keyboard, the ']}' key
         */
        KeyCode[KeyCode["US_CLOSE_SQUARE_BRACKET"] = 89] = "US_CLOSE_SQUARE_BRACKET";
        /**
         * Used for miscellaneous characters; it can vary by keyboard.
         * For the US standard keyboard, the ''"' key
         */
        KeyCode[KeyCode["US_QUOTE"] = 90] = "US_QUOTE";
        /**
         * Used for miscellaneous characters; it can vary by keyboard.
         */
        KeyCode[KeyCode["OEM_8"] = 91] = "OEM_8";
        /**
         * Either the angle bracket key or the backslash key on the RT 102-key keyboard.
         */
        KeyCode[KeyCode["OEM_102"] = 92] = "OEM_102";
        KeyCode[KeyCode["NUMPAD_0"] = 93] = "NUMPAD_0";
        KeyCode[KeyCode["NUMPAD_1"] = 94] = "NUMPAD_1";
        KeyCode[KeyCode["NUMPAD_2"] = 95] = "NUMPAD_2";
        KeyCode[KeyCode["NUMPAD_3"] = 96] = "NUMPAD_3";
        KeyCode[KeyCode["NUMPAD_4"] = 97] = "NUMPAD_4";
        KeyCode[KeyCode["NUMPAD_5"] = 98] = "NUMPAD_5";
        KeyCode[KeyCode["NUMPAD_6"] = 99] = "NUMPAD_6";
        KeyCode[KeyCode["NUMPAD_7"] = 100] = "NUMPAD_7";
        KeyCode[KeyCode["NUMPAD_8"] = 101] = "NUMPAD_8";
        KeyCode[KeyCode["NUMPAD_9"] = 102] = "NUMPAD_9";
        KeyCode[KeyCode["NUMPAD_MULTIPLY"] = 103] = "NUMPAD_MULTIPLY";
        KeyCode[KeyCode["NUMPAD_ADD"] = 104] = "NUMPAD_ADD";
        KeyCode[KeyCode["NUMPAD_SEPARATOR"] = 105] = "NUMPAD_SEPARATOR";
        KeyCode[KeyCode["NUMPAD_SUBTRACT"] = 106] = "NUMPAD_SUBTRACT";
        KeyCode[KeyCode["NUMPAD_DECIMAL"] = 107] = "NUMPAD_DECIMAL";
        KeyCode[KeyCode["NUMPAD_DIVIDE"] = 108] = "NUMPAD_DIVIDE";
        /**
         * Cover all key codes when IME is processing input.
         */
        KeyCode[KeyCode["KEY_IN_COMPOSITION"] = 109] = "KEY_IN_COMPOSITION";
        KeyCode[KeyCode["ABNT_C1"] = 110] = "ABNT_C1";
        KeyCode[KeyCode["ABNT_C2"] = 111] = "ABNT_C2";
        /**
         * Placed last to cover the length of the enum.
         * Please do not depend on this value!
         */
        KeyCode[KeyCode["MAX_VALUE"] = 112] = "MAX_VALUE";
    })(KeyCode = exports.KeyCode || (exports.KeyCode = {}));
    class KeyCodeStrMap {
        constructor() {
            this._keyCodeToStr = [];
            this._strToKeyCode = Object.create(null);
        }
        define(keyCode, str) {
            this._keyCodeToStr[keyCode] = str;
            this._strToKeyCode[str.toLowerCase()] = keyCode;
        }
        keyCodeToStr(keyCode) {
            return this._keyCodeToStr[keyCode];
        }
        strToKeyCode(str) {
            return this._strToKeyCode[str.toLowerCase()] || 0 /* Unknown */;
        }
    }
    const uiMap = new KeyCodeStrMap();
    const userSettingsUSMap = new KeyCodeStrMap();
    const userSettingsGeneralMap = new KeyCodeStrMap();
    (function () {
        function define(keyCode, uiLabel, usUserSettingsLabel = uiLabel, generalUserSettingsLabel = usUserSettingsLabel) {
            uiMap.define(keyCode, uiLabel);
            userSettingsUSMap.define(keyCode, usUserSettingsLabel);
            userSettingsGeneralMap.define(keyCode, generalUserSettingsLabel);
        }
        define(0 /* Unknown */, 'unknown');
        define(1 /* Backspace */, 'Backspace');
        define(2 /* Tab */, 'Tab');
        define(3 /* Enter */, 'Enter');
        define(4 /* Shift */, 'Shift');
        define(5 /* Ctrl */, 'Ctrl');
        define(6 /* Alt */, 'Alt');
        define(7 /* PauseBreak */, 'PauseBreak');
        define(8 /* CapsLock */, 'CapsLock');
        define(9 /* Escape */, 'Escape');
        define(10 /* Space */, 'Space');
        define(11 /* PageUp */, 'PageUp');
        define(12 /* PageDown */, 'PageDown');
        define(13 /* End */, 'End');
        define(14 /* Home */, 'Home');
        define(15 /* LeftArrow */, 'LeftArrow', 'Left');
        define(16 /* UpArrow */, 'UpArrow', 'Up');
        define(17 /* RightArrow */, 'RightArrow', 'Right');
        define(18 /* DownArrow */, 'DownArrow', 'Down');
        define(19 /* Insert */, 'Insert');
        define(20 /* Delete */, 'Delete');
        define(21 /* KEY_0 */, '0');
        define(22 /* KEY_1 */, '1');
        define(23 /* KEY_2 */, '2');
        define(24 /* KEY_3 */, '3');
        define(25 /* KEY_4 */, '4');
        define(26 /* KEY_5 */, '5');
        define(27 /* KEY_6 */, '6');
        define(28 /* KEY_7 */, '7');
        define(29 /* KEY_8 */, '8');
        define(30 /* KEY_9 */, '9');
        define(31 /* KEY_A */, 'A');
        define(32 /* KEY_B */, 'B');
        define(33 /* KEY_C */, 'C');
        define(34 /* KEY_D */, 'D');
        define(35 /* KEY_E */, 'E');
        define(36 /* KEY_F */, 'F');
        define(37 /* KEY_G */, 'G');
        define(38 /* KEY_H */, 'H');
        define(39 /* KEY_I */, 'I');
        define(40 /* KEY_J */, 'J');
        define(41 /* KEY_K */, 'K');
        define(42 /* KEY_L */, 'L');
        define(43 /* KEY_M */, 'M');
        define(44 /* KEY_N */, 'N');
        define(45 /* KEY_O */, 'O');
        define(46 /* KEY_P */, 'P');
        define(47 /* KEY_Q */, 'Q');
        define(48 /* KEY_R */, 'R');
        define(49 /* KEY_S */, 'S');
        define(50 /* KEY_T */, 'T');
        define(51 /* KEY_U */, 'U');
        define(52 /* KEY_V */, 'V');
        define(53 /* KEY_W */, 'W');
        define(54 /* KEY_X */, 'X');
        define(55 /* KEY_Y */, 'Y');
        define(56 /* KEY_Z */, 'Z');
        define(57 /* Meta */, 'Meta');
        define(58 /* ContextMenu */, 'ContextMenu');
        define(59 /* F1 */, 'F1');
        define(60 /* F2 */, 'F2');
        define(61 /* F3 */, 'F3');
        define(62 /* F4 */, 'F4');
        define(63 /* F5 */, 'F5');
        define(64 /* F6 */, 'F6');
        define(65 /* F7 */, 'F7');
        define(66 /* F8 */, 'F8');
        define(67 /* F9 */, 'F9');
        define(68 /* F10 */, 'F10');
        define(69 /* F11 */, 'F11');
        define(70 /* F12 */, 'F12');
        define(71 /* F13 */, 'F13');
        define(72 /* F14 */, 'F14');
        define(73 /* F15 */, 'F15');
        define(74 /* F16 */, 'F16');
        define(75 /* F17 */, 'F17');
        define(76 /* F18 */, 'F18');
        define(77 /* F19 */, 'F19');
        define(78 /* NumLock */, 'NumLock');
        define(79 /* ScrollLock */, 'ScrollLock');
        define(80 /* US_SEMICOLON */, ';', ';', 'OEM_1');
        define(81 /* US_EQUAL */, '=', '=', 'OEM_PLUS');
        define(82 /* US_COMMA */, ',', ',', 'OEM_COMMA');
        define(83 /* US_MINUS */, '-', '-', 'OEM_MINUS');
        define(84 /* US_DOT */, '.', '.', 'OEM_PERIOD');
        define(85 /* US_SLASH */, '/', '/', 'OEM_2');
        define(86 /* US_BACKTICK */, '`', '`', 'OEM_3');
        define(110 /* ABNT_C1 */, 'ABNT_C1');
        define(111 /* ABNT_C2 */, 'ABNT_C2');
        define(87 /* US_OPEN_SQUARE_BRACKET */, '[', '[', 'OEM_4');
        define(88 /* US_BACKSLASH */, '\\', '\\', 'OEM_5');
        define(89 /* US_CLOSE_SQUARE_BRACKET */, ']', ']', 'OEM_6');
        define(90 /* US_QUOTE */, '\'', '\'', 'OEM_7');
        define(91 /* OEM_8 */, 'OEM_8');
        define(92 /* OEM_102 */, 'OEM_102');
        define(93 /* NUMPAD_0 */, 'NumPad0');
        define(94 /* NUMPAD_1 */, 'NumPad1');
        define(95 /* NUMPAD_2 */, 'NumPad2');
        define(96 /* NUMPAD_3 */, 'NumPad3');
        define(97 /* NUMPAD_4 */, 'NumPad4');
        define(98 /* NUMPAD_5 */, 'NumPad5');
        define(99 /* NUMPAD_6 */, 'NumPad6');
        define(100 /* NUMPAD_7 */, 'NumPad7');
        define(101 /* NUMPAD_8 */, 'NumPad8');
        define(102 /* NUMPAD_9 */, 'NumPad9');
        define(103 /* NUMPAD_MULTIPLY */, 'NumPad_Multiply');
        define(104 /* NUMPAD_ADD */, 'NumPad_Add');
        define(105 /* NUMPAD_SEPARATOR */, 'NumPad_Separator');
        define(106 /* NUMPAD_SUBTRACT */, 'NumPad_Subtract');
        define(107 /* NUMPAD_DECIMAL */, 'NumPad_Decimal');
        define(108 /* NUMPAD_DIVIDE */, 'NumPad_Divide');
    })();
    var KeyCodeUtils;
    (function (KeyCodeUtils) {
        function toString(keyCode) {
            return uiMap.keyCodeToStr(keyCode);
        }
        KeyCodeUtils.toString = toString;
        function fromString(key) {
            return uiMap.strToKeyCode(key);
        }
        KeyCodeUtils.fromString = fromString;
        function toUserSettingsUS(keyCode) {
            return userSettingsUSMap.keyCodeToStr(keyCode);
        }
        KeyCodeUtils.toUserSettingsUS = toUserSettingsUS;
        function toUserSettingsGeneral(keyCode) {
            return userSettingsGeneralMap.keyCodeToStr(keyCode);
        }
        KeyCodeUtils.toUserSettingsGeneral = toUserSettingsGeneral;
        function fromUserSettings(key) {
            return userSettingsUSMap.strToKeyCode(key) || userSettingsGeneralMap.strToKeyCode(key);
        }
        KeyCodeUtils.fromUserSettings = fromUserSettings;
    })(KeyCodeUtils = exports.KeyCodeUtils || (exports.KeyCodeUtils = {}));
    /**
     * Binary encoding strategy:
     * ```
     *    1111 11
     *    5432 1098 7654 3210
     *    ---- CSAW KKKK KKKK
     *  C = bit 11 = ctrlCmd flag
     *  S = bit 10 = shift flag
     *  A = bit 9 = alt flag
     *  W = bit 8 = winCtrl flag
     *  K = bits 0-7 = key code
     * ```
     */
    var BinaryKeybindingsMask;
    (function (BinaryKeybindingsMask) {
        BinaryKeybindingsMask[BinaryKeybindingsMask["CtrlCmd"] = 2048] = "CtrlCmd";
        BinaryKeybindingsMask[BinaryKeybindingsMask["Shift"] = 1024] = "Shift";
        BinaryKeybindingsMask[BinaryKeybindingsMask["Alt"] = 512] = "Alt";
        BinaryKeybindingsMask[BinaryKeybindingsMask["WinCtrl"] = 256] = "WinCtrl";
        BinaryKeybindingsMask[BinaryKeybindingsMask["KeyCode"] = 255] = "KeyCode";
    })(BinaryKeybindingsMask || (BinaryKeybindingsMask = {}));
    var KeyMod;
    (function (KeyMod) {
        KeyMod[KeyMod["CtrlCmd"] = 2048] = "CtrlCmd";
        KeyMod[KeyMod["Shift"] = 1024] = "Shift";
        KeyMod[KeyMod["Alt"] = 512] = "Alt";
        KeyMod[KeyMod["WinCtrl"] = 256] = "WinCtrl";
    })(KeyMod = exports.KeyMod || (exports.KeyMod = {}));
    function KeyChord(firstPart, secondPart) {
        const chordPart = ((secondPart & 0x0000FFFF) << 16) >>> 0;
        return (firstPart | chordPart) >>> 0;
    }
    exports.KeyChord = KeyChord;
    function createKeybinding(keybinding, OS) {
        if (keybinding === 0) {
            return null;
        }
        const firstPart = (keybinding & 0x0000FFFF) >>> 0;
        const chordPart = (keybinding & 0xFFFF0000) >>> 16;
        if (chordPart !== 0) {
            return new ChordKeybinding([
                createSimpleKeybinding(firstPart, OS),
                createSimpleKeybinding(chordPart, OS)
            ]);
        }
        return new ChordKeybinding([createSimpleKeybinding(firstPart, OS)]);
    }
    exports.createKeybinding = createKeybinding;
    function createSimpleKeybinding(keybinding, OS) {
        const ctrlCmd = (keybinding & 2048 /* CtrlCmd */ ? true : false);
        const winCtrl = (keybinding & 256 /* WinCtrl */ ? true : false);
        const ctrlKey = (OS === 2 /* Macintosh */ ? winCtrl : ctrlCmd);
        const shiftKey = (keybinding & 1024 /* Shift */ ? true : false);
        const altKey = (keybinding & 512 /* Alt */ ? true : false);
        const metaKey = (OS === 2 /* Macintosh */ ? ctrlCmd : winCtrl);
        const keyCode = (keybinding & 255 /* KeyCode */);
        return new SimpleKeybinding(ctrlKey, shiftKey, altKey, metaKey, keyCode);
    }
    exports.createSimpleKeybinding = createSimpleKeybinding;
    class SimpleKeybinding {
        constructor(ctrlKey, shiftKey, altKey, metaKey, keyCode) {
            this.ctrlKey = ctrlKey;
            this.shiftKey = shiftKey;
            this.altKey = altKey;
            this.metaKey = metaKey;
            this.keyCode = keyCode;
        }
        equals(other) {
            return (this.ctrlKey === other.ctrlKey
                && this.shiftKey === other.shiftKey
                && this.altKey === other.altKey
                && this.metaKey === other.metaKey
                && this.keyCode === other.keyCode);
        }
        getHashCode() {
            const ctrl = this.ctrlKey ? '1' : '0';
            const shift = this.shiftKey ? '1' : '0';
            const alt = this.altKey ? '1' : '0';
            const meta = this.metaKey ? '1' : '0';
            return `${ctrl}${shift}${alt}${meta}${this.keyCode}`;
        }
        isModifierKey() {
            return (this.keyCode === 0 /* Unknown */
                || this.keyCode === 5 /* Ctrl */
                || this.keyCode === 57 /* Meta */
                || this.keyCode === 6 /* Alt */
                || this.keyCode === 4 /* Shift */);
        }
        toChord() {
            return new ChordKeybinding([this]);
        }
        /**
         * Does this keybinding refer to the key code of a modifier and it also has the modifier flag?
         */
        isDuplicateModifierCase() {
            return ((this.ctrlKey && this.keyCode === 5 /* Ctrl */)
                || (this.shiftKey && this.keyCode === 4 /* Shift */)
                || (this.altKey && this.keyCode === 6 /* Alt */)
                || (this.metaKey && this.keyCode === 57 /* Meta */));
        }
    }
    exports.SimpleKeybinding = SimpleKeybinding;
    class ChordKeybinding {
        constructor(parts) {
            if (parts.length === 0) {
                throw errors_1.illegalArgument(`parts`);
            }
            this.parts = parts;
        }
        getHashCode() {
            let result = '';
            for (let i = 0, len = this.parts.length; i < len; i++) {
                if (i !== 0) {
                    result += ';';
                }
                result += this.parts[i].getHashCode();
            }
            return result;
        }
        equals(other) {
            if (other === null) {
                return false;
            }
            if (this.parts.length !== other.parts.length) {
                return false;
            }
            for (let i = 0; i < this.parts.length; i++) {
                if (!this.parts[i].equals(other.parts[i])) {
                    return false;
                }
            }
            return true;
        }
    }
    exports.ChordKeybinding = ChordKeybinding;
    class ResolvedKeybindingPart {
        constructor(ctrlKey, shiftKey, altKey, metaKey, kbLabel, kbAriaLabel) {
            this.ctrlKey = ctrlKey;
            this.shiftKey = shiftKey;
            this.altKey = altKey;
            this.metaKey = metaKey;
            this.keyLabel = kbLabel;
            this.keyAriaLabel = kbAriaLabel;
        }
    }
    exports.ResolvedKeybindingPart = ResolvedKeybindingPart;
    /**
     * A resolved keybinding. Can be a simple keybinding or a chord keybinding.
     */
    class ResolvedKeybinding {
    }
    exports.ResolvedKeybinding = ResolvedKeybinding;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[4/*vs/base/common/lifecycle*/], __M([0/*require*/,1/*exports*/,13/*vs/base/common/functional*/,21/*vs/base/common/iterator*/]), function (require, exports, functional_1, iterator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ImmortalReference = exports.ReferenceCollection = exports.MutableDisposable = exports.Disposable = exports.DisposableStore = exports.toDisposable = exports.combinedDisposable = exports.dispose = exports.isDisposable = exports.MultiDisposeError = void 0;
    /**
     * Enables logging of potentially leaked disposables.
     *
     * A disposable is considered leaked if it is not disposed or not registered as the child of
     * another disposable. This tracking is very simple an only works for classes that either
     * extend Disposable or use a DisposableStore. This means there are a lot of false positives.
     */
    const TRACK_DISPOSABLES = false;
    const __is_disposable_tracked__ = '__is_disposable_tracked__';
    function markTracked(x) {
        if (!TRACK_DISPOSABLES) {
            return;
        }
        if (x && x !== Disposable.None) {
            try {
                x[__is_disposable_tracked__] = true;
            }
            catch (_a) {
                // noop
            }
        }
    }
    function trackDisposable(x) {
        if (!TRACK_DISPOSABLES) {
            return x;
        }
        const stack = new Error('Potentially leaked disposable').stack;
        setTimeout(() => {
            if (!x[__is_disposable_tracked__]) {
                console.log(stack);
            }
        }, 3000);
        return x;
    }
    class MultiDisposeError extends Error {
        constructor(errors) {
            super(`Encounter errors while disposing of store. Errors: [${errors.join(', ')}]`);
            this.errors = errors;
        }
    }
    exports.MultiDisposeError = MultiDisposeError;
    function isDisposable(thing) {
        return typeof thing.dispose === 'function' && thing.dispose.length === 0;
    }
    exports.isDisposable = isDisposable;
    function dispose(arg) {
        if (iterator_1.Iterable.is(arg)) {
            let errors = [];
            for (const d of arg) {
                if (d) {
                    markTracked(d);
                    try {
                        d.dispose();
                    }
                    catch (e) {
                        errors.push(e);
                    }
                }
            }
            if (errors.length === 1) {
                throw errors[0];
            }
            else if (errors.length > 1) {
                throw new MultiDisposeError(errors);
            }
            return Array.isArray(arg) ? [] : arg;
        }
        else if (arg) {
            markTracked(arg);
            arg.dispose();
            return arg;
        }
    }
    exports.dispose = dispose;
    function combinedDisposable(...disposables) {
        disposables.forEach(markTracked);
        return trackDisposable({ dispose: () => dispose(disposables) });
    }
    exports.combinedDisposable = combinedDisposable;
    function toDisposable(fn) {
        const self = trackDisposable({
            dispose: () => {
                markTracked(self);
                fn();
            }
        });
        return self;
    }
    exports.toDisposable = toDisposable;
    class DisposableStore {
        constructor() {
            this._toDispose = new Set();
            this._isDisposed = false;
        }
        /**
         * Dispose of all registered disposables and mark this object as disposed.
         *
         * Any future disposables added to this object will be disposed of on `add`.
         */
        dispose() {
            if (this._isDisposed) {
                return;
            }
            markTracked(this);
            this._isDisposed = true;
            this.clear();
        }
        /**
         * Dispose of all registered disposables but do not mark this object as disposed.
         */
        clear() {
            try {
                dispose(this._toDispose.values());
            }
            finally {
                this._toDispose.clear();
            }
        }
        add(t) {
            if (!t) {
                return t;
            }
            if (t === this) {
                throw new Error('Cannot register a disposable on itself!');
            }
            markTracked(t);
            if (this._isDisposed) {
                if (!DisposableStore.DISABLE_DISPOSED_WARNING) {
                    console.warn(new Error('Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!').stack);
                }
            }
            else {
                this._toDispose.add(t);
            }
            return t;
        }
    }
    exports.DisposableStore = DisposableStore;
    DisposableStore.DISABLE_DISPOSED_WARNING = false;
    class Disposable {
        constructor() {
            this._store = new DisposableStore();
            trackDisposable(this);
        }
        dispose() {
            markTracked(this);
            this._store.dispose();
        }
        _register(t) {
            if (t === this) {
                throw new Error('Cannot register a disposable on itself!');
            }
            return this._store.add(t);
        }
    }
    exports.Disposable = Disposable;
    Disposable.None = Object.freeze({ dispose() { } });
    /**
     * Manages the lifecycle of a disposable value that may be changed.
     *
     * This ensures that when the disposable value is changed, the previously held disposable is disposed of. You can
     * also register a `MutableDisposable` on a `Disposable` to ensure it is automatically cleaned up.
     */
    class MutableDisposable {
        constructor() {
            this._isDisposed = false;
            trackDisposable(this);
        }
        get value() {
            return this._isDisposed ? undefined : this._value;
        }
        set value(value) {
            if (this._isDisposed || value === this._value) {
                return;
            }
            if (this._value) {
                this._value.dispose();
            }
            if (value) {
                markTracked(value);
            }
            this._value = value;
        }
        clear() {
            this.value = undefined;
        }
        dispose() {
            this._isDisposed = true;
            markTracked(this);
            if (this._value) {
                this._value.dispose();
            }
            this._value = undefined;
        }
    }
    exports.MutableDisposable = MutableDisposable;
    class ReferenceCollection {
        constructor() {
            this.references = new Map();
        }
        acquire(key, ...args) {
            let reference = this.references.get(key);
            if (!reference) {
                reference = { counter: 0, object: this.createReferencedObject(key, ...args) };
                this.references.set(key, reference);
            }
            const { object } = reference;
            const dispose = functional_1.once(() => {
                if (--reference.counter === 0) {
                    this.destroyReferencedObject(key, reference.object);
                    this.references.delete(key);
                }
            });
            reference.counter++;
            return { object, dispose };
        }
    }
    exports.ReferenceCollection = ReferenceCollection;
    class ImmortalReference {
        constructor(object) {
            this.object = object;
        }
        dispose() { }
    }
    exports.ImmortalReference = ImmortalReference;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[23/*vs/base/common/linkedList*/], __M([0/*require*/,1/*exports*/]), function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LinkedList = void 0;
    class Node {
        constructor(element) {
            this.element = element;
            this.next = Node.Undefined;
            this.prev = Node.Undefined;
        }
    }
    Node.Undefined = new Node(undefined);
    class LinkedList {
        constructor() {
            this._first = Node.Undefined;
            this._last = Node.Undefined;
            this._size = 0;
        }
        get size() {
            return this._size;
        }
        isEmpty() {
            return this._first === Node.Undefined;
        }
        clear() {
            this._first = Node.Undefined;
            this._last = Node.Undefined;
            this._size = 0;
        }
        unshift(element) {
            return this._insert(element, false);
        }
        push(element) {
            return this._insert(element, true);
        }
        _insert(element, atTheEnd) {
            const newNode = new Node(element);
            if (this._first === Node.Undefined) {
                this._first = newNode;
                this._last = newNode;
            }
            else if (atTheEnd) {
                // push
                const oldLast = this._last;
                this._last = newNode;
                newNode.prev = oldLast;
                oldLast.next = newNode;
            }
            else {
                // unshift
                const oldFirst = this._first;
                this._first = newNode;
                newNode.next = oldFirst;
                oldFirst.prev = newNode;
            }
            this._size += 1;
            let didRemove = false;
            return () => {
                if (!didRemove) {
                    didRemove = true;
                    this._remove(newNode);
                }
            };
        }
        shift() {
            if (this._first === Node.Undefined) {
                return undefined;
            }
            else {
                const res = this._first.element;
                this._remove(this._first);
                return res;
            }
        }
        pop() {
            if (this._last === Node.Undefined) {
                return undefined;
            }
            else {
                const res = this._last.element;
                this._remove(this._last);
                return res;
            }
        }
        _remove(node) {
            if (node.prev !== Node.Undefined && node.next !== Node.Undefined) {
                // middle
                const anchor = node.prev;
                anchor.next = node.next;
                node.next.prev = anchor;
            }
            else if (node.prev === Node.Undefined && node.next === Node.Undefined) {
                // only node
                this._first = Node.Undefined;
                this._last = Node.Undefined;
            }
            else if (node.next === Node.Undefined) {
                // last
                this._last = this._last.prev;
                this._last.next = Node.Undefined;
            }
            else if (node.prev === Node.Undefined) {
                // first
                this._first = this._first.next;
                this._first.prev = Node.Undefined;
            }
            // done
            this._size -= 1;
        }
        *[Symbol.iterator]() {
            let node = this._first;
            while (node !== Node.Undefined) {
                yield node.element;
                node = node.next;
            }
        }
        toArray() {
            const result = [];
            for (let node = this._first; node !== Node.Undefined; node = node.next) {
                result.push(node.element);
            }
            return result;
        }
    }
    exports.LinkedList = LinkedList;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[3/*vs/base/common/event*/], __M([0/*require*/,1/*exports*/,5/*vs/base/common/errors*/,13/*vs/base/common/functional*/,4/*vs/base/common/lifecycle*/,23/*vs/base/common/linkedList*/]), function (require, exports, errors_1, functional_1, lifecycle_1, linkedList_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Relay = exports.EventBufferer = exports.EventMultiplexer = exports.AsyncEmitter = exports.PauseableEmitter = exports.Emitter = exports.setGlobalLeakWarningThreshold = exports.Event = void 0;
    var Event;
    (function (Event) {
        Event.None = () => lifecycle_1.Disposable.None;
        /**
         * Given an event, returns another event which only fires once.
         */
        function once(event) {
            return (listener, thisArgs = null, disposables) => {
                // we need this, in case the event fires during the listener call
                let didFire = false;
                let result;
                result = event(e => {
                    if (didFire) {
                        return;
                    }
                    else if (result) {
                        result.dispose();
                    }
                    else {
                        didFire = true;
                    }
                    return listener.call(thisArgs, e);
                }, null, disposables);
                if (didFire) {
                    result.dispose();
                }
                return result;
            };
        }
        Event.once = once;
        /**
         * Given an event and a `map` function, returns another event which maps each element
         * through the mapping function.
         */
        function map(event, map) {
            return snapshot((listener, thisArgs = null, disposables) => event(i => listener.call(thisArgs, map(i)), null, disposables));
        }
        Event.map = map;
        /**
         * Given an event and an `each` function, returns another identical event and calls
         * the `each` function per each element.
         */
        function forEach(event, each) {
            return snapshot((listener, thisArgs = null, disposables) => event(i => { each(i); listener.call(thisArgs, i); }, null, disposables));
        }
        Event.forEach = forEach;
        function filter(event, filter) {
            return snapshot((listener, thisArgs = null, disposables) => event(e => filter(e) && listener.call(thisArgs, e), null, disposables));
        }
        Event.filter = filter;
        /**
         * Given an event, returns the same event but typed as `Event<void>`.
         */
        function signal(event) {
            return event;
        }
        Event.signal = signal;
        function any(...events) {
            return (listener, thisArgs = null, disposables) => lifecycle_1.combinedDisposable(...events.map(event => event(e => listener.call(thisArgs, e), null, disposables)));
        }
        Event.any = any;
        /**
         * Given an event and a `merge` function, returns another event which maps each element
         * and the cumulative result through the `merge` function. Similar to `map`, but with memory.
         */
        function reduce(event, merge, initial) {
            let output = initial;
            return map(event, e => {
                output = merge(output, e);
                return output;
            });
        }
        Event.reduce = reduce;
        /**
         * Given a chain of event processing functions (filter, map, etc), each
         * function will be invoked per event & per listener. Snapshotting an event
         * chain allows each function to be invoked just once per event.
         */
        function snapshot(event) {
            let listener;
            const emitter = new Emitter({
                onFirstListenerAdd() {
                    listener = event(emitter.fire, emitter);
                },
                onLastListenerRemove() {
                    listener.dispose();
                }
            });
            return emitter.event;
        }
        Event.snapshot = snapshot;
        function debounce(event, merge, delay = 100, leading = false, leakWarningThreshold) {
            let subscription;
            let output = undefined;
            let handle = undefined;
            let numDebouncedCalls = 0;
            const emitter = new Emitter({
                leakWarningThreshold,
                onFirstListenerAdd() {
                    subscription = event(cur => {
                        numDebouncedCalls++;
                        output = merge(output, cur);
                        if (leading && !handle) {
                            emitter.fire(output);
                            output = undefined;
                        }
                        clearTimeout(handle);
                        handle = setTimeout(() => {
                            const _output = output;
                            output = undefined;
                            handle = undefined;
                            if (!leading || numDebouncedCalls > 1) {
                                emitter.fire(_output);
                            }
                            numDebouncedCalls = 0;
                        }, delay);
                    });
                },
                onLastListenerRemove() {
                    subscription.dispose();
                }
            });
            return emitter.event;
        }
        Event.debounce = debounce;
        /**
         * Given an event, it returns another event which fires only once and as soon as
         * the input event emits. The event data is the number of millis it took for the
         * event to fire.
         */
        function stopwatch(event) {
            const start = new Date().getTime();
            return map(once(event), _ => new Date().getTime() - start);
        }
        Event.stopwatch = stopwatch;
        /**
         * Given an event, it returns another event which fires only when the event
         * element changes.
         */
        function latch(event) {
            let firstCall = true;
            let cache;
            return filter(event, value => {
                const shouldEmit = firstCall || value !== cache;
                firstCall = false;
                cache = value;
                return shouldEmit;
            });
        }
        Event.latch = latch;
        /**
         * Buffers the provided event until a first listener comes
         * along, at which point fire all the events at once and
         * pipe the event from then on.
         *
         * ```typescript
         * const emitter = new Emitter<number>();
         * const event = emitter.event;
         * const bufferedEvent = buffer(event);
         *
         * emitter.fire(1);
         * emitter.fire(2);
         * emitter.fire(3);
         * // nothing...
         *
         * const listener = bufferedEvent(num => console.log(num));
         * // 1, 2, 3
         *
         * emitter.fire(4);
         * // 4
         * ```
         */
        function buffer(event, nextTick = false, _buffer = []) {
            let buffer = _buffer.slice();
            let listener = event(e => {
                if (buffer) {
                    buffer.push(e);
                }
                else {
                    emitter.fire(e);
                }
            });
            const flush = () => {
                if (buffer) {
                    buffer.forEach(e => emitter.fire(e));
                }
                buffer = null;
            };
            const emitter = new Emitter({
                onFirstListenerAdd() {
                    if (!listener) {
                        listener = event(e => emitter.fire(e));
                    }
                },
                onFirstListenerDidAdd() {
                    if (buffer) {
                        if (nextTick) {
                            setTimeout(flush);
                        }
                        else {
                            flush();
                        }
                    }
                },
                onLastListenerRemove() {
                    if (listener) {
                        listener.dispose();
                    }
                    listener = null;
                }
            });
            return emitter.event;
        }
        Event.buffer = buffer;
        class ChainableEvent {
            constructor(event) {
                this.event = event;
            }
            map(fn) {
                return new ChainableEvent(map(this.event, fn));
            }
            forEach(fn) {
                return new ChainableEvent(forEach(this.event, fn));
            }
            filter(fn) {
                return new ChainableEvent(filter(this.event, fn));
            }
            reduce(merge, initial) {
                return new ChainableEvent(reduce(this.event, merge, initial));
            }
            latch() {
                return new ChainableEvent(latch(this.event));
            }
            debounce(merge, delay = 100, leading = false, leakWarningThreshold) {
                return new ChainableEvent(debounce(this.event, merge, delay, leading, leakWarningThreshold));
            }
            on(listener, thisArgs, disposables) {
                return this.event(listener, thisArgs, disposables);
            }
            once(listener, thisArgs, disposables) {
                return once(this.event)(listener, thisArgs, disposables);
            }
        }
        function chain(event) {
            return new ChainableEvent(event);
        }
        Event.chain = chain;
        function fromNodeEventEmitter(emitter, eventName, map = id => id) {
            const fn = (...args) => result.fire(map(...args));
            const onFirstListenerAdd = () => emitter.on(eventName, fn);
            const onLastListenerRemove = () => emitter.removeListener(eventName, fn);
            const result = new Emitter({ onFirstListenerAdd, onLastListenerRemove });
            return result.event;
        }
        Event.fromNodeEventEmitter = fromNodeEventEmitter;
        function fromDOMEventEmitter(emitter, eventName, map = id => id) {
            const fn = (...args) => result.fire(map(...args));
            const onFirstListenerAdd = () => emitter.addEventListener(eventName, fn);
            const onLastListenerRemove = () => emitter.removeEventListener(eventName, fn);
            const result = new Emitter({ onFirstListenerAdd, onLastListenerRemove });
            return result.event;
        }
        Event.fromDOMEventEmitter = fromDOMEventEmitter;
        function fromPromise(promise) {
            const emitter = new Emitter();
            let shouldEmit = false;
            promise
                .then(undefined, () => null)
                .then(() => {
                if (!shouldEmit) {
                    setTimeout(() => emitter.fire(undefined), 0);
                }
                else {
                    emitter.fire(undefined);
                }
            });
            shouldEmit = true;
            return emitter.event;
        }
        Event.fromPromise = fromPromise;
        function toPromise(event) {
            return new Promise(c => once(event)(c));
        }
        Event.toPromise = toPromise;
    })(Event = exports.Event || (exports.Event = {}));
    let _globalLeakWarningThreshold = -1;
    function setGlobalLeakWarningThreshold(n) {
        const oldValue = _globalLeakWarningThreshold;
        _globalLeakWarningThreshold = n;
        return {
            dispose() {
                _globalLeakWarningThreshold = oldValue;
            }
        };
    }
    exports.setGlobalLeakWarningThreshold = setGlobalLeakWarningThreshold;
    class LeakageMonitor {
        constructor(customThreshold, name = Math.random().toString(18).slice(2, 5)) {
            this.customThreshold = customThreshold;
            this.name = name;
            this._warnCountdown = 0;
        }
        dispose() {
            if (this._stacks) {
                this._stacks.clear();
            }
        }
        check(listenerCount) {
            let threshold = _globalLeakWarningThreshold;
            if (typeof this.customThreshold === 'number') {
                threshold = this.customThreshold;
            }
            if (threshold <= 0 || listenerCount < threshold) {
                return undefined;
            }
            if (!this._stacks) {
                this._stacks = new Map();
            }
            const stack = new Error().stack.split('\n').slice(3).join('\n');
            const count = (this._stacks.get(stack) || 0);
            this._stacks.set(stack, count + 1);
            this._warnCountdown -= 1;
            if (this._warnCountdown <= 0) {
                // only warn on first exceed and then every time the limit
                // is exceeded by 50% again
                this._warnCountdown = threshold * 0.5;
                // find most frequent listener and print warning
                let topStack;
                let topCount = 0;
                for (const [stack, count] of this._stacks) {
                    if (!topStack || topCount < count) {
                        topStack = stack;
                        topCount = count;
                    }
                }
                console.warn(`[${this.name}] potential listener LEAK detected, having ${listenerCount} listeners already. MOST frequent listener (${topCount}):`);
                console.warn(topStack);
            }
            return () => {
                const count = (this._stacks.get(stack) || 0);
                this._stacks.set(stack, count - 1);
            };
        }
    }
    /**
     * The Emitter can be used to expose an Event to the public
     * to fire it from the insides.
     * Sample:
        class Document {
    
            private readonly _onDidChange = new Emitter<(value:string)=>any>();
    
            public onDidChange = this._onDidChange.event;
    
            // getter-style
            // get onDidChange(): Event<(value:string)=>any> {
            // 	return this._onDidChange.event;
            // }
    
            private _doIt() {
                //...
                this._onDidChange.fire(value);
            }
        }
     */
    class Emitter {
        constructor(options) {
            this._disposed = false;
            this._options = options;
            this._leakageMon = _globalLeakWarningThreshold > 0
                ? new LeakageMonitor(this._options && this._options.leakWarningThreshold)
                : undefined;
        }
        /**
         * For the public to allow to subscribe
         * to events from this Emitter
         */
        get event() {
            if (!this._event) {
                this._event = (listener, thisArgs, disposables) => {
                    if (!this._listeners) {
                        this._listeners = new linkedList_1.LinkedList();
                    }
                    const firstListener = this._listeners.isEmpty();
                    if (firstListener && this._options && this._options.onFirstListenerAdd) {
                        this._options.onFirstListenerAdd(this);
                    }
                    const remove = this._listeners.push(!thisArgs ? listener : [listener, thisArgs]);
                    if (firstListener && this._options && this._options.onFirstListenerDidAdd) {
                        this._options.onFirstListenerDidAdd(this);
                    }
                    if (this._options && this._options.onListenerDidAdd) {
                        this._options.onListenerDidAdd(this, listener, thisArgs);
                    }
                    // check and record this emitter for potential leakage
                    let removeMonitor;
                    if (this._leakageMon) {
                        removeMonitor = this._leakageMon.check(this._listeners.size);
                    }
                    let result;
                    result = {
                        dispose: () => {
                            if (removeMonitor) {
                                removeMonitor();
                            }
                            result.dispose = Emitter._noop;
                            if (!this._disposed) {
                                remove();
                                if (this._options && this._options.onLastListenerRemove) {
                                    const hasListeners = (this._listeners && !this._listeners.isEmpty());
                                    if (!hasListeners) {
                                        this._options.onLastListenerRemove(this);
                                    }
                                }
                            }
                        }
                    };
                    if (disposables instanceof lifecycle_1.DisposableStore) {
                        disposables.add(result);
                    }
                    else if (Array.isArray(disposables)) {
                        disposables.push(result);
                    }
                    return result;
                };
            }
            return this._event;
        }
        /**
         * To be kept private to fire an event to
         * subscribers
         */
        fire(event) {
            if (this._listeners) {
                // put all [listener,event]-pairs into delivery queue
                // then emit all event. an inner/nested event might be
                // the driver of this
                if (!this._deliveryQueue) {
                    this._deliveryQueue = new linkedList_1.LinkedList();
                }
                for (let listener of this._listeners) {
                    this._deliveryQueue.push([listener, event]);
                }
                while (this._deliveryQueue.size > 0) {
                    const [listener, event] = this._deliveryQueue.shift();
                    try {
                        if (typeof listener === 'function') {
                            listener.call(undefined, event);
                        }
                        else {
                            listener[0].call(listener[1], event);
                        }
                    }
                    catch (e) {
                        errors_1.onUnexpectedError(e);
                    }
                }
            }
        }
        dispose() {
            if (this._listeners) {
                this._listeners.clear();
            }
            if (this._deliveryQueue) {
                this._deliveryQueue.clear();
            }
            if (this._leakageMon) {
                this._leakageMon.dispose();
            }
            this._disposed = true;
        }
    }
    exports.Emitter = Emitter;
    Emitter._noop = function () { };
    class PauseableEmitter extends Emitter {
        constructor(options) {
            super(options);
            this._isPaused = 0;
            this._eventQueue = new linkedList_1.LinkedList();
            this._mergeFn = options && options.merge;
        }
        pause() {
            this._isPaused++;
        }
        resume() {
            if (this._isPaused !== 0 && --this._isPaused === 0) {
                if (this._mergeFn) {
                    // use the merge function to create a single composite
                    // event. make a copy in case firing pauses this emitter
                    const events = this._eventQueue.toArray();
                    this._eventQueue.clear();
                    super.fire(this._mergeFn(events));
                }
                else {
                    // no merging, fire each event individually and test
                    // that this emitter isn't paused halfway through
                    while (!this._isPaused && this._eventQueue.size !== 0) {
                        super.fire(this._eventQueue.shift());
                    }
                }
            }
        }
        fire(event) {
            if (this._listeners) {
                if (this._isPaused !== 0) {
                    this._eventQueue.push(event);
                }
                else {
                    super.fire(event);
                }
            }
        }
    }
    exports.PauseableEmitter = PauseableEmitter;
    class AsyncEmitter extends Emitter {
        async fireAsync(data, token, promiseJoin) {
            if (!this._listeners) {
                return;
            }
            if (!this._asyncDeliveryQueue) {
                this._asyncDeliveryQueue = new linkedList_1.LinkedList();
            }
            for (const listener of this._listeners) {
                this._asyncDeliveryQueue.push([listener, data]);
            }
            while (this._asyncDeliveryQueue.size > 0 && !token.isCancellationRequested) {
                const [listener, data] = this._asyncDeliveryQueue.shift();
                const thenables = [];
                const event = Object.assign(Object.assign({}, data), { waitUntil: (p) => {
                        if (Object.isFrozen(thenables)) {
                            throw new Error('waitUntil can NOT be called asynchronous');
                        }
                        if (promiseJoin) {
                            p = promiseJoin(p, typeof listener === 'function' ? listener : listener[0]);
                        }
                        thenables.push(p);
                    } });
                try {
                    if (typeof listener === 'function') {
                        listener.call(undefined, event);
                    }
                    else {
                        listener[0].call(listener[1], event);
                    }
                }
                catch (e) {
                    errors_1.onUnexpectedError(e);
                    continue;
                }
                // freeze thenables-collection to enforce sync-calls to
                // wait until and then wait for all thenables to resolve
                Object.freeze(thenables);
                await Promise.all(thenables).catch(e => errors_1.onUnexpectedError(e));
            }
        }
    }
    exports.AsyncEmitter = AsyncEmitter;
    class EventMultiplexer {
        constructor() {
            this.hasListeners = false;
            this.events = [];
            this.emitter = new Emitter({
                onFirstListenerAdd: () => this.onFirstListenerAdd(),
                onLastListenerRemove: () => this.onLastListenerRemove()
            });
        }
        get event() {
            return this.emitter.event;
        }
        add(event) {
            const e = { event: event, listener: null };
            this.events.push(e);
            if (this.hasListeners) {
                this.hook(e);
            }
            const dispose = () => {
                if (this.hasListeners) {
                    this.unhook(e);
                }
                const idx = this.events.indexOf(e);
                this.events.splice(idx, 1);
            };
            return lifecycle_1.toDisposable(functional_1.once(dispose));
        }
        onFirstListenerAdd() {
            this.hasListeners = true;
            this.events.forEach(e => this.hook(e));
        }
        onLastListenerRemove() {
            this.hasListeners = false;
            this.events.forEach(e => this.unhook(e));
        }
        hook(e) {
            e.listener = e.event(r => this.emitter.fire(r));
        }
        unhook(e) {
            if (e.listener) {
                e.listener.dispose();
            }
            e.listener = null;
        }
        dispose() {
            this.emitter.dispose();
        }
    }
    exports.EventMultiplexer = EventMultiplexer;
    /**
     * The EventBufferer is useful in situations in which you want
     * to delay firing your events during some code.
     * You can wrap that code and be sure that the event will not
     * be fired during that wrap.
     *
     * ```
     * const emitter: Emitter;
     * const delayer = new EventDelayer();
     * const delayedEvent = delayer.wrapEvent(emitter.event);
     *
     * delayedEvent(console.log);
     *
     * delayer.bufferEvents(() => {
     *   emitter.fire(); // event will not be fired yet
     * });
     *
     * // event will only be fired at this point
     * ```
     */
    class EventBufferer {
        constructor() {
            this.buffers = [];
        }
        wrapEvent(event) {
            return (listener, thisArgs, disposables) => {
                return event(i => {
                    const buffer = this.buffers[this.buffers.length - 1];
                    if (buffer) {
                        buffer.push(() => listener.call(thisArgs, i));
                    }
                    else {
                        listener.call(thisArgs, i);
                    }
                }, undefined, disposables);
            };
        }
        bufferEvents(fn) {
            const buffer = [];
            this.buffers.push(buffer);
            const r = fn();
            this.buffers.pop();
            buffer.forEach(flush => flush());
            return r;
        }
    }
    exports.EventBufferer = EventBufferer;
    /**
     * A Relay is an event forwarder which functions as a replugabble event pipe.
     * Once created, you can connect an input event to it and it will simply forward
     * events from that input event through its own `event` property. The `input`
     * can be changed at any point in time.
     */
    class Relay {
        constructor() {
            this.listening = false;
            this.inputEvent = Event.None;
            this.inputEventListener = lifecycle_1.Disposable.None;
            this.emitter = new Emitter({
                onFirstListenerDidAdd: () => {
                    this.listening = true;
                    this.inputEventListener = this.inputEvent(this.emitter.fire, this.emitter);
                },
                onLastListenerRemove: () => {
                    this.listening = false;
                    this.inputEventListener.dispose();
                }
            });
            this.event = this.emitter.event;
        }
        set input(event) {
            this.inputEvent = event;
            if (this.listening) {
                this.inputEventListener.dispose();
                this.inputEventListener = event(this.emitter.fire, this.emitter);
            }
        }
        dispose() {
            this.inputEventListener.dispose();
            this.emitter.dispose();
        }
    }
    exports.Relay = Relay;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[7/*vs/base/browser/browser*/], __M([0/*require*/,1/*exports*/,3/*vs/base/common/event*/]), function (require, exports, event_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isStandalone = exports.isEdgeWebView = exports.isIPad = exports.isWebkitWebView = exports.isSafari = exports.isChrome = exports.isWebKit = exports.isFirefox = exports.isOpera = exports.isEdge = exports.onDidChangeFullscreen = exports.isFullscreen = exports.setFullscreen = exports.getPixelRatio = exports.setZoomFactor = exports.getZoomFactor = exports.onDidChangeZoomLevel = exports.getTimeSinceLastZoomLevelChanged = exports.getZoomLevel = exports.setZoomLevel = void 0;
    class WindowManager {
        constructor() {
            // --- Zoom Level
            this._zoomLevel = 0;
            this._lastZoomLevelChangeTime = 0;
            this._onDidChangeZoomLevel = new event_1.Emitter();
            this.onDidChangeZoomLevel = this._onDidChangeZoomLevel.event;
            // --- Zoom Factor
            this._zoomFactor = 1;
            // --- Fullscreen
            this._fullscreen = false;
            this._onDidChangeFullscreen = new event_1.Emitter();
            this.onDidChangeFullscreen = this._onDidChangeFullscreen.event;
        }
        getZoomLevel() {
            return this._zoomLevel;
        }
        getTimeSinceLastZoomLevelChanged() {
            return Date.now() - this._lastZoomLevelChangeTime;
        }
        setZoomLevel(zoomLevel, isTrusted) {
            if (this._zoomLevel === zoomLevel) {
                return;
            }
            this._zoomLevel = zoomLevel;
            // See https://github.com/microsoft/vscode/issues/26151
            this._lastZoomLevelChangeTime = isTrusted ? 0 : Date.now();
            this._onDidChangeZoomLevel.fire(this._zoomLevel);
        }
        getZoomFactor() {
            return this._zoomFactor;
        }
        setZoomFactor(zoomFactor) {
            this._zoomFactor = zoomFactor;
        }
        // --- Pixel Ratio
        getPixelRatio() {
            let ctx = document.createElement('canvas').getContext('2d');
            let dpr = window.devicePixelRatio || 1;
            let bsr = ctx.webkitBackingStorePixelRatio ||
                ctx.mozBackingStorePixelRatio ||
                ctx.msBackingStorePixelRatio ||
                ctx.oBackingStorePixelRatio ||
                ctx.backingStorePixelRatio || 1;
            return dpr / bsr;
        }
        setFullscreen(fullscreen) {
            if (this._fullscreen === fullscreen) {
                return;
            }
            this._fullscreen = fullscreen;
            this._onDidChangeFullscreen.fire();
        }
        isFullscreen() {
            return this._fullscreen;
        }
    }
    WindowManager.INSTANCE = new WindowManager();
    /** A zoom index, e.g. 1, 2, 3 */
    function setZoomLevel(zoomLevel, isTrusted) {
        WindowManager.INSTANCE.setZoomLevel(zoomLevel, isTrusted);
    }
    exports.setZoomLevel = setZoomLevel;
    function getZoomLevel() {
        return WindowManager.INSTANCE.getZoomLevel();
    }
    exports.getZoomLevel = getZoomLevel;
    /** Returns the time (in ms) since the zoom level was changed */
    function getTimeSinceLastZoomLevelChanged() {
        return WindowManager.INSTANCE.getTimeSinceLastZoomLevelChanged();
    }
    exports.getTimeSinceLastZoomLevelChanged = getTimeSinceLastZoomLevelChanged;
    function onDidChangeZoomLevel(callback) {
        return WindowManager.INSTANCE.onDidChangeZoomLevel(callback);
    }
    exports.onDidChangeZoomLevel = onDidChangeZoomLevel;
    /** The zoom scale for an index, e.g. 1, 1.2, 1.4 */
    function getZoomFactor() {
        return WindowManager.INSTANCE.getZoomFactor();
    }
    exports.getZoomFactor = getZoomFactor;
    function setZoomFactor(zoomFactor) {
        WindowManager.INSTANCE.setZoomFactor(zoomFactor);
    }
    exports.setZoomFactor = setZoomFactor;
    function getPixelRatio() {
        return WindowManager.INSTANCE.getPixelRatio();
    }
    exports.getPixelRatio = getPixelRatio;
    function setFullscreen(fullscreen) {
        WindowManager.INSTANCE.setFullscreen(fullscreen);
    }
    exports.setFullscreen = setFullscreen;
    function isFullscreen() {
        return WindowManager.INSTANCE.isFullscreen();
    }
    exports.isFullscreen = isFullscreen;
    exports.onDidChangeFullscreen = WindowManager.INSTANCE.onDidChangeFullscreen;
    const userAgent = navigator.userAgent;
    exports.isEdge = (userAgent.indexOf('Edge/') >= 0);
    exports.isOpera = (userAgent.indexOf('Opera') >= 0);
    exports.isFirefox = (userAgent.indexOf('Firefox') >= 0);
    exports.isWebKit = (userAgent.indexOf('AppleWebKit') >= 0);
    exports.isChrome = (userAgent.indexOf('Chrome') >= 0);
    exports.isSafari = (!exports.isChrome && (userAgent.indexOf('Safari') >= 0));
    exports.isWebkitWebView = (!exports.isChrome && !exports.isSafari && exports.isWebKit);
    exports.isIPad = (userAgent.indexOf('iPad') >= 0 || (exports.isSafari && navigator.maxTouchPoints > 0));
    exports.isEdgeWebView = exports.isEdge && (userAgent.indexOf('WebView/') >= 0);
    exports.isStandalone = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[24/*vs/base/browser/event*/], __M([0/*require*/,1/*exports*/,3/*vs/base/common/event*/]), function (require, exports, event_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.stop = exports.domEvent = void 0;
    const domEvent = (element, type, useCapture) => {
        const fn = (e) => emitter.fire(e);
        const emitter = new event_1.Emitter({
            onFirstListenerAdd: () => {
                element.addEventListener(type, fn, useCapture);
            },
            onLastListenerRemove: () => {
                element.removeEventListener(type, fn, useCapture);
            }
        });
        return emitter.event;
    };
    exports.domEvent = domEvent;
    function stop(event) {
        return event_1.Event.map(event, e => {
            e.preventDefault();
            e.stopPropagation();
            return e;
        });
    }
    exports.stop = stop;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[14/*vs/base/common/cancellation*/], __M([0/*require*/,1/*exports*/,3/*vs/base/common/event*/]), function (require, exports, event_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CancellationTokenSource = exports.CancellationToken = void 0;
    const shortcutEvent = Object.freeze(function (callback, context) {
        const handle = setTimeout(callback.bind(context), 0);
        return { dispose() { clearTimeout(handle); } };
    });
    var CancellationToken;
    (function (CancellationToken) {
        function isCancellationToken(thing) {
            if (thing === CancellationToken.None || thing === CancellationToken.Cancelled) {
                return true;
            }
            if (thing instanceof MutableToken) {
                return true;
            }
            if (!thing || typeof thing !== 'object') {
                return false;
            }
            return typeof thing.isCancellationRequested === 'boolean'
                && typeof thing.onCancellationRequested === 'function';
        }
        CancellationToken.isCancellationToken = isCancellationToken;
        CancellationToken.None = Object.freeze({
            isCancellationRequested: false,
            onCancellationRequested: event_1.Event.None
        });
        CancellationToken.Cancelled = Object.freeze({
            isCancellationRequested: true,
            onCancellationRequested: shortcutEvent
        });
    })(CancellationToken = exports.CancellationToken || (exports.CancellationToken = {}));
    class MutableToken {
        constructor() {
            this._isCancelled = false;
            this._emitter = null;
        }
        cancel() {
            if (!this._isCancelled) {
                this._isCancelled = true;
                if (this._emitter) {
                    this._emitter.fire(undefined);
                    this.dispose();
                }
            }
        }
        get isCancellationRequested() {
            return this._isCancelled;
        }
        get onCancellationRequested() {
            if (this._isCancelled) {
                return shortcutEvent;
            }
            if (!this._emitter) {
                this._emitter = new event_1.Emitter();
            }
            return this._emitter.event;
        }
        dispose() {
            if (this._emitter) {
                this._emitter.dispose();
                this._emitter = null;
            }
        }
    }
    class CancellationTokenSource {
        constructor(parent) {
            this._token = undefined;
            this._parentListener = undefined;
            this._parentListener = parent && parent.onCancellationRequested(this.cancel, this);
        }
        get token() {
            if (!this._token) {
                // be lazy and create the token only when
                // actually needed
                this._token = new MutableToken();
            }
            return this._token;
        }
        cancel() {
            if (!this._token) {
                // save an object by returning the default
                // cancelled token when cancellation happens
                // before someone asks for the token
                this._token = CancellationToken.Cancelled;
            }
            else if (this._token instanceof MutableToken) {
                // actually cancel
                this._token.cancel();
            }
        }
        dispose(cancel = false) {
            if (cancel) {
                this.cancel();
            }
            if (this._parentListener) {
                this._parentListener.dispose();
            }
            if (!this._token) {
                // ensure to initialize with an empty token if we had none
                this._token = CancellationToken.None;
            }
            else if (this._token instanceof MutableToken) {
                // actually dispose
                this._token.dispose();
            }
        }
    }
    exports.CancellationTokenSource = CancellationTokenSource;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[15/*vs/base/common/async*/], __M([0/*require*/,1/*exports*/,14/*vs/base/common/cancellation*/,5/*vs/base/common/errors*/,3/*vs/base/common/event*/,4/*vs/base/common/lifecycle*/]), function (require, exports, cancellation_1, errors, event_1, lifecycle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TaskSequentializer = exports.retry = exports.IdleValue = exports.runWhenIdle = exports.RunOnceWorker = exports.RunOnceScheduler = exports.IntervalTimer = exports.TimeoutTimer = exports.ResourceQueue = exports.Queue = exports.Limiter = exports.first = exports.sequence = exports.ignoreErrors = exports.disposableTimeout = exports.timeout = exports.Barrier = exports.ThrottledDelayer = exports.Delayer = exports.SequencerByKey = exports.Sequencer = exports.Throttler = exports.asPromise = exports.raceTimeout = exports.raceCancellablePromises = exports.raceCancellation = exports.createCancelablePromise = exports.isThenable = void 0;
    function isThenable(obj) {
        return obj && typeof obj.then === 'function';
    }
    exports.isThenable = isThenable;
    function createCancelablePromise(callback) {
        const source = new cancellation_1.CancellationTokenSource();
        const thenable = callback(source.token);
        const promise = new Promise((resolve, reject) => {
            source.token.onCancellationRequested(() => {
                reject(errors.canceled());
            });
            Promise.resolve(thenable).then(value => {
                source.dispose();
                resolve(value);
            }, err => {
                source.dispose();
                reject(err);
            });
        });
        return new class {
            cancel() {
                source.cancel();
            }
            then(resolve, reject) {
                return promise.then(resolve, reject);
            }
            catch(reject) {
                return this.then(undefined, reject);
            }
            finally(onfinally) {
                return promise.finally(onfinally);
            }
        };
    }
    exports.createCancelablePromise = createCancelablePromise;
    function raceCancellation(promise, token, defaultValue) {
        return Promise.race([promise, new Promise(resolve => token.onCancellationRequested(() => resolve(defaultValue)))]);
    }
    exports.raceCancellation = raceCancellation;
    /**
     * Returns as soon as one of the promises is resolved and cancels remaining promises
     */
    async function raceCancellablePromises(cancellablePromises) {
        let resolvedPromiseIndex = -1;
        const promises = cancellablePromises.map((promise, index) => promise.then(result => { resolvedPromiseIndex = index; return result; }));
        const result = await Promise.race(promises);
        cancellablePromises.forEach((cancellablePromise, index) => {
            if (index !== resolvedPromiseIndex) {
                cancellablePromise.cancel();
            }
        });
        return result;
    }
    exports.raceCancellablePromises = raceCancellablePromises;
    function raceTimeout(promise, timeout, onTimeout) {
        let promiseResolve = undefined;
        const timer = setTimeout(() => {
            promiseResolve === null || promiseResolve === void 0 ? void 0 : promiseResolve(undefined);
            onTimeout === null || onTimeout === void 0 ? void 0 : onTimeout();
        }, timeout);
        return Promise.race([
            promise.finally(() => clearTimeout(timer)),
            new Promise(resolve => promiseResolve = resolve)
        ]);
    }
    exports.raceTimeout = raceTimeout;
    function asPromise(callback) {
        return new Promise((resolve, reject) => {
            const item = callback();
            if (isThenable(item)) {
                item.then(resolve, reject);
            }
            else {
                resolve(item);
            }
        });
    }
    exports.asPromise = asPromise;
    /**
     * A helper to prevent accumulation of sequential async tasks.
     *
     * Imagine a mail man with the sole task of delivering letters. As soon as
     * a letter submitted for delivery, he drives to the destination, delivers it
     * and returns to his base. Imagine that during the trip, N more letters were submitted.
     * When the mail man returns, he picks those N letters and delivers them all in a
     * single trip. Even though N+1 submissions occurred, only 2 deliveries were made.
     *
     * The throttler implements this via the queue() method, by providing it a task
     * factory. Following the example:
     *
     * 		const throttler = new Throttler();
     * 		const letters = [];
     *
     * 		function deliver() {
     * 			const lettersToDeliver = letters;
     * 			letters = [];
     * 			return makeTheTrip(lettersToDeliver);
     * 		}
     *
     * 		function onLetterReceived(l) {
     * 			letters.push(l);
     * 			throttler.queue(deliver);
     * 		}
     */
    class Throttler {
        constructor() {
            this.activePromise = null;
            this.queuedPromise = null;
            this.queuedPromiseFactory = null;
        }
        queue(promiseFactory) {
            if (this.activePromise) {
                this.queuedPromiseFactory = promiseFactory;
                if (!this.queuedPromise) {
                    const onComplete = () => {
                        this.queuedPromise = null;
                        const result = this.queue(this.queuedPromiseFactory);
                        this.queuedPromiseFactory = null;
                        return result;
                    };
                    this.queuedPromise = new Promise(c => {
                        this.activePromise.then(onComplete, onComplete).then(c);
                    });
                }
                return new Promise((c, e) => {
                    this.queuedPromise.then(c, e);
                });
            }
            this.activePromise = promiseFactory();
            return new Promise((c, e) => {
                this.activePromise.then((result) => {
                    this.activePromise = null;
                    c(result);
                }, (err) => {
                    this.activePromise = null;
                    e(err);
                });
            });
        }
    }
    exports.Throttler = Throttler;
    class Sequencer {
        constructor() {
            this.current = Promise.resolve(null);
        }
        queue(promiseTask) {
            return this.current = this.current.then(() => promiseTask());
        }
    }
    exports.Sequencer = Sequencer;
    class SequencerByKey {
        constructor() {
            this.promiseMap = new Map();
        }
        queue(key, promiseTask) {
            var _a;
            const runningPromise = (_a = this.promiseMap.get(key)) !== null && _a !== void 0 ? _a : Promise.resolve();
            const newPromise = runningPromise
                .catch(() => { })
                .then(promiseTask)
                .finally(() => {
                if (this.promiseMap.get(key) === newPromise) {
                    this.promiseMap.delete(key);
                }
            });
            this.promiseMap.set(key, newPromise);
            return newPromise;
        }
    }
    exports.SequencerByKey = SequencerByKey;
    /**
     * A helper to delay execution of a task that is being requested often.
     *
     * Following the throttler, now imagine the mail man wants to optimize the number of
     * trips proactively. The trip itself can be long, so he decides not to make the trip
     * as soon as a letter is submitted. Instead he waits a while, in case more
     * letters are submitted. After said waiting period, if no letters were submitted, he
     * decides to make the trip. Imagine that N more letters were submitted after the first
     * one, all within a short period of time between each other. Even though N+1
     * submissions occurred, only 1 delivery was made.
     *
     * The delayer offers this behavior via the trigger() method, into which both the task
     * to be executed and the waiting period (delay) must be passed in as arguments. Following
     * the example:
     *
     * 		const delayer = new Delayer(WAITING_PERIOD);
     * 		const letters = [];
     *
     * 		function letterReceived(l) {
     * 			letters.push(l);
     * 			delayer.trigger(() => { return makeTheTrip(); });
     * 		}
     */
    class Delayer {
        constructor(defaultDelay) {
            this.defaultDelay = defaultDelay;
            this.timeout = null;
            this.completionPromise = null;
            this.doResolve = null;
            this.doReject = null;
            this.task = null;
        }
        trigger(task, delay = this.defaultDelay) {
            this.task = task;
            this.cancelTimeout();
            if (!this.completionPromise) {
                this.completionPromise = new Promise((c, e) => {
                    this.doResolve = c;
                    this.doReject = e;
                }).then(() => {
                    this.completionPromise = null;
                    this.doResolve = null;
                    if (this.task) {
                        const task = this.task;
                        this.task = null;
                        return task();
                    }
                    return undefined;
                });
            }
            this.timeout = setTimeout(() => {
                this.timeout = null;
                if (this.doResolve) {
                    this.doResolve(null);
                }
            }, delay);
            return this.completionPromise;
        }
        isTriggered() {
            return this.timeout !== null;
        }
        cancel() {
            this.cancelTimeout();
            if (this.completionPromise) {
                if (this.doReject) {
                    this.doReject(errors.canceled());
                }
                this.completionPromise = null;
            }
        }
        cancelTimeout() {
            if (this.timeout !== null) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }
        }
        dispose() {
            this.cancelTimeout();
        }
    }
    exports.Delayer = Delayer;
    /**
     * A helper to delay execution of a task that is being requested often, while
     * preventing accumulation of consecutive executions, while the task runs.
     *
     * The mail man is clever and waits for a certain amount of time, before going
     * out to deliver letters. While the mail man is going out, more letters arrive
     * and can only be delivered once he is back. Once he is back the mail man will
     * do one more trip to deliver the letters that have accumulated while he was out.
     */
    class ThrottledDelayer {
        constructor(defaultDelay) {
            this.delayer = new Delayer(defaultDelay);
            this.throttler = new Throttler();
        }
        trigger(promiseFactory, delay) {
            return this.delayer.trigger(() => this.throttler.queue(promiseFactory), delay);
        }
        isTriggered() {
            return this.delayer.isTriggered();
        }
        cancel() {
            this.delayer.cancel();
        }
        dispose() {
            this.delayer.dispose();
        }
    }
    exports.ThrottledDelayer = ThrottledDelayer;
    /**
     * A barrier that is initially closed and then becomes opened permanently.
     */
    class Barrier {
        constructor() {
            this._isOpen = false;
            this._promise = new Promise((c, e) => {
                this._completePromise = c;
            });
        }
        isOpen() {
            return this._isOpen;
        }
        open() {
            this._isOpen = true;
            this._completePromise(true);
        }
        wait() {
            return this._promise;
        }
    }
    exports.Barrier = Barrier;
    function timeout(millis, token) {
        if (!token) {
            return createCancelablePromise(token => timeout(millis, token));
        }
        return new Promise((resolve, reject) => {
            const handle = setTimeout(resolve, millis);
            token.onCancellationRequested(() => {
                clearTimeout(handle);
                reject(errors.canceled());
            });
        });
    }
    exports.timeout = timeout;
    function disposableTimeout(handler, timeout = 0) {
        const timer = setTimeout(handler, timeout);
        return lifecycle_1.toDisposable(() => clearTimeout(timer));
    }
    exports.disposableTimeout = disposableTimeout;
    function ignoreErrors(promise) {
        return promise.then(undefined, _ => undefined);
    }
    exports.ignoreErrors = ignoreErrors;
    /**
     * Runs the provided list of promise factories in sequential order. The returned
     * promise will complete to an array of results from each promise.
     */
    function sequence(promiseFactories) {
        const results = [];
        let index = 0;
        const len = promiseFactories.length;
        function next() {
            return index < len ? promiseFactories[index++]() : null;
        }
        function thenHandler(result) {
            if (result !== undefined && result !== null) {
                results.push(result);
            }
            const n = next();
            if (n) {
                return n.then(thenHandler);
            }
            return Promise.resolve(results);
        }
        return Promise.resolve(null).then(thenHandler);
    }
    exports.sequence = sequence;
    function first(promiseFactories, shouldStop = t => !!t, defaultValue = null) {
        let index = 0;
        const len = promiseFactories.length;
        const loop = () => {
            if (index >= len) {
                return Promise.resolve(defaultValue);
            }
            const factory = promiseFactories[index++];
            const promise = Promise.resolve(factory());
            return promise.then(result => {
                if (shouldStop(result)) {
                    return Promise.resolve(result);
                }
                return loop();
            });
        };
        return loop();
    }
    exports.first = first;
    /**
     * A helper to queue N promises and run them all with a max degree of parallelism. The helper
     * ensures that at any time no more than M promises are running at the same time.
     */
    class Limiter {
        constructor(maxDegreeOfParalellism) {
            this._size = 0;
            this.maxDegreeOfParalellism = maxDegreeOfParalellism;
            this.outstandingPromises = [];
            this.runningPromises = 0;
            this._onFinished = new event_1.Emitter();
        }
        get onFinished() {
            return this._onFinished.event;
        }
        get size() {
            return this._size;
            // return this.runningPromises + this.outstandingPromises.length;
        }
        queue(factory) {
            this._size++;
            return new Promise((c, e) => {
                this.outstandingPromises.push({ factory, c, e });
                this.consume();
            });
        }
        consume() {
            while (this.outstandingPromises.length && this.runningPromises < this.maxDegreeOfParalellism) {
                const iLimitedTask = this.outstandingPromises.shift();
                this.runningPromises++;
                const promise = iLimitedTask.factory();
                promise.then(iLimitedTask.c, iLimitedTask.e);
                promise.then(() => this.consumed(), () => this.consumed());
            }
        }
        consumed() {
            this._size--;
            this.runningPromises--;
            if (this.outstandingPromises.length > 0) {
                this.consume();
            }
            else {
                this._onFinished.fire();
            }
        }
        dispose() {
            this._onFinished.dispose();
        }
    }
    exports.Limiter = Limiter;
    /**
     * A queue is handles one promise at a time and guarantees that at any time only one promise is executing.
     */
    class Queue extends Limiter {
        constructor() {
            super(1);
        }
    }
    exports.Queue = Queue;
    /**
     * A helper to organize queues per resource. The ResourceQueue makes sure to manage queues per resource
     * by disposing them once the queue is empty.
     */
    class ResourceQueue {
        constructor() {
            this.queues = new Map();
        }
        queueFor(resource) {
            const key = resource.toString();
            if (!this.queues.has(key)) {
                const queue = new Queue();
                queue.onFinished(() => {
                    queue.dispose();
                    this.queues.delete(key);
                });
                this.queues.set(key, queue);
            }
            return this.queues.get(key);
        }
        dispose() {
            this.queues.forEach(queue => queue.dispose());
            this.queues.clear();
        }
    }
    exports.ResourceQueue = ResourceQueue;
    class TimeoutTimer {
        constructor(runner, timeout) {
            this._token = -1;
            if (typeof runner === 'function' && typeof timeout === 'number') {
                this.setIfNotSet(runner, timeout);
            }
        }
        dispose() {
            this.cancel();
        }
        cancel() {
            if (this._token !== -1) {
                clearTimeout(this._token);
                this._token = -1;
            }
        }
        cancelAndSet(runner, timeout) {
            this.cancel();
            this._token = setTimeout(() => {
                this._token = -1;
                runner();
            }, timeout);
        }
        setIfNotSet(runner, timeout) {
            if (this._token !== -1) {
                // timer is already set
                return;
            }
            this._token = setTimeout(() => {
                this._token = -1;
                runner();
            }, timeout);
        }
    }
    exports.TimeoutTimer = TimeoutTimer;
    class IntervalTimer {
        constructor() {
            this._token = -1;
        }
        dispose() {
            this.cancel();
        }
        cancel() {
            if (this._token !== -1) {
                clearInterval(this._token);
                this._token = -1;
            }
        }
        cancelAndSet(runner, interval) {
            this.cancel();
            this._token = setInterval(() => {
                runner();
            }, interval);
        }
    }
    exports.IntervalTimer = IntervalTimer;
    class RunOnceScheduler {
        constructor(runner, delay) {
            this.timeoutToken = -1;
            this.runner = runner;
            this.timeout = delay;
            this.timeoutHandler = this.onTimeout.bind(this);
        }
        /**
         * Dispose RunOnceScheduler
         */
        dispose() {
            this.cancel();
            this.runner = null;
        }
        /**
         * Cancel current scheduled runner (if any).
         */
        cancel() {
            if (this.isScheduled()) {
                clearTimeout(this.timeoutToken);
                this.timeoutToken = -1;
            }
        }
        /**
         * Cancel previous runner (if any) & schedule a new runner.
         */
        schedule(delay = this.timeout) {
            this.cancel();
            this.timeoutToken = setTimeout(this.timeoutHandler, delay);
        }
        get delay() {
            return this.timeout;
        }
        set delay(value) {
            this.timeout = value;
        }
        /**
         * Returns true if scheduled.
         */
        isScheduled() {
            return this.timeoutToken !== -1;
        }
        onTimeout() {
            this.timeoutToken = -1;
            if (this.runner) {
                this.doRun();
            }
        }
        doRun() {
            if (this.runner) {
                this.runner();
            }
        }
    }
    exports.RunOnceScheduler = RunOnceScheduler;
    class RunOnceWorker extends RunOnceScheduler {
        constructor(runner, timeout) {
            super(runner, timeout);
            this.units = [];
        }
        work(unit) {
            this.units.push(unit);
            if (!this.isScheduled()) {
                this.schedule();
            }
        }
        doRun() {
            const units = this.units;
            this.units = [];
            if (this.runner) {
                this.runner(units);
            }
        }
        dispose() {
            this.units = [];
            super.dispose();
        }
    }
    exports.RunOnceWorker = RunOnceWorker;
    (function () {
        if (typeof requestIdleCallback !== 'function' || typeof cancelIdleCallback !== 'function') {
            const dummyIdle = Object.freeze({
                didTimeout: true,
                timeRemaining() { return 15; }
            });
            exports.runWhenIdle = (runner) => {
                const handle = setTimeout(() => runner(dummyIdle));
                let disposed = false;
                return {
                    dispose() {
                        if (disposed) {
                            return;
                        }
                        disposed = true;
                        clearTimeout(handle);
                    }
                };
            };
        }
        else {
            exports.runWhenIdle = (runner, timeout) => {
                const handle = requestIdleCallback(runner, typeof timeout === 'number' ? { timeout } : undefined);
                let disposed = false;
                return {
                    dispose() {
                        if (disposed) {
                            return;
                        }
                        disposed = true;
                        cancelIdleCallback(handle);
                    }
                };
            };
        }
    })();
    /**
     * An implementation of the "idle-until-urgent"-strategy as introduced
     * here: https://philipwalton.com/articles/idle-until-urgent/
     */
    class IdleValue {
        constructor(executor) {
            this._didRun = false;
            this._executor = () => {
                try {
                    this._value = executor();
                }
                catch (err) {
                    this._error = err;
                }
                finally {
                    this._didRun = true;
                }
            };
            this._handle = exports.runWhenIdle(() => this._executor());
        }
        dispose() {
            this._handle.dispose();
        }
        get value() {
            if (!this._didRun) {
                this._handle.dispose();
                this._executor();
            }
            if (this._error) {
                throw this._error;
            }
            return this._value;
        }
    }
    exports.IdleValue = IdleValue;
    //#endregion
    async function retry(task, delay, retries) {
        let lastError;
        for (let i = 0; i < retries; i++) {
            try {
                return await task();
            }
            catch (error) {
                lastError = error;
                await timeout(delay);
            }
        }
        throw lastError;
    }
    exports.retry = retry;
    class TaskSequentializer {
        hasPending(taskId) {
            if (!this._pending) {
                return false;
            }
            if (typeof taskId === 'number') {
                return this._pending.taskId === taskId;
            }
            return !!this._pending;
        }
        get pending() {
            return this._pending ? this._pending.promise : undefined;
        }
        cancelPending() {
            var _a;
            (_a = this._pending) === null || _a === void 0 ? void 0 : _a.cancel();
        }
        setPending(taskId, promise, onCancel) {
            this._pending = { taskId: taskId, cancel: () => onCancel === null || onCancel === void 0 ? void 0 : onCancel(), promise };
            promise.then(() => this.donePending(taskId), () => this.donePending(taskId));
            return promise;
        }
        donePending(taskId) {
            if (this._pending && taskId === this._pending.taskId) {
                // only set pending to done if the promise finished that is associated with that taskId
                this._pending = undefined;
                // schedule the next task now that we are free if we have any
                this.triggerNext();
            }
        }
        triggerNext() {
            if (this._next) {
                const next = this._next;
                this._next = undefined;
                // Run next task and complete on the associated promise
                next.run().then(next.promiseResolve, next.promiseReject);
            }
        }
        setNext(run) {
            // this is our first next task, so we create associated promise with it
            // so that we can return a promise that completes when the task has
            // completed.
            if (!this._next) {
                let promiseResolve;
                let promiseReject;
                const promise = new Promise((resolve, reject) => {
                    promiseResolve = resolve;
                    promiseReject = reject;
                });
                this._next = {
                    run,
                    promise,
                    promiseResolve: promiseResolve,
                    promiseReject: promiseReject
                };
            }
            // we have a previous next task, just overwrite it
            else {
                this._next.run = run;
            }
            return this._next.promise;
        }
    }
    exports.TaskSequentializer = TaskSequentializer;
});
//#endregion

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[2/*vs/base/common/platform*/], __M([0/*require*/,1/*exports*/]), function (require, exports) {
    "use strict";
    var _a;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isLittleEndian = exports.OS = exports.OperatingSystem = exports.setImmediate = exports.globals = exports.translationsConfigFile = exports.locale = exports.Language = exports.language = exports.isRootUser = exports.userAgent = exports.platform = exports.isIOS = exports.isWeb = exports.isNative = exports.isLinux = exports.isMacintosh = exports.isWindows = exports.PlatformToString = exports.Platform = void 0;
    const LANGUAGE_DEFAULT = 'en';
    let _isWindows = false;
    let _isMacintosh = false;
    let _isLinux = false;
    let _isNative = false;
    let _isWeb = false;
    let _isIOS = false;
    let _locale = undefined;
    let _language = LANGUAGE_DEFAULT;
    let _translationsConfigFile = undefined;
    let _userAgent = undefined;
    const _globals = (typeof self === 'object' ? self : typeof global === 'object' ? global : {});
    let nodeProcess = undefined;
    if (typeof process !== 'undefined') {
        // Native environment (non-sandboxed)
        nodeProcess = process;
    }
    else if (typeof _globals.vscode !== 'undefined') {
        // Native envionment (sandboxed)
        nodeProcess = _globals.vscode.process;
    }
    const isElectronRenderer = typeof ((_a = nodeProcess === null || nodeProcess === void 0 ? void 0 : nodeProcess.versions) === null || _a === void 0 ? void 0 : _a.electron) === 'string' && nodeProcess.type === 'renderer';
    // Web environment
    if (typeof navigator === 'object' && !isElectronRenderer) {
        _userAgent = navigator.userAgent;
        _isWindows = _userAgent.indexOf('Windows') >= 0;
        _isMacintosh = _userAgent.indexOf('Macintosh') >= 0;
        _isIOS = (_userAgent.indexOf('Macintosh') >= 0 || _userAgent.indexOf('iPad') >= 0 || _userAgent.indexOf('iPhone') >= 0) && !!navigator.maxTouchPoints && navigator.maxTouchPoints > 0;
        _isLinux = _userAgent.indexOf('Linux') >= 0;
        _isWeb = true;
        _locale = navigator.language;
        _language = _locale;
    }
    // Native environment
    else if (typeof nodeProcess === 'object') {
        _isWindows = (nodeProcess.platform === 'win32');
        _isMacintosh = (nodeProcess.platform === 'darwin');
        _isLinux = (nodeProcess.platform === 'linux');
        _locale = LANGUAGE_DEFAULT;
        _language = LANGUAGE_DEFAULT;
        const rawNlsConfig = nodeProcess.env['VSCODE_NLS_CONFIG'];
        if (rawNlsConfig) {
            try {
                const nlsConfig = JSON.parse(rawNlsConfig);
                const resolved = nlsConfig.availableLanguages['*'];
                _locale = nlsConfig.locale;
                // VSCode's default language is 'en'
                _language = resolved ? resolved : LANGUAGE_DEFAULT;
                _translationsConfigFile = nlsConfig._translationsConfigFile;
            }
            catch (e) {
            }
        }
        _isNative = true;
    }
    // Unknown environment
    else {
        console.error('Unable to resolve platform.');
    }
    var Platform;
    (function (Platform) {
        Platform[Platform["Web"] = 0] = "Web";
        Platform[Platform["Mac"] = 1] = "Mac";
        Platform[Platform["Linux"] = 2] = "Linux";
        Platform[Platform["Windows"] = 3] = "Windows";
    })(Platform = exports.Platform || (exports.Platform = {}));
    function PlatformToString(platform) {
        switch (platform) {
            case 0 /* Web */: return 'Web';
            case 1 /* Mac */: return 'Mac';
            case 2 /* Linux */: return 'Linux';
            case 3 /* Windows */: return 'Windows';
        }
    }
    exports.PlatformToString = PlatformToString;
    let _platform = 0 /* Web */;
    if (_isMacintosh) {
        _platform = 1 /* Mac */;
    }
    else if (_isWindows) {
        _platform = 3 /* Windows */;
    }
    else if (_isLinux) {
        _platform = 2 /* Linux */;
    }
    exports.isWindows = _isWindows;
    exports.isMacintosh = _isMacintosh;
    exports.isLinux = _isLinux;
    exports.isNative = _isNative;
    exports.isWeb = _isWeb;
    exports.isIOS = _isIOS;
    exports.platform = _platform;
    exports.userAgent = _userAgent;
    function isRootUser() {
        return !!nodeProcess && !_isWindows && (nodeProcess.getuid() === 0);
    }
    exports.isRootUser = isRootUser;
    /**
     * The language used for the user interface. The format of
     * the string is all lower case (e.g. zh-tw for Traditional
     * Chinese)
     */
    exports.language = _language;
    var Language;
    (function (Language) {
        function value() {
            return exports.language;
        }
        Language.value = value;
        function isDefaultVariant() {
            if (exports.language.length === 2) {
                return exports.language === 'en';
            }
            else if (exports.language.length >= 3) {
                return exports.language[0] === 'e' && exports.language[1] === 'n' && exports.language[2] === '-';
            }
            else {
                return false;
            }
        }
        Language.isDefaultVariant = isDefaultVariant;
        function isDefault() {
            return exports.language === 'en';
        }
        Language.isDefault = isDefault;
    })(Language = exports.Language || (exports.Language = {}));
    /**
     * The OS locale or the locale specified by --locale. The format of
     * the string is all lower case (e.g. zh-tw for Traditional
     * Chinese). The UI is not necessarily shown in the provided locale.
     */
    exports.locale = _locale;
    /**
     * The translatios that are available through language packs.
     */
    exports.translationsConfigFile = _translationsConfigFile;
    exports.globals = _globals;
    exports.setImmediate = (function defineSetImmediate() {
        if (exports.globals.setImmediate) {
            return exports.globals.setImmediate.bind(exports.globals);
        }
        if (typeof exports.globals.postMessage === 'function' && !exports.globals.importScripts) {
            let pending = [];
            exports.globals.addEventListener('message', (e) => {
                if (e.data && e.data.vscodeSetImmediateId) {
                    for (let i = 0, len = pending.length; i < len; i++) {
                        const candidate = pending[i];
                        if (candidate.id === e.data.vscodeSetImmediateId) {
                            pending.splice(i, 1);
                            candidate.callback();
                            return;
                        }
                    }
                }
            });
            let lastId = 0;
            return (callback) => {
                const myId = ++lastId;
                pending.push({
                    id: myId,
                    callback: callback
                });
                exports.globals.postMessage({ vscodeSetImmediateId: myId }, '*');
            };
        }
        if (nodeProcess) {
            return nodeProcess.nextTick.bind(nodeProcess);
        }
        const _promise = Promise.resolve();
        return (callback) => _promise.then(callback);
    })();
    var OperatingSystem;
    (function (OperatingSystem) {
        OperatingSystem[OperatingSystem["Windows"] = 1] = "Windows";
        OperatingSystem[OperatingSystem["Macintosh"] = 2] = "Macintosh";
        OperatingSystem[OperatingSystem["Linux"] = 3] = "Linux";
    })(OperatingSystem = exports.OperatingSystem || (exports.OperatingSystem = {}));
    exports.OS = (_isMacintosh || _isIOS ? 2 /* Macintosh */ : (_isWindows ? 1 /* Windows */ : 3 /* Linux */));
    let _isLittleEndian = true;
    let _isLittleEndianComputed = false;
    function isLittleEndian() {
        if (!_isLittleEndianComputed) {
            _isLittleEndianComputed = true;
            const test = new Uint8Array(2);
            test[0] = 1;
            test[1] = 2;
            const view = new Uint16Array(test.buffer);
            _isLittleEndian = (view[0] === (2 << 8) + 1);
        }
        return _isLittleEndian;
    }
    exports.isLittleEndian = isLittleEndian;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[25/*vs/base/browser/canIUse*/], __M([0/*require*/,1/*exports*/,7/*vs/base/browser/browser*/,2/*vs/base/common/platform*/]), function (require, exports, browser, platform) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BrowserFeatures = exports.KeyboardSupport = void 0;
    var KeyboardSupport;
    (function (KeyboardSupport) {
        KeyboardSupport[KeyboardSupport["Always"] = 0] = "Always";
        KeyboardSupport[KeyboardSupport["FullScreen"] = 1] = "FullScreen";
        KeyboardSupport[KeyboardSupport["None"] = 2] = "None";
    })(KeyboardSupport = exports.KeyboardSupport || (exports.KeyboardSupport = {}));
    /**
     * Browser feature we can support in current platform, browser and environment.
     */
    exports.BrowserFeatures = {
        clipboard: {
            writeText: (platform.isNative
                || (document.queryCommandSupported && document.queryCommandSupported('copy'))
                || !!(navigator && navigator.clipboard && navigator.clipboard.writeText)),
            readText: (platform.isNative
                || !!(navigator && navigator.clipboard && navigator.clipboard.readText)),
            richText: (() => {
                if (browser.isEdge) {
                    let index = navigator.userAgent.indexOf('Edge/');
                    let version = parseInt(navigator.userAgent.substring(index + 5, navigator.userAgent.indexOf('.', index)), 10);
                    if (!version || (version >= 12 && version <= 16)) {
                        return false;
                    }
                }
                return true;
            })()
        },
        keyboard: (() => {
            if (platform.isNative || browser.isStandalone) {
                return 0 /* Always */;
            }
            if (navigator.keyboard || browser.isSafari) {
                return 1 /* FullScreen */;
            }
            return 2 /* None */;
        })(),
        // 'ontouchstart' in window always evaluates to true with typescript's modern typings. This causes `window` to be
        // `never` later in `window.navigator`. That's why we need the explicit `window as Window` cast
        touch: 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0,
        pointerEvents: window.PointerEvent && ('ontouchstart' in window || window.navigator.maxTouchPoints > 0 || navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0)
    };
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[26/*vs/base/browser/keyboardEvent*/], __M([0/*require*/,1/*exports*/,7/*vs/base/browser/browser*/,22/*vs/base/common/keyCodes*/,2/*vs/base/common/platform*/]), function (require, exports, browser, keyCodes_1, platform) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StandardKeyboardEvent = exports.printStandardKeyboardEvent = exports.printKeyboardEvent = exports.getCodeForKeyCode = void 0;
    let KEY_CODE_MAP = new Array(230);
    let INVERSE_KEY_CODE_MAP = new Array(112 /* MAX_VALUE */);
    (function () {
        for (let i = 0; i < INVERSE_KEY_CODE_MAP.length; i++) {
            INVERSE_KEY_CODE_MAP[i] = -1;
        }
        function define(code, keyCode) {
            KEY_CODE_MAP[code] = keyCode;
            INVERSE_KEY_CODE_MAP[keyCode] = code;
        }
        define(3, 7 /* PauseBreak */); // VK_CANCEL 0x03 Control-break processing
        define(8, 1 /* Backspace */);
        define(9, 2 /* Tab */);
        define(13, 3 /* Enter */);
        define(16, 4 /* Shift */);
        define(17, 5 /* Ctrl */);
        define(18, 6 /* Alt */);
        define(19, 7 /* PauseBreak */);
        define(20, 8 /* CapsLock */);
        define(27, 9 /* Escape */);
        define(32, 10 /* Space */);
        define(33, 11 /* PageUp */);
        define(34, 12 /* PageDown */);
        define(35, 13 /* End */);
        define(36, 14 /* Home */);
        define(37, 15 /* LeftArrow */);
        define(38, 16 /* UpArrow */);
        define(39, 17 /* RightArrow */);
        define(40, 18 /* DownArrow */);
        define(45, 19 /* Insert */);
        define(46, 20 /* Delete */);
        define(48, 21 /* KEY_0 */);
        define(49, 22 /* KEY_1 */);
        define(50, 23 /* KEY_2 */);
        define(51, 24 /* KEY_3 */);
        define(52, 25 /* KEY_4 */);
        define(53, 26 /* KEY_5 */);
        define(54, 27 /* KEY_6 */);
        define(55, 28 /* KEY_7 */);
        define(56, 29 /* KEY_8 */);
        define(57, 30 /* KEY_9 */);
        define(65, 31 /* KEY_A */);
        define(66, 32 /* KEY_B */);
        define(67, 33 /* KEY_C */);
        define(68, 34 /* KEY_D */);
        define(69, 35 /* KEY_E */);
        define(70, 36 /* KEY_F */);
        define(71, 37 /* KEY_G */);
        define(72, 38 /* KEY_H */);
        define(73, 39 /* KEY_I */);
        define(74, 40 /* KEY_J */);
        define(75, 41 /* KEY_K */);
        define(76, 42 /* KEY_L */);
        define(77, 43 /* KEY_M */);
        define(78, 44 /* KEY_N */);
        define(79, 45 /* KEY_O */);
        define(80, 46 /* KEY_P */);
        define(81, 47 /* KEY_Q */);
        define(82, 48 /* KEY_R */);
        define(83, 49 /* KEY_S */);
        define(84, 50 /* KEY_T */);
        define(85, 51 /* KEY_U */);
        define(86, 52 /* KEY_V */);
        define(87, 53 /* KEY_W */);
        define(88, 54 /* KEY_X */);
        define(89, 55 /* KEY_Y */);
        define(90, 56 /* KEY_Z */);
        define(93, 58 /* ContextMenu */);
        define(96, 93 /* NUMPAD_0 */);
        define(97, 94 /* NUMPAD_1 */);
        define(98, 95 /* NUMPAD_2 */);
        define(99, 96 /* NUMPAD_3 */);
        define(100, 97 /* NUMPAD_4 */);
        define(101, 98 /* NUMPAD_5 */);
        define(102, 99 /* NUMPAD_6 */);
        define(103, 100 /* NUMPAD_7 */);
        define(104, 101 /* NUMPAD_8 */);
        define(105, 102 /* NUMPAD_9 */);
        define(106, 103 /* NUMPAD_MULTIPLY */);
        define(107, 104 /* NUMPAD_ADD */);
        define(108, 105 /* NUMPAD_SEPARATOR */);
        define(109, 106 /* NUMPAD_SUBTRACT */);
        define(110, 107 /* NUMPAD_DECIMAL */);
        define(111, 108 /* NUMPAD_DIVIDE */);
        define(112, 59 /* F1 */);
        define(113, 60 /* F2 */);
        define(114, 61 /* F3 */);
        define(115, 62 /* F4 */);
        define(116, 63 /* F5 */);
        define(117, 64 /* F6 */);
        define(118, 65 /* F7 */);
        define(119, 66 /* F8 */);
        define(120, 67 /* F9 */);
        define(121, 68 /* F10 */);
        define(122, 69 /* F11 */);
        define(123, 70 /* F12 */);
        define(124, 71 /* F13 */);
        define(125, 72 /* F14 */);
        define(126, 73 /* F15 */);
        define(127, 74 /* F16 */);
        define(128, 75 /* F17 */);
        define(129, 76 /* F18 */);
        define(130, 77 /* F19 */);
        define(144, 78 /* NumLock */);
        define(145, 79 /* ScrollLock */);
        define(186, 80 /* US_SEMICOLON */);
        define(187, 81 /* US_EQUAL */);
        define(188, 82 /* US_COMMA */);
        define(189, 83 /* US_MINUS */);
        define(190, 84 /* US_DOT */);
        define(191, 85 /* US_SLASH */);
        define(192, 86 /* US_BACKTICK */);
        define(193, 110 /* ABNT_C1 */);
        define(194, 111 /* ABNT_C2 */);
        define(219, 87 /* US_OPEN_SQUARE_BRACKET */);
        define(220, 88 /* US_BACKSLASH */);
        define(221, 89 /* US_CLOSE_SQUARE_BRACKET */);
        define(222, 90 /* US_QUOTE */);
        define(223, 91 /* OEM_8 */);
        define(226, 92 /* OEM_102 */);
        /**
         * https://lists.w3.org/Archives/Public/www-dom/2010JulSep/att-0182/keyCode-spec.html
         * If an Input Method Editor is processing key input and the event is keydown, return 229.
         */
        define(229, 109 /* KEY_IN_COMPOSITION */);
        if (browser.isFirefox) {
            define(59, 80 /* US_SEMICOLON */);
            define(107, 81 /* US_EQUAL */);
            define(109, 83 /* US_MINUS */);
            if (platform.isMacintosh) {
                define(224, 57 /* Meta */);
            }
        }
        else if (browser.isWebKit) {
            define(91, 57 /* Meta */);
            if (platform.isMacintosh) {
                // the two meta keys in the Mac have different key codes (91 and 93)
                define(93, 57 /* Meta */);
            }
            else {
                define(92, 57 /* Meta */);
            }
        }
    })();
    function extractKeyCode(e) {
        if (e.charCode) {
            // "keypress" events mostly
            let char = String.fromCharCode(e.charCode).toUpperCase();
            return keyCodes_1.KeyCodeUtils.fromString(char);
        }
        return KEY_CODE_MAP[e.keyCode] || 0 /* Unknown */;
    }
    function getCodeForKeyCode(keyCode) {
        return INVERSE_KEY_CODE_MAP[keyCode];
    }
    exports.getCodeForKeyCode = getCodeForKeyCode;
    const ctrlKeyMod = (platform.isMacintosh ? 256 /* WinCtrl */ : 2048 /* CtrlCmd */);
    const altKeyMod = 512 /* Alt */;
    const shiftKeyMod = 1024 /* Shift */;
    const metaKeyMod = (platform.isMacintosh ? 2048 /* CtrlCmd */ : 256 /* WinCtrl */);
    function printKeyboardEvent(e) {
        let modifiers = [];
        if (e.ctrlKey) {
            modifiers.push(`ctrl`);
        }
        if (e.shiftKey) {
            modifiers.push(`shift`);
        }
        if (e.altKey) {
            modifiers.push(`alt`);
        }
        if (e.metaKey) {
            modifiers.push(`meta`);
        }
        return `modifiers: [${modifiers.join(',')}], code: ${e.code}, keyCode: ${e.keyCode}, key: ${e.key}`;
    }
    exports.printKeyboardEvent = printKeyboardEvent;
    function printStandardKeyboardEvent(e) {
        let modifiers = [];
        if (e.ctrlKey) {
            modifiers.push(`ctrl`);
        }
        if (e.shiftKey) {
            modifiers.push(`shift`);
        }
        if (e.altKey) {
            modifiers.push(`alt`);
        }
        if (e.metaKey) {
            modifiers.push(`meta`);
        }
        return `modifiers: [${modifiers.join(',')}], code: ${e.code}, keyCode: ${e.keyCode} ('${keyCodes_1.KeyCodeUtils.toString(e.keyCode)}')`;
    }
    exports.printStandardKeyboardEvent = printStandardKeyboardEvent;
    class StandardKeyboardEvent {
        constructor(source) {
            this._standardKeyboardEventBrand = true;
            let e = source;
            this.browserEvent = e;
            this.target = e.target;
            this.ctrlKey = e.ctrlKey;
            this.shiftKey = e.shiftKey;
            this.altKey = e.altKey;
            this.metaKey = e.metaKey;
            this.keyCode = extractKeyCode(e);
            this.code = e.code;
            // console.info(e.type + ": keyCode: " + e.keyCode + ", which: " + e.which + ", charCode: " + e.charCode + ", detail: " + e.detail + " ====> " + this.keyCode + ' -- ' + KeyCode[this.keyCode]);
            this.ctrlKey = this.ctrlKey || this.keyCode === 5 /* Ctrl */;
            this.altKey = this.altKey || this.keyCode === 6 /* Alt */;
            this.shiftKey = this.shiftKey || this.keyCode === 4 /* Shift */;
            this.metaKey = this.metaKey || this.keyCode === 57 /* Meta */;
            this._asKeybinding = this._computeKeybinding();
            this._asRuntimeKeybinding = this._computeRuntimeKeybinding();
            // console.log(`code: ${e.code}, keyCode: ${e.keyCode}, key: ${e.key}`);
        }
        preventDefault() {
            if (this.browserEvent && this.browserEvent.preventDefault) {
                this.browserEvent.preventDefault();
            }
        }
        stopPropagation() {
            if (this.browserEvent && this.browserEvent.stopPropagation) {
                this.browserEvent.stopPropagation();
            }
        }
        toKeybinding() {
            return this._asRuntimeKeybinding;
        }
        equals(other) {
            return this._asKeybinding === other;
        }
        _computeKeybinding() {
            let key = 0 /* Unknown */;
            if (this.keyCode !== 5 /* Ctrl */ && this.keyCode !== 4 /* Shift */ && this.keyCode !== 6 /* Alt */ && this.keyCode !== 57 /* Meta */) {
                key = this.keyCode;
            }
            let result = 0;
            if (this.ctrlKey) {
                result |= ctrlKeyMod;
            }
            if (this.altKey) {
                result |= altKeyMod;
            }
            if (this.shiftKey) {
                result |= shiftKeyMod;
            }
            if (this.metaKey) {
                result |= metaKeyMod;
            }
            result |= key;
            return result;
        }
        _computeRuntimeKeybinding() {
            let key = 0 /* Unknown */;
            if (this.keyCode !== 5 /* Ctrl */ && this.keyCode !== 4 /* Shift */ && this.keyCode !== 6 /* Alt */ && this.keyCode !== 57 /* Meta */) {
                key = this.keyCode;
            }
            return new keyCodes_1.SimpleKeybinding(this.ctrlKey, this.shiftKey, this.altKey, this.metaKey, key);
        }
    }
    exports.StandardKeyboardEvent = StandardKeyboardEvent;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[27/*vs/base/browser/mouseEvent*/], __M([0/*require*/,1/*exports*/,7/*vs/base/browser/browser*/,19/*vs/base/browser/iframe*/,2/*vs/base/common/platform*/]), function (require, exports, browser, iframe_1, platform) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StandardWheelEvent = exports.DragMouseEvent = exports.StandardMouseEvent = void 0;
    class StandardMouseEvent {
        constructor(e) {
            this.timestamp = Date.now();
            this.browserEvent = e;
            this.leftButton = e.button === 0;
            this.middleButton = e.button === 1;
            this.rightButton = e.button === 2;
            this.buttons = e.buttons;
            this.target = e.target;
            this.detail = e.detail || 1;
            if (e.type === 'dblclick') {
                this.detail = 2;
            }
            this.ctrlKey = e.ctrlKey;
            this.shiftKey = e.shiftKey;
            this.altKey = e.altKey;
            this.metaKey = e.metaKey;
            if (typeof e.pageX === 'number') {
                this.posx = e.pageX;
                this.posy = e.pageY;
            }
            else {
                // Probably hit by MSGestureEvent
                this.posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                this.posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }
            // Find the position of the iframe this code is executing in relative to the iframe where the event was captured.
            let iframeOffsets = iframe_1.IframeUtils.getPositionOfChildWindowRelativeToAncestorWindow(self, e.view);
            this.posx -= iframeOffsets.left;
            this.posy -= iframeOffsets.top;
        }
        preventDefault() {
            this.browserEvent.preventDefault();
        }
        stopPropagation() {
            this.browserEvent.stopPropagation();
        }
    }
    exports.StandardMouseEvent = StandardMouseEvent;
    class DragMouseEvent extends StandardMouseEvent {
        constructor(e) {
            super(e);
            this.dataTransfer = e.dataTransfer;
        }
    }
    exports.DragMouseEvent = DragMouseEvent;
    class StandardWheelEvent {
        constructor(e, deltaX = 0, deltaY = 0) {
            this.browserEvent = e || null;
            this.target = e ? (e.target || e.targetNode || e.srcElement) : null;
            this.deltaY = deltaY;
            this.deltaX = deltaX;
            if (e) {
                // Old (deprecated) wheel events
                let e1 = e;
                let e2 = e;
                // vertical delta scroll
                if (typeof e1.wheelDeltaY !== 'undefined') {
                    this.deltaY = e1.wheelDeltaY / 120;
                }
                else if (typeof e2.VERTICAL_AXIS !== 'undefined' && e2.axis === e2.VERTICAL_AXIS) {
                    this.deltaY = -e2.detail / 3;
                }
                else if (e.type === 'wheel') {
                    // Modern wheel event
                    // https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent
                    const ev = e;
                    if (ev.deltaMode === ev.DOM_DELTA_LINE) {
                        // the deltas are expressed in lines
                        if (browser.isFirefox && !platform.isMacintosh) {
                            this.deltaY = -e.deltaY / 3;
                        }
                        else {
                            this.deltaY = -e.deltaY;
                        }
                    }
                    else {
                        this.deltaY = -e.deltaY / 40;
                    }
                }
                // horizontal delta scroll
                if (typeof e1.wheelDeltaX !== 'undefined') {
                    if (browser.isSafari && platform.isWindows) {
                        this.deltaX = -(e1.wheelDeltaX / 120);
                    }
                    else {
                        this.deltaX = e1.wheelDeltaX / 120;
                    }
                }
                else if (typeof e2.HORIZONTAL_AXIS !== 'undefined' && e2.axis === e2.HORIZONTAL_AXIS) {
                    this.deltaX = -e.detail / 3;
                }
                else if (e.type === 'wheel') {
                    // Modern wheel event
                    // https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent
                    const ev = e;
                    if (ev.deltaMode === ev.DOM_DELTA_LINE) {
                        // the deltas are expressed in lines
                        if (browser.isFirefox && !platform.isMacintosh) {
                            this.deltaX = -e.deltaX / 3;
                        }
                        else {
                            this.deltaX = -e.deltaX;
                        }
                    }
                    else {
                        this.deltaX = -e.deltaX / 40;
                    }
                }
                // Assume a vertical scroll if nothing else worked
                if (this.deltaY === 0 && this.deltaX === 0 && e.wheelDelta) {
                    this.deltaY = e.wheelDelta / 120;
                }
            }
        }
        preventDefault() {
            if (this.browserEvent) {
                this.browserEvent.preventDefault();
            }
        }
        stopPropagation() {
            if (this.browserEvent) {
                this.browserEvent.stopPropagation();
            }
        }
    }
    exports.StandardWheelEvent = StandardWheelEvent;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[28/*vs/base/common/process*/], __M([0/*require*/,1/*exports*/,2/*vs/base/common/platform*/]), function (require, exports, platform_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.nextTick = exports.platform = exports.env = exports.cwd = void 0;
    let safeProcess;
    // Native node.js environment
    if (typeof process !== 'undefined') {
        safeProcess = process;
    }
    // Native sandbox environment
    else if (typeof platform_1.globals.vscode !== 'undefined') {
        safeProcess = platform_1.globals.vscode.process;
    }
    // Web environment
    else {
        safeProcess = {
            // Supported
            get platform() { return platform_1.isWindows ? 'win32' : platform_1.isMacintosh ? 'darwin' : 'linux'; },
            nextTick(callback) { return platform_1.setImmediate(callback); },
            // Unsupported
            get env() { return Object.create(null); },
            cwd() { return '/'; },
            getuid() { return -1; }
        };
    }
    exports.cwd = safeProcess.cwd;
    exports.env = safeProcess.env;
    exports.platform = safeProcess.platform;
    exports.nextTick = safeProcess.nextTick;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[29/*vs/base/common/path*/], __M([0/*require*/,1/*exports*/,28/*vs/base/common/process*/]), function (require, exports, process) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.delimiter = exports.sep = exports.toNamespacedPath = exports.parse = exports.format = exports.extname = exports.basename = exports.dirname = exports.relative = exports.resolve = exports.join = exports.isAbsolute = exports.normalize = exports.posix = exports.win32 = void 0;
    const CHAR_UPPERCASE_A = 65; /* A */
    const CHAR_LOWERCASE_A = 97; /* a */
    const CHAR_UPPERCASE_Z = 90; /* Z */
    const CHAR_LOWERCASE_Z = 122; /* z */
    const CHAR_DOT = 46; /* . */
    const CHAR_FORWARD_SLASH = 47; /* / */
    const CHAR_BACKWARD_SLASH = 92; /* \ */
    const CHAR_COLON = 58; /* : */
    const CHAR_QUESTION_MARK = 63; /* ? */
    class ErrorInvalidArgType extends Error {
        constructor(name, expected, actual) {
            // determiner: 'must be' or 'must not be'
            let determiner;
            if (typeof expected === 'string' && expected.indexOf('not ') === 0) {
                determiner = 'must not be';
                expected = expected.replace(/^not /, '');
            }
            else {
                determiner = 'must be';
            }
            const type = name.indexOf('.') !== -1 ? 'property' : 'argument';
            let msg = `The "${name}" ${type} ${determiner} of type ${expected}`;
            msg += `. Received type ${typeof actual}`;
            super(msg);
            this.code = 'ERR_INVALID_ARG_TYPE';
        }
    }
    function validateString(value, name) {
        if (typeof value !== 'string') {
            throw new ErrorInvalidArgType(name, 'string', value);
        }
    }
    function isPathSeparator(code) {
        return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
    }
    function isPosixPathSeparator(code) {
        return code === CHAR_FORWARD_SLASH;
    }
    function isWindowsDeviceRoot(code) {
        return code >= CHAR_UPPERCASE_A && code <= CHAR_UPPERCASE_Z ||
            code >= CHAR_LOWERCASE_A && code <= CHAR_LOWERCASE_Z;
    }
    // Resolves . and .. elements in a path with directory names
    function normalizeString(path, allowAboveRoot, separator, isPathSeparator) {
        let res = '';
        let lastSegmentLength = 0;
        let lastSlash = -1;
        let dots = 0;
        let code = 0;
        for (let i = 0; i <= path.length; ++i) {
            if (i < path.length) {
                code = path.charCodeAt(i);
            }
            else if (isPathSeparator(code)) {
                break;
            }
            else {
                code = CHAR_FORWARD_SLASH;
            }
            if (isPathSeparator(code)) {
                if (lastSlash === i - 1 || dots === 1) {
                    // NOOP
                }
                else if (dots === 2) {
                    if (res.length < 2 || lastSegmentLength !== 2 ||
                        res.charCodeAt(res.length - 1) !== CHAR_DOT ||
                        res.charCodeAt(res.length - 2) !== CHAR_DOT) {
                        if (res.length > 2) {
                            const lastSlashIndex = res.lastIndexOf(separator);
                            if (lastSlashIndex === -1) {
                                res = '';
                                lastSegmentLength = 0;
                            }
                            else {
                                res = res.slice(0, lastSlashIndex);
                                lastSegmentLength = res.length - 1 - res.lastIndexOf(separator);
                            }
                            lastSlash = i;
                            dots = 0;
                            continue;
                        }
                        else if (res.length !== 0) {
                            res = '';
                            lastSegmentLength = 0;
                            lastSlash = i;
                            dots = 0;
                            continue;
                        }
                    }
                    if (allowAboveRoot) {
                        res += res.length > 0 ? `${separator}..` : '..';
                        lastSegmentLength = 2;
                    }
                }
                else {
                    if (res.length > 0) {
                        res += `${separator}${path.slice(lastSlash + 1, i)}`;
                    }
                    else {
                        res = path.slice(lastSlash + 1, i);
                    }
                    lastSegmentLength = i - lastSlash - 1;
                }
                lastSlash = i;
                dots = 0;
            }
            else if (code === CHAR_DOT && dots !== -1) {
                ++dots;
            }
            else {
                dots = -1;
            }
        }
        return res;
    }
    function _format(sep, pathObject) {
        if (pathObject === null || typeof pathObject !== 'object') {
            throw new ErrorInvalidArgType('pathObject', 'Object', pathObject);
        }
        const dir = pathObject.dir || pathObject.root;
        const base = pathObject.base ||
            `${pathObject.name || ''}${pathObject.ext || ''}`;
        if (!dir) {
            return base;
        }
        return dir === pathObject.root ? `${dir}${base}` : `${dir}${sep}${base}`;
    }
    exports.win32 = {
        // path.resolve([from ...], to)
        resolve(...pathSegments) {
            let resolvedDevice = '';
            let resolvedTail = '';
            let resolvedAbsolute = false;
            for (let i = pathSegments.length - 1; i >= -1; i--) {
                let path;
                if (i >= 0) {
                    path = pathSegments[i];
                    validateString(path, 'path');
                    // Skip empty entries
                    if (path.length === 0) {
                        continue;
                    }
                }
                else if (resolvedDevice.length === 0) {
                    path = process.cwd();
                }
                else {
                    // Windows has the concept of drive-specific current working
                    // directories. If we've resolved a drive letter but not yet an
                    // absolute path, get cwd for that drive, or the process cwd if
                    // the drive cwd is not available. We're sure the device is not
                    // a UNC path at this points, because UNC paths are always absolute.
                    path = process.env[`=${resolvedDevice}`] || process.cwd();
                    // Verify that a cwd was found and that it actually points
                    // to our drive. If not, default to the drive's root.
                    if (path === undefined ||
                        path.slice(0, 2).toLowerCase() !== resolvedDevice.toLowerCase() &&
                            path.charCodeAt(2) === CHAR_BACKWARD_SLASH) {
                        path = `${resolvedDevice}\\`;
                    }
                }
                const len = path.length;
                let rootEnd = 0;
                let device = '';
                let isAbsolute = false;
                const code = path.charCodeAt(0);
                // Try to match a root
                if (len === 1) {
                    if (isPathSeparator(code)) {
                        // `path` contains just a path separator
                        rootEnd = 1;
                        isAbsolute = true;
                    }
                }
                else if (isPathSeparator(code)) {
                    // Possible UNC root
                    // If we started with a separator, we know we at least have an
                    // absolute path of some kind (UNC or otherwise)
                    isAbsolute = true;
                    if (isPathSeparator(path.charCodeAt(1))) {
                        // Matched double path separator at beginning
                        let j = 2;
                        let last = j;
                        // Match 1 or more non-path separators
                        while (j < len && !isPathSeparator(path.charCodeAt(j))) {
                            j++;
                        }
                        if (j < len && j !== last) {
                            const firstPart = path.slice(last, j);
                            // Matched!
                            last = j;
                            // Match 1 or more path separators
                            while (j < len && isPathSeparator(path.charCodeAt(j))) {
                                j++;
                            }
                            if (j < len && j !== last) {
                                // Matched!
                                last = j;
                                // Match 1 or more non-path separators
                                while (j < len && !isPathSeparator(path.charCodeAt(j))) {
                                    j++;
                                }
                                if (j === len || j !== last) {
                                    // We matched a UNC root
                                    device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                                    rootEnd = j;
                                }
                            }
                        }
                    }
                    else {
                        rootEnd = 1;
                    }
                }
                else if (isWindowsDeviceRoot(code) &&
                    path.charCodeAt(1) === CHAR_COLON) {
                    // Possible device root
                    device = path.slice(0, 2);
                    rootEnd = 2;
                    if (len > 2 && isPathSeparator(path.charCodeAt(2))) {
                        // Treat separator following drive name as an absolute path
                        // indicator
                        isAbsolute = true;
                        rootEnd = 3;
                    }
                }
                if (device.length > 0) {
                    if (resolvedDevice.length > 0) {
                        if (device.toLowerCase() !== resolvedDevice.toLowerCase()) {
                            // This path points to another device so it is not applicable
                            continue;
                        }
                    }
                    else {
                        resolvedDevice = device;
                    }
                }
                if (resolvedAbsolute) {
                    if (resolvedDevice.length > 0) {
                        break;
                    }
                }
                else {
                    resolvedTail = `${path.slice(rootEnd)}\\${resolvedTail}`;
                    resolvedAbsolute = isAbsolute;
                    if (isAbsolute && resolvedDevice.length > 0) {
                        break;
                    }
                }
            }
            // At this point the path should be resolved to a full absolute path,
            // but handle relative paths to be safe (might happen when process.cwd()
            // fails)
            // Normalize the tail path
            resolvedTail = normalizeString(resolvedTail, !resolvedAbsolute, '\\', isPathSeparator);
            return resolvedAbsolute ?
                `${resolvedDevice}\\${resolvedTail}` :
                `${resolvedDevice}${resolvedTail}` || '.';
        },
        normalize(path) {
            validateString(path, 'path');
            const len = path.length;
            if (len === 0) {
                return '.';
            }
            let rootEnd = 0;
            let device;
            let isAbsolute = false;
            const code = path.charCodeAt(0);
            // Try to match a root
            if (len === 1) {
                // `path` contains just a single char, exit early to avoid
                // unnecessary work
                return isPosixPathSeparator(code) ? '\\' : path;
            }
            if (isPathSeparator(code)) {
                // Possible UNC root
                // If we started with a separator, we know we at least have an absolute
                // path of some kind (UNC or otherwise)
                isAbsolute = true;
                if (isPathSeparator(path.charCodeAt(1))) {
                    // Matched double path separator at beginning
                    let j = 2;
                    let last = j;
                    // Match 1 or more non-path separators
                    while (j < len && !isPathSeparator(path.charCodeAt(j))) {
                        j++;
                    }
                    if (j < len && j !== last) {
                        const firstPart = path.slice(last, j);
                        // Matched!
                        last = j;
                        // Match 1 or more path separators
                        while (j < len && isPathSeparator(path.charCodeAt(j))) {
                            j++;
                        }
                        if (j < len && j !== last) {
                            // Matched!
                            last = j;
                            // Match 1 or more non-path separators
                            while (j < len && !isPathSeparator(path.charCodeAt(j))) {
                                j++;
                            }
                            if (j === len) {
                                // We matched a UNC root only
                                // Return the normalized version of the UNC root since there
                                // is nothing left to process
                                return `\\\\${firstPart}\\${path.slice(last)}\\`;
                            }
                            if (j !== last) {
                                // We matched a UNC root with leftovers
                                device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                                rootEnd = j;
                            }
                        }
                    }
                }
                else {
                    rootEnd = 1;
                }
            }
            else if (isWindowsDeviceRoot(code) && path.charCodeAt(1) === CHAR_COLON) {
                // Possible device root
                device = path.slice(0, 2);
                rootEnd = 2;
                if (len > 2 && isPathSeparator(path.charCodeAt(2))) {
                    // Treat separator following drive name as an absolute path
                    // indicator
                    isAbsolute = true;
                    rootEnd = 3;
                }
            }
            let tail = rootEnd < len ?
                normalizeString(path.slice(rootEnd), !isAbsolute, '\\', isPathSeparator) :
                '';
            if (tail.length === 0 && !isAbsolute) {
                tail = '.';
            }
            if (tail.length > 0 && isPathSeparator(path.charCodeAt(len - 1))) {
                tail += '\\';
            }
            if (device === undefined) {
                return isAbsolute ? `\\${tail}` : tail;
            }
            return isAbsolute ? `${device}\\${tail}` : `${device}${tail}`;
        },
        isAbsolute(path) {
            validateString(path, 'path');
            const len = path.length;
            if (len === 0) {
                return false;
            }
            const code = path.charCodeAt(0);
            return isPathSeparator(code) ||
                // Possible device root
                len > 2 &&
                    isWindowsDeviceRoot(code) &&
                    path.charCodeAt(1) === CHAR_COLON &&
                    isPathSeparator(path.charCodeAt(2));
        },
        join(...paths) {
            if (paths.length === 0) {
                return '.';
            }
            let joined;
            let firstPart;
            for (let i = 0; i < paths.length; ++i) {
                const arg = paths[i];
                validateString(arg, 'path');
                if (arg.length > 0) {
                    if (joined === undefined) {
                        joined = firstPart = arg;
                    }
                    else {
                        joined += `\\${arg}`;
                    }
                }
            }
            if (joined === undefined) {
                return '.';
            }
            // Make sure that the joined path doesn't start with two slashes, because
            // normalize() will mistake it for an UNC path then.
            //
            // This step is skipped when it is very clear that the user actually
            // intended to point at an UNC path. This is assumed when the first
            // non-empty string arguments starts with exactly two slashes followed by
            // at least one more non-slash character.
            //
            // Note that for normalize() to treat a path as an UNC path it needs to
            // have at least 2 components, so we don't filter for that here.
            // This means that the user can use join to construct UNC paths from
            // a server name and a share name; for example:
            //   path.join('//server', 'share') -> '\\\\server\\share\\')
            let needsReplace = true;
            let slashCount = 0;
            if (typeof firstPart === 'string' && isPathSeparator(firstPart.charCodeAt(0))) {
                ++slashCount;
                const firstLen = firstPart.length;
                if (firstLen > 1 && isPathSeparator(firstPart.charCodeAt(1))) {
                    ++slashCount;
                    if (firstLen > 2) {
                        if (isPathSeparator(firstPart.charCodeAt(2))) {
                            ++slashCount;
                        }
                        else {
                            // We matched a UNC path in the first part
                            needsReplace = false;
                        }
                    }
                }
            }
            if (needsReplace) {
                // Find any more consecutive slashes we need to replace
                while (slashCount < joined.length &&
                    isPathSeparator(joined.charCodeAt(slashCount))) {
                    slashCount++;
                }
                // Replace the slashes if needed
                if (slashCount >= 2) {
                    joined = `\\${joined.slice(slashCount)}`;
                }
            }
            return exports.win32.normalize(joined);
        },
        // It will solve the relative path from `from` to `to`, for instance:
        //  from = 'C:\\orandea\\test\\aaa'
        //  to = 'C:\\orandea\\impl\\bbb'
        // The output of the function should be: '..\\..\\impl\\bbb'
        relative(from, to) {
            validateString(from, 'from');
            validateString(to, 'to');
            if (from === to) {
                return '';
            }
            const fromOrig = exports.win32.resolve(from);
            const toOrig = exports.win32.resolve(to);
            if (fromOrig === toOrig) {
                return '';
            }
            from = fromOrig.toLowerCase();
            to = toOrig.toLowerCase();
            if (from === to) {
                return '';
            }
            // Trim any leading backslashes
            let fromStart = 0;
            while (fromStart < from.length &&
                from.charCodeAt(fromStart) === CHAR_BACKWARD_SLASH) {
                fromStart++;
            }
            // Trim trailing backslashes (applicable to UNC paths only)
            let fromEnd = from.length;
            while (fromEnd - 1 > fromStart &&
                from.charCodeAt(fromEnd - 1) === CHAR_BACKWARD_SLASH) {
                fromEnd--;
            }
            const fromLen = fromEnd - fromStart;
            // Trim any leading backslashes
            let toStart = 0;
            while (toStart < to.length &&
                to.charCodeAt(toStart) === CHAR_BACKWARD_SLASH) {
                toStart++;
            }
            // Trim trailing backslashes (applicable to UNC paths only)
            let toEnd = to.length;
            while (toEnd - 1 > toStart &&
                to.charCodeAt(toEnd - 1) === CHAR_BACKWARD_SLASH) {
                toEnd--;
            }
            const toLen = toEnd - toStart;
            // Compare paths to find the longest common path from root
            const length = fromLen < toLen ? fromLen : toLen;
            let lastCommonSep = -1;
            let i = 0;
            for (; i < length; i++) {
                const fromCode = from.charCodeAt(fromStart + i);
                if (fromCode !== to.charCodeAt(toStart + i)) {
                    break;
                }
                else if (fromCode === CHAR_BACKWARD_SLASH) {
                    lastCommonSep = i;
                }
            }
            // We found a mismatch before the first common path separator was seen, so
            // return the original `to`.
            if (i !== length) {
                if (lastCommonSep === -1) {
                    return toOrig;
                }
            }
            else {
                if (toLen > length) {
                    if (to.charCodeAt(toStart + i) === CHAR_BACKWARD_SLASH) {
                        // We get here if `from` is the exact base path for `to`.
                        // For example: from='C:\\foo\\bar'; to='C:\\foo\\bar\\baz'
                        return toOrig.slice(toStart + i + 1);
                    }
                    if (i === 2) {
                        // We get here if `from` is the device root.
                        // For example: from='C:\\'; to='C:\\foo'
                        return toOrig.slice(toStart + i);
                    }
                }
                if (fromLen > length) {
                    if (from.charCodeAt(fromStart + i) === CHAR_BACKWARD_SLASH) {
                        // We get here if `to` is the exact base path for `from`.
                        // For example: from='C:\\foo\\bar'; to='C:\\foo'
                        lastCommonSep = i;
                    }
                    else if (i === 2) {
                        // We get here if `to` is the device root.
                        // For example: from='C:\\foo\\bar'; to='C:\\'
                        lastCommonSep = 3;
                    }
                }
                if (lastCommonSep === -1) {
                    lastCommonSep = 0;
                }
            }
            let out = '';
            // Generate the relative path based on the path difference between `to` and
            // `from`
            for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
                if (i === fromEnd || from.charCodeAt(i) === CHAR_BACKWARD_SLASH) {
                    out += out.length === 0 ? '..' : '\\..';
                }
            }
            toStart += lastCommonSep;
            // Lastly, append the rest of the destination (`to`) path that comes after
            // the common path parts
            if (out.length > 0) {
                return `${out}${toOrig.slice(toStart, toEnd)}`;
            }
            if (toOrig.charCodeAt(toStart) === CHAR_BACKWARD_SLASH) {
                ++toStart;
            }
            return toOrig.slice(toStart, toEnd);
        },
        toNamespacedPath(path) {
            // Note: this will *probably* throw somewhere.
            if (typeof path !== 'string') {
                return path;
            }
            if (path.length === 0) {
                return '';
            }
            const resolvedPath = exports.win32.resolve(path);
            if (resolvedPath.length <= 2) {
                return path;
            }
            if (resolvedPath.charCodeAt(0) === CHAR_BACKWARD_SLASH) {
                // Possible UNC root
                if (resolvedPath.charCodeAt(1) === CHAR_BACKWARD_SLASH) {
                    const code = resolvedPath.charCodeAt(2);
                    if (code !== CHAR_QUESTION_MARK && code !== CHAR_DOT) {
                        // Matched non-long UNC root, convert the path to a long UNC path
                        return `\\\\?\\UNC\\${resolvedPath.slice(2)}`;
                    }
                }
            }
            else if (isWindowsDeviceRoot(resolvedPath.charCodeAt(0)) &&
                resolvedPath.charCodeAt(1) === CHAR_COLON &&
                resolvedPath.charCodeAt(2) === CHAR_BACKWARD_SLASH) {
                // Matched device root, convert the path to a long UNC path
                return `\\\\?\\${resolvedPath}`;
            }
            return path;
        },
        dirname(path) {
            validateString(path, 'path');
            const len = path.length;
            if (len === 0) {
                return '.';
            }
            let rootEnd = -1;
            let offset = 0;
            const code = path.charCodeAt(0);
            if (len === 1) {
                // `path` contains just a path separator, exit early to avoid
                // unnecessary work or a dot.
                return isPathSeparator(code) ? path : '.';
            }
            // Try to match a root
            if (isPathSeparator(code)) {
                // Possible UNC root
                rootEnd = offset = 1;
                if (isPathSeparator(path.charCodeAt(1))) {
                    // Matched double path separator at beginning
                    let j = 2;
                    let last = j;
                    // Match 1 or more non-path separators
                    while (j < len && !isPathSeparator(path.charCodeAt(j))) {
                        j++;
                    }
                    if (j < len && j !== last) {
                        // Matched!
                        last = j;
                        // Match 1 or more path separators
                        while (j < len && isPathSeparator(path.charCodeAt(j))) {
                            j++;
                        }
                        if (j < len && j !== last) {
                            // Matched!
                            last = j;
                            // Match 1 or more non-path separators
                            while (j < len && !isPathSeparator(path.charCodeAt(j))) {
                                j++;
                            }
                            if (j === len) {
                                // We matched a UNC root only
                                return path;
                            }
                            if (j !== last) {
                                // We matched a UNC root with leftovers
                                // Offset by 1 to include the separator after the UNC root to
                                // treat it as a "normal root" on top of a (UNC) root
                                rootEnd = offset = j + 1;
                            }
                        }
                    }
                }
                // Possible device root
            }
            else if (isWindowsDeviceRoot(code) && path.charCodeAt(1) === CHAR_COLON) {
                rootEnd = len > 2 && isPathSeparator(path.charCodeAt(2)) ? 3 : 2;
                offset = rootEnd;
            }
            let end = -1;
            let matchedSlash = true;
            for (let i = len - 1; i >= offset; --i) {
                if (isPathSeparator(path.charCodeAt(i))) {
                    if (!matchedSlash) {
                        end = i;
                        break;
                    }
                }
                else {
                    // We saw the first non-path separator
                    matchedSlash = false;
                }
            }
            if (end === -1) {
                if (rootEnd === -1) {
                    return '.';
                }
                end = rootEnd;
            }
            return path.slice(0, end);
        },
        basename(path, ext) {
            if (ext !== undefined) {
                validateString(ext, 'ext');
            }
            validateString(path, 'path');
            let start = 0;
            let end = -1;
            let matchedSlash = true;
            let i;
            // Check for a drive letter prefix so as not to mistake the following
            // path separator as an extra separator at the end of the path that can be
            // disregarded
            if (path.length >= 2 &&
                isWindowsDeviceRoot(path.charCodeAt(0)) &&
                path.charCodeAt(1) === CHAR_COLON) {
                start = 2;
            }
            if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
                if (ext === path) {
                    return '';
                }
                let extIdx = ext.length - 1;
                let firstNonSlashEnd = -1;
                for (i = path.length - 1; i >= start; --i) {
                    const code = path.charCodeAt(i);
                    if (isPathSeparator(code)) {
                        // If we reached a path separator that was not part of a set of path
                        // separators at the end of the string, stop now
                        if (!matchedSlash) {
                            start = i + 1;
                            break;
                        }
                    }
                    else {
                        if (firstNonSlashEnd === -1) {
                            // We saw the first non-path separator, remember this index in case
                            // we need it if the extension ends up not matching
                            matchedSlash = false;
                            firstNonSlashEnd = i + 1;
                        }
                        if (extIdx >= 0) {
                            // Try to match the explicit extension
                            if (code === ext.charCodeAt(extIdx)) {
                                if (--extIdx === -1) {
                                    // We matched the extension, so mark this as the end of our path
                                    // component
                                    end = i;
                                }
                            }
                            else {
                                // Extension does not match, so our result is the entire path
                                // component
                                extIdx = -1;
                                end = firstNonSlashEnd;
                            }
                        }
                    }
                }
                if (start === end) {
                    end = firstNonSlashEnd;
                }
                else if (end === -1) {
                    end = path.length;
                }
                return path.slice(start, end);
            }
            for (i = path.length - 1; i >= start; --i) {
                if (isPathSeparator(path.charCodeAt(i))) {
                    // If we reached a path separator that was not part of a set of path
                    // separators at the end of the string, stop now
                    if (!matchedSlash) {
                        start = i + 1;
                        break;
                    }
                }
                else if (end === -1) {
                    // We saw the first non-path separator, mark this as the end of our
                    // path component
                    matchedSlash = false;
                    end = i + 1;
                }
            }
            if (end === -1) {
                return '';
            }
            return path.slice(start, end);
        },
        extname(path) {
            validateString(path, 'path');
            let start = 0;
            let startDot = -1;
            let startPart = 0;
            let end = -1;
            let matchedSlash = true;
            // Track the state of characters (if any) we see before our first dot and
            // after any path separator we find
            let preDotState = 0;
            // Check for a drive letter prefix so as not to mistake the following
            // path separator as an extra separator at the end of the path that can be
            // disregarded
            if (path.length >= 2 &&
                path.charCodeAt(1) === CHAR_COLON &&
                isWindowsDeviceRoot(path.charCodeAt(0))) {
                start = startPart = 2;
            }
            for (let i = path.length - 1; i >= start; --i) {
                const code = path.charCodeAt(i);
                if (isPathSeparator(code)) {
                    // If we reached a path separator that was not part of a set of path
                    // separators at the end of the string, stop now
                    if (!matchedSlash) {
                        startPart = i + 1;
                        break;
                    }
                    continue;
                }
                if (end === -1) {
                    // We saw the first non-path separator, mark this as the end of our
                    // extension
                    matchedSlash = false;
                    end = i + 1;
                }
                if (code === CHAR_DOT) {
                    // If this is our first dot, mark it as the start of our extension
                    if (startDot === -1) {
                        startDot = i;
                    }
                    else if (preDotState !== 1) {
                        preDotState = 1;
                    }
                }
                else if (startDot !== -1) {
                    // We saw a non-dot and non-path separator before our dot, so we should
                    // have a good chance at having a non-empty extension
                    preDotState = -1;
                }
            }
            if (startDot === -1 ||
                end === -1 ||
                // We saw a non-dot character immediately before the dot
                preDotState === 0 ||
                // The (right-most) trimmed path component is exactly '..'
                (preDotState === 1 &&
                    startDot === end - 1 &&
                    startDot === startPart + 1)) {
                return '';
            }
            return path.slice(startDot, end);
        },
        format: _format.bind(null, '\\'),
        parse(path) {
            validateString(path, 'path');
            const ret = { root: '', dir: '', base: '', ext: '', name: '' };
            if (path.length === 0) {
                return ret;
            }
            const len = path.length;
            let rootEnd = 0;
            let code = path.charCodeAt(0);
            if (len === 1) {
                if (isPathSeparator(code)) {
                    // `path` contains just a path separator, exit early to avoid
                    // unnecessary work
                    ret.root = ret.dir = path;
                    return ret;
                }
                ret.base = ret.name = path;
                return ret;
            }
            // Try to match a root
            if (isPathSeparator(code)) {
                // Possible UNC root
                rootEnd = 1;
                if (isPathSeparator(path.charCodeAt(1))) {
                    // Matched double path separator at beginning
                    let j = 2;
                    let last = j;
                    // Match 1 or more non-path separators
                    while (j < len && !isPathSeparator(path.charCodeAt(j))) {
                        j++;
                    }
                    if (j < len && j !== last) {
                        // Matched!
                        last = j;
                        // Match 1 or more path separators
                        while (j < len && isPathSeparator(path.charCodeAt(j))) {
                            j++;
                        }
                        if (j < len && j !== last) {
                            // Matched!
                            last = j;
                            // Match 1 or more non-path separators
                            while (j < len && !isPathSeparator(path.charCodeAt(j))) {
                                j++;
                            }
                            if (j === len) {
                                // We matched a UNC root only
                                rootEnd = j;
                            }
                            else if (j !== last) {
                                // We matched a UNC root with leftovers
                                rootEnd = j + 1;
                            }
                        }
                    }
                }
            }
            else if (isWindowsDeviceRoot(code) && path.charCodeAt(1) === CHAR_COLON) {
                // Possible device root
                if (len <= 2) {
                    // `path` contains just a drive root, exit early to avoid
                    // unnecessary work
                    ret.root = ret.dir = path;
                    return ret;
                }
                rootEnd = 2;
                if (isPathSeparator(path.charCodeAt(2))) {
                    if (len === 3) {
                        // `path` contains just a drive root, exit early to avoid
                        // unnecessary work
                        ret.root = ret.dir = path;
                        return ret;
                    }
                    rootEnd = 3;
                }
            }
            if (rootEnd > 0) {
                ret.root = path.slice(0, rootEnd);
            }
            let startDot = -1;
            let startPart = rootEnd;
            let end = -1;
            let matchedSlash = true;
            let i = path.length - 1;
            // Track the state of characters (if any) we see before our first dot and
            // after any path separator we find
            let preDotState = 0;
            // Get non-dir info
            for (; i >= rootEnd; --i) {
                code = path.charCodeAt(i);
                if (isPathSeparator(code)) {
                    // If we reached a path separator that was not part of a set of path
                    // separators at the end of the string, stop now
                    if (!matchedSlash) {
                        startPart = i + 1;
                        break;
                    }
                    continue;
                }
                if (end === -1) {
                    // We saw the first non-path separator, mark this as the end of our
                    // extension
                    matchedSlash = false;
                    end = i + 1;
                }
                if (code === CHAR_DOT) {
                    // If this is our first dot, mark it as the start of our extension
                    if (startDot === -1) {
                        startDot = i;
                    }
                    else if (preDotState !== 1) {
                        preDotState = 1;
                    }
                }
                else if (startDot !== -1) {
                    // We saw a non-dot and non-path separator before our dot, so we should
                    // have a good chance at having a non-empty extension
                    preDotState = -1;
                }
            }
            if (end !== -1) {
                if (startDot === -1 ||
                    // We saw a non-dot character immediately before the dot
                    preDotState === 0 ||
                    // The (right-most) trimmed path component is exactly '..'
                    (preDotState === 1 &&
                        startDot === end - 1 &&
                        startDot === startPart + 1)) {
                    ret.base = ret.name = path.slice(startPart, end);
                }
                else {
                    ret.name = path.slice(startPart, startDot);
                    ret.base = path.slice(startPart, end);
                    ret.ext = path.slice(startDot, end);
                }
            }
            // If the directory is the root, use the entire root as the `dir` including
            // the trailing slash if any (`C:\abc` -> `C:\`). Otherwise, strip out the
            // trailing slash (`C:\abc\def` -> `C:\abc`).
            if (startPart > 0 && startPart !== rootEnd) {
                ret.dir = path.slice(0, startPart - 1);
            }
            else {
                ret.dir = ret.root;
            }
            return ret;
        },
        sep: '\\',
        delimiter: ';',
        win32: null,
        posix: null
    };
    exports.posix = {
        // path.resolve([from ...], to)
        resolve(...pathSegments) {
            let resolvedPath = '';
            let resolvedAbsolute = false;
            for (let i = pathSegments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
                const path = i >= 0 ? pathSegments[i] : process.cwd();
                validateString(path, 'path');
                // Skip empty entries
                if (path.length === 0) {
                    continue;
                }
                resolvedPath = `${path}/${resolvedPath}`;
                resolvedAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
            }
            // At this point the path should be resolved to a full absolute path, but
            // handle relative paths to be safe (might happen when process.cwd() fails)
            // Normalize the path
            resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute, '/', isPosixPathSeparator);
            if (resolvedAbsolute) {
                return `/${resolvedPath}`;
            }
            return resolvedPath.length > 0 ? resolvedPath : '.';
        },
        normalize(path) {
            validateString(path, 'path');
            if (path.length === 0) {
                return '.';
            }
            const isAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
            const trailingSeparator = path.charCodeAt(path.length - 1) === CHAR_FORWARD_SLASH;
            // Normalize the path
            path = normalizeString(path, !isAbsolute, '/', isPosixPathSeparator);
            if (path.length === 0) {
                if (isAbsolute) {
                    return '/';
                }
                return trailingSeparator ? './' : '.';
            }
            if (trailingSeparator) {
                path += '/';
            }
            return isAbsolute ? `/${path}` : path;
        },
        isAbsolute(path) {
            validateString(path, 'path');
            return path.length > 0 && path.charCodeAt(0) === CHAR_FORWARD_SLASH;
        },
        join(...paths) {
            if (paths.length === 0) {
                return '.';
            }
            let joined;
            for (let i = 0; i < paths.length; ++i) {
                const arg = paths[i];
                validateString(arg, 'path');
                if (arg.length > 0) {
                    if (joined === undefined) {
                        joined = arg;
                    }
                    else {
                        joined += `/${arg}`;
                    }
                }
            }
            if (joined === undefined) {
                return '.';
            }
            return exports.posix.normalize(joined);
        },
        relative(from, to) {
            validateString(from, 'from');
            validateString(to, 'to');
            if (from === to) {
                return '';
            }
            // Trim leading forward slashes.
            from = exports.posix.resolve(from);
            to = exports.posix.resolve(to);
            if (from === to) {
                return '';
            }
            const fromStart = 1;
            const fromEnd = from.length;
            const fromLen = fromEnd - fromStart;
            const toStart = 1;
            const toLen = to.length - toStart;
            // Compare paths to find the longest common path from root
            const length = (fromLen < toLen ? fromLen : toLen);
            let lastCommonSep = -1;
            let i = 0;
            for (; i < length; i++) {
                const fromCode = from.charCodeAt(fromStart + i);
                if (fromCode !== to.charCodeAt(toStart + i)) {
                    break;
                }
                else if (fromCode === CHAR_FORWARD_SLASH) {
                    lastCommonSep = i;
                }
            }
            if (i === length) {
                if (toLen > length) {
                    if (to.charCodeAt(toStart + i) === CHAR_FORWARD_SLASH) {
                        // We get here if `from` is the exact base path for `to`.
                        // For example: from='/foo/bar'; to='/foo/bar/baz'
                        return to.slice(toStart + i + 1);
                    }
                    if (i === 0) {
                        // We get here if `from` is the root
                        // For example: from='/'; to='/foo'
                        return to.slice(toStart + i);
                    }
                }
                else if (fromLen > length) {
                    if (from.charCodeAt(fromStart + i) === CHAR_FORWARD_SLASH) {
                        // We get here if `to` is the exact base path for `from`.
                        // For example: from='/foo/bar/baz'; to='/foo/bar'
                        lastCommonSep = i;
                    }
                    else if (i === 0) {
                        // We get here if `to` is the root.
                        // For example: from='/foo/bar'; to='/'
                        lastCommonSep = 0;
                    }
                }
            }
            let out = '';
            // Generate the relative path based on the path difference between `to`
            // and `from`.
            for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
                if (i === fromEnd || from.charCodeAt(i) === CHAR_FORWARD_SLASH) {
                    out += out.length === 0 ? '..' : '/..';
                }
            }
            // Lastly, append the rest of the destination (`to`) path that comes after
            // the common path parts.
            return `${out}${to.slice(toStart + lastCommonSep)}`;
        },
        toNamespacedPath(path) {
            // Non-op on posix systems
            return path;
        },
        dirname(path) {
            validateString(path, 'path');
            if (path.length === 0) {
                return '.';
            }
            const hasRoot = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
            let end = -1;
            let matchedSlash = true;
            for (let i = path.length - 1; i >= 1; --i) {
                if (path.charCodeAt(i) === CHAR_FORWARD_SLASH) {
                    if (!matchedSlash) {
                        end = i;
                        break;
                    }
                }
                else {
                    // We saw the first non-path separator
                    matchedSlash = false;
                }
            }
            if (end === -1) {
                return hasRoot ? '/' : '.';
            }
            if (hasRoot && end === 1) {
                return '//';
            }
            return path.slice(0, end);
        },
        basename(path, ext) {
            if (ext !== undefined) {
                validateString(ext, 'ext');
            }
            validateString(path, 'path');
            let start = 0;
            let end = -1;
            let matchedSlash = true;
            let i;
            if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
                if (ext === path) {
                    return '';
                }
                let extIdx = ext.length - 1;
                let firstNonSlashEnd = -1;
                for (i = path.length - 1; i >= 0; --i) {
                    const code = path.charCodeAt(i);
                    if (code === CHAR_FORWARD_SLASH) {
                        // If we reached a path separator that was not part of a set of path
                        // separators at the end of the string, stop now
                        if (!matchedSlash) {
                            start = i + 1;
                            break;
                        }
                    }
                    else {
                        if (firstNonSlashEnd === -1) {
                            // We saw the first non-path separator, remember this index in case
                            // we need it if the extension ends up not matching
                            matchedSlash = false;
                            firstNonSlashEnd = i + 1;
                        }
                        if (extIdx >= 0) {
                            // Try to match the explicit extension
                            if (code === ext.charCodeAt(extIdx)) {
                                if (--extIdx === -1) {
                                    // We matched the extension, so mark this as the end of our path
                                    // component
                                    end = i;
                                }
                            }
                            else {
                                // Extension does not match, so our result is the entire path
                                // component
                                extIdx = -1;
                                end = firstNonSlashEnd;
                            }
                        }
                    }
                }
                if (start === end) {
                    end = firstNonSlashEnd;
                }
                else if (end === -1) {
                    end = path.length;
                }
                return path.slice(start, end);
            }
            for (i = path.length - 1; i >= 0; --i) {
                if (path.charCodeAt(i) === CHAR_FORWARD_SLASH) {
                    // If we reached a path separator that was not part of a set of path
                    // separators at the end of the string, stop now
                    if (!matchedSlash) {
                        start = i + 1;
                        break;
                    }
                }
                else if (end === -1) {
                    // We saw the first non-path separator, mark this as the end of our
                    // path component
                    matchedSlash = false;
                    end = i + 1;
                }
            }
            if (end === -1) {
                return '';
            }
            return path.slice(start, end);
        },
        extname(path) {
            validateString(path, 'path');
            let startDot = -1;
            let startPart = 0;
            let end = -1;
            let matchedSlash = true;
            // Track the state of characters (if any) we see before our first dot and
            // after any path separator we find
            let preDotState = 0;
            for (let i = path.length - 1; i >= 0; --i) {
                const code = path.charCodeAt(i);
                if (code === CHAR_FORWARD_SLASH) {
                    // If we reached a path separator that was not part of a set of path
                    // separators at the end of the string, stop now
                    if (!matchedSlash) {
                        startPart = i + 1;
                        break;
                    }
                    continue;
                }
                if (end === -1) {
                    // We saw the first non-path separator, mark this as the end of our
                    // extension
                    matchedSlash = false;
                    end = i + 1;
                }
                if (code === CHAR_DOT) {
                    // If this is our first dot, mark it as the start of our extension
                    if (startDot === -1) {
                        startDot = i;
                    }
                    else if (preDotState !== 1) {
                        preDotState = 1;
                    }
                }
                else if (startDot !== -1) {
                    // We saw a non-dot and non-path separator before our dot, so we should
                    // have a good chance at having a non-empty extension
                    preDotState = -1;
                }
            }
            if (startDot === -1 ||
                end === -1 ||
                // We saw a non-dot character immediately before the dot
                preDotState === 0 ||
                // The (right-most) trimmed path component is exactly '..'
                (preDotState === 1 &&
                    startDot === end - 1 &&
                    startDot === startPart + 1)) {
                return '';
            }
            return path.slice(startDot, end);
        },
        format: _format.bind(null, '/'),
        parse(path) {
            validateString(path, 'path');
            const ret = { root: '', dir: '', base: '', ext: '', name: '' };
            if (path.length === 0) {
                return ret;
            }
            const isAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
            let start;
            if (isAbsolute) {
                ret.root = '/';
                start = 1;
            }
            else {
                start = 0;
            }
            let startDot = -1;
            let startPart = 0;
            let end = -1;
            let matchedSlash = true;
            let i = path.length - 1;
            // Track the state of characters (if any) we see before our first dot and
            // after any path separator we find
            let preDotState = 0;
            // Get non-dir info
            for (; i >= start; --i) {
                const code = path.charCodeAt(i);
                if (code === CHAR_FORWARD_SLASH) {
                    // If we reached a path separator that was not part of a set of path
                    // separators at the end of the string, stop now
                    if (!matchedSlash) {
                        startPart = i + 1;
                        break;
                    }
                    continue;
                }
                if (end === -1) {
                    // We saw the first non-path separator, mark this as the end of our
                    // extension
                    matchedSlash = false;
                    end = i + 1;
                }
                if (code === CHAR_DOT) {
                    // If this is our first dot, mark it as the start of our extension
                    if (startDot === -1) {
                        startDot = i;
                    }
                    else if (preDotState !== 1) {
                        preDotState = 1;
                    }
                }
                else if (startDot !== -1) {
                    // We saw a non-dot and non-path separator before our dot, so we should
                    // have a good chance at having a non-empty extension
                    preDotState = -1;
                }
            }
            if (end !== -1) {
                const start = startPart === 0 && isAbsolute ? 1 : startPart;
                if (startDot === -1 ||
                    // We saw a non-dot character immediately before the dot
                    preDotState === 0 ||
                    // The (right-most) trimmed path component is exactly '..'
                    (preDotState === 1 &&
                        startDot === end - 1 &&
                        startDot === startPart + 1)) {
                    ret.base = ret.name = path.slice(start, end);
                }
                else {
                    ret.name = path.slice(start, startDot);
                    ret.base = path.slice(start, end);
                    ret.ext = path.slice(startDot, end);
                }
            }
            if (startPart > 0) {
                ret.dir = path.slice(0, startPart - 1);
            }
            else if (isAbsolute) {
                ret.dir = '/';
            }
            return ret;
        },
        sep: '/',
        delimiter: ':',
        win32: null,
        posix: null
    };
    exports.posix.win32 = exports.win32.win32 = exports.win32;
    exports.posix.posix = exports.win32.posix = exports.posix;
    exports.normalize = (process.platform === 'win32' ? exports.win32.normalize : exports.posix.normalize);
    exports.isAbsolute = (process.platform === 'win32' ? exports.win32.isAbsolute : exports.posix.isAbsolute);
    exports.join = (process.platform === 'win32' ? exports.win32.join : exports.posix.join);
    exports.resolve = (process.platform === 'win32' ? exports.win32.resolve : exports.posix.resolve);
    exports.relative = (process.platform === 'win32' ? exports.win32.relative : exports.posix.relative);
    exports.dirname = (process.platform === 'win32' ? exports.win32.dirname : exports.posix.dirname);
    exports.basename = (process.platform === 'win32' ? exports.win32.basename : exports.posix.basename);
    exports.extname = (process.platform === 'win32' ? exports.win32.extname : exports.posix.extname);
    exports.format = (process.platform === 'win32' ? exports.win32.format : exports.posix.format);
    exports.parse = (process.platform === 'win32' ? exports.win32.parse : exports.posix.parse);
    exports.toNamespacedPath = (process.platform === 'win32' ? exports.win32.toNamespacedPath : exports.posix.toNamespacedPath);
    exports.sep = (process.platform === 'win32' ? exports.win32.sep : exports.posix.sep);
    exports.delimiter = (process.platform === 'win32' ? exports.win32.delimiter : exports.posix.delimiter);
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[30/*vs/base/common/stream*/], __M([0/*require*/,1/*exports*/,4/*vs/base/common/lifecycle*/]), function (require, exports, lifecycle_1) {
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
define(__m[6/*vs/base/common/strings*/], __M([0/*require*/,1/*exports*/]), function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GraphemeBreakType = exports.breakBetweenGraphemeBreakType = exports.getGraphemeBreakType = exports.singleLetterHash = exports.getNLines = exports.uppercaseFirstLetter = exports.containsUppercaseCharacter = exports.fuzzyContains = exports.stripUTF8BOM = exports.startsWithUTF8BOM = exports.UTF8_BOM_CHARACTER = exports.removeAnsiEscapeCodes = exports.lcut = exports.isEmojiImprecise = exports.isFullWidthCharacter = exports.containsFullWidthCharacter = exports.containsUnusualLineTerminators = exports.UNUSUAL_LINE_TERMINATORS = exports.isBasicASCII = exports.containsEmoji = exports.containsRTL = exports.decodeUTF8 = exports.encodeUTF8 = exports.getCharContainingOffset = exports.prevCharLength = exports.nextCharLength = exports.getNextCodePoint = exports.computeCodePoint = exports.isLowSurrogate = exports.isHighSurrogate = exports.commonSuffixLength = exports.commonPrefixLength = exports.startsWithIgnoreCase = exports.equalsIgnoreCase = exports.isUpperAsciiLetter = exports.isLowerAsciiLetter = exports.compareSubstringIgnoreCase = exports.compareIgnoreCase = exports.compareSubstring = exports.compare = exports.lastNonWhitespaceIndex = exports.getLeadingWhitespace = exports.firstNonWhitespaceIndex = exports.regExpFlags = exports.regExpContainsBackreference = exports.regExpLeadsToEndlessLoop = exports.createRegExp = exports.stripWildcards = exports.convertSimple2RegExpPattern = exports.rtrim = exports.ltrim = exports.trim = exports.escapeRegExpCharacters = exports.escape = exports.format = exports.pad = exports.isFalsyOrWhitespace = void 0;
    function isFalsyOrWhitespace(str) {
        if (!str || typeof str !== 'string') {
            return true;
        }
        return str.trim().length === 0;
    }
    exports.isFalsyOrWhitespace = isFalsyOrWhitespace;
    /**
     * @deprecated ES6: use `String.padStart`
     */
    function pad(n, l, char = '0') {
        const str = '' + n;
        const r = [str];
        for (let i = str.length; i < l; i++) {
            r.push(char);
        }
        return r.reverse().join('');
    }
    exports.pad = pad;
    const _formatRegexp = /{(\d+)}/g;
    /**
     * Helper to produce a string with a variable number of arguments. Insert variable segments
     * into the string using the {n} notation where N is the index of the argument following the string.
     * @param value string to which formatting is applied
     * @param args replacements for {n}-entries
     */
    function format(value, ...args) {
        if (args.length === 0) {
            return value;
        }
        return value.replace(_formatRegexp, function (match, group) {
            const idx = parseInt(group, 10);
            return isNaN(idx) || idx < 0 || idx >= args.length ?
                match :
                args[idx];
        });
    }
    exports.format = format;
    /**
     * Converts HTML characters inside the string to use entities instead. Makes the string safe from
     * being used e.g. in HTMLElement.innerHTML.
     */
    function escape(html) {
        return html.replace(/[<>&]/g, function (match) {
            switch (match) {
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '&': return '&amp;';
                default: return match;
            }
        });
    }
    exports.escape = escape;
    /**
     * Escapes regular expression characters in a given string
     */
    function escapeRegExpCharacters(value) {
        return value.replace(/[\\\{\}\*\+\?\|\^\$\.\[\]\(\)]/g, '\\$&');
    }
    exports.escapeRegExpCharacters = escapeRegExpCharacters;
    /**
     * Removes all occurrences of needle from the beginning and end of haystack.
     * @param haystack string to trim
     * @param needle the thing to trim (default is a blank)
     */
    function trim(haystack, needle = ' ') {
        const trimmed = ltrim(haystack, needle);
        return rtrim(trimmed, needle);
    }
    exports.trim = trim;
    /**
     * Removes all occurrences of needle from the beginning of haystack.
     * @param haystack string to trim
     * @param needle the thing to trim
     */
    function ltrim(haystack, needle) {
        if (!haystack || !needle) {
            return haystack;
        }
        const needleLen = needle.length;
        if (needleLen === 0 || haystack.length === 0) {
            return haystack;
        }
        let offset = 0;
        while (haystack.indexOf(needle, offset) === offset) {
            offset = offset + needleLen;
        }
        return haystack.substring(offset);
    }
    exports.ltrim = ltrim;
    /**
     * Removes all occurrences of needle from the end of haystack.
     * @param haystack string to trim
     * @param needle the thing to trim
     */
    function rtrim(haystack, needle) {
        if (!haystack || !needle) {
            return haystack;
        }
        const needleLen = needle.length, haystackLen = haystack.length;
        if (needleLen === 0 || haystackLen === 0) {
            return haystack;
        }
        let offset = haystackLen, idx = -1;
        while (true) {
            idx = haystack.lastIndexOf(needle, offset - 1);
            if (idx === -1 || idx + needleLen !== offset) {
                break;
            }
            if (idx === 0) {
                return '';
            }
            offset = idx;
        }
        return haystack.substring(0, offset);
    }
    exports.rtrim = rtrim;
    function convertSimple2RegExpPattern(pattern) {
        return pattern.replace(/[\-\\\{\}\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, '\\$&').replace(/[\*]/g, '.*');
    }
    exports.convertSimple2RegExpPattern = convertSimple2RegExpPattern;
    function stripWildcards(pattern) {
        return pattern.replace(/\*/g, '');
    }
    exports.stripWildcards = stripWildcards;
    function createRegExp(searchString, isRegex, options = {}) {
        if (!searchString) {
            throw new Error('Cannot create regex from empty string');
        }
        if (!isRegex) {
            searchString = escapeRegExpCharacters(searchString);
        }
        if (options.wholeWord) {
            if (!/\B/.test(searchString.charAt(0))) {
                searchString = '\\b' + searchString;
            }
            if (!/\B/.test(searchString.charAt(searchString.length - 1))) {
                searchString = searchString + '\\b';
            }
        }
        let modifiers = '';
        if (options.global) {
            modifiers += 'g';
        }
        if (!options.matchCase) {
            modifiers += 'i';
        }
        if (options.multiline) {
            modifiers += 'm';
        }
        if (options.unicode) {
            modifiers += 'u';
        }
        return new RegExp(searchString, modifiers);
    }
    exports.createRegExp = createRegExp;
    function regExpLeadsToEndlessLoop(regexp) {
        // Exit early if it's one of these special cases which are meant to match
        // against an empty string
        if (regexp.source === '^' || regexp.source === '^$' || regexp.source === '$' || regexp.source === '^\\s*$') {
            return false;
        }
        // We check against an empty string. If the regular expression doesn't advance
        // (e.g. ends in an endless loop) it will match an empty string.
        const match = regexp.exec('');
        return !!(match && regexp.lastIndex === 0);
    }
    exports.regExpLeadsToEndlessLoop = regExpLeadsToEndlessLoop;
    function regExpContainsBackreference(regexpValue) {
        return !!regexpValue.match(/([^\\]|^)(\\\\)*\\\d+/);
    }
    exports.regExpContainsBackreference = regExpContainsBackreference;
    function regExpFlags(regexp) {
        return (regexp.global ? 'g' : '')
            + (regexp.ignoreCase ? 'i' : '')
            + (regexp.multiline ? 'm' : '')
            + (regexp /* standalone editor compilation */.unicode ? 'u' : '');
    }
    exports.regExpFlags = regExpFlags;
    /**
     * Returns first index of the string that is not whitespace.
     * If string is empty or contains only whitespaces, returns -1
     */
    function firstNonWhitespaceIndex(str) {
        for (let i = 0, len = str.length; i < len; i++) {
            const chCode = str.charCodeAt(i);
            if (chCode !== 32 /* Space */ && chCode !== 9 /* Tab */) {
                return i;
            }
        }
        return -1;
    }
    exports.firstNonWhitespaceIndex = firstNonWhitespaceIndex;
    /**
     * Returns the leading whitespace of the string.
     * If the string contains only whitespaces, returns entire string
     */
    function getLeadingWhitespace(str, start = 0, end = str.length) {
        for (let i = start; i < end; i++) {
            const chCode = str.charCodeAt(i);
            if (chCode !== 32 /* Space */ && chCode !== 9 /* Tab */) {
                return str.substring(start, i);
            }
        }
        return str.substring(start, end);
    }
    exports.getLeadingWhitespace = getLeadingWhitespace;
    /**
     * Returns last index of the string that is not whitespace.
     * If string is empty or contains only whitespaces, returns -1
     */
    function lastNonWhitespaceIndex(str, startIndex = str.length - 1) {
        for (let i = startIndex; i >= 0; i--) {
            const chCode = str.charCodeAt(i);
            if (chCode !== 32 /* Space */ && chCode !== 9 /* Tab */) {
                return i;
            }
        }
        return -1;
    }
    exports.lastNonWhitespaceIndex = lastNonWhitespaceIndex;
    function compare(a, b) {
        if (a < b) {
            return -1;
        }
        else if (a > b) {
            return 1;
        }
        else {
            return 0;
        }
    }
    exports.compare = compare;
    function compareSubstring(a, b, aStart = 0, aEnd = a.length, bStart = 0, bEnd = b.length) {
        for (; aStart < aEnd && bStart < bEnd; aStart++, bStart++) {
            let codeA = a.charCodeAt(aStart);
            let codeB = b.charCodeAt(bStart);
            if (codeA < codeB) {
                return -1;
            }
            else if (codeA > codeB) {
                return 1;
            }
        }
        const aLen = aEnd - aStart;
        const bLen = bEnd - bStart;
        if (aLen < bLen) {
            return -1;
        }
        else if (aLen > bLen) {
            return 1;
        }
        return 0;
    }
    exports.compareSubstring = compareSubstring;
    function compareIgnoreCase(a, b) {
        return compareSubstringIgnoreCase(a, b, 0, a.length, 0, b.length);
    }
    exports.compareIgnoreCase = compareIgnoreCase;
    function compareSubstringIgnoreCase(a, b, aStart = 0, aEnd = a.length, bStart = 0, bEnd = b.length) {
        for (; aStart < aEnd && bStart < bEnd; aStart++, bStart++) {
            let codeA = a.charCodeAt(aStart);
            let codeB = b.charCodeAt(bStart);
            if (codeA === codeB) {
                // equal
                continue;
            }
            const diff = codeA - codeB;
            if (diff === 32 && isUpperAsciiLetter(codeB)) { //codeB =[65-90] && codeA =[97-122]
                continue;
            }
            else if (diff === -32 && isUpperAsciiLetter(codeA)) { //codeB =[97-122] && codeA =[65-90]
                continue;
            }
            if (isLowerAsciiLetter(codeA) && isLowerAsciiLetter(codeB)) {
                //
                return diff;
            }
            else {
                return compareSubstring(a.toLowerCase(), b.toLowerCase(), aStart, aEnd, bStart, bEnd);
            }
        }
        const aLen = aEnd - aStart;
        const bLen = bEnd - bStart;
        if (aLen < bLen) {
            return -1;
        }
        else if (aLen > bLen) {
            return 1;
        }
        return 0;
    }
    exports.compareSubstringIgnoreCase = compareSubstringIgnoreCase;
    function isLowerAsciiLetter(code) {
        return code >= 97 /* a */ && code <= 122 /* z */;
    }
    exports.isLowerAsciiLetter = isLowerAsciiLetter;
    function isUpperAsciiLetter(code) {
        return code >= 65 /* A */ && code <= 90 /* Z */;
    }
    exports.isUpperAsciiLetter = isUpperAsciiLetter;
    function isAsciiLetter(code) {
        return isLowerAsciiLetter(code) || isUpperAsciiLetter(code);
    }
    function equalsIgnoreCase(a, b) {
        return a.length === b.length && doEqualsIgnoreCase(a, b);
    }
    exports.equalsIgnoreCase = equalsIgnoreCase;
    function doEqualsIgnoreCase(a, b, stopAt = a.length) {
        for (let i = 0; i < stopAt; i++) {
            const codeA = a.charCodeAt(i);
            const codeB = b.charCodeAt(i);
            if (codeA === codeB) {
                continue;
            }
            // a-z A-Z
            if (isAsciiLetter(codeA) && isAsciiLetter(codeB)) {
                const diff = Math.abs(codeA - codeB);
                if (diff !== 0 && diff !== 32) {
                    return false;
                }
            }
            // Any other charcode
            else {
                if (String.fromCharCode(codeA).toLowerCase() !== String.fromCharCode(codeB).toLowerCase()) {
                    return false;
                }
            }
        }
        return true;
    }
    function startsWithIgnoreCase(str, candidate) {
        const candidateLength = candidate.length;
        if (candidate.length > str.length) {
            return false;
        }
        return doEqualsIgnoreCase(str, candidate, candidateLength);
    }
    exports.startsWithIgnoreCase = startsWithIgnoreCase;
    /**
     * @returns the length of the common prefix of the two strings.
     */
    function commonPrefixLength(a, b) {
        let i, len = Math.min(a.length, b.length);
        for (i = 0; i < len; i++) {
            if (a.charCodeAt(i) !== b.charCodeAt(i)) {
                return i;
            }
        }
        return len;
    }
    exports.commonPrefixLength = commonPrefixLength;
    /**
     * @returns the length of the common suffix of the two strings.
     */
    function commonSuffixLength(a, b) {
        let i, len = Math.min(a.length, b.length);
        const aLastIndex = a.length - 1;
        const bLastIndex = b.length - 1;
        for (i = 0; i < len; i++) {
            if (a.charCodeAt(aLastIndex - i) !== b.charCodeAt(bLastIndex - i)) {
                return i;
            }
        }
        return len;
    }
    exports.commonSuffixLength = commonSuffixLength;
    /**
     * See http://en.wikipedia.org/wiki/Surrogate_pair
     */
    function isHighSurrogate(charCode) {
        return (0xD800 <= charCode && charCode <= 0xDBFF);
    }
    exports.isHighSurrogate = isHighSurrogate;
    /**
     * See http://en.wikipedia.org/wiki/Surrogate_pair
     */
    function isLowSurrogate(charCode) {
        return (0xDC00 <= charCode && charCode <= 0xDFFF);
    }
    exports.isLowSurrogate = isLowSurrogate;
    /**
     * See http://en.wikipedia.org/wiki/Surrogate_pair
     */
    function computeCodePoint(highSurrogate, lowSurrogate) {
        return ((highSurrogate - 0xD800) << 10) + (lowSurrogate - 0xDC00) + 0x10000;
    }
    exports.computeCodePoint = computeCodePoint;
    /**
     * get the code point that begins at offset `offset`
     */
    function getNextCodePoint(str, len, offset) {
        const charCode = str.charCodeAt(offset);
        if (isHighSurrogate(charCode) && offset + 1 < len) {
            const nextCharCode = str.charCodeAt(offset + 1);
            if (isLowSurrogate(nextCharCode)) {
                return computeCodePoint(charCode, nextCharCode);
            }
        }
        return charCode;
    }
    exports.getNextCodePoint = getNextCodePoint;
    /**
     * get the code point that ends right before offset `offset`
     */
    function getPrevCodePoint(str, offset) {
        const charCode = str.charCodeAt(offset - 1);
        if (isLowSurrogate(charCode) && offset > 1) {
            const prevCharCode = str.charCodeAt(offset - 2);
            if (isHighSurrogate(prevCharCode)) {
                return computeCodePoint(prevCharCode, charCode);
            }
        }
        return charCode;
    }
    function nextCharLength(str, offset) {
        const graphemeBreakTree = GraphemeBreakTree.getInstance();
        const initialOffset = offset;
        const len = str.length;
        const initialCodePoint = getNextCodePoint(str, len, offset);
        offset += (initialCodePoint >= 65536 /* UNICODE_SUPPLEMENTARY_PLANE_BEGIN */ ? 2 : 1);
        let graphemeBreakType = graphemeBreakTree.getGraphemeBreakType(initialCodePoint);
        while (offset < len) {
            const nextCodePoint = getNextCodePoint(str, len, offset);
            const nextGraphemeBreakType = graphemeBreakTree.getGraphemeBreakType(nextCodePoint);
            if (breakBetweenGraphemeBreakType(graphemeBreakType, nextGraphemeBreakType)) {
                break;
            }
            offset += (nextCodePoint >= 65536 /* UNICODE_SUPPLEMENTARY_PLANE_BEGIN */ ? 2 : 1);
            graphemeBreakType = nextGraphemeBreakType;
        }
        return (offset - initialOffset);
    }
    exports.nextCharLength = nextCharLength;
    function prevCharLength(str, offset) {
        const graphemeBreakTree = GraphemeBreakTree.getInstance();
        const initialOffset = offset;
        const initialCodePoint = getPrevCodePoint(str, offset);
        offset -= (initialCodePoint >= 65536 /* UNICODE_SUPPLEMENTARY_PLANE_BEGIN */ ? 2 : 1);
        let graphemeBreakType = graphemeBreakTree.getGraphemeBreakType(initialCodePoint);
        while (offset > 0) {
            const prevCodePoint = getPrevCodePoint(str, offset);
            const prevGraphemeBreakType = graphemeBreakTree.getGraphemeBreakType(prevCodePoint);
            if (breakBetweenGraphemeBreakType(prevGraphemeBreakType, graphemeBreakType)) {
                break;
            }
            offset -= (prevCodePoint >= 65536 /* UNICODE_SUPPLEMENTARY_PLANE_BEGIN */ ? 2 : 1);
            graphemeBreakType = prevGraphemeBreakType;
        }
        return (initialOffset - offset);
    }
    exports.prevCharLength = prevCharLength;
    function _getCharContainingOffset(str, offset) {
        const graphemeBreakTree = GraphemeBreakTree.getInstance();
        const len = str.length;
        const initialOffset = offset;
        const initialCodePoint = getNextCodePoint(str, len, offset);
        const initialGraphemeBreakType = graphemeBreakTree.getGraphemeBreakType(initialCodePoint);
        offset += (initialCodePoint >= 65536 /* UNICODE_SUPPLEMENTARY_PLANE_BEGIN */ ? 2 : 1);
        // extend to the right
        let graphemeBreakType = initialGraphemeBreakType;
        while (offset < len) {
            const nextCodePoint = getNextCodePoint(str, len, offset);
            const nextGraphemeBreakType = graphemeBreakTree.getGraphemeBreakType(nextCodePoint);
            if (breakBetweenGraphemeBreakType(graphemeBreakType, nextGraphemeBreakType)) {
                break;
            }
            offset += (nextCodePoint >= 65536 /* UNICODE_SUPPLEMENTARY_PLANE_BEGIN */ ? 2 : 1);
            graphemeBreakType = nextGraphemeBreakType;
        }
        const endOffset = offset;
        // extend to the left
        offset = initialOffset;
        graphemeBreakType = initialGraphemeBreakType;
        while (offset > 0) {
            const prevCodePoint = getPrevCodePoint(str, offset);
            const prevGraphemeBreakType = graphemeBreakTree.getGraphemeBreakType(prevCodePoint);
            if (breakBetweenGraphemeBreakType(prevGraphemeBreakType, graphemeBreakType)) {
                break;
            }
            offset -= (prevCodePoint >= 65536 /* UNICODE_SUPPLEMENTARY_PLANE_BEGIN */ ? 2 : 1);
            graphemeBreakType = prevGraphemeBreakType;
        }
        return [offset, endOffset];
    }
    function getCharContainingOffset(str, offset) {
        if (offset > 0 && isLowSurrogate(str.charCodeAt(offset))) {
            return _getCharContainingOffset(str, offset - 1);
        }
        return _getCharContainingOffset(str, offset);
    }
    exports.getCharContainingOffset = getCharContainingOffset;
    /**
     * A manual encoding of `str` to UTF8.
     * Use only in environments which do not offer native conversion methods!
     */
    function encodeUTF8(str) {
        const strLen = str.length;
        // See https://en.wikipedia.org/wiki/UTF-8
        // first loop to establish needed buffer size
        let neededSize = 0;
        let strOffset = 0;
        while (strOffset < strLen) {
            const codePoint = getNextCodePoint(str, strLen, strOffset);
            strOffset += (codePoint >= 65536 /* UNICODE_SUPPLEMENTARY_PLANE_BEGIN */ ? 2 : 1);
            if (codePoint < 0x0080) {
                neededSize += 1;
            }
            else if (codePoint < 0x0800) {
                neededSize += 2;
            }
            else if (codePoint < 0x10000) {
                neededSize += 3;
            }
            else {
                neededSize += 4;
            }
        }
        // second loop to actually encode
        const arr = new Uint8Array(neededSize);
        strOffset = 0;
        let arrOffset = 0;
        while (strOffset < strLen) {
            const codePoint = getNextCodePoint(str, strLen, strOffset);
            strOffset += (codePoint >= 65536 /* UNICODE_SUPPLEMENTARY_PLANE_BEGIN */ ? 2 : 1);
            if (codePoint < 0x0080) {
                arr[arrOffset++] = codePoint;
            }
            else if (codePoint < 0x0800) {
                arr[arrOffset++] = 0b11000000 | ((codePoint & 0b00000000000000000000011111000000) >>> 6);
                arr[arrOffset++] = 0b10000000 | ((codePoint & 0b00000000000000000000000000111111) >>> 0);
            }
            else if (codePoint < 0x10000) {
                arr[arrOffset++] = 0b11100000 | ((codePoint & 0b00000000000000001111000000000000) >>> 12);
                arr[arrOffset++] = 0b10000000 | ((codePoint & 0b00000000000000000000111111000000) >>> 6);
                arr[arrOffset++] = 0b10000000 | ((codePoint & 0b00000000000000000000000000111111) >>> 0);
            }
            else {
                arr[arrOffset++] = 0b11110000 | ((codePoint & 0b00000000000111000000000000000000) >>> 18);
                arr[arrOffset++] = 0b10000000 | ((codePoint & 0b00000000000000111111000000000000) >>> 12);
                arr[arrOffset++] = 0b10000000 | ((codePoint & 0b00000000000000000000111111000000) >>> 6);
                arr[arrOffset++] = 0b10000000 | ((codePoint & 0b00000000000000000000000000111111) >>> 0);
            }
        }
        return arr;
    }
    exports.encodeUTF8 = encodeUTF8;
    /**
     * A manual decoding of a UTF8 string.
     * Use only in environments which do not offer native conversion methods!
     */
    function decodeUTF8(buffer) {
        // https://en.wikipedia.org/wiki/UTF-8
        const len = buffer.byteLength;
        const result = [];
        let offset = 0;
        while (offset < len) {
            const v0 = buffer[offset];
            let codePoint;
            if (v0 >= 0b11110000 && offset + 3 < len) {
                // 4 bytes
                codePoint = ((((buffer[offset++] & 0b00000111) << 18) >>> 0)
                    | (((buffer[offset++] & 0b00111111) << 12) >>> 0)
                    | (((buffer[offset++] & 0b00111111) << 6) >>> 0)
                    | (((buffer[offset++] & 0b00111111) << 0) >>> 0));
            }
            else if (v0 >= 0b11100000 && offset + 2 < len) {
                // 3 bytes
                codePoint = ((((buffer[offset++] & 0b00001111) << 12) >>> 0)
                    | (((buffer[offset++] & 0b00111111) << 6) >>> 0)
                    | (((buffer[offset++] & 0b00111111) << 0) >>> 0));
            }
            else if (v0 >= 0b11000000 && offset + 1 < len) {
                // 2 bytes
                codePoint = ((((buffer[offset++] & 0b00011111) << 6) >>> 0)
                    | (((buffer[offset++] & 0b00111111) << 0) >>> 0));
            }
            else {
                // 1 byte
                codePoint = buffer[offset++];
            }
            if ((codePoint >= 0 && codePoint <= 0xD7FF) || (codePoint >= 0xE000 && codePoint <= 0xFFFF)) {
                // Basic Multilingual Plane
                result.push(String.fromCharCode(codePoint));
            }
            else if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
                // Supplementary Planes
                const uPrime = codePoint - 0x10000;
                const w1 = 0xD800 + ((uPrime & 0b11111111110000000000) >>> 10);
                const w2 = 0xDC00 + ((uPrime & 0b00000000001111111111) >>> 0);
                result.push(String.fromCharCode(w1));
                result.push(String.fromCharCode(w2));
            }
            else {
                // illegal code point
                result.push(String.fromCharCode(0xFFFD));
            }
        }
        return result.join('');
    }
    exports.decodeUTF8 = decodeUTF8;
    /**
     * Generated using https://github.com/alexandrudima/unicode-utils/blob/master/generate-rtl-test.js
     */
    const CONTAINS_RTL = /(?:[\u05BE\u05C0\u05C3\u05C6\u05D0-\u05F4\u0608\u060B\u060D\u061B-\u064A\u066D-\u066F\u0671-\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u0710\u0712-\u072F\u074D-\u07A5\u07B1-\u07EA\u07F4\u07F5\u07FA-\u0815\u081A\u0824\u0828\u0830-\u0858\u085E-\u08BD\u200F\uFB1D\uFB1F-\uFB28\uFB2A-\uFD3D\uFD50-\uFDFC\uFE70-\uFEFC]|\uD802[\uDC00-\uDD1B\uDD20-\uDE00\uDE10-\uDE33\uDE40-\uDEE4\uDEEB-\uDF35\uDF40-\uDFFF]|\uD803[\uDC00-\uDCFF]|\uD83A[\uDC00-\uDCCF\uDD00-\uDD43\uDD50-\uDFFF]|\uD83B[\uDC00-\uDEBB])/;
    /**
     * Returns true if `str` contains any Unicode character that is classified as "R" or "AL".
     */
    function containsRTL(str) {
        return CONTAINS_RTL.test(str);
    }
    exports.containsRTL = containsRTL;
    /**
     * Generated using https://github.com/alexandrudima/unicode-utils/blob/master/generate-emoji-test.js
     */
    const CONTAINS_EMOJI = /(?:[\u231A\u231B\u23F0\u23F3\u2600-\u27BF\u2B50\u2B55]|\uD83C[\uDDE6-\uDDFF\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F\uDE80-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD00-\uDDFF\uDE70-\uDE73\uDE78-\uDE82\uDE90-\uDE95])/;
    function containsEmoji(str) {
        return CONTAINS_EMOJI.test(str);
    }
    exports.containsEmoji = containsEmoji;
    const IS_BASIC_ASCII = /^[\t\n\r\x20-\x7E]*$/;
    /**
     * Returns true if `str` contains only basic ASCII characters in the range 32 - 126 (including 32 and 126) or \n, \r, \t
     */
    function isBasicASCII(str) {
        return IS_BASIC_ASCII.test(str);
    }
    exports.isBasicASCII = isBasicASCII;
    exports.UNUSUAL_LINE_TERMINATORS = /[\u2028\u2029]/; // LINE SEPARATOR (LS) or PARAGRAPH SEPARATOR (PS)
    /**
     * Returns true if `str` contains unusual line terminators, like LS or PS
     */
    function containsUnusualLineTerminators(str) {
        return exports.UNUSUAL_LINE_TERMINATORS.test(str);
    }
    exports.containsUnusualLineTerminators = containsUnusualLineTerminators;
    function containsFullWidthCharacter(str) {
        for (let i = 0, len = str.length; i < len; i++) {
            if (isFullWidthCharacter(str.charCodeAt(i))) {
                return true;
            }
        }
        return false;
    }
    exports.containsFullWidthCharacter = containsFullWidthCharacter;
    function isFullWidthCharacter(charCode) {
        // Do a cheap trick to better support wrapping of wide characters, treat them as 2 columns
        // http://jrgraphix.net/research/unicode_blocks.php
        //          2E80 — 2EFF   CJK Radicals Supplement
        //          2F00 — 2FDF   Kangxi Radicals
        //          2FF0 — 2FFF   Ideographic Description Characters
        //          3000 — 303F   CJK Symbols and Punctuation
        //          3040 — 309F   Hiragana
        //          30A0 — 30FF   Katakana
        //          3100 — 312F   Bopomofo
        //          3130 — 318F   Hangul Compatibility Jamo
        //          3190 — 319F   Kanbun
        //          31A0 — 31BF   Bopomofo Extended
        //          31F0 — 31FF   Katakana Phonetic Extensions
        //          3200 — 32FF   Enclosed CJK Letters and Months
        //          3300 — 33FF   CJK Compatibility
        //          3400 — 4DBF   CJK Unified Ideographs Extension A
        //          4DC0 — 4DFF   Yijing Hexagram Symbols
        //          4E00 — 9FFF   CJK Unified Ideographs
        //          A000 — A48F   Yi Syllables
        //          A490 — A4CF   Yi Radicals
        //          AC00 — D7AF   Hangul Syllables
        // [IGNORE] D800 — DB7F   High Surrogates
        // [IGNORE] DB80 — DBFF   High Private Use Surrogates
        // [IGNORE] DC00 — DFFF   Low Surrogates
        // [IGNORE] E000 — F8FF   Private Use Area
        //          F900 — FAFF   CJK Compatibility Ideographs
        // [IGNORE] FB00 — FB4F   Alphabetic Presentation Forms
        // [IGNORE] FB50 — FDFF   Arabic Presentation Forms-A
        // [IGNORE] FE00 — FE0F   Variation Selectors
        // [IGNORE] FE20 — FE2F   Combining Half Marks
        // [IGNORE] FE30 — FE4F   CJK Compatibility Forms
        // [IGNORE] FE50 — FE6F   Small Form Variants
        // [IGNORE] FE70 — FEFF   Arabic Presentation Forms-B
        //          FF00 — FFEF   Halfwidth and Fullwidth Forms
        //               [https://en.wikipedia.org/wiki/Halfwidth_and_fullwidth_forms]
        //               of which FF01 - FF5E fullwidth ASCII of 21 to 7E
        // [IGNORE]    and FF65 - FFDC halfwidth of Katakana and Hangul
        // [IGNORE] FFF0 — FFFF   Specials
        charCode = +charCode; // @perf
        return ((charCode >= 0x2E80 && charCode <= 0xD7AF)
            || (charCode >= 0xF900 && charCode <= 0xFAFF)
            || (charCode >= 0xFF01 && charCode <= 0xFF5E));
    }
    exports.isFullWidthCharacter = isFullWidthCharacter;
    /**
     * A fast function (therefore imprecise) to check if code points are emojis.
     * Generated using https://github.com/alexandrudima/unicode-utils/blob/master/generate-emoji-test.js
     */
    function isEmojiImprecise(x) {
        return ((x >= 0x1F1E6 && x <= 0x1F1FF) || (x >= 9728 && x <= 10175) || (x >= 127744 && x <= 128591)
            || (x >= 128640 && x <= 128764) || (x >= 128992 && x <= 129003) || (x >= 129280 && x <= 129535)
            || (x >= 129648 && x <= 129651) || (x >= 129656 && x <= 129666) || (x >= 129680 && x <= 129685));
    }
    exports.isEmojiImprecise = isEmojiImprecise;
    /**
     * Given a string and a max length returns a shorted version. Shorting
     * happens at favorable positions - such as whitespace or punctuation characters.
     */
    function lcut(text, n) {
        if (text.length < n) {
            return text;
        }
        const re = /\b/g;
        let i = 0;
        while (re.test(text)) {
            if (text.length - re.lastIndex < n) {
                break;
            }
            i = re.lastIndex;
            re.lastIndex += 1;
        }
        return text.substring(i).replace(/^\s/, '');
    }
    exports.lcut = lcut;
    // Escape codes
    // http://en.wikipedia.org/wiki/ANSI_escape_code
    const EL = /\x1B\x5B[12]?K/g; // Erase in line
    const COLOR_START = /\x1b\[\d+m/g; // Color
    const COLOR_END = /\x1b\[0?m/g; // Color
    function removeAnsiEscapeCodes(str) {
        if (str) {
            str = str.replace(EL, '');
            str = str.replace(COLOR_START, '');
            str = str.replace(COLOR_END, '');
        }
        return str;
    }
    exports.removeAnsiEscapeCodes = removeAnsiEscapeCodes;
    // -- UTF-8 BOM
    exports.UTF8_BOM_CHARACTER = String.fromCharCode(65279 /* UTF8_BOM */);
    function startsWithUTF8BOM(str) {
        return !!(str && str.length > 0 && str.charCodeAt(0) === 65279 /* UTF8_BOM */);
    }
    exports.startsWithUTF8BOM = startsWithUTF8BOM;
    function stripUTF8BOM(str) {
        return startsWithUTF8BOM(str) ? str.substr(1) : str;
    }
    exports.stripUTF8BOM = stripUTF8BOM;
    /**
     * Checks if the characters of the provided query string are included in the
     * target string. The characters do not have to be contiguous within the string.
     */
    function fuzzyContains(target, query) {
        if (!target || !query) {
            return false; // return early if target or query are undefined
        }
        if (target.length < query.length) {
            return false; // impossible for query to be contained in target
        }
        const queryLen = query.length;
        const targetLower = target.toLowerCase();
        let index = 0;
        let lastIndexOf = -1;
        while (index < queryLen) {
            const indexOf = targetLower.indexOf(query[index], lastIndexOf + 1);
            if (indexOf < 0) {
                return false;
            }
            lastIndexOf = indexOf;
            index++;
        }
        return true;
    }
    exports.fuzzyContains = fuzzyContains;
    function containsUppercaseCharacter(target, ignoreEscapedChars = false) {
        if (!target) {
            return false;
        }
        if (ignoreEscapedChars) {
            target = target.replace(/\\./g, '');
        }
        return target.toLowerCase() !== target;
    }
    exports.containsUppercaseCharacter = containsUppercaseCharacter;
    function uppercaseFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    exports.uppercaseFirstLetter = uppercaseFirstLetter;
    function getNLines(str, n = 1) {
        if (n === 0) {
            return '';
        }
        let idx = -1;
        do {
            idx = str.indexOf('\n', idx + 1);
            n--;
        } while (n > 0 && idx >= 0);
        return idx >= 0 ?
            str.substr(0, idx) :
            str;
    }
    exports.getNLines = getNLines;
    /**
     * Produces 'a'-'z', followed by 'A'-'Z'... followed by 'a'-'z', etc.
     */
    function singleLetterHash(n) {
        const LETTERS_CNT = (90 /* Z */ - 65 /* A */ + 1);
        n = n % (2 * LETTERS_CNT);
        if (n < LETTERS_CNT) {
            return String.fromCharCode(97 /* a */ + n);
        }
        return String.fromCharCode(65 /* A */ + n - LETTERS_CNT);
    }
    exports.singleLetterHash = singleLetterHash;
    //#region Unicode Grapheme Break
    function getGraphemeBreakType(codePoint) {
        const graphemeBreakTree = GraphemeBreakTree.getInstance();
        return graphemeBreakTree.getGraphemeBreakType(codePoint);
    }
    exports.getGraphemeBreakType = getGraphemeBreakType;
    function breakBetweenGraphemeBreakType(breakTypeA, breakTypeB) {
        // http://www.unicode.org/reports/tr29/#Grapheme_Cluster_Boundary_Rules
        // !!! Let's make the common case a bit faster
        if (breakTypeA === 0 /* Other */) {
            // see https://www.unicode.org/Public/13.0.0/ucd/auxiliary/GraphemeBreakTest-13.0.0d10.html#table
            return (breakTypeB !== 5 /* Extend */ && breakTypeB !== 7 /* SpacingMark */);
        }
        // Do not break between a CR and LF. Otherwise, break before and after controls.
        // GB3                                        CR × LF
        // GB4                       (Control | CR | LF) ÷
        // GB5                                           ÷ (Control | CR | LF)
        if (breakTypeA === 2 /* CR */) {
            if (breakTypeB === 3 /* LF */) {
                return false; // GB3
            }
        }
        if (breakTypeA === 4 /* Control */ || breakTypeA === 2 /* CR */ || breakTypeA === 3 /* LF */) {
            return true; // GB4
        }
        if (breakTypeB === 4 /* Control */ || breakTypeB === 2 /* CR */ || breakTypeB === 3 /* LF */) {
            return true; // GB5
        }
        // Do not break Hangul syllable sequences.
        // GB6                                         L × (L | V | LV | LVT)
        // GB7                                  (LV | V) × (V | T)
        // GB8                                 (LVT | T) × T
        if (breakTypeA === 8 /* L */) {
            if (breakTypeB === 8 /* L */ || breakTypeB === 9 /* V */ || breakTypeB === 11 /* LV */ || breakTypeB === 12 /* LVT */) {
                return false; // GB6
            }
        }
        if (breakTypeA === 11 /* LV */ || breakTypeA === 9 /* V */) {
            if (breakTypeB === 9 /* V */ || breakTypeB === 10 /* T */) {
                return false; // GB7
            }
        }
        if (breakTypeA === 12 /* LVT */ || breakTypeA === 10 /* T */) {
            if (breakTypeB === 10 /* T */) {
                return false; // GB8
            }
        }
        // Do not break before extending characters or ZWJ.
        // GB9                                           × (Extend | ZWJ)
        if (breakTypeB === 5 /* Extend */ || breakTypeB === 13 /* ZWJ */) {
            return false; // GB9
        }
        // The GB9a and GB9b rules only apply to extended grapheme clusters:
        // Do not break before SpacingMarks, or after Prepend characters.
        // GB9a                                          × SpacingMark
        // GB9b                                  Prepend ×
        if (breakTypeB === 7 /* SpacingMark */) {
            return false; // GB9a
        }
        if (breakTypeA === 1 /* Prepend */) {
            return false; // GB9b
        }
        // Do not break within emoji modifier sequences or emoji zwj sequences.
        // GB11    \p{Extended_Pictographic} Extend* ZWJ × \p{Extended_Pictographic}
        if (breakTypeA === 13 /* ZWJ */ && breakTypeB === 14 /* Extended_Pictographic */) {
            // Note: we are not implementing the rule entirely here to avoid introducing states
            return false; // GB11
        }
        // GB12                          sot (RI RI)* RI × RI
        // GB13                        [^RI] (RI RI)* RI × RI
        if (breakTypeA === 6 /* Regional_Indicator */ && breakTypeB === 6 /* Regional_Indicator */) {
            // Note: we are not implementing the rule entirely here to avoid introducing states
            return false; // GB12 & GB13
        }
        // GB999                                     Any ÷ Any
        return true;
    }
    exports.breakBetweenGraphemeBreakType = breakBetweenGraphemeBreakType;
    var GraphemeBreakType;
    (function (GraphemeBreakType) {
        GraphemeBreakType[GraphemeBreakType["Other"] = 0] = "Other";
        GraphemeBreakType[GraphemeBreakType["Prepend"] = 1] = "Prepend";
        GraphemeBreakType[GraphemeBreakType["CR"] = 2] = "CR";
        GraphemeBreakType[GraphemeBreakType["LF"] = 3] = "LF";
        GraphemeBreakType[GraphemeBreakType["Control"] = 4] = "Control";
        GraphemeBreakType[GraphemeBreakType["Extend"] = 5] = "Extend";
        GraphemeBreakType[GraphemeBreakType["Regional_Indicator"] = 6] = "Regional_Indicator";
        GraphemeBreakType[GraphemeBreakType["SpacingMark"] = 7] = "SpacingMark";
        GraphemeBreakType[GraphemeBreakType["L"] = 8] = "L";
        GraphemeBreakType[GraphemeBreakType["V"] = 9] = "V";
        GraphemeBreakType[GraphemeBreakType["T"] = 10] = "T";
        GraphemeBreakType[GraphemeBreakType["LV"] = 11] = "LV";
        GraphemeBreakType[GraphemeBreakType["LVT"] = 12] = "LVT";
        GraphemeBreakType[GraphemeBreakType["ZWJ"] = 13] = "ZWJ";
        GraphemeBreakType[GraphemeBreakType["Extended_Pictographic"] = 14] = "Extended_Pictographic";
    })(GraphemeBreakType = exports.GraphemeBreakType || (exports.GraphemeBreakType = {}));
    class GraphemeBreakTree {
        constructor() {
            this._data = getGraphemeBreakRawData();
        }
        static getInstance() {
            if (!GraphemeBreakTree._INSTANCE) {
                GraphemeBreakTree._INSTANCE = new GraphemeBreakTree();
            }
            return GraphemeBreakTree._INSTANCE;
        }
        getGraphemeBreakType(codePoint) {
            // !!! Let's make 7bit ASCII a bit faster: 0..31
            if (codePoint < 32) {
                if (codePoint === 10 /* LineFeed */) {
                    return 3 /* LF */;
                }
                if (codePoint === 13 /* CarriageReturn */) {
                    return 2 /* CR */;
                }
                return 4 /* Control */;
            }
            // !!! Let's make 7bit ASCII a bit faster: 32..126
            if (codePoint < 127) {
                return 0 /* Other */;
            }
            const data = this._data;
            const nodeCount = data.length / 3;
            let nodeIndex = 1;
            while (nodeIndex <= nodeCount) {
                if (codePoint < data[3 * nodeIndex]) {
                    // go left
                    nodeIndex = 2 * nodeIndex;
                }
                else if (codePoint > data[3 * nodeIndex + 1]) {
                    // go right
                    nodeIndex = 2 * nodeIndex + 1;
                }
                else {
                    // hit
                    return data[3 * nodeIndex + 2];
                }
            }
            return 0 /* Other */;
        }
    }
    GraphemeBreakTree._INSTANCE = null;
    function getGraphemeBreakRawData() {
        // generated using https://github.com/alexandrudima/unicode-utils/blob/master/generate-grapheme-break.js
        return JSON.parse('[0,0,0,51592,51592,11,44424,44424,11,72251,72254,5,7150,7150,7,48008,48008,11,55176,55176,11,128420,128420,14,3276,3277,5,9979,9980,14,46216,46216,11,49800,49800,11,53384,53384,11,70726,70726,5,122915,122916,5,129320,129327,14,2558,2558,5,5906,5908,5,9762,9763,14,43360,43388,8,45320,45320,11,47112,47112,11,48904,48904,11,50696,50696,11,52488,52488,11,54280,54280,11,70082,70083,1,71350,71350,7,73111,73111,5,127892,127893,14,128726,128727,14,129473,129474,14,2027,2035,5,2901,2902,5,3784,3789,5,6754,6754,5,8418,8420,5,9877,9877,14,11088,11088,14,44008,44008,5,44872,44872,11,45768,45768,11,46664,46664,11,47560,47560,11,48456,48456,11,49352,49352,11,50248,50248,11,51144,51144,11,52040,52040,11,52936,52936,11,53832,53832,11,54728,54728,11,69811,69814,5,70459,70460,5,71096,71099,7,71998,71998,5,72874,72880,5,119149,119149,7,127374,127374,14,128335,128335,14,128482,128482,14,128765,128767,14,129399,129400,14,129680,129685,14,1476,1477,5,2377,2380,7,2759,2760,5,3137,3140,7,3458,3459,7,4153,4154,5,6432,6434,5,6978,6978,5,7675,7679,5,9723,9726,14,9823,9823,14,9919,9923,14,10035,10036,14,42736,42737,5,43596,43596,5,44200,44200,11,44648,44648,11,45096,45096,11,45544,45544,11,45992,45992,11,46440,46440,11,46888,46888,11,47336,47336,11,47784,47784,11,48232,48232,11,48680,48680,11,49128,49128,11,49576,49576,11,50024,50024,11,50472,50472,11,50920,50920,11,51368,51368,11,51816,51816,11,52264,52264,11,52712,52712,11,53160,53160,11,53608,53608,11,54056,54056,11,54504,54504,11,54952,54952,11,68108,68111,5,69933,69940,5,70197,70197,7,70498,70499,7,70845,70845,5,71229,71229,5,71727,71735,5,72154,72155,5,72344,72345,5,73023,73029,5,94095,94098,5,121403,121452,5,126981,127182,14,127538,127546,14,127990,127990,14,128391,128391,14,128445,128449,14,128500,128505,14,128752,128752,14,129160,129167,14,129356,129356,14,129432,129442,14,129648,129651,14,129751,131069,14,173,173,4,1757,1757,1,2274,2274,1,2494,2494,5,2641,2641,5,2876,2876,5,3014,3016,7,3262,3262,7,3393,3396,5,3570,3571,7,3968,3972,5,4228,4228,7,6086,6086,5,6679,6680,5,6912,6915,5,7080,7081,5,7380,7392,5,8252,8252,14,9096,9096,14,9748,9749,14,9784,9786,14,9833,9850,14,9890,9894,14,9938,9938,14,9999,9999,14,10085,10087,14,12349,12349,14,43136,43137,7,43454,43456,7,43755,43755,7,44088,44088,11,44312,44312,11,44536,44536,11,44760,44760,11,44984,44984,11,45208,45208,11,45432,45432,11,45656,45656,11,45880,45880,11,46104,46104,11,46328,46328,11,46552,46552,11,46776,46776,11,47000,47000,11,47224,47224,11,47448,47448,11,47672,47672,11,47896,47896,11,48120,48120,11,48344,48344,11,48568,48568,11,48792,48792,11,49016,49016,11,49240,49240,11,49464,49464,11,49688,49688,11,49912,49912,11,50136,50136,11,50360,50360,11,50584,50584,11,50808,50808,11,51032,51032,11,51256,51256,11,51480,51480,11,51704,51704,11,51928,51928,11,52152,52152,11,52376,52376,11,52600,52600,11,52824,52824,11,53048,53048,11,53272,53272,11,53496,53496,11,53720,53720,11,53944,53944,11,54168,54168,11,54392,54392,11,54616,54616,11,54840,54840,11,55064,55064,11,65438,65439,5,69633,69633,5,69837,69837,1,70018,70018,7,70188,70190,7,70368,70370,7,70465,70468,7,70712,70719,5,70835,70840,5,70850,70851,5,71132,71133,5,71340,71340,7,71458,71461,5,71985,71989,7,72002,72002,7,72193,72202,5,72281,72283,5,72766,72766,7,72885,72886,5,73104,73105,5,92912,92916,5,113824,113827,4,119173,119179,5,121505,121519,5,125136,125142,5,127279,127279,14,127489,127490,14,127570,127743,14,127900,127901,14,128254,128254,14,128369,128370,14,128400,128400,14,128425,128432,14,128468,128475,14,128489,128494,14,128715,128720,14,128745,128745,14,128759,128760,14,129004,129023,14,129296,129304,14,129340,129342,14,129388,129392,14,129404,129407,14,129454,129455,14,129485,129487,14,129659,129663,14,129719,129727,14,917536,917631,5,13,13,2,1160,1161,5,1564,1564,4,1807,1807,1,2085,2087,5,2363,2363,7,2402,2403,5,2507,2508,7,2622,2624,7,2691,2691,7,2786,2787,5,2881,2884,5,3006,3006,5,3072,3072,5,3170,3171,5,3267,3268,7,3330,3331,7,3406,3406,1,3538,3540,5,3655,3662,5,3897,3897,5,4038,4038,5,4184,4185,5,4352,4447,8,6068,6069,5,6155,6157,5,6448,6449,7,6742,6742,5,6783,6783,5,6966,6970,5,7042,7042,7,7143,7143,7,7212,7219,5,7412,7412,5,8206,8207,4,8294,8303,4,8596,8601,14,9410,9410,14,9742,9742,14,9757,9757,14,9770,9770,14,9794,9794,14,9828,9828,14,9855,9855,14,9882,9882,14,9900,9903,14,9929,9933,14,9963,9967,14,9987,9988,14,10006,10006,14,10062,10062,14,10175,10175,14,11744,11775,5,42607,42607,5,43043,43044,7,43263,43263,5,43444,43445,7,43569,43570,5,43698,43700,5,43766,43766,5,44032,44032,11,44144,44144,11,44256,44256,11,44368,44368,11,44480,44480,11,44592,44592,11,44704,44704,11,44816,44816,11,44928,44928,11,45040,45040,11,45152,45152,11,45264,45264,11,45376,45376,11,45488,45488,11,45600,45600,11,45712,45712,11,45824,45824,11,45936,45936,11,46048,46048,11,46160,46160,11,46272,46272,11,46384,46384,11,46496,46496,11,46608,46608,11,46720,46720,11,46832,46832,11,46944,46944,11,47056,47056,11,47168,47168,11,47280,47280,11,47392,47392,11,47504,47504,11,47616,47616,11,47728,47728,11,47840,47840,11,47952,47952,11,48064,48064,11,48176,48176,11,48288,48288,11,48400,48400,11,48512,48512,11,48624,48624,11,48736,48736,11,48848,48848,11,48960,48960,11,49072,49072,11,49184,49184,11,49296,49296,11,49408,49408,11,49520,49520,11,49632,49632,11,49744,49744,11,49856,49856,11,49968,49968,11,50080,50080,11,50192,50192,11,50304,50304,11,50416,50416,11,50528,50528,11,50640,50640,11,50752,50752,11,50864,50864,11,50976,50976,11,51088,51088,11,51200,51200,11,51312,51312,11,51424,51424,11,51536,51536,11,51648,51648,11,51760,51760,11,51872,51872,11,51984,51984,11,52096,52096,11,52208,52208,11,52320,52320,11,52432,52432,11,52544,52544,11,52656,52656,11,52768,52768,11,52880,52880,11,52992,52992,11,53104,53104,11,53216,53216,11,53328,53328,11,53440,53440,11,53552,53552,11,53664,53664,11,53776,53776,11,53888,53888,11,54000,54000,11,54112,54112,11,54224,54224,11,54336,54336,11,54448,54448,11,54560,54560,11,54672,54672,11,54784,54784,11,54896,54896,11,55008,55008,11,55120,55120,11,64286,64286,5,66272,66272,5,68900,68903,5,69762,69762,7,69817,69818,5,69927,69931,5,70003,70003,5,70070,70078,5,70094,70094,7,70194,70195,7,70206,70206,5,70400,70401,5,70463,70463,7,70475,70477,7,70512,70516,5,70722,70724,5,70832,70832,5,70842,70842,5,70847,70848,5,71088,71089,7,71102,71102,7,71219,71226,5,71231,71232,5,71342,71343,7,71453,71455,5,71463,71467,5,71737,71738,5,71995,71996,5,72000,72000,7,72145,72147,7,72160,72160,5,72249,72249,7,72273,72278,5,72330,72342,5,72752,72758,5,72850,72871,5,72882,72883,5,73018,73018,5,73031,73031,5,73109,73109,5,73461,73462,7,94031,94031,5,94192,94193,7,119142,119142,7,119155,119162,4,119362,119364,5,121476,121476,5,122888,122904,5,123184,123190,5,126976,126979,14,127184,127231,14,127344,127345,14,127405,127461,14,127514,127514,14,127561,127567,14,127778,127779,14,127896,127896,14,127985,127986,14,127995,127999,5,128326,128328,14,128360,128366,14,128378,128378,14,128394,128397,14,128405,128406,14,128422,128423,14,128435,128443,14,128453,128464,14,128479,128480,14,128484,128487,14,128496,128498,14,128640,128709,14,128723,128724,14,128736,128741,14,128747,128748,14,128755,128755,14,128762,128762,14,128981,128991,14,129096,129103,14,129292,129292,14,129311,129311,14,129329,129330,14,129344,129349,14,129360,129374,14,129394,129394,14,129402,129402,14,129413,129425,14,129445,129450,14,129466,129471,14,129483,129483,14,129511,129535,14,129653,129655,14,129667,129670,14,129705,129711,14,129731,129743,14,917505,917505,4,917760,917999,5,10,10,3,127,159,4,768,879,5,1471,1471,5,1536,1541,1,1648,1648,5,1767,1768,5,1840,1866,5,2070,2073,5,2137,2139,5,2307,2307,7,2366,2368,7,2382,2383,7,2434,2435,7,2497,2500,5,2519,2519,5,2563,2563,7,2631,2632,5,2677,2677,5,2750,2752,7,2763,2764,7,2817,2817,5,2879,2879,5,2891,2892,7,2914,2915,5,3008,3008,5,3021,3021,5,3076,3076,5,3146,3149,5,3202,3203,7,3264,3265,7,3271,3272,7,3298,3299,5,3390,3390,5,3402,3404,7,3426,3427,5,3535,3535,5,3544,3550,7,3635,3635,7,3763,3763,7,3893,3893,5,3953,3966,5,3981,3991,5,4145,4145,7,4157,4158,5,4209,4212,5,4237,4237,5,4520,4607,10,5970,5971,5,6071,6077,5,6089,6099,5,6277,6278,5,6439,6440,5,6451,6456,7,6683,6683,5,6744,6750,5,6765,6770,7,6846,6846,5,6964,6964,5,6972,6972,5,7019,7027,5,7074,7077,5,7083,7085,5,7146,7148,7,7154,7155,7,7222,7223,5,7394,7400,5,7416,7417,5,8204,8204,5,8233,8233,4,8288,8292,4,8413,8416,5,8482,8482,14,8986,8987,14,9193,9203,14,9654,9654,14,9733,9733,14,9745,9745,14,9752,9752,14,9760,9760,14,9766,9766,14,9774,9775,14,9792,9792,14,9800,9811,14,9825,9826,14,9831,9831,14,9852,9853,14,9872,9873,14,9880,9880,14,9885,9887,14,9896,9897,14,9906,9916,14,9926,9927,14,9936,9936,14,9941,9960,14,9974,9974,14,9982,9985,14,9992,9997,14,10002,10002,14,10017,10017,14,10055,10055,14,10071,10071,14,10145,10145,14,11013,11015,14,11503,11505,5,12334,12335,5,12951,12951,14,42612,42621,5,43014,43014,5,43047,43047,7,43204,43205,5,43335,43345,5,43395,43395,7,43450,43451,7,43561,43566,5,43573,43574,5,43644,43644,5,43710,43711,5,43758,43759,7,44005,44005,5,44012,44012,7,44060,44060,11,44116,44116,11,44172,44172,11,44228,44228,11,44284,44284,11,44340,44340,11,44396,44396,11,44452,44452,11,44508,44508,11,44564,44564,11,44620,44620,11,44676,44676,11,44732,44732,11,44788,44788,11,44844,44844,11,44900,44900,11,44956,44956,11,45012,45012,11,45068,45068,11,45124,45124,11,45180,45180,11,45236,45236,11,45292,45292,11,45348,45348,11,45404,45404,11,45460,45460,11,45516,45516,11,45572,45572,11,45628,45628,11,45684,45684,11,45740,45740,11,45796,45796,11,45852,45852,11,45908,45908,11,45964,45964,11,46020,46020,11,46076,46076,11,46132,46132,11,46188,46188,11,46244,46244,11,46300,46300,11,46356,46356,11,46412,46412,11,46468,46468,11,46524,46524,11,46580,46580,11,46636,46636,11,46692,46692,11,46748,46748,11,46804,46804,11,46860,46860,11,46916,46916,11,46972,46972,11,47028,47028,11,47084,47084,11,47140,47140,11,47196,47196,11,47252,47252,11,47308,47308,11,47364,47364,11,47420,47420,11,47476,47476,11,47532,47532,11,47588,47588,11,47644,47644,11,47700,47700,11,47756,47756,11,47812,47812,11,47868,47868,11,47924,47924,11,47980,47980,11,48036,48036,11,48092,48092,11,48148,48148,11,48204,48204,11,48260,48260,11,48316,48316,11,48372,48372,11,48428,48428,11,48484,48484,11,48540,48540,11,48596,48596,11,48652,48652,11,48708,48708,11,48764,48764,11,48820,48820,11,48876,48876,11,48932,48932,11,48988,48988,11,49044,49044,11,49100,49100,11,49156,49156,11,49212,49212,11,49268,49268,11,49324,49324,11,49380,49380,11,49436,49436,11,49492,49492,11,49548,49548,11,49604,49604,11,49660,49660,11,49716,49716,11,49772,49772,11,49828,49828,11,49884,49884,11,49940,49940,11,49996,49996,11,50052,50052,11,50108,50108,11,50164,50164,11,50220,50220,11,50276,50276,11,50332,50332,11,50388,50388,11,50444,50444,11,50500,50500,11,50556,50556,11,50612,50612,11,50668,50668,11,50724,50724,11,50780,50780,11,50836,50836,11,50892,50892,11,50948,50948,11,51004,51004,11,51060,51060,11,51116,51116,11,51172,51172,11,51228,51228,11,51284,51284,11,51340,51340,11,51396,51396,11,51452,51452,11,51508,51508,11,51564,51564,11,51620,51620,11,51676,51676,11,51732,51732,11,51788,51788,11,51844,51844,11,51900,51900,11,51956,51956,11,52012,52012,11,52068,52068,11,52124,52124,11,52180,52180,11,52236,52236,11,52292,52292,11,52348,52348,11,52404,52404,11,52460,52460,11,52516,52516,11,52572,52572,11,52628,52628,11,52684,52684,11,52740,52740,11,52796,52796,11,52852,52852,11,52908,52908,11,52964,52964,11,53020,53020,11,53076,53076,11,53132,53132,11,53188,53188,11,53244,53244,11,53300,53300,11,53356,53356,11,53412,53412,11,53468,53468,11,53524,53524,11,53580,53580,11,53636,53636,11,53692,53692,11,53748,53748,11,53804,53804,11,53860,53860,11,53916,53916,11,53972,53972,11,54028,54028,11,54084,54084,11,54140,54140,11,54196,54196,11,54252,54252,11,54308,54308,11,54364,54364,11,54420,54420,11,54476,54476,11,54532,54532,11,54588,54588,11,54644,54644,11,54700,54700,11,54756,54756,11,54812,54812,11,54868,54868,11,54924,54924,11,54980,54980,11,55036,55036,11,55092,55092,11,55148,55148,11,55216,55238,9,65056,65071,5,65529,65531,4,68097,68099,5,68159,68159,5,69446,69456,5,69688,69702,5,69808,69810,7,69815,69816,7,69821,69821,1,69888,69890,5,69932,69932,7,69957,69958,7,70016,70017,5,70067,70069,7,70079,70080,7,70089,70092,5,70095,70095,5,70191,70193,5,70196,70196,5,70198,70199,5,70367,70367,5,70371,70378,5,70402,70403,7,70462,70462,5,70464,70464,5,70471,70472,7,70487,70487,5,70502,70508,5,70709,70711,7,70720,70721,7,70725,70725,7,70750,70750,5,70833,70834,7,70841,70841,7,70843,70844,7,70846,70846,7,70849,70849,7,71087,71087,5,71090,71093,5,71100,71101,5,71103,71104,5,71216,71218,7,71227,71228,7,71230,71230,7,71339,71339,5,71341,71341,5,71344,71349,5,71351,71351,5,71456,71457,7,71462,71462,7,71724,71726,7,71736,71736,7,71984,71984,5,71991,71992,7,71997,71997,7,71999,71999,1,72001,72001,1,72003,72003,5,72148,72151,5,72156,72159,7,72164,72164,7,72243,72248,5,72250,72250,1,72263,72263,5,72279,72280,7,72324,72329,1,72343,72343,7,72751,72751,7,72760,72765,5,72767,72767,5,72873,72873,7,72881,72881,7,72884,72884,7,73009,73014,5,73020,73021,5,73030,73030,1,73098,73102,7,73107,73108,7,73110,73110,7,73459,73460,5,78896,78904,4,92976,92982,5,94033,94087,7,94180,94180,5,113821,113822,5,119141,119141,5,119143,119145,5,119150,119154,5,119163,119170,5,119210,119213,5,121344,121398,5,121461,121461,5,121499,121503,5,122880,122886,5,122907,122913,5,122918,122922,5,123628,123631,5,125252,125258,5,126980,126980,14,127183,127183,14,127245,127247,14,127340,127343,14,127358,127359,14,127377,127386,14,127462,127487,6,127491,127503,14,127535,127535,14,127548,127551,14,127568,127569,14,127744,127777,14,127780,127891,14,127894,127895,14,127897,127899,14,127902,127984,14,127987,127989,14,127991,127994,14,128000,128253,14,128255,128317,14,128329,128334,14,128336,128359,14,128367,128368,14,128371,128377,14,128379,128390,14,128392,128393,14,128398,128399,14,128401,128404,14,128407,128419,14,128421,128421,14,128424,128424,14,128433,128434,14,128444,128444,14,128450,128452,14,128465,128467,14,128476,128478,14,128481,128481,14,128483,128483,14,128488,128488,14,128495,128495,14,128499,128499,14,128506,128591,14,128710,128714,14,128721,128722,14,128725,128725,14,128728,128735,14,128742,128744,14,128746,128746,14,128749,128751,14,128753,128754,14,128756,128758,14,128761,128761,14,128763,128764,14,128884,128895,14,128992,129003,14,129036,129039,14,129114,129119,14,129198,129279,14,129293,129295,14,129305,129310,14,129312,129319,14,129328,129328,14,129331,129338,14,129343,129343,14,129351,129355,14,129357,129359,14,129375,129387,14,129393,129393,14,129395,129398,14,129401,129401,14,129403,129403,14,129408,129412,14,129426,129431,14,129443,129444,14,129451,129453,14,129456,129465,14,129472,129472,14,129475,129482,14,129484,129484,14,129488,129510,14,129536,129647,14,129652,129652,14,129656,129658,14,129664,129666,14,129671,129679,14,129686,129704,14,129712,129718,14,129728,129730,14,129744,129750,14,917504,917504,4,917506,917535,4,917632,917759,4,918000,921599,4,0,9,4,11,12,4,14,31,4,169,169,14,174,174,14,1155,1159,5,1425,1469,5,1473,1474,5,1479,1479,5,1552,1562,5,1611,1631,5,1750,1756,5,1759,1764,5,1770,1773,5,1809,1809,5,1958,1968,5,2045,2045,5,2075,2083,5,2089,2093,5,2259,2273,5,2275,2306,5,2362,2362,5,2364,2364,5,2369,2376,5,2381,2381,5,2385,2391,5,2433,2433,5,2492,2492,5,2495,2496,7,2503,2504,7,2509,2509,5,2530,2531,5,2561,2562,5,2620,2620,5,2625,2626,5,2635,2637,5,2672,2673,5,2689,2690,5,2748,2748,5,2753,2757,5,2761,2761,7,2765,2765,5,2810,2815,5,2818,2819,7,2878,2878,5,2880,2880,7,2887,2888,7,2893,2893,5,2903,2903,5,2946,2946,5,3007,3007,7,3009,3010,7,3018,3020,7,3031,3031,5,3073,3075,7,3134,3136,5,3142,3144,5,3157,3158,5,3201,3201,5,3260,3260,5,3263,3263,5,3266,3266,5,3270,3270,5,3274,3275,7,3285,3286,5,3328,3329,5,3387,3388,5,3391,3392,7,3398,3400,7,3405,3405,5,3415,3415,5,3457,3457,5,3530,3530,5,3536,3537,7,3542,3542,5,3551,3551,5,3633,3633,5,3636,3642,5,3761,3761,5,3764,3772,5,3864,3865,5,3895,3895,5,3902,3903,7,3967,3967,7,3974,3975,5,3993,4028,5,4141,4144,5,4146,4151,5,4155,4156,7,4182,4183,7,4190,4192,5,4226,4226,5,4229,4230,5,4253,4253,5,4448,4519,9,4957,4959,5,5938,5940,5,6002,6003,5,6070,6070,7,6078,6085,7,6087,6088,7,6109,6109,5,6158,6158,4,6313,6313,5,6435,6438,7,6441,6443,7,6450,6450,5,6457,6459,5,6681,6682,7,6741,6741,7,6743,6743,7,6752,6752,5,6757,6764,5,6771,6780,5,6832,6845,5,6847,6848,5,6916,6916,7,6965,6965,5,6971,6971,7,6973,6977,7,6979,6980,7,7040,7041,5,7073,7073,7,7078,7079,7,7082,7082,7,7142,7142,5,7144,7145,5,7149,7149,5,7151,7153,5,7204,7211,7,7220,7221,7,7376,7378,5,7393,7393,7,7405,7405,5,7415,7415,7,7616,7673,5,8203,8203,4,8205,8205,13,8232,8232,4,8234,8238,4,8265,8265,14,8293,8293,4,8400,8412,5,8417,8417,5,8421,8432,5,8505,8505,14,8617,8618,14,9000,9000,14,9167,9167,14,9208,9210,14,9642,9643,14,9664,9664,14,9728,9732,14,9735,9741,14,9743,9744,14,9746,9746,14,9750,9751,14,9753,9756,14,9758,9759,14,9761,9761,14,9764,9765,14,9767,9769,14,9771,9773,14,9776,9783,14,9787,9791,14,9793,9793,14,9795,9799,14,9812,9822,14,9824,9824,14,9827,9827,14,9829,9830,14,9832,9832,14,9851,9851,14,9854,9854,14,9856,9861,14,9874,9876,14,9878,9879,14,9881,9881,14,9883,9884,14,9888,9889,14,9895,9895,14,9898,9899,14,9904,9905,14,9917,9918,14,9924,9925,14,9928,9928,14,9934,9935,14,9937,9937,14,9939,9940,14,9961,9962,14,9968,9973,14,9975,9978,14,9981,9981,14,9986,9986,14,9989,9989,14,9998,9998,14,10000,10001,14,10004,10004,14,10013,10013,14,10024,10024,14,10052,10052,14,10060,10060,14,10067,10069,14,10083,10084,14,10133,10135,14,10160,10160,14,10548,10549,14,11035,11036,14,11093,11093,14,11647,11647,5,12330,12333,5,12336,12336,14,12441,12442,5,12953,12953,14,42608,42610,5,42654,42655,5,43010,43010,5,43019,43019,5,43045,43046,5,43052,43052,5,43188,43203,7,43232,43249,5,43302,43309,5,43346,43347,7,43392,43394,5,43443,43443,5,43446,43449,5,43452,43453,5,43493,43493,5,43567,43568,7,43571,43572,7,43587,43587,5,43597,43597,7,43696,43696,5,43703,43704,5,43713,43713,5,43756,43757,5,43765,43765,7,44003,44004,7,44006,44007,7,44009,44010,7,44013,44013,5,44033,44059,12,44061,44087,12,44089,44115,12,44117,44143,12,44145,44171,12,44173,44199,12,44201,44227,12,44229,44255,12,44257,44283,12,44285,44311,12,44313,44339,12,44341,44367,12,44369,44395,12,44397,44423,12,44425,44451,12,44453,44479,12,44481,44507,12,44509,44535,12,44537,44563,12,44565,44591,12,44593,44619,12,44621,44647,12,44649,44675,12,44677,44703,12,44705,44731,12,44733,44759,12,44761,44787,12,44789,44815,12,44817,44843,12,44845,44871,12,44873,44899,12,44901,44927,12,44929,44955,12,44957,44983,12,44985,45011,12,45013,45039,12,45041,45067,12,45069,45095,12,45097,45123,12,45125,45151,12,45153,45179,12,45181,45207,12,45209,45235,12,45237,45263,12,45265,45291,12,45293,45319,12,45321,45347,12,45349,45375,12,45377,45403,12,45405,45431,12,45433,45459,12,45461,45487,12,45489,45515,12,45517,45543,12,45545,45571,12,45573,45599,12,45601,45627,12,45629,45655,12,45657,45683,12,45685,45711,12,45713,45739,12,45741,45767,12,45769,45795,12,45797,45823,12,45825,45851,12,45853,45879,12,45881,45907,12,45909,45935,12,45937,45963,12,45965,45991,12,45993,46019,12,46021,46047,12,46049,46075,12,46077,46103,12,46105,46131,12,46133,46159,12,46161,46187,12,46189,46215,12,46217,46243,12,46245,46271,12,46273,46299,12,46301,46327,12,46329,46355,12,46357,46383,12,46385,46411,12,46413,46439,12,46441,46467,12,46469,46495,12,46497,46523,12,46525,46551,12,46553,46579,12,46581,46607,12,46609,46635,12,46637,46663,12,46665,46691,12,46693,46719,12,46721,46747,12,46749,46775,12,46777,46803,12,46805,46831,12,46833,46859,12,46861,46887,12,46889,46915,12,46917,46943,12,46945,46971,12,46973,46999,12,47001,47027,12,47029,47055,12,47057,47083,12,47085,47111,12,47113,47139,12,47141,47167,12,47169,47195,12,47197,47223,12,47225,47251,12,47253,47279,12,47281,47307,12,47309,47335,12,47337,47363,12,47365,47391,12,47393,47419,12,47421,47447,12,47449,47475,12,47477,47503,12,47505,47531,12,47533,47559,12,47561,47587,12,47589,47615,12,47617,47643,12,47645,47671,12,47673,47699,12,47701,47727,12,47729,47755,12,47757,47783,12,47785,47811,12,47813,47839,12,47841,47867,12,47869,47895,12,47897,47923,12,47925,47951,12,47953,47979,12,47981,48007,12,48009,48035,12,48037,48063,12,48065,48091,12,48093,48119,12,48121,48147,12,48149,48175,12,48177,48203,12,48205,48231,12,48233,48259,12,48261,48287,12,48289,48315,12,48317,48343,12,48345,48371,12,48373,48399,12,48401,48427,12,48429,48455,12,48457,48483,12,48485,48511,12,48513,48539,12,48541,48567,12,48569,48595,12,48597,48623,12,48625,48651,12,48653,48679,12,48681,48707,12,48709,48735,12,48737,48763,12,48765,48791,12,48793,48819,12,48821,48847,12,48849,48875,12,48877,48903,12,48905,48931,12,48933,48959,12,48961,48987,12,48989,49015,12,49017,49043,12,49045,49071,12,49073,49099,12,49101,49127,12,49129,49155,12,49157,49183,12,49185,49211,12,49213,49239,12,49241,49267,12,49269,49295,12,49297,49323,12,49325,49351,12,49353,49379,12,49381,49407,12,49409,49435,12,49437,49463,12,49465,49491,12,49493,49519,12,49521,49547,12,49549,49575,12,49577,49603,12,49605,49631,12,49633,49659,12,49661,49687,12,49689,49715,12,49717,49743,12,49745,49771,12,49773,49799,12,49801,49827,12,49829,49855,12,49857,49883,12,49885,49911,12,49913,49939,12,49941,49967,12,49969,49995,12,49997,50023,12,50025,50051,12,50053,50079,12,50081,50107,12,50109,50135,12,50137,50163,12,50165,50191,12,50193,50219,12,50221,50247,12,50249,50275,12,50277,50303,12,50305,50331,12,50333,50359,12,50361,50387,12,50389,50415,12,50417,50443,12,50445,50471,12,50473,50499,12,50501,50527,12,50529,50555,12,50557,50583,12,50585,50611,12,50613,50639,12,50641,50667,12,50669,50695,12,50697,50723,12,50725,50751,12,50753,50779,12,50781,50807,12,50809,50835,12,50837,50863,12,50865,50891,12,50893,50919,12,50921,50947,12,50949,50975,12,50977,51003,12,51005,51031,12,51033,51059,12,51061,51087,12,51089,51115,12,51117,51143,12,51145,51171,12,51173,51199,12,51201,51227,12,51229,51255,12,51257,51283,12,51285,51311,12,51313,51339,12,51341,51367,12,51369,51395,12,51397,51423,12,51425,51451,12,51453,51479,12,51481,51507,12,51509,51535,12,51537,51563,12,51565,51591,12,51593,51619,12,51621,51647,12,51649,51675,12,51677,51703,12,51705,51731,12,51733,51759,12,51761,51787,12,51789,51815,12,51817,51843,12,51845,51871,12,51873,51899,12,51901,51927,12,51929,51955,12,51957,51983,12,51985,52011,12,52013,52039,12,52041,52067,12,52069,52095,12,52097,52123,12,52125,52151,12,52153,52179,12,52181,52207,12,52209,52235,12,52237,52263,12,52265,52291,12,52293,52319,12,52321,52347,12,52349,52375,12,52377,52403,12,52405,52431,12,52433,52459,12,52461,52487,12,52489,52515,12,52517,52543,12,52545,52571,12,52573,52599,12,52601,52627,12,52629,52655,12,52657,52683,12,52685,52711,12,52713,52739,12,52741,52767,12,52769,52795,12,52797,52823,12,52825,52851,12,52853,52879,12,52881,52907,12,52909,52935,12,52937,52963,12,52965,52991,12,52993,53019,12,53021,53047,12,53049,53075,12,53077,53103,12,53105,53131,12,53133,53159,12,53161,53187,12,53189,53215,12,53217,53243,12,53245,53271,12,53273,53299,12,53301,53327,12,53329,53355,12,53357,53383,12,53385,53411,12,53413,53439,12,53441,53467,12,53469,53495,12,53497,53523,12,53525,53551,12,53553,53579,12,53581,53607,12,53609,53635,12,53637,53663,12,53665,53691,12,53693,53719,12,53721,53747,12,53749,53775,12,53777,53803,12,53805,53831,12,53833,53859,12,53861,53887,12,53889,53915,12,53917,53943,12,53945,53971,12,53973,53999,12,54001,54027,12,54029,54055,12,54057,54083,12,54085,54111,12,54113,54139,12,54141,54167,12,54169,54195,12,54197,54223,12,54225,54251,12,54253,54279,12,54281,54307,12,54309,54335,12,54337,54363,12,54365,54391,12,54393,54419,12,54421,54447,12,54449,54475,12,54477,54503,12,54505,54531,12,54533,54559,12,54561,54587,12,54589,54615,12,54617,54643,12,54645,54671,12,54673,54699,12,54701,54727,12,54729,54755,12,54757,54783,12,54785,54811,12,54813,54839,12,54841,54867,12,54869,54895,12,54897,54923,12,54925,54951,12,54953,54979,12,54981,55007,12,55009,55035,12,55037,55063,12,55065,55091,12,55093,55119,12,55121,55147,12,55149,55175,12,55177,55203,12,55243,55291,10,65024,65039,5,65279,65279,4,65520,65528,4,66045,66045,5,66422,66426,5,68101,68102,5,68152,68154,5,68325,68326,5,69291,69292,5,69632,69632,7,69634,69634,7,69759,69761,5]');
    }
});
//#endregion

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[10/*vs/base/common/buffer*/], __M([0/*require*/,1/*exports*/,6/*vs/base/common/strings*/,30/*vs/base/common/stream*/]), function (require, exports, strings, streams) {
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
define(__m[31/*vs/base/common/types*/], __M([0/*require*/,1/*exports*/]), function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NotImplementedProxy = exports.withUndefinedAsNull = exports.withNullAsUndefined = exports.createProxyObject = exports.getAllMethodNames = exports.getAllPropertyNames = exports.validateConstraint = exports.validateConstraints = exports.areFunctions = exports.isFunction = exports.isEmptyObject = exports.assertAllDefined = exports.assertIsDefined = exports.assertType = exports.isUndefinedOrNull = exports.isDefined = exports.isUndefined = exports.isBoolean = exports.isNumber = exports.isObject = exports.isStringArray = exports.isString = exports.isArray = void 0;
    /**
     * @returns whether the provided parameter is a JavaScript Array or not.
     */
    function isArray(array) {
        return Array.isArray(array);
    }
    exports.isArray = isArray;
    /**
     * @returns whether the provided parameter is a JavaScript String or not.
     */
    function isString(str) {
        return (typeof str === 'string');
    }
    exports.isString = isString;
    /**
     * @returns whether the provided parameter is a JavaScript Array and each element in the array is a string.
     */
    function isStringArray(value) {
        return Array.isArray(value) && value.every(elem => isString(elem));
    }
    exports.isStringArray = isStringArray;
    /**
     *
     * @returns whether the provided parameter is of type `object` but **not**
     *	`null`, an `array`, a `regexp`, nor a `date`.
     */
    function isObject(obj) {
        // The method can't do a type cast since there are type (like strings) which
        // are subclasses of any put not positvely matched by the function. Hence type
        // narrowing results in wrong results.
        return typeof obj === 'object'
            && obj !== null
            && !Array.isArray(obj)
            && !(obj instanceof RegExp)
            && !(obj instanceof Date);
    }
    exports.isObject = isObject;
    /**
     * In **contrast** to just checking `typeof` this will return `false` for `NaN`.
     * @returns whether the provided parameter is a JavaScript Number or not.
     */
    function isNumber(obj) {
        return (typeof obj === 'number' && !isNaN(obj));
    }
    exports.isNumber = isNumber;
    /**
     * @returns whether the provided parameter is a JavaScript Boolean or not.
     */
    function isBoolean(obj) {
        return (obj === true || obj === false);
    }
    exports.isBoolean = isBoolean;
    /**
     * @returns whether the provided parameter is undefined.
     */
    function isUndefined(obj) {
        return (typeof obj === 'undefined');
    }
    exports.isUndefined = isUndefined;
    /**
     * @returns whether the provided parameter is defined.
     */
    function isDefined(arg) {
        return !isUndefinedOrNull(arg);
    }
    exports.isDefined = isDefined;
    /**
     * @returns whether the provided parameter is undefined or null.
     */
    function isUndefinedOrNull(obj) {
        return (isUndefined(obj) || obj === null);
    }
    exports.isUndefinedOrNull = isUndefinedOrNull;
    function assertType(condition, type) {
        if (!condition) {
            throw new Error(type ? `Unexpected type, expected '${type}'` : 'Unexpected type');
        }
    }
    exports.assertType = assertType;
    /**
     * Asserts that the argument passed in is neither undefined nor null.
     */
    function assertIsDefined(arg) {
        if (isUndefinedOrNull(arg)) {
            throw new Error('Assertion Failed: argument is undefined or null');
        }
        return arg;
    }
    exports.assertIsDefined = assertIsDefined;
    function assertAllDefined(...args) {
        const result = [];
        for (let i = 0; i < args.length; i++) {
            const arg = args[i];
            if (isUndefinedOrNull(arg)) {
                throw new Error(`Assertion Failed: argument at index ${i} is undefined or null`);
            }
            result.push(arg);
        }
        return result;
    }
    exports.assertAllDefined = assertAllDefined;
    const hasOwnProperty = Object.prototype.hasOwnProperty;
    /**
     * @returns whether the provided parameter is an empty JavaScript Object or not.
     */
    function isEmptyObject(obj) {
        if (!isObject(obj)) {
            return false;
        }
        for (let key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                return false;
            }
        }
        return true;
    }
    exports.isEmptyObject = isEmptyObject;
    /**
     * @returns whether the provided parameter is a JavaScript Function or not.
     */
    function isFunction(obj) {
        return (typeof obj === 'function');
    }
    exports.isFunction = isFunction;
    /**
     * @returns whether the provided parameters is are JavaScript Function or not.
     */
    function areFunctions(...objects) {
        return objects.length > 0 && objects.every(isFunction);
    }
    exports.areFunctions = areFunctions;
    function validateConstraints(args, constraints) {
        const len = Math.min(args.length, constraints.length);
        for (let i = 0; i < len; i++) {
            validateConstraint(args[i], constraints[i]);
        }
    }
    exports.validateConstraints = validateConstraints;
    function validateConstraint(arg, constraint) {
        if (isString(constraint)) {
            if (typeof arg !== constraint) {
                throw new Error(`argument does not match constraint: typeof ${constraint}`);
            }
        }
        else if (isFunction(constraint)) {
            try {
                if (arg instanceof constraint) {
                    return;
                }
            }
            catch (_a) {
                // ignore
            }
            if (!isUndefinedOrNull(arg) && arg.constructor === constraint) {
                return;
            }
            if (constraint.length === 1 && constraint.call(undefined, arg) === true) {
                return;
            }
            throw new Error(`argument does not match one of these constraints: arg instanceof constraint, arg.constructor === constraint, nor constraint(arg) === true`);
        }
    }
    exports.validateConstraint = validateConstraint;
    function getAllPropertyNames(obj) {
        let res = [];
        let proto = Object.getPrototypeOf(obj);
        while (Object.prototype !== proto) {
            res = res.concat(Object.getOwnPropertyNames(proto));
            proto = Object.getPrototypeOf(proto);
        }
        return res;
    }
    exports.getAllPropertyNames = getAllPropertyNames;
    function getAllMethodNames(obj) {
        const methods = [];
        for (const prop of getAllPropertyNames(obj)) {
            if (typeof obj[prop] === 'function') {
                methods.push(prop);
            }
        }
        return methods;
    }
    exports.getAllMethodNames = getAllMethodNames;
    function createProxyObject(methodNames, invoke) {
        const createProxyMethod = (method) => {
            return function () {
                const args = Array.prototype.slice.call(arguments, 0);
                return invoke(method, args);
            };
        };
        let result = {};
        for (const methodName of methodNames) {
            result[methodName] = createProxyMethod(methodName);
        }
        return result;
    }
    exports.createProxyObject = createProxyObject;
    /**
     * Converts null to undefined, passes all other values through.
     */
    function withNullAsUndefined(x) {
        return x === null ? undefined : x;
    }
    exports.withNullAsUndefined = withNullAsUndefined;
    /**
     * Converts undefined to null, passes all other values through.
     */
    function withUndefinedAsNull(x) {
        return typeof x === 'undefined' ? null : x;
    }
    exports.withUndefinedAsNull = withUndefinedAsNull;
    function NotImplementedProxy(name) {
        return class {
            constructor() {
                return new Proxy({}, {
                    get(target, prop) {
                        if (target[prop]) {
                            return target[prop];
                        }
                        throw new Error(`Not Implemented: ${name}->${String(prop)}`);
                    }
                });
            }
        };
    }
    exports.NotImplementedProxy = NotImplementedProxy;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[8/*vs/base/common/uri*/], __M([0/*require*/,1/*exports*/,2/*vs/base/common/platform*/,29/*vs/base/common/path*/]), function (require, exports, platform_1, paths) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.uriToFsPath = exports.URI = void 0;
    const _schemePattern = /^\w[\w\d+.-]*$/;
    const _singleSlashStart = /^\//;
    const _doubleSlashStart = /^\/\//;
    function _validateUri(ret, _strict) {
        // scheme, must be set
        if (!ret.scheme && _strict) {
            throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${ret.authority}", path: "${ret.path}", query: "${ret.query}", fragment: "${ret.fragment}"}`);
        }
        // scheme, https://tools.ietf.org/html/rfc3986#section-3.1
        // ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
        if (ret.scheme && !_schemePattern.test(ret.scheme)) {
            throw new Error('[UriError]: Scheme contains illegal characters.');
        }
        // path, http://tools.ietf.org/html/rfc3986#section-3.3
        // If a URI contains an authority component, then the path component
        // must either be empty or begin with a slash ("/") character.  If a URI
        // does not contain an authority component, then the path cannot begin
        // with two slash characters ("//").
        if (ret.path) {
            if (ret.authority) {
                if (!_singleSlashStart.test(ret.path)) {
                    throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character');
                }
            }
            else {
                if (_doubleSlashStart.test(ret.path)) {
                    throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")');
                }
            }
        }
    }
    // for a while we allowed uris *without* schemes and this is the migration
    // for them, e.g. an uri without scheme and without strict-mode warns and falls
    // back to the file-scheme. that should cause the least carnage and still be a
    // clear warning
    function _schemeFix(scheme, _strict) {
        if (!scheme && !_strict) {
            return 'file';
        }
        return scheme;
    }
    // implements a bit of https://tools.ietf.org/html/rfc3986#section-5
    function _referenceResolution(scheme, path) {
        // the slash-character is our 'default base' as we don't
        // support constructing URIs relative to other URIs. This
        // also means that we alter and potentially break paths.
        // see https://tools.ietf.org/html/rfc3986#section-5.1.4
        switch (scheme) {
            case 'https':
            case 'http':
            case 'file':
                if (!path) {
                    path = _slash;
                }
                else if (path[0] !== _slash) {
                    path = _slash + path;
                }
                break;
        }
        return path;
    }
    const _empty = '';
    const _slash = '/';
    const _regexp = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
    /**
     * Uniform Resource Identifier (URI) http://tools.ietf.org/html/rfc3986.
     * This class is a simple parser which creates the basic component parts
     * (http://tools.ietf.org/html/rfc3986#section-3) with minimal validation
     * and encoding.
     *
     * ```txt
     *       foo://example.com:8042/over/there?name=ferret#nose
     *       \_/   \______________/\_________/ \_________/ \__/
     *        |           |            |            |        |
     *     scheme     authority       path        query   fragment
     *        |   _____________________|__
     *       / \ /                        \
     *       urn:example:animal:ferret:nose
     * ```
     */
    class URI {
        /**
         * @internal
         */
        constructor(schemeOrData, authority, path, query, fragment, _strict = false) {
            if (typeof schemeOrData === 'object') {
                this.scheme = schemeOrData.scheme || _empty;
                this.authority = schemeOrData.authority || _empty;
                this.path = schemeOrData.path || _empty;
                this.query = schemeOrData.query || _empty;
                this.fragment = schemeOrData.fragment || _empty;
                // no validation because it's this URI
                // that creates uri components.
                // _validateUri(this);
            }
            else {
                this.scheme = _schemeFix(schemeOrData, _strict);
                this.authority = authority || _empty;
                this.path = _referenceResolution(this.scheme, path || _empty);
                this.query = query || _empty;
                this.fragment = fragment || _empty;
                _validateUri(this, _strict);
            }
        }
        static isUri(thing) {
            if (thing instanceof URI) {
                return true;
            }
            if (!thing) {
                return false;
            }
            return typeof thing.authority === 'string'
                && typeof thing.fragment === 'string'
                && typeof thing.path === 'string'
                && typeof thing.query === 'string'
                && typeof thing.scheme === 'string'
                && typeof thing.fsPath === 'function'
                && typeof thing.with === 'function'
                && typeof thing.toString === 'function';
        }
        // ---- filesystem path -----------------------
        /**
         * Returns a string representing the corresponding file system path of this URI.
         * Will handle UNC paths, normalizes windows drive letters to lower-case, and uses the
         * platform specific path separator.
         *
         * * Will *not* validate the path for invalid characters and semantics.
         * * Will *not* look at the scheme of this URI.
         * * The result shall *not* be used for display purposes but for accessing a file on disk.
         *
         *
         * The *difference* to `URI#path` is the use of the platform specific separator and the handling
         * of UNC paths. See the below sample of a file-uri with an authority (UNC path).
         *
         * ```ts
            const u = URI.parse('file://server/c$/folder/file.txt')
            u.authority === 'server'
            u.path === '/shares/c$/file.txt'
            u.fsPath === '\\server\c$\folder\file.txt'
        ```
         *
         * Using `URI#path` to read a file (using fs-apis) would not be enough because parts of the path,
         * namely the server name, would be missing. Therefore `URI#fsPath` exists - it's sugar to ease working
         * with URIs that represent files on disk (`file` scheme).
         */
        get fsPath() {
            // if (this.scheme !== 'file') {
            // 	console.warn(`[UriError] calling fsPath with scheme ${this.scheme}`);
            // }
            return uriToFsPath(this, false);
        }
        // ---- modify to new -------------------------
        with(change) {
            if (!change) {
                return this;
            }
            let { scheme, authority, path, query, fragment } = change;
            if (scheme === undefined) {
                scheme = this.scheme;
            }
            else if (scheme === null) {
                scheme = _empty;
            }
            if (authority === undefined) {
                authority = this.authority;
            }
            else if (authority === null) {
                authority = _empty;
            }
            if (path === undefined) {
                path = this.path;
            }
            else if (path === null) {
                path = _empty;
            }
            if (query === undefined) {
                query = this.query;
            }
            else if (query === null) {
                query = _empty;
            }
            if (fragment === undefined) {
                fragment = this.fragment;
            }
            else if (fragment === null) {
                fragment = _empty;
            }
            if (scheme === this.scheme
                && authority === this.authority
                && path === this.path
                && query === this.query
                && fragment === this.fragment) {
                return this;
            }
            return new Uri(scheme, authority, path, query, fragment);
        }
        // ---- parse & validate ------------------------
        /**
         * Creates a new URI from a string, e.g. `http://www.msft.com/some/path`,
         * `file:///usr/home`, or `scheme:with/path`.
         *
         * @param value A string which represents an URI (see `URI#toString`).
         */
        static parse(value, _strict = false) {
            const match = _regexp.exec(value);
            if (!match) {
                return new Uri(_empty, _empty, _empty, _empty, _empty);
            }
            return new Uri(match[2] || _empty, percentDecode(match[4] || _empty), percentDecode(match[5] || _empty), percentDecode(match[7] || _empty), percentDecode(match[9] || _empty), _strict);
        }
        /**
         * Creates a new URI from a file system path, e.g. `c:\my\files`,
         * `/usr/home`, or `\\server\share\some\path`.
         *
         * The *difference* between `URI#parse` and `URI#file` is that the latter treats the argument
         * as path, not as stringified-uri. E.g. `URI.file(path)` is **not the same as**
         * `URI.parse('file://' + path)` because the path might contain characters that are
         * interpreted (# and ?). See the following sample:
         * ```ts
        const good = URI.file('/coding/c#/project1');
        good.scheme === 'file';
        good.path === '/coding/c#/project1';
        good.fragment === '';
        const bad = URI.parse('file://' + '/coding/c#/project1');
        bad.scheme === 'file';
        bad.path === '/coding/c'; // path is now broken
        bad.fragment === '/project1';
        ```
         *
         * @param path A file system path (see `URI#fsPath`)
         */
        static file(path) {
            let authority = _empty;
            // normalize to fwd-slashes on windows,
            // on other systems bwd-slashes are valid
            // filename character, eg /f\oo/ba\r.txt
            if (platform_1.isWindows) {
                path = path.replace(/\\/g, _slash);
            }
            // check for authority as used in UNC shares
            // or use the path as given
            if (path[0] === _slash && path[1] === _slash) {
                const idx = path.indexOf(_slash, 2);
                if (idx === -1) {
                    authority = path.substring(2);
                    path = _slash;
                }
                else {
                    authority = path.substring(2, idx);
                    path = path.substring(idx) || _slash;
                }
            }
            return new Uri('file', authority, path, _empty, _empty);
        }
        static from(components) {
            return new Uri(components.scheme, components.authority, components.path, components.query, components.fragment);
        }
        /**
         * Join a URI path with path fragments and normalizes the resulting path.
         *
         * @param uri The input URI.
         * @param pathFragment The path fragment to add to the URI path.
         * @returns The resulting URI.
         */
        static joinPath(uri, ...pathFragment) {
            if (!uri.path) {
                throw new Error(`[UriError]: cannot call joinPaths on URI without path`);
            }
            let newPath;
            if (platform_1.isWindows && uri.scheme === 'file') {
                newPath = URI.file(paths.win32.join(uriToFsPath(uri, true), ...pathFragment)).path;
            }
            else {
                newPath = paths.posix.join(uri.path, ...pathFragment);
            }
            return uri.with({ path: newPath });
        }
        // ---- printing/externalize ---------------------------
        /**
         * Creates a string representation for this URI. It's guaranteed that calling
         * `URI.parse` with the result of this function creates an URI which is equal
         * to this URI.
         *
         * * The result shall *not* be used for display purposes but for externalization or transport.
         * * The result will be encoded using the percentage encoding and encoding happens mostly
         * ignore the scheme-specific encoding rules.
         *
         * @param skipEncoding Do not encode the result, default is `false`
         */
        toString(skipEncoding = false) {
            return _asFormatted(this, skipEncoding);
        }
        toJSON() {
            return this;
        }
        static revive(data) {
            if (!data) {
                return data;
            }
            else if (data instanceof URI) {
                return data;
            }
            else {
                const result = new Uri(data);
                result._formatted = data.external;
                result._fsPath = data._sep === _pathSepMarker ? data.fsPath : null;
                return result;
            }
        }
    }
    exports.URI = URI;
    const _pathSepMarker = platform_1.isWindows ? 1 : undefined;
    // This class exists so that URI is compatibile with vscode.Uri (API).
    class Uri extends URI {
        constructor() {
            super(...arguments);
            this._formatted = null;
            this._fsPath = null;
        }
        get fsPath() {
            if (!this._fsPath) {
                this._fsPath = uriToFsPath(this, false);
            }
            return this._fsPath;
        }
        toString(skipEncoding = false) {
            if (!skipEncoding) {
                if (!this._formatted) {
                    this._formatted = _asFormatted(this, false);
                }
                return this._formatted;
            }
            else {
                // we don't cache that
                return _asFormatted(this, true);
            }
        }
        toJSON() {
            const res = {
                $mid: 1
            };
            // cached state
            if (this._fsPath) {
                res.fsPath = this._fsPath;
                res._sep = _pathSepMarker;
            }
            if (this._formatted) {
                res.external = this._formatted;
            }
            // uri components
            if (this.path) {
                res.path = this.path;
            }
            if (this.scheme) {
                res.scheme = this.scheme;
            }
            if (this.authority) {
                res.authority = this.authority;
            }
            if (this.query) {
                res.query = this.query;
            }
            if (this.fragment) {
                res.fragment = this.fragment;
            }
            return res;
        }
    }
    // reserved characters: https://tools.ietf.org/html/rfc3986#section-2.2
    const encodeTable = {
        [58 /* Colon */]: '%3A',
        [47 /* Slash */]: '%2F',
        [63 /* QuestionMark */]: '%3F',
        [35 /* Hash */]: '%23',
        [91 /* OpenSquareBracket */]: '%5B',
        [93 /* CloseSquareBracket */]: '%5D',
        [64 /* AtSign */]: '%40',
        [33 /* ExclamationMark */]: '%21',
        [36 /* DollarSign */]: '%24',
        [38 /* Ampersand */]: '%26',
        [39 /* SingleQuote */]: '%27',
        [40 /* OpenParen */]: '%28',
        [41 /* CloseParen */]: '%29',
        [42 /* Asterisk */]: '%2A',
        [43 /* Plus */]: '%2B',
        [44 /* Comma */]: '%2C',
        [59 /* Semicolon */]: '%3B',
        [61 /* Equals */]: '%3D',
        [32 /* Space */]: '%20',
    };
    function encodeURIComponentFast(uriComponent, allowSlash) {
        let res = undefined;
        let nativeEncodePos = -1;
        for (let pos = 0; pos < uriComponent.length; pos++) {
            const code = uriComponent.charCodeAt(pos);
            // unreserved characters: https://tools.ietf.org/html/rfc3986#section-2.3
            if ((code >= 97 /* a */ && code <= 122 /* z */)
                || (code >= 65 /* A */ && code <= 90 /* Z */)
                || (code >= 48 /* Digit0 */ && code <= 57 /* Digit9 */)
                || code === 45 /* Dash */
                || code === 46 /* Period */
                || code === 95 /* Underline */
                || code === 126 /* Tilde */
                || (allowSlash && code === 47 /* Slash */)) {
                // check if we are delaying native encode
                if (nativeEncodePos !== -1) {
                    res += encodeURIComponent(uriComponent.substring(nativeEncodePos, pos));
                    nativeEncodePos = -1;
                }
                // check if we write into a new string (by default we try to return the param)
                if (res !== undefined) {
                    res += uriComponent.charAt(pos);
                }
            }
            else {
                // encoding needed, we need to allocate a new string
                if (res === undefined) {
                    res = uriComponent.substr(0, pos);
                }
                // check with default table first
                const escaped = encodeTable[code];
                if (escaped !== undefined) {
                    // check if we are delaying native encode
                    if (nativeEncodePos !== -1) {
                        res += encodeURIComponent(uriComponent.substring(nativeEncodePos, pos));
                        nativeEncodePos = -1;
                    }
                    // append escaped variant to result
                    res += escaped;
                }
                else if (nativeEncodePos === -1) {
                    // use native encode only when needed
                    nativeEncodePos = pos;
                }
            }
        }
        if (nativeEncodePos !== -1) {
            res += encodeURIComponent(uriComponent.substring(nativeEncodePos));
        }
        return res !== undefined ? res : uriComponent;
    }
    function encodeURIComponentMinimal(path) {
        let res = undefined;
        for (let pos = 0; pos < path.length; pos++) {
            const code = path.charCodeAt(pos);
            if (code === 35 /* Hash */ || code === 63 /* QuestionMark */) {
                if (res === undefined) {
                    res = path.substr(0, pos);
                }
                res += encodeTable[code];
            }
            else {
                if (res !== undefined) {
                    res += path[pos];
                }
            }
        }
        return res !== undefined ? res : path;
    }
    /**
     * Compute `fsPath` for the given uri
     */
    function uriToFsPath(uri, keepDriveLetterCasing) {
        let value;
        if (uri.authority && uri.path.length > 1 && uri.scheme === 'file') {
            // unc path: file://shares/c$/far/boo
            value = `//${uri.authority}${uri.path}`;
        }
        else if (uri.path.charCodeAt(0) === 47 /* Slash */
            && (uri.path.charCodeAt(1) >= 65 /* A */ && uri.path.charCodeAt(1) <= 90 /* Z */ || uri.path.charCodeAt(1) >= 97 /* a */ && uri.path.charCodeAt(1) <= 122 /* z */)
            && uri.path.charCodeAt(2) === 58 /* Colon */) {
            if (!keepDriveLetterCasing) {
                // windows drive letter: file:///c:/far/boo
                value = uri.path[1].toLowerCase() + uri.path.substr(2);
            }
            else {
                value = uri.path.substr(1);
            }
        }
        else {
            // other path
            value = uri.path;
        }
        if (platform_1.isWindows) {
            value = value.replace(/\//g, '\\');
        }
        return value;
    }
    exports.uriToFsPath = uriToFsPath;
    /**
     * Create the external version of a uri
     */
    function _asFormatted(uri, skipEncoding) {
        const encoder = !skipEncoding
            ? encodeURIComponentFast
            : encodeURIComponentMinimal;
        let res = '';
        let { scheme, authority, path, query, fragment } = uri;
        if (scheme) {
            res += scheme;
            res += ':';
        }
        if (authority || scheme === 'file') {
            res += _slash;
            res += _slash;
        }
        if (authority) {
            let idx = authority.indexOf('@');
            if (idx !== -1) {
                // <user>@<auth>
                const userinfo = authority.substr(0, idx);
                authority = authority.substr(idx + 1);
                idx = userinfo.indexOf(':');
                if (idx === -1) {
                    res += encoder(userinfo, false);
                }
                else {
                    // <user>:<pass>@<auth>
                    res += encoder(userinfo.substr(0, idx), false);
                    res += ':';
                    res += encoder(userinfo.substr(idx + 1), false);
                }
                res += '@';
            }
            authority = authority.toLowerCase();
            idx = authority.indexOf(':');
            if (idx === -1) {
                res += encoder(authority, false);
            }
            else {
                // <auth>:<port>
                res += encoder(authority.substr(0, idx), false);
                res += authority.substr(idx);
            }
        }
        if (path) {
            // lower-case windows drive letters in /C:/fff or C:/fff
            if (path.length >= 3 && path.charCodeAt(0) === 47 /* Slash */ && path.charCodeAt(2) === 58 /* Colon */) {
                const code = path.charCodeAt(1);
                if (code >= 65 /* A */ && code <= 90 /* Z */) {
                    path = `/${String.fromCharCode(code + 32)}:${path.substr(3)}`; // "/c:".length === 3
                }
            }
            else if (path.length >= 2 && path.charCodeAt(1) === 58 /* Colon */) {
                const code = path.charCodeAt(0);
                if (code >= 65 /* A */ && code <= 90 /* Z */) {
                    path = `${String.fromCharCode(code + 32)}:${path.substr(2)}`; // "/c:".length === 3
                }
            }
            // encode the rest of the path
            res += encoder(path, true);
        }
        if (query) {
            res += '?';
            res += encoder(query, false);
        }
        if (fragment) {
            res += '#';
            res += !skipEncoding ? encodeURIComponentFast(fragment, false) : fragment;
        }
        return res;
    }
    // --- decode
    function decodeURIComponentGraceful(str) {
        try {
            return decodeURIComponent(str);
        }
        catch (_a) {
            if (str.length > 3) {
                return str.substr(0, 3) + decodeURIComponentGraceful(str.substr(3));
            }
            else {
                return str;
            }
        }
    }
    const _rEncodedAsHex = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
    function percentDecode(str) {
        if (!str.match(_rEncodedAsHex)) {
            return str;
        }
        return str.replace(_rEncodedAsHex, (match) => decodeURIComponentGraceful(match));
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[32/*vs/base/common/marshalling*/], __M([0/*require*/,1/*exports*/,10/*vs/base/common/buffer*/,6/*vs/base/common/strings*/,8/*vs/base/common/uri*/]), function (require, exports, buffer_1, strings_1, uri_1) {
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
define(__m[16/*vs/base/common/network*/], __M([0/*require*/,1/*exports*/,8/*vs/base/common/uri*/,2/*vs/base/common/platform*/]), function (require, exports, uri_1, platform) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FileAccess = exports.RemoteAuthorities = exports.Schemas = void 0;
    var Schemas;
    (function (Schemas) {
        /**
         * A schema that is used for models that exist in memory
         * only and that have no correspondence on a server or such.
         */
        Schemas.inMemory = 'inmemory';
        /**
         * A schema that is used for setting files
         */
        Schemas.vscode = 'vscode';
        /**
         * A schema that is used for internal private files
         */
        Schemas.internal = 'private';
        /**
         * A walk-through document.
         */
        Schemas.walkThrough = 'walkThrough';
        /**
         * An embedded code snippet.
         */
        Schemas.walkThroughSnippet = 'walkThroughSnippet';
        Schemas.http = 'http';
        Schemas.https = 'https';
        Schemas.file = 'file';
        Schemas.mailto = 'mailto';
        Schemas.untitled = 'untitled';
        Schemas.data = 'data';
        Schemas.command = 'command';
        Schemas.vscodeRemote = 'vscode-remote';
        Schemas.vscodeRemoteResource = 'vscode-remote-resource';
        Schemas.userData = 'vscode-userdata';
        Schemas.vscodeCustomEditor = 'vscode-custom-editor';
        Schemas.vscodeNotebook = 'vscode-notebook';
        Schemas.vscodeNotebookCell = 'vscode-notebook-cell';
        Schemas.vscodeSettings = 'vscode-settings';
        Schemas.webviewPanel = 'webview-panel';
        /**
         * Scheme used for loading the wrapper html and script in webviews.
         */
        Schemas.vscodeWebview = 'vscode-webview';
        /**
         * Scheme used for loading resources inside of webviews.
         */
        Schemas.vscodeWebviewResource = 'vscode-webview-resource';
        /**
         * Scheme used for extension pages
         */
        Schemas.extension = 'extension';
    })(Schemas = exports.Schemas || (exports.Schemas = {}));
    class RemoteAuthoritiesImpl {
        constructor() {
            this._hosts = Object.create(null);
            this._ports = Object.create(null);
            this._connectionTokens = Object.create(null);
            this._preferredWebSchema = 'http';
            this._delegate = null;
        }
        setPreferredWebSchema(schema) {
            this._preferredWebSchema = schema;
        }
        setDelegate(delegate) {
            this._delegate = delegate;
        }
        set(authority, host, port) {
            this._hosts[authority] = host;
            this._ports[authority] = port;
        }
        setConnectionToken(authority, connectionToken) {
            this._connectionTokens[authority] = connectionToken;
        }
        rewrite(uri) {
            if (this._delegate) {
                return this._delegate(uri);
            }
            const authority = uri.authority;
            let host = this._hosts[authority];
            if (host && host.indexOf(':') !== -1) {
                host = `[${host}]`;
            }
            const port = this._ports[authority];
            const connectionToken = this._connectionTokens[authority];
            let query = `path=${encodeURIComponent(uri.path)}`;
            if (typeof connectionToken === 'string') {
                query += `&tkn=${encodeURIComponent(connectionToken)}`;
            }
            return uri_1.URI.from({
                scheme: platform.isWeb ? this._preferredWebSchema : Schemas.vscodeRemoteResource,
                authority: `${host}:${port}`,
                path: `/vscode-remote-resource`,
                query
            });
        }
    }
    exports.RemoteAuthorities = new RemoteAuthoritiesImpl();
    class FileAccessImpl {
        asBrowserUri(uriOrModule, moduleIdToUrl) {
            const uri = this.toUri(uriOrModule, moduleIdToUrl);
            if (uri.scheme === Schemas.vscodeRemote) {
                return exports.RemoteAuthorities.rewrite(uri);
            }
            return uri;
        }
        asFileUri(uriOrModule, moduleIdToUrl) {
            const uri = this.toUri(uriOrModule, moduleIdToUrl);
            return uri;
        }
        toUri(uriOrModule, moduleIdToUrl) {
            if (uri_1.URI.isUri(uriOrModule)) {
                return uriOrModule;
            }
            return uri_1.URI.parse(moduleIdToUrl.toUrl(uriOrModule));
        }
    }
    exports.FileAccess = new FileAccessImpl();
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[11/*vs/base/browser/dom*/], __M([0/*require*/,1/*exports*/,7/*vs/base/browser/browser*/,24/*vs/base/browser/event*/,26/*vs/base/browser/keyboardEvent*/,27/*vs/base/browser/mouseEvent*/,15/*vs/base/common/async*/,5/*vs/base/common/errors*/,3/*vs/base/common/event*/,4/*vs/base/common/lifecycle*/,2/*vs/base/common/platform*/,8/*vs/base/common/uri*/,16/*vs/base/common/network*/,25/*vs/base/browser/canIUse*/]), function (require, exports, browser, event_1, keyboardEvent_1, mouseEvent_1, async_1, errors_1, event_2, lifecycle_1, platform, uri_1, network_1, canIUse_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.detectFullscreen = exports.DetectedFullscreenMode = exports.triggerDownload = exports.asCSSUrl = exports.animate = exports.windowOpenNoOpener = exports.computeScreenAwareSize = exports.domContentLoaded = exports.finalHandler = exports.getElementsByTagName = exports.removeTabIndexAndUpdateFocus = exports.hide = exports.show = exports.join = exports.$ = exports.Namespace = exports.reset = exports.prepend = exports.append = exports.after = exports.trackFocus = exports.restoreParentsScrollTop = exports.saveParentsScrollTop = exports.EventHelper = exports.EventType = exports.isHTMLElement = exports.removeCSSRulesContainingSelector = exports.createCSSRule = exports.createMetaElement = exports.createStyleSheet = exports.getActiveElement = exports.getShadowRoot = exports.isInShadowDOM = exports.isShadowRoot = exports.hasParentWithClass = exports.findParentWithClass = exports.isAncestor = exports.getLargestChildWidth = exports.getTotalHeight = exports.getContentHeight = exports.getTotalScrollWidth = exports.getContentWidth = exports.getTotalWidth = exports.StandardWindow = exports.getDomNodePagePosition = exports.position = exports.size = exports.getTopLeftOffset = exports.Dimension = exports.getClientArea = exports.getComputedStyle = exports.addDisposableThrottledListener = exports.modify = exports.measure = exports.scheduleAtNextAnimationFrame = exports.runAtThisOrScheduleAtNextAnimationFrame = exports.addDisposableNonBubblingPointerOutListener = exports.addDisposableNonBubblingMouseOutListener = exports.addDisposableGenericMouseUpListner = exports.addDisposableGenericMouseMoveListner = exports.addDisposableGenericMouseDownListner = exports.addStandardDisposableGenericMouseUpListner = exports.addStandardDisposableGenericMouseDownListner = exports.addStandardDisposableListener = exports.addDisposableListener = exports.toggleClass = exports.removeClasses = exports.removeClass = exports.addClasses = exports.addClass = exports.hasClass = exports.isInDOM = exports.clearNode = void 0;
    function clearNode(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }
    exports.clearNode = clearNode;
    function isInDOM(node) {
        while (node) {
            if (node === document.body) {
                return true;
            }
            node = node.parentNode || node.host;
        }
        return false;
    }
    exports.isInDOM = isInDOM;
    const _classList = new class {
        hasClass(node, className) {
            return Boolean(className) && node.classList && node.classList.contains(className);
        }
        addClasses(node, ...classNames) {
            classNames.forEach(nameValue => nameValue.split(' ').forEach(name => this.addClass(node, name)));
        }
        addClass(node, className) {
            if (className && node.classList) {
                node.classList.add(className);
            }
        }
        removeClass(node, className) {
            if (className && node.classList) {
                node.classList.remove(className);
            }
        }
        removeClasses(node, ...classNames) {
            classNames.forEach(nameValue => nameValue.split(' ').forEach(name => this.removeClass(node, name)));
        }
        toggleClass(node, className, shouldHaveIt) {
            if (node.classList) {
                node.classList.toggle(className, shouldHaveIt);
            }
        }
    };
    /** @deprecated ES6 - use classList*/
    function hasClass(node, className) { return _classList.hasClass(node, className); }
    exports.hasClass = hasClass;
    /** @deprecated ES6 - use classList*/
    function addClass(node, className) { return _classList.addClass(node, className); }
    exports.addClass = addClass;
    /** @deprecated ES6 - use classList*/
    function addClasses(node, ...classNames) { return _classList.addClasses(node, ...classNames); }
    exports.addClasses = addClasses;
    /** @deprecated ES6 - use classList*/
    function removeClass(node, className) { return _classList.removeClass(node, className); }
    exports.removeClass = removeClass;
    /** @deprecated ES6 - use classList*/
    function removeClasses(node, ...classNames) { return _classList.removeClasses(node, ...classNames); }
    exports.removeClasses = removeClasses;
    /** @deprecated ES6 - use classList*/
    function toggleClass(node, className, shouldHaveIt) { return _classList.toggleClass(node, className, shouldHaveIt); }
    exports.toggleClass = toggleClass;
    class DomListener {
        constructor(node, type, handler, options) {
            this._node = node;
            this._type = type;
            this._handler = handler;
            this._options = (options || false);
            this._node.addEventListener(this._type, this._handler, this._options);
        }
        dispose() {
            if (!this._handler) {
                // Already disposed
                return;
            }
            this._node.removeEventListener(this._type, this._handler, this._options);
            // Prevent leakers from holding on to the dom or handler func
            this._node = null;
            this._handler = null;
        }
    }
    function addDisposableListener(node, type, handler, useCaptureOrOptions) {
        return new DomListener(node, type, handler, useCaptureOrOptions);
    }
    exports.addDisposableListener = addDisposableListener;
    function _wrapAsStandardMouseEvent(handler) {
        return function (e) {
            return handler(new mouseEvent_1.StandardMouseEvent(e));
        };
    }
    function _wrapAsStandardKeyboardEvent(handler) {
        return function (e) {
            return handler(new keyboardEvent_1.StandardKeyboardEvent(e));
        };
    }
    let addStandardDisposableListener = function addStandardDisposableListener(node, type, handler, useCapture) {
        let wrapHandler = handler;
        if (type === 'click' || type === 'mousedown') {
            wrapHandler = _wrapAsStandardMouseEvent(handler);
        }
        else if (type === 'keydown' || type === 'keypress' || type === 'keyup') {
            wrapHandler = _wrapAsStandardKeyboardEvent(handler);
        }
        return addDisposableListener(node, type, wrapHandler, useCapture);
    };
    exports.addStandardDisposableListener = addStandardDisposableListener;
    let addStandardDisposableGenericMouseDownListner = function addStandardDisposableListener(node, handler, useCapture) {
        let wrapHandler = _wrapAsStandardMouseEvent(handler);
        return addDisposableGenericMouseDownListner(node, wrapHandler, useCapture);
    };
    exports.addStandardDisposableGenericMouseDownListner = addStandardDisposableGenericMouseDownListner;
    let addStandardDisposableGenericMouseUpListner = function addStandardDisposableListener(node, handler, useCapture) {
        let wrapHandler = _wrapAsStandardMouseEvent(handler);
        return addDisposableGenericMouseUpListner(node, wrapHandler, useCapture);
    };
    exports.addStandardDisposableGenericMouseUpListner = addStandardDisposableGenericMouseUpListner;
    function addDisposableGenericMouseDownListner(node, handler, useCapture) {
        return addDisposableListener(node, platform.isIOS && canIUse_1.BrowserFeatures.pointerEvents ? exports.EventType.POINTER_DOWN : exports.EventType.MOUSE_DOWN, handler, useCapture);
    }
    exports.addDisposableGenericMouseDownListner = addDisposableGenericMouseDownListner;
    function addDisposableGenericMouseMoveListner(node, handler, useCapture) {
        return addDisposableListener(node, platform.isIOS && canIUse_1.BrowserFeatures.pointerEvents ? exports.EventType.POINTER_MOVE : exports.EventType.MOUSE_MOVE, handler, useCapture);
    }
    exports.addDisposableGenericMouseMoveListner = addDisposableGenericMouseMoveListner;
    function addDisposableGenericMouseUpListner(node, handler, useCapture) {
        return addDisposableListener(node, platform.isIOS && canIUse_1.BrowserFeatures.pointerEvents ? exports.EventType.POINTER_UP : exports.EventType.MOUSE_UP, handler, useCapture);
    }
    exports.addDisposableGenericMouseUpListner = addDisposableGenericMouseUpListner;
    function addDisposableNonBubblingMouseOutListener(node, handler) {
        return addDisposableListener(node, 'mouseout', (e) => {
            // Mouse out bubbles, so this is an attempt to ignore faux mouse outs coming from children elements
            let toElement = (e.relatedTarget);
            while (toElement && toElement !== node) {
                toElement = toElement.parentNode;
            }
            if (toElement === node) {
                return;
            }
            handler(e);
        });
    }
    exports.addDisposableNonBubblingMouseOutListener = addDisposableNonBubblingMouseOutListener;
    function addDisposableNonBubblingPointerOutListener(node, handler) {
        return addDisposableListener(node, 'pointerout', (e) => {
            // Mouse out bubbles, so this is an attempt to ignore faux mouse outs coming from children elements
            let toElement = (e.relatedTarget);
            while (toElement && toElement !== node) {
                toElement = toElement.parentNode;
            }
            if (toElement === node) {
                return;
            }
            handler(e);
        });
    }
    exports.addDisposableNonBubblingPointerOutListener = addDisposableNonBubblingPointerOutListener;
    let _animationFrame = null;
    function doRequestAnimationFrame(callback) {
        if (!_animationFrame) {
            const emulatedRequestAnimationFrame = (callback) => {
                return setTimeout(() => callback(new Date().getTime()), 0);
            };
            _animationFrame = (self.requestAnimationFrame
                || self.msRequestAnimationFrame
                || self.webkitRequestAnimationFrame
                || self.mozRequestAnimationFrame
                || self.oRequestAnimationFrame
                || emulatedRequestAnimationFrame);
        }
        return _animationFrame.call(self, callback);
    }
    class AnimationFrameQueueItem {
        constructor(runner, priority = 0) {
            this._runner = runner;
            this.priority = priority;
            this._canceled = false;
        }
        dispose() {
            this._canceled = true;
        }
        execute() {
            if (this._canceled) {
                return;
            }
            try {
                this._runner();
            }
            catch (e) {
                errors_1.onUnexpectedError(e);
            }
        }
        // Sort by priority (largest to lowest)
        static sort(a, b) {
            return b.priority - a.priority;
        }
    }
    (function () {
        /**
         * The runners scheduled at the next animation frame
         */
        let NEXT_QUEUE = [];
        /**
         * The runners scheduled at the current animation frame
         */
        let CURRENT_QUEUE = null;
        /**
         * A flag to keep track if the native requestAnimationFrame was already called
         */
        let animFrameRequested = false;
        /**
         * A flag to indicate if currently handling a native requestAnimationFrame callback
         */
        let inAnimationFrameRunner = false;
        let animationFrameRunner = () => {
            animFrameRequested = false;
            CURRENT_QUEUE = NEXT_QUEUE;
            NEXT_QUEUE = [];
            inAnimationFrameRunner = true;
            while (CURRENT_QUEUE.length > 0) {
                CURRENT_QUEUE.sort(AnimationFrameQueueItem.sort);
                let top = CURRENT_QUEUE.shift();
                top.execute();
            }
            inAnimationFrameRunner = false;
        };
        exports.scheduleAtNextAnimationFrame = (runner, priority = 0) => {
            let item = new AnimationFrameQueueItem(runner, priority);
            NEXT_QUEUE.push(item);
            if (!animFrameRequested) {
                animFrameRequested = true;
                doRequestAnimationFrame(animationFrameRunner);
            }
            return item;
        };
        exports.runAtThisOrScheduleAtNextAnimationFrame = (runner, priority) => {
            if (inAnimationFrameRunner) {
                let item = new AnimationFrameQueueItem(runner, priority);
                CURRENT_QUEUE.push(item);
                return item;
            }
            else {
                return exports.scheduleAtNextAnimationFrame(runner, priority);
            }
        };
    })();
    function measure(callback) {
        return exports.scheduleAtNextAnimationFrame(callback, 10000 /* must be early */);
    }
    exports.measure = measure;
    function modify(callback) {
        return exports.scheduleAtNextAnimationFrame(callback, -10000 /* must be late */);
    }
    exports.modify = modify;
    const MINIMUM_TIME_MS = 16;
    const DEFAULT_EVENT_MERGER = function (lastEvent, currentEvent) {
        return currentEvent;
    };
    class TimeoutThrottledDomListener extends lifecycle_1.Disposable {
        constructor(node, type, handler, eventMerger = DEFAULT_EVENT_MERGER, minimumTimeMs = MINIMUM_TIME_MS) {
            super();
            let lastEvent = null;
            let lastHandlerTime = 0;
            let timeout = this._register(new async_1.TimeoutTimer());
            let invokeHandler = () => {
                lastHandlerTime = (new Date()).getTime();
                handler(lastEvent);
                lastEvent = null;
            };
            this._register(addDisposableListener(node, type, (e) => {
                lastEvent = eventMerger(lastEvent, e);
                let elapsedTime = (new Date()).getTime() - lastHandlerTime;
                if (elapsedTime >= minimumTimeMs) {
                    timeout.cancel();
                    invokeHandler();
                }
                else {
                    timeout.setIfNotSet(invokeHandler, minimumTimeMs - elapsedTime);
                }
            }));
        }
    }
    function addDisposableThrottledListener(node, type, handler, eventMerger, minimumTimeMs) {
        return new TimeoutThrottledDomListener(node, type, handler, eventMerger, minimumTimeMs);
    }
    exports.addDisposableThrottledListener = addDisposableThrottledListener;
    function getComputedStyle(el) {
        return document.defaultView.getComputedStyle(el, null);
    }
    exports.getComputedStyle = getComputedStyle;
    function getClientArea(element) {
        // Try with DOM clientWidth / clientHeight
        if (element !== document.body) {
            return new Dimension(element.clientWidth, element.clientHeight);
        }
        // If visual view port exits and it's on mobile, it should be used instead of window innerWidth / innerHeight, or document.body.clientWidth / document.body.clientHeight
        if (platform.isIOS && window.visualViewport) {
            const width = window.visualViewport.width;
            const height = window.visualViewport.height - (browser.isStandalone
                // in PWA mode, the visual viewport always includes the safe-area-inset-bottom (which is for the home indicator)
                // even when you are using the onscreen monitor, the visual viewport will include the area between system statusbar and the onscreen keyboard
                // plus the area between onscreen keyboard and the bottom bezel, which is 20px on iOS.
                ? (20 + 4) // + 4px for body margin
                : 0);
            return new Dimension(width, height);
        }
        // Try innerWidth / innerHeight
        if (window.innerWidth && window.innerHeight) {
            return new Dimension(window.innerWidth, window.innerHeight);
        }
        // Try with document.body.clientWidth / document.body.clientHeight
        if (document.body && document.body.clientWidth && document.body.clientHeight) {
            return new Dimension(document.body.clientWidth, document.body.clientHeight);
        }
        // Try with document.documentElement.clientWidth / document.documentElement.clientHeight
        if (document.documentElement && document.documentElement.clientWidth && document.documentElement.clientHeight) {
            return new Dimension(document.documentElement.clientWidth, document.documentElement.clientHeight);
        }
        throw new Error('Unable to figure out browser width and height');
    }
    exports.getClientArea = getClientArea;
    class SizeUtils {
        // Adapted from WinJS
        // Converts a CSS positioning string for the specified element to pixels.
        static convertToPixels(element, value) {
            return parseFloat(value) || 0;
        }
        static getDimension(element, cssPropertyName, jsPropertyName) {
            let computedStyle = getComputedStyle(element);
            let value = '0';
            if (computedStyle) {
                if (computedStyle.getPropertyValue) {
                    value = computedStyle.getPropertyValue(cssPropertyName);
                }
                else {
                    // IE8
                    value = computedStyle.getAttribute(jsPropertyName);
                }
            }
            return SizeUtils.convertToPixels(element, value);
        }
        static getBorderLeftWidth(element) {
            return SizeUtils.getDimension(element, 'border-left-width', 'borderLeftWidth');
        }
        static getBorderRightWidth(element) {
            return SizeUtils.getDimension(element, 'border-right-width', 'borderRightWidth');
        }
        static getBorderTopWidth(element) {
            return SizeUtils.getDimension(element, 'border-top-width', 'borderTopWidth');
        }
        static getBorderBottomWidth(element) {
            return SizeUtils.getDimension(element, 'border-bottom-width', 'borderBottomWidth');
        }
        static getPaddingLeft(element) {
            return SizeUtils.getDimension(element, 'padding-left', 'paddingLeft');
        }
        static getPaddingRight(element) {
            return SizeUtils.getDimension(element, 'padding-right', 'paddingRight');
        }
        static getPaddingTop(element) {
            return SizeUtils.getDimension(element, 'padding-top', 'paddingTop');
        }
        static getPaddingBottom(element) {
            return SizeUtils.getDimension(element, 'padding-bottom', 'paddingBottom');
        }
        static getMarginLeft(element) {
            return SizeUtils.getDimension(element, 'margin-left', 'marginLeft');
        }
        static getMarginTop(element) {
            return SizeUtils.getDimension(element, 'margin-top', 'marginTop');
        }
        static getMarginRight(element) {
            return SizeUtils.getDimension(element, 'margin-right', 'marginRight');
        }
        static getMarginBottom(element) {
            return SizeUtils.getDimension(element, 'margin-bottom', 'marginBottom');
        }
    }
    class Dimension {
        constructor(width, height) {
            this.width = width;
            this.height = height;
        }
        static equals(a, b) {
            if (a === b) {
                return true;
            }
            if (!a || !b) {
                return false;
            }
            return a.width === b.width && a.height === b.height;
        }
    }
    exports.Dimension = Dimension;
    function getTopLeftOffset(element) {
        // Adapted from WinJS.Utilities.getPosition
        // and added borders to the mix
        let offsetParent = element.offsetParent;
        let top = element.offsetTop;
        let left = element.offsetLeft;
        while ((element = element.parentNode) !== null
            && element !== document.body
            && element !== document.documentElement) {
            top -= element.scrollTop;
            const c = isShadowRoot(element) ? null : getComputedStyle(element);
            if (c) {
                left -= c.direction !== 'rtl' ? element.scrollLeft : -element.scrollLeft;
            }
            if (element === offsetParent) {
                left += SizeUtils.getBorderLeftWidth(element);
                top += SizeUtils.getBorderTopWidth(element);
                top += element.offsetTop;
                left += element.offsetLeft;
                offsetParent = element.offsetParent;
            }
        }
        return {
            left: left,
            top: top
        };
    }
    exports.getTopLeftOffset = getTopLeftOffset;
    function size(element, width, height) {
        if (typeof width === 'number') {
            element.style.width = `${width}px`;
        }
        if (typeof height === 'number') {
            element.style.height = `${height}px`;
        }
    }
    exports.size = size;
    function position(element, top, right, bottom, left, position = 'absolute') {
        if (typeof top === 'number') {
            element.style.top = `${top}px`;
        }
        if (typeof right === 'number') {
            element.style.right = `${right}px`;
        }
        if (typeof bottom === 'number') {
            element.style.bottom = `${bottom}px`;
        }
        if (typeof left === 'number') {
            element.style.left = `${left}px`;
        }
        element.style.position = position;
    }
    exports.position = position;
    /**
     * Returns the position of a dom node relative to the entire page.
     */
    function getDomNodePagePosition(domNode) {
        let bb = domNode.getBoundingClientRect();
        return {
            left: bb.left + exports.StandardWindow.scrollX,
            top: bb.top + exports.StandardWindow.scrollY,
            width: bb.width,
            height: bb.height
        };
    }
    exports.getDomNodePagePosition = getDomNodePagePosition;
    exports.StandardWindow = new class {
        get scrollX() {
            if (typeof window.scrollX === 'number') {
                // modern browsers
                return window.scrollX;
            }
            else {
                return document.body.scrollLeft + document.documentElement.scrollLeft;
            }
        }
        get scrollY() {
            if (typeof window.scrollY === 'number') {
                // modern browsers
                return window.scrollY;
            }
            else {
                return document.body.scrollTop + document.documentElement.scrollTop;
            }
        }
    };
    // Adapted from WinJS
    // Gets the width of the element, including margins.
    function getTotalWidth(element) {
        let margin = SizeUtils.getMarginLeft(element) + SizeUtils.getMarginRight(element);
        return element.offsetWidth + margin;
    }
    exports.getTotalWidth = getTotalWidth;
    function getContentWidth(element) {
        let border = SizeUtils.getBorderLeftWidth(element) + SizeUtils.getBorderRightWidth(element);
        let padding = SizeUtils.getPaddingLeft(element) + SizeUtils.getPaddingRight(element);
        return element.offsetWidth - border - padding;
    }
    exports.getContentWidth = getContentWidth;
    function getTotalScrollWidth(element) {
        let margin = SizeUtils.getMarginLeft(element) + SizeUtils.getMarginRight(element);
        return element.scrollWidth + margin;
    }
    exports.getTotalScrollWidth = getTotalScrollWidth;
    // Adapted from WinJS
    // Gets the height of the content of the specified element. The content height does not include borders or padding.
    function getContentHeight(element) {
        let border = SizeUtils.getBorderTopWidth(element) + SizeUtils.getBorderBottomWidth(element);
        let padding = SizeUtils.getPaddingTop(element) + SizeUtils.getPaddingBottom(element);
        return element.offsetHeight - border - padding;
    }
    exports.getContentHeight = getContentHeight;
    // Adapted from WinJS
    // Gets the height of the element, including its margins.
    function getTotalHeight(element) {
        let margin = SizeUtils.getMarginTop(element) + SizeUtils.getMarginBottom(element);
        return element.offsetHeight + margin;
    }
    exports.getTotalHeight = getTotalHeight;
    // Gets the left coordinate of the specified element relative to the specified parent.
    function getRelativeLeft(element, parent) {
        if (element === null) {
            return 0;
        }
        let elementPosition = getTopLeftOffset(element);
        let parentPosition = getTopLeftOffset(parent);
        return elementPosition.left - parentPosition.left;
    }
    function getLargestChildWidth(parent, children) {
        let childWidths = children.map((child) => {
            return Math.max(getTotalScrollWidth(child), getTotalWidth(child)) + getRelativeLeft(child, parent) || 0;
        });
        let maxWidth = Math.max(...childWidths);
        return maxWidth;
    }
    exports.getLargestChildWidth = getLargestChildWidth;
    // ----------------------------------------------------------------------------------------
    function isAncestor(testChild, testAncestor) {
        while (testChild) {
            if (testChild === testAncestor) {
                return true;
            }
            testChild = testChild.parentNode;
        }
        return false;
    }
    exports.isAncestor = isAncestor;
    function findParentWithClass(node, clazz, stopAtClazzOrNode) {
        while (node && node.nodeType === node.ELEMENT_NODE) {
            if (node.classList.contains(clazz)) {
                return node;
            }
            if (stopAtClazzOrNode) {
                if (typeof stopAtClazzOrNode === 'string') {
                    if (node.classList.contains(stopAtClazzOrNode)) {
                        return null;
                    }
                }
                else {
                    if (node === stopAtClazzOrNode) {
                        return null;
                    }
                }
            }
            node = node.parentNode;
        }
        return null;
    }
    exports.findParentWithClass = findParentWithClass;
    function hasParentWithClass(node, clazz, stopAtClazzOrNode) {
        return !!findParentWithClass(node, clazz, stopAtClazzOrNode);
    }
    exports.hasParentWithClass = hasParentWithClass;
    function isShadowRoot(node) {
        return (node && !!node.host && !!node.mode);
    }
    exports.isShadowRoot = isShadowRoot;
    function isInShadowDOM(domNode) {
        return !!getShadowRoot(domNode);
    }
    exports.isInShadowDOM = isInShadowDOM;
    function getShadowRoot(domNode) {
        while (domNode.parentNode) {
            if (domNode === document.body) {
                // reached the body
                return null;
            }
            domNode = domNode.parentNode;
        }
        return isShadowRoot(domNode) ? domNode : null;
    }
    exports.getShadowRoot = getShadowRoot;
    function getActiveElement() {
        let result = document.activeElement;
        while (result === null || result === void 0 ? void 0 : result.shadowRoot) {
            result = result.shadowRoot.activeElement;
        }
        return result;
    }
    exports.getActiveElement = getActiveElement;
    function createStyleSheet(container = document.getElementsByTagName('head')[0]) {
        let style = document.createElement('style');
        style.type = 'text/css';
        style.media = 'screen';
        container.appendChild(style);
        return style;
    }
    exports.createStyleSheet = createStyleSheet;
    function createMetaElement(container = document.getElementsByTagName('head')[0]) {
        let meta = document.createElement('meta');
        container.appendChild(meta);
        return meta;
    }
    exports.createMetaElement = createMetaElement;
    let _sharedStyleSheet = null;
    function getSharedStyleSheet() {
        if (!_sharedStyleSheet) {
            _sharedStyleSheet = createStyleSheet();
        }
        return _sharedStyleSheet;
    }
    function getDynamicStyleSheetRules(style) {
        var _a, _b;
        if ((_a = style === null || style === void 0 ? void 0 : style.sheet) === null || _a === void 0 ? void 0 : _a.rules) {
            // Chrome, IE
            return style.sheet.rules;
        }
        if ((_b = style === null || style === void 0 ? void 0 : style.sheet) === null || _b === void 0 ? void 0 : _b.cssRules) {
            // FF
            return style.sheet.cssRules;
        }
        return [];
    }
    function createCSSRule(selector, cssText, style = getSharedStyleSheet()) {
        if (!style || !cssText) {
            return;
        }
        style.sheet.insertRule(selector + '{' + cssText + '}', 0);
    }
    exports.createCSSRule = createCSSRule;
    function removeCSSRulesContainingSelector(ruleName, style = getSharedStyleSheet()) {
        if (!style) {
            return;
        }
        let rules = getDynamicStyleSheetRules(style);
        let toDelete = [];
        for (let i = 0; i < rules.length; i++) {
            let rule = rules[i];
            if (rule.selectorText.indexOf(ruleName) !== -1) {
                toDelete.push(i);
            }
        }
        for (let i = toDelete.length - 1; i >= 0; i--) {
            style.sheet.deleteRule(toDelete[i]);
        }
    }
    exports.removeCSSRulesContainingSelector = removeCSSRulesContainingSelector;
    function isHTMLElement(o) {
        if (typeof HTMLElement === 'object') {
            return o instanceof HTMLElement;
        }
        return o && typeof o === 'object' && o.nodeType === 1 && typeof o.nodeName === 'string';
    }
    exports.isHTMLElement = isHTMLElement;
    exports.EventType = {
        // Mouse
        CLICK: 'click',
        AUXCLICK: 'auxclick',
        DBLCLICK: 'dblclick',
        MOUSE_UP: 'mouseup',
        MOUSE_DOWN: 'mousedown',
        MOUSE_OVER: 'mouseover',
        MOUSE_MOVE: 'mousemove',
        MOUSE_OUT: 'mouseout',
        MOUSE_ENTER: 'mouseenter',
        MOUSE_LEAVE: 'mouseleave',
        MOUSE_WHEEL: browser.isEdge ? 'mousewheel' : 'wheel',
        POINTER_UP: 'pointerup',
        POINTER_DOWN: 'pointerdown',
        POINTER_MOVE: 'pointermove',
        CONTEXT_MENU: 'contextmenu',
        WHEEL: 'wheel',
        // Keyboard
        KEY_DOWN: 'keydown',
        KEY_PRESS: 'keypress',
        KEY_UP: 'keyup',
        // HTML Document
        LOAD: 'load',
        BEFORE_UNLOAD: 'beforeunload',
        UNLOAD: 'unload',
        ABORT: 'abort',
        ERROR: 'error',
        RESIZE: 'resize',
        SCROLL: 'scroll',
        FULLSCREEN_CHANGE: 'fullscreenchange',
        WK_FULLSCREEN_CHANGE: 'webkitfullscreenchange',
        // Form
        SELECT: 'select',
        CHANGE: 'change',
        SUBMIT: 'submit',
        RESET: 'reset',
        FOCUS: 'focus',
        FOCUS_IN: 'focusin',
        FOCUS_OUT: 'focusout',
        BLUR: 'blur',
        INPUT: 'input',
        // Local Storage
        STORAGE: 'storage',
        // Drag
        DRAG_START: 'dragstart',
        DRAG: 'drag',
        DRAG_ENTER: 'dragenter',
        DRAG_LEAVE: 'dragleave',
        DRAG_OVER: 'dragover',
        DROP: 'drop',
        DRAG_END: 'dragend',
        // Animation
        ANIMATION_START: browser.isWebKit ? 'webkitAnimationStart' : 'animationstart',
        ANIMATION_END: browser.isWebKit ? 'webkitAnimationEnd' : 'animationend',
        ANIMATION_ITERATION: browser.isWebKit ? 'webkitAnimationIteration' : 'animationiteration'
    };
    exports.EventHelper = {
        stop: function (e, cancelBubble) {
            if (e.preventDefault) {
                e.preventDefault();
            }
            else {
                // IE8
                e.returnValue = false;
            }
            if (cancelBubble) {
                if (e.stopPropagation) {
                    e.stopPropagation();
                }
                else {
                    // IE8
                    e.cancelBubble = true;
                }
            }
        }
    };
    function saveParentsScrollTop(node) {
        let r = [];
        for (let i = 0; node && node.nodeType === node.ELEMENT_NODE; i++) {
            r[i] = node.scrollTop;
            node = node.parentNode;
        }
        return r;
    }
    exports.saveParentsScrollTop = saveParentsScrollTop;
    function restoreParentsScrollTop(node, state) {
        for (let i = 0; node && node.nodeType === node.ELEMENT_NODE; i++) {
            if (node.scrollTop !== state[i]) {
                node.scrollTop = state[i];
            }
            node = node.parentNode;
        }
    }
    exports.restoreParentsScrollTop = restoreParentsScrollTop;
    class FocusTracker extends lifecycle_1.Disposable {
        constructor(element) {
            super();
            this._onDidFocus = this._register(new event_2.Emitter());
            this.onDidFocus = this._onDidFocus.event;
            this._onDidBlur = this._register(new event_2.Emitter());
            this.onDidBlur = this._onDidBlur.event;
            let hasFocus = isAncestor(document.activeElement, element);
            let loosingFocus = false;
            const onFocus = () => {
                loosingFocus = false;
                if (!hasFocus) {
                    hasFocus = true;
                    this._onDidFocus.fire();
                }
            };
            const onBlur = () => {
                if (hasFocus) {
                    loosingFocus = true;
                    window.setTimeout(() => {
                        if (loosingFocus) {
                            loosingFocus = false;
                            hasFocus = false;
                            this._onDidBlur.fire();
                        }
                    }, 0);
                }
            };
            this._refreshStateHandler = () => {
                let currentNodeHasFocus = isAncestor(document.activeElement, element);
                if (currentNodeHasFocus !== hasFocus) {
                    if (hasFocus) {
                        onBlur();
                    }
                    else {
                        onFocus();
                    }
                }
            };
            this._register(event_1.domEvent(element, exports.EventType.FOCUS, true)(onFocus));
            this._register(event_1.domEvent(element, exports.EventType.BLUR, true)(onBlur));
        }
        refreshState() {
            this._refreshStateHandler();
        }
    }
    function trackFocus(element) {
        return new FocusTracker(element);
    }
    exports.trackFocus = trackFocus;
    function after(sibling, child) {
        sibling.after(child);
        return child;
    }
    exports.after = after;
    function append(parent, ...children) {
        children.forEach(child => parent.appendChild(child));
        return children[children.length - 1];
    }
    exports.append = append;
    function prepend(parent, child) {
        parent.insertBefore(child, parent.firstChild);
        return child;
    }
    exports.prepend = prepend;
    /**
     * Removes all children from `parent` and appends `children`
     */
    function reset(parent, ...children) {
        parent.innerText = '';
        for (const child of children) {
            if (child instanceof Node) {
                parent.appendChild(child);
            }
            else if (typeof child === 'string') {
                parent.appendChild(document.createTextNode(child));
            }
        }
    }
    exports.reset = reset;
    const SELECTOR_REGEX = /([\w\-]+)?(#([\w\-]+))?((\.([\w\-]+))*)/;
    var Namespace;
    (function (Namespace) {
        Namespace["HTML"] = "http://www.w3.org/1999/xhtml";
        Namespace["SVG"] = "http://www.w3.org/2000/svg";
    })(Namespace = exports.Namespace || (exports.Namespace = {}));
    function _$(namespace, description, attrs, ...children) {
        let match = SELECTOR_REGEX.exec(description);
        if (!match) {
            throw new Error('Bad use of emmet');
        }
        attrs = Object.assign({}, (attrs || {}));
        let tagName = match[1] || 'div';
        let result;
        if (namespace !== Namespace.HTML) {
            result = document.createElementNS(namespace, tagName);
        }
        else {
            result = document.createElement(tagName);
        }
        if (match[3]) {
            result.id = match[3];
        }
        if (match[4]) {
            result.className = match[4].replace(/\./g, ' ').trim();
        }
        Object.keys(attrs).forEach(name => {
            const value = attrs[name];
            if (typeof value === 'undefined') {
                return;
            }
            if (/^on\w+$/.test(name)) {
                result[name] = value;
            }
            else if (name === 'selected') {
                if (value) {
                    result.setAttribute(name, 'true');
                }
            }
            else {
                result.setAttribute(name, value);
            }
        });
        for (const child of children) {
            if (child instanceof Node) {
                result.appendChild(child);
            }
            else if (typeof child === 'string') {
                result.appendChild(document.createTextNode(child));
            }
        }
        return result;
    }
    function $(description, attrs, ...children) {
        return _$(Namespace.HTML, description, attrs, ...children);
    }
    exports.$ = $;
    $.SVG = function (description, attrs, ...children) {
        return _$(Namespace.SVG, description, attrs, ...children);
    };
    function join(nodes, separator) {
        const result = [];
        nodes.forEach((node, index) => {
            if (index > 0) {
                if (separator instanceof Node) {
                    result.push(separator.cloneNode());
                }
                else {
                    result.push(document.createTextNode(separator));
                }
            }
            result.push(node);
        });
        return result;
    }
    exports.join = join;
    function show(...elements) {
        for (let element of elements) {
            element.style.display = '';
            element.removeAttribute('aria-hidden');
        }
    }
    exports.show = show;
    function hide(...elements) {
        for (let element of elements) {
            element.style.display = 'none';
            element.setAttribute('aria-hidden', 'true');
        }
    }
    exports.hide = hide;
    function findParentWithAttribute(node, attribute) {
        while (node && node.nodeType === node.ELEMENT_NODE) {
            if (node instanceof HTMLElement && node.hasAttribute(attribute)) {
                return node;
            }
            node = node.parentNode;
        }
        return null;
    }
    function removeTabIndexAndUpdateFocus(node) {
        if (!node || !node.hasAttribute('tabIndex')) {
            return;
        }
        // If we are the currently focused element and tabIndex is removed,
        // standard DOM behavior is to move focus to the <body> element. We
        // typically never want that, rather put focus to the closest element
        // in the hierarchy of the parent DOM nodes.
        if (document.activeElement === node) {
            let parentFocusable = findParentWithAttribute(node.parentElement, 'tabIndex');
            if (parentFocusable) {
                parentFocusable.focus();
            }
        }
        node.removeAttribute('tabindex');
    }
    exports.removeTabIndexAndUpdateFocus = removeTabIndexAndUpdateFocus;
    function getElementsByTagName(tag) {
        return Array.prototype.slice.call(document.getElementsByTagName(tag), 0);
    }
    exports.getElementsByTagName = getElementsByTagName;
    function finalHandler(fn) {
        return e => {
            e.preventDefault();
            e.stopPropagation();
            fn(e);
        };
    }
    exports.finalHandler = finalHandler;
    function domContentLoaded() {
        return new Promise(resolve => {
            const readyState = document.readyState;
            if (readyState === 'complete' || (document && document.body !== null)) {
                platform.setImmediate(resolve);
            }
            else {
                window.addEventListener('DOMContentLoaded', resolve, false);
            }
        });
    }
    exports.domContentLoaded = domContentLoaded;
    /**
     * Find a value usable for a dom node size such that the likelihood that it would be
     * displayed with constant screen pixels size is as high as possible.
     *
     * e.g. We would desire for the cursors to be 2px (CSS px) wide. Under a devicePixelRatio
     * of 1.25, the cursor will be 2.5 screen pixels wide. Depending on how the dom node aligns/"snaps"
     * with the screen pixels, it will sometimes be rendered with 2 screen pixels, and sometimes with 3 screen pixels.
     */
    function computeScreenAwareSize(cssPx) {
        const screenPx = window.devicePixelRatio * cssPx;
        return Math.max(1, Math.floor(screenPx)) / window.devicePixelRatio;
    }
    exports.computeScreenAwareSize = computeScreenAwareSize;
    /**
     * See https://github.com/microsoft/monaco-editor/issues/601
     * To protect against malicious code in the linked site, particularly phishing attempts,
     * the window.opener should be set to null to prevent the linked site from having access
     * to change the location of the current page.
     * See https://mathiasbynens.github.io/rel-noopener/
     */
    function windowOpenNoOpener(url) {
        if (platform.isNative || browser.isEdgeWebView) {
            // In VSCode, window.open() always returns null...
            // The same is true for a WebView (see https://github.com/microsoft/monaco-editor/issues/628)
            window.open(url);
        }
        else {
            let newTab = window.open();
            if (newTab) {
                newTab.opener = null;
                newTab.location.href = url;
            }
        }
    }
    exports.windowOpenNoOpener = windowOpenNoOpener;
    function animate(fn) {
        const step = () => {
            fn();
            stepDisposable = exports.scheduleAtNextAnimationFrame(step);
        };
        let stepDisposable = exports.scheduleAtNextAnimationFrame(step);
        return lifecycle_1.toDisposable(() => stepDisposable.dispose());
    }
    exports.animate = animate;
    network_1.RemoteAuthorities.setPreferredWebSchema(/^https:/.test(window.location.href) ? 'https' : 'http');
    /**
     * returns url('...')
     */
    function asCSSUrl(uri) {
        if (!uri) {
            return `url('')`;
        }
        return `url('${network_1.FileAccess.asBrowserUri(uri).toString(true).replace(/'/g, '%27')}')`;
    }
    exports.asCSSUrl = asCSSUrl;
    function triggerDownload(dataOrUri, name) {
        // If the data is provided as Buffer, we create a
        // blog URL out of it to produce a valid link
        let url;
        if (uri_1.URI.isUri(dataOrUri)) {
            url = dataOrUri.toString(true);
        }
        else {
            const blob = new Blob([dataOrUri]);
            url = URL.createObjectURL(blob);
            // Ensure to free the data from DOM eventually
            setTimeout(() => URL.revokeObjectURL(url));
        }
        // In order to download from the browser, the only way seems
        // to be creating a <a> element with download attribute that
        // points to the file to download.
        // See also https://developers.google.com/web/updates/2011/08/Downloading-resources-in-HTML5-a-download
        const anchor = document.createElement('a');
        document.body.appendChild(anchor);
        anchor.download = name;
        anchor.href = url;
        anchor.click();
        // Ensure to remove the element from DOM eventually
        setTimeout(() => document.body.removeChild(anchor));
    }
    exports.triggerDownload = triggerDownload;
    var DetectedFullscreenMode;
    (function (DetectedFullscreenMode) {
        /**
         * The document is fullscreen, e.g. because an element
         * in the document requested to be fullscreen.
         */
        DetectedFullscreenMode[DetectedFullscreenMode["DOCUMENT"] = 1] = "DOCUMENT";
        /**
         * The browser is fullsreen, e.g. because the user enabled
         * native window fullscreen for it.
         */
        DetectedFullscreenMode[DetectedFullscreenMode["BROWSER"] = 2] = "BROWSER";
    })(DetectedFullscreenMode = exports.DetectedFullscreenMode || (exports.DetectedFullscreenMode = {}));
    function detectFullscreen() {
        // Browser fullscreen: use DOM APIs to detect
        if (document.fullscreenElement || document.webkitFullscreenElement || document.webkitIsFullScreen) {
            return { mode: DetectedFullscreenMode.DOCUMENT, guess: false };
        }
        // There is no standard way to figure out if the browser
        // is using native fullscreen. Via checking on screen
        // height and comparing that to window height, we can guess
        // it though.
        if (window.innerHeight === screen.height) {
            // if the height of the window matches the screen height, we can
            // safely assume that the browser is fullscreen because no browser
            // chrome is taking height away (e.g. like toolbars).
            return { mode: DetectedFullscreenMode.BROWSER, guess: false };
        }
        if (platform.isMacintosh || platform.isLinux) {
            // macOS and Linux do not properly report `innerHeight`, only Windows does
            if (window.outerHeight === screen.height && window.outerWidth === screen.width) {
                // if the height of the browser matches the screen height, we can
                // only guess that we are in fullscreen. It is also possible that
                // the user has turned off taskbars in the OS and the browser is
                // simply able to span the entire size of the screen.
                return { mode: DetectedFullscreenMode.BROWSER, guess: true };
            }
        }
        // Not in fullscreen
        return null;
    }
    exports.detectFullscreen = detectFullscreen;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[33/*vs/base/browser/codicons*/], __M([0/*require*/,1/*exports*/,11/*vs/base/browser/dom*/]), function (require, exports, dom) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.renderCodicons = void 0;
    const renderCodiconsRegex = /(\\)?\$\((([a-z0-9\-]+?)(?:~([a-z0-9\-]*?))?)\)/gi;
    function renderCodicons(text) {
        const elements = new Array();
        let match;
        let textStart = 0, textStop = 0;
        while ((match = renderCodiconsRegex.exec(text)) !== null) {
            textStop = match.index || 0;
            elements.push(text.substring(textStart, textStop));
            textStart = (match.index || 0) + match[0].length;
            const [, escaped, codicon, name, animation] = match;
            elements.push(escaped ? `$(${codicon})` : dom.$(`span.codicon.codicon-${name}${animation ? `.codicon-animation-${animation}` : ''}`));
        }
        if (textStart < text.length) {
            elements.push(text.substring(textStart));
        }
        return elements;
    }
    exports.renderCodicons = renderCodicons;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[34/*vs/base/browser/ui/codicons/codiconLabel*/], __M([0/*require*/,1/*exports*/,11/*vs/base/browser/dom*/,33/*vs/base/browser/codicons*/]), function (require, exports, dom_1, codicons_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CodiconLabel = void 0;
    class CodiconLabel {
        constructor(_container) {
            this._container = _container;
        }
        set text(text) {
            dom_1.reset(this._container, ...codicons_1.renderCodicons(text !== null && text !== void 0 ? text : ''));
        }
        set title(title) {
            this._container.title = title;
        }
    }
    exports.CodiconLabel = CodiconLabel;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[35/*vs/base/common/map*/], __M([0/*require*/,1/*exports*/,8/*vs/base/common/uri*/,6/*vs/base/common/strings*/,16/*vs/base/common/network*/,2/*vs/base/common/platform*/]), function (require, exports, uri_1, strings_1, network_1, platform_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LRUCache = exports.LinkedMap = exports.Touch = exports.ResourceMap = exports.TernarySearchTree = exports.UriIterator = exports.PathIterator = exports.StringIterator = exports.setToString = exports.mapToString = exports.getOrSet = void 0;
    function getOrSet(map, key, value) {
        let result = map.get(key);
        if (result === undefined) {
            result = value;
            map.set(key, result);
        }
        return result;
    }
    exports.getOrSet = getOrSet;
    function mapToString(map) {
        const entries = [];
        map.forEach((value, key) => {
            entries.push(`${key} => ${value}`);
        });
        return `Map(${map.size}) {${entries.join(', ')}}`;
    }
    exports.mapToString = mapToString;
    function setToString(set) {
        const entries = [];
        set.forEach(value => {
            entries.push(value);
        });
        return `Set(${set.size}) {${entries.join(', ')}}`;
    }
    exports.setToString = setToString;
    class StringIterator {
        constructor() {
            this._value = '';
            this._pos = 0;
        }
        reset(key) {
            this._value = key;
            this._pos = 0;
            return this;
        }
        next() {
            this._pos += 1;
            return this;
        }
        hasNext() {
            return this._pos < this._value.length - 1;
        }
        cmp(a) {
            const aCode = a.charCodeAt(0);
            const thisCode = this._value.charCodeAt(this._pos);
            return aCode - thisCode;
        }
        value() {
            return this._value[this._pos];
        }
    }
    exports.StringIterator = StringIterator;
    class PathIterator {
        constructor(_splitOnBackslash = true, _caseSensitive = true) {
            this._splitOnBackslash = _splitOnBackslash;
            this._caseSensitive = _caseSensitive;
        }
        reset(key) {
            this._value = key.replace(/\\$|\/$/, '');
            this._from = 0;
            this._to = 0;
            return this.next();
        }
        hasNext() {
            return this._to < this._value.length;
        }
        next() {
            // this._data = key.split(/[\\/]/).filter(s => !!s);
            this._from = this._to;
            let justSeps = true;
            for (; this._to < this._value.length; this._to++) {
                const ch = this._value.charCodeAt(this._to);
                if (ch === 47 /* Slash */ || this._splitOnBackslash && ch === 92 /* Backslash */) {
                    if (justSeps) {
                        this._from++;
                    }
                    else {
                        break;
                    }
                }
                else {
                    justSeps = false;
                }
            }
            return this;
        }
        cmp(a) {
            return this._caseSensitive
                ? strings_1.compareSubstring(a, this._value, 0, a.length, this._from, this._to)
                : strings_1.compareSubstringIgnoreCase(a, this._value, 0, a.length, this._from, this._to);
        }
        value() {
            return this._value.substring(this._from, this._to);
        }
    }
    exports.PathIterator = PathIterator;
    var UriIteratorState;
    (function (UriIteratorState) {
        UriIteratorState[UriIteratorState["Scheme"] = 1] = "Scheme";
        UriIteratorState[UriIteratorState["Authority"] = 2] = "Authority";
        UriIteratorState[UriIteratorState["Path"] = 3] = "Path";
        UriIteratorState[UriIteratorState["Query"] = 4] = "Query";
        UriIteratorState[UriIteratorState["Fragment"] = 5] = "Fragment";
    })(UriIteratorState || (UriIteratorState = {}));
    class UriIterator {
        constructor() {
            this._states = [];
            this._stateIdx = 0;
        }
        reset(key) {
            this._value = key;
            this._states = [];
            if (this._value.scheme) {
                this._states.push(1 /* Scheme */);
            }
            if (this._value.authority) {
                this._states.push(2 /* Authority */);
            }
            if (this._value.path) {
                //todo@jrieken #107886 the case-sensitive logic is copied form `resources.ts#hasToIgnoreCase`
                // which cannot be used because it depends on this
                const caseSensitive = key.scheme === network_1.Schemas.file && platform_1.isLinux;
                this._pathIterator = new PathIterator(false, caseSensitive);
                this._pathIterator.reset(key.path);
                if (this._pathIterator.value()) {
                    this._states.push(3 /* Path */);
                }
            }
            if (this._value.query) {
                this._states.push(4 /* Query */);
            }
            if (this._value.fragment) {
                this._states.push(5 /* Fragment */);
            }
            this._stateIdx = 0;
            return this;
        }
        next() {
            if (this._states[this._stateIdx] === 3 /* Path */ && this._pathIterator.hasNext()) {
                this._pathIterator.next();
            }
            else {
                this._stateIdx += 1;
            }
            return this;
        }
        hasNext() {
            return (this._states[this._stateIdx] === 3 /* Path */ && this._pathIterator.hasNext())
                || this._stateIdx < this._states.length - 1;
        }
        cmp(a) {
            if (this._states[this._stateIdx] === 1 /* Scheme */) {
                return strings_1.compare(a, this._value.scheme);
            }
            else if (this._states[this._stateIdx] === 2 /* Authority */) {
                return strings_1.compareSubstringIgnoreCase(a, this._value.authority);
            }
            else if (this._states[this._stateIdx] === 3 /* Path */) {
                return this._pathIterator.cmp(a);
            }
            else if (this._states[this._stateIdx] === 4 /* Query */) {
                return strings_1.compare(a, this._value.query);
            }
            else if (this._states[this._stateIdx] === 5 /* Fragment */) {
                return strings_1.compare(a, this._value.fragment);
            }
            throw new Error();
        }
        value() {
            if (this._states[this._stateIdx] === 1 /* Scheme */) {
                return this._value.scheme;
            }
            else if (this._states[this._stateIdx] === 2 /* Authority */) {
                return this._value.authority;
            }
            else if (this._states[this._stateIdx] === 3 /* Path */) {
                return this._pathIterator.value();
            }
            else if (this._states[this._stateIdx] === 4 /* Query */) {
                return this._value.query;
            }
            else if (this._states[this._stateIdx] === 5 /* Fragment */) {
                return this._value.fragment;
            }
            throw new Error();
        }
    }
    exports.UriIterator = UriIterator;
    class TernarySearchTreeNode {
        isEmpty() {
            return !this.left && !this.mid && !this.right && !this.value;
        }
    }
    class TernarySearchTree {
        constructor(segments) {
            this._iter = segments;
        }
        static forUris() {
            return new TernarySearchTree(new UriIterator());
        }
        static forPaths() {
            return new TernarySearchTree(new PathIterator());
        }
        static forStrings() {
            return new TernarySearchTree(new StringIterator());
        }
        clear() {
            this._root = undefined;
        }
        set(key, element) {
            const iter = this._iter.reset(key);
            let node;
            if (!this._root) {
                this._root = new TernarySearchTreeNode();
                this._root.segment = iter.value();
            }
            node = this._root;
            while (true) {
                const val = iter.cmp(node.segment);
                if (val > 0) {
                    // left
                    if (!node.left) {
                        node.left = new TernarySearchTreeNode();
                        node.left.segment = iter.value();
                    }
                    node = node.left;
                }
                else if (val < 0) {
                    // right
                    if (!node.right) {
                        node.right = new TernarySearchTreeNode();
                        node.right.segment = iter.value();
                    }
                    node = node.right;
                }
                else if (iter.hasNext()) {
                    // mid
                    iter.next();
                    if (!node.mid) {
                        node.mid = new TernarySearchTreeNode();
                        node.mid.segment = iter.value();
                    }
                    node = node.mid;
                }
                else {
                    break;
                }
            }
            const oldElement = node.value;
            node.value = element;
            node.key = key;
            return oldElement;
        }
        get(key) {
            const iter = this._iter.reset(key);
            let node = this._root;
            while (node) {
                const val = iter.cmp(node.segment);
                if (val > 0) {
                    // left
                    node = node.left;
                }
                else if (val < 0) {
                    // right
                    node = node.right;
                }
                else if (iter.hasNext()) {
                    // mid
                    iter.next();
                    node = node.mid;
                }
                else {
                    break;
                }
            }
            return node ? node.value : undefined;
        }
        delete(key) {
            const iter = this._iter.reset(key);
            const stack = [];
            let node = this._root;
            // find and unset node
            while (node) {
                const val = iter.cmp(node.segment);
                if (val > 0) {
                    // left
                    stack.push([1, node]);
                    node = node.left;
                }
                else if (val < 0) {
                    // right
                    stack.push([-1, node]);
                    node = node.right;
                }
                else if (iter.hasNext()) {
                    // mid
                    iter.next();
                    stack.push([0, node]);
                    node = node.mid;
                }
                else {
                    // remove element
                    node.value = undefined;
                    // clean up empty nodes
                    while (stack.length > 0 && node.isEmpty()) {
                        let [dir, parent] = stack.pop();
                        switch (dir) {
                            case 1:
                                parent.left = undefined;
                                break;
                            case 0:
                                parent.mid = undefined;
                                break;
                            case -1:
                                parent.right = undefined;
                                break;
                        }
                        node = parent;
                    }
                    break;
                }
            }
        }
        findSubstr(key) {
            const iter = this._iter.reset(key);
            let node = this._root;
            let candidate = undefined;
            while (node) {
                const val = iter.cmp(node.segment);
                if (val > 0) {
                    // left
                    node = node.left;
                }
                else if (val < 0) {
                    // right
                    node = node.right;
                }
                else if (iter.hasNext()) {
                    // mid
                    iter.next();
                    candidate = node.value || candidate;
                    node = node.mid;
                }
                else {
                    break;
                }
            }
            return node && node.value || candidate;
        }
        findSuperstr(key) {
            const iter = this._iter.reset(key);
            let node = this._root;
            while (node) {
                const val = iter.cmp(node.segment);
                if (val > 0) {
                    // left
                    node = node.left;
                }
                else if (val < 0) {
                    // right
                    node = node.right;
                }
                else if (iter.hasNext()) {
                    // mid
                    iter.next();
                    node = node.mid;
                }
                else {
                    // collect
                    if (!node.mid) {
                        return undefined;
                    }
                    else {
                        return this._nodeIterator(node.mid);
                    }
                }
            }
            return undefined;
        }
        _nodeIterator(node) {
            let res;
            let idx;
            let data;
            const next = () => {
                if (!data) {
                    // lazy till first invocation
                    data = [];
                    idx = 0;
                    this._forEach(node, value => data.push(value));
                }
                if (idx >= data.length) {
                    return { done: true, value: undefined };
                }
                if (!res) {
                    res = { done: false, value: data[idx++] };
                }
                else {
                    res.value = data[idx++];
                }
                return res;
            };
            return { next };
        }
        forEach(callback) {
            this._forEach(this._root, callback);
        }
        _forEach(node, callback) {
            if (node) {
                // left
                this._forEach(node.left, callback);
                // node
                if (node.value) {
                    // callback(node.value, this._iter.join(parts));
                    callback(node.value, node.key);
                }
                // mid
                this._forEach(node.mid, callback);
                // right
                this._forEach(node.right, callback);
            }
        }
    }
    exports.TernarySearchTree = TernarySearchTree;
    class ResourceMap {
        constructor(mapOrKeyFn, toKey) {
            this[Symbol.toStringTag] = 'ResourceMap';
            if (mapOrKeyFn instanceof ResourceMap) {
                this.map = new Map(mapOrKeyFn.map);
                this.toKey = toKey !== null && toKey !== void 0 ? toKey : ResourceMap.defaultToKey;
            }
            else {
                this.map = new Map();
                this.toKey = mapOrKeyFn !== null && mapOrKeyFn !== void 0 ? mapOrKeyFn : ResourceMap.defaultToKey;
            }
        }
        set(resource, value) {
            this.map.set(this.toKey(resource), value);
            return this;
        }
        get(resource) {
            return this.map.get(this.toKey(resource));
        }
        has(resource) {
            return this.map.has(this.toKey(resource));
        }
        get size() {
            return this.map.size;
        }
        clear() {
            this.map.clear();
        }
        delete(resource) {
            return this.map.delete(this.toKey(resource));
        }
        forEach(clb, thisArg) {
            if (typeof thisArg !== 'undefined') {
                clb = clb.bind(thisArg);
            }
            for (let [index, value] of this.map) {
                clb(value, uri_1.URI.parse(index), this);
            }
        }
        values() {
            return this.map.values();
        }
        *keys() {
            for (let key of this.map.keys()) {
                yield uri_1.URI.parse(key);
            }
        }
        *entries() {
            for (let tuple of this.map.entries()) {
                yield [uri_1.URI.parse(tuple[0]), tuple[1]];
            }
        }
        *[Symbol.iterator]() {
            for (let item of this.map) {
                yield [uri_1.URI.parse(item[0]), item[1]];
            }
        }
    }
    exports.ResourceMap = ResourceMap;
    ResourceMap.defaultToKey = (resource) => resource.toString();
    var Touch;
    (function (Touch) {
        Touch[Touch["None"] = 0] = "None";
        Touch[Touch["AsOld"] = 1] = "AsOld";
        Touch[Touch["AsNew"] = 2] = "AsNew";
    })(Touch = exports.Touch || (exports.Touch = {}));
    class LinkedMap {
        constructor() {
            this[Symbol.toStringTag] = 'LinkedMap';
            this._map = new Map();
            this._head = undefined;
            this._tail = undefined;
            this._size = 0;
            this._state = 0;
        }
        clear() {
            this._map.clear();
            this._head = undefined;
            this._tail = undefined;
            this._size = 0;
            this._state++;
        }
        isEmpty() {
            return !this._head && !this._tail;
        }
        get size() {
            return this._size;
        }
        get first() {
            var _a;
            return (_a = this._head) === null || _a === void 0 ? void 0 : _a.value;
        }
        get last() {
            var _a;
            return (_a = this._tail) === null || _a === void 0 ? void 0 : _a.value;
        }
        has(key) {
            return this._map.has(key);
        }
        get(key, touch = 0 /* None */) {
            const item = this._map.get(key);
            if (!item) {
                return undefined;
            }
            if (touch !== 0 /* None */) {
                this.touch(item, touch);
            }
            return item.value;
        }
        set(key, value, touch = 0 /* None */) {
            let item = this._map.get(key);
            if (item) {
                item.value = value;
                if (touch !== 0 /* None */) {
                    this.touch(item, touch);
                }
            }
            else {
                item = { key, value, next: undefined, previous: undefined };
                switch (touch) {
                    case 0 /* None */:
                        this.addItemLast(item);
                        break;
                    case 1 /* AsOld */:
                        this.addItemFirst(item);
                        break;
                    case 2 /* AsNew */:
                        this.addItemLast(item);
                        break;
                    default:
                        this.addItemLast(item);
                        break;
                }
                this._map.set(key, item);
                this._size++;
            }
            return this;
        }
        delete(key) {
            return !!this.remove(key);
        }
        remove(key) {
            const item = this._map.get(key);
            if (!item) {
                return undefined;
            }
            this._map.delete(key);
            this.removeItem(item);
            this._size--;
            return item.value;
        }
        shift() {
            if (!this._head && !this._tail) {
                return undefined;
            }
            if (!this._head || !this._tail) {
                throw new Error('Invalid list');
            }
            const item = this._head;
            this._map.delete(item.key);
            this.removeItem(item);
            this._size--;
            return item.value;
        }
        forEach(callbackfn, thisArg) {
            const state = this._state;
            let current = this._head;
            while (current) {
                if (thisArg) {
                    callbackfn.bind(thisArg)(current.value, current.key, this);
                }
                else {
                    callbackfn(current.value, current.key, this);
                }
                if (this._state !== state) {
                    throw new Error(`LinkedMap got modified during iteration.`);
                }
                current = current.next;
            }
        }
        keys() {
            const map = this;
            const state = this._state;
            let current = this._head;
            const iterator = {
                [Symbol.iterator]() {
                    return iterator;
                },
                next() {
                    if (map._state !== state) {
                        throw new Error(`LinkedMap got modified during iteration.`);
                    }
                    if (current) {
                        const result = { value: current.key, done: false };
                        current = current.next;
                        return result;
                    }
                    else {
                        return { value: undefined, done: true };
                    }
                }
            };
            return iterator;
        }
        values() {
            const map = this;
            const state = this._state;
            let current = this._head;
            const iterator = {
                [Symbol.iterator]() {
                    return iterator;
                },
                next() {
                    if (map._state !== state) {
                        throw new Error(`LinkedMap got modified during iteration.`);
                    }
                    if (current) {
                        const result = { value: current.value, done: false };
                        current = current.next;
                        return result;
                    }
                    else {
                        return { value: undefined, done: true };
                    }
                }
            };
            return iterator;
        }
        entries() {
            const map = this;
            const state = this._state;
            let current = this._head;
            const iterator = {
                [Symbol.iterator]() {
                    return iterator;
                },
                next() {
                    if (map._state !== state) {
                        throw new Error(`LinkedMap got modified during iteration.`);
                    }
                    if (current) {
                        const result = { value: [current.key, current.value], done: false };
                        current = current.next;
                        return result;
                    }
                    else {
                        return { value: undefined, done: true };
                    }
                }
            };
            return iterator;
        }
        [Symbol.iterator]() {
            return this.entries();
        }
        trimOld(newSize) {
            if (newSize >= this.size) {
                return;
            }
            if (newSize === 0) {
                this.clear();
                return;
            }
            let current = this._head;
            let currentSize = this.size;
            while (current && currentSize > newSize) {
                this._map.delete(current.key);
                current = current.next;
                currentSize--;
            }
            this._head = current;
            this._size = currentSize;
            if (current) {
                current.previous = undefined;
            }
            this._state++;
        }
        addItemFirst(item) {
            // First time Insert
            if (!this._head && !this._tail) {
                this._tail = item;
            }
            else if (!this._head) {
                throw new Error('Invalid list');
            }
            else {
                item.next = this._head;
                this._head.previous = item;
            }
            this._head = item;
            this._state++;
        }
        addItemLast(item) {
            // First time Insert
            if (!this._head && !this._tail) {
                this._head = item;
            }
            else if (!this._tail) {
                throw new Error('Invalid list');
            }
            else {
                item.previous = this._tail;
                this._tail.next = item;
            }
            this._tail = item;
            this._state++;
        }
        removeItem(item) {
            if (item === this._head && item === this._tail) {
                this._head = undefined;
                this._tail = undefined;
            }
            else if (item === this._head) {
                // This can only happend if size === 1 which is handle
                // by the case above.
                if (!item.next) {
                    throw new Error('Invalid list');
                }
                item.next.previous = undefined;
                this._head = item.next;
            }
            else if (item === this._tail) {
                // This can only happend if size === 1 which is handle
                // by the case above.
                if (!item.previous) {
                    throw new Error('Invalid list');
                }
                item.previous.next = undefined;
                this._tail = item.previous;
            }
            else {
                const next = item.next;
                const previous = item.previous;
                if (!next || !previous) {
                    throw new Error('Invalid list');
                }
                next.previous = previous;
                previous.next = next;
            }
            item.next = undefined;
            item.previous = undefined;
            this._state++;
        }
        touch(item, touch) {
            if (!this._head || !this._tail) {
                throw new Error('Invalid list');
            }
            if ((touch !== 1 /* AsOld */ && touch !== 2 /* AsNew */)) {
                return;
            }
            if (touch === 1 /* AsOld */) {
                if (item === this._head) {
                    return;
                }
                const next = item.next;
                const previous = item.previous;
                // Unlink the item
                if (item === this._tail) {
                    // previous must be defined since item was not head but is tail
                    // So there are more than on item in the map
                    previous.next = undefined;
                    this._tail = previous;
                }
                else {
                    // Both next and previous are not undefined since item was neither head nor tail.
                    next.previous = previous;
                    previous.next = next;
                }
                // Insert the node at head
                item.previous = undefined;
                item.next = this._head;
                this._head.previous = item;
                this._head = item;
                this._state++;
            }
            else if (touch === 2 /* AsNew */) {
                if (item === this._tail) {
                    return;
                }
                const next = item.next;
                const previous = item.previous;
                // Unlink the item.
                if (item === this._head) {
                    // next must be defined since item was not tail but is head
                    // So there are more than on item in the map
                    next.previous = undefined;
                    this._head = next;
                }
                else {
                    // Both next and previous are not undefined since item was neither head nor tail.
                    next.previous = previous;
                    previous.next = next;
                }
                item.next = undefined;
                item.previous = this._tail;
                this._tail.next = item;
                this._tail = item;
                this._state++;
            }
        }
        toJSON() {
            const data = [];
            this.forEach((value, key) => {
                data.push([key, value]);
            });
            return data;
        }
        fromJSON(data) {
            this.clear();
            for (const [key, value] of data) {
                this.set(key, value);
            }
        }
    }
    exports.LinkedMap = LinkedMap;
    class LRUCache extends LinkedMap {
        constructor(limit, ratio = 1) {
            super();
            this._limit = limit;
            this._ratio = Math.min(Math.max(0, ratio), 1);
        }
        get limit() {
            return this._limit;
        }
        set limit(limit) {
            this._limit = limit;
            this.checkTrim();
        }
        get ratio() {
            return this._ratio;
        }
        set ratio(ratio) {
            this._ratio = Math.min(Math.max(0, ratio), 1);
            this.checkTrim();
        }
        get(key, touch = 2 /* AsNew */) {
            return super.get(key, touch);
        }
        peek(key) {
            return super.get(key, 0 /* None */);
        }
        set(key, value) {
            super.set(key, value, 2 /* AsNew */);
            this.checkTrim();
            return this;
        }
        checkTrim() {
            if (this.size > this._limit) {
                this.trimOld(Math.round(this._limit * this._ratio));
            }
        }
    }
    exports.LRUCache = LRUCache;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[36/*vs/base/common/filters*/], __M([0/*require*/,1/*exports*/,35/*vs/base/common/map*/,6/*vs/base/common/strings*/]), function (require, exports, map_1, strings) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fuzzyScoreGraceful = exports.fuzzyScoreGracefulAggressive = exports.fuzzyScore = exports.FuzzyScore = exports.isPatternInWord = exports.createMatches = exports.anyScore = exports.matchesFuzzy2 = exports.matchesFuzzy = exports.matchesWords = exports.matchesCamelCase = exports.isUpper = exports.matchesSubString = exports.matchesContiguousSubString = exports.matchesPrefix = exports.matchesStrictPrefix = exports.or = void 0;
    // Combined filters
    /**
     * @returns A filter which combines the provided set
     * of filters with an or. The *first* filters that
     * matches defined the return value of the returned
     * filter.
     */
    function or(...filter) {
        return function (word, wordToMatchAgainst) {
            for (let i = 0, len = filter.length; i < len; i++) {
                const match = filter[i](word, wordToMatchAgainst);
                if (match) {
                    return match;
                }
            }
            return null;
        };
    }
    exports.or = or;
    // Prefix
    exports.matchesStrictPrefix = _matchesPrefix.bind(undefined, false);
    exports.matchesPrefix = _matchesPrefix.bind(undefined, true);
    function _matchesPrefix(ignoreCase, word, wordToMatchAgainst) {
        if (!wordToMatchAgainst || wordToMatchAgainst.length < word.length) {
            return null;
        }
        let matches;
        if (ignoreCase) {
            matches = strings.startsWithIgnoreCase(wordToMatchAgainst, word);
        }
        else {
            matches = wordToMatchAgainst.indexOf(word) === 0;
        }
        if (!matches) {
            return null;
        }
        return word.length > 0 ? [{ start: 0, end: word.length }] : [];
    }
    // Contiguous Substring
    function matchesContiguousSubString(word, wordToMatchAgainst) {
        const index = wordToMatchAgainst.toLowerCase().indexOf(word.toLowerCase());
        if (index === -1) {
            return null;
        }
        return [{ start: index, end: index + word.length }];
    }
    exports.matchesContiguousSubString = matchesContiguousSubString;
    // Substring
    function matchesSubString(word, wordToMatchAgainst) {
        return _matchesSubString(word.toLowerCase(), wordToMatchAgainst.toLowerCase(), 0, 0);
    }
    exports.matchesSubString = matchesSubString;
    function _matchesSubString(word, wordToMatchAgainst, i, j) {
        if (i === word.length) {
            return [];
        }
        else if (j === wordToMatchAgainst.length) {
            return null;
        }
        else {
            if (word[i] === wordToMatchAgainst[j]) {
                let result = null;
                if (result = _matchesSubString(word, wordToMatchAgainst, i + 1, j + 1)) {
                    return join({ start: j, end: j + 1 }, result);
                }
                return null;
            }
            return _matchesSubString(word, wordToMatchAgainst, i, j + 1);
        }
    }
    // CamelCase
    function isLower(code) {
        return 97 /* a */ <= code && code <= 122 /* z */;
    }
    function isUpper(code) {
        return 65 /* A */ <= code && code <= 90 /* Z */;
    }
    exports.isUpper = isUpper;
    function isNumber(code) {
        return 48 /* Digit0 */ <= code && code <= 57 /* Digit9 */;
    }
    function isWhitespace(code) {
        return (code === 32 /* Space */
            || code === 9 /* Tab */
            || code === 10 /* LineFeed */
            || code === 13 /* CarriageReturn */);
    }
    const wordSeparators = new Set();
    '`~!@#$%^&*()-=+[{]}\\|;:\'",.<>/?'
        .split('')
        .forEach(s => wordSeparators.add(s.charCodeAt(0)));
    function isWordSeparator(code) {
        return isWhitespace(code) || wordSeparators.has(code);
    }
    function charactersMatch(codeA, codeB) {
        return (codeA === codeB) || (isWordSeparator(codeA) && isWordSeparator(codeB));
    }
    function isAlphanumeric(code) {
        return isLower(code) || isUpper(code) || isNumber(code);
    }
    function join(head, tail) {
        if (tail.length === 0) {
            tail = [head];
        }
        else if (head.end === tail[0].start) {
            tail[0].start = head.start;
        }
        else {
            tail.unshift(head);
        }
        return tail;
    }
    function nextAnchor(camelCaseWord, start) {
        for (let i = start; i < camelCaseWord.length; i++) {
            const c = camelCaseWord.charCodeAt(i);
            if (isUpper(c) || isNumber(c) || (i > 0 && !isAlphanumeric(camelCaseWord.charCodeAt(i - 1)))) {
                return i;
            }
        }
        return camelCaseWord.length;
    }
    function _matchesCamelCase(word, camelCaseWord, i, j) {
        if (i === word.length) {
            return [];
        }
        else if (j === camelCaseWord.length) {
            return null;
        }
        else if (word[i] !== camelCaseWord[j].toLowerCase()) {
            return null;
        }
        else {
            let result = null;
            let nextUpperIndex = j + 1;
            result = _matchesCamelCase(word, camelCaseWord, i + 1, j + 1);
            while (!result && (nextUpperIndex = nextAnchor(camelCaseWord, nextUpperIndex)) < camelCaseWord.length) {
                result = _matchesCamelCase(word, camelCaseWord, i + 1, nextUpperIndex);
                nextUpperIndex++;
            }
            return result === null ? null : join({ start: j, end: j + 1 }, result);
        }
    }
    // Heuristic to avoid computing camel case matcher for words that don't
    // look like camelCaseWords.
    function analyzeCamelCaseWord(word) {
        let upper = 0, lower = 0, alpha = 0, numeric = 0, code = 0;
        for (let i = 0; i < word.length; i++) {
            code = word.charCodeAt(i);
            if (isUpper(code)) {
                upper++;
            }
            if (isLower(code)) {
                lower++;
            }
            if (isAlphanumeric(code)) {
                alpha++;
            }
            if (isNumber(code)) {
                numeric++;
            }
        }
        const upperPercent = upper / word.length;
        const lowerPercent = lower / word.length;
        const alphaPercent = alpha / word.length;
        const numericPercent = numeric / word.length;
        return { upperPercent, lowerPercent, alphaPercent, numericPercent };
    }
    function isUpperCaseWord(analysis) {
        const { upperPercent, lowerPercent } = analysis;
        return lowerPercent === 0 && upperPercent > 0.6;
    }
    function isCamelCaseWord(analysis) {
        const { upperPercent, lowerPercent, alphaPercent, numericPercent } = analysis;
        return lowerPercent > 0.2 && upperPercent < 0.8 && alphaPercent > 0.6 && numericPercent < 0.2;
    }
    // Heuristic to avoid computing camel case matcher for words that don't
    // look like camel case patterns.
    function isCamelCasePattern(word) {
        let upper = 0, lower = 0, code = 0, whitespace = 0;
        for (let i = 0; i < word.length; i++) {
            code = word.charCodeAt(i);
            if (isUpper(code)) {
                upper++;
            }
            if (isLower(code)) {
                lower++;
            }
            if (isWhitespace(code)) {
                whitespace++;
            }
        }
        if ((upper === 0 || lower === 0) && whitespace === 0) {
            return word.length <= 30;
        }
        else {
            return upper <= 5;
        }
    }
    function matchesCamelCase(word, camelCaseWord) {
        if (!camelCaseWord) {
            return null;
        }
        camelCaseWord = camelCaseWord.trim();
        if (camelCaseWord.length === 0) {
            return null;
        }
        if (!isCamelCasePattern(word)) {
            return null;
        }
        if (camelCaseWord.length > 60) {
            return null;
        }
        const analysis = analyzeCamelCaseWord(camelCaseWord);
        if (!isCamelCaseWord(analysis)) {
            if (!isUpperCaseWord(analysis)) {
                return null;
            }
            camelCaseWord = camelCaseWord.toLowerCase();
        }
        let result = null;
        let i = 0;
        word = word.toLowerCase();
        while (i < camelCaseWord.length && (result = _matchesCamelCase(word, camelCaseWord, 0, i)) === null) {
            i = nextAnchor(camelCaseWord, i + 1);
        }
        return result;
    }
    exports.matchesCamelCase = matchesCamelCase;
    // Matches beginning of words supporting non-ASCII languages
    // If `contiguous` is true then matches word with beginnings of the words in the target. E.g. "pul" will match "Git: Pull"
    // Otherwise also matches sub string of the word with beginnings of the words in the target. E.g. "gp" or "g p" will match "Git: Pull"
    // Useful in cases where the target is words (e.g. command labels)
    function matchesWords(word, target, contiguous = false) {
        if (!target || target.length === 0) {
            return null;
        }
        let result = null;
        let i = 0;
        word = word.toLowerCase();
        target = target.toLowerCase();
        while (i < target.length && (result = _matchesWords(word, target, 0, i, contiguous)) === null) {
            i = nextWord(target, i + 1);
        }
        return result;
    }
    exports.matchesWords = matchesWords;
    function _matchesWords(word, target, i, j, contiguous) {
        if (i === word.length) {
            return [];
        }
        else if (j === target.length) {
            return null;
        }
        else if (!charactersMatch(word.charCodeAt(i), target.charCodeAt(j))) {
            return null;
        }
        else {
            let result = null;
            let nextWordIndex = j + 1;
            result = _matchesWords(word, target, i + 1, j + 1, contiguous);
            if (!contiguous) {
                while (!result && (nextWordIndex = nextWord(target, nextWordIndex)) < target.length) {
                    result = _matchesWords(word, target, i + 1, nextWordIndex, contiguous);
                    nextWordIndex++;
                }
            }
            return result === null ? null : join({ start: j, end: j + 1 }, result);
        }
    }
    function nextWord(word, start) {
        for (let i = start; i < word.length; i++) {
            if (isWordSeparator(word.charCodeAt(i)) ||
                (i > 0 && isWordSeparator(word.charCodeAt(i - 1)))) {
                return i;
            }
        }
        return word.length;
    }
    // Fuzzy
    const fuzzyContiguousFilter = or(exports.matchesPrefix, matchesCamelCase, matchesContiguousSubString);
    const fuzzySeparateFilter = or(exports.matchesPrefix, matchesCamelCase, matchesSubString);
    const fuzzyRegExpCache = new map_1.LRUCache(10000); // bounded to 10000 elements
    function matchesFuzzy(word, wordToMatchAgainst, enableSeparateSubstringMatching = false) {
        if (typeof word !== 'string' || typeof wordToMatchAgainst !== 'string') {
            return null; // return early for invalid input
        }
        // Form RegExp for wildcard matches
        let regexp = fuzzyRegExpCache.get(word);
        if (!regexp) {
            regexp = new RegExp(strings.convertSimple2RegExpPattern(word), 'i');
            fuzzyRegExpCache.set(word, regexp);
        }
        // RegExp Filter
        const match = regexp.exec(wordToMatchAgainst);
        if (match) {
            return [{ start: match.index, end: match.index + match[0].length }];
        }
        // Default Filter
        return enableSeparateSubstringMatching ? fuzzySeparateFilter(word, wordToMatchAgainst) : fuzzyContiguousFilter(word, wordToMatchAgainst);
    }
    exports.matchesFuzzy = matchesFuzzy;
    /**
     * Match pattern againt word in a fuzzy way. As in IntelliSense and faster and more
     * powerfull than `matchesFuzzy`
     */
    function matchesFuzzy2(pattern, word) {
        const score = fuzzyScore(pattern, pattern.toLowerCase(), 0, word, word.toLowerCase(), 0, true);
        return score ? createMatches(score) : null;
    }
    exports.matchesFuzzy2 = matchesFuzzy2;
    function anyScore(pattern, lowPattern, _patternPos, word, lowWord, _wordPos) {
        const result = fuzzyScore(pattern, lowPattern, 0, word, lowWord, 0, true);
        if (result) {
            return result;
        }
        let matches = 0;
        let score = 0;
        let idx = _wordPos;
        for (let patternPos = 0; patternPos < lowPattern.length && patternPos < _maxLen; ++patternPos) {
            const wordPos = lowWord.indexOf(lowPattern.charAt(patternPos), idx);
            if (wordPos >= 0) {
                score += 1;
                matches += 2 ** wordPos;
                idx = wordPos + 1;
            }
            else if (matches !== 0) {
                // once we have started matching things
                // we need to match the remaining pattern
                // characters
                break;
            }
        }
        return [score, matches, _wordPos];
    }
    exports.anyScore = anyScore;
    //#region --- fuzzyScore ---
    function createMatches(score) {
        if (typeof score === 'undefined') {
            return [];
        }
        const matches = score[1].toString(2);
        const wordStart = score[2];
        const res = [];
        for (let pos = wordStart; pos < _maxLen; pos++) {
            if (matches[matches.length - (pos + 1)] === '1') {
                const last = res[res.length - 1];
                if (last && last.end === pos) {
                    last.end = pos + 1;
                }
                else {
                    res.push({ start: pos, end: pos + 1 });
                }
            }
        }
        return res;
    }
    exports.createMatches = createMatches;
    const _maxLen = 128;
    function initTable() {
        const table = [];
        const row = [0];
        for (let i = 1; i <= _maxLen; i++) {
            row.push(-i);
        }
        for (let i = 0; i <= _maxLen; i++) {
            const thisRow = row.slice(0);
            thisRow[0] = -i;
            table.push(thisRow);
        }
        return table;
    }
    const _table = initTable();
    const _scores = initTable();
    const _arrows = initTable();
    const _debug = false;
    function printTable(table, pattern, patternLen, word, wordLen) {
        function pad(s, n, pad = ' ') {
            while (s.length < n) {
                s = pad + s;
            }
            return s;
        }
        let ret = ` |   |${word.split('').map(c => pad(c, 3)).join('|')}\n`;
        for (let i = 0; i <= patternLen; i++) {
            if (i === 0) {
                ret += ' |';
            }
            else {
                ret += `${pattern[i - 1]}|`;
            }
            ret += table[i].slice(0, wordLen + 1).map(n => pad(n.toString(), 3)).join('|') + '\n';
        }
        return ret;
    }
    function printTables(pattern, patternStart, word, wordStart) {
        pattern = pattern.substr(patternStart);
        word = word.substr(wordStart);
        console.log(printTable(_table, pattern, pattern.length, word, word.length));
        console.log(printTable(_arrows, pattern, pattern.length, word, word.length));
        console.log(printTable(_scores, pattern, pattern.length, word, word.length));
    }
    function isSeparatorAtPos(value, index) {
        if (index < 0 || index >= value.length) {
            return false;
        }
        const code = value.charCodeAt(index);
        switch (code) {
            case 95 /* Underline */:
            case 45 /* Dash */:
            case 46 /* Period */:
            case 32 /* Space */:
            case 47 /* Slash */:
            case 92 /* Backslash */:
            case 39 /* SingleQuote */:
            case 34 /* DoubleQuote */:
            case 58 /* Colon */:
            case 36 /* DollarSign */:
                return true;
            default:
                return false;
        }
    }
    function isWhitespaceAtPos(value, index) {
        if (index < 0 || index >= value.length) {
            return false;
        }
        const code = value.charCodeAt(index);
        switch (code) {
            case 32 /* Space */:
            case 9 /* Tab */:
                return true;
            default:
                return false;
        }
    }
    function isUpperCaseAtPos(pos, word, wordLow) {
        return word[pos] !== wordLow[pos];
    }
    function isPatternInWord(patternLow, patternPos, patternLen, wordLow, wordPos, wordLen) {
        while (patternPos < patternLen && wordPos < wordLen) {
            if (patternLow[patternPos] === wordLow[wordPos]) {
                patternPos += 1;
            }
            wordPos += 1;
        }
        return patternPos === patternLen; // pattern must be exhausted
    }
    exports.isPatternInWord = isPatternInWord;
    var Arrow;
    (function (Arrow) {
        Arrow[Arrow["Top"] = 1] = "Top";
        Arrow[Arrow["Diag"] = 2] = "Diag";
        Arrow[Arrow["Left"] = 4] = "Left";
    })(Arrow || (Arrow = {}));
    var FuzzyScore;
    (function (FuzzyScore) {
        /**
         * No matches and value `-100`
         */
        FuzzyScore.Default = Object.freeze([-100, 0, 0]);
        function isDefault(score) {
            return !score || (score[0] === -100 && score[1] === 0 && score[2] === 0);
        }
        FuzzyScore.isDefault = isDefault;
    })(FuzzyScore = exports.FuzzyScore || (exports.FuzzyScore = {}));
    function fuzzyScore(pattern, patternLow, patternStart, word, wordLow, wordStart, firstMatchCanBeWeak) {
        const patternLen = pattern.length > _maxLen ? _maxLen : pattern.length;
        const wordLen = word.length > _maxLen ? _maxLen : word.length;
        if (patternStart >= patternLen || wordStart >= wordLen || (patternLen - patternStart) > (wordLen - wordStart)) {
            return undefined;
        }
        // Run a simple check if the characters of pattern occur
        // (in order) at all in word. If that isn't the case we
        // stop because no match will be possible
        if (!isPatternInWord(patternLow, patternStart, patternLen, wordLow, wordStart, wordLen)) {
            return undefined;
        }
        let row = 1;
        let column = 1;
        let patternPos = patternStart;
        let wordPos = wordStart;
        let hasStrongFirstMatch = false;
        // There will be a match, fill in tables
        for (row = 1, patternPos = patternStart; patternPos < patternLen; row++, patternPos++) {
            for (column = 1, wordPos = wordStart; wordPos < wordLen; column++, wordPos++) {
                const score = _doScore(pattern, patternLow, patternPos, patternStart, word, wordLow, wordPos);
                if (patternPos === patternStart && score > 1) {
                    hasStrongFirstMatch = true;
                }
                _scores[row][column] = score;
                const diag = _table[row - 1][column - 1] + (score > 1 ? 1 : score);
                const top = _table[row - 1][column] + -1;
                const left = _table[row][column - 1] + -1;
                if (left >= top) {
                    // left or diag
                    if (left > diag) {
                        _table[row][column] = left;
                        _arrows[row][column] = 4 /* Left */;
                    }
                    else if (left === diag) {
                        _table[row][column] = left;
                        _arrows[row][column] = 4 /* Left */ | 2 /* Diag */;
                    }
                    else {
                        _table[row][column] = diag;
                        _arrows[row][column] = 2 /* Diag */;
                    }
                }
                else {
                    // top or diag
                    if (top > diag) {
                        _table[row][column] = top;
                        _arrows[row][column] = 1 /* Top */;
                    }
                    else if (top === diag) {
                        _table[row][column] = top;
                        _arrows[row][column] = 1 /* Top */ | 2 /* Diag */;
                    }
                    else {
                        _table[row][column] = diag;
                        _arrows[row][column] = 2 /* Diag */;
                    }
                }
            }
        }
        if (_debug) {
            printTables(pattern, patternStart, word, wordStart);
        }
        if (!hasStrongFirstMatch && !firstMatchCanBeWeak) {
            return undefined;
        }
        _matchesCount = 0;
        _topScore = -100;
        _wordStart = wordStart;
        _firstMatchCanBeWeak = firstMatchCanBeWeak;
        _findAllMatches2(row - 1, column - 1, patternLen === wordLen ? 1 : 0, 0, false);
        if (_matchesCount === 0) {
            return undefined;
        }
        return [_topScore, _topMatch2, wordStart];
    }
    exports.fuzzyScore = fuzzyScore;
    function _doScore(pattern, patternLow, patternPos, patternStart, word, wordLow, wordPos) {
        if (patternLow[patternPos] !== wordLow[wordPos]) {
            return -1;
        }
        if (wordPos === (patternPos - patternStart)) {
            // common prefix: `foobar <-> foobaz`
            //                            ^^^^^
            if (pattern[patternPos] === word[wordPos]) {
                return 7;
            }
            else {
                return 5;
            }
        }
        else if (isUpperCaseAtPos(wordPos, word, wordLow) && (wordPos === 0 || !isUpperCaseAtPos(wordPos - 1, word, wordLow))) {
            // hitting upper-case: `foo <-> forOthers`
            //                              ^^ ^
            if (pattern[patternPos] === word[wordPos]) {
                return 7;
            }
            else {
                return 5;
            }
        }
        else if (isSeparatorAtPos(wordLow, wordPos) && (wordPos === 0 || !isSeparatorAtPos(wordLow, wordPos - 1))) {
            // hitting a separator: `. <-> foo.bar`
            //                                ^
            return 5;
        }
        else if (isSeparatorAtPos(wordLow, wordPos - 1) || isWhitespaceAtPos(wordLow, wordPos - 1)) {
            // post separator: `foo <-> bar_foo`
            //                              ^^^
            return 5;
        }
        else {
            return 1;
        }
    }
    let _matchesCount = 0;
    let _topMatch2 = 0;
    let _topScore = 0;
    let _wordStart = 0;
    let _firstMatchCanBeWeak = false;
    function _findAllMatches2(row, column, total, matches, lastMatched) {
        if (_matchesCount >= 10 || total < -25) {
            // stop when having already 10 results, or
            // when a potential alignment as already 5 gaps
            return;
        }
        let simpleMatchCount = 0;
        while (row > 0 && column > 0) {
            const score = _scores[row][column];
            const arrow = _arrows[row][column];
            if (arrow === 4 /* Left */) {
                // left -> no match, skip a word character
                column -= 1;
                if (lastMatched) {
                    total -= 5; // new gap penalty
                }
                else if (matches !== 0) {
                    total -= 1; // gap penalty after first match
                }
                lastMatched = false;
                simpleMatchCount = 0;
            }
            else if (arrow & 2 /* Diag */) {
                if (arrow & 4 /* Left */) {
                    // left
                    _findAllMatches2(row, column - 1, matches !== 0 ? total - 1 : total, // gap penalty after first match
                    matches, lastMatched);
                }
                // diag
                total += score;
                row -= 1;
                column -= 1;
                lastMatched = true;
                // match -> set a 1 at the word pos
                matches += 2 ** (column + _wordStart);
                // count simple matches and boost a row of
                // simple matches when they yield in a
                // strong match.
                if (score === 1) {
                    simpleMatchCount += 1;
                    if (row === 0 && !_firstMatchCanBeWeak) {
                        // when the first match is a weak
                        // match we discard it
                        return undefined;
                    }
                }
                else {
                    // boost
                    total += 1 + (simpleMatchCount * (score - 1));
                    simpleMatchCount = 0;
                }
            }
            else {
                return undefined;
            }
        }
        total -= column >= 3 ? 9 : column * 3; // late start penalty
        // dynamically keep track of the current top score
        // and insert the current best score at head, the rest at tail
        _matchesCount += 1;
        if (total > _topScore) {
            _topScore = total;
            _topMatch2 = matches;
        }
    }
    //#endregion
    //#region --- graceful ---
    function fuzzyScoreGracefulAggressive(pattern, lowPattern, patternPos, word, lowWord, wordPos, firstMatchCanBeWeak) {
        return fuzzyScoreWithPermutations(pattern, lowPattern, patternPos, word, lowWord, wordPos, true, firstMatchCanBeWeak);
    }
    exports.fuzzyScoreGracefulAggressive = fuzzyScoreGracefulAggressive;
    function fuzzyScoreGraceful(pattern, lowPattern, patternPos, word, lowWord, wordPos, firstMatchCanBeWeak) {
        return fuzzyScoreWithPermutations(pattern, lowPattern, patternPos, word, lowWord, wordPos, false, firstMatchCanBeWeak);
    }
    exports.fuzzyScoreGraceful = fuzzyScoreGraceful;
    function fuzzyScoreWithPermutations(pattern, lowPattern, patternPos, word, lowWord, wordPos, aggressive, firstMatchCanBeWeak) {
        let top = fuzzyScore(pattern, lowPattern, patternPos, word, lowWord, wordPos, firstMatchCanBeWeak);
        if (top && !aggressive) {
            // when using the original pattern yield a result we`
            // return it unless we are aggressive and try to find
            // a better alignment, e.g. `cno` -> `^co^ns^ole` or `^c^o^nsole`.
            return top;
        }
        if (pattern.length >= 3) {
            // When the pattern is long enough then try a few (max 7)
            // permutations of the pattern to find a better match. The
            // permutations only swap neighbouring characters, e.g
            // `cnoso` becomes `conso`, `cnsoo`, `cnoos`.
            const tries = Math.min(7, pattern.length - 1);
            for (let movingPatternPos = patternPos + 1; movingPatternPos < tries; movingPatternPos++) {
                const newPattern = nextTypoPermutation(pattern, movingPatternPos);
                if (newPattern) {
                    const candidate = fuzzyScore(newPattern, newPattern.toLowerCase(), patternPos, word, lowWord, wordPos, firstMatchCanBeWeak);
                    if (candidate) {
                        candidate[0] -= 3; // permutation penalty
                        if (!top || candidate[0] > top[0]) {
                            top = candidate;
                        }
                    }
                }
            }
        }
        return top;
    }
    function nextTypoPermutation(pattern, patternPos) {
        if (patternPos + 1 >= pattern.length) {
            return undefined;
        }
        const swap1 = pattern[patternPos];
        const swap2 = pattern[patternPos + 1];
        if (swap1 === swap2) {
            return undefined;
        }
        return pattern.slice(0, patternPos)
            + swap2
            + swap1
            + pattern.slice(patternPos + 2);
    }
});
//#endregion

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[37/*vs/base/common/codicon*/], __M([0/*require*/,1/*exports*/,36/*vs/base/common/filters*/,6/*vs/base/common/strings*/]), function (require, exports, filters_1, strings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.matchesFuzzyCodiconAware = exports.parseCodicons = exports.codiconStartMarker = void 0;
    exports.codiconStartMarker = '$(';
    function parseCodicons(text) {
        const firstCodiconIndex = text.indexOf(exports.codiconStartMarker);
        if (firstCodiconIndex === -1) {
            return { text }; // return early if the word does not include an codicon
        }
        return doParseCodicons(text, firstCodiconIndex);
    }
    exports.parseCodicons = parseCodicons;
    function doParseCodicons(text, firstCodiconIndex) {
        const codiconOffsets = [];
        let textWithoutCodicons = '';
        function appendChars(chars) {
            if (chars) {
                textWithoutCodicons += chars;
                for (const _ of chars) {
                    codiconOffsets.push(codiconsOffset); // make sure to fill in codicon offsets
                }
            }
        }
        let currentCodiconStart = -1;
        let currentCodiconValue = '';
        let codiconsOffset = 0;
        let char;
        let nextChar;
        let offset = firstCodiconIndex;
        const length = text.length;
        // Append all characters until the first codicon
        appendChars(text.substr(0, firstCodiconIndex));
        // example: $(file-symlink-file) my cool $(other-codicon) entry
        while (offset < length) {
            char = text[offset];
            nextChar = text[offset + 1];
            // beginning of codicon: some value $( <--
            if (char === exports.codiconStartMarker[0] && nextChar === exports.codiconStartMarker[1]) {
                currentCodiconStart = offset;
                // if we had a previous potential codicon value without
                // the closing ')', it was actually not an codicon and
                // so we have to add it to the actual value
                appendChars(currentCodiconValue);
                currentCodiconValue = exports.codiconStartMarker;
                offset++; // jump over '('
            }
            // end of codicon: some value $(some-codicon) <--
            else if (char === ')' && currentCodiconStart !== -1) {
                const currentCodiconLength = offset - currentCodiconStart + 1; // +1 to include the closing ')'
                codiconsOffset += currentCodiconLength;
                currentCodiconStart = -1;
                currentCodiconValue = '';
            }
            // within codicon
            else if (currentCodiconStart !== -1) {
                // Make sure this is a real codicon name
                if (/^[a-z0-9\-]$/i.test(char)) {
                    currentCodiconValue += char;
                }
                else {
                    // This is not a real codicon, treat it as text
                    appendChars(currentCodiconValue);
                    currentCodiconStart = -1;
                    currentCodiconValue = '';
                }
            }
            // any value outside of codicons
            else {
                appendChars(char);
            }
            offset++;
        }
        // if we had a previous potential codicon value without
        // the closing ')', it was actually not an codicon and
        // so we have to add it to the actual value
        appendChars(currentCodiconValue);
        return { text: textWithoutCodicons, codiconOffsets };
    }
    function matchesFuzzyCodiconAware(query, target, enableSeparateSubstringMatching = false) {
        const { text, codiconOffsets } = target;
        // Return early if there are no codicon markers in the word to match against
        if (!codiconOffsets || codiconOffsets.length === 0) {
            return filters_1.matchesFuzzy(query, text, enableSeparateSubstringMatching);
        }
        // Trim the word to match against because it could have leading
        // whitespace now if the word started with an codicon
        const wordToMatchAgainstWithoutCodiconsTrimmed = strings_1.ltrim(text, ' ');
        const leadingWhitespaceOffset = text.length - wordToMatchAgainstWithoutCodiconsTrimmed.length;
        // match on value without codicons
        const matches = filters_1.matchesFuzzy(query, wordToMatchAgainstWithoutCodiconsTrimmed, enableSeparateSubstringMatching);
        // Map matches back to offsets with codicons and trimming
        if (matches) {
            for (const match of matches) {
                const codiconOffset = codiconOffsets[match.start + leadingWhitespaceOffset] /* codicon offsets at index */ + leadingWhitespaceOffset /* overall leading whitespace offset */;
                match.start += codiconOffset;
                match.end += codiconOffset;
            }
        }
        return matches;
    }
    exports.matchesFuzzyCodiconAware = matchesFuzzyCodiconAware;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[38/*vs/base/common/codicons*/], __M([0/*require*/,1/*exports*/,37/*vs/base/common/codicon*/,3/*vs/base/common/event*/]), function (require, exports, codicon_1, event_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.stripCodicons = exports.markdownUnescapeCodicons = exports.markdownEscapeEscapedCodicons = exports.escapeCodicons = exports.Codicon = exports.registerIcon = exports.iconRegistry = void 0;
    class Registry {
        constructor() {
            this._icons = new Map();
            this._onDidRegister = new event_1.Emitter();
        }
        add(icon) {
            if (!this._icons.has(icon.id)) {
                this._icons.set(icon.id, icon);
                this._onDidRegister.fire(icon);
            }
            else {
                console.error(`Duplicate registration of codicon ${icon.id}`);
            }
        }
        get(id) {
            return this._icons.get(id);
        }
        get all() {
            return this._icons.values();
        }
        get onDidRegister() {
            return this._onDidRegister.event;
        }
    }
    const _registry = new Registry();
    exports.iconRegistry = _registry;
    function registerIcon(id, def, description) {
        return new Codicon(id, def);
    }
    exports.registerIcon = registerIcon;
    class Codicon {
        constructor(id, definition, description) {
            this.id = id;
            this.definition = definition;
            this.description = description;
            _registry.add(this);
        }
        get classNames() { return 'codicon codicon-' + this.id; }
        // classNamesArray is useful for migrating to ES6 classlist
        get classNamesArray() { return ['codicon', 'codicon-' + this.id]; }
        get cssSelector() { return '.codicon.codicon-' + this.id; }
    }
    exports.Codicon = Codicon;
    (function (Codicon) {
        // built-in icons, with image name
        Codicon.add = new Codicon('add', { character: '\\ea60' });
        Codicon.plus = new Codicon('plus', { character: '\\ea60' });
        Codicon.gistNew = new Codicon('gist-new', { character: '\\ea60' });
        Codicon.repoCreate = new Codicon('repo-create', { character: '\\ea60' });
        Codicon.lightbulb = new Codicon('lightbulb', { character: '\\ea61' });
        Codicon.lightBulb = new Codicon('light-bulb', { character: '\\ea61' });
        Codicon.repo = new Codicon('repo', { character: '\\ea62' });
        Codicon.repoDelete = new Codicon('repo-delete', { character: '\\ea62' });
        Codicon.gistFork = new Codicon('gist-fork', { character: '\\ea63' });
        Codicon.repoForked = new Codicon('repo-forked', { character: '\\ea63' });
        Codicon.gitPullRequest = new Codicon('git-pull-request', { character: '\\ea64' });
        Codicon.gitPullRequestAbandoned = new Codicon('git-pull-request-abandoned', { character: '\\ea64' });
        Codicon.recordKeys = new Codicon('record-keys', { character: '\\ea65' });
        Codicon.keyboard = new Codicon('keyboard', { character: '\\ea65' });
        Codicon.tag = new Codicon('tag', { character: '\\ea66' });
        Codicon.tagAdd = new Codicon('tag-add', { character: '\\ea66' });
        Codicon.tagRemove = new Codicon('tag-remove', { character: '\\ea66' });
        Codicon.person = new Codicon('person', { character: '\\ea67' });
        Codicon.personAdd = new Codicon('person-add', { character: '\\ea67' });
        Codicon.personFollow = new Codicon('person-follow', { character: '\\ea67' });
        Codicon.personOutline = new Codicon('person-outline', { character: '\\ea67' });
        Codicon.personFilled = new Codicon('person-filled', { character: '\\ea67' });
        Codicon.gitBranch = new Codicon('git-branch', { character: '\\ea68' });
        Codicon.gitBranchCreate = new Codicon('git-branch-create', { character: '\\ea68' });
        Codicon.gitBranchDelete = new Codicon('git-branch-delete', { character: '\\ea68' });
        Codicon.sourceControl = new Codicon('source-control', { character: '\\ea68' });
        Codicon.mirror = new Codicon('mirror', { character: '\\ea69' });
        Codicon.mirrorPublic = new Codicon('mirror-public', { character: '\\ea69' });
        Codicon.star = new Codicon('star', { character: '\\ea6a' });
        Codicon.starAdd = new Codicon('star-add', { character: '\\ea6a' });
        Codicon.starDelete = new Codicon('star-delete', { character: '\\ea6a' });
        Codicon.starEmpty = new Codicon('star-empty', { character: '\\ea6a' });
        Codicon.comment = new Codicon('comment', { character: '\\ea6b' });
        Codicon.commentAdd = new Codicon('comment-add', { character: '\\ea6b' });
        Codicon.alert = new Codicon('alert', { character: '\\ea6c' });
        Codicon.warning = new Codicon('warning', { character: '\\ea6c' });
        Codicon.search = new Codicon('search', { character: '\\ea6d' });
        Codicon.searchSave = new Codicon('search-save', { character: '\\ea6d' });
        Codicon.logOut = new Codicon('log-out', { character: '\\ea6e' });
        Codicon.signOut = new Codicon('sign-out', { character: '\\ea6e' });
        Codicon.logIn = new Codicon('log-in', { character: '\\ea6f' });
        Codicon.signIn = new Codicon('sign-in', { character: '\\ea6f' });
        Codicon.eye = new Codicon('eye', { character: '\\ea70' });
        Codicon.eyeUnwatch = new Codicon('eye-unwatch', { character: '\\ea70' });
        Codicon.eyeWatch = new Codicon('eye-watch', { character: '\\ea70' });
        Codicon.circleFilled = new Codicon('circle-filled', { character: '\\ea71' });
        Codicon.primitiveDot = new Codicon('primitive-dot', { character: '\\ea71' });
        Codicon.closeDirty = new Codicon('close-dirty', { character: '\\ea71' });
        Codicon.debugBreakpoint = new Codicon('debug-breakpoint', { character: '\\ea71' });
        Codicon.debugBreakpointDisabled = new Codicon('debug-breakpoint-disabled', { character: '\\ea71' });
        Codicon.debugHint = new Codicon('debug-hint', { character: '\\ea71' });
        Codicon.primitiveSquare = new Codicon('primitive-square', { character: '\\ea72' });
        Codicon.edit = new Codicon('edit', { character: '\\ea73' });
        Codicon.pencil = new Codicon('pencil', { character: '\\ea73' });
        Codicon.info = new Codicon('info', { character: '\\ea74' });
        Codicon.issueOpened = new Codicon('issue-opened', { character: '\\ea74' });
        Codicon.gistPrivate = new Codicon('gist-private', { character: '\\ea75' });
        Codicon.gitForkPrivate = new Codicon('git-fork-private', { character: '\\ea75' });
        Codicon.lock = new Codicon('lock', { character: '\\ea75' });
        Codicon.mirrorPrivate = new Codicon('mirror-private', { character: '\\ea75' });
        Codicon.close = new Codicon('close', { character: '\\ea76' });
        Codicon.removeClose = new Codicon('remove-close', { character: '\\ea76' });
        Codicon.x = new Codicon('x', { character: '\\ea76' });
        Codicon.repoSync = new Codicon('repo-sync', { character: '\\ea77' });
        Codicon.sync = new Codicon('sync', { character: '\\ea77' });
        Codicon.clone = new Codicon('clone', { character: '\\ea78' });
        Codicon.desktopDownload = new Codicon('desktop-download', { character: '\\ea78' });
        Codicon.beaker = new Codicon('beaker', { character: '\\ea79' });
        Codicon.microscope = new Codicon('microscope', { character: '\\ea79' });
        Codicon.vm = new Codicon('vm', { character: '\\ea7a' });
        Codicon.deviceDesktop = new Codicon('device-desktop', { character: '\\ea7a' });
        Codicon.file = new Codicon('file', { character: '\\ea7b' });
        Codicon.fileText = new Codicon('file-text', { character: '\\ea7b' });
        Codicon.more = new Codicon('more', { character: '\\ea7c' });
        Codicon.ellipsis = new Codicon('ellipsis', { character: '\\ea7c' });
        Codicon.kebabHorizontal = new Codicon('kebab-horizontal', { character: '\\ea7c' });
        Codicon.mailReply = new Codicon('mail-reply', { character: '\\ea7d' });
        Codicon.reply = new Codicon('reply', { character: '\\ea7d' });
        Codicon.organization = new Codicon('organization', { character: '\\ea7e' });
        Codicon.organizationFilled = new Codicon('organization-filled', { character: '\\ea7e' });
        Codicon.organizationOutline = new Codicon('organization-outline', { character: '\\ea7e' });
        Codicon.newFile = new Codicon('new-file', { character: '\\ea7f' });
        Codicon.fileAdd = new Codicon('file-add', { character: '\\ea7f' });
        Codicon.newFolder = new Codicon('new-folder', { character: '\\ea80' });
        Codicon.fileDirectoryCreate = new Codicon('file-directory-create', { character: '\\ea80' });
        Codicon.trash = new Codicon('trash', { character: '\\ea81' });
        Codicon.trashcan = new Codicon('trashcan', { character: '\\ea81' });
        Codicon.history = new Codicon('history', { character: '\\ea82' });
        Codicon.clock = new Codicon('clock', { character: '\\ea82' });
        Codicon.folder = new Codicon('folder', { character: '\\ea83' });
        Codicon.fileDirectory = new Codicon('file-directory', { character: '\\ea83' });
        Codicon.symbolFolder = new Codicon('symbol-folder', { character: '\\ea83' });
        Codicon.logoGithub = new Codicon('logo-github', { character: '\\ea84' });
        Codicon.markGithub = new Codicon('mark-github', { character: '\\ea84' });
        Codicon.github = new Codicon('github', { character: '\\ea84' });
        Codicon.terminal = new Codicon('terminal', { character: '\\ea85' });
        Codicon.console = new Codicon('console', { character: '\\ea85' });
        Codicon.repl = new Codicon('repl', { character: '\\ea85' });
        Codicon.zap = new Codicon('zap', { character: '\\ea86' });
        Codicon.symbolEvent = new Codicon('symbol-event', { character: '\\ea86' });
        Codicon.error = new Codicon('error', { character: '\\ea87' });
        Codicon.stop = new Codicon('stop', { character: '\\ea87' });
        Codicon.variable = new Codicon('variable', { character: '\\ea88' });
        Codicon.symbolVariable = new Codicon('symbol-variable', { character: '\\ea88' });
        Codicon.array = new Codicon('array', { character: '\\ea8a' });
        Codicon.symbolArray = new Codicon('symbol-array', { character: '\\ea8a' });
        Codicon.symbolModule = new Codicon('symbol-module', { character: '\\ea8b' });
        Codicon.symbolPackage = new Codicon('symbol-package', { character: '\\ea8b' });
        Codicon.symbolNamespace = new Codicon('symbol-namespace', { character: '\\ea8b' });
        Codicon.symbolObject = new Codicon('symbol-object', { character: '\\ea8b' });
        Codicon.symbolMethod = new Codicon('symbol-method', { character: '\\ea8c' });
        Codicon.symbolFunction = new Codicon('symbol-function', { character: '\\ea8c' });
        Codicon.symbolConstructor = new Codicon('symbol-constructor', { character: '\\ea8c' });
        Codicon.symbolBoolean = new Codicon('symbol-boolean', { character: '\\ea8f' });
        Codicon.symbolNull = new Codicon('symbol-null', { character: '\\ea8f' });
        Codicon.symbolNumeric = new Codicon('symbol-numeric', { character: '\\ea90' });
        Codicon.symbolNumber = new Codicon('symbol-number', { character: '\\ea90' });
        Codicon.symbolStructure = new Codicon('symbol-structure', { character: '\\ea91' });
        Codicon.symbolStruct = new Codicon('symbol-struct', { character: '\\ea91' });
        Codicon.symbolParameter = new Codicon('symbol-parameter', { character: '\\ea92' });
        Codicon.symbolTypeParameter = new Codicon('symbol-type-parameter', { character: '\\ea92' });
        Codicon.symbolKey = new Codicon('symbol-key', { character: '\\ea93' });
        Codicon.symbolText = new Codicon('symbol-text', { character: '\\ea93' });
        Codicon.symbolReference = new Codicon('symbol-reference', { character: '\\ea94' });
        Codicon.goToFile = new Codicon('go-to-file', { character: '\\ea94' });
        Codicon.symbolEnum = new Codicon('symbol-enum', { character: '\\ea95' });
        Codicon.symbolValue = new Codicon('symbol-value', { character: '\\ea95' });
        Codicon.symbolRuler = new Codicon('symbol-ruler', { character: '\\ea96' });
        Codicon.symbolUnit = new Codicon('symbol-unit', { character: '\\ea96' });
        Codicon.activateBreakpoints = new Codicon('activate-breakpoints', { character: '\\ea97' });
        Codicon.archive = new Codicon('archive', { character: '\\ea98' });
        Codicon.arrowBoth = new Codicon('arrow-both', { character: '\\ea99' });
        Codicon.arrowDown = new Codicon('arrow-down', { character: '\\ea9a' });
        Codicon.arrowLeft = new Codicon('arrow-left', { character: '\\ea9b' });
        Codicon.arrowRight = new Codicon('arrow-right', { character: '\\ea9c' });
        Codicon.arrowSmallDown = new Codicon('arrow-small-down', { character: '\\ea9d' });
        Codicon.arrowSmallLeft = new Codicon('arrow-small-left', { character: '\\ea9e' });
        Codicon.arrowSmallRight = new Codicon('arrow-small-right', { character: '\\ea9f' });
        Codicon.arrowSmallUp = new Codicon('arrow-small-up', { character: '\\eaa0' });
        Codicon.arrowUp = new Codicon('arrow-up', { character: '\\eaa1' });
        Codicon.bell = new Codicon('bell', { character: '\\eaa2' });
        Codicon.bold = new Codicon('bold', { character: '\\eaa3' });
        Codicon.book = new Codicon('book', { character: '\\eaa4' });
        Codicon.bookmark = new Codicon('bookmark', { character: '\\eaa5' });
        Codicon.debugBreakpointConditionalUnverified = new Codicon('debug-breakpoint-conditional-unverified', { character: '\\eaa6' });
        Codicon.debugBreakpointConditional = new Codicon('debug-breakpoint-conditional', { character: '\\eaa7' });
        Codicon.debugBreakpointConditionalDisabled = new Codicon('debug-breakpoint-conditional-disabled', { character: '\\eaa7' });
        Codicon.debugBreakpointDataUnverified = new Codicon('debug-breakpoint-data-unverified', { character: '\\eaa8' });
        Codicon.debugBreakpointData = new Codicon('debug-breakpoint-data', { character: '\\eaa9' });
        Codicon.debugBreakpointDataDisabled = new Codicon('debug-breakpoint-data-disabled', { character: '\\eaa9' });
        Codicon.debugBreakpointLogUnverified = new Codicon('debug-breakpoint-log-unverified', { character: '\\eaaa' });
        Codicon.debugBreakpointLog = new Codicon('debug-breakpoint-log', { character: '\\eaab' });
        Codicon.debugBreakpointLogDisabled = new Codicon('debug-breakpoint-log-disabled', { character: '\\eaab' });
        Codicon.briefcase = new Codicon('briefcase', { character: '\\eaac' });
        Codicon.broadcast = new Codicon('broadcast', { character: '\\eaad' });
        Codicon.browser = new Codicon('browser', { character: '\\eaae' });
        Codicon.bug = new Codicon('bug', { character: '\\eaaf' });
        Codicon.calendar = new Codicon('calendar', { character: '\\eab0' });
        Codicon.caseSensitive = new Codicon('case-sensitive', { character: '\\eab1' });
        Codicon.check = new Codicon('check', { character: '\\eab2' });
        Codicon.checklist = new Codicon('checklist', { character: '\\eab3' });
        Codicon.chevronDown = new Codicon('chevron-down', { character: '\\eab4' });
        Codicon.chevronLeft = new Codicon('chevron-left', { character: '\\eab5' });
        Codicon.chevronRight = new Codicon('chevron-right', { character: '\\eab6' });
        Codicon.chevronUp = new Codicon('chevron-up', { character: '\\eab7' });
        Codicon.chromeClose = new Codicon('chrome-close', { character: '\\eab8' });
        Codicon.chromeMaximize = new Codicon('chrome-maximize', { character: '\\eab9' });
        Codicon.chromeMinimize = new Codicon('chrome-minimize', { character: '\\eaba' });
        Codicon.chromeRestore = new Codicon('chrome-restore', { character: '\\eabb' });
        Codicon.circleOutline = new Codicon('circle-outline', { character: '\\eabc' });
        Codicon.debugBreakpointUnverified = new Codicon('debug-breakpoint-unverified', { character: '\\eabc' });
        Codicon.circleSlash = new Codicon('circle-slash', { character: '\\eabd' });
        Codicon.circuitBoard = new Codicon('circuit-board', { character: '\\eabe' });
        Codicon.clearAll = new Codicon('clear-all', { character: '\\eabf' });
        Codicon.clippy = new Codicon('clippy', { character: '\\eac0' });
        Codicon.closeAll = new Codicon('close-all', { character: '\\eac1' });
        Codicon.cloudDownload = new Codicon('cloud-download', { character: '\\eac2' });
        Codicon.cloudUpload = new Codicon('cloud-upload', { character: '\\eac3' });
        Codicon.code = new Codicon('code', { character: '\\eac4' });
        Codicon.collapseAll = new Codicon('collapse-all', { character: '\\eac5' });
        Codicon.colorMode = new Codicon('color-mode', { character: '\\eac6' });
        Codicon.commentDiscussion = new Codicon('comment-discussion', { character: '\\eac7' });
        Codicon.compareChanges = new Codicon('compare-changes', { character: '\\eafd' });
        Codicon.creditCard = new Codicon('credit-card', { character: '\\eac9' });
        Codicon.dash = new Codicon('dash', { character: '\\eacc' });
        Codicon.dashboard = new Codicon('dashboard', { character: '\\eacd' });
        Codicon.database = new Codicon('database', { character: '\\eace' });
        Codicon.debugContinue = new Codicon('debug-continue', { character: '\\eacf' });
        Codicon.debugDisconnect = new Codicon('debug-disconnect', { character: '\\ead0' });
        Codicon.debugPause = new Codicon('debug-pause', { character: '\\ead1' });
        Codicon.debugRestart = new Codicon('debug-restart', { character: '\\ead2' });
        Codicon.debugStart = new Codicon('debug-start', { character: '\\ead3' });
        Codicon.debugStepInto = new Codicon('debug-step-into', { character: '\\ead4' });
        Codicon.debugStepOut = new Codicon('debug-step-out', { character: '\\ead5' });
        Codicon.debugStepOver = new Codicon('debug-step-over', { character: '\\ead6' });
        Codicon.debugStop = new Codicon('debug-stop', { character: '\\ead7' });
        Codicon.debug = new Codicon('debug', { character: '\\ead8' });
        Codicon.deviceCameraVideo = new Codicon('device-camera-video', { character: '\\ead9' });
        Codicon.deviceCamera = new Codicon('device-camera', { character: '\\eada' });
        Codicon.deviceMobile = new Codicon('device-mobile', { character: '\\eadb' });
        Codicon.diffAdded = new Codicon('diff-added', { character: '\\eadc' });
        Codicon.diffIgnored = new Codicon('diff-ignored', { character: '\\eadd' });
        Codicon.diffModified = new Codicon('diff-modified', { character: '\\eade' });
        Codicon.diffRemoved = new Codicon('diff-removed', { character: '\\eadf' });
        Codicon.diffRenamed = new Codicon('diff-renamed', { character: '\\eae0' });
        Codicon.diff = new Codicon('diff', { character: '\\eae1' });
        Codicon.discard = new Codicon('discard', { character: '\\eae2' });
        Codicon.editorLayout = new Codicon('editor-layout', { character: '\\eae3' });
        Codicon.emptyWindow = new Codicon('empty-window', { character: '\\eae4' });
        Codicon.exclude = new Codicon('exclude', { character: '\\eae5' });
        Codicon.extensions = new Codicon('extensions', { character: '\\eae6' });
        Codicon.eyeClosed = new Codicon('eye-closed', { character: '\\eae7' });
        Codicon.fileBinary = new Codicon('file-binary', { character: '\\eae8' });
        Codicon.fileCode = new Codicon('file-code', { character: '\\eae9' });
        Codicon.fileMedia = new Codicon('file-media', { character: '\\eaea' });
        Codicon.filePdf = new Codicon('file-pdf', { character: '\\eaeb' });
        Codicon.fileSubmodule = new Codicon('file-submodule', { character: '\\eaec' });
        Codicon.fileSymlinkDirectory = new Codicon('file-symlink-directory', { character: '\\eaed' });
        Codicon.fileSymlinkFile = new Codicon('file-symlink-file', { character: '\\eaee' });
        Codicon.fileZip = new Codicon('file-zip', { character: '\\eaef' });
        Codicon.files = new Codicon('files', { character: '\\eaf0' });
        Codicon.filter = new Codicon('filter', { character: '\\eaf1' });
        Codicon.flame = new Codicon('flame', { character: '\\eaf2' });
        Codicon.foldDown = new Codicon('fold-down', { character: '\\eaf3' });
        Codicon.foldUp = new Codicon('fold-up', { character: '\\eaf4' });
        Codicon.fold = new Codicon('fold', { character: '\\eaf5' });
        Codicon.folderActive = new Codicon('folder-active', { character: '\\eaf6' });
        Codicon.folderOpened = new Codicon('folder-opened', { character: '\\eaf7' });
        Codicon.gear = new Codicon('gear', { character: '\\eaf8' });
        Codicon.gift = new Codicon('gift', { character: '\\eaf9' });
        Codicon.gistSecret = new Codicon('gist-secret', { character: '\\eafa' });
        Codicon.gist = new Codicon('gist', { character: '\\eafb' });
        Codicon.gitCommit = new Codicon('git-commit', { character: '\\eafc' });
        Codicon.gitCompare = new Codicon('git-compare', { character: '\\eafd' });
        Codicon.gitMerge = new Codicon('git-merge', { character: '\\eafe' });
        Codicon.githubAction = new Codicon('github-action', { character: '\\eaff' });
        Codicon.githubAlt = new Codicon('github-alt', { character: '\\eb00' });
        Codicon.globe = new Codicon('globe', { character: '\\eb01' });
        Codicon.grabber = new Codicon('grabber', { character: '\\eb02' });
        Codicon.graph = new Codicon('graph', { character: '\\eb03' });
        Codicon.gripper = new Codicon('gripper', { character: '\\eb04' });
        Codicon.heart = new Codicon('heart', { character: '\\eb05' });
        Codicon.home = new Codicon('home', { character: '\\eb06' });
        Codicon.horizontalRule = new Codicon('horizontal-rule', { character: '\\eb07' });
        Codicon.hubot = new Codicon('hubot', { character: '\\eb08' });
        Codicon.inbox = new Codicon('inbox', { character: '\\eb09' });
        Codicon.issueClosed = new Codicon('issue-closed', { character: '\\eb0a' });
        Codicon.issueReopened = new Codicon('issue-reopened', { character: '\\eb0b' });
        Codicon.issues = new Codicon('issues', { character: '\\eb0c' });
        Codicon.italic = new Codicon('italic', { character: '\\eb0d' });
        Codicon.jersey = new Codicon('jersey', { character: '\\eb0e' });
        Codicon.json = new Codicon('json', { character: '\\eb0f' });
        Codicon.kebabVertical = new Codicon('kebab-vertical', { character: '\\eb10' });
        Codicon.key = new Codicon('key', { character: '\\eb11' });
        Codicon.law = new Codicon('law', { character: '\\eb12' });
        Codicon.lightbulbAutofix = new Codicon('lightbulb-autofix', { character: '\\eb13' });
        Codicon.linkExternal = new Codicon('link-external', { character: '\\eb14' });
        Codicon.link = new Codicon('link', { character: '\\eb15' });
        Codicon.listOrdered = new Codicon('list-ordered', { character: '\\eb16' });
        Codicon.listUnordered = new Codicon('list-unordered', { character: '\\eb17' });
        Codicon.liveShare = new Codicon('live-share', { character: '\\eb18' });
        Codicon.loading = new Codicon('loading', { character: '\\eb19' });
        Codicon.location = new Codicon('location', { character: '\\eb1a' });
        Codicon.mailRead = new Codicon('mail-read', { character: '\\eb1b' });
        Codicon.mail = new Codicon('mail', { character: '\\eb1c' });
        Codicon.markdown = new Codicon('markdown', { character: '\\eb1d' });
        Codicon.megaphone = new Codicon('megaphone', { character: '\\eb1e' });
        Codicon.mention = new Codicon('mention', { character: '\\eb1f' });
        Codicon.milestone = new Codicon('milestone', { character: '\\eb20' });
        Codicon.mortarBoard = new Codicon('mortar-board', { character: '\\eb21' });
        Codicon.move = new Codicon('move', { character: '\\eb22' });
        Codicon.multipleWindows = new Codicon('multiple-windows', { character: '\\eb23' });
        Codicon.mute = new Codicon('mute', { character: '\\eb24' });
        Codicon.noNewline = new Codicon('no-newline', { character: '\\eb25' });
        Codicon.note = new Codicon('note', { character: '\\eb26' });
        Codicon.octoface = new Codicon('octoface', { character: '\\eb27' });
        Codicon.openPreview = new Codicon('open-preview', { character: '\\eb28' });
        Codicon.package_ = new Codicon('package', { character: '\\eb29' });
        Codicon.paintcan = new Codicon('paintcan', { character: '\\eb2a' });
        Codicon.pin = new Codicon('pin', { character: '\\eb2b' });
        Codicon.play = new Codicon('play', { character: '\\eb2c' });
        Codicon.run = new Codicon('run', { character: '\\eb2c' });
        Codicon.plug = new Codicon('plug', { character: '\\eb2d' });
        Codicon.preserveCase = new Codicon('preserve-case', { character: '\\eb2e' });
        Codicon.preview = new Codicon('preview', { character: '\\eb2f' });
        Codicon.project = new Codicon('project', { character: '\\eb30' });
        Codicon.pulse = new Codicon('pulse', { character: '\\eb31' });
        Codicon.question = new Codicon('question', { character: '\\eb32' });
        Codicon.quote = new Codicon('quote', { character: '\\eb33' });
        Codicon.radioTower = new Codicon('radio-tower', { character: '\\eb34' });
        Codicon.reactions = new Codicon('reactions', { character: '\\eb35' });
        Codicon.references = new Codicon('references', { character: '\\eb36' });
        Codicon.refresh = new Codicon('refresh', { character: '\\eb37' });
        Codicon.regex = new Codicon('regex', { character: '\\eb38' });
        Codicon.remoteExplorer = new Codicon('remote-explorer', { character: '\\eb39' });
        Codicon.remote = new Codicon('remote', { character: '\\eb3a' });
        Codicon.remove = new Codicon('remove', { character: '\\eb3b' });
        Codicon.replaceAll = new Codicon('replace-all', { character: '\\eb3c' });
        Codicon.replace = new Codicon('replace', { character: '\\eb3d' });
        Codicon.repoClone = new Codicon('repo-clone', { character: '\\eb3e' });
        Codicon.repoForcePush = new Codicon('repo-force-push', { character: '\\eb3f' });
        Codicon.repoPull = new Codicon('repo-pull', { character: '\\eb40' });
        Codicon.repoPush = new Codicon('repo-push', { character: '\\eb41' });
        Codicon.report = new Codicon('report', { character: '\\eb42' });
        Codicon.requestChanges = new Codicon('request-changes', { character: '\\eb43' });
        Codicon.rocket = new Codicon('rocket', { character: '\\eb44' });
        Codicon.rootFolderOpened = new Codicon('root-folder-opened', { character: '\\eb45' });
        Codicon.rootFolder = new Codicon('root-folder', { character: '\\eb46' });
        Codicon.rss = new Codicon('rss', { character: '\\eb47' });
        Codicon.ruby = new Codicon('ruby', { character: '\\eb48' });
        Codicon.saveAll = new Codicon('save-all', { character: '\\eb49' });
        Codicon.saveAs = new Codicon('save-as', { character: '\\eb4a' });
        Codicon.save = new Codicon('save', { character: '\\eb4b' });
        Codicon.screenFull = new Codicon('screen-full', { character: '\\eb4c' });
        Codicon.screenNormal = new Codicon('screen-normal', { character: '\\eb4d' });
        Codicon.searchStop = new Codicon('search-stop', { character: '\\eb4e' });
        Codicon.server = new Codicon('server', { character: '\\eb50' });
        Codicon.settingsGear = new Codicon('settings-gear', { character: '\\eb51' });
        Codicon.settings = new Codicon('settings', { character: '\\eb52' });
        Codicon.shield = new Codicon('shield', { character: '\\eb53' });
        Codicon.smiley = new Codicon('smiley', { character: '\\eb54' });
        Codicon.sortPrecedence = new Codicon('sort-precedence', { character: '\\eb55' });
        Codicon.splitHorizontal = new Codicon('split-horizontal', { character: '\\eb56' });
        Codicon.splitVertical = new Codicon('split-vertical', { character: '\\eb57' });
        Codicon.squirrel = new Codicon('squirrel', { character: '\\eb58' });
        Codicon.starFull = new Codicon('star-full', { character: '\\eb59' });
        Codicon.starHalf = new Codicon('star-half', { character: '\\eb5a' });
        Codicon.symbolClass = new Codicon('symbol-class', { character: '\\eb5b' });
        Codicon.symbolColor = new Codicon('symbol-color', { character: '\\eb5c' });
        Codicon.symbolConstant = new Codicon('symbol-constant', { character: '\\eb5d' });
        Codicon.symbolEnumMember = new Codicon('symbol-enum-member', { character: '\\eb5e' });
        Codicon.symbolField = new Codicon('symbol-field', { character: '\\eb5f' });
        Codicon.symbolFile = new Codicon('symbol-file', { character: '\\eb60' });
        Codicon.symbolInterface = new Codicon('symbol-interface', { character: '\\eb61' });
        Codicon.symbolKeyword = new Codicon('symbol-keyword', { character: '\\eb62' });
        Codicon.symbolMisc = new Codicon('symbol-misc', { character: '\\eb63' });
        Codicon.symbolOperator = new Codicon('symbol-operator', { character: '\\eb64' });
        Codicon.symbolProperty = new Codicon('symbol-property', { character: '\\eb65' });
        Codicon.wrench = new Codicon('wrench', { character: '\\eb65' });
        Codicon.wrenchSubaction = new Codicon('wrench-subaction', { character: '\\eb65' });
        Codicon.symbolSnippet = new Codicon('symbol-snippet', { character: '\\eb66' });
        Codicon.tasklist = new Codicon('tasklist', { character: '\\eb67' });
        Codicon.telescope = new Codicon('telescope', { character: '\\eb68' });
        Codicon.textSize = new Codicon('text-size', { character: '\\eb69' });
        Codicon.threeBars = new Codicon('three-bars', { character: '\\eb6a' });
        Codicon.thumbsdown = new Codicon('thumbsdown', { character: '\\eb6b' });
        Codicon.thumbsup = new Codicon('thumbsup', { character: '\\eb6c' });
        Codicon.tools = new Codicon('tools', { character: '\\eb6d' });
        Codicon.triangleDown = new Codicon('triangle-down', { character: '\\eb6e' });
        Codicon.triangleLeft = new Codicon('triangle-left', { character: '\\eb6f' });
        Codicon.triangleRight = new Codicon('triangle-right', { character: '\\eb70' });
        Codicon.triangleUp = new Codicon('triangle-up', { character: '\\eb71' });
        Codicon.twitter = new Codicon('twitter', { character: '\\eb72' });
        Codicon.unfold = new Codicon('unfold', { character: '\\eb73' });
        Codicon.unlock = new Codicon('unlock', { character: '\\eb74' });
        Codicon.unmute = new Codicon('unmute', { character: '\\eb75' });
        Codicon.unverified = new Codicon('unverified', { character: '\\eb76' });
        Codicon.verified = new Codicon('verified', { character: '\\eb77' });
        Codicon.versions = new Codicon('versions', { character: '\\eb78' });
        Codicon.vmActive = new Codicon('vm-active', { character: '\\eb79' });
        Codicon.vmOutline = new Codicon('vm-outline', { character: '\\eb7a' });
        Codicon.vmRunning = new Codicon('vm-running', { character: '\\eb7b' });
        Codicon.watch = new Codicon('watch', { character: '\\eb7c' });
        Codicon.whitespace = new Codicon('whitespace', { character: '\\eb7d' });
        Codicon.wholeWord = new Codicon('whole-word', { character: '\\eb7e' });
        Codicon.window = new Codicon('window', { character: '\\eb7f' });
        Codicon.wordWrap = new Codicon('word-wrap', { character: '\\eb80' });
        Codicon.zoomIn = new Codicon('zoom-in', { character: '\\eb81' });
        Codicon.zoomOut = new Codicon('zoom-out', { character: '\\eb82' });
        Codicon.listFilter = new Codicon('list-filter', { character: '\\eb83' });
        Codicon.listFlat = new Codicon('list-flat', { character: '\\eb84' });
        Codicon.listSelection = new Codicon('list-selection', { character: '\\eb85' });
        Codicon.selection = new Codicon('selection', { character: '\\eb85' });
        Codicon.listTree = new Codicon('list-tree', { character: '\\eb86' });
        Codicon.debugBreakpointFunctionUnverified = new Codicon('debug-breakpoint-function-unverified', { character: '\\eb87' });
        Codicon.debugBreakpointFunction = new Codicon('debug-breakpoint-function', { character: '\\eb88' });
        Codicon.debugBreakpointFunctionDisabled = new Codicon('debug-breakpoint-function-disabled', { character: '\\eb88' });
        Codicon.debugStackframeActive = new Codicon('debug-stackframe-active', { character: '\\eb89' });
        Codicon.debugStackframeDot = new Codicon('debug-stackframe-dot', { character: '\\eb8a' });
        Codicon.debugStackframe = new Codicon('debug-stackframe', { character: '\\eb8b' });
        Codicon.debugStackframeFocused = new Codicon('debug-stackframe-focused', { character: '\\eb8b' });
        Codicon.debugBreakpointUnsupported = new Codicon('debug-breakpoint-unsupported', { character: '\\eb8c' });
        Codicon.symbolString = new Codicon('symbol-string', { character: '\\eb8d' });
        Codicon.debugReverseContinue = new Codicon('debug-reverse-continue', { character: '\\eb8e' });
        Codicon.debugStepBack = new Codicon('debug-step-back', { character: '\\eb8f' });
        Codicon.debugRestartFrame = new Codicon('debug-restart-frame', { character: '\\eb90' });
        Codicon.callIncoming = new Codicon('call-incoming', { character: '\\eb92' });
        Codicon.callOutgoing = new Codicon('call-outgoing', { character: '\\eb93' });
        Codicon.menu = new Codicon('menu', { character: '\\eb94' });
        Codicon.expandAll = new Codicon('expand-all', { character: '\\eb95' });
        Codicon.feedback = new Codicon('feedback', { character: '\\eb96' });
        Codicon.groupByRefType = new Codicon('group-by-ref-type', { character: '\\eb97' });
        Codicon.ungroupByRefType = new Codicon('ungroup-by-ref-type', { character: '\\eb98' });
        Codicon.account = new Codicon('account', { character: '\\eb99' });
        Codicon.bellDot = new Codicon('bell-dot', { character: '\\eb9a' });
        Codicon.debugConsole = new Codicon('debug-console', { character: '\\eb9b' });
        Codicon.library = new Codicon('library', { character: '\\eb9c' });
        Codicon.output = new Codicon('output', { character: '\\eb9d' });
        Codicon.runAll = new Codicon('run-all', { character: '\\eb9e' });
        Codicon.syncIgnored = new Codicon('sync-ignored', { character: '\\eb9f' });
        Codicon.pinned = new Codicon('pinned', { character: '\\eba0' });
        Codicon.githubInverted = new Codicon('github-inverted', { character: '\\eba1' });
        Codicon.debugAlt = new Codicon('debug-alt', { character: '\\eb91' });
        Codicon.serverProcess = new Codicon('server-process', { character: '\\eba2' });
        Codicon.serverEnvironment = new Codicon('server-environment', { character: '\\eba3' });
        Codicon.pass = new Codicon('pass', { character: '\\eba4' });
        Codicon.stopCircle = new Codicon('stop-circle', { character: '\\eba5' });
        Codicon.playCircle = new Codicon('play-circle', { character: '\\eba6' });
        Codicon.record = new Codicon('record', { character: '\\eba7' });
        Codicon.debugAltSmall = new Codicon('debug-alt-small', { character: '\\eba8' });
        Codicon.vmConnect = new Codicon('vm-connect', { character: '\\eba9' });
        Codicon.cloud = new Codicon('cloud', { character: '\\ebaa' });
        Codicon.merge = new Codicon('merge', { character: '\\ebab' });
        Codicon.exportIcon = new Codicon('export', { character: '\\ebac' });
        Codicon.graphLeft = new Codicon('graph-left', { character: '\\ebad' });
        Codicon.magnet = new Codicon('magnet', { character: '\\ebae' });
        Codicon.notebook = new Codicon('notebook', { character: '\\ebaf' });
        Codicon.redo = new Codicon('redo', { character: '\\ebb0' });
        Codicon.checkAll = new Codicon('check-all', { character: '\\ebb1' });
    })(Codicon = exports.Codicon || (exports.Codicon = {}));
    const escapeCodiconsRegex = /(\\)?\$\([a-z0-9\-]+?(?:~[a-z0-9\-]*?)?\)/gi;
    function escapeCodicons(text) {
        return text.replace(escapeCodiconsRegex, (match, escaped) => escaped ? match : `\\${match}`);
    }
    exports.escapeCodicons = escapeCodicons;
    const markdownEscapedCodiconsRegex = /\\\$\([a-z0-9\-]+?(?:~[a-z0-9\-]*?)?\)/gi;
    function markdownEscapeEscapedCodicons(text) {
        // Need to add an extra \ for escaping in markdown
        return text.replace(markdownEscapedCodiconsRegex, match => `\\${match}`);
    }
    exports.markdownEscapeEscapedCodicons = markdownEscapeEscapedCodicons;
    const markdownUnescapeCodiconsRegex = /(\\)?\$\\\(([a-z0-9\-]+?(?:~[a-z0-9\-]*?)?)\\\)/gi;
    function markdownUnescapeCodicons(text) {
        return text.replace(markdownUnescapeCodiconsRegex, (match, escaped, codicon) => escaped ? match : `$(${codicon})`);
    }
    exports.markdownUnescapeCodicons = markdownUnescapeCodicons;
    const stripCodiconsRegex = /(\s)?(\\)?\$\([a-z0-9\-]+?(?:~[a-z0-9\-]*?)?\)(\s)?/gi;
    function stripCodicons(text) {
        if (text.indexOf(codicon_1.codiconStartMarker) === -1) {
            return text;
        }
        return text.replace(stripCodiconsRegex, (match, preWhitespace, escaped, postWhitespace) => escaped ? match : preWhitespace || postWhitespace || '');
    }
    exports.stripCodicons = stripCodicons;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[39/*vs/base/parts/contextmenu/common/contextmenu*/], __M([0/*require*/,1/*exports*/]), function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CONTEXT_MENU_CLOSE_CHANNEL = exports.CONTEXT_MENU_CHANNEL = void 0;
    exports.CONTEXT_MENU_CHANNEL = 'vscode:contextmenu';
    exports.CONTEXT_MENU_CLOSE_CHANNEL = 'vscode:onCloseContextMenu';
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[17/*vs/base/parts/ipc/common/ipc*/], __M([0/*require*/,1/*exports*/,3/*vs/base/common/event*/,4/*vs/base/common/lifecycle*/,15/*vs/base/common/async*/,14/*vs/base/common/cancellation*/,5/*vs/base/common/errors*/,10/*vs/base/common/buffer*/,20/*vs/base/common/arrays*/,31/*vs/base/common/types*/,32/*vs/base/common/marshalling*/,6/*vs/base/common/strings*/]), function (require, exports, event_1, lifecycle_1, async_1, cancellation_1, errors, buffer_1, arrays_1, types_1, marshalling_1, strings) {
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

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[40/*vs/base/parts/ipc/common/ipc.electron*/], __M([0/*require*/,1/*exports*/]), function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Protocol = void 0;
    class Protocol {
        constructor(sender, onMessage) {
            this.sender = sender;
            this.onMessage = onMessage;
        }
        send(message) {
            try {
                this.sender.send('vscode:message', message.buffer);
            }
            catch (e) {
                // systems are going down
            }
        }
        dispose() {
            this.sender.send('vscode:disconnect', null);
        }
    }
    exports.Protocol = Protocol;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[9/*vs/base/parts/sandbox/electron-sandbox/globals*/], __M([0/*require*/,1/*exports*/,2/*vs/base/common/platform*/]), function (require, exports, platform_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.context = exports.process = exports.crashReporter = exports.webFrame = exports.ipcRenderer = void 0;
    exports.ipcRenderer = platform_1.globals.vscode.ipcRenderer;
    exports.webFrame = platform_1.globals.vscode.webFrame;
    exports.crashReporter = platform_1.globals.vscode.crashReporter;
    exports.process = platform_1.globals.vscode.process;
    exports.context = platform_1.globals.vscode.context;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[41/*vs/base/parts/contextmenu/electron-sandbox/contextmenu*/], __M([0/*require*/,1/*exports*/,9/*vs/base/parts/sandbox/electron-sandbox/globals*/,39/*vs/base/parts/contextmenu/common/contextmenu*/]), function (require, exports, globals_1, contextmenu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.popup = void 0;
    let contextMenuIdPool = 0;
    function popup(items, options, onHide) {
        const processedItems = [];
        const contextMenuId = contextMenuIdPool++;
        const onClickChannel = `vscode:onContextMenu${contextMenuId}`;
        const onClickChannelHandler = (event, itemId, context) => {
            const item = processedItems[itemId];
            if (item.click) {
                item.click(context);
            }
        };
        globals_1.ipcRenderer.once(onClickChannel, onClickChannelHandler);
        globals_1.ipcRenderer.once(contextmenu_1.CONTEXT_MENU_CLOSE_CHANNEL, (event, closedContextMenuId) => {
            if (closedContextMenuId !== contextMenuId) {
                return;
            }
            globals_1.ipcRenderer.removeListener(onClickChannel, onClickChannelHandler);
            if (onHide) {
                onHide();
            }
        });
        globals_1.ipcRenderer.send(contextmenu_1.CONTEXT_MENU_CHANNEL, contextMenuId, items.map(item => createItem(item, processedItems)), onClickChannel, options);
    }
    exports.popup = popup;
    function createItem(item, processedItems) {
        const serializableItem = {
            id: processedItems.length,
            label: item.label,
            type: item.type,
            accelerator: item.accelerator,
            checked: item.checked,
            enabled: typeof item.enabled === 'boolean' ? item.enabled : true,
            visible: typeof item.visible === 'boolean' ? item.visible : true
        };
        processedItems.push(item);
        // Submenu
        if (Array.isArray(item.submenu)) {
            serializableItem.submenu = item.submenu.map(submenuItem => createItem(submenuItem, processedItems));
        }
        return serializableItem;
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[42/*vs/base/parts/ipc/electron-sandbox/ipc.electron-sandbox*/], __M([0/*require*/,1/*exports*/,3/*vs/base/common/event*/,17/*vs/base/parts/ipc/common/ipc*/,40/*vs/base/parts/ipc/common/ipc.electron*/,10/*vs/base/common/buffer*/,9/*vs/base/parts/sandbox/electron-sandbox/globals*/]), function (require, exports, event_1, ipc_1, ipc_electron_1, buffer_1, globals_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Client = void 0;
    class Client extends ipc_1.IPCClient {
        constructor(id) {
            const protocol = Client.createProtocol();
            super(protocol, id);
            this.protocol = protocol;
        }
        static createProtocol() {
            const onMessage = event_1.Event.fromNodeEventEmitter(globals_1.ipcRenderer, 'vscode:message', (_, message) => buffer_1.VSBuffer.wrap(message));
            globals_1.ipcRenderer.send('vscode:hello');
            return new ipc_electron_1.Protocol(globals_1.ipcRenderer, onMessage);
        }
        dispose() {
            this.protocol.dispose();
        }
    }
    exports.Client = Client;
});

define(__m[43/*vs/css!vs/base/browser/ui/codicons/codicon/codicon*/], __M([12/*vs/css!vs/code/electron-sandbox/processExplorer/processExplorerMain*/]), {});
define(__m[44/*vs/css!vs/base/browser/ui/codicons/codicon/codicon-animations*/], __M([12/*vs/css!vs/code/electron-sandbox/processExplorer/processExplorerMain*/]), {});
define(__m[45/*vs/css!vs/base/browser/ui/codicons/codicon/codicon-modifications*/], __M([12/*vs/css!vs/code/electron-sandbox/processExplorer/processExplorerMain*/]), {});
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[46/*vs/base/browser/ui/codicons/codiconStyles*/], __M([0/*require*/,1/*exports*/,38/*vs/base/common/codicons*/,43/*vs/css!vs/base/browser/ui/codicons/codicon/codicon*/,45/*vs/css!vs/base/browser/ui/codicons/codicon/codicon-modifications*/,44/*vs/css!vs/base/browser/ui/codicons/codicon/codicon-animations*/]), function (require, exports, codicons_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.formatRule = exports.CodiconStyles = void 0;
    exports.CodiconStyles = new class {
        constructor() {
            this.onDidChange = codicons_1.iconRegistry.onDidRegister;
        }
        getCSS() {
            const rules = [];
            for (let c of codicons_1.iconRegistry.all) {
                rules.push(formatRule(c));
            }
            return rules.join('\n');
        }
    };
    function formatRule(c) {
        let def = c.definition;
        while (def instanceof codicons_1.Codicon) {
            def = def.definition;
        }
        return `.codicon-${c.id}:before { content: '${def.character}'; }`;
    }
    exports.formatRule = formatRule;
});

define(__m[47/*vs/css!vs/code/electron-sandbox/processExplorer/media/processExplorer*/], __M([12/*vs/css!vs/code/electron-sandbox/processExplorer/processExplorerMain*/]), {});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[48/*vs/platform/diagnostics/common/diagnostics*/], __M([0/*require*/,1/*exports*/]), function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isRemoteDiagnosticError = void 0;
    function isRemoteDiagnosticError(x) {
        return !!x.hostName && !!x.errorMessage;
    }
    exports.isRemoteDiagnosticError = isRemoteDiagnosticError;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[49/*vs/platform/instantiation/common/instantiation*/], __M([0/*require*/,1/*exports*/]), function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.optional = exports.createDecorator = exports.IInstantiationService = exports._util = void 0;
    // ------ internal util
    var _util;
    (function (_util) {
        _util.serviceIds = new Map();
        _util.DI_TARGET = '$di$target';
        _util.DI_DEPENDENCIES = '$di$dependencies';
        function getServiceDependencies(ctor) {
            return ctor[_util.DI_DEPENDENCIES] || [];
        }
        _util.getServiceDependencies = getServiceDependencies;
    })(_util = exports._util || (exports._util = {}));
    exports.IInstantiationService = createDecorator('instantiationService');
    function storeServiceDependency(id, target, index, optional) {
        if (target[_util.DI_TARGET] === target) {
            target[_util.DI_DEPENDENCIES].push({ id, index, optional });
        }
        else {
            target[_util.DI_DEPENDENCIES] = [{ id, index, optional }];
            target[_util.DI_TARGET] = target;
        }
    }
    /**
     * The *only* valid way to create a {{ServiceIdentifier}}.
     */
    function createDecorator(serviceId) {
        if (_util.serviceIds.has(serviceId)) {
            return _util.serviceIds.get(serviceId);
        }
        const id = function (target, key, index) {
            if (arguments.length !== 3) {
                throw new Error('@IServiceName-decorator can only be used to decorate a parameter');
            }
            storeServiceDependency(id, target, index, false);
        };
        id.toString = () => serviceId;
        _util.serviceIds.set(serviceId, id);
        return id;
    }
    exports.createDecorator = createDecorator;
    /**
     * Mark a service dependency as optional.
     */
    function optional(serviceIdentifier) {
        return function (target, key, index) {
            if (arguments.length !== 3) {
                throw new Error('@optional-decorator can only be used to decorate a parameter');
            }
            storeServiceDependency(serviceIdentifier, target, index, true);
        };
    }
    exports.optional = optional;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[18/*vs/platform/ipc/electron-sandbox/mainProcessService*/], __M([0/*require*/,1/*exports*/,42/*vs/base/parts/ipc/electron-sandbox/ipc.electron-sandbox*/,4/*vs/base/common/lifecycle*/,49/*vs/platform/instantiation/common/instantiation*/]), function (require, exports, ipc_electron_sandbox_1, lifecycle_1, instantiation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MainProcessService = exports.IMainProcessService = void 0;
    exports.IMainProcessService = instantiation_1.createDecorator('mainProcessService');
    class MainProcessService extends lifecycle_1.Disposable {
        constructor(windowId) {
            super();
            this.mainProcessConnection = this._register(new ipc_electron_sandbox_1.Client(`window:${windowId}`));
        }
        getChannel(channelName) {
            return this.mainProcessConnection.getChannel(channelName);
        }
        registerChannel(channelName, channel) {
            this.mainProcessConnection.registerChannel(channelName, channel);
        }
    }
    exports.MainProcessService = MainProcessService;
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
define(__m[50/*vs/platform/native/electron-sandbox/nativeHostService*/], __M([0/*require*/,1/*exports*/,18/*vs/platform/ipc/electron-sandbox/mainProcessService*/,17/*vs/base/parts/ipc/common/ipc*/]), function (require, exports, mainProcessService_1, ipc_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NativeHostService = void 0;
    // @ts-ignore: interface is implemented via proxy
    let NativeHostService = class NativeHostService {
        constructor(windowId, mainProcessService) {
            this.windowId = windowId;
            return ipc_1.createChannelSender(mainProcessService.getChannel('nativeHost'), {
                context: windowId,
                properties: (() => {
                    const properties = new Map();
                    properties.set('windowId', windowId);
                    return properties;
                })()
            });
        }
    };
    NativeHostService = __decorate([
        __param(1, mainProcessService_1.IMainProcessService)
    ], NativeHostService);
    exports.NativeHostService = NativeHostService;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[51/*vs/platform/windows/common/windows*/], __M([0/*require*/,1/*exports*/,2/*vs/base/common/platform*/]), function (require, exports, platform_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.zoomLevelToZoomFactor = exports.getTitleBarStyle = exports.getMenuBarVisibility = exports.isFileToOpen = exports.isFolderToOpen = exports.isWorkspaceToOpen = exports.WindowMinimumSize = void 0;
    exports.WindowMinimumSize = {
        WIDTH: 400,
        WIDTH_WITH_VERTICAL_PANEL: 600,
        HEIGHT: 270
    };
    function isWorkspaceToOpen(uriToOpen) {
        return !!uriToOpen.workspaceUri;
    }
    exports.isWorkspaceToOpen = isWorkspaceToOpen;
    function isFolderToOpen(uriToOpen) {
        return !!uriToOpen.folderUri;
    }
    exports.isFolderToOpen = isFolderToOpen;
    function isFileToOpen(uriToOpen) {
        return !!uriToOpen.fileUri;
    }
    exports.isFileToOpen = isFileToOpen;
    function getMenuBarVisibility(configurationService, environment, isExtensionDevelopment = environment.isExtensionDevelopment) {
        const titleBarStyle = getTitleBarStyle(configurationService, environment, isExtensionDevelopment);
        const menuBarVisibility = configurationService.getValue('window.menuBarVisibility');
        if (titleBarStyle === 'native' && menuBarVisibility === 'compact') {
            return 'default';
        }
        else {
            return menuBarVisibility;
        }
    }
    exports.getMenuBarVisibility = getMenuBarVisibility;
    function getTitleBarStyle(configurationService, environment, isExtensionDevelopment = environment.isExtensionDevelopment) {
        if (platform_1.isWeb) {
            return 'custom';
        }
        const configuration = configurationService.getValue('window');
        const isDev = !environment.isBuilt || isExtensionDevelopment;
        if (platform_1.isMacintosh && isDev) {
            return 'native'; // not enabled when developing due to https://github.com/electron/electron/issues/3647
        }
        if (configuration) {
            const useNativeTabs = platform_1.isMacintosh && configuration.nativeTabs === true;
            if (useNativeTabs) {
                return 'native'; // native tabs on sierra do not work with custom title style
            }
            const useSimpleFullScreen = platform_1.isMacintosh && configuration.nativeFullScreen === false;
            if (useSimpleFullScreen) {
                return 'native'; // simple fullscreen does not work well with custom title style (https://github.com/microsoft/vscode/issues/63291)
            }
            const style = configuration.titleBarStyle;
            if (style === 'native' || style === 'custom') {
                return style;
            }
        }
        return platform_1.isLinux ? 'native' : 'custom'; // default to custom on all macOS and Windows
    }
    exports.getTitleBarStyle = getTitleBarStyle;
    /**
     * According to Electron docs: `scale := 1.2 ^ level`.
     * https://github.com/electron/electron/blob/master/docs/api/web-contents.md#contentssetzoomlevellevel
     */
    function zoomLevelToZoomFactor(zoomLevel = 0) {
        return Math.pow(1.2, zoomLevel);
    }
    exports.zoomLevelToZoomFactor = zoomLevelToZoomFactor;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[52/*vs/platform/windows/electron-sandbox/window*/], __M([0/*require*/,1/*exports*/,9/*vs/base/parts/sandbox/electron-sandbox/globals*/,51/*vs/platform/windows/common/windows*/,7/*vs/base/browser/browser*/]), function (require, exports, globals_1, windows_1, browser_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.zoomOut = exports.zoomIn = exports.applyZoom = void 0;
    /**
     * Apply a zoom level to the window. Also sets it in our in-memory
     * browser helper so that it can be accessed in non-electron layers.
     */
    function applyZoom(zoomLevel) {
        globals_1.webFrame.setZoomLevel(zoomLevel);
        browser_1.setZoomFactor(windows_1.zoomLevelToZoomFactor(zoomLevel));
        // Cannot be trusted because the webFrame might take some time
        // until it really applies the new zoom level
        // See https://github.com/microsoft/vscode/issues/26151
        browser_1.setZoomLevel(zoomLevel, false /* isTrusted */);
    }
    exports.applyZoom = applyZoom;
    function zoomIn() {
        applyZoom(browser_1.getZoomLevel() + 1);
    }
    exports.zoomIn = zoomIn;
    function zoomOut() {
        applyZoom(browser_1.getZoomLevel() - 1);
    }
    exports.zoomOut = zoomOut;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[53/*vs/code/electron-sandbox/processExplorer/processExplorerMain*/], __M([0/*require*/,1/*exports*/,50/*vs/platform/native/electron-sandbox/nativeHostService*/,9/*vs/base/parts/sandbox/electron-sandbox/globals*/,54/*vs/nls!vs/code/electron-sandbox/processExplorer/processExplorerMain*/,52/*vs/platform/windows/electron-sandbox/window*/,41/*vs/base/parts/contextmenu/electron-sandbox/contextmenu*/,11/*vs/base/browser/dom*/,4/*vs/base/common/lifecycle*/,48/*vs/platform/diagnostics/common/diagnostics*/,18/*vs/platform/ipc/electron-sandbox/mainProcessService*/,34/*vs/base/browser/ui/codicons/codiconLabel*/,47/*vs/css!vs/code/electron-sandbox/processExplorer/media/processExplorer*/,46/*vs/base/browser/ui/codicons/codiconStyles*/]), function (require, exports, nativeHostService_1, globals_1, nls_1, window_1, contextmenu_1, dom_1, lifecycle_1, diagnostics_1, mainProcessService_1, codiconLabel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.startup = void 0;
    const DEBUG_FLAGS_PATTERN = /\s--(inspect|debug)(-brk|port)?=(\d+)?/;
    const DEBUG_PORT_PATTERN = /\s--(inspect|debug)-port=(\d+)/;
    class ProcessExplorer {
        constructor(windowId, data) {
            this.data = data;
            this.collapsedStateCache = new Map();
            this.mapPidToWindowTitle = new Map();
            this.listeners = new lifecycle_1.DisposableStore();
            const mainProcessService = new mainProcessService_1.MainProcessService(windowId);
            this.nativeHostService = new nativeHostService_1.NativeHostService(windowId, mainProcessService);
            this.applyStyles(data.styles);
            // Map window process pids to titles, annotate process names with this when rendering to distinguish between them
            globals_1.ipcRenderer.on('vscode:windowsInfoResponse', (event, windows) => {
                this.mapPidToWindowTitle = new Map();
                windows.forEach(window => this.mapPidToWindowTitle.set(window.pid, window.title));
            });
            globals_1.ipcRenderer.on('vscode:listProcessesResponse', (event, processRoots) => {
                this.updateProcessInfo(processRoots);
                this.requestProcessList(0);
            });
            this.lastRequestTime = Date.now();
            globals_1.ipcRenderer.send('vscode:windowsInfoRequest');
            globals_1.ipcRenderer.send('vscode:listProcesses');
        }
        getProcessList(rootProcess, isLocal, totalMem) {
            const processes = [];
            if (rootProcess) {
                this.getProcessItem(processes, rootProcess, 0, isLocal, totalMem);
            }
            return processes;
        }
        getProcessItem(processes, item, indent, isLocal, totalMem) {
            const isRoot = (indent === 0);
            const MB = 1024 * 1024;
            let name = item.name;
            if (isRoot) {
                name = isLocal ? `${this.data.applicationName} main` : 'remote agent';
            }
            if (name === 'window') {
                const windowTitle = this.mapPidToWindowTitle.get(item.pid);
                name = windowTitle !== undefined ? `${name} (${this.mapPidToWindowTitle.get(item.pid)})` : name;
            }
            // Format name with indent
            const formattedName = isRoot ? name : `${'    '.repeat(indent)} ${name}`;
            const memory = this.data.platform === 'win32' ? item.mem : (totalMem * (item.mem / 100));
            processes.push({
                cpu: item.load,
                memory: (memory / MB),
                pid: item.pid.toFixed(0),
                name,
                formattedName,
                cmd: item.cmd
            });
            // Recurse into children if any
            if (Array.isArray(item.children)) {
                item.children.forEach(child => {
                    if (child) {
                        this.getProcessItem(processes, child, indent + 1, isLocal, totalMem);
                    }
                });
            }
        }
        isDebuggable(cmd) {
            const matches = DEBUG_FLAGS_PATTERN.exec(cmd);
            return (matches && matches.length >= 2) || cmd.indexOf('node ') >= 0 || cmd.indexOf('node.exe') >= 0;
        }
        attachTo(item) {
            const config = {
                type: 'node',
                request: 'attach',
                name: `process ${item.pid}`
            };
            let matches = DEBUG_FLAGS_PATTERN.exec(item.cmd);
            if (matches && matches.length >= 2) {
                // attach via port
                if (matches.length === 4 && matches[3]) {
                    config.port = parseInt(matches[3]);
                }
                config.protocol = matches[1] === 'debug' ? 'legacy' : 'inspector';
            }
            else {
                // no port -> try to attach via pid (send SIGUSR1)
                config.processId = String(item.pid);
            }
            // a debug-port=n or inspect-port=n overrides the port
            matches = DEBUG_PORT_PATTERN.exec(item.cmd);
            if (matches && matches.length === 3) {
                // override port
                config.port = parseInt(matches[2]);
            }
            globals_1.ipcRenderer.send('vscode:workbenchCommand', { id: 'debug.startFromConfig', from: 'processExplorer', args: [config] });
        }
        getProcessIdWithHighestProperty(processList, propertyName) {
            let max = 0;
            let maxProcessId;
            processList.forEach(process => {
                if (process[propertyName] > max) {
                    max = process[propertyName];
                    maxProcessId = process.pid;
                }
            });
            return maxProcessId;
        }
        updateSectionCollapsedState(shouldExpand, body, twistie, sectionName) {
            if (shouldExpand) {
                body.classList.remove('hidden');
                this.collapsedStateCache.set(sectionName, false);
                twistie.text = '$(chevron-down)';
            }
            else {
                body.classList.add('hidden');
                this.collapsedStateCache.set(sectionName, true);
                twistie.text = '$(chevron-right)';
            }
        }
        renderProcessFetchError(sectionName, errorMessage) {
            const container = document.getElementById('process-list');
            if (!container) {
                return;
            }
            const body = document.createElement('tbody');
            this.renderProcessGroupHeader(sectionName, body, container);
            const errorRow = document.createElement('tr');
            const data = document.createElement('td');
            data.textContent = errorMessage;
            data.className = 'error';
            data.colSpan = 4;
            errorRow.appendChild(data);
            body.appendChild(errorRow);
            container.appendChild(body);
        }
        renderProcessGroupHeader(sectionName, body, container) {
            const headerRow = document.createElement('tr');
            const headerData = document.createElement('td');
            headerData.colSpan = 4;
            headerRow.appendChild(headerData);
            const headerContainer = document.createElement('div');
            headerContainer.className = 'header';
            headerData.appendChild(headerContainer);
            const twistieContainer = document.createElement('div');
            const twistieCodicon = new codiconLabel_1.CodiconLabel(twistieContainer);
            this.updateSectionCollapsedState(!this.collapsedStateCache.get(sectionName), body, twistieCodicon, sectionName);
            headerContainer.appendChild(twistieContainer);
            const headerLabel = document.createElement('span');
            headerLabel.textContent = sectionName;
            headerContainer.appendChild(headerLabel);
            this.listeners.add(dom_1.addDisposableListener(headerData, 'click', (e) => {
                const isHidden = body.classList.contains('hidden');
                this.updateSectionCollapsedState(isHidden, body, twistieCodicon, sectionName);
            }));
            container.appendChild(headerRow);
        }
        renderTableSection(sectionName, processList, renderManySections, sectionIsLocal) {
            const container = document.getElementById('process-list');
            if (!container) {
                return;
            }
            const highestCPUProcess = this.getProcessIdWithHighestProperty(processList, 'cpu');
            const highestMemoryProcess = this.getProcessIdWithHighestProperty(processList, 'memory');
            const body = document.createElement('tbody');
            if (renderManySections) {
                this.renderProcessGroupHeader(sectionName, body, container);
            }
            processList.forEach(p => {
                const row = document.createElement('tr');
                row.id = p.pid.toString();
                const cpu = document.createElement('td');
                p.pid === highestCPUProcess
                    ? cpu.classList.add('centered', 'highest')
                    : cpu.classList.add('centered');
                cpu.textContent = p.cpu.toFixed(0);
                const memory = document.createElement('td');
                p.pid === highestMemoryProcess
                    ? memory.classList.add('centered', 'highest')
                    : memory.classList.add('centered');
                memory.textContent = p.memory.toFixed(0);
                const pid = document.createElement('td');
                pid.classList.add('centered');
                pid.textContent = p.pid;
                const name = document.createElement('th');
                name.scope = 'row';
                name.classList.add('data');
                name.title = p.cmd;
                name.textContent = p.formattedName;
                row.append(cpu, memory, pid, name);
                this.listeners.add(dom_1.addDisposableListener(row, 'contextmenu', (e) => {
                    this.showContextMenu(e, p, sectionIsLocal);
                }));
                body.appendChild(row);
            });
            container.appendChild(body);
        }
        async updateProcessInfo(processLists) {
            const container = document.getElementById('process-list');
            if (!container) {
                return;
            }
            container.innerText = '';
            this.listeners.clear();
            const tableHead = dom_1.$('thead', undefined);
            const row = dom_1.$('tr');
            tableHead.append(row);
            row.append(dom_1.$('th.cpu', { scope: 'col' }, nls_1.localize(0, null)));
            row.append(dom_1.$('th.memory', { scope: 'col' }, nls_1.localize(1, null)));
            row.append(dom_1.$('th.pid', { scope: 'col' }, nls_1.localize(2, null)));
            row.append(dom_1.$('th.nameLabel', { scope: 'col' }, nls_1.localize(3, null)));
            container.append(tableHead);
            const hasMultipleMachines = Object.keys(processLists).length > 1;
            const { totalmem } = await this.nativeHostService.getOSStatistics();
            processLists.forEach((remote, i) => {
                const isLocal = i === 0;
                if (diagnostics_1.isRemoteDiagnosticError(remote.rootProcess)) {
                    this.renderProcessFetchError(remote.name, remote.rootProcess.errorMessage);
                }
                else {
                    this.renderTableSection(remote.name, this.getProcessList(remote.rootProcess, isLocal, totalmem), hasMultipleMachines, isLocal);
                }
            });
        }
        applyStyles(styles) {
            const styleTag = document.createElement('style');
            const content = [];
            if (styles.hoverBackground) {
                content.push(`tbody > tr:hover, table > tr:hover  { background-color: ${styles.hoverBackground}; }`);
            }
            if (styles.hoverForeground) {
                content.push(`tbody > tr:hover, table > tr:hover { color: ${styles.hoverForeground}; }`);
            }
            if (styles.highlightForeground) {
                content.push(`.highest { color: ${styles.highlightForeground}; }`);
            }
            styleTag.innerHTML = content.join('\n');
            if (document.head) {
                document.head.appendChild(styleTag);
            }
            if (styles.color) {
                document.body.style.color = styles.color;
            }
        }
        showContextMenu(e, item, isLocal) {
            e.preventDefault();
            const items = [];
            const pid = Number(item.pid);
            if (isLocal) {
                items.push({
                    label: nls_1.localize(4, null),
                    click: () => {
                        this.nativeHostService.killProcess(pid, 'SIGTERM');
                    }
                });
                items.push({
                    label: nls_1.localize(5, null),
                    click: () => {
                        this.nativeHostService.killProcess(pid, 'SIGKILL');
                    }
                });
                items.push({
                    type: 'separator'
                });
            }
            items.push({
                label: nls_1.localize(6, null),
                click: () => {
                    const row = document.getElementById(pid.toString());
                    if (row) {
                        this.nativeHostService.writeClipboardText(row.innerText);
                    }
                }
            });
            items.push({
                label: nls_1.localize(7, null),
                click: () => {
                    const processList = document.getElementById('process-list');
                    if (processList) {
                        this.nativeHostService.writeClipboardText(processList.innerText);
                    }
                }
            });
            if (item && isLocal && this.isDebuggable(item.cmd)) {
                items.push({
                    type: 'separator'
                });
                items.push({
                    label: nls_1.localize(8, null),
                    click: () => {
                        this.attachTo(item);
                    }
                });
            }
            contextmenu_1.popup(items);
        }
        requestProcessList(totalWaitTime) {
            setTimeout(() => {
                const nextRequestTime = Date.now();
                const waited = totalWaitTime + nextRequestTime - this.lastRequestTime;
                this.lastRequestTime = nextRequestTime;
                // Wait at least a second between requests.
                if (waited > 1000) {
                    globals_1.ipcRenderer.send('vscode:windowsInfoRequest');
                    globals_1.ipcRenderer.send('vscode:listProcesses');
                }
                else {
                    this.requestProcessList(waited);
                }
            }, 200);
        }
        dispose() {
            this.listeners.dispose();
        }
    }
    function startup(windowId, data) {
        const platformClass = data.platform === 'win32' ? 'windows' : data.platform === 'linux' ? 'linux' : 'mac';
        document.body.classList.add(platformClass); // used by our fonts
        window_1.applyZoom(data.zoomLevel);
        const processExplorer = new ProcessExplorer(windowId, data);
        document.onkeydown = (e) => {
            const cmdOrCtrlKey = data.platform === 'darwin' ? e.metaKey : e.ctrlKey;
            // Cmd/Ctrl + w closes issue window
            if (cmdOrCtrlKey && e.keyCode === 87) {
                e.stopPropagation();
                e.preventDefault();
                processExplorer.dispose();
                globals_1.ipcRenderer.send('vscode:closeProcessExplorer');
            }
            // Cmd/Ctrl + zooms in
            if (cmdOrCtrlKey && e.keyCode === 187) {
                window_1.zoomIn();
            }
            // Cmd/Ctrl - zooms out
            if (cmdOrCtrlKey && e.keyCode === 189) {
                window_1.zoomOut();
            }
        };
    }
    exports.startup = startup;
});

}).call(this);
//# sourceMappingURL=processExplorerMain.js.map
