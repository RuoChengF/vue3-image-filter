precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float grayIntensity;

void main(void) {
    vec4 color = texture2D(uSampler, vTextureCoord);
    
    // 计算灰度值
    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    
    // 根据强度混合原始颜色和灰度
    vec3 result = mix(color.rgb, vec3(gray), grayIntensity);
    
    gl_FragColor = vec4(result, color.a);
}
