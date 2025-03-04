precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float brightness;

void main(void) {
    vec4 color = texture2D(uSampler, vTextureCoord);
    
    // 调整亮度
    vec3 rgb = color.rgb * brightness;
    
    // 输出调整后的颜色
    gl_FragColor = vec4(rgb, color.a);
}
