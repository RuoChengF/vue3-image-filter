// src/shaders/defogging.frag
precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float fogAmount;

void main(void) {
    vec4 color = texture2D(uSampler, vTextureCoord);
    
    // 计算暗通道
    float darkChannel = min(min(color.r, color.g), color.b);
    
    // 估算大气光照
    vec3 atmosphere = vec3(1.0);
    
    // 计算透射率
    float transmission = 1.0 - fogAmount * darkChannel;
    
    // 应用去雾公式
    vec3 result = (color.rgb - atmosphere * (1.0 - transmission)) / max(transmission, 0.1);
    
    gl_FragColor = vec4(result, color.a);
}