    precision mediump float;

    varying vec2 vTextureCoord;
    uniform sampler2D uSampler;
    uniform vec2 uResolution;
    uniform vec2 uTileSize;

    void main(void) {
        // 计算像素坐标
        vec2 pixelCoord = vTextureCoord * uResolution - 0.5;

        // 计算马赛克块坐标
        vec2 mosaicBlock = floor(pixelCoord / uTileSize) * uTileSize + uTileSize * 0.5;

        // 采样马赛克块中心的颜色
        vec2 mosaicTexCoord = (mosaicBlock + 0.5) / uResolution;
        gl_FragColor = texture2D(uSampler, mosaicTexCoord);
    }
