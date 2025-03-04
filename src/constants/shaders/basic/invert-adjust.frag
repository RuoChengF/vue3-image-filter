precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float invertIntensity;

void main(void) {
    vec4 color = texture2D(uSampler, vTextureCoord);

    // 计算反相颜色
    vec3 invertedColor = 1.0 - color.rgb;

    // 根据强度混合原始颜色和反相颜色
    vec3 result = mix(color.rgb, invertedColor, invertIntensity);

    gl_FragColor = vec4(result, color.a);
}
