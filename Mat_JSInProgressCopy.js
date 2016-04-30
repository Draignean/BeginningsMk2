// CS 4143: example for OBJ file stored in js file
var cubeObject = {};
var forward = {};
var backwardPass = {};
var backwardFilter = {};
var program2;
var program;
var DeltaSampleS = 0.01;
var DeltaSampleT = 0.01;
var Scale = 1.0;
var quad_positionLocation = 0;
var quad_texCoordLocation = 1;


// -------------------- Projection and EYE ---------------------
var eye = vec3(0.0,0.0,2.0);
var near = 0.3;
var far = 30.0;
var radius = 4.0;
var theta  = 0.0;
var phi    = 0.0;
var dr = 5.0 * Math.PI/180.0;

var  fovy = 60.2576;  // Field-of-view in Y direction angle (in degrees)
var  aspect;       // Viewport aspect ratio

var flag;

var mvMatrix, pMatrix;
var modelView, projection;
//var eye;
const at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);


// --------------------------------------------------------------

//--------------------------- LIGHT ------------------------------
var vTexCoord;
var vTangent;
var indexLoc;
var vNormal;
var lightPosition = vec4(3.0,1.0, 2.0, 1.0 );
var lightAmbient = vec4(1.0, 1.0, 1.0, 1.0 );
var lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
var lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );

var materialAmbient = vec4( 1.0, 1.0, 1.0, 1.0 );
var materialDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
var materialSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );
var materialShininess = 50.0;

var ctm;
var ambientColor, diffuseColor, specularColor;

var normalMatrixx, normalMatrixLoc;

//Rotation/Translation Matrices
var rotationMatrix= [];
var translationMatrix = [];
var rotTranMat = [];
var rotTranMatLoc;
var rotFact =[];
var tranFact =[];
var degrees = [];


//----------------------------------------------------------------
//---------------------Texture------------------------------------
var counter =0;
function newEmptyTexture(x,y) {
	var tex = {};
	
	var texUnitName = "TEXTURE" + counter;
    texture = gl.createTexture();
    gl.activeTexture(gl[texUnitName]);
    gl.bindTexture( gl.TEXTURE_2D, texture );
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, x, y, 0, gl.RGBA, gl.FLOAT, null);
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
                      gl.LINEAR );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
	
	tex.texUnit = counter;
	tex.texName = texUnitName;
	tex.texData = texture;
	
	counter = counter+1;
	return tex;
}
function newCube()
{
	var newCube = {};
	genObj_cube(newCube);
	
	newCube.mesh = newCube.cube;
		 // Vertex Position
	    vbufferId = gl.createBuffer();
	    newCube.vbufferId = vbufferId;
	    gl.bindBuffer( gl.ARRAY_BUFFER, vbufferId );
	    gl.bufferData( gl.ARRAY_BUFFER,newCube.mesh.vertexBlock, gl.STATIC_DRAW );
	    
		//Vertex index
		ibufferId = gl.createBuffer();
	    newCube.ibufferId = ibufferId;
	    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibufferId);
	    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,newCube.mesh.faceVertexBlock, gl.STATIC_DRAW);

		// Normals Buffer
		var nBuffer = gl.createBuffer();
		newCube.nbufferId = nBuffer;
	    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer);
	    gl.bufferData( gl.ARRAY_BUFFER, newCube.mesh.normalBlock, gl.STATIC_DRAW );
		
		newCube.transform = mat4();	
		newCube.size = length(newCube.mesh.faceVertexBlock)
return  newCube;
}



