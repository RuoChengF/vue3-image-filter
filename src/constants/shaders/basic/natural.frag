// 自然效果 
precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float brightness;
uniform float saturation;
uniform float contrast;
uniform float temperature;
uniform float gamma;

void main(void) {
    vec4 color = texture2D(uSampler, vTextureCoord);
    vec3 rgb = color.rgb;
    
    // 亮度调整
    rgb *= brightness;
    
    // 饱和度调整
    float gray = dot(rgb, vec3(0.299, 0.587, 0.114));
    rgb = mix(vec3(gray), rgb, saturation);
    
    // 对比度调整
    rgb = (rgb - 0.5) * contrast + 0.5;
    
    // 调整色温
    rgb = mix(rgb, rgb * vec3(1.1, 1.0, 0.9), temperature);
    
    // Gamma校正
    rgb = pow(rgb, vec3(1.0 / gamma));
    
    // 确保颜色值在有效范围内
    rgb = clamp(rgb, 0.0, 1.0);
    
    gl_FragColor = vec4(rgb, color.a);
}