yaktrak
=======

Polls yik yak for a chosen school, and reverse-geocodes the coordinates into the estimated address of posting. Lat/long weren't super perfectly accurate after several tests, but by no means can this be considered an "anonymous" app.

**To use:**

Get a google geocode API key, then in config.js set:

* Your API key
* School you want to track
* Local mongodb url

I hacked this together fairly quickly, so there is a memory overflow problem I didn't fix, but the proof of concept was successful.

### Update: ###

It appears their API has changed in the last two months, so it no longer works. I'm not going to pursue figuring out the new one, so here's an old screenshot to demonstrate what it did:

![Yik Yak](https://cloud.githubusercontent.com/assets/1849508/5326599/473bfc24-7cd6-11e4-90d4-05bdbc892332.png)
