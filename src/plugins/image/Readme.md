Image plugin
====
A simple client side plugin to display arbitrary images from ze interwebs

Datasource config
--
This plugin does not require a server side config.

Client-side config
--
The config is very simple, you provide the src for the image (an url) and the width and height.  You can set an updateInterval if you need the image to be refreshed, you can set the interval to -1 to disable the odashboard-update.

```
{
  plugin: "image",
  src: "http://gfx.nrk.no/1Mm7ORnX03oot9LiCWFW8AUa6EB6XNteXjfB7JAL6D4A",
  width: 1600,
  height: 250,
  updateInterval: 2000
}
```
