yaktrak
=======

Polls yik yak for a chosen school, and reverse-geocodes the coordinates into the estimated address of posting. Lat/long weren't super perfectly accurate after several tests, but by no means can this be considered an "anonymous" app.

**To use:**

Get a google geocode API key, then in config.js set:

* Your API key
* School you want to track
* Local mongodb url

I hacked this together fairly quickly, so there is a memory overflow problem I didn't fix, but the proof of concept was successful.
