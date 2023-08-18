class GLPixy {
  constructor(off, size, img, pixSize, fbo, rdr = window, canvas = _renderer, gl = drawingContext) {
    this.gl = gl;
    this.off = off;
    this.size = size;
    this.res = img.res;
    this.img = img;
    this.pixSize = pixSize;
    this.fbo = fbo;
    this.loadPixels();
    this.rdr = rdr;
    this.canvas = canvas;
  }

  linkFBO() {
    this.fbo.linkTexture2D(this.gl.COLOR_ATTACHMENT0, this.img.bufType, this.img.tex, this.img.level);
  }

  loadPixels() {
    this.fbo.readPixels(0, 0, this.img.res[0], this.img.res[1], this.img.srcFormat, this.img.srcType, this.img.pixel);
  }

  updatePixels() {    
    this.img.subData(this.img.level, 0, 0, this.img.res[0], this.img.res[1], this.img.srcFormat, this.img.srcType, this.img.pixel);
  }

  setInterpolation(min, mag) {
    this.img.paramI(this.gl.TEXTURE_MAG_FILTER, min);
    this.img.paramI(this.gl.TEXTURE_MIN_FILTER, mag);
  }

  getPixPos(loc) {
    return (loc[0] + this.img.res[0] * loc[1]) * this.pixSize;
  }

  getPixel(loc) {
    const pixPos = this.getPixPos(loc);
    const pix = new Array(this.pixSize);
    for (let i = 0; i < this.pixSize; i++)
      pix[i] = this.img.pixel[pixPos + i];
    return pix;
  }

  setPixel(loc, col) {
    const pixPos = this.getPixPos(loc);
    for (let i = 0; i < this.pixSize; i++)
      this.img.pixel[pixPos + i] = col[i];
  }

  clear() {
    this.gl.clear(gl.COLOR_BUFFER_BIT);
  }

  display(shad) {
    this.img.setUniform(shad._glProgram, "uSampler");
    this.rdr.rect(this.off[0], this.off[1], this.size[0], this.size[1]);
  }
}
