// 自定义颜色调整着色器 增量调整

// 定义 uniforms
uniform float hue;                   // 色调 0-1
uniform float lightness;             // 亮度 0-1
uniform float saturation;            // 饱和度 0-1
uniform float contrast;              // 对比度 (-1 到 1)
uniform float alpha;                 // 透明度 0-1
uniform sampler2D uSampler;


varying vec2 vTextureCoord; //坐标
uniform highp vec4 inputSize;
uniform highp vec4 outputFrame;

vec3 rgbToHsl(vec3 rgb) {
    float r = rgb.r;
    float g = rgb.g;
    float b = rgb.b;

    float maxC = max(r, max(g, b));
    float minC = min(r, min(g, b));
    float delta = maxC - minC;

    float h = 0.0;
    if (delta > 0.0) {
        if (maxC == r) {
            h = mod((g - b) / delta, 6.0);
        } else if (maxC == g) {
            h = (b - r) / delta + 2.0;
        } else if (maxC == b) {
            h = (r - g) / delta + 4.0;
        }
        h /= 6.0; // Normalize hue to [0, 1]
    }

    float l = (maxC + minC) / 2.0;

    float s = 0.0;
    if (delta > 0.0) {
        s = delta / (1.0 - abs(2.0 * l - 1.0));
    }

    return vec3(h, s, l);
}

// 计算 RGB 分量的辅助函数
float hueToRgb(float temp1, float temp2, float t) {
    if (t < 0.0) t += 1.0;
    if (t > 1.0) t -= 1.0;
    if (t < 1.0 / 6.0) return temp1 + (temp2 - temp1) * 6.0 * t;
    if (t < 1.0 / 2.0) return temp2;
    if (t < 2.0 / 3.0) return temp1 + (temp2 - temp1) * (2.0 / 3.0 - t) * 6.0;
    return temp1;
}

vec3 hslToRgb(vec3 hsl) {
    float h = hsl.r;
    float s = hsl.g;
    float l = hsl.b;

    float r, g, b;

    if (s == 0.0) {
        r = g = b = l; // 如果饱和度为0，则颜色为灰色
    } else {
        float temp2 = (l < 0.5) ? (l * (1.0 + s)) : (l + s - l * s);
        float temp1 = 2.0 * l - temp2;
        
        // 使用色相和两个临时值计算 RGB 分量
        r = hueToRgb(temp1, temp2, h + 1.0 / 3.0);
        g = hueToRgb(temp1, temp2, h);
        b = hueToRgb(temp1, temp2, h - 1.0 / 3.0);
    }

    return vec3(r, g, b);
}



// 主函数
void main() {
    // 获取基础纹理和遮罩纹理的颜色
    vec2 filterCoord = vTextureCoord * inputSize.xy / outputFrame.zw;
    vec4 texColor = texture2D(uSampler, vTextureCoord);

    // 计算色调
    vec3 hslColor = rgbToHsl(texColor.rgb);
    hslColor.r += hue;  // 修改色调
    hslColor.r = mod(hslColor.r, 1.0); // 保证色调在 0 到 1 之间

    // 饱和度调整
    hslColor.g += saturation;  // 调整饱和度
    // hslColor.g = clamp(hslColor.g, 0.0, 1.0); // 限制饱和度在 0 到 1 之间

    // // 补光：增加或减少亮度
    hslColor.b += lightness; // 增加或减少亮度（补光）
    hslColor.b = clamp(hslColor.b, 0.0, 1.0); // 限制亮度在 0 到 1 之间

    // 将修改后的 HSL 转换回 RGB
    texColor.rgb = hslToRgb(hslColor);
    
    // 对比度调整：使用线性函数来改变颜色亮度
    texColor.rgb = (texColor.rgb - 0.5) * (1.0 + contrast) + 0.5;

    // 透明度调整
    texColor.a *= alpha;

    // // 输出最终的颜色值
    gl_FragColor = texColor;
}
