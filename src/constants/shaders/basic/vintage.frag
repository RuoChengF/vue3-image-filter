// src/shaders/vintage.frag
precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float sepia;        // 复古程度
uniform float noise;        // 噪点强度
uniform float scratch;      // 划痕强度

// 随机数生成
float rand(vec2 co) {
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main(void) {
    vec4 color = texture2D(uSampler, vTextureCoord);
    
    // 转换为复古色调
    vec3 sepiaColor = vec3(
        color.r * 0.393 + color.g * 0.769 + color.b * 0.189,
        color.r * 0.349 + color.g * 0.686 + color.b * 0.168,
        color.r * 0.272 + color.g * 0.534 + color.b * 0.131
    );
    
    // 添加噪点
    float randomValue = rand(vTextureCoord);
    vec3 noiseColor = mix(color.rgb, vec3(randomValue), noise);
    
    // 添加划痕效果
    float scratchValue = rand(vec2(vTextureCoord.y, 0.0)) * scratch;
    vec3 finalColor = mix(noiseColor, vec3(1.0), scratchValue);
    
    // 混合原始颜色和复古效果
    finalColor = mix(color.rgb, mix(finalColor, sepiaColor, sepia), sepia);
    
    gl_FragColor = vec4(finalColor, color.a);
}