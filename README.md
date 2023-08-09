# GLPixyp5js
Pixy from Wireframe, but for p5js's WebGL mode (although it can be used with pure WebGL or libraries that can interact with pure WebGL)

Pixy (Credit to Nyaaborn for the name, you can find his github here: https://github.com/Nyaaboron) from Wireframe, but for p5js's WebGL mode

Pixyp5js is a version of [Pixy](https://github.com/RandomGamingDev/Wireframe/blob/main/Extensions/Pixy.h) (which is for the [Wireframe](https://github.com/RandomGamingDev/Wireframe)), but for p5js!

It's also based on this version of [Pixy](https://github.com/RandomGamingDev/Pixyp5js) designed for both p5.js's canvas and WebGL modes, which is heavily limited due to having to work with both, which is why I created this version specifically for WebGL!

This library's class's structure is similar in nature to that of the version of [pixy](https://github.com/RandomGamingDev/Pixyp5js) previously talked about and expects you to bind and unbind everything as well as set variables like the `gl.UNPACK_ALIGNMENT` and `gl.PACK_ALIGNMENT` yourself as well as allocate the bytes on the CPU for the texture uploading and loading.

The only part of this library that's p5.js specific is the `display()` function so you can use this with any other library that can interact with raw WebGL.

To use the library simply create a new instance of the pixy class with the offset, size and resolution (they're all arrays with 2 elements) and the texture and fbo that are being used and then just change the Pixy.pixels array via Pixy.setPixel(), update the pixel buffer via Pixy.updatePixels() and execute Pixy.display() in order to display.

This library expects the [WebGL2Tex](https://github.com/RandomGamingDev/WebGL2Tex) and [WebGL2FBO](https://github.com/RandomGamingDev/WebGL2FBO) libraries which are there to make things easier. This library also expects that you either use a version of p5.js newer or the same as `1.7.0` or that you use [WebGL2p5](https://github.com/RandomGamingDev/WebGL2p5) to add it to older versions.

To use it you can simply include https://cdn.jsdelivr.net/gh/RandomGamingDev/GLPixyp5js/pixy.js in your HTML file! If you want to you can also just download the file and include it in your HTML file that way.

btw stuff updates so remember to specify a version/commit for your library if you want to use a link and don't want your code to automatically update to the newest version of the library
