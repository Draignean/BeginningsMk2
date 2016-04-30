#extension GL_EXT_draw_buffers : require
precision mediump float;

uniform vec4 uColor;
uniform sampler2D texture;
uniform sampler2D texture_h;

uniform float DeltaSampleS;
uniform float DeltaSampleT;
uniform float Scale;

varying mat3 ftbnMat;
varying mat4 rot_f;




varying  vec2 fTexCoord;
varying vec4 fColor;
varying vec4 LE;
varying mat4 EyeMatrix_f;
varying vec3 eyePosition_f;
varying float shinieness_f;
varying vec4 Normalss;
varying vec4 position_Fragment;


void
main()
{

	mat4 rot = rot_f;
	float sampleDeltaS = DeltaSampleS;
	float sampleDeltaT = DeltaSampleT;
	float scale = Scale;
	
	// Calculating Z values for points sampled from Depth Map
	float zPoint1 =       scale*((texture2D( texture_h, fTexCoord + vec2(sampleDeltaS,0.0) ).z * (255.0/128.0)) - 1.0)          ;
	float zPoint2 =       scale*((texture2D( texture_h, fTexCoord + vec2(0.0,sampleDeltaT)).z * (255.0/128.0)) - 1.0)          ;
	float zPoint4 =       scale*((texture2D( texture_h, fTexCoord + vec2(-sampleDeltaS,0.0)).z * (255.0/128.0)) - 1.0)          ;
	float zPoint5 =       scale*((texture2D( texture_h, fTexCoord + vec2(0.0,-sampleDeltaT)).z * (255.0/128.0)) - 1.0)          ;

	// Ignoring depths other tha 0.0 to 1.0
	if(zPoint1 < 0.0 || zPoint1 > 1.0 ) 
	{
		zPoint1 =  zPoint1  * 1.50;
	}
		if(zPoint2 < 0.0 || zPoint2 > 1.0 ) 
	{
		zPoint2 =  zPoint2  * 1.50;
	}
		if(zPoint4 < 0.0 || zPoint4 > 1.0 ) 
	{
		zPoint4 =  zPoint4  * 1.50;
	}
		if(zPoint5 < 0.0 || zPoint5 > 1.0 ) 
	{
		zPoint5 =  zPoint5  * 1.50;
	}

	// Point
	vec3 point = vec3(fTexCoord.xy,0.0);
	
	// Samples 
	vec3 p01 =  point + vec3(sampleDeltaS,0.0,zPoint1);
	vec3 p02 = point + vec3(0.0,sampleDeltaT,zPoint2);
	vec3 p03 = point;
	vec3 p04 = point + vec3(-sampleDeltaS,0.0,zPoint4);
	vec3 p05 = point + vec3(0.0,-sampleDeltaT,zPoint5);

	// Constructing Normals from samples

	vec3 Normal;
	vec3 Tangent = (p02-p05);
	vec3 BTangent = (p01-p04);
	
	Normal=cross(BTangent,Tangent);

	Normal = ( vec4(normalize( ftbnMat*Normal ),0.0)).xyz;
	Tangent = normalize(Tangent );
	BTangent = normalize(BTangent);

	//Normal = ftbnMat*Normalss.xyz; // Given normals Normalss in eye frame of reference with rot , Toggle comment to use normals that are given for cube
	
	gl_FragData[0] = vec4(shinieness_f,shinieness_f,shinieness_f,shinieness_f)/50.0;
	gl_FragData[1] = vec4((Normal+1.0)/2.0,1.0);
	gl_FragData[2] = position_Fragment;
	gl_FragData[3] = texture2D(texture,fTexCoord);
	//gl_FragColor = vec4((position_Fragment.xyz*-1.0)/10.0,1.0);
     //gl_FragColor = (Calc_color) *texture2D(texture,fTexCoord); // use fColor instead of Calc_color to use light calculated in Vertex Shader

}
