attribute vec4 vPosition;
attribute vec4 vNormal;

varying vec4 fColor;
varying mat4 EyeMatrix_f;
varying vec4 lightPos_f;
varying vec3 eyePosition_f;
varying float shinieness_f;
varying vec4 ambientProduct_f, diffuseProduct_f, specularProduct_f;
varying mat3 ftbnMat;
varying vec4 Normalss;

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


rot = rotTranMat[int(vLoc.x)]; //Pull out whichever matrix we happen to actually need.
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
rot_f = rot;
fTexCoord=vTexCoord;


//------------------- Lighting calculation in Vertex Shader ( This is not used, New normals are calculated in Fragment Shader and Lighting calculation is done there)--------


// pos is vertex position in eye coordinates
 mat4 tm = mat4( 1,0,0,0, 0,1,0,0,  0,0,1,0,  uTranslate.x, uTranslate.y, uTranslate.z,1.0);  
    mat4 sm = mat4( uScale.x,0,0,0, 0,uScale.y,0,0,  0,0,uScale.z,0,  0, 0, 0,1.0);  

   
    vec3 N = normalize((EyeMatrix *tm*sm*vNormal).xyz);

    Normalss = vec4(N,0.0);
   
    vec3 pos = (EyeMatrix * rot * tm*sm*vPosition).xyz;

    // vector from vertex position to light source

    vec3 L;

    // check for directional light

    if(lightPosition.w == 0.0) L = normalize((EyeMatrix*lightPosition).xyz);
    else L = normalize( (EyeMatrix*lightPosition).xyz - pos );

    // Because the eye point the is at the orgin
    // the vector from the vertex position to the eye is

    vec3 E =-1.0*eyePosition-pos; 
    //-normalize( pos );

    // halfway vector

    vec3 H = normalize( L + E );

    // Transform vertex normal into eye coordinates

    // vec3 N = normalize( normalMatrix*vNormal.xyz);

    // as long as there is no nonuniform scaling
    // we don't need the normal matrix and can use


    // Compute terms in the illumination equation
    vec4 ambient = ambientProduct;

    float Kd = max( dot(L, N), 0.0 );
    vec4  diffuse = Kd*diffuseProduct;

    float Ks = pow( max(dot(N, H), 0.0), shininess );
    vec4  specular = Ks * specularProduct;

    if( dot(L, N) < 0.0 ) {
	specular = vec4(0.0, 0.0, 0.0, 1.0);
    }

//------------------------------------------------------------------------------------------

//////////////////////////

//calculate FTBN Matrix and send to fragment shader

vec3 T = (EyeMatrix *  tm*vTangent).xyz;
T=normalize(T-dot(T,N)*N);
vec3 BT = cross(N,T); 

mat3 ftbn=mat3(normalize(T),normalize(BT),normalize(N));
ftbnMat = ftbn;
//////////////////////////

    gl_Position = projection*EyeMatrix * rot*tm*sm*vPosition;
    
    // position sent to fragment shader
    position_Fragment=EyeMatrix*rot * tm*sm*vPosition;
    
		// Light calculated in Vertes Shader (Not used)
        fColor =    diffuse + specular ;
		fColor.a = 1.0;

}

