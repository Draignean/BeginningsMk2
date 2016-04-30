// CS 4143: example for OBJ file stored in js file
var cubeObject = {};
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

function configureTexture( image ) {
    texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture( gl.TEXTURE_2D, texture );
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB,
         gl.RGB, gl.UNSIGNED_BYTE, image );
    gl.generateMipmap( gl.TEXTURE_2D );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
                      gl.NEAREST_MIPMAP_LINEAR );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );

    gl.uniform1i(gl.getUniformLocation(program, "texture"), 0);
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
	function loadFB(canvas) 
	{
		gl.getExtension("OES_texture_float");
	    gl.getExtension("OES_texture_float_linear")
		var matTexture = gl.createTexture();
	var normalTexture = gl.createTexture();
	var positionTexture = gl.createTexture();
	var colorTexture = gl.createTexture();
		
		var ext = gl.getExtension('WEBGL_draw_buffers'); //Initialize our super buffering
		
		var fb = gl.createFramebuffer();
	gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
	ext.drawBuffersWEBGL([
	  ext.COLOR_ATTACHMENT0_WEBGL, // gl_FragData[0]
	  ext.COLOR_ATTACHMENT1_WEBGL, // gl_FragData[1]
	  ext.COLOR_ATTACHMENT2_WEBGL, // gl_FragData[2]
	  ext.COLOR_ATTACHMENT3_WEBGL  // gl_FragData[3]
		]);

	    gl.bindTexture(gl.TEXTURE_2D, matTexture); //Material Texture
	    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, canvas.width, canvas.height, 0, gl.RGBA, gl.FLOAT, null)


	    gl.bindTexture(gl.TEXTURE_2D, normalTexture); //Normal Tezture
	    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, canvas.width, canvas.height, 0, gl.RGBA, gl.FLOAT, null);


	    gl.bindTexture(gl.TEXTURE_2D, positionTexture); //Position Texture
	    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, canvas.width, canvas.height, 0, gl.RGBA, gl.FLOAT, null);


	    gl.bindTexture(gl.TEXTURE_2D, colorTexture); //Color Texture
	    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, canvas.width, canvas.height, 0, gl.RGBA, gl.FLOAT, null);

		gl.framebufferTexture2D(gl.FRAMEBUFFER, ext.COLOR_ATTACHMENT0_WEBGL, gl.TEXTURE_2D, matTexture, 0);
		gl.framebufferTexture2D(gl.FRAMEBUFFER, ext.COLOR_ATTACHMENT1_WEBGL, gl.TEXTURE_2D, normalTexture, 0);
		gl.framebufferTexture2D(gl.FRAMEBUFFER, ext.COLOR_ATTACHMENT2_WEBGL, gl.TEXTURE_2D, positionTexture, 0);    
		gl.framebufferTexture2D(gl.FRAMEBUFFER, ext.COLOR_ATTACHMENT3_WEBGL, gl.TEXTURE_2D, colorTexture, 0);
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
	    cubeObject.gl = gl;
	    cubeObject.canvas = canvas;
		loadFB(cubeObject.canvas);
		program = initShaders( gl, "viewobjb.vert", "viewobjb.frag" );  

		initializeQuad()


		aspect =  canvas.width/canvas.height;
		
	    gl.viewport( 0, 0, canvas.width, canvas.height );
	    gl.clearColor( 0.80, 0.60, 0.60, 1.0 );  
	    gl.enable(gl.DEPTH_TEST);
	 

		
	    gl.useProgram( program );
	    cubeObject.program = program;
	    genObj_cube(cubeObject);
	    cubeObject.mesh = cubeObject.cube; 
	     lightPosition.z = -lightPosition.z;
	     
	     
		configureTexture("image0.png",0, "texture"); 
		configureTexture("image1.png",1,"texture_h");
		 
	    modelView = gl.getUniformLocation( program, "EyeMatrix" );
	    projection = gl.getUniformLocation( program, "projection" );
	    normalMatrixLoc = gl.getUniformLocation( program, "normalMatrix" );    
	  
	     
	     
	    // find and enable attribute vPosition
	    vPositionLoc = gl.getAttribLocation( program, "vPosition" );
	    cubeObject.vPositionLoc = vPositionLoc;
	     // turns on attribute
		
	    
	   
	    // create and bind verticesA to a buffer
	    vbufferId = gl.createBuffer();
	    cubeObject.vbufferId = vbufferId;
	    gl.bindBuffer( gl.ARRAY_BUFFER, vbufferId );
	    gl.bufferData( gl.ARRAY_BUFFER,cubeObject.mesh.vertexBlockFull, gl.STATIC_DRAW );
	    
		ibufferId = gl.createBuffer();
	    cubeObject.ibufferId = ibufferId;
	    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibufferId);
	    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,cubeObject.mesh.faceVertexBlockFull , gl.STATIC_DRAW);

		// Normals 

		var nBuffer = gl.createBuffer();
	    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer);
	    gl.bufferData( gl.ARRAY_BUFFER, cubeObject.mesh.normalBlockFull, gl.STATIC_DRAW );
	    vNormal = gl.getAttribLocation( program, "vNormal" );
	    gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, false, 0, 0 );
	 

	   //Rotation indexin
		var indexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, indexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, cubeObject.mesh.rotationIndexBlock, gl.STATIC_DRAW);
		indexLoc = gl.getAttribLocation(program, "vLoc");
		gl.vertexAttribPointer(indexLoc,4,gl.FLOAT,false,0,0);


		
	    // Tangents
	    
	    var tBuffer = gl.createBuffer();
	    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer);
	    gl.bufferData( gl.ARRAY_BUFFER, cubeObject.mesh.tangentBlockFull, gl.STATIC_DRAW );
	    vTangent = gl.getAttribLocation( program, "vTangent" );
	    gl.vertexAttribPointer( vTangent, 3, gl.FLOAT, false, 0, 0 );
	    
	    cubeObject.colorA = [ 0,1,0,1]; // green
	    cubeObject.uColorLoc = gl.getUniformLocation( program, "uColor" );
	    cubeObject.uScaleLoc = gl.getUniformLocation( program, "uScale" );
	    cubeObject.scale = new Float32Array([
		     (cubeObject.mesh.maxBound[0] - cubeObject.mesh.minBound[0]),
		     (cubeObject.mesh.maxBound[1] - cubeObject.mesh.minBound[1]),
		     (cubeObject.mesh.maxBound[2] - cubeObject.mesh.minBound[2])]);

	    for(var i=0; i < 3; ++i){
		    if (cubeObject.scale[i] > 0 ) { 
		    cubeObject.scale[i] = 1.0/cubeObject.scale[i];
		    } else { 
			    cubeObject.scale[i] = 1.0;
		    }
	    }

	    cubeObject.uTranslateLoc = gl.getUniformLocation( program, "uTranslate" );
	    cubeObject.translate = new Float32Array( [
		     cubeObject.mesh.centroid[0] *-1.0,
		     cubeObject.mesh.centroid[1] *-1.0,
		     cubeObject.mesh.centroid[2] *-1.0]);

	    gl.uniform4fv(cubeObject.uColorLoc, flatten(cubeObject.colorA));
	    gl.uniform3fv(cubeObject.uTranslateLoc, flatten(cubeObject.translate));
	    gl.uniform3fv(cubeObject.uScaleLoc, cubeObject.scale);

	    cubeObject.tColors = []
	    for(var i=0; i < cubeObject.mesh.numFaces*10;++i) {
		    cubeObject.tColors.push(vec4(Math.random(),Math.random(),Math.random(),1.0));
	    }

	//----------- LIGHT------------





	    gl.uniform1f( gl.getUniformLocation(program,
	       "shininess"),materialShininess );
	//------------------------------

	//------- EYE ---------------- 
	gl.uniform3fv( gl.getUniformLocation(program,
	       "eyePosition"),flatten(eye) );

	//--------------------- Texture Coords: 

	    var tBuffer = gl.createBuffer();
	    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
	    gl.bufferData( gl.ARRAY_BUFFER, cubeObject.mesh.texCoordBlockFull, gl.STATIC_DRAW ); //So, to make this line actually work , we're going to need a supercube mesh that essentially containes the concatenated array of all of the vertex+tex coordinates.]

	    vTexCoord = gl.getAttribLocation( program, "vTexCoord" );
	    gl.vertexAttribPointer( vTexCoord, 2, gl.FLOAT, false, 0, 0 );
	       

			
			
			
	    gl.uniform1f( gl.getUniformLocation(program,"DeltaSampleS"),DeltaSampleS);
	    gl.uniform1f( gl.getUniformLocation(program,"DeltaSampleT"),DeltaSampleT);
		gl.uniform1f( gl.getUniformLocation(program,"Scale"),Scale);

	    popRotTranMat(); //So, now we should be building up the translation and rotation matrices.
	    
		enableProg2();

		render();
	};


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

setupQuad(program2,prog2Locs);
drawQuad();

   requestAnimFrame(render);
}
