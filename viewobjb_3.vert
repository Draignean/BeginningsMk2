attribute vec4 vPosition;
attribute vec4 vNormal;

varying vec4 fColor;
varying mat4 EyeMatrix_f;
varying vec4 lightPos_f;
varying vec3 eyePosition_f;
varying float shinieness_f;
varying vec3 ambientProduct_f, diffuseProduct_f, specularProduct_f;


uniform mat4 EyeMatrix;
uniform mat4 projection;
uniform mat3 normalMatrix;
//uniform float scale;

uniform vec3 color, colorScale;
//uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform vec4 lightPosition;
uniform float shininess;
varying vec4 LE;
uniform vec3 eyePosition;

varying vec4 position_Fragment;
mat4 newNorMat;


void main()
{

// Send to fragment shader
eyePosition_f = eyePosition;
lightPos_f = lightPosition;
EyeMatrix_f = EyeMatrix;
shinieness_f = shininess;


vec3 ambientProduct = color*colorScale.x;
vec3 diffuseProduct = color*colorScale.y;
vec3 specularProduct = color*colorScale.z;

ambientProduct_f=ambientProduct;
diffuseProduct_f=diffuseProduct;
specularProduct_f=specularProduct;


    gl_Position = projection*EyeMatrix*vPosition;
    
    // position sent to fragment shader
    position_Fragment=EyeMatrix*vPosition;
}

