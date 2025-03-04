precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float sepiaIntensity;

void main(void) {
    vec4 color = texture2D(uSampler, vTextureCoord);

    // 计算褐色效果
    float r = color.r * 0.393 + color.g * 0.769 + color.b * 0.189;
    float g = color.r * 0.349 + color.g * 0.686 + color.b * 0.168;
    float b = color.r * 0.272 + color.g * 0.534 + color.b * 0.131;

    // 根据强度混合原始颜色和褐色效果
    vec3 sepiaColor = vec3(r, g, b);
    vec3 result = mix(color.rgb, sepiaColor, sepiaIntensity);

    gl_FragColor = vec4(result, color.a);
}
