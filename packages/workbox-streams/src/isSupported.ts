/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

import './_version.js';

let cachedIsSupported: boolean | undefined;

/**
 * This is a utility method that determines whether the current browser supports
 * the features required to create streamed responses. Currently, it checks if
 * [`ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/ReadableStream)
 * can be created.
 *
 * @return {boolean} `true`, if the current browser meets the requirements for
 * streaming responses, and `false` otherwise.
 *
 * @memberof workbox.streams
 */
function isSupported(): boolean {
  if (cachedIsSupported === undefined) {
    // See https://github.com/GoogleChrome/workbox/issues/1473
    try {
      new ReadableStream({start() {}});
      cachedIsSupported = true;
    } catch (error) {
      cachedIsSupported = false;
    }
  }

  return cachedIsSupported;
}

export {isSupported};