// height
function configureTexture(imageName,imageNum,bufferName) {

	var image1 = new Image();
	image1.src = imageName;
	image1.onload = function() {
		configureTextureStage2(image1, imageNum,bufferName);
		console.log('Triggering onload ' + imageNum);
	}
	image1.onerror = function() {console.log('Image ' + imageNum + ' failed!');};
}
//
function configureTextureStage2( image, texUnit,name ) {
    var texture = gl.createTexture();
    gl.activeTexture(gl['TEXTURE' + texUnit]);
    gl.bindTexture(gl.TEXTURE_2D, texture);
	    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
	    gl.generateMipmap(gl.TEXTURE_2D);
	    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
			      gl.NEAREST_MIPMAP_LINEAR);
	    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.useProgram(program);
		gl.uniform1i(gl.getUniformLocation(program, name), texUnit);
	}


	//------------------------ TRACK BALL VESTIGIAL CODE--------------------//


	var NumVertices  = 36;

	var points = [];
	var colors = [];

	//var rotationMatrix = mat4();
	var rotationMatrixLoc;

	var  angle = 0.0;
	var  axiss = [0, 0, 1];

	var  trackingMouse = false;
	var  trackballMove = false;

	var lastPos = [0, 0, 0];
	var curx, cury;
	var startX, startY;

	//------------------------ TRACK BALL END ----------------//

	var matTexture;
	var normalTexture;
	var positionTexture;
	var colorTexture;
	function loadFB(canvas, ext) 
	{
	var matTexture = newEmptyTexture(canvas.width,canvas.height);
	var normalTexture = newEmptyTexture(canvas.width,canvas.height);
	var positionTexture = newEmptyTexture(canvas.width,canvas.height);
	var colorTexture = newEmptyTexture(canvas.width,canvas.height);
		
		var fb = gl.createFramebuffer();
	gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
	ext.drawBuffersWEBGL([
	  ext.COLOR_ATTACHMENT0_WEBGL, // gl_FragData[0]
	  ext.COLOR_ATTACHMENT1_WEBGL, // gl_FragData[1]
	  ext.COLOR_ATTACHMENT2_WEBGL, // gl_FragData[2]
	  ext.COLOR_ATTACHMENT3_WEBGL  // gl_FragData[3]
		]);

		gl.framebufferTexture2D(gl.FRAMEBUFFER, ext.COLOR_ATTACHMENT0_WEBGL, gl.TEXTURE_2D, matTexture.texdata, 0);
		gl.framebufferTexture2D(gl.FRAMEBUFFER, ext.COLOR_ATTACHMENT1_WEBGL, gl.TEXTURE_2D, normalTexture.texData, 0);
		gl.framebufferTexture2D(gl.FRAMEBUFFER, ext.COLOR_ATTACHMENT2_WEBGL, gl.TEXTURE_2D, positionTexture.texData, 0);    
		gl.framebufferTexture2D(gl.FRAMEBUFFER, ext.COLOR_ATTACHMENT3_WEBGL, gl.TEXTURE_2D, colorTexture.texData, 0);
		 var FBOstatus = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
		    if(FBOstatus == gl.FRAMEBUFFER_COMPLETE) {
		    console.log("GREEN LIGHT, Frambuffer is properly configured!");        	
		}   
		}

		//This function originally designed by Yuqin Shao, adapted for use in this program.
	var device_quad = {num_indices:0};

	var vbo_vertices;    var vbo_indices;
	var vbo_textures;
		function initializeQuad() {
		var positions = new Float32Array([
				-1.0, 1.0, 0.0,
				-1.0,-1.0,0.0,
				1.0,-1.0,0.0,
				1.0,1.0,0.0
				]);
		// var textures = new Float32Array([
		//     0.0,1.0,
		//     0.0,0.0,
		//     1.0,0.0,
		//     1.0,1.0
		// ]);         

		var textures = new Float32Array([
				-1.0,1.0,
				-1.0,-1.0,
				1.0,-1.0,
				1.0,1.0
				]);         

		var indices = [0,1,2,0,2,3];
		device_quad.num_indices = 6;

		vbo_vertices = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vbo_vertices);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

		vbo_textures = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vbo_textures);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textures), gl.STATIC_DRAW);

		vbo_indices = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo_indices);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);       
	}
		function setupQuad(locs)
	{
		gl.useProgram(program2);
		//gl.enable(gl.BLEND);

		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, matTexture);
		gl.uniform1i(locs[5],0);

		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_2D, normalTexture);
		gl.uniform1i(locs[6],1);

		gl.activeTexture(gl.TEXTURE2);
		gl.bindTexture(gl.TEXTURE_2D, positionTexture);
		gl.uniform1i(locs[7],2);

		gl.activeTexture(gl.TEXTURE3);
		gl.bindTexture(gl.TEXTURE_2D, colorTexture);
		gl.uniform1i(locs[8],3);

	}
		function drawQuad()
	{
		gl.enableVertexAttribArray(quad_positionLocation);
		gl.bindBuffer(gl.ARRAY_BUFFER, vbo_vertices);
		gl.vertexAttribPointer(quad_positionLocation, 3, gl.FLOAT, false, 0, 0);

		gl.enableVertexAttribArray(quad_texCoordLocation);  
		gl.bindBuffer(gl.ARRAY_BUFFER, vbo_textures);  
		gl.vertexAttribPointer(quad_texCoordLocation, 2, gl.FLOAT, false, 0, 0); 

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vbo_indices);   

		gl.drawElements(gl.TRIANGLES, device_quad.num_indices, gl.UNSIGNED_SHORT, 0);          
	}
		
		var prog2Locs = [];
		function enableProg2()
		{
			program2 = initShaders( gl, "viewobjb_Def.vert", "viewobjb_Def.frag" ); 

	     //If this doesn't work at first, remember to set up the vertext disable/enabel.
		//Prog 2 attributes.
		gl.bindAttribLocation(program2, quad_positionLocation, "Position");
	    gl.bindAttribLocation(program2, quad_texCoordLocation, "Texcoord");
		prog2Locs.push(gl.getUniformLocation(program2, "u_DisplayType"));
	    prog2Locs.push(gl.getUniformLocation(program2, "u_Near"));
	    prog2Locs.push(gl.getUniformLocation(program2, "u_Far"));
	    prog2Locs.push(gl.getUniformLocation(program2, "u_Width"));
	    prog2Locs.push(gl.getUniformLocation(program2, "u_Height"));
	    prog2Locs.push(gl.getUniformLocation(program2, "u_Mattex"));
	    prog2Locs.push(gl.getUniformLocation(program2, "u_Normaltex"));
	    prog2Locs.push(gl.getUniformLocation(program2, "u_Positiontex"));
	    prog2Locs.push(gl.getUniformLocation(program2, "u_Colortex"));
		
		//Lighting data
	//	    var ambientProduct = mult(lightAmbient, materialAmbient);
	  //  var diffuseProduct = mult(lightDiffuse, materialDiffuse);
	   // var specularProduct = mult(lightSpecular, materialSpecular);
	//	gl.uniform4fv( gl.getUniformLocation(program2,"ambientProductt"),flatten(ambientProduct) );
	  //  gl.uniform4fv( gl.getUniformLocation(program2,"diffuseProductt"),flatten(diffuseProduct) );
	   // gl.uniform4fv( gl.getUniformLocation(program2,"specularProductt"),flatten(specularProduct) );
	    //gl.uniform4fv( gl.getUniformLocation(program2,"lightPositiont"),flatten(lightPosition) );
		gl.uniform3fv( gl.getUniformLocation(program2,"eyePosition2"),flatten(eye) );

		}
		
	window.onload = function init()
	{
	    var canvas = document.getElementById( "gl-canvas" );
	    gl = WebGLUtils.setupWebGL( canvas );
	    if ( !gl ) { alert( "WebGL isn't available" ); }
		loadFB(canvas, ext);
	    var ext= gl.getExtension('WEBGL_draw_buffers'); //Initialize our super buffering
		cubeObject.gl = gl;
		cubeObject.gl = gl;
	    cubeObject.canvas = canvas;
		
		program = initShaders( gl, "viewobjb_3.vert", "viewobjbF.frag" );  
		gl.getExtension("OES_texture_float");
	    gl.getExtension("OES_texture_float_linear");
		initializeQuad()
	

		aspect =  canvas.width/canvas.height;
		
	    gl.viewport( 0, 0, canvas.width, canvas.height );
	    gl.clearColor( 0.80, 0.60, 0.60, 1.0 );  
	    gl.enable(gl.DEPTH_TEST);
	
	    gl.useProgram( program );
	    cubeObject.program = program;
	
		var allCubes = [];
		for (var i = 0; i<1; i++)
		{
			allCubes[i] = newCube();
			allCubes.mesh = newCube.cube;
		}
		forward = loadForwardShader();
		//backwardPass = loadBackPassShader();
		//backwardFilter = loadBackFilterShader();
		renderForward();
	}
	
	function loadForwardShader()
	{
		forward.vPosition = newAttribute(program, "vPosition");
		forward.vNormal = newAttribute(program, "vNormal");
		pMatrix = perspective(fovy, aspect, near, far);
		forward.perspective = newUniform(program, "Projection", "mat4");
		forward.modelView = newUniform(program, "EyeMatrix", "mat4");
		forward.NMatrix = newUniform(program, "normalMatrix","mat3"); 
		forward.color = newUniform(program, "color", "vec3");
		forward.color = newUniform(program, "colorScale", "vec3");

		forward.lPos = newUniform(program, "lightPosition","vec4");
		forward.ePos = newUniform(program, "eyePosition","vec4");
		forward.shiny = newUniform(program, "shinieness","float");	
	}

	
	function popRotTranMat()
	{
		for (var i =0; i<600; i++)
		{
			if (i<300)
			{
				rotFact.push((Math.random()-0.5)*2);
			}
			else
			{
				tranFact.push(Math.random());
			}
		}
		
		for (var i =0; i<10; i++)
		{
		degrees.push(Math.random()*360);	
		rotationMatrix.push(rotate(degrees[i],rotFact[i*3],rotFact[i*3+1],rotFact[i*3+2]));
		translationMatrix.push(translate((tranFact[i*3]-0.5)*6,(tranFact[i*3+1]-0.5)*6,-(Math.abs(tranFact[i*3+2]))*4-3.0));
		rotTranMat.push(mult(translationMatrix[i],rotationMatrix[i]));
		//rotTranMat.push(translate((i)*0.1,(i)*(-0.1),0));
		}
	}

	function updateRotTranMat()
	{
		rotTranMat =[];
		rotationMatrix =[];
		for (var i =0; i<10; i++)
		{
		degrees[i] = degrees[i]+1;	
		rotationMatrix.push(rotate(degrees[i],rotFact[i*3],rotFact[i*3+1],rotFact[i*3+2]));
		translationMatrix.push(translate((tranFact[i*3]-0.5)*6,(tranFact[i*3+1]-0.5)*6,-(Math.abs(tranFact[i*3+2]))*4-3.0));
		rotTranMat.push(mult(translationMatrix[i],rotationMatrix[i]));
		//rotTranMat.push(translate((i)*0.1,(i)*(-0.1),0));
		}
	}



	function reallyFlatten(input)
	{
		output = new Float32Array(160)
		for (var i = 0; i<10; i++)
		{
			subArray = flatten(input[i]);
			for (var k = 0; k<16; k++)
			{
				output[i*16+k] = subArray[k];
			}
		}
		return output;
	}

	function renderForward()
	{
		var cube = allCubes[0];
		Forward.vPosition.buffer = cube.vbufferId;
		Forward.vNormal.buffer = cube.nbufferId;;
		
		var mvMatrix = lookAt( vec3(0,0,-5), vec3(0,0,0), vec3(0,1,0));
	forward.modelView.set( modelView );
		forward.NMatrix.set( normalMatrix( mvMatrix,true));
		forward.perspective.set( perspective( 45, 1, 0.01, 100) );
		forward.color.set(vec3(1,0,0));
		forward.colorScale.set(vec3(0.5,1,1));
		forward.lPos.set(vec3(2,2,-2));
		forward.ePos.set(vec3(0,0,-5));
		forward.shiny.set(10);

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,cube.ibufferId);
		gl.drawElements( gl.TRIANGLES, cube.size, gl.UNSIGNED_SHORT, 0);
   requestAnimFrame(renderForward);
	}

	function render1()
	{
	 gl = cubeObject.gl;
	gl.useProgram(program)
gl.enableVertexAttribArray( vTexCoord );
gl.enableVertexAttribArray( vTangent);
gl.enableVertexAttribArray( vPositionLoc ); 
gl.enableVertexAttribArray( indexLoc ); 
gl.enableVertexAttribArray(vNormal);
//So, we're going to start throwing in our render matrixes here
updateRotTranMat();
  rotTranMatLoc = gl.getUniformLocation(program, "rotTranMat"); 
gl.uniformMatrix4fv(rotTranMatLoc, false,reallyFlatten(rotTranMat)); //Okay, so theoretially we're passing through properly.


    gl.clear( gl.COLOR_BUFFER_BIT |gl.DEPTH_BUFFER_BIT);  // clears canvas to clearColor 

	// Look at
    mvMatrix = lookAt(eye, at , up);
    // Perspective
   
    
    
    // draw first triangle
    gl.bindBuffer( gl.ARRAY_BUFFER, cubeObject.vbufferId );  // select triangle A's vertex buffer
    gl.vertexAttribPointer( cubeObject.vPositionLoc, cubeObject.mesh.vertexDim, gl.FLOAT, false, 0, 0 );  // defines use of attribute

    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, cubeObject.ibufferId );   

    // draw each triangle in a different color
    //for(var i=0; i < cubeObject.mesh.numFaces*10;++i) {
		
		//var newIndex = gl.getUniformLocation( program, "newIndex" );
		//var indVal = Math.floor(i/30)
		//gl.uniform4fv(newIndex,false, indVal)
		
       // gl.uniform4fv(cubeObject.uColorLoc, flatten(cubeObject.tColors[i]));
       // gl.drawElements( gl.TRIANGLES,cubeObject.mesh.faceDim ,gl.UNSIGNED_SHORT,cubeObject.mesh.faceDim*i*2); 
		gl.drawElements( gl.TRIANGLES,720,gl.UNSIGNED_SHORT,0); 
   // }

