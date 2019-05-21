var random = Math.random;
function randomColor() {
  return {
    r: random() * 255,
    g: random() * 255,
    b: random() * 255,
    a: random() * 1
  };
}

function $$(str) {
  if (!str) return null;
  if (str.startsWith("#")) {
    return document.querySelector(str);
  }
}

function getCanvas(id) {
  return document.querySelector(id);;
}

function resizeCanvas(canvas, width, height){
  if (canvas.width !== width){
    canvas.width = width ? width : window.innerWidth;
  } 
  if (canvas.height !== height){
    canvas.height = height ? height: window.innerHeight;
  }
}
function getContext(canvas) {
  return canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
}

function createShaderFromScript(gl, type, scriptId) {
  let sourceScript = $$('#' + scriptId);
  if (!sourceScript) {
    return null;
  }
  return createShader(gl, type, sourceScript.innerHTML);
}
function createShader(gl, type, source) {
  let shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  // 检测是否编译正常
  let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }
  console.error(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}
function createSimpleProgram(gl, vertexShader, fragmentShader) {
  if (!vertexShader || !fragmentShader) {
    console.warn("着色器不能为空");
    return;
  }
  // 创建着色器程序
  let program = gl.createProgram();
  // 将顶点着色器挂载在着色器程序上
  gl.attachShader(program, vertexShader);
  // 将片元着色器挂载在着色器程序上
  gl.attachShader(program, fragmentShader);
  // 链接着色器程序
  gl.linkProgram(program);
  let success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }
  console.error(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}
