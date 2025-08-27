import * as functions from 'firebase-functions';

// @ts-ignore
import { app } from '../../dist/Music/server/server.mjs';

// The function is a simple wrapper that hands the request off to the Express app
// exported by Angular. This is the new, streamlined method.
exports.ssr = functions.https.onRequest(app);