//setupQuad(program2,prog2Locs);
//drawQuad();






   requestAnimFrame(render1);
 
}

function render() {
    gl = cubeObject.gl;
gl.useProgram(program)

   gl.enableVertexAttribArray( vTexCoord );
gl.enableVertexAttribArray( vTangent);
gl.enableVertexAttribArray( vPositionLoc ); 
gl.enableVertexAttribArray( indexLoc ); 
gl.enableVertexAttribArray(vNormal); 
//So, we're going to start throwing in our render matrixes here
updateRotTranMat();
  rotTranMatLoc = gl.getUniformLocation(program, "rotTranMat"); 
gl.uniformMatrix4fv(rotTranMatLoc, false,reallyFlatten(rotTranMat)); //Okay, so theoretially we're passing through properly.


    gl.clear( gl.COLOR_BUFFER_BIT |gl.DEPTH_BUFFER_BIT);  // clears canvas to clearColor 

	// Look at
    mvMatrix = lookAt(eye, at , up);
    // Perspective
    pMatrix = perspective(fovy, aspect, near, far);
    
    normalMatrixx = normalMatrix(mvMatrix,true);
    
    
	gl.uniformMatrix4fv( modelView, false, flatten(mvMatrix) );
    gl.uniformMatrix4fv( projection, false, flatten(pMatrix) );
    gl.uniformMatrix3fv(normalMatrixLoc, false, flatten(normalMatrixx) );
    
    // draw first triangle
    gl.bindBuffer( gl.ARRAY_BUFFER, cubeObject.vbufferId );  // select triangle A's vertex buffer
    gl.vertexAttribPointer( cubeObject.vPositionLoc, cubeObject.mesh.vertexDim, gl.FLOAT, false, 0, 0 );  // defines use of attribute

    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, cubeObject.ibufferId );   

    // draw each triangle in a different color
    //for(var i=0; i < cubeObject.mesh.numFaces*10;++i) {
		
		//var newIndex = gl.getUniformLocation( program, "newIndex" );
		//var indVal = Math.floor(i/30)
		//gl.uniform4fv(newIndex,false, indVal)
		
       // gl.uniform4fv(cubeObject.uColorLoc, flatten(cubeObject.tColors[i]));
       // gl.drawElements( gl.TRIANGLES,cubeObject.mesh.faceDim ,gl.UNSIGNED_SHORT,cubeObject.mesh.faceDim*i*2); 
		gl.drawElements( gl.TRIANGLES,720,gl.UNSIGNED_SHORT,0); 
   // }

   requestAnimFrame(render);
}
