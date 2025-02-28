// src/shaders/sharpen.frag 锐化
precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec2 dimensions;
uniform float strength;

void main(void) {
    vec2 onePixel = vec2(1.0, 1.0) / dimensions;
    
    vec4 color = texture2D(uSampler, vTextureCoord);
    vec4 top = texture2D(uSampler, vTextureCoord - vec2(0.0, onePixel.y));
    vec4 bottom = texture2D(uSampler, vTextureCoord + vec2(0.0, onePixel.y));
    vec4 left = texture2D(uSampler, vTextureCoord - vec2(onePixel.x, 0.0));
    vec4 right = texture2D(uSampler, vTextureCoord + vec2(onePixel.x, 0.0));
    
    vec4 result = color * (1.0 + 4.0 * strength) - (top + bottom + left + right) * strength;
    
    gl_FragColor = result;
}