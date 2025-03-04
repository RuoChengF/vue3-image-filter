precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float contrast;

void main(void) {
    vec4 color = texture2D(uSampler, vTextureCoord);
    
    // 计算对比度调整
    // 对比度公式: (color - 0.5) * contrast + 0.5
    vec3 rgb = (color.rgb - 0.5) * contrast + 0.5;
    
    // 输出调整后的颜色
    gl_FragColor = vec4(rgb, color.a);
}
