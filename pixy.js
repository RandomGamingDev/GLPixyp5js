class GLPixy {
  constructor(off, size, img, pixSize, fbo, link = true, rdr = window, canvas = _renderer, gl = drawingContext) {
    this.gl = gl;
    this.off = off;
    this.size = size;
    this.res = img.res;
    this.img = img;
    this.pixSize = pixSize;
    this.fbo = fbo;
    if (link)
      this.linkFBO();
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
    this.img.paramI(this.gl.TEXTURE_MIN_FILTER, min);
    this.img.paramI(this.gl.TEXTURE_MAG_FILTER, mag);
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

  clearSoft() {
    const pixyBuffer = this.img.pixel;
    const clearRegions = [Math.floor(pixyBuffer.byteLength / Float64Array.BYTES_PER_ELEMENT), undefined];
      clearRegions[1] = pixyBuffer.byteLength - clearRegions[0] * Float64Array.BYTES_PER_ELEMENT;
    const clear64 = new Float64Array(pixyBuffer, 0, clearRegions[0]);
    const clear8 = new Int8Array(pixyBuffer, clear64.byteLength, clearRegions[1]);

    for (let i = 0; i < clear64.length; i++)
        clear64[i] = 0;
    for (let i = 0; i < clear8.length; i++)
        clear8[i] = 0; 
  }

  clearFloat(color = [0, 0, 0, 0]) {
    this.gl.clearBufferfv(gl.COLOR, 0, new Float32Array(color));
  }

  clearInt(color = [0, 0, 0, 0]) {
    this.gl.clearBufferiv(gl.COLOR, 0, new Int32Array(color));
  }

  clearUint(color = [0, 0, 0, 0]) {
    this.gl.clearBufferuiv(gl.COLOR, 0, new Uint32Array(color));
  }

  display(shad) {
    this.img.setUniform(shad._glProgram, "uSampler");
    this.rdr.rect(this.off[0], this.off[1], this.size[0], this.size[1]);
  }
}
