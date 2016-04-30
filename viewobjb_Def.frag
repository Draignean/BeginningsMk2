precision mediump float;


varying vec2 fs_TexCoord;
uniform vec4 lightPositiont;
uniform vec3 eyePositiont;
uniform vec4 ambientProductt, diffuseProductt, specularProductt;
    uniform sampler2D u_Mattex;
    uniform sampler2D u_Normaltex;
    uniform sampler2D u_Positiontex;
    uniform sampler2D u_Colortex;

    
uniform vec3 testUnit; 
uniform sampler2D test; 

void main()
{
	float shinieness = texture2D( u_Mattex, fs_TexCoord).x*50.0;
	vec3 Normal  = ((texture2D(test, fs_TexCoord)-0.5)*2.0).xyz;
	vec3 Position  = (texture2D(u_Positiontex, fs_TexCoord)*10.0).xyz;
	vec3 color = texture2D(u_Colortex, fs_TexCoord).xyz;


//----------------------------Lighting Calculation-----------------------------------
	
////So, now we're just going to have a new set of locatiosn defined within the fragment shader
vec4 newPositionMatrix[10];
newPositionMatrix[0] = vec4(0.0,0.0,0.0,1.0);
newPositionMatrix[1] = vec4(1.0,0.0,0.0,1.0);
newPositionMatrix[2] = vec4(0.0,1.0,0.0,1.0);
newPositionMatrix[3] = vec4(0.0,0.0,1.0,1.0);
newPositionMatrix[4] = vec4(-2.0,-2.0,0.0,1.0);
newPositionMatrix[5] = vec4(-2.0,-2.0,-2.0,1.0);
newPositionMatrix[6] = vec4(0.0,5.0,0.0,1.0);
newPositionMatrix[7] = vec4(3.0,-5.0,1.0,1.0);
newPositionMatrix[8] = vec4(-3.0,3.0,-1.0,1.0);
newPositionMatrix[9] = vec4(2.0,3.0,-2.0,1.0);
////	


	vec3 L[10];
	vec4 tDif[10];
	vec4 tSpec[10];
	  	//Light Vector
	for  (float i = 0.0; i<10.0; i++)
	{
L[int(i)]=normalize(newPositionMatrix[int(i)].xyz-Position.xyz).xyz; // light in eye frame of reference	
		//tDif[int(i)] =vec4((sin(i)+1.0)/2.0, (cos(i)+1.0)/2.0,(cos(i*1.5)*sin(i/2.0)+1.0)/2.0,1.0);
		//tSpec[int(i)] =vec4((sin(i)+1.0)/2.0, (cos(i)+1.0)/2.0,(cos(i*1.5)*sin(i/2.0)+1.0)/2.0,1.0);
		//tSpec[int(i)] =vec4(i/10.0, 1.0-i/10.0,(cos(i*1.5)*sin(i/2.0)+1.0)/2.0,1.0);
		//tDif[int(i)] =vec4(i/10.0, 1.0-i/10.0,(cos(i*1.5)*sin(i/2.0)+1.0)/2.0,1.0);
	}
	tDif[0] = vec4(1.0,0.0,0.0,1.0);
	tDif[1] = vec4(0.0,1.0,0.0,1.0);
	tDif[2] = vec4(0.0,0.0,1.0,1.0);
	tDif[3] = vec4(0.5,0.5,0.0,1.0);
	tDif[4] = vec4(0.0,0.5,0.5,1.0);
	tDif[5] = vec4(0.5,0.0,0.5,1.0);
	tDif[6] = vec4(0.25,0.5,0.25,1.0);
	tDif[7] = vec4(0.5,0.25,0.25,1.0);
	tDif[8] = vec4(0.75,0.25,0.0,1.0);
	tDif[9] = vec4(0.0,0.75,0.25,1.0);
	
	tSpec[0] = vec4(1.0,0.0,0.0,1.0);
	tSpec[1] = vec4(0.0,1.0,0.0,1.0);
	tSpec[2] = vec4(0.0,0.0,1.0,1.0);
	tSpec[3] = vec4(0.5,0.5,0.0,1.0);
	tSpec[4] = vec4(0.0,0.5,0.5,1.0);
	tSpec[5] = vec4(0.5,0.0,0.5,1.0);
	tSpec[6] = vec4(0.25,0.5,0.25,1.0);
	tSpec[7] = vec4(0.5,0.25,0.25,1.0);
	tSpec[8] = vec4(0.75,0.25,0.0,1.0);
	tSpec[9] = vec4(0.0,0.75,0.25,1.0);
	
	vec4 diffuse = vec4(0.0,0.0,0.0,1.0);
	vec4 ambient = vec4(0.0,0.0,0.0,1.0);
	vec4 specular = vec4(0.0,0.0,0.0,1.0);
	// vector from vertex position to light source
vec3 N;
	for (int i = 0; i<10; i++)
{
    

    // check for directional light
    
    

    // Because the eye po`int the is at the orgin
    // the vector from the vertex position to the eye is

    vec3 E =-1.0*eyePositiont-Position.xyz; 
    //-normalize( point );

    // halfway vector
    vec3 H = normalize( L[i] + E );

    // Transform vertex normal into eye coordinates

    // vec3 N = normalize( normalMatrix*Normal);

   // Here, we can compute the distance to the light.
float dist = sqrt(dot(newPositionMatrix[int(i)].xyz-Position.xyz,newPositionMatrix[int(i)].xyz-Position.xyz))/1.75;
dist = dist*dist;        


     N = normalize( (Normal).xyz);

    // Compute terms in the illumination equation

    float Kd = max( dot(L[i], N), 0.0 );
    diffuse = diffuse + (Kd*tDif[i]/dist );

    float Ks = pow( max(dot(N, H), 0.0), shinieness );
      if( dot(L[0], N) > 0.0 ) {specular = specular + (Ks * tSpec[i])/dist;};

}
	
	
	//----------------------------------------------------------------
	
	
	
	ambient = vec4(-0.2,-0.2,-0.2,1.0);
	 vec4 Calc_color =   diffuse+ specular + ambient;
	 Calc_color = vec4(Calc_color.xyz,1.0);
	 Calc_color.w=1.0;
	 specular.w = 1.0;
	  diffuse.w = 1.0;
    diffuse = vec4(diffuse.xyz,1.0);
     gl_FragColor = (Calc_color)*texture2D(u_Colortex,fs_TexCoord); // use fColor instead of Calc_color to use light calculated in Vertex Shader

gl_FragColor = vec4(1.0,0.0,0.0,1.0);
}
