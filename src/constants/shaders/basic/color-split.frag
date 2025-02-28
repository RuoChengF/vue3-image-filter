// src/shaders/color-split.frag
precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec2 offset;      // RGB分离偏移量
uniform float angle;      // 分离角度

void main(void) {
    // 计算旋转后的偏移向量
    float rad = angle * 3.14159 / 180.0;
    vec2 rotatedOffset = vec2(
        offset.x * cos(rad) - offset.y * sin(rad),
        offset.x * sin(rad) + offset.y * cos(rad)
    );
    
    // 采样三个颜色通道
    vec4 red = texture2D(uSampler, vTextureCoord + rotatedOffset);
    vec4 green = texture2D(uSampler, vTextureCoord);
    vec4 blue = texture2D(uSampler, vTextureCoord - rotatedOffset);
    
    gl_FragColor = vec4(red.r, green.g, blue.b, green.a);
}